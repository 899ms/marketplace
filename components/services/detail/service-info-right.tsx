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
  RiSendPlaneLine,
  RiArrowRightSLine,
  RiGoogleFill,
  RiTwitchFill,
  RiTwitterXFill,
  RiMoneyCnyCircleLine,
  RiGroupLine,
  RiCalendarLine,
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
        <div className="relative mb-4">
          <div className="flex flex-col items-center text-center">
            <Avatar.Root size="56">
              <Avatar.Image
                src={service.seller_avatar_url || 'https://via.placeholder.com/56'}
                alt={service.seller_name || 'Seller'}
              />
              {/* online-status dot */}
              <Avatar.Indicator position="bottom">
                <div className="size-3 rounded-full bg-green-500 ring-2 ring-white" />
              </Avatar.Indicator>
            </Avatar.Root>

            {/* heart icon top-right */}
            <button className="absolute top-0 right-0 p-1 text-icon-secondary-400 hover:text-icon-primary-500">
              <RiHeartLine className="size-5" />
            </button>

            <div className="mt-2">
              <Link href={`/workers/${service.seller_id}`} passHref>
                <h2 className="text-label-md font-medium text-text-strong-950 hover:underline">
                  {service.seller_name || 'Unknown Seller'}
                </h2>
              </Link>

              {/* rating (no “reviews” text) */}
              <div className="mt-1 flex items-center justify-center gap-1 text-text-secondary-600 text-paragraph-xs">
                <RiStarFill className="size-3.5 text-yellow-400" />
                <span className="text-gray-600" >4.9 (125)</span>
              </div>

              {/* two Google icons + “Google” twice */}
              <div className="mt-1 flex items-center justify-center gap-1 text-text-secondary-600 text-paragraph-xs">
                <RiGoogleFill className="size-3.5" />
                <span>Google</span>
                <RiGoogleFill className="size-3.5" />
                <span>Google</span>
              </div>
            </div>
          </div>
        </div>


        <div className='mb-4 h-px w-full bg-stroke-soft-200'></div>

        {/* Pricing, Delivery & Proposals */}
        <div className='mb-4 space-y-3'>
          <div className='flex items-center justify-between'>
            <div className='text-text-secondary-600 flex items-center gap-2'>
              <RiMoneyCnyCircleLine className='size-4' />
              <span className='text-paragraph-sm'>Price</span>
            </div>
            <span className='text-[24px] text-text-strong-950'>
              {formatCurrency(service.price, service.currency || 'USD')}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='text-text-secondary-600 flex items-center gap-2'>
              <RiGroupLine className='size-4' />
              <span className='text-paragraph-sm'>Sold</span>
            </div>
            <span className='font-medium text-text-strong-950'>
              5
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='text-text-secondary-600 flex items-center gap-2'>
              <RiCalendarLine className='size-4' />
              <span className='text-paragraph-sm'>Deadline</span>
            </div>
            <span className='font-medium text-text-strong-950'>
              05.25.2025
            </span>
          </div>
        </div>

        {/* Action Buttons - Update links/actions */}
        <div className='mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2'>
          {/* TODO: Update Hire link/action */}
          {/* TODO: Update Message link/action */}
          <Button.Root asChild variant='neutral' mode='stroke' size='small'>
            <Link href={`/chat?recipientId=${service.seller_id}`}>
              Message
              <Button.Icon as={RiSendPlaneLine} />
            </Link>
          </Button.Root>
          <Button.Root asChild variant='neutral' mode='stroke' size='small'>
            <Link href={`/orders/create?serviceId=${service.id}`}>
              Hire
              <Button.Icon as={RiArrowRightSLine} />
            </Link>
          </Button.Root>
        </div>

        {/* About Seller Section */}
        {service.seller_bio && (
          <div className="mb-4">
            <h3 className="mb-2 text-label-md font-medium text-text-strong-950">
              About
            </h3>
            <p className="text-text-secondary-600 line-clamp-3 text-paragraph-xs">
              {service.seller_bio}
            </p>
            {/* social icons: Twitch, Twitter, Google */}
            <div className="mt-4 flex items-center gap-3">
              <RiTwitchFill className="size-5 text-icon-secondary-400 hover:text-icon-primary-500" />
              <RiTwitterXFill className="size-5 text-icon-secondary-400 hover:text-icon-primary-500" />
              <RiGoogleFill className="size-5 text-icon-secondary-400 hover:text-icon-primary-500" />
            </div>
          </div>
        )}


        <div className='mb-4 h-px w-full bg-stroke-soft-200'></div>

        {/* Tags Section - Use service.tags and Tag component */}
        {service.tags && service.tags.length > 0 && (
          <div className='mb-4'>
            <h3 className='mb-2 text-label-md font-medium text-text-strong-950'>
              Skills
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
