'use client';

import React from 'react';
import Link from 'next/link';
import * as Avatar from '@/components/ui/avatar';
import * as Button from '@/components/ui/button';
import * as Badge from '@/components/ui/badge';
import {
  RiStarFill,
  RiHeartLine,
  RiPriceTag3Line,
  RiTimeLine,
  RiCalendar2Line,
  RiMessage2Line,
  RiArrowRightSLine,
  RiGoogleFill,
  RiTwitchFill,
  RiTwitterXFill,
} from '@remixicon/react';
import { cn } from '@/utils/cn';

// Define subset of service data needed
interface ServiceProviderInfo {
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
}

interface ServiceInfoRightData {
  price: number;
  days: number;
  deadline: string;
  provider: ServiceProviderInfo;
  about: string;
  skills: string[];
  tools: string[];
}

interface ServiceInfoRightProps {
  service: ServiceInfoRightData;
}

export function ServiceInfoRight({ service }: ServiceInfoRightProps) {
  return (
    <div className='sticky top-20'>
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5'>
        <div className='relative mb-4'>
          <div className='flex flex-col items-center text-center'>
            <Avatar.Root size='56'>
              <Avatar.Image
                src={service.provider.avatar}
                alt={service.provider.name}
              />
            </Avatar.Root>
            <div className='mt-2'>
              <h2 className='text-label-md font-medium text-text-strong-950'>
                {service.provider.name}
              </h2>
              <div className='text-text-secondary-600 mt-1 flex items-center justify-center gap-1 text-paragraph-xs'>
                <RiStarFill className='size-3.5 text-yellow-400' />
                <span>
                  {service.provider.rating} ({service.provider.reviews})
                </span>
              </div>
            </div>
          </div>
          <button className='text-text-secondary-400 hover:text-text-primary-500 absolute right-0 top-0'>
            <RiHeartLine className='size-5' />
          </button>
        </div>

        <div className='mb-4 h-px w-full bg-stroke-soft-200'></div>

        <div className='mb-4 space-y-3'>
          <div className='flex items-center justify-between'>
            <div className='text-text-secondary-600 flex items-center gap-2'>
              <RiPriceTag3Line className='size-4' />
              <span className='text-paragraph-sm'>Price</span>
            </div>
            <span className='text-lg font-semibold text-text-strong-950'>
              ${service.price}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='text-text-secondary-600 flex items-center gap-2'>
              <RiTimeLine className='size-4' />
              <span className='text-paragraph-sm'>Delivery</span>
            </div>
            <span className='font-medium text-text-strong-950'>
              {service.days} Days
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='text-text-secondary-600 flex items-center gap-2'>
              <RiCalendar2Line className='size-4' />
              <span className='text-paragraph-sm'>Deadline</span>
            </div>
            <span className='font-medium text-text-strong-950'>
              {service.deadline}
            </span>
          </div>
        </div>

        <div className='mb-4 grid grid-cols-2 gap-2'>
          <Button.Root variant='primary' size='small'>
            Hire
            <Button.Icon as={RiArrowRightSLine} />
          </Button.Root>
          <Button.Root variant='neutral' mode='stroke' size='small'>
            <Button.Icon as={RiMessage2Line} />
            Message
          </Button.Root>
        </div>

        <div className='mb-4'>
          <h3 className='mb-2 text-label-md font-medium text-text-strong-950'>
            About Provider
          </h3>
          <p className='text-text-secondary-600 line-clamp-3 text-paragraph-xs'>
            {service.about}
          </p>
          <Link
            href={`/workers/${service.provider.name}`}
            className='text-sm mt-2 block text-primary-base hover:underline'
          >
            View Profile
          </Link>
        </div>

        <div className='mb-4'>
          <h3 className='mb-2 text-label-md font-medium text-text-strong-950'>
            Skills
          </h3>
          <div className='flex flex-wrap gap-1.5'>
            {service.skills.map((skill, index) => (
              <Badge.Root key={index} variant='light' size='small'>
                {skill}
              </Badge.Root>
            ))}
          </div>
        </div>

        <div>
          <h3 className='mb-2 text-label-md font-medium text-text-strong-950'>
            Tools
          </h3>
          <div className='flex flex-wrap gap-1.5'>
            {service.tools.map((tool, index) => (
              <Badge.Root key={index} variant='light' size='small'>
                {tool}
              </Badge.Root>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
