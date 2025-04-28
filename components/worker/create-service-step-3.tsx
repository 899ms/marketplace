'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import * as Avatar from '@/components/ui/avatar';
import * as Button from '@/components/ui/button';
import * as Tag from '@/components/ui/tag';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiStarFill,
  RiMoneyDollarCircleLine,
  RiTimeLine,
} from '@remixicon/react';
import { cn } from '@/utils/cn'; // Assuming utils path is correct

// Placeholder data - replace with actual data passed as props or fetched
const reviewData = {
  title: 'Professional Podcast Editing and Mixing',
  description:
    'Get your podcast sounding crisp and professional. I offer editing (ums, ahs, long pauses removal), mixing (level balancing, EQ, compression), noise reduction, and mastering to industry standards. Quick turnaround times!',
  tags: ['Podcast Editing', 'Audio Mixing', 'Noise Reduction', 'Mastering'],
  price: 150.0,
  currency: 'USD',
  leadTime: 3,
  includes: ['Editing up to 60 mins', 'Mixing', 'Noise Reduction', 'Mastering'],
  images: [
    'https://via.placeholder.com/600x400/3b82f6/ffffff?text=Service+Image+1',
    'https://via.placeholder.com/600x400/10b981/ffffff?text=Service+Image+2',
    'https://via.placeholder.com/600x400/f59e0b/ffffff?text=Service+Image+3',
    'https://via.placeholder.com/600x400/6366f1/ffffff?text=Service+Image+4',
  ],
  seller: {
    name: 'AudioPro Services',
    avatarUrl: 'https://via.placeholder.com/40',
    rating: 4.8,
    reviews: 85,
  },
};

interface Step3ReviewProps {
  prevStep: () => void;
  submitForm: () => void;
  // Add formData prop if needed
}

export function Step3Review({ prevStep, submitForm }: Step3ReviewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? reviewData.images.length - 1 : prevIndex - 1,
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === reviewData.images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className='shadow-sm mx-auto max-w-4xl rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
      {/* Header */}
      <div className='border-b border-stroke-soft-200 p-4'>
        <h2 className='font-semibold text-text-strong-950'>
          Review Your Service
        </h2>
        <p className='text-sm text-text-secondary-600'>
          Make sure everything looks perfect before publishing.
        </p>
      </div>

      {/* Main Content Area */}
      <div className='grid grid-cols-1 gap-8 p-6 md:grid-cols-3'>
        {/* Left Column: Image Gallery */}
        <div className='md:col-span-2'>
          <div className='relative mb-4 aspect-[3/2] w-full overflow-hidden rounded-lg'>
            <Image
              src={reviewData.images[currentImageIndex]}
              alt={`${reviewData.title} - Image ${currentImageIndex + 1}`}
              fill
              sizes='(max-width: 768px) 100vw, 66vw'
              style={{ objectFit: 'cover' }}
              priority={currentImageIndex === 0} // Prioritize the first image
            />
            {/* Gallery Navigation */}
            <button
              onClick={handlePrevClick}
              className='absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70 disabled:opacity-50'
              disabled={reviewData.images.length <= 1}
            >
              <RiArrowLeftSLine className='size-5' />
            </button>
            <button
              onClick={handleNextClick}
              className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70 disabled:opacity-50'
              disabled={reviewData.images.length <= 1}
            >
              <RiArrowRightSLine className='size-5' />
            </button>
          </div>
          {/* Thumbnails */}
          <div className='flex space-x-2 overflow-x-auto'>
            {reviewData.images.map((imgSrc, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={cn(
                  'relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2',
                  currentImageIndex === index
                    ? 'border-primary-base'
                    : 'hover:border-primary-soft-200 border-transparent',
                )}
              >
                <Image
                  src={imgSrc}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes='100px'
                  style={{ objectFit: 'cover' }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Service Details */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-text-strong-950'>
            {reviewData.title}
          </h3>
          {/* Seller Info */}
          <div className='flex items-center gap-2'>
            <Avatar.Root size='40'>
              <Avatar.Image
                src={reviewData.seller.avatarUrl}
                alt={reviewData.seller.name}
              />
            </Avatar.Root>
            <div>
              <p className='text-sm font-medium text-text-strong-950'>
                {reviewData.seller.name}
              </p>
              <div className='text-xs text-text-secondary-600 flex items-center gap-1'>
                <RiStarFill className='size-3 text-yellow-400' />
                <span>
                  {reviewData.seller.rating} ({reviewData.seller.reviews}{' '}
                  reviews)
                </span>
              </div>
            </div>
          </div>
          {/* Tags */}
          <div className='flex flex-wrap gap-1.5'>
            {reviewData.tags.map((tag) => (
              <Tag.Root key={tag} variant='stroke'>
                {tag}
              </Tag.Root>
            ))}
          </div>
          {/* Price and Lead Time */}
          <div className='bg-bg-subtle-50 flex items-center justify-between rounded-lg p-3'>
            <div className='text-center'>
              <p className='text-xs text-text-secondary-600'>Price</p>
              <p className='font-semibold text-text-strong-950'>
                <RiMoneyDollarCircleLine className='text-icon-primary-500 mr-0.5 inline size-4 align-text-bottom' />
                {reviewData.price.toFixed(2)} {reviewData.currency}
              </p>
            </div>
            <div className='h-8 w-px bg-stroke-soft-200'></div> {/* Divider */}
            <div className='text-center'>
              <p className='text-xs text-text-secondary-600'>Lead Time</p>
              <p className='font-semibold text-text-strong-950'>
                <RiTimeLine className='text-icon-primary-500 mr-0.5 inline size-4 align-text-bottom' />
                {reviewData.leadTime} Days
              </p>
            </div>
          </div>
          {/* Description */}
          <div>
            <h4 className='text-sm mb-1 font-medium text-text-strong-950'>
              Description
            </h4>
            <p className='text-sm text-text-secondary-600'>
              {reviewData.description}
            </p>
          </div>
          {/* Includes */}
          <div>
            <h4 className='text-sm mb-1 font-medium text-text-strong-950'>
              What's Included
            </h4>
            <ul className='text-sm text-text-secondary-600 list-disc space-y-1 pl-5'>
              {reviewData.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer / Navigation */}
      <div className='flex items-center justify-between border-t border-stroke-soft-200 p-4'>
        {/* Step Indicators */}
        <div className='flex gap-1.5'>
          <span className='block h-1.5 w-1.5 rounded-full bg-bg-soft-200'></span>
          <span className='block h-1.5 w-1.5 rounded-full bg-bg-soft-200'></span>
          <span className='block h-1.5 w-4 rounded-full bg-primary-base'></span>
        </div>
        {/* Action Buttons */}
        <div>
          <Button.Root
            variant='neutral'
            mode='stroke'
            className='mr-2'
            onClick={prevStep}
          >
            <Button.Icon as={RiArrowLeftSLine} />
            Previous
          </Button.Root>
          <Button.Root variant='primary' mode='filled' onClick={submitForm}>
            Publish Service
          </Button.Root>
        </div>
      </div>
    </div>
  );
}
