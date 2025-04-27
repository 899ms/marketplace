'use client';

import React from 'react';
import { UseFormReturn, Controller } from 'react-hook-form';
import * as Button from '@/components/ui/button';
import * as Checkbox from '@/components/ui/checkbox';
import { CreateJobFormData } from '@/app/jobs/create/schema';
import FormFieldError from './FormFieldError';

interface Step3Props {
  formMethods: UseFormReturn<CreateJobFormData>;
  nextStep: () => void;
  prevStep: () => void;
}

const Step3UsageForm: React.FC<Step3Props> = ({
  formMethods,
  nextStep,
  prevStep,
}) => {
  const {
    control,
    formState: { errors },
  } = formMethods;

  return (
    <form onSubmit={(e) => e.preventDefault()} className='space-y-6'>
      {/* Usage Section - Using Controller for custom radio group */}
      <Controller
        name='usageOption'
        control={control}
        render={({ field }) => (
          <div className='space-y-3'>
            <h3 className='text-xs text-text-secondary-600 font-semibold uppercase'>
              Usage
            </h3>
            <div className='space-y-3'>
              {/* Private Usage Option */}
              <label
                className='data-[checked=true]:bg-primary-light-100 flex cursor-pointer items-start gap-3 rounded-lg border border-stroke-soft-200 p-4 transition-colors hover:bg-bg-weak-50 data-[checked=true]:border-primary-base'
                data-checked={field.value === 'private'}
              >
                <Checkbox.Root
                  id='usage-private'
                  value='private'
                  checked={field.value === 'private'}
                  onCheckedChange={() => field.onChange('private')}
                  ref={field.ref} // Attach ref
                />
                <div className='grid gap-1'>
                  <span className='text-label-md font-medium text-text-strong-950'>
                    Private
                  </span>
                  <span className='text-text-secondary-600 text-paragraph-sm'>
                    For purposes such as hobbies and interests.
                  </span>
                </div>
              </label>
              {/* Business Usage Option */}
              <label
                className='data-[checked=true]:bg-primary-light-100 flex cursor-pointer items-start gap-3 rounded-lg border border-stroke-soft-200 p-4 transition-colors hover:bg-bg-weak-50 data-[checked=true]:border-primary-base'
                data-checked={field.value === 'business'}
              >
                <Checkbox.Root
                  id='usage-business'
                  value='business'
                  checked={field.value === 'business'}
                  onCheckedChange={() => field.onChange('business')}
                />
                <div className='grid gap-1'>
                  <span className='text-label-md font-medium text-text-strong-950'>
                    Business
                  </span>
                  <span className='text-text-secondary-600 text-paragraph-sm'>
                    For purposes such as signing contracts and issuing.
                  </span>
                </div>
              </label>
            </div>
            <FormFieldError error={errors.usageOption} />
          </div>
        )}
      />

      {/* Privacy Section - Using Controller */}
      <Controller
        name='privacyOption'
        control={control}
        render={({ field }) => (
          <div className='space-y-3'>
            <h3 className='text-xs text-text-secondary-600 font-semibold uppercase'>
              Privacy
            </h3>
            <div className='space-y-3'>
              {/* Public Privacy Option */}
              <label
                className='data-[checked=true]:bg-primary-light-100 flex cursor-pointer items-start gap-3 rounded-lg border border-stroke-soft-200 p-4 transition-colors hover:bg-bg-weak-50 data-[checked=true]:border-primary-base'
                data-checked={field.value === 'public'}
              >
                <Checkbox.Root
                  id='privacy-public'
                  value='public'
                  checked={field.value === 'public'}
                  onCheckedChange={() => field.onChange('public')}
                  ref={field.ref} // Attach ref
                />
                <div className='grid gap-1'>
                  <span className='text-label-md font-medium text-text-strong-950'>
                    Public
                  </span>
                  <span className='text-text-secondary-600 text-paragraph-sm'>
                    Any worker can apply for the job.
                  </span>
                </div>
              </label>
              {/* Private Privacy Option */}
              <label
                className='data-[checked=true]:bg-primary-light-100 flex cursor-pointer items-start gap-3 rounded-lg border border-stroke-soft-200 p-4 transition-colors hover:bg-bg-weak-50 data-[checked=true]:border-primary-base'
                data-checked={field.value === 'private'}
              >
                <Checkbox.Root
                  id='privacy-private'
                  value='private'
                  checked={field.value === 'private'}
                  onCheckedChange={() => field.onChange('private')}
                />
                <div className='grid gap-1'>
                  <span className='text-label-md font-medium text-text-strong-950'>
                    Private
                  </span>
                  <span className='text-text-secondary-600 text-paragraph-sm'>
                    Only those who have been invited can take part in the work.
                  </span>
                </div>
              </label>
            </div>
            <FormFieldError error={errors.privacyOption} />
          </div>
        )}
      />

      {/* Navigation */}
      <div className='flex justify-between'>
        <Button.Root variant='neutral' mode='stroke' onClick={prevStep}>
          Previous
        </Button.Root>
        <Button.Root variant='neutral' mode='filled' onClick={nextStep}>
          Next
        </Button.Root>
      </div>
    </form>
  );
};

export default Step3UsageForm;
