'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as LinkButton from '@/components/ui/link-button'; // Assuming ui components are in src

// --- Dummy Data ---
const dummyBanners = [
  {
    title: 'R & B Hits',
    description:
      'All mine, Lie again, Petty call me everyday, Out of time, No love, Bad habit, and so much more',
    image:
      'https://via.placeholder.com/600x300/334155/ffffff?text=R%26B+Artist', // Placeholder Image
  },
  {
    title: 'Indie Rock Anthems',
    description:
      'Latest tracks from underground favorites and rising stars. Explore the new sounds.',
    image:
      'https://via.placeholder.com/600x300/1e293b/ffffff?text=Indie+Artist', // Placeholder Image
  },
  {
    title: 'Smooth Jazz Grooves',
    description:
      'Relax and unwind with the smoothest jazz tunes. Perfect for a chill evening.',
    image: 'https://via.placeholder.com/600x300/0f172a/ffffff?text=Jazz+Artist', // Placeholder Image
  },
];

// --- Banner Component ---
export function Banner() {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBannerIndex(
        (prevIndex) => (prevIndex + 1) % dummyBanners.length,
      );
    }, 5000); // Change banner every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  const currentBanner = dummyBanners[currentBannerIndex];

  return (
    <div className='from-bg-primary-subtle-500 to-bg-primary-soft-800 text-text-on-primary-0 relative overflow-hidden rounded-lg bg-gradient-to-r p-6 md:p-8'>
      <Image
        src={currentBanner.image}
        alt={currentBanner.title}
        fill // Use fill instead of layout='fill'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' // Add sizes prop
        style={{ objectFit: 'cover' }} // Use style instead of objectFit
        className='-z-10 opacity-30'
        priority={false} // Explicitly set priority if needed, default is false
      />
      <div className='relative z-10'>
        <h2 className='text-2xl md:text-3xl mb-2 font-bold'>
          {currentBanner.title}
        </h2>
        <p className='mb-4 max-w-md text-paragraph-md opacity-90'>
          {currentBanner.description}
        </p>
        <LinkButton.Root variant='primary' size='medium' asChild>
          <Link href='#'>
            {' '}
            {/* TODO: Add correct link */}
            Explore Now
          </Link>
        </LinkButton.Root>
      </div>
    </div>
  );
}
