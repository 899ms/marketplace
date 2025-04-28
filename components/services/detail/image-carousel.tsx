'use client';

import React, { useState } from 'react';
import Image from 'next/image'; // Import next/image
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import { cn } from '@/utils/cn';

interface ImageCarouselProps {
  images: string[]; // Assuming images are URLs or paths
  altPrefix?: string; // Optional prefix for alt text
}

export function ImageCarousel({
  images,
  altPrefix = 'Service Image',
}: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle empty images array
  if (!images || images.length === 0) {
    return (
      <div className='bg-bg-subtle-100 mb-4 flex h-64 items-center justify-center rounded-xl sm:h-80 md:h-96'>
        <p className='text-text-secondary-600'>No images available</p>
      </div>
    );
  }

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const setSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className='mb-4'>
      {/* Main Image */}
      <div className='relative mb-2 aspect-video w-full overflow-hidden rounded-xl sm:aspect-[4/3] md:aspect-[3/2]'>
        <Image
          src={images[activeIndex]} // Use actual image source
          alt={`${altPrefix} ${activeIndex + 1}`}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' // Adjust sizes as needed
          style={{ objectFit: 'cover' }}
          priority={activeIndex === 0} // Prioritize first image
          className='bg-bg-subtle-100' // Background color while loading
        />

        {/* Navigation Arrows (only if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className='absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-1 text-black transition-all hover:bg-white'
              aria-label='Previous'
            >
              <RiArrowLeftSLine className='size-6' />
            </button>
            <button
              onClick={nextSlide}
              className='absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-1 text-black transition-all hover:bg-white'
              aria-label='Next'
            >
              <RiArrowRightSLine className='size-6' />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails (only if multiple images) */}
      {images.length > 1 && (
        <div className='flex gap-2 overflow-x-auto pb-1'>
          {images.map((imgSrc, index) => (
            <button
              key={index}
              onClick={() => setSlide(index)}
              className={cn(
                'relative h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary-base focus:ring-offset-2',
                activeIndex === index
                  ? 'border-primary-base'
                  : 'hover:border-primary-soft-200 border-transparent',
              )}
            >
              <Image
                src={imgSrc}
                alt={`Thumbnail ${index + 1}`}
                fill
                sizes='64px'
                style={{ objectFit: 'cover' }}
                className='bg-bg-subtle-100'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
