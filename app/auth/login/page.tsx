import { createServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';

export default async function LoginPage() {
  const supabase = await createServerClient();

  // Check if the user is already authenticated
  const { data } = await supabase.auth.getSession();
  const isAuthenticated = !!data.session;

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    redirect('/dashboard');
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-bg-weak-50 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <LoginForm />
      </div>
    </div>
  );
}
