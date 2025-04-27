'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import * as Button from '@/components/ui/button';
import * as Label from '@/components/ui/label';
import * as Textarea from '@/components/ui/textarea';
// import * as Select from '@/components/ui/select';
// import * as Tag from '@/components/ui/tag';
// import * as FileUpload from '@/components/ui/file-upload';
import {} from // RiInformationLine,
// RiDeleteBinLine,
// RiFileTextLine,
// RiCheckboxCircleFill,
'@remixicon/react';
import { CreateJobFormData } from '@/app/jobs/create/schema';
import FormFieldError from './FormFieldError';

interface Step2Props {
  formMethods: UseFormReturn<CreateJobFormData>;
  nextStep: () => void;
  prevStep: () => void;
}

const Step2SkillsForm: React.FC<Step2Props> = ({
  formMethods,
  nextStep,
  prevStep,
}) => {
  const {
    register,
    formState: { errors },
    // control, // Import control if using Controller for complex fields
  } = formMethods;

  // TODO: Integrate Skills, Sources, File Uploads properly with RHF (potentially using Controller)
  // For now, just using a simple textarea for 'requirements' field from schema.

  return (
    <form onSubmit={(e) => e.preventDefault()} className='space-y-6'>
      {/* Requirements Textarea */}
      <div className='flex flex-col gap-1'>
        <Label.Root
          htmlFor='requirements'
          className='text-label-sm text-text-strong-950'
        >
          Requirements / Skills / Files
        </Label.Root>
        <Textarea.Root
          id='requirements'
          rows={6} // Increased rows
          placeholder='Describe the required skills, experience, and any necessary files...'
          className='resize-none'
          {...register('requirements')}
        />
        <FormFieldError error={errors.requirements} />
      </div>

      {/* TODO: Re-implement Skills, Sources, File Upload UI using RHF Controller if needed */}
      {/* Example placeholder - remove or replace */}
      {/*
      <div className='p-4 border border-dashed border-gray-300 rounded-md'>
        <p className='text-center text-gray-500'>
          [Skills, Sources, File Upload UI temporarily removed - Re-implement using react-hook-form Controller]
        </p>
      </div>
      */}

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

export default Step2SkillsForm;
