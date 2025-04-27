'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Avatar from '@/components/ui/avatar';
import * as AvatarGroup from '@/components/ui/avatar-group';
import * as Divider from '@/components/ui/divider';
import * as Button from '@/components/ui/button';
import * as Badge from '@/components/ui/badge';
import * as TabMenuHorizontal from '@/components/ui/tab-menu-horizontal';
import {
  RiStarFill,
  RiStarSFill,
  RiHeartLine,
  RiSendPlane2Fill,
  RiPencilLine,
  RiTwitchFill,
  RiTwitterXFill,
  RiGoogleFill,
  RiArrowRightSLine,
} from '@remixicon/react';
import { cn } from '@/utils/cn';

// Order Page Sidebar Component
const OrderSidebar = () => {
  const user = {
    name: 'Cleve Music',
    avatarUrl: 'https://via.placeholder.com/80',
    rating: 4.9,
    reviews: 125,
    about:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  };
  const tags = [
    'Grammy',
    'Billboard Music',
    'American Music',
    'BRIT',
    'MTV Music',
    'Eurovision Awards',
  ];
  const reviewAvatars = [
    'https://via.placeholder.com/40?text=R1',
    'https://via.placeholder.com/40?text=R2',
    'https://via.placeholder.com/40?text=R3',
  ];

  return (
    <aside className='hidden w-64 shrink-0 lg:block xl:w-72'>
      <div className='shadow-sm sticky top-20 flex flex-col gap-4 rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-4'>
        {/* Profile Section */}
        <div className='flex flex-col items-center gap-3 text-center'>
          <Avatar.Root size='80'>
            <Avatar.Image src={user.avatarUrl} alt={user.name} />
            {/* No status indicator shown in this screenshot */}
          </Avatar.Root>
          <div>
            <h2 className='text-label-lg font-medium text-text-strong-950'>
              {user.name}
            </h2>
            <div className='text-text-secondary-600 mt-1 flex items-center justify-center gap-1 text-paragraph-sm'>
              <RiStarFill className='size-4 text-yellow-400' />
              <span>
                {user.rating} ({user.reviews})
              </span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <RiGoogleFill className='size-5 text-text-sub-600' />
            <RiGoogleFill className='size-5 text-text-sub-600' />
          </div>
        </div>

        {/* Action Buttons */}
        <div className='grid grid-cols-2 gap-2'>
          <Button.Root variant='neutral' mode='stroke' size='small'>
            <Button.Icon as={RiHeartLine} />
            Follow
          </Button.Root>
          <Button.Root variant='neutral' mode='filled' size='small'>
            <Button.Icon as={RiSendPlane2Fill} />
            Touch
          </Button.Root>
        </div>

        <Divider.Root />

        {/* Recent Reviews */}
        <div>
          <div className='mb-2 flex items-center gap-1 text-label-md font-medium text-text-strong-950'>
            <RiStarSFill className='size-4' />
            Recent reviews
          </div>
          <div className='flex items-center gap-2'>
            <AvatarGroup.Root size='24'>
              {reviewAvatars.map((src, i) => (
                <Avatar.Root key={i} size='24'>
                  <Avatar.Image src={src} />
                </Avatar.Root>
              ))}
            </AvatarGroup.Root>
            <span className='text-text-secondary-600 text-paragraph-xs'>
              +4
            </span>
          </div>
        </div>

        <Divider.Root />

        {/* Tags Section */}
        <div>
          <h3 className='mb-2 text-label-md font-medium text-text-strong-950'>
            Tags
          </h3>
          <div className='flex flex-wrap gap-1.5'>
            {tags.map((tag) => (
              <Badge.Root key={tag} variant='light' size='medium'>
                {tag}
              </Badge.Root>
            ))}
          </div>
        </div>

        <Divider.Root />

        {/* About Section */}
        <div>
          <div className='mb-2 flex items-center justify-between'>
            <h3 className='text-label-md font-medium text-text-strong-950'>
              About
            </h3>
            <button className='text-icon-secondary-400 hover:text-icon-primary-500'>
              <RiPencilLine className='size-4' />
            </button>
          </div>
          <p className='text-text-secondary-600 line-clamp-5 text-paragraph-sm'>
            {user.about}
          </p>
        </div>

        {/* Social Links */}
        <div className='flex items-center gap-3 border-t border-stroke-soft-200 pt-4'>
          <Link
            href='#'
            className='text-icon-secondary-400 hover:text-icon-primary-500'
          >
            <RiTwitchFill className='size-5' />
          </Link>
          <Link
            href='#'
            className='text-icon-secondary-400 hover:text-icon-primary-500'
          >
            <RiTwitterXFill className='size-5' />
          </Link>
          <Link
            href='#'
            className='text-icon-secondary-400 hover:text-icon-primary-500'
          >
            <RiGoogleFill className='size-5' />
          </Link>
        </div>
      </div>
    </aside>
  );
};

