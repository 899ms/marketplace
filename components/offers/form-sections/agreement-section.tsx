'use client';

import React from 'react';
// import { UseFormReturn } from 'react-hook-form'; // Remove unused import
import { Controller, useFormContext } from 'react-hook-form'; // Add Controller
import { Root as Checkbox } from '@/components/ui/checkbox'; // Correct import
import { Root as Label } from '@/components/ui/label';
import { SendOfferFormData } from '../schema';

// Remove form prop
// type FormMethods = Omit<UseFormReturn<SendOfferFormData>, 'handleSubmit'>;
// interface AgreementSectionProps {
//   form: FormMethods;
// }

export function AgreementSection(/* { form }: AgreementSectionProps */) {
  // Get methods from context
  const {
    control, // Add control
    formState: { errors },
  } = useFormContext<SendOfferFormData>();

  return (
    <div className='space-y-4 rounded-md border p-4'>
      <h3 className='text-lg font-semibold'>Agreement</h3>
      <div className='flex items-start space-x-3'>
        {/* Use Controller for Checkbox */}
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
        <div className='grid gap-1.5 leading-none'>
          <Label htmlFor='agreeToTerms' className='font-medium'>
            Agree to terms and conditions
          </Label>
          <p id='agreeToTerms-description' className='text-sm text-gray-500'>
            You agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
      {errors.agreeToTerms && (
        <p className='text-sm text-red-500'>{errors.agreeToTerms.message}</p>
      )}
    </div>
  );
}
