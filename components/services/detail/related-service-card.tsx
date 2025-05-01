'use client';

import React from 'react';
import Link from 'next/link'; // Import Link
import * as Avatar from '@/components/ui/avatar';
import { RiStarFill } from '@remixicon/react';
// import { RelatedService } from './types'; // Remove old type import
import { Service } from '@/utils/supabase/types'; // Import the full Service type

interface RelatedServiceCardProps {
  // service: RelatedService; // Old prop type
  service: Service; // Use the full Service type
}

export function RelatedServiceCard({ service }: RelatedServiceCardProps) {

  // Helper to format currency (optional, but good practice)
  const formatCurrency = (amount: number, currencyCode?: string) => {
    return new Intl.NumberFormat('en-US', { // Adjust locale as needed
      style: 'currency',
      currency: currencyCode || 'USD', // Default currency if not provided
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Get first image URL or use a placeholder gradient/image
  const imageUrl = service.images?.[0]?.url;
  const imagePlaceholder = 'bg-gradient-to-br from-blue-400 to-purple-500'; // Existing gradient

  return (
    <Link href={`/services/${service.id}`} className='block group'>
      <div className='shadow-sm group-hover:shadow-md overflow-hidden rounded-lg border border-stroke-soft-200 bg-bg-white-0 transition-all h-full flex flex-col'>
        {/* Image Section */}
        <div className={`relative h-32 w-full ${!imageUrl ? imagePlaceholder : ''}`}>
          {imageUrl ? (
            <img src={imageUrl} alt={service.title} className="size-full object-cover" />
          ) : (
            <div className="size-full flex items-center justify-center">{/* Maybe add an icon? */}</div>
          )}
          {/* Seller Avatar Placeholder */}
          <div className='absolute right-2 top-2'>
            <Avatar.Root size='24' color='blue'>
              {/* Use seller initial if available, else fallback */}
              <span className='text-label-xs font-medium'>
                {service.seller_name?.charAt(0) || 'S'}
              </span>
            </Avatar.Root>
          </div>
        </div>
        {/* Content Section */}
        <div className='p-3 flex flex-col flex-grow'>
          <p className='text-sm mb-1.5 line-clamp-2 font-medium text-text-strong-950 flex-grow'>
            {service.title}
          </p>
          <div className='text-xs flex items-center justify-between mt-auto pt-2'>
            <div className='text-text-secondary-600 flex items-center gap-0.5'>
              <RiStarFill className='size-3 text-yellow-400' />
              {/* Placeholder for rating/reviews */}
              <span>
                4.5 (50+)
              </span>
            </div>
            {/* Use formatted price and currency */}
            <span className='font-semibold text-text-strong-950'>
              {formatCurrency(service.price, service.currency)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
