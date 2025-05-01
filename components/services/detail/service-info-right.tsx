'use client';

import React from 'react';
import Link from 'next/link';
import { Service } from '@/utils/supabase/types'; // Import the main Service type
import * as Avatar from '@/components/ui/avatar';
import * as Button from '@/components/ui/button';
import * as Tag from '@/components/ui/tag'; // Import Tag
import {
  RiStarFill,
  RiHeartLine,
  RiPriceTag3Line,
  RiTimeLine,
  RiMessage2Line,
  RiArrowRightSLine,
  RiFileTextLine,
  RiGoogleFill, // Keep if used for potential future social links
  RiTwitchFill, // Keep if used
  RiTwitterXFill, // Keep if used
} from '@remixicon/react';

// Remove the old specific data interfaces
/*
interface ServiceProviderInfo { ... }
interface ServiceInfoRightData { ... }
*/

interface ServiceInfoRightProps {
  service: Service; // Use the full Service type
}

// Define dummy tools data
const dummyTools = ['Adobe Audition', 'Pro Tools', 'Logic Pro X', 'FL Studio'];

export function ServiceInfoRight({ service }: ServiceInfoRightProps) {
  // Keep social icon helper if needed, otherwise remove
  // const getSocialIcon = (platform: string) => { ... };

  // Helper to format currency (basic example)
  const formatCurrency = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', { // Adjust locale as needed
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0, // Adjust as needed
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className='sticky top-20'>
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5'>
        {/* Provider Info - Use service.seller_name, seller_avatar_url */}
        <div className='relative mb-4'>
          <div className='flex flex-col items-center text-center'>
            <Avatar.Root size='56'>
              <Avatar.Image
                src={service.seller_avatar_url || 'https://via.placeholder.com/56'} // Use fetched data + fallback
                alt={service.seller_name || 'Seller'}
              />
              {/* Fallback handled internally */}
            </Avatar.Root>
            <div className='mt-2'>
              <Link href={`/workers/${service.seller_id}`} passHref>
                <h2 className='text-label-md font-medium text-text-strong-950 hover:underline'>
                  {service.seller_name || 'Unknown Seller'}
                </h2>
              </Link>
              {/* Keep dummy rating/reviews for now */}
              <div className='text-text-secondary-600 mt-1 flex items-center justify-center gap-1 text-paragraph-xs'>
                <RiStarFill className='size-3.5 text-yellow-400' />
                <span>4.9 (125 reviews)</span> {/* Placeholder */}
              </div>
            </div>
          </div>
          {/* Optional: Favorite button - requires state/API call */}
          {/* <button className='text-text-secondary-400 hover:text-text-primary-500 absolute right-0 top-0'>
            <RiHeartLine className='size-5' />
          </button> */}
        </div>

        <div className='mb-4 h-px w-full bg-stroke-soft-200'></div>

        {/* Pricing, Delivery & Proposals */}
        <div className='mb-4 space-y-3'>
          <div className='flex items-center justify-between'>
            <div className='text-text-secondary-600 flex items-center gap-2'>
              <RiPriceTag3Line className='size-4' />
              <span className='text-paragraph-sm'>Price</span>
            </div>
            <span className='text-lg font-semibold text-text-strong-950'>
              {formatCurrency(service.price, service.currency || 'USD')}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='text-text-secondary-600 flex items-center gap-2'>
              <RiTimeLine className='size-4' />
              <span className='text-paragraph-sm'>Delivery Time</span>
            </div>
            <span className='font-medium text-text-strong-950'>
              {service.lead_time} {service.lead_time === 1 ? 'Day' : 'Days'}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='text-text-secondary-600 flex items-center gap-2'>
              <RiFileTextLine className='size-4' />
              <span className='text-paragraph-sm'>Proposals</span>
            </div>
            <span className='font-medium text-text-strong-950'>
              15 {/* Placeholder number */}
            </span>
          </div>
        </div>

        {/* Action Buttons - Update links/actions */}
        <div className='mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2'>
          {/* TODO: Update Hire link/action */}
          <Button.Root asChild variant='primary' size='small'>
            <Link href={`/orders/create?serviceId=${service.id}`}>
              Hire
              <Button.Icon as={RiArrowRightSLine} />
            </Link>
          </Button.Root>
          {/* TODO: Update Message link/action */}
          <Button.Root asChild variant='neutral' mode='stroke' size='small'>
            <Link href={`/chat?recipientId=${service.seller_id}`}>
              <Button.Icon as={RiMessage2Line} />
              Message
            </Link>
          </Button.Root>
        </div>

        {/* About Seller Section */}
        {service.seller_bio && (
          <div className='mb-4'>
            <h3 className='mb-2 text-label-md font-medium text-text-strong-950'>
              About Seller
            </h3>
            <p className='text-text-secondary-600 line-clamp-3 text-paragraph-xs'>
              {service.seller_bio}
            </p>
          </div>
        )}

        {/* View Seller Profile Link */}
        <div className='mb-4 text-center'>
          <Link
            href={`/workers/${service.seller_id}`}
            className='text-sm text-primary-base hover:underline'
          >
            View Seller Profile
          </Link>
        </div>

        {/* Tags Section - Use service.tags and Tag component */}
        {service.tags && service.tags.length > 0 && (
          <div className='mb-4'>
            <h3 className='mb-2 text-label-md font-medium text-text-strong-950'>
              Tags
            </h3>
            <div className='flex flex-wrap gap-1.5'>
              {service.tags.map((tag, index) => (
                <Tag.Root key={index}>
                  {tag}
                </Tag.Root>
              ))}
            </div>
          </div>
        )}

        {/* Tools Section (Dummy Data) - Use Tag component */}
        <div>
          <h3 className='mb-2 text-label-md font-medium text-text-strong-950'>
            Tools
          </h3>
          <div className='flex flex-wrap gap-1.5'>
            {dummyTools.map((tool, index) => (
              <Tag.Root key={index}>
                {tool}
              </Tag.Root>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
