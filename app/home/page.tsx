'use client'; // Add use client directive

import React, { useState, useEffect } from 'react'; // Import hooks
import Link from 'next/link';
import Image from 'next/image'; // For Google logos if needed
import * as Avatar from '@/components/ui/avatar';
import * as Divider from '@/components/ui/divider'; // Import Divider
import * as LinkButton from '@/components/ui/link-button'; // Restore import
import * as Badge from '@/components/ui/badge'; // Restore import
import {
  RiStarFill,
  RiHomeLine,
  RiFileList2Line,
  RiChat1Line,
  RiCouponLine,
  RiQuestionLine,
  RiPencilLine,
  RiTwitchFill, // Placeholder icons, confirm availability
  RiTwitterXFill, // Placeholder icons, confirm availability
  RiGoogleFill, // Placeholder icons, confirm availability
  RiArrowRightSLine, // Restore icon
  RiBriefcaseLine, // Restore icon
  RiMoneyDollarCircleLine, // Restore icon
  RiSparklingLine, // Restore icon
} from '@remixicon/react';
import { cn } from '@/utils/cn'; // Import cn if needed for conditional classes

// --- Helper component and interface definitions ---
interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  // isActive prop is removed for now, will be added later with router logic
  // isActive?: boolean;
}
const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  // Remove isActive logic for now
  const isActive = false;
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-label-md transition-colors duration-200',
        // isActive // Use this line later
        //   ? 'bg-bg-weak-50 font-medium text-text-strong-950'
        //   : 'text-text-secondary-600 hover:bg-bg-weak-50 hover:text-text-strong-950'
        'text-text-secondary-600 hover:bg-bg-weak-50 hover:text-text-strong-950', // Default style
      )}
    >
      <Icon
        className={cn(
          'size-5',
          /* isActive ? 'text-icon-strong-950' : */ 'text-icon-secondary-400',
        )}
      />
      {label}
    </Link>
  );
};
// ----------------------------------------------------

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
  // Remove activeRoute variable
  // const activeRoute = '/orders';

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

// --- Banner Component ---
const dummyBanners = [
  {
    title: 'R & B Hits',
    description:
      'All mine, Lie again, Petty call me everyday, Out of time, No love, Bad habit, and so much more',
    // image: '/path/to/rb-artist.png' // Optional image path
  },
  {
    title: 'Indie Rock Anthems',
    description:
      'Latest tracks from underground favorites and rising stars. Explore the new sounds.',
    // image: '/path/to/indie-artist.png'
  },
  {
    title: 'Smooth Jazz Grooves',
    description:
      'Relax and unwind with the smoothest jazz tunes. Perfect for a chill evening.',
    // image: '/path/to/jazz-artist.png'
  },
];

const Banner = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBannerIndex(
        (prevIndex) => (prevIndex + 1) % dummyBanners.length,
      );
    }, 5000); // Change banner every 5 seconds

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const currentBanner = dummyBanners[currentBannerIndex];

  return (
    <div className='shadow-lg relative mb-8 min-h-[280px] overflow-hidden rounded-xl bg-gray-800 p-6 text-white'>
      <div className='relative z-10 max-w-xl'>
        {/* Display dynamic content */}
        <h1 className='text-3xl mb-2 font-semibold'>{currentBanner.title}</h1>
        <p className='text-sm mb-4 text-gray-300'>
          {currentBanner.description}
        </p>
        {/* Indicator Dots - Update based on current index */}
        <div className='flex gap-1.5'>
          {dummyBanners.map((_, index) => (
            <span
              key={index}
              className={cn(
                'block h-1.5 w-1.5 rounded-full transition-colors duration-300',
                index === currentBannerIndex ? 'bg-white' : 'bg-gray-500',
              )}
            ></span>
          ))}
        </div>
      </div>
      {/* TODO: Add dynamic image based on currentBanner.image */}
      {/* <Image src={currentBanner.image || defaultImage} alt={currentBanner.title} ... /> */}
    </div>
  );
};

// --- Section Header Component ---
interface SectionHeaderProps {
  title: string;
  href?: string;
}
const SectionHeader = ({ title, href = '#' }: SectionHeaderProps) => {
  return (
    <div className='mb-4 flex items-center justify-between'>
      <h2 className='text-xl font-semibold text-text-strong-950'>{title}</h2>
      <LinkButton.Root
        variant='gray'
        size='small'
        className='text-label-md'
        asChild
      >
        <Link href={href}>
          More
          <LinkButton.Icon as={RiArrowRightSLine} />
        </Link>
      </LinkButton.Root>
    </div>
  );
};

