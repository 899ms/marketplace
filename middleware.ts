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
  // IMPORTANT: Ensure '/' (your login page) is listed here!
  const publicPaths = ['/', '/auth/signup']; // Add any other public pages like /about, /pricing etc.

  // Check if the current path is public
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || (path !== '/' && pathname.startsWith(path)),
  );

  // If trying to access a protected path without a user, redirect to login ('/')
  if (!isPublicPath && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    url.search = ''; // Clear search params on redirect
    return NextResponse.redirect(url);
  }

  // Optional: Redirect logged-in users away from login/signup pages
  // const authPages = ['/', '/auth/signup'];
  // if (authPages.includes(pathname) && user) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url)); // Adjust target as needed
  // }

  // Return the response (potentially with updated cookies)
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
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};