// Order List Item Component
const OrderListItem = () => {
  // Example data - replace with props
  const order = {
    title: 'Write professional resume, cover letter',
    tags: ['Mixing', 'Singing', 'Jazz', 'Hip hop', 'K pop'],
    description:
      "We are seeking a talented Website Designer and Front-End Developer to join our team. In this role, you will be responsible for creating visually appealing and user-friendly websites that meet our clients' needs. You",
    budget: 1400,
  };

  return (
    <div className='flex items-start gap-4 border-b border-stroke-soft-200 py-4'>
      {/* Blue J Indicator - Placeholder */}
      <Avatar.Root size='32' color='blue' className='mt-1 shrink-0'>
        <span className='text-label-sm font-medium'>J</span>
      </Avatar.Root>

      <div className='flex-1'>
        {/* Title */}
        <h3 className='mb-1 text-paragraph-lg font-medium text-text-strong-950'>
          {order.title}
        </h3>

        {/* Tags */}
        <div className='mb-2 flex flex-wrap gap-1.5'>
          {order.tags.map((tag) => (
            <Badge.Root key={tag} variant='light' size='small'>
              {tag}
            </Badge.Root>
          ))}
        </div>

        {/* Description */}
        <p className='text-text-secondary-600 line-clamp-2 text-paragraph-sm'>
          {order.description}
        </p>
      </div>

      <div className='shrink-0 text-right'>
        <div className='text-text-secondary-600 text-label-sm'>Budget</div>
        <div className='mb-2 text-label-lg font-medium text-text-strong-950'>
          ${order.budget.toLocaleString()}
        </div>
        <Button.Root variant='neutral' mode='stroke' size='small'>
          Apply
          <Button.Icon as={RiArrowRightSLine} />
        </Button.Root>
      </div>
    </div>
  );
};

