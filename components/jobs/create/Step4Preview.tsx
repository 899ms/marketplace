'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import * as Button from '@/components/ui/button';
import * as Tag from '@/components/ui/tag';
import { CreateJobFormData } from '@/app/jobs/create/schema';

interface Step4Props {
  formMethods: UseFormReturn<CreateJobFormData>;
  prevStep: () => void;
  submitForm: (data: CreateJobFormData) => void; // Adjusted to accept data
}

const Step4Preview: React.FC<Step4Props> = ({
  formMethods,
  prevStep,
  submitForm,
}) => {
  const {
    getValues,
    handleSubmit, // Use RHF handleSubmit for the final submit button
  } = formMethods;

  const formData = getValues(); // Get current form values

  // Mock discount data - replace or integrate with actual logic later
  const discountCode = 'codeabcde';
  const discountAmount = 20;

  const getUsageDescription = (option?: string) => {
    if (option === 'private')
      return 'For purposes such as hobbies and interests.';
    if (option === 'business')
      return 'For purposes such as signing contracts and issuing.';
    return 'Not specified';
  };

  const getPrivacyDescription = (option?: string) => {
    if (option === 'public') return 'Any worker can apply for the job.';
    if (option === 'private')
      return 'Only those who have been invited can take part in the work.';
    return 'Not specified';
  };

  const formatCurrency = (value?: number) => {
    if (value === undefined || value === null) return 'N/A';
    // TODO: Use currency from form data (formData.currency)
    // Basic formatting, consider using Intl.NumberFormat for better localization
    return `$${value.toFixed(2)}`;
  };

  const finalAmount = (formData.budget || 0) - discountAmount;

  return (
    <div className='space-y-6'>
      {/* Step 1 Basic */}
      <div className='rounded-lg bg-bg-weak-50 p-4'>
        <p className='text-xs text-text-secondary-600 mb-2 font-semibold uppercase'>
          Basic Info
        </p>
        <p className='text-sm font-medium text-text-strong-950'>
          {formData.title || '-'}
        </p>
        <p className='text-sm text-text-secondary-600 mt-1'>
          {formData.description || '-'}
        </p>
      </div>

      {/* Step 2 Skills / Requirements */}
      <div className='rounded-lg bg-bg-weak-50 p-4'>
        <p className='text-xs text-text-secondary-600 mb-2 font-semibold uppercase'>
          Requirements / Skills
        </p>
        <p className='text-sm text-text-secondary-600 whitespace-pre-wrap'>
          {formData.requirements || '-'}
        </p>
        {/* TODO: Display extracted skills/sources/files if they are implemented separately */}
      </div>

      {/* Step 3 Usage */}
      <div className='space-y-3 rounded-lg bg-bg-weak-50 p-4'>
        <p className='text-xs text-text-secondary-600 mb-2 font-semibold uppercase'>
          Usage & Privacy
        </p>
        <div>
          <p className='text-sm font-medium capitalize text-text-strong-950'>
            Usage: {formData.usageOption || '-'}
          </p>
          <p className='text-sm text-text-secondary-600 mt-1'>
            {getUsageDescription(formData.usageOption)}
          </p>
        </div>
        <div>
          <p className='text-sm font-medium capitalize text-text-strong-950'>
            Privacy: {formData.privacyOption || '-'}
          </p>
          <p className='text-sm text-text-secondary-600 mt-1'>
            {getPrivacyDescription(formData.privacyOption)}
          </p>
        </div>
      </div>

      {/* Step 4 Order Amount & Date */}
      <div className='space-y-3 rounded-lg bg-bg-weak-50 p-4'>
        <p className='text-xs text-text-secondary-600 mb-3 font-semibold uppercase'>
          Order Amount & Date
        </p>
        <div className='text-sm flex items-center justify-between'>
          <span className='text-text-secondary-600'>Deadline</span>
          <span className='font-medium text-text-strong-950'>
            {formData.deadline || 'Not set'}
          </span>
        </div>
        <div className='text-sm flex items-center justify-between'>
          <span className='text-text-secondary-600'>Budget</span>
          <span className='font-medium text-text-strong-950'>
            {formatCurrency(formData.budget)}
          </span>
        </div>
        <div className='text-sm text-sm flex items-center justify-between'>
          <span className='text-text-secondary-600'>
            Discount{' '}
            <Tag.Root variant='gray' className='ml-1'>
              {discountCode}
            </Tag.Root>
          </span>
          <span className='font-medium text-text-strong-950'>
            -{formatCurrency(discountAmount)}
          </span>
        </div>
        <div className='text-lg mt-3 flex items-center justify-between border-t border-stroke-soft-200 pt-3'>
          <span className='text-text-secondary-600 font-medium'>
            Amount paid
          </span>
          <span className='font-semibold text-text-strong-950'>
            {formatCurrency(finalAmount)}
          </span>
        </div>
      </div>

      {/* Navigation/Action Buttons */}
      <div className='flex justify-between gap-3'>
        <Button.Root
          variant='neutral'
          mode='stroke'
          onClick={prevStep}
          className='flex-1'
          type='button' // Ensure it doesn't trigger form submit
        >
          Previous
        </Button.Root>
        <Button.Root
          variant='neutral'
          mode='filled'
          onClick={handleSubmit(submitForm)} // Use RHF handleSubmit
          className='flex-1'
          type='submit' // Trigger RHF submit
        >
          Post
        </Button.Root>
      </div>
    </div>
  );
};

export default Step4Preview;
