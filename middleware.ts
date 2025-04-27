// middleware.ts
import { createServerClient } from '@supabase/ssr'; // Use the ssr version
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log(`Middleware processing path: ${request.nextUrl.pathname}`);

  // Clone the request headers and set a new header indicating this is a middleware request.
  // This is necessary for the server client to work correctly.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-middleware-request', 'true');

  // Create a response object that will be used to modify cookies
  const response = NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });

  // Create a Supabase client configured to use cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options) {
          request.cookies.set({ name, value, ...options });
          // The set method is needed for the server client to update the response headers.
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options) {
          request.cookies.set({ name, value: '', ...options });
          // The remove method is needed for the server client to update the response headers.
          response.cookies.set({ name, value: '', ...options });
        },
      },
    },
  );

  // --- 1. Get User Session ---
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(
    `Middleware auth check: User ${user ? 'is authenticated' : 'is not authenticated'}`,
  );

  const { pathname } = request.nextUrl;

  // --- 2. Define Protected Routes ---
  const buyerRoutes = ['/home']; // Changed from '/app/home' to '/home'
  const sellerRoutes = ['/app/worker/home']; // Add more seller routes/patterns (e.g., '/app/services/create')
  const allProtectedRoutes = [...buyerRoutes, ...sellerRoutes];

  // Helper function to check if path matches a route
  const pathMatchesRoute = (path: string, routes: string[]) => {
    return routes.some((route) => {
      const match = path === route || path.startsWith(`${route}/`);
      if (match) console.log(`Path ${path} matches protected route ${route}`);
      return match;
    });
  };

  // --- 3. Handle Unauthenticated Access to Protected Routes ---
  if (!user && pathMatchesRoute(pathname, allProtectedRoutes)) {
    console.log(
      `Middleware: Unauthenticated access to ${pathname}, redirecting to login.`,
    );
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    url.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(url);
  }

  // --- 4. Allow access if not logged in and not a protected route ---
  if (!user) {
    console.log(
      `Middleware: User not authenticated, but route ${pathname} is not protected.`,
    );
    return response; // Proceed with the response (important for cookie handling)
  }

  // --- 5. Fetch User Type (User is authenticated) ---
  let userType: 'buyer' | 'seller' | null = null;
  try {
    // Fetch directly from 'users' table using the authenticated user's ID
    console.log(`Middleware: Fetching user type for user ${user.id}`);
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .select('user_type')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error(
        'Middleware: Error fetching user profile:',
        profileError.message,
      );
      const url = request.nextUrl.clone();
      url.pathname = '/auth/login';
      url.searchParams.set('error', 'profile_fetch_failed');
      return NextResponse.redirect(url);
    }

    if (
      profileData &&
      (profileData.user_type === 'buyer' || profileData.user_type === 'seller')
    ) {
      userType = profileData.user_type;
      console.log(`Middleware: User type is ${userType}`);
    } else {
      console.warn(
        `Middleware: User ${user.id} has missing or invalid user_type.`,
      );
      const url = request.nextUrl.clone();
      url.pathname = '/auth/login';
      url.searchParams.set('error', 'invalid_role');
      return NextResponse.redirect(url);
    }
  } catch (e) {
    console.error('Middleware: Exception fetching user profile:', e);
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    url.searchParams.set('error', 'profile_fetch_exception');
    return NextResponse.redirect(url);
  }

  // --- 6. Enforce Role-Based Access ---
  const isBuyerRoute = pathMatchesRoute(pathname, buyerRoutes);
  const isSellerRoute = pathMatchesRoute(pathname, sellerRoutes);

  console.log(
    `Path ${pathname} is buyer route: ${isBuyerRoute}, is seller route: ${isSellerRoute}`,
  );

  // Redirect sellers from buyer routes
  if (isBuyerRoute && userType !== 'buyer') {
    console.log(
      `Middleware: Redirecting non-buyer (${userType}) from ${pathname} to /app/worker/home`,
    );
    return NextResponse.redirect(new URL('/app/worker/home', request.url));
  }

  // Redirect buyers from seller routes
  if (isSellerRoute && userType !== 'seller') {
    console.log(
      `Middleware: Redirecting non-seller (${userType}) from ${pathname} to /home`,
    );
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // --- 7. Allow Access ---
  // If role matches or the route isn't specifically role-protected, allow access
  // Refresh session if needed - important!
  await supabase.auth.getSession();
  console.log(
    `Middleware: Access granted to ${pathname} for ${userType || 'unknown'} user`,
  );
  return response;
}

// --- 8. Configure Middleware Path Matching ---
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (auth routes like /auth/login, /auth/signup) - IMPORTANT
     */
    '/((?!api|_next/static|_next/image|favicon.ico|auth).*)',
  ],
};
