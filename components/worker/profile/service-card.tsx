'use client';

import React from 'react';
// Assuming Image might be used if placeholder replaced
import * as Avatar from '@/components/ui/avatar';
import { RiStarFill } from '@remixicon/react';
import { ServiceItemData } from './types'; // Import type from the same directory

// Service Card Component
interface ServiceCardProps {
  service: ServiceItemData;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className='shadow-sm hover:shadow-md overflow-hidden rounded-lg border border-stroke-soft-200 bg-bg-white-0 transition-all'>
      {/* Image Section - Using background class for now */}
      <div className={`relative h-40 w-full ${service.image}`}>
        {' '}
        {/* Placeholder image via class */}
        {/* Consider using <Image/> component here with proper src */}
        <div className='absolute right-3 top-3'>
          {/* Example Avatar - replace if dynamic */}
          <Avatar.Root size='32' color='blue'>
            <span className='text-label-sm font-medium'>J</span>
          </Avatar.Root>
        </div>
      </div>

      <div className='p-3'>
        {/* Title */}
        <p className='mb-2 line-clamp-2 text-paragraph-sm font-medium text-text-strong-950'>
          {service.title}
        </p>

        {/* Rating and Price */}
        <div className='flex items-center justify-between text-paragraph-sm'>
          <div className='text-text-secondary-600 flex items-center gap-0.5'>
            <RiStarFill className='size-3.5 text-yellow-400' />
            <span>
              {service.rating} ({service.reviewCount})
            </span>
          </div>
          <span className='font-medium text-text-strong-950'>
            ${service.price}
          </span>
        </div>
      </div>
    </div>
  );
}
