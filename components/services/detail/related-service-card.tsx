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

function getCurrencySymbol(currencyCode: string): string {
  try {
    return (0).toLocaleString('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).replace(/\d/g, '').trim();
  } catch {
    return currencyCode; // fallback if invalid currency
  }
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
    <Link href={`/services/${service.id}`} className='group block flex-shrink-0 basis-[calc((100%-32px)/3)] max-w-[253px] max-h-[256px]'>
      <div className='shadow-sm group-hover:shadow-md overflow-hidden rounded-lg border border-t-0  border-stroke-soft-200 bg-bg-white-0 transition-all h-full flex flex-col'>
        {/* Image Section */}
        <div className={`relative w-full h-[164px] ${!imageUrl ? imagePlaceholder : ''}`}>
          {imageUrl ? (
            <img src={imageUrl} alt={service.title} className="w-full h-full object-cover" />
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
        <div className='p-2.5 flex flex-col flex-grow'>
          <p className='text-[14px] text-[14px] text-[#0E121B] mb-1.5 line-clamp-2 font-medium flex-grow'>
            {service.title}
          </p>
          <div className='flex items-center justify-between mt-auto'>
            <div className='text-[12px] text-[#525866] flex items-center gap-0.5'>
              <RiStarFill className='size-4 text-yellow-400' />
              {/* Placeholder for rating/reviews */}
              <span>
                4.5 (50+)
              </span>
            </div>
            {/* Use formatted price and currency */}
            <span className='font-medium text-[#0E121B]'>
              <span className='text-[12px]'>{getCurrencySymbol(service.currency)}</span>
              <span className='text-[16px]'>{service.price}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