// --- Service Card Component ---
const ServiceCard = () => {
  return (
    <div className='shadow-sm overflow-hidden rounded-lg border border-stroke-soft-200 bg-bg-white-0'>
      <div className='h-40 w-full bg-gradient-to-br from-blue-400 to-purple-500'></div>
      <div className='p-3'>
        <p className='mb-2 line-clamp-2 text-paragraph-sm font-medium text-text-strong-950'>
          Draw catchy and eye-catching illustrations anime
        </p>
        <div className='text-text-secondary-600 mb-2 flex items-center gap-1 text-paragraph-xs'>
          <div className='size-4 rounded-full bg-gray-300'></div>
          <span>Cleve Music</span>
          <RiGoogleFill className='ml-1 size-3' />
          <RiGoogleFill className='size-3' />
          <RiGoogleFill className='size-3' />
        </div>
        <div className='flex items-center justify-between text-paragraph-sm'>
          <div className='text-text-secondary-600 flex items-center gap-0.5'>
            <RiStarFill className='size-3.5 text-yellow-400' />
            <span>4.9 (125)</span>
          </div>
          <span className='font-medium text-text-strong-950'>$101</span>
        </div>
      </div>
    </div>
  );
};

// --- Worker Card Component ---
const WorkerCard = () => {
  return (
    <div className='shadow-sm overflow-hidden rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4'>
      <div className='mb-2 flex items-start justify-between'>
        <div className='flex items-center gap-2'>
          <Avatar.Root size='32'>
            <Avatar.Image
              src='https://via.placeholder.com/40'
              alt='Worker Avatar'
            />
          </Avatar.Root>
          <div>
            <div className='text-label-sm font-medium text-text-strong-950'>
              Cleve Music
            </div>
            <div className='text-text-secondary-600 mt-0.5 flex items-center gap-0.5 text-[11px]'>
              <RiStarFill className='size-3 text-yellow-400' />
              <span>4.9 (125)</span>
            </div>
          </div>
        </div>
        <Avatar.Root size='20' color='blue'>
          <span className='text-[10px] font-medium'>J</span>
        </Avatar.Root>
      </div>
      <div className='text-text-secondary-600 mb-2 flex items-center gap-1.5 text-[11px]'>
        <span className='inline-flex items-center gap-0.5'>
          <RiMoneyDollarCircleLine className='size-3' /> Salary
        </span>
        <span className='inline-flex items-center gap-0.5'>
          <RiBriefcaseLine className='size-3' /> Work
        </span>
        <span className='inline-flex items-center gap-0.5'>
          <RiSparklingLine className='size-3' /> Specia
        </span>
      </div>
      <p className='text-text-secondary-600 mb-3 line-clamp-2 text-paragraph-xs'>
        Passionate about delivering high-quality audio mixing and editing. Let's
        create something....
      </p>
      <div className='flex flex-wrap gap-1'>
        <Badge.Root variant='light' size='small'>
          Mixing
        </Badge.Root>
        <Badge.Root variant='light' size='small'>
          Singing
        </Badge.Root>
        <Badge.Root variant='light' size='small'>
          Jazz
        </Badge.Root>
        <Badge.Root variant='light' size='small'>
          Hip hop
        </Badge.Root>
        <Badge.Root variant='light' size='small'>
          K pop
        </Badge.Root>
      </div>
    </div>
  );
};

// Main Content Component
const MainContent = () => {
  return (
    <main className='flex-1'>
      <Banner />

      {/* Hot Services Section */}
      <section className='mb-8'>
        <SectionHeader title='Hot Services' href='/services' />
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
        </div>
      </section>

      {/* Hot Workers Section */}
      <section className='mb-8'>
        <SectionHeader title='Hot Workers' href='/workers' />
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          <WorkerCard />
          <WorkerCard />
          <WorkerCard />
        </div>
      </section>

      {/* Category Ranking Section */}
      <section>
        <SectionHeader title='Category Ranking' href='/categories' />
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
        </div>
      </section>
    </main>
  );
};

// Buyer Dashboard Homepage
export default function HomePage() {
  return (
    <div className='flex flex-1 gap-6 px-6 pt-6'>
      <Sidebar />
      <MainContent />
    </div>
  );
}
