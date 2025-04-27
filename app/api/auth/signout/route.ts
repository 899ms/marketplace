import { createServerClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST() {
  const supabase = await createServerClient();

  // Sign out
  await supabase.auth.signOut();

  // Redirect to home page
  return NextResponse.redirect(
    new URL('/', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  );
}
