'use client';

import React from 'react';
import { UseFormReturn, Controller } from 'react-hook-form';
import { Root as Checkbox } from '@/components/ui/checkbox';
import { Root as Label } from '@/components/ui/label';
import { SendOfferFormData } from '../schema';

type FormMethods = Omit<UseFormReturn<SendOfferFormData>, 'handleSubmit'>;

interface AgreementSectionProps {
  form: FormMethods;
}

export function AgreementSection({ form }: AgreementSectionProps) {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <div className='flex items-start space-x-3'>
      <Controller
        name='agreeToTerms'
        control={control}
        render={({ field }) => (
          <Checkbox
            id='agreeToTerms'
            checked={field.value}
            onCheckedChange={field.onChange}
            aria-describedby='agreeToTerms-description'
            className='mt-0.5'
          />
        )}
      />
      <div className='grid gap-1.5 leading-none mt-1'>
        <Label htmlFor='agreeToTerms' id='agreeToTerms-description' className='text-[#525866] text-[14px] whitespace-pre-wrap'>
          I agree to the{' '}
          <a
            href='/terms'
            target='_blank'
            className='font-medium text-[#0E121B] text-[14px] underline hover:text-[#0E121B]'
          >
            Terms & Conditions
          </a>
          {' and '}
          <a
            href='/privacy'
            target='_blank'
            className='font-medium text-[#0E121B] text-[14px] underline hover:text-[#0E121B]'
          >
            Privacy Policy
          </a>
          .
        </Label>
        {errors.agreeToTerms && (
          <p className='text-sm text-red-500'>{errors.agreeToTerms.message}</p>
        )}
      </div>
    </div>
  );
}
