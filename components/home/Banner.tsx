'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';
// import Image from 'next/image'; // Uncomment if using Next Image

// --- Banner Component ---
const dummyBanners = [
  {
    title: 'R & B Hits',
    description:
      'All mine, Lie again, Petty call me everyday, Out of time, No love, Bad habit, and so much more',
    // image: '/path/to/rb-artist.png' // Optional image path
  },
  {
    title: 'Indie Rock Anthems',
    description:
      'Latest tracks from underground favorites and rising stars. Explore the new sounds.',
    // image: '/path/to/indie-artist.png'
  },
  {
    title: 'Smooth Jazz Grooves',
    description:
      'Relax and unwind with the smoothest jazz tunes. Perfect for a chill evening.',
    // image: '/path/to/jazz-artist.png'
  },
];

const Banner = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBannerIndex(
        (prevIndex) => (prevIndex + 1) % dummyBanners.length,
      );
    }, 5000); // Change banner every 5 seconds

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const currentBanner = dummyBanners[currentBannerIndex];

  return (
    <div className='shadow-lg relative mb-8 min-h-[280px] overflow-hidden rounded-xl bg-gray-800 p-6 text-white'>
      <div className='relative z-10 max-w-xl'>
        {/* Display dynamic content */}
        <h1 className='text-3xl mb-2 font-semibold'>{currentBanner.title}</h1>
        <p className='text-sm mb-4 text-gray-300'>
          {currentBanner.description}
        </p>
        {/* Indicator Dots - Update based on current index */}
        <div className='flex gap-1.5'>
          {dummyBanners.map((_, index) => (
            <span
              key={index}
              className={cn(
                'block h-1.5 w-1.5 rounded-full transition-colors duration-300',
                index === currentBannerIndex ? 'bg-white' : 'bg-gray-500',
              )}
            ></span>
          ))}
        </div>
      </div>
      {/* TODO: Add dynamic image based on currentBanner.image */}
      {/* <Image src={currentBanner.image || defaultImage} alt={currentBanner.title} ... /> */}
    </div>
  );
};

export default Banner;
