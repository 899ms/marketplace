import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
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
        set(name: string, value: string, options: CookieOptions) {
          // If the cookie is set, update the request and response cookies
          request.cookies.set({ name, value, ...options });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          // If the cookie is removed, update the request and response cookies
          request.cookies.set({ name, value: '', ...options });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    },
  );

  // Refresh session if expired - important!
  // Also, crucially important: need to await getUser() for the cookie setting/removing functions to be called!
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Define public paths (no auth required)
  const publicPaths = [
    '/',
    '/auth/login',
    '/auth/signup',
    '/auth/forgot-password',
  ]; // Added /login

  // Define paths that logged-in users should be redirected *away* from
  const authPages = ['/', '/auth/login', '/auth/signup']; // Ensured /login is here

  // Check if the current path requires authentication
  const isProtectedRoute = !publicPaths.some(
    (path) => pathname === path || (path !== '/' && pathname.startsWith(path)),
  );

  // If trying to access a protected path without a user, redirect to /login
  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login'; // Redirect to /auth/login page
    // Optionally add a query param to indicate the original destination
    if (pathname !== '/') {
      // Avoid adding redirect if they were already going to root
      url.searchParams.set('redirectedFrom', pathname);
    }
    console.log(
      `[Middleware] User not authenticated, redirecting from ${pathname} to /auth/login`,
    );
    return NextResponse.redirect(url);
  }

  // If the user is logged in and trying to access an auth page (like login/signup/root), redirect to home
  if (user && authPages.includes(pathname)) {
    console.log(
      `[Middleware] User is logged in, redirecting from ${pathname} to /home`,
    );
    return NextResponse.redirect(new URL('/home', request.url)); // Redirect to /home
  }

  // Allow the request to proceed if none of the above conditions met
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (static images in /public)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|auth/forgot-password).*)', // Exclude forgot-password from matcher if handled client-side mostly
  ],
};
