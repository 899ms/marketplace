'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { authOperations, SignInSchema, userOperations } from '@/utils/supabase';
import { z } from 'zod';
import * as Input from '@/components/ui/input';
import * as Button from '@/components/ui/button';
import * as AlertUI from '@/components/ui/alert';
import { RiErrorWarningLine, RiCheckboxCircleLine } from '@remixicon/react';

// Custom Alert component using the AlertUI components
const Alert = ({
  variant,
  title,
  description,
  className,
}: {
  variant: 'error' | 'success' | 'warning' | 'information';
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <AlertUI.Root
      className={className}
      status={variant}
      variant='lighter'
      size='small'
    >
      <AlertUI.Icon
        as={variant === 'error' ? RiErrorWarningLine : RiCheckboxCircleLine}
      />
      <div className='flex flex-col space-y-1'>
        <h5 className='font-medium'>{title}</h5>
        <p className='text-paragraph-xs'>{description}</p>
      </div>
    </AlertUI.Root>
  );
};

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const searchParams = useSearchParams();
  const redirectedFrom = searchParams.get('redirectedFrom');

  useEffect(() => {
    // Check if there's an error parameter in the URL
    const errorParam = searchParams.get('error');
    if (errorParam) {
      switch (errorParam) {
        case 'profile_fetch_failed':
          setError('Failed to load your profile. Please try again.');
          break;
        case 'invalid_role':
          setError(
            'Account role is missing or invalid. Please contact support.',
          );
          break;
        case 'profile_fetch_exception':
          setError(
            'An error occurred while loading your profile. Please try again.',
          );
          break;
        default:
          setError('An error occurred. Please try again.');
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validate the form data with Zod
      SignInSchema.parse({ email, password });

      // Attempt to sign in
      const { user, error: signInError } = await authOperations.signIn({
        email,
        password,
      });

      if (signInError) {
        setError(signInError);
        setLoading(false);
        return;
      }

      if (user) {
        // Fetch user profile data after successful login
        const profile = await userOperations.getUserById(user.id);

        if (profile && profile.user_type) {
          // If we have a redirectedFrom URL, log it but ignore it for redirection
          if (redirectedFrom) {
            console.log(`Login originated from: ${redirectedFrom}, but redirecting to /home`);
          }

          // Always redirect to /home on successful login
          console.log('Login successful, redirecting to /home');
          router.push('/home');
        } else {
          // Handle case where profile data couldn't be fetched
          console.error(
            'Failed to fetch user profile after login for user:',
            user.id,
          );
          setError(
            'Login successful, but failed to load user data. Please try again later or contact support.',
          );
          // Maybe redirect to a generic page or show error in place
          // For now, keep loading=false and let error message show
          setLoading(false);
        }
      } else {
        // Handle case where user object is null after successful sign-in (unexpected)
        setError('Login seemed successful, but user data is missing.');
        setLoading(false);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError('An unexpected error occurred during login');
        console.error(err);
      }
      setLoading(false);
    }
  };

  return (
    <div className='w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold tracking-tight text-text-strong-950'>
          Welcome Back
        </h2>
        <p className='mt-2 text-paragraph-sm text-text-sub-600'>
          Enter your credentials to access your account
        </p>
      </div>

      {error && (
        <Alert
          variant='error'
          title='Login failed'
          description={error}
          className='mb-4'
        />
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <Input.Root size='medium'>
            <Input.Wrapper>
              <Input.Input
                id='email'
                type='email'
                placeholder='Email address'
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                disabled={loading}
                required
              />
            </Input.Wrapper>
          </Input.Root>
        </div>

        <div>
          <Input.Root size='medium'>
            <Input.Wrapper>
              <Input.Input
                id='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                disabled={loading}
                required
              />
            </Input.Wrapper>
          </Input.Root>
          <div className='mt-2 flex justify-end'>
            <a
              href='/auth/forgot-password'
              className='text-label-sm text-primary-base hover:underline'
            >
              Forgot password?
            </a>
          </div>
        </div>

        <div className='pt-2'>
          <Button.Root
            variant='primary'
            mode='filled'
            size='medium'
            disabled={loading}
            className='w-full'
            type='submit'
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button.Root>
        </div>
      </form>

      <div className='text-center text-paragraph-sm'>
        <p className='text-text-sub-600'>
          Dont have an account?{' '}
          <a href='/auth/signup' className='text-primary-base hover:underline'>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
