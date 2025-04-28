'use client';

import React from 'react';
import * as Avatar from '@/components/ui/avatar';
import * as TabMenuHorizontal from '@/components/ui/tab-menu-horizontal';
import { ImageCarousel } from './image-carousel';
import { RiStarFill } from '@remixicon/react';

// Define subset of service data needed
interface ServiceProvider {
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
}

interface ServiceInfoLeftData {
  title: string;
  images: string[];
  provider: ServiceProvider;
}

interface ServiceInfoLeftProps {
  service: ServiceInfoLeftData;
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function ServiceInfoLeft({
  service,
  activeTab,
  onTabChange,
}: ServiceInfoLeftProps) {
  return (
    <>
      {/* Image Carousel */}
      <ImageCarousel images={service.images} altPrefix={service.title} />

      {/* Title */}
      <h1 className='text-2xl md:text-3xl mb-3 font-semibold text-text-strong-950'>
        {service.title}
      </h1>

      {/* Provider Info */}
      <div className='mb-6 flex items-center gap-3'>
        <Avatar.Root size='56'>
          <Avatar.Image
            src={service.provider.avatar}
            alt={service.provider.name}
          />
        </Avatar.Root>
        <div>
          <p className='text-lg font-medium text-text-strong-950'>
            {service.provider.name}
          </p>
          <div className='text-sm text-text-secondary-600 flex items-center gap-1'>
            <RiStarFill className='size-4 text-yellow-400' />
            {service.provider.rating} ({service.provider.reviews} reviews)
          </div>
        </div>
        {/* Optional: Add social links or link to provider profile */}
      </div>

      {/* Tabs Navigation */}
      <div className='mb-6'>
        <TabMenuHorizontal.Root value={activeTab} onValueChange={onTabChange}>
          <TabMenuHorizontal.List>
            <TabMenuHorizontal.Trigger value='Details'>
              Details
            </TabMenuHorizontal.Trigger>
            <TabMenuHorizontal.Trigger value='Options'>
              Options
            </TabMenuHorizontal.Trigger>
            <TabMenuHorizontal.Trigger value='Portfolio'>
              Portfolio
            </TabMenuHorizontal.Trigger>
            <TabMenuHorizontal.Trigger value='Review'>
              Review
            </TabMenuHorizontal.Trigger>
          </TabMenuHorizontal.List>
        </TabMenuHorizontal.Root>
      </div>
    </>
  );
}
