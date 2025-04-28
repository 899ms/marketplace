'use client';

import React, { useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import * as Button from '@/components/ui/button';
import * as Label from '@/components/ui/label';
import * as Select from '@/components/ui/select';
import * as Tag from '@/components/ui/tag';
import {
  RiInformationLine,
  RiDeleteBinLine,
  RiFileTextLine,
  RiCheckboxCircleFill,
  RiUploadCloud2Line,
  RiCloseLine,
  RiLoader4Line,
} from '@remixicon/react';
import { CreateJobFormData } from '@/app/jobs/create/schema';
import FormFieldError from './FormFieldError';
import { useCreateJobForm } from '@/hooks/useCreateJobForm';

// Define union types for skill levels and sources
type SkillLevel = 'Trainee' | 'Director' | 'Skilled' | 'Expert';
type CandidateSource = 'Manual Entry' | 'Referral' | 'Skilled';

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
    control,
    setValue,
    getValues,
    watch,
  } = formMethods;

  const { uploadFile } = useCreateJobForm();
  const [fileUploadError, setFileUploadError] = useState<string | null>(null);
  const [uploadingFile, setUploadingFile] = useState<string | null>(null);

  // Watch the arrays for displaying selected items
  const watchSkillLevels = watch('skill_levels') || [];
  const watchCandidateSources = watch('candidate_sources') || [];
  const watchFiles = watch('files') || [];

  // Skill level options
  const skillLevelOptions = [
    { label: 'Trainee', value: 'Trainee' as SkillLevel },
    { label: 'Director', value: 'Director' as SkillLevel },
    { label: 'Skilled', value: 'Skilled' as SkillLevel },
    { label: 'Expert', value: 'Expert' as SkillLevel },
  ];

  // Candidate source options
  const candidateSourceOptions = [
    { label: 'Manual Entry', value: 'Manual Entry' as CandidateSource },
    { label: 'Referral', value: 'Referral' as CandidateSource },
    { label: 'Skilled', value: 'Skilled' as CandidateSource },
  ];

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileUploadError(null);
    const files = e.target.files;

    if (!files || files.length === 0) return;

    const currentFiles = getValues('files') || [];

    // Check if we already have 3 files
    if (currentFiles.length + files.length > 3) {
      setFileUploadError('Maximum 3 files allowed');
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Check if file is MP3 (or allow other formats as needed)
      const isValidFormat =
        file.type === 'audio/mpeg' ||
        file.name.toLowerCase().endsWith('.mp3') ||
        file.type === 'application/pdf'; // Also allowing PDF for this example

      // Check if file is under 25MB
      const isValidSize = file.size <= 25 * 1024 * 1024; // 25MB in bytes

      if (!isValidFormat) {
        setFileUploadError('Only MP3 audio files and PDFs are allowed');
        return;
      }

      if (!isValidSize) {
        setFileUploadError('Files must be under 25MB');
        return;
      }

      // Set uploading indicator
      setUploadingFile(file.name);

      try {
        // Upload file to Supabase storage directly
        const uploadedFile = await uploadFile(file);

        if (uploadedFile) {
          // Add the uploaded file with URL to the form state
          currentFiles.push(uploadedFile);
        } else {
          setFileUploadError(`Failed to upload ${file.name}`);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        setFileUploadError(`Error uploading ${file.name}`);
      } finally {
        setUploadingFile(null);
      }
    }

    setValue('files', currentFiles, { shouldValidate: true });

    // Reset the file input
    e.target.value = '';
  };

  // Handle removing a file
  const handleRemoveFile = (fileName: string) => {
    const currentFiles = getValues('files') || [];
    setValue(
      'files',
      currentFiles.filter((file) => file.name !== fileName),
      { shouldValidate: true },
    );
  };

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Handle skill level selection
  const handleSkillLevelSelect = (value: string) => {
    const currentSkillLevels = getValues('skill_levels') || [];
    if (!currentSkillLevels.includes(value as SkillLevel)) {
      setValue('skill_levels', [...currentSkillLevels, value as SkillLevel], {
        shouldValidate: true,
      });
    }
  };

  // Handle removing a skill level
  const handleRemoveSkillLevel = (value: SkillLevel) => {
    const currentSkillLevels = getValues('skill_levels') || [];
    setValue(
      'skill_levels',
      currentSkillLevels.filter((level) => level !== value),
      { shouldValidate: true },
    );
  };

  // Handle candidate source selection
  const handleCandidateSourceSelect = (value: string) => {
    const currentSources = getValues('candidate_sources') || [];
    if (!currentSources.includes(value as CandidateSource)) {
      setValue(
        'candidate_sources',
        [...currentSources, value as CandidateSource],
        {
          shouldValidate: true,
        },
      );
    }
  };

  // Handle removing a candidate source
  const handleRemoveCandidateSource = (value: CandidateSource) => {
    const currentSources = getValues('candidate_sources') || [];
    setValue(
      'candidate_sources',
      currentSources.filter((source) => source !== value),
      { shouldValidate: true },
    );
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className='space-y-6'>
      {/* Skill Levels */}
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-1'>
          <Label.Root className='text-label-sm text-text-strong-950'>
            Skill Levels
          </Label.Root>
          <RiInformationLine
            className='text-text-secondary-600'
            size={16}
            aria-label='Select required skill levels'
          />
        </div>

        <Controller
          name='skill_levels'
          control={control}
          render={({ field }) => (
            <div>
              <Select.Root value='' onValueChange={handleSkillLevelSelect}>
                <Select.Trigger className='w-full'>
                  <Select.Value placeholder='Select skill levels' />
                </Select.Trigger>
                <Select.Content>
                  {skillLevelOptions.map((option) => (
                    <Select.Item key={option.value} value={option.value}>
                      {option.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>

              <div className='mt-2 flex flex-wrap gap-2'>
                {watchSkillLevels.map((level) => (
                  <Tag.Root key={level} variant='gray'>
                    {level}
                    <button
                      type='button'
                      onClick={() => handleRemoveSkillLevel(level)}
                      className='ml-1 inline-flex items-center'
                      aria-label='Remove'
                    >
                      <RiCloseLine size={14} />
                    </button>
                  </Tag.Root>
                ))}
              </div>

              {errors.skill_levels && (
                <p className='text-xs mt-1 text-red-500'>
                  {Array.isArray(errors.skill_levels)
                    ? errors.skill_levels[0]?.message
                    : errors.skill_levels.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Candidate Sources */}
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-1'>
          <Label.Root className='text-label-sm text-text-strong-950'>
            Candidate Sources
          </Label.Root>
          <RiInformationLine
            className='text-text-secondary-600'
            size={16}
            aria-label='Select where candidates should come from'
          />
        </div>

        <Controller
          name='candidate_sources'
          control={control}
          render={({ field }) => (
            <div>
              <Select.Root value='' onValueChange={handleCandidateSourceSelect}>
                <Select.Trigger className='w-full'>
                  <Select.Value placeholder='Select candidate sources' />
                </Select.Trigger>
                <Select.Content>
                  {candidateSourceOptions.map((option) => (
                    <Select.Item key={option.value} value={option.value}>
                      {option.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>

              <div className='mt-2 flex flex-wrap gap-2'>
                {watchCandidateSources.map((source) => (
                  <Tag.Root key={source} variant='gray'>
                    {source}
                    <button
                      type='button'
                      onClick={() => handleRemoveCandidateSource(source)}
                      className='ml-1 inline-flex items-center'
                      aria-label='Remove'
                    >
                      <RiCloseLine size={14} />
                    </button>
                  </Tag.Root>
                ))}
              </div>

              {errors.candidate_sources && (
                <p className='text-xs mt-1 text-red-500'>
                  {Array.isArray(errors.candidate_sources)
                    ? errors.candidate_sources[0]?.message
                    : errors.candidate_sources.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* File Upload */}
      <div className='flex flex-col gap-1'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <Label.Root className='text-label-sm text-text-strong-950'>
              Add Download File (Up to 3 audio files)
            </Label.Root>
            <RiInformationLine
              className='text-text-secondary-600'
              size={16}
              aria-label='MP3 format and 25 MB size limitations'
            />
          </div>

          <label htmlFor='file-upload' className='cursor-pointer'>
            <Button.Root
              variant='neutral'
              mode='stroke'
              size='small'
              type='button'
              className='flex items-center'
              onClick={() => document.getElementById('file-upload')?.click()}
              disabled={!!uploadingFile}
            >
              {uploadingFile ? (
                <>
                  <RiLoader4Line className='mr-2 animate-spin' />
                  Uploading...
                </>
              ) : (
                <>
                  <RiUploadCloud2Line className='mr-1' />
                  Upload
                </>
              )}
            </Button.Root>
            <input
              id='file-upload'
              type='file'
              accept='.mp3,audio/mpeg,application/pdf,.pdf'
              onChange={handleFileUpload}
              className='hidden'
              disabled={!!uploadingFile}
            />
          </label>
        </div>

        <p className='text-xs text-text-secondary-600'>
          MP3 format and 25 MB size limitations
        </p>

        {uploadingFile && (
          <p className='text-sm text-primary-500 mt-1'>
            Uploading {uploadingFile}...
          </p>
        )}

        {fileUploadError && (
          <p className='text-sm mt-1 text-red-500'>{fileUploadError}</p>
        )}

        <div className='mt-2 space-y-2'>
          {watchFiles.map((file, index) => (
            <div
              key={index}
              className='flex items-center justify-between rounded-md border border-stroke-soft-200 p-2'
            >
              <div className='flex items-center gap-2'>
                <RiFileTextLine className='text-primary-base' size={20} />
                <div>
                  <p className='text-sm font-medium text-text-strong-950'>
                    {file.name}
                  </p>
                  <p className='text-xs text-text-secondary-600'>
                    {formatFileSize(file.size)}
                  </p>
                </div>
                {file.url && (
                  <RiCheckboxCircleFill
                    className='text-green-500'
                    size={16}
                    aria-label='Uploaded successfully'
                  />
                )}
              </div>
              <Button.Root
                variant='neutral'
                mode='ghost'
                size='small'
                onClick={() => handleRemoveFile(file.name)}
              >
                <RiDeleteBinLine className='text-red-500' />
              </Button.Root>
            </div>
          ))}
        </div>
      </div>

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
