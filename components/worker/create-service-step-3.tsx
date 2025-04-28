'use client';

import React, { useState } from 'react';
import Image from 'next/image'; // Need next/image for the carousel part
import { UseFormReturn } from 'react-hook-form';
import { CreateServiceFormData } from '@/app/worker/services/create/schema';
import * as Avatar from '@/components/ui/avatar';
import * as Button from '@/components/ui/button';
// Removed imports not used in the reference Step3Review (Badge, ServiceInfoLeft, etc.)
import { useAuth } from '@/utils/supabase/AuthContext';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCheckLine,
  RiLoader4Line, // Keep for submitting state
  RiMoneyDollarCircleLine,
  RiTimeLine,
  RiStarFill,
  RiGoogleFill,
} from '@remixicon/react';
import { cn } from '@/utils/cn';

// --- Local formatCurrency function (Workaround) ---
function formatCurrency(
  amount: number | null | undefined,
  currencyCode: string = 'USD',
): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '-';
  }
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    console.error(`Error formatting currency for code ${currencyCode}:`, error);
    return `$${amount.toFixed(2)}`;
  }
}
// --- End Local Function ---

// Define the props interface expected by the component
interface Step3ReviewProps {
  formMethods: UseFormReturn<CreateServiceFormData>;
  prevStep: () => void;
  submitForm: () => void;
  isSubmitting: boolean;
}

