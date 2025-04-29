import {
  createServerClient as _createServerClient,
  type CookieOptions,
} from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createServerClient() {
  const cookieStore = await cookies();

  // Create a server-side client for Supabase. See https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs
  return _createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          const cookie = await cookieStore.get(name);
          return cookie?.value;
        },
        async set(name: string, value: string, options: CookieOptions) {
          try {
            await cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        async remove(name: string, options: CookieOptions) {
          try {
            // Use `delete` if available and preferred, otherwise set empty value
            await cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // The `remove` method (or equivalent set empty) was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
}

// Note: If you also need a server client for Route Handlers or Server Actions,
// you might create separate helpers or adjust this one, as `cookies()` from `next/headers`
// isn't available in those contexts directly. You'd typically pass the cookieStore.
