'use client';

import React, { useState } from 'react';
import Image from 'next/image'; // Keep if image preview is implemented
import * as Button from '@/components/ui/button';
import * as FileUpload from '@/components/ui/file-upload';
import * as Input from '@/components/ui/input';
import * as Label from '@/components/ui/label';
import * as Tag from '@/components/ui/tag';
import * as Textarea from '@/components/ui/textarea';
import {
  RiUploadCloud2Line,
  RiCloseLine,
  RiInformationLine,
} from '@remixicon/react';
import { cn } from '@/utils/cn'; // Assuming utils path is correct

interface Step1BasicInfoProps {
  nextStep: () => void;
  // Add formData and setFormData props if state is managed centrally
}

export function Step1BasicInfo({ nextStep }: Step1BasicInfoProps) {
  // Local state for tags - consider lifting if needed by other steps/review
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '' && tags.length < 8) {
      e.preventDefault();
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // TODO: Add state and handlers for file upload and other inputs

  return (
    <div className='shadow-sm mx-auto max-w-2xl rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
      {/* Header */}
      <div className='flex items-center justify-between border-b border-stroke-soft-200 p-4'>
        <div>
          <h2 className='font-semibold text-text-strong-950'>Post Service</h2>
          <p className='text-sm text-text-secondary-600'>Basic Settings</p>
        </div>
        <Button.Root variant='neutral' mode='ghost' size='medium'>
          <Button.Icon as={RiCloseLine} />
        </Button.Root>
      </div>

      {/* Form Fields */}
      <div className='space-y-6 p-6'>
        {/* Service Title */}
        <div className='flex flex-col gap-1'>
          <Label.Root className='text-label-sm text-text-strong-950'>
            Service title
          </Label.Root>
          <Input.Root>
            <Input.Wrapper>
              <Input.Input placeholder='Enter the contract title...' />
            </Input.Wrapper>
          </Input.Root>
        </div>

        {/* Detail */}
        <div className='flex flex-col gap-1'>
          <Label.Root className='text-label-sm text-text-strong-950'>
            Detail
          </Label.Root>
          <Textarea.Root rows={5} placeholder='Details' className='resize-none'>
            {/* Character counter can be added here if needed */}
          </Textarea.Root>
          <span className='text-xs text-text-secondary-600 self-end'>
            0/2000
          </span>
        </div>

        {/* Add Tags Field */}
        <div className='flex flex-col gap-1'>
          <Label.Root className='flex items-center gap-1 text-label-sm text-text-strong-950'>
            Add Tags
            <RiInformationLine className='text-icon-secondary-400 size-4' />
          </Label.Root>
          <Input.Root>
            <Input.Wrapper>
              <Input.Input
                placeholder='Pixel Art'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleAddTag}
              />
            </Input.Wrapper>
          </Input.Root>
          {tags.length > 0 && (
            <div className='mt-2 flex flex-wrap gap-1.5'>
              {tags.map((tag, index) => (
                <Tag.Root key={index} variant='stroke' className='pl-2'>
                  {tag}
                  <Tag.DismissButton onClick={() => handleRemoveTag(tag)} />
                </Tag.Root>
              ))}
            </div>
          )}
        </div>

        {/* File Upload */}
        <FileUpload.Root>
          {/* TODO: Connect input ref and handle file selection */}
          <input multiple type='file' tabIndex={-1} className='hidden' />
          <FileUpload.Icon as={RiUploadCloud2Line} />
          <div className='space-y-1.5'>
            <div className='text-label-sm text-text-strong-950'>
              Choose a file or drag & drop it here
            </div>
            <div className='text-paragraph-xs text-text-sub-600'>
              JPEG, PNG, PDF, and MP4 formats, up to 50 MB.
            </div>
          </div>
          <FileUpload.Button>Browse File</FileUpload.Button>
        </FileUpload.Root>

        {/* Placeholder for uploaded image preview */}
        {/* TODO: Implement image preview logic */}
        <div className='relative h-32 w-48 overflow-hidden rounded-lg bg-gradient-to-br from-blue-400 to-purple-500'>
          {/* Add delete/edit icons if needed */}
        </div>
      </div>

      {/* Footer / Navigation */}
      <div className='flex items-center justify-between border-t border-stroke-soft-200 p-4'>
        {/* Step Indicators */}
        <div className='flex gap-1.5'>
          <span className='block h-1.5 w-4 rounded-full bg-primary-base'></span>
          <span className='block h-1.5 w-1.5 rounded-full bg-bg-soft-200'></span>
          <span className='block h-1.5 w-1.5 rounded-full bg-bg-soft-200'></span>
        </div>
        {/* Action Buttons */}
        <div>
          <Button.Root variant='neutral' mode='stroke' className='mr-2'>
            Close
          </Button.Root>
          <Button.Root variant='neutral' mode='filled' onClick={nextStep}>
            Next
          </Button.Root>
        </div>
      </div>
    </div>
  );
}
