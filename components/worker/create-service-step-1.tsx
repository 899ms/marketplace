'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { UseFormReturn } from 'react-hook-form';
import { CreateServiceFormData } from '@/app/worker/services/create/schema';
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
  RiLoader4Line,
  RiDeleteBinLine,
  RiCheckboxCircleFill,
  RiFileTextLine,
} from '@remixicon/react';
import { cn } from '@/utils/cn';
import { useCreateServiceForm } from '@/hooks/useCreateServiceForm';

interface Step1BasicInfoProps {
  formMethods: UseFormReturn<CreateServiceFormData>;
  nextStep: () => void;
}

export function Step1BasicInfo({ formMethods, nextStep }: Step1BasicInfoProps) {
  const { uploadFile } = useCreateServiceForm();
  const [inputValue, setInputValue] = useState('');
  const [fileUploadError, setFileUploadError] = useState<string | null>(null);
  const [uploadingFile, setUploadingFile] = useState<string | null>(null);

  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = formMethods;

  const tags = watch('tags') || [];
  const images = watch('images') || [];
  const description = watch('description') || '';

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '' && tags.length < 8) {
      e.preventDefault();
      setValue('tags', [...tags, inputValue.trim()], { shouldValidate: true });
      setInputValue('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue(
      'tags',
      tags.filter((tag) => tag !== tagToRemove),
      { shouldValidate: true },
    );
  };

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileUploadError(null);
    const files = e.target.files;

    if (!files || files.length === 0) return;

    const currentFiles = getValues('images') || [];

    // Check if we already have 5 images
    if (currentFiles.length + files.length > 5) {
      setFileUploadError('Maximum 5 images allowed');
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Check if file is allowed format (image or audio)
      const isValidFormat =
        file.type.startsWith('image/') ||
        file.type === 'audio/mpeg' ||
        file.type === 'application/pdf';

      // Check if file is under 50MB
      const isValidSize = file.size <= 50 * 1024 * 1024; // 50MB in bytes

      if (!isValidFormat) {
        setFileUploadError('Only image, MP3, and PDF files are allowed');
        return;
      }

      if (!isValidSize) {
        setFileUploadError('Files must be under 50MB');
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

    setValue('images', currentFiles, { shouldValidate: true });

    // Reset the file input
    e.target.value = '';
  };

  // Handle removing a file
  const handleRemoveFile = (fileName: string) => {
    setValue(
      'images',
      images.filter((file) => file.name !== fileName),
      { shouldValidate: true },
    );
  };

  const isValidToMoveNext = () => {
    const { title, description } = getValues();
    return title?.length > 0 && description?.length >= 10;
  };

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

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
              <Input.Input
                placeholder='Enter the service title...'
                {...register('title')}
              />
            </Input.Wrapper>
          </Input.Root>
          {errors.title && (
            <p className='text-xs mt-1 text-red-500'>{errors.title.message}</p>
          )}
        </div>

        {/* Detail */}
        <div className='flex flex-col gap-1'>
          <Label.Root className='text-label-sm text-text-strong-950'>
            Detail
          </Label.Root>
          <Textarea.Root
            rows={5}
            placeholder='Details'
            className='resize-none'
            {...register('description')}
          />
          <span className='text-xs text-text-secondary-600 self-end'>
            {description.length}/2000
          </span>
          {errors.description && (
            <p className='text-xs mt-1 text-red-500'>
              {errors.description.message}
            </p>
          )}
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
        <div className='flex flex-col gap-1'>
          <Label.Root className='flex items-center gap-1 text-label-sm text-text-strong-950'>
            Upload Images or Audio Files
            <RiInformationLine className='text-icon-secondary-400 size-4' />
          </Label.Root>

          <label htmlFor='file-upload' className='cursor-pointer'>
            <FileUpload.Root className='w-full'>
              <input
                id='file-upload'
                type='file'
                accept='image/*,audio/mpeg,application/pdf'
                onChange={handleFileUpload}
                className='hidden'
                disabled={!!uploadingFile}
              />
              <FileUpload.Icon
                as={uploadingFile ? RiLoader4Line : RiUploadCloud2Line}
                className={uploadingFile ? 'animate-spin' : ''}
              />
              <div className='space-y-1.5'>
                <div className='text-label-sm text-text-strong-950'>
                  {uploadingFile
                    ? `Uploading ${uploadingFile}...`
                    : 'Choose a file or drag & drop it here'}
                </div>
                <div className='text-paragraph-xs text-text-sub-600'>
                  JPEG, PNG, PDF, and MP3 formats, up to 50 MB.
                </div>
              </div>
              <FileUpload.Button>Browse Files</FileUpload.Button>
            </FileUpload.Root>
          </label>

          {fileUploadError && (
            <p className='text-sm mt-1 text-red-500'>{fileUploadError}</p>
          )}

          {/* Display uploaded files */}
          {images.length > 0 && (
            <div className='mt-4 space-y-2'>
              {images.map((file, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between rounded-md border border-stroke-soft-200 p-2'
                >
                  <div className='flex items-center gap-2'>
                    {file.url &&
                    file.url.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                      <div className='bg-bg-soft-100 relative h-10 w-10 overflow-hidden rounded-md'>
                        <Image
                          src={file.url}
                          alt={file.name}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    ) : (
                      <RiFileTextLine className='text-primary-base' size={20} />
                    )}
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
          )}
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
          <Button.Root
            variant='neutral'
            mode='filled'
            onClick={nextStep}
            disabled={!isValidToMoveNext()}
          >
            Next
          </Button.Root>
        </div>
      </div>
    </div>
  );
}
