'use client';

import { useState } from 'react';
import { authOperations, SignUpSchema } from '@/utils/supabase';
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

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validate the form data with Zod
      SignUpSchema.parse({ email, password, full_name: fullName });

      // Attempt to sign up
      const { user, error } = await authOperations.signUp({
        email,
        password,
        full_name: fullName,
      });

      if (error) {
        setError(error);
        return;
      }

      setSuccess(true);
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

  if (success) {
    return (
      <div className='shadow-md w-full max-w-md rounded-lg bg-white p-8'>
        <div className='text-center'>
          <AlertUI.Icon
            as={RiCheckboxCircleLine}
            className='mx-auto mb-4 size-16 text-success-base'
          />
          <h2 className='text-2xl font-bold tracking-tight text-text-strong-950'>
            Sign Up Successful!
          </h2>
          <p className='mt-4 text-paragraph-sm text-text-sub-600'>
            We've sent you an email to confirm your account. Please check your
            inbox.
          </p>
          <div className='mt-6'>
            <Button.Root
              variant='primary'
              mode='filled'
              size='medium'
              className='w-full'
              asChild
            >
              <a href='/auth/login'>Go to Login</a>
            </Button.Root>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold tracking-tight text-text-strong-950'>
          Create an Account
        </h2>
        <p className='mt-2 text-paragraph-sm text-text-sub-600'>
          Enter your details to create your account
        </p>
      </div>

      {error && (
        <Alert
          variant='error'
          title='Sign up failed'
          description={error}
          className='mb-4'
        />
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <Input.Root size='medium'>
            <Input.Wrapper>
              <Input.Input
                id='fullName'
                type='text'
                placeholder='Full Name'
                value={fullName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFullName(e.target.value)
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
          <p className='text-xs mt-2 text-text-soft-400'>
            Password must be at least 8 characters
          </p>
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
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button.Root>
        </div>
      </form>

      <div className='text-center text-paragraph-sm'>
        <p className='text-text-sub-600'>
          Already have an account?{' '}
          <a href='/auth/login' className='text-primary-base hover:underline'>
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
