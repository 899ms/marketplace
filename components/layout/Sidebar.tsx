'use client';

import React from 'react';
import Link from 'next/link';
import * as Avatar from '@/components/ui/avatar';
import * as Divider from '@/components/ui/divider';
import {
  RiStarFill,
  RiHomeLine,
  RiFileList2Line,
  RiChat1Line,
  RiCouponLine,
  RiQuestionLine,
  RiPencilLine,
  RiTwitchFill,
  RiTwitterXFill,
  RiGoogleFill,
} from '@remixicon/react';
import SidebarLink from './SidebarLink'; // Import the extracted SidebarLink

// Sidebar Component
const Sidebar = () => {
  // Example data - replace with actual data
  const user = {
    name: 'Cleve Music',
    avatarUrl: 'https://via.placeholder.com/80', // Placeholder
    rating: 4.9,
    reviews: 125,
    about:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer too",
  };

  return (
    <aside className='hidden w-64 shrink-0 lg:block xl:w-72'>
      <div className='shadow-sm sticky top-20 flex flex-col gap-6 rounded-xl border border-stroke-soft-200 bg-bg-white-0 px-4 pb-4'>
        {' '}
        {/* Adjusted top based on likely navbar height (h-16 + p-4 top) */}
        {/* Profile Section */}
        <div className='flex flex-col items-center gap-3 pb-6 pt-4'>
          <Avatar.Root size='80'>
            <Avatar.Image src={user.avatarUrl} alt={user.name} />
            <Avatar.Indicator position='bottom'>
              <Avatar.Status status='online' />
            </Avatar.Indicator>
          </Avatar.Root>
          <div className='text-center'>
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
            {/* Placeholder Google Logos */}
            <RiGoogleFill className='size-5 text-text-sub-600' />
            <RiGoogleFill className='size-5 text-text-sub-600' />
            <RiGoogleFill className='size-5 text-text-sub-600' />
          </div>
        </div>
        <Divider.Root /> {/* Added Divider */}
        {/* Navigation Section */}
        <nav>
          <ul className='flex flex-col gap-1'>
            <li>
              <SidebarLink href='/home' icon={RiHomeLine} label='Home' />
            </li>
            <li>
              <SidebarLink
                href='/orders'
                icon={RiFileList2Line}
                label='Order'
              />
            </li>
            <li>
              <SidebarLink href='/chat' icon={RiChat1Line} label='Chat' />
            </li>
            <li>
              <SidebarLink
                href='/bonus-sidebar'
                icon={RiCouponLine}
                label='Bonus'
              />
            </li>
            <li>
              <SidebarLink
                href='/help'
                icon={RiQuestionLine}
                label='Help Center'
              />
            </li>
          </ul>
        </nav>
        <Divider.Root /> {/* Added Divider */}
        {/* About Section */}
        <div>
          {' '}
          {/* Removed border-t, using Divider instead */}
          <div className='mb-3 flex items-center justify-between'>
            <h3 className='text-text-secondary-600 text-label-md font-medium'>
              About
            </h3>
            <button className='text-icon-secondary-400 hover:text-icon-primary-500'>
              <RiPencilLine className='size-4' />
            </button>
          </div>
          <p className='text-text-secondary-600 mb-4 text-paragraph-sm'>
            {user.about}
          </p>
          <div className='flex items-center gap-3'>
            {/* Placeholder Social Icons */}
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
      </div>
    </aside>
  );
};

export default Sidebar;