// Review List Item Component
const ReviewListItem = () => {
  const review = {
    avatarUrl: 'https://via.placeholder.com/40',
    name: 'Cleve Music',
    rating: 4.9,
    date: 'Jan 8, 2023',
    title: 'Contract title text here...',
    description:
      "Working with Ralph on a UX audit for our website was a game-changer. Ralph didn't just identify pain points-he offered innovative solutions that empowered me to make key business decisions with confidence.123confidence.123confidence.123confidence.123confidence.123confidence.123confidence.123confidence.123confidence.123",
    amount: 1000.0,
  };

  return (
    <div className='border-b border-stroke-soft-200 py-4'>
      <div className='flex items-start gap-3'>
        {/* Avatar and User Info */}
        <Avatar.Root size='40' className='mt-1 shrink-0'>
          <Avatar.Image src={review.avatarUrl} alt={review.name} />
        </Avatar.Root>

        <div className='flex-1'>
          <div className='mb-1 flex items-center gap-1.5'>
            <div className='text-text-secondary-600 text-label-sm font-medium'>
              {review.name}
            </div>
            <div className='flex items-center gap-0.5'>
              <RiStarFill className='size-3.5 text-yellow-400' />
              <span className='text-text-secondary-600 text-paragraph-xs'>
                {review.rating}
              </span>
            </div>
            <span className='text-text-secondary-600 text-paragraph-xs'>
              {review.date}
            </span>
          </div>

          {/* Review Title and Description */}
          <h3 className='mb-1 text-paragraph-md font-medium text-text-strong-950'>
            {review.title}
          </h3>
          <p className='text-text-secondary-600 line-clamp-2 text-paragraph-sm'>
            {review.description}
          </p>
        </div>

        {/* Amount */}
        <div className='shrink-0 text-right text-label-lg font-medium text-text-strong-950'>
          ${review.amount.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

// Order/Review Page Component
export default function OrderPage() {
  const [activeTab, setActiveTab] = useState('Order'); // Default to Order tab

  // Example data for multiple review items with different content
  const reviewsData = [
    {
      avatarUrl: 'https://via.placeholder.com/40',
      name: 'Cleve Music',
      rating: 4.9,
      date: 'Jan 8, 2023',
      title: 'Contract title text here...Contract title text here..ntr',
      description:
        "Working with Ralph on a UX audit for our website was a game-changer. Ralph didn't just identify pain points-he offered innovative solutions that empowered me to make key business decisions with confidence.",
      amount: 1000.0,
    },
    {
      avatarUrl: 'https://via.placeholder.com/40',
      name: 'Cleve Music',
      rating: 4.9,
      date: 'Jan 8, 2023',
      title: 'Contract title text here...',
      description:
        "Working with Ralph on a UX audit for our website was a game-changer. Ralph didn't just identify pain points-he offered innovative solutions that empowered me to make key business decisions with confidence.",
      amount: 1000.0,
    },
    {
      avatarUrl: 'https://via.placeholder.com/40',
      name: 'Cleve Music',
      rating: 4.9,
      date: 'Jan 8, 2023',
      title: 'Contract title text here...',
      description:
        "Working with Ralph on a UX audit for our website was a game-changer. Ralph didn't just identify pain points-he offered innovative solutions that empowered me to make key business decisions with confidence.",
      amount: 1000.0,
    },
    {
      avatarUrl: 'https://via.placeholder.com/40',
      name: 'Cleve Music',
      rating: 4.9,
      date: 'Jan 8, 2023',
      title: 'Contract title text here...',
      description:
        "Working with Ralph on a UX audit for our website was a game-changer. Ralph didn't just identify pain points-he offered innovative solutions that empowered me to make key business decisions with confidence.",
      amount: 1000.0,
    },
    {
      avatarUrl: 'https://via.placeholder.com/40',
      name: 'Cleve Music',
      rating: 4.9,
      date: 'Jan 8, 2023',
      title: 'Contract title text here...',
      description:
        "Working with Ralph on a UX audit for our website was a game-changer. Ralph didn't just identify pain points-he offered innovative solutions that empowered me to make key business decisions with confidence.",
      amount: 1000.0,
    },
  ];

  return (
    <div className='flex flex-1 gap-6 px-6 pt-6'>
      <OrderSidebar />
      <main className='flex-1'>
        <div className='mb-6'>
          <TabMenuHorizontal.Root
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabMenuHorizontal.List>
              <TabMenuHorizontal.Trigger value='Order'>
                Order
              </TabMenuHorizontal.Trigger>
              <TabMenuHorizontal.Trigger value='Review'>
                Review
              </TabMenuHorizontal.Trigger>
            </TabMenuHorizontal.List>
          </TabMenuHorizontal.Root>
        </div>
        <div className='shadow-sm rounded-xl border-b border-l border-r border-stroke-soft-200 bg-bg-white-0 p-4'>
          {activeTab === 'Order' && (
            <div className='flex flex-col divide-y divide-stroke-soft-200'>
              <OrderListItem />
              <OrderListItem />
              <OrderListItem />
            </div>
          )}
          {activeTab === 'Review' && (
            <div className='flex flex-col'>
              {reviewsData.map((review, index) => (
                <ReviewListItem key={index} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
