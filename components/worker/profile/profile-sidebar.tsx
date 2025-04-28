'use client';

import React from 'react';
import * as Avatar from '@/components/ui/avatar';
import * as Button from '@/components/ui/button';
import * as Badge from '@/components/ui/badge'; // Assuming Badge is used for awards/tags
import {
  RiStarFill,
  RiGoogleFill,
  RiExternalLinkLine,
  RiTwitchFill,
  RiTwitterXFill,
  // Add other icons if needed for social links
} from '@remixicon/react';
import Link from 'next/link';

// Define types for the data needed by the sidebar
interface WorkerSkill {
  name: string;
  details?: string;
  price?: string;
  contactForPricing?: boolean;
}

interface WorkerSidebarData {
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  isGoogle: boolean;
  socialLinks?: string[]; // Array of social platform names e.g., ['twitch', 'twitter']
  skills: WorkerSkill[];
  awards: string[];
  // Add other fields like 'about description snippet' if needed
}

interface ProfileSidebarProps {
  worker: WorkerSidebarData;
  // Add action handlers if needed e.g., onContact, onHire
}

export function ProfileSidebar({ worker }: ProfileSidebarProps) {
  // Helper to get social icon (simplified)
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

        {/* Action Buttons */}
        <div className='mt-4 flex w-full gap-2'>
          <Button.Root variant='primary' mode='filled' className='flex-1'>
            Hire Me
            {/* <Button.Icon as={RiExternalLinkLine} /> */}
          </Button.Root>
          <Button.Root variant='neutral' mode='stroke' className='flex-1'>
            Contact Me
            {/* <Button.Icon as={RiExternalLinkLine} /> */}
          </Button.Root>
        </div>
        {/* Social Links */}
        {worker.socialLinks && worker.socialLinks.length > 0 && (
          <div className='mt-4 flex items-center justify-center gap-3'>
            {worker.socialLinks.map((link) => (
              <Link key={link} href='#' className='hover:opacity-80'>
                {' '}
                {/* TODO: Add actual URLs */}
                {getSocialIcon(link)}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Skills Section */}
      <div className='border-b border-stroke-soft-200 p-4'>
        <h2 className='mb-3 text-label-lg font-medium text-text-strong-950'>
          Skills
        </h2>
        <div className='space-y-2'>
          {worker.skills.map((skill, idx) => (
            <div key={idx}>
              <p className='text-sm font-medium text-text-strong-950'>
                {skill.name}
                {skill.details ? ` - ${skill.details}` : ''}
              </p>
              {skill.price && (
                <p className='text-xs text-text-secondary-600'>{skill.price}</p>
              )}
              {skill.contactForPricing && (
                <p className='text-xs text-text-primary-600'>
                  Contact for pricing
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Awards Section */}
      <div className='p-4'>
        <h2 className='mb-3 text-label-lg font-medium text-text-strong-950'>
          Awards
        </h2>
        <div className='flex flex-wrap gap-1.5'>
          {worker.awards.map((award, idx) => (
            <Badge.Root key={idx} variant='light' size='small'>
              {award}
            </Badge.Root>
          ))}
        </div>
      </div>

      {/* Consider adding About snippet here if needed */}
    </div>
  );
}
