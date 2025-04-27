'use client';

import { useState } from 'react';
import { authOperations, SignInSchema } from '@/utils/supabase';
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
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validate the form data with Zod
      SignInSchema.parse({ email, password });

      // Attempt to sign in
      const { user, error } = await authOperations.signIn({ email, password });

      if (error) {
        setError(error);
        return;
      }

      setSuccess(true);
      // Redirect or update UI state on successful login
      window.location.href = '/dashboard';
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError('An unexpected error occurred');
        console.error(err);
      }
    } finally {
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

      {success && (
        <Alert
          variant='success'
          title='Success!'
          description='Login successful! Redirecting...'
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
          Don't have an account?{' '}
          <a href='/auth/signup' className='text-primary-base hover:underline'>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
