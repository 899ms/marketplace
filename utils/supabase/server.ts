// This file should be used only in App Router server components
import {
  createServerClient as createSupabaseServerClient,
  type CookieOptions,
} from '@supabase/ssr';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

/**
 * Create a Supabase client for use in server components and server actions
 * Only use this in App Router server components or server actions
 */
export async function createServerClient() {
  try {
    // In newer versions of Next.js, cookies() returns a Promise
    const cookieStore = await cookies();

    // Debug: Print available cookies
    console.log(
      'Available cookies:',
      cookieStore.getAll().map((c) => c.name),
    );

    return createSupabaseServerClient(
      supabaseUrl as string,
      supabaseAnonKey as string,
      {
        cookies: {
          async get(name: string) {
            try {
              const cookie = cookieStore.get(name);
              console.log(
                `Getting cookie: ${name}, value exists: ${!!cookie?.value}`,
              );
              return cookie?.value;
            } catch (error) {
              console.error(`Error getting cookie ${name}:`, error);
              return undefined;
            }
          },
          async set(name: string, value: string, options: CookieOptions) {
            try {
              console.log(`Setting cookie: ${name}`);
              cookieStore.set({ name, value, ...options });
            } catch (error) {
              console.error(`Error setting cookie ${name}:`, error);
            }
          },
          async remove(name: string, options: CookieOptions) {
            try {
              console.log(`Removing cookie: ${name}`);
              cookieStore.set({ name, value: '', ...options });
            } catch (error) {
              console.error(`Error removing cookie ${name}:`, error);
            }
          },
        },
      },
    );
  } catch (error) {
    console.error('Error creating server client:', error);
    // Fallback to a basic client without cookie handling
    return createSupabaseServerClient(
      supabaseUrl as string,
      supabaseAnonKey as string,
      {
        cookies: {
          get: () => undefined,
          set: () => {},
          remove: () => {},
        },
      },
    );
  }
}
