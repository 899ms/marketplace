'use client';

import React from 'react';
import Link from 'next/link'; // Import Link
import * as Avatar from '@/components/ui/avatar';
import { RiStarFill } from '@remixicon/react';
import { RelatedService } from './types'; // Import type

interface RelatedServiceCardProps {
  service: RelatedService;
}

export function RelatedServiceCard({ service }: RelatedServiceCardProps) {
  return (
    <Link href={`/services/${service.id}`} className='block'>
      {' '}
      {/* Make card clickable */}
      <div className='shadow-sm hover:shadow-md overflow-hidden rounded-lg border border-stroke-soft-200 bg-bg-white-0 transition-all'>
        {/* Image Placeholder */}
        <div className='relative h-32 w-full bg-gradient-to-br from-blue-400 to-purple-500'>
          {/* TODO: Replace with actual image if available */}
          <div className='absolute right-2 top-2'>
            {/* Placeholder Avatar */}
            <Avatar.Root size='24' color='blue'>
              <span className='text-label-xs font-medium'>J</span>
            </Avatar.Root>
          </div>
        </div>
        {/* Content */}
        <div className='p-3'>
          <p className='text-sm mb-1.5 line-clamp-2 font-medium text-text-strong-950'>
            {service.title}
          </p>
          <div className='text-xs flex items-center justify-between'>
            <div className='text-text-secondary-600 flex items-center gap-0.5'>
              <RiStarFill className='size-3 text-yellow-400' />
              <span>
                {service.rating} ({service.reviews} reviews)
              </span>
            </div>
            <span className='font-semibold text-text-strong-950'>
              ${service.price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
