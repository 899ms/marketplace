'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import * as Button from '@/components/ui/button';
import * as Tag from '@/components/ui/tag';
import { CreateJobFormData } from '@/app/jobs/create/schema';
import { RiLoader4Line } from '@remixicon/react';
import { cn } from '@/utils/cn';
import * as FancyButton from '@/components/ui/fancy-button';

interface Step4Props {
  formMethods: UseFormReturn<CreateJobFormData>;
  prevStep: () => void;
  submitForm: (data: CreateJobFormData) => void;
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
}

const Step4Preview: React.FC<Step4Props> = ({
  formMethods,
  prevStep,
  submitForm,
  isSubmitting,
  error,
  success,
}) => {
  const { getValues, handleSubmit } = formMethods;

  const formData = getValues();

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
    return `$${value.toFixed(2)}`;
  };

  const finalAmount = (formData.budget || 0) - discountAmount;
  console.log(formData)
  return (
    <div className='flex flex-col'>
      {/* Step 1 Basic */}

      <div className='flex flex-col'>
        <div className='w-full bg-[#F5F7FA] text-[#99A0AE] text-[12px] p-2'>
          Step 1 Basic
        </div>
        <div className='p-4'>
          <p className='text-[14px] text-[#525866] mt-1'>
            {formData.description || '-'}
          </p>
        </div>

      </div>
      <div className='flex flex-col'>
        <div className='w-full bg-[#F5F7FA] text-[#99A0AE] text-[12px] p-2'>
          Step 2 Skills
        </div>
        <div className='p-2 flex flex-col gap-3 p-4'>
          <div className='flex flex-row justify-between items-start'>
            <p className='text-[#525866] text-[14px]'>Experience Levels</p>
            <div className='flex flex-wrap gap-2 max-w-[200px] justify-end'>
              {formData.skill_levels.map((skillLevel) => (
                <Tag.Root key={skillLevel} variant='stroke'>
                  {skillLevel}
                </Tag.Root>
              ))}
            </div>
          </div>
          <div className='flex flex-row justify-between items-start'>
            <p className='text-[#525866] text-[14px]'>Candidate Sources</p>
            <div className='flex flex-wrap gap-2 max-w-[200px] justify-end'>
              {formData.candidate_sources.map((candidateSource) => (
                <Tag.Root key={candidateSource} variant='stroke'>
                  {candidateSource}
                </Tag.Root>
              ))}
            </div>
          </div>
          <div className='flex flex-row justify-between items-start'>
            <p className='text-[#525866] text-[14px]'>Files</p>
            <div className='flex flex-col gap-1'>
              {formData.files.map((file) => (
                <p key={file.url} className='text-[#525866] text-[14px]'>{file.name}</p>
              ))}
            </div>
          </div>

        </div>
      </div>
      <div className='flex flex-col'>
        <div className='w-full bg-[#F5F7FA] text-[#99A0AE] text-[12px] p-2'>
          Step 3 Usage
        </div>
        <div className='p-2 flex flex-col gap-3 p-4'>
          <div className='flex flex-col gap-1'>
            <p className='text-[#525866] text-[14px] font-semibold capitalize'>{formData.usageOption}</p>
            <p className='text-[#525866] text-[12px]'>{getUsageDescription(formData.usageOption)}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-[#525866] text-[14px] font-semibold capitalize'>{formData.privacyOption}</p>
            <p className='text-[#525866] text-[12px]'>{getPrivacyDescription(formData.privacyOption)}</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='w-full bg-[#F5F7FA] text-[#99A0AE] text-[12px] p-2'>
          Step 4 Order Amount & Date
        </div>
        <div className='p-2 flex flex-col gap-2 p-4'>
          <div className='flex flex-row justify-between items-center'>
            <p className='text-[#525866] text-[14px]'>Deadline</p>
            <p className='text-[#0E121B] text-[14px]'>{formData.deadline || '-'}</p>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <p className='text-[#525866] text-[14px]'>Order Amount</p>
            <p className='text-[#0E121B] text-[14px]'>{formData.currency === 'USD' ? '$' : formData.currency === 'EUR' ? '€' : '¥'}{formData.budget || '-'}</p>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <p className='text-[#525866] text-[14px]'>Discount {discountCode}</p>
            <p className='text-[#0E121B] text-[14px]'>-{formData.currency === 'USD' ? '$' : formData.currency === 'EUR' ? '€' : '¥'}{discountAmount || '-'}</p>
          </div>
          <div className='flex flex-row justify-between items-end mt-2'>
            <p className='text-[#525866] text-[14px]'>Amount Paid</p>
            <p className='text-[#0E121B] text-[24px]'>{formData.currency === 'USD' ? '$' : formData.currency === 'EUR' ? '€' : '¥'}{formData.budget - discountAmount || '-'}</p>
          </div>

        </div>
      </div>


      {/* Display Error Message */}
      {error && (
        <div className='text-sm rounded-md border border-red-200 bg-red-50 p-3 text-red-700'>
          <p>Error: {error}</p>
        </div>
      )}

      {/* Display Success Message */}
      {success && (
        <div className='text-sm rounded-md border border-green-200 bg-green-50 p-3 text-green-700'>
          <p>Success! Your job posting has been created.</p>
        </div>
      )}

      {/* Navigation/Action Buttons */}
      <div className='flex justify-between gap-3'>
        <Button.Root
          variant='neutral'
          mode='stroke'
          onClick={prevStep}
          className='flex-1'
          type='button'
          disabled={isSubmitting}
        >
          Previous
        </Button.Root>
        <FancyButton.Root
          variant='neutral'
          onClick={handleSubmit(submitForm)}
          className='flex flex-1 items-center justify-center'
          type='submit'
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <RiLoader4Line className='mr-2 size-4 animate-spin' />
          ) : null}
          {isSubmitting ? 'Posting...' : 'Post'}
        </FancyButton.Root>
      </div>
    </div>
  );
};

export default Step4Preview;
