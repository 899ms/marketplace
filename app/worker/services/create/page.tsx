'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import * as Avatar from '@/components/ui/avatar';
import * as Button from '@/components/ui/button';
import * as FileUpload from '@/components/ui/file-upload';
import * as Input from '@/components/ui/input';
import * as Label from '@/components/ui/label';
import * as Select from '@/components/ui/select';
import * as Tag from '@/components/ui/tag';
import * as Textarea from '@/components/ui/textarea';
import {
  RiCheckLine,
  RiUploadCloud2Line,
  RiCloseLine,
  RiArrowRightSLine,
  RiArrowLeftSLine,
  RiInformationLine,
  RiAddLine,
  RiStarFill,
  RiGoogleFill,
  RiMoneyDollarCircleLine,
  RiTimeLine,
} from '@remixicon/react';
import { cn } from '@/utils/cn';

// --- Stepper Component ---
interface StepperProps {
  currentStep: number;
  steps: string[];
}

const Stepper = ({ currentStep, steps }: StepperProps) => {
  return (
    <div className='mb-8 flex items-center justify-center gap-4'>
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;

        return (
          <React.Fragment key={label}>
            <div className='flex items-center gap-2'>
              <div
                className={cn(
                  'flex size-6 items-center justify-center rounded-full text-label-sm font-medium',
                  isCompleted
                    ? 'bg-success-base text-static-white'
                    : 'text-text-secondary-600 bg-bg-weak-50',
                )}
              >
                {isCompleted ? <RiCheckLine className='size-4' /> : stepNumber}
              </div>
              <span
                className={cn(
                  'text-label-md',
                  isCompleted
                    ? 'text-text-strong-950'
                    : 'text-text-secondary-600',
                )}
              >
                {label}
              </span>
            </div>
            {stepNumber < steps.length && (
              <div className='h-px w-12 bg-stroke-soft-200'></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// --- Step 1: Basic Settings ---
const Step1BasicInfo = ({ nextStep }: { nextStep: () => void }) => {
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

  return (
    <div className='shadow-sm mx-auto max-w-2xl rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
      <div className='flex items-center justify-between border-b border-stroke-soft-200 p-4'>
        <div>
          <h2 className='font-semibold text-text-strong-950'>Post Service</h2>
          <p className='text-sm text-text-secondary-600'>Basic Settings</p>
        </div>
        <Button.Root variant='neutral' mode='ghost' size='medium'>
          <Button.Icon as={RiCloseLine} />
        </Button.Root>
      </div>

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
        <div className='relative h-32 w-48 overflow-hidden rounded-lg bg-gradient-to-br from-blue-400 to-purple-500'>
          {/* Add delete/edit icons if needed */}
        </div>
      </div>

      <div className='flex items-center justify-between border-t border-stroke-soft-200 p-4'>
        <div className='flex gap-1.5'>
          <span className='block h-1.5 w-4 rounded-full bg-primary-base'></span>
          <span className='block h-1.5 w-1.5 rounded-full bg-bg-soft-200'></span>
          <span className='block h-1.5 w-1.5 rounded-full bg-bg-soft-200'></span>
        </div>
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
};

// --- Step 2: Pricing ---
const Step2Pricing = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  return (
    <div className='shadow-sm mx-auto max-w-2xl rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
      <div className='flex items-center justify-between border-b border-stroke-soft-200 p-4'>
        <div>
          <h2 className='font-semibold text-text-strong-950'>Post Service</h2>
          <p className='text-sm text-text-secondary-600'>Price and Details</p>
        </div>
        <Button.Root variant='neutral' mode='ghost' size='medium'>
          <Button.Icon as={RiCloseLine} />
        </Button.Root>
      </div>

      <div className='space-y-6 p-6'>
        {/* Pricing and Lead Time */}
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-1'>
            <Label.Root className='flex items-center gap-1 text-label-sm text-text-strong-950'>
              Pricing
              <RiInformationLine className='text-icon-secondary-400 size-4' />
            </Label.Root>
            <div className='flex gap-2'>
              <Input.Root className='flex-1'>
                <Input.Wrapper>
                  <Input.InlineAffix>¥</Input.InlineAffix>
                  <Input.Input
                    type='number'
                    placeholder='0.00'
                    defaultValue={0.0}
                  />
                </Input.Wrapper>
              </Input.Root>
              <Select.Root defaultValue='CNY' size='small'>
                <Select.Trigger className='w-auto'>
                  {/* Placeholder for Flag + Currency */}
                  <div className='flex items-center gap-1.5'>
                    <span className='flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white'>
                      C
                    </span>
                    CNY
                  </div>
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    <Select.Item value='CNY'>CNY</Select.Item>
                    <Select.Item value='USD'>USD</Select.Item>
                    <Select.Item value='EUR'>EUR</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <Label.Root className='text-label-sm text-text-strong-950'>
              Lead Time (days)
            </Label.Root>
            <Input.Root>
              <Input.Wrapper>
                <Input.Input
                  type='number'
                  placeholder='7 Days'
                  defaultValue={7}
                />
              </Input.Wrapper>
            </Input.Root>
          </div>
        </div>

        {/* Additional Service Section */}
        <div className='space-y-4 rounded-lg border border-stroke-soft-200 p-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-1'>
              <Label.Root className='text-label-sm text-text-strong-950'>
                Additional Service Name
              </Label.Root>
              <Input.Root>
                <Input.Wrapper>
                  <Input.Input placeholder='Service name' />
                </Input.Wrapper>
              </Input.Root>
            </div>
            <div className='flex flex-col gap-1'>
              <Label.Root className='flex items-center gap-1 text-label-sm text-text-strong-950'>
                Pricing
                <RiInformationLine className='text-icon-secondary-400 size-4' />
              </Label.Root>
              <Input.Root>
                <Input.Wrapper>
                  <Input.InlineAffix>¥</Input.InlineAffix>
                  <Input.Input
                    type='number'
                    placeholder='0.00'
                    defaultValue={0.0}
                  />
                </Input.Wrapper>
              </Input.Root>
            </div>
          </div>
          {/* TODO: Add functionality to add/remove additional services */}
        </div>
        <Button.Root
          variant='neutral'
          mode='stroke'
          size='small'
          className='w-full justify-start'
        >
          <Button.Icon as={RiAddLine} />
          Add Additional Service
        </Button.Root>
      </div>

      {/* Footer with Navigation */}
      <div className='flex items-center justify-between border-t border-stroke-soft-200 p-4'>
        <div className='flex gap-1.5'>
          <span className='block h-1.5 w-1.5 rounded-full bg-bg-soft-200'></span>
          <span className='block h-1.5 w-4 rounded-full bg-primary-base'></span>
          <span className='block h-1.5 w-1.5 rounded-full bg-bg-soft-200'></span>
        </div>
        <div>
          <Button.Root
            variant='neutral'
            mode='stroke'
            onClick={prevStep}
            className='mr-2'
          >
            Previous
          </Button.Root>
          <Button.Root variant='neutral' mode='filled' onClick={nextStep}>
            Next
          </Button.Root>
        </div>
      </div>
    </div>
  );
};

// --- Step 3: Review ---
const Step3Review = ({
  prevStep,
  submitForm,
}: {
  prevStep: () => void;
  submitForm: () => void;
}) => {
  // Mock data for preview - replace with formData when available
  const previewData = {
    title: 'WordPress Website Design',
    images: [
      'https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Service+Image+1',
      'https://via.placeholder.com/100x75/A78BFA/FFFFFF?text=Thumb+1',
      'https://via.placeholder.com/100x75/C4B5FD/FFFFFF?text=Thumb+2',
      'https://via.placeholder.com/100x75/DDD6FE/FFFFFF?text=Thumb+3',
    ],
    details:
      'I am a WordPress Expert with Experience in WordPress website design and development. I have a good hand of experience in WordPress Installation, WordPress Responsive Design, WordPress Development, WordPress Plugin integration, WordPress speed optimization, and WordPress SEO.',
    includedItems: [
      'WordPress Theme Development',
      'WordPress Theme Customization',
      'Divi Theme/Builder',
      'Elementor Pro...',
    ],
    options: [
      {
        name: 'Preparation of consumption tax return (general taxation)',
        price: '$201',
      },
      {
        name: 'Consumption tax return preparation (simplified taxation)',
        price: '$134',
      },
      { name: 'Express Service', price: '$201' },
      {
        name: 'Sending paper documents of supporting documents (if they are divided by subject)',
        price: '$37',
      },
      { name: 'Bookkeeping service (50 entries 5,000 yen)', price: '$34' },
      {
        name: 'Electronic filing (proxy sending, user identification number obtained)',
        price: '$34',
      },
      { name: 'Medical Expense Deduction Receipts (20 or more)', price: '$34' },
    ],
    worker: {
      name: 'Cleve Music',
      avatar: 'https://via.placeholder.com/100',
      rating: 4.9,
      reviews: 125,
    },
    price: '$140',
    leadTime: '7 Days',
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handlePrevClick = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? previewData.images.length - 1 : prev - 1,
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prev) =>
      prev === previewData.images.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div className='mx-auto max-w-6xl'>
      {' '}
      {/* Wider container for this step */}
      <h1 className='text-2xl mb-6 font-semibold text-text-strong-950'>
        You will get {previewData.title}
      </h1>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
        {/* Left Content: Image, Details, Options */}
        <div className='space-y-6 md:col-span-8'>
          {/* Image Carousel */}
          <div className='space-y-3'>
            <div className='relative aspect-video w-full overflow-hidden rounded-xl bg-bg-weak-50'>
              {/* Main Image - Replaced with next/image */}
              <Image
                src={previewData.images[currentImageIndex]}
                alt={previewData.title}
                fill
                className='object-cover'
              />
              {/* Carousel Controls */}
              <button
                onClick={handlePrevClick}
                className='absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-1 text-gray-800 hover:bg-white'
              >
                <RiArrowLeftSLine className='size-5' />
              </button>
              <button
                onClick={handleNextClick}
                className='absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-1 text-gray-800 hover:bg-white'
              >
                <RiArrowRightSLine className='size-5' />
              </button>
            </div>
            {/* Thumbnails */}
            <div className='flex gap-3'>
              {previewData.images.slice(1).map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index + 1)}
                  className={cn(
                    'aspect-video w-24 overflow-hidden rounded-lg border-2',
                    currentImageIndex === index + 1
                      ? 'border-primary-base'
                      : 'border-transparent hover:border-gray-300',
                  )}
                >
                  <Image
                    src={thumb}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className='object-cover'
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className='shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6'>
            <h2 className='text-lg mb-4 font-semibold text-text-strong-950'>
              Details
            </h2>
            <p className='text-sm text-text-secondary-600 mb-4'>
              {previewData.details}
            </p>
            <h3 className='text-sm mb-2 font-medium text-text-strong-950'>
              My wordpress website design services:
            </h3>
            <ul className='mb-3 space-y-1.5'>
              {previewData.includedItems.map((item, idx) => (
                <li
                  key={idx}
                  className='text-sm text-text-secondary-600 flex items-center gap-2'
                >
                  <RiCheckLine className='size-4 shrink-0 text-success-base' />
                  {item}
                </li>
              ))}
            </ul>
            <Button.Root
              variant='neutral'
              mode='ghost'
              size='small'
              className='text-text-primary-600'
            >
              Show More
            </Button.Root>
          </div>

          {/* Options Section */}
          <div className='shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6'>
            <h2 className='text-lg mb-4 font-semibold text-text-strong-950'>
              Options
            </h2>
            <div className='space-y-3 divide-y divide-stroke-soft-200'>
              {previewData.options.map((option, idx) => (
                <div
                  key={idx}
                  className='flex items-center justify-between pt-3 first:pt-0'
                >
                  <span className='text-sm text-text-secondary-600'>
                    {option.name}
                  </span>
                  <span className='text-sm font-medium text-text-strong-950'>
                    {option.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Worker Info, Price, Buttons */}
        <div className='md:col-span-4'>
          <div className='sticky top-20 space-y-6'>
            {/* Worker Info Card */}
            <div className='shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6'>
              <div className='flex flex-col items-center text-center'>
                <Avatar.Root size='80'>
                  <Avatar.Image
                    src={previewData.worker.avatar}
                    alt={previewData.worker.name}
                  />
                  {/* Add online indicator if needed */}
                  <Avatar.Indicator position='bottom'>
                    <div className='size-4 rounded-full bg-green-500 ring-2 ring-white' />
                  </Avatar.Indicator>
                </Avatar.Root>
                <h2 className='text-xl mt-3 font-semibold text-text-strong-950'>
                  {previewData.worker.name}
                </h2>
                <div className='text-text-secondary-600 mt-1 flex items-center gap-1'>
                  <RiStarFill className='size-4 text-yellow-400' />
                  <span>
                    {previewData.worker.rating} ({previewData.worker.reviews})
                  </span>
                </div>
                <div className='mt-2 flex items-center'>
                  <RiGoogleFill className='text-text-secondary-600 size-5' />
                  <RiGoogleFill className='text-text-secondary-600 size-5' />
                </div>
              </div>
            </div>

            {/* Price & Lead Time Card */}
            <div className='shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
              <div className='flex justify-between border-b border-stroke-soft-200 p-4'>
                <span className='text-text-secondary-600 flex items-center gap-2 font-medium'>
                  <RiMoneyDollarCircleLine className='text-icon-secondary-400 size-5' />{' '}
                  Price
                </span>
                <span className='font-semibold text-text-strong-950'>
                  {previewData.price}
                </span>
              </div>
              <div className='flex justify-between p-4'>
                <span className='text-text-secondary-600 flex items-center gap-2 font-medium'>
                  <RiTimeLine className='text-icon-secondary-400 size-5' /> Lead
                  Time
                </span>
                <span className='text-text-secondary-600 font-medium'>
                  {previewData.leadTime}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-3'>
              <Button.Root
                variant='neutral'
                mode='stroke'
                onClick={prevStep}
                className='flex-1'
              >
                Edit
              </Button.Root>
              <Button.Root
                variant='neutral'
                mode='filled'
                onClick={submitForm}
                className='flex-1'
              >
                Post
              </Button.Root>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function CreateServicePage() {
  const [activeStep, setActiveStep] = useState(1);

  const [currentStep, setCurrentStep] = useState(activeStep);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    detail: '',
    tags: [] as string[],
    image: null,
    price: 0.0,
    currency: 'CNY',
    leadTime: 7,
  });
  const steps = ['Worker Terms', 'Submit', 'Review'];

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const submitForm = () => {
    console.log('Form Submitted:', {});
    // Handle actual form submission logic here
    console.log('Form Submitted:', formData);
    setActiveStep(currentStep + 1);
    setFormData({
      title: '',
      detail: '',
      tags: [] as string[],
      image: null,
      price: 0.0,
      currency: 'CNY',
      leadTime: 7,
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo nextStep={nextStep} />;
      case 2:
        return <Step2Pricing nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step3Review prevStep={prevStep} submitForm={submitForm} />;
      default:
        return <Step1BasicInfo nextStep={nextStep} />;
    }
  };

  return (
    <div className='container mx-auto px-4 py-10'>
      <Stepper currentStep={currentStep} steps={steps} />
      {renderStep()}
    </div>
  );
}
