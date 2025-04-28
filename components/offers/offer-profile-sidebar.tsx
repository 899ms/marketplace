'use client';

import React from 'react';
import * as Avatar from '@/components/ui/avatar';
// import * as Button from '@/components/ui/button'; // Buttons removed
import * as Badge from '@/components/ui/badge'; // Keep for potential future use or remove if definitely not needed
import {
  RiStarFill,
  RiGoogleFill,
  RiTwitchFill,
  RiTwitterXFill,
} from '@remixicon/react';
import Link from 'next/link';

// Define types for the data needed by this specific sidebar variant
interface OfferWorkerSkill {
  name: string;
  details?: string;
  // Price info might not be relevant here, adjust as needed
}

interface OfferWorkerData {
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  isGoogle: boolean;
  socialLinks?: string[];
  about: string; // Added About section
  skills: OfferWorkerSkill[];
  // Awards removed
}

interface OfferProfileSidebarProps {
  worker: OfferWorkerData;
}

export function OfferProfileSidebar({ worker }: OfferProfileSidebarProps) {
  // Helper to get social icon remains the same
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'twitch':
        return <RiTwitchFill className='size-5 text-[#6441A5]' />;
      case 'twitter':
        return <RiTwitterXFill className='size-5 text-black' />;
      case 'google':
        return <RiGoogleFill className='text-icon-secondary-400 size-5' />;
      default:
        return null;
    }
  };

  return (
    <div className='shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
      {/* Profile Section */}
      <div className='flex flex-col items-center border-b border-stroke-soft-200 p-6 text-center'>
        <Avatar.Root size='80'>
          <Avatar.Image src={worker.avatar} alt={worker.name} />
          <Avatar.Indicator
            position='bottom'
            className='translate-x-1 translate-y-1'
          >
            <div className='size-4 rounded-full bg-green-500 ring-2 ring-white' />
          </Avatar.Indicator>
        </Avatar.Root>

        <h1 className='text-xl mt-3 font-semibold text-text-strong-950'>
          {worker.name}
        </h1>

        <div className='mt-1 flex items-center gap-1'>
          <RiStarFill className='size-4 text-yellow-400' />
          <span className='text-sm text-text-secondary-600'>
            {worker.rating} ({worker.reviewCount} reviews)
          </span>
        </div>

        {worker.isGoogle && (
          <div className='text-sm text-text-secondary-600 mt-1 flex items-center gap-1'>
            <RiGoogleFill className='size-4 text-red-500' />
            <span>Google Verified</span>
          </div>
        )}

        {/* Action Buttons Removed */}

        {/* Social Links */}
        {worker.socialLinks && worker.socialLinks.length > 0 && (
          <div className='mt-4 flex items-center justify-center gap-3'>
            {worker.socialLinks.map((link) => (
              <Link key={link} href='#' className='hover:opacity-80'>
                {getSocialIcon(link)}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* About Section - Added */}
      <div className='border-b border-stroke-soft-200 p-4'>
        <h2 className='mb-2 text-label-lg font-medium text-text-strong-950'>
          About
        </h2>
        <p className='text-sm text-text-secondary-600'>{worker.about}</p>
      </div>

      {/* Skills Section */}
      <div className='border-b border-stroke-soft-200 p-4'>
        <h2 className='mb-3 text-label-lg font-medium text-text-strong-950'>
          Skills
        </h2>
        <div className='flex flex-wrap gap-1.5'>
          {worker.skills.map((skill, idx) => (
            // Displaying skills as badges here, adjust if needed
            <Badge.Root key={idx} variant='light' size='small'>
              {skill.name}
              {skill.details ? ` - ${skill.details}` : ''}
            </Badge.Root>
          ))}
        </div>
      </div>

      {/* Awards Section Removed */}

      {/* Tools/Products Section - Example based on screenshot */}
      <div className='p-4'>
        <h2 className='mb-3 text-label-lg font-medium text-text-strong-950'>
          Tools / Products
        </h2>
        <div className='flex flex-wrap gap-1.5'>
          {/* Assuming skills data might represent tools/products too, or fetch separately */}
          {/* Example using first skill as a placeholder */}
          {worker.skills.length > 0 && (
            <Badge.Root variant='light' size='small'>
              Products (1) {/* Placeholder count */}
            </Badge.Root>
          )}
          {/* Add more badges based on actual tool/product data */}
        </div>
      </div>
    </div>
  );
}