// --- Step 3 Review Component - Adapted from Reference ---
export function Step3Review({
  formMethods,
  prevStep,
  submitForm,
  isSubmitting,
}: Step3ReviewProps) {
  // Get form data
  const formData = formMethods.getValues();
  const { user } = useAuth(); // Get user for provider info

  // Prepare data in the structure the reference component expects
  // Use form data instead of mock previewData
  const displayData = {
    title: formData.title || '[Service Title]',
    // Map image data: use URL if available (already uploaded), otherwise create blob URL for preview
    images: formData.images?.map(
      (img) =>
        img.url ||
        (img.file ? URL.createObjectURL(img.file) : '/placeholder-image.svg'),
    ) || [
      'https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Placeholder', // Fallback image if none provided
    ],
    details: formData.description || '[Service Description]',
    includedItems: formData.includes || [],
    options:
      formData.additionalServices?.map((addSvc) => ({
        name: addSvc.name,
        // Format price using local function
        price: formatCurrency(addSvc.price, formData.currency),
      })) || [],
    worker: {
      name: user?.user_metadata?.full_name || user?.email || 'Your Name',
      avatar:
        user?.user_metadata?.avatar_url || 'https://via.placeholder.com/100', // Use placeholder if no avatar
      rating: 0.0, // Placeholder
      reviews: 0, // Placeholder
    },
    // Format price and lead time
    price: formatCurrency(formData.price, formData.currency),
    leadTime: `${formData.lead_time || '?'} Day${formData.lead_time !== 1 ? 's' : ''}`,
  };

  // State for image carousel (as in reference)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cleanup blob URLs when component unmounts
  React.useEffect(() => {
    const imageUrls = displayData.images;
    // Filter out non-blob URLs before attempting revoke
    const blobUrls = imageUrls.filter((url) => url.startsWith('blob:'));
    return () => {
      blobUrls.forEach((url) => URL.revokeObjectURL(url));
    };
    // Use formData.images as dependency, because displayData.images might contain blob URLs that change
  }, [formData.images]);

  const handleThumbnailClick = (index: number) => {
    // Adjust index because reference sliced the array for thumbnails
    setCurrentImageIndex(index);
  };

  const handlePrevClick = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? displayData.images.length - 1 : prev - 1,
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prev) =>
      prev === displayData.images.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div className='mx-auto max-w-6xl'>
      <h1 className='text-2xl mb-6 font-semibold text-text-strong-950'>
        You will get {displayData.title}
      </h1>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
        {/* Left Content: Image, Details, Options */}
        <div className='space-y-6 md:col-span-8'>
          {/* Image Carousel */}
          <div className='space-y-3'>
            <div className='relative aspect-video w-full overflow-hidden rounded-xl bg-bg-weak-50'>
              <Image
                // Use displayData which contains URLs (blob or http)
                src={displayData.images[currentImageIndex]}
                alt={displayData.title}
                fill
                className='object-cover'
                // Add unoptimized prop if using blob URLs frequently or for external URLs not configured
                // unoptimized
              />
              {/* Carousel Controls */}
              <button
                onClick={handlePrevClick}
                className='absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-1 text-gray-800 hover:bg-white disabled:opacity-50'
                disabled={displayData.images.length <= 1}
              >
                <RiArrowLeftSLine className='size-5' />
              </button>
              <button
                onClick={handleNextClick}
                className='absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-1 text-gray-800 hover:bg-white disabled:opacity-50'
                disabled={displayData.images.length <= 1}
              >
                <RiArrowRightSLine className='size-5' />
              </button>
            </div>
            {/* Thumbnails */}
            {displayData.images.length > 1 && (
              <div className='flex gap-3 overflow-x-auto pb-1'>
                {displayData.images.map((thumb, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)} // Use original index
                    className={cn(
                      'aspect-video w-24 flex-shrink-0 overflow-hidden rounded-lg border-2',
                      currentImageIndex === index // Compare with original index
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
            )}
          </div>

          {/* Details Section */}
          <div className='shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6'>
            <h2 className='text-lg mb-4 font-semibold text-text-strong-950'>
              Details
            </h2>
            <p className='text-sm text-text-secondary-600 mb-4 whitespace-pre-wrap'>
              {' '}
              {/* Added whitespace-pre-wrap */}
              {displayData.details}
            </p>
            {displayData.includedItems.length > 0 && (
              <>
                <h3 className='text-sm mb-2 font-medium text-text-strong-950'>
                  What's Included:
                </h3>
                <ul className='mb-3 space-y-1.5'>
                  {displayData.includedItems.map((item, idx) => (
                    <li
                      key={idx}
                      className='text-sm text-text-secondary-600 flex items-center gap-2'
                    >
                      <RiCheckLine className='size-4 shrink-0 text-success-base' />
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {/* Show More button removed as it doesn't apply to preview */}
          </div>

          {/* Options Section */}
          {displayData.options.length > 0 && (
            <div className='shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6'>
              <h2 className='text-lg mb-4 font-semibold text-text-strong-950'>
                Options
              </h2>
              <div className='space-y-3 divide-y divide-stroke-soft-200'>
                {displayData.options.map((option, idx) => (
                  <div
                    key={idx}
                    className='flex items-center justify-between pt-3 first:pt-0'
                  >
                    <span className='text-sm text-text-secondary-600'>
                      {option.name}
                    </span>
                    {/* Price is already formatted in displayData */}
                    <span className='text-sm font-medium text-text-strong-950'>
                      +{option.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Worker Info, Price, Buttons */}
        <div className='md:col-span-4'>
          <div className='sticky top-20 space-y-6'>
            {/* Worker Info Card */}
            <div className='shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6'>
              <div className='flex flex-col items-center text-center'>
                <Avatar.Root size='80'>
                  <Avatar.Image
                    src={displayData.worker.avatar}
                    alt={displayData.worker.name}
                  />
                  {/* Online indicator removed for simplicity, add back if needed */}
                </Avatar.Root>
                <h2 className='text-xl mt-3 font-semibold text-text-strong-950'>
                  {displayData.worker.name}
                </h2>
                {/* Placeholder Rating/Reviews */}
                <div className='text-text-secondary-600 mt-1 flex items-center gap-1'>
                  <RiStarFill className='size-4 text-yellow-400' />
                  <span>
                    {displayData.worker.rating.toFixed(1)} (
                    {displayData.worker.reviews})
                  </span>
                </div>
                {/* Placeholder Google Icons */}
                <div className='mt-2 flex items-center gap-1.5'>
                  <RiGoogleFill className='text-text-secondary-600 size-5' />
                  <RiGoogleFill className='text-text-secondary-600 size-5' />
                </div>
              </div>
            </div>

            {/* Price & Lead Time Card */}
            <div className='shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
              <div className='flex justify-between border-b border-stroke-soft-200 p-4'>
                <span className='text-text-secondary-600 flex items-center gap-2 font-medium'>
                  <RiMoneyDollarCircleLine className='text-icon-secondary-400 size-5' />
                  Price
                </span>
                {/* Price is already formatted */}
                <span className='font-semibold text-text-strong-950'>
                  {displayData.price}
                </span>
              </div>
              <div className='flex justify-between p-4'>
                <span className='text-text-secondary-600 flex items-center gap-2 font-medium'>
                  <RiTimeLine className='text-icon-secondary-400 size-5' /> Lead
                  Time
                </span>
                <span className='text-text-secondary-600 font-medium'>
                  {displayData.leadTime}
                </span>
              </div>
            </div>

            {/* Action Buttons - Use props */}
            <div className='flex gap-3'>
              <Button.Root
                variant='neutral'
                mode='stroke'
                onClick={prevStep} // Use prop
                className='flex-1'
                disabled={isSubmitting} // Use prop
              >
                Edit
              </Button.Root>
              <Button.Root
                variant='neutral'
                mode='filled'
                onClick={submitForm} // Use prop
                className='flex-1'
                disabled={isSubmitting} // Use prop
              >
                {isSubmitting ? (
                  <>
                    <Button.Icon as={RiLoader4Line} className='animate-spin' />
                    Posting...
                  </>
                ) : (
                  'Post'
                )}
              </Button.Root>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
