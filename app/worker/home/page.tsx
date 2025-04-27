'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Avatar from '@/components/ui/avatar';
import * as Divider from '@/components/ui/divider';
import * as LinkButton from '@/components/ui/link-button';
import * as Badge from '@/components/ui/badge';
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
  RiArrowRightSLine,
  RiCalendarEventLine,
  RiMoneyDollarCircleLine,
  RiBriefcaseLine,
  RiSparklingLine,
} from '@remixicon/react';
import { cn } from '@/utils/cn';

// --- Helper Components and Interfaces ---
interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-label-md transition-colors duration-200',
      )}
    >
      <Icon className={cn('size-5')} />
      {label}
    </Link>
  );
};

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

// --- Worker Dashboard Sidebar ---
const WorkerSidebar = () => {
  const user = {
    name: 'Cleve Music',
    avatarUrl: 'https://via.placeholder.com/80',
    rating: 4.9,
    reviews: 125,
  };

  const tags = [
    'Grammy',
    'Billboard Music',
    'American Music',
    'BRIT',
    'MTV Music',
    'Eurovision Awards',
  ];

  return (
    <aside className='hidden w-64 shrink-0 lg:block xl:w-72'>
      <div className='shadow-sm sticky top-20 flex flex-col gap-6 rounded-xl border border-stroke-soft-200 bg-bg-white-0 px-4 pb-4'>
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
          <div className='text-text-secondary-600 flex items-center gap-1.5 text-[11px]'>
            <span className='inline-flex items-center gap-0.5'>
              <RiMoneyDollarCircleLine className='size-3 text-orange-500' />{' '}
              Salary
            </span>
            <span className='inline-flex items-center gap-0.5'>
              <RiBriefcaseLine className='size-3 text-blue-500' /> Work
            </span>
            <span className='inline-flex items-center gap-0.5'>
              <RiSparklingLine className='size-3 text-purple-500' /> Specia
            </span>
          </div>
        </div>
        <Divider.Root />
        {/* Navigation Section */}
        <nav>
          <ul className='flex flex-col gap-1'>
            <li>
              <SidebarLink href='/worker/home' icon={RiHomeLine} label='Home' />
            </li>
            <li>
              <SidebarLink
                href='/worker/orders'
                icon={RiFileList2Line}
                label='Order'
              />
            </li>
            <li>
              <SidebarLink
                href='/worker/chat'
                icon={RiChat1Line}
                label='Chat'
              />
            </li>
            <li>
              <SidebarLink
                href='/worker/bonus'
                icon={RiCouponLine}
                label='Bonus'
              />
            </li>
            <li>
              <SidebarLink
                href='/worker/help'
                icon={RiQuestionLine}
                label='Help Center'
              />
            </li>
          </ul>
        </nav>
        <Divider.Root />
        {/* Tags Section */}
        <div>
          <div className='mb-3 flex items-center justify-between'>
            <h3 className='text-text-secondary-600 text-label-md font-medium'>
              Tags
            </h3>
            <button className='text-icon-secondary-400 hover:text-icon-primary-500'>
              <RiPencilLine className='size-4' />
            </button>
          </div>
          <div className='flex flex-wrap gap-1.5'>
            {tags.map((tag, idx) => (
              <Badge.Root
                key={idx}
                variant='stroke'
                size='small'
                className='text-text-secondary-600'
              >
                {tag}
              </Badge.Root>
            ))}
          </div>
        </div>
        <Divider.Root />
        {/* Links Section */}
        <div>
          <div className='mb-3 flex items-center justify-between'>
            <h3 className='text-text-secondary-600 text-label-md font-medium'>
              Links
            </h3>
            <button className='text-icon-secondary-400 hover:text-icon-primary-500'>
              <RiPencilLine className='size-4' />
            </button>
          </div>
          <div className='flex items-center gap-3'>
            <Link href='#' className='text-[#6441A5] hover:opacity-80'>
              <RiTwitchFill className='size-5' />
            </Link>
            <Link href='#' className='text-black hover:opacity-80'>
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

// --- Banner Component (Reused from Buyer Home) ---
const dummyBanners = [
  {
    title: 'R & B Hits',
    description:
      'All mine, Lie again, Petty call me everyday, Out of time, No love, Bad habit, and so much more',
    image:
      'https://via.placeholder.com/600x300/334155/ffffff?text=R%26B+Artist', // Placeholder Image
  },
  {
    title: 'Indie Rock Anthems',
    description:
      'Latest tracks from underground favorites and rising stars. Explore the new sounds.',
    image:
      'https://via.placeholder.com/600x300/1e293b/ffffff?text=Indie+Artist', // Placeholder Image
  },
  {
    title: 'Smooth Jazz Grooves',
    description:
      'Relax and unwind with the smoothest jazz tunes. Perfect for a chill evening.',
    image: 'https://via.placeholder.com/600x300/0f172a/ffffff?text=Jazz+Artist', // Placeholder Image
  },
];

const Banner = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBannerIndex(
        (prevIndex) => (prevIndex + 1) % dummyBanners.length,
      );
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const currentBanner = dummyBanners[currentBannerIndex];

  return (
    <div className='shadow-lg relative mb-8 min-h-[280px] overflow-hidden rounded-xl bg-gray-800 text-white'>
      <Image
        src={currentBanner.image}
        alt={currentBanner.title}
        layout='fill'
        objectFit='cover'
        className='absolute inset-0 z-0 opacity-40'
      />
      <div className='via-gray-900/70 absolute inset-0 z-0 bg-gradient-to-r from-gray-900 to-transparent'></div>
      <div className='relative z-10 flex h-full max-w-xl flex-col justify-end p-6'>
        <h1 className='text-3xl mb-2 font-semibold'>{currentBanner.title}</h1>
        <p className='text-sm mb-4 line-clamp-2 text-gray-300'>
          {currentBanner.description}
        </p>
        <div className='flex gap-1.5'>
          {dummyBanners.map((_, index) => (
            <span
              key={index}
              className={cn(
                'block h-1.5 w-1.5 rounded-full transition-all duration-300',
                index === currentBannerIndex ? 'w-4 bg-white' : 'bg-gray-500',
              )}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Project Card Component (Reused from Services Page) ---
const ProjectCard = () => {
  return (
    <div className='shadow-sm hover:shadow-md overflow-hidden rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4 transition-all'>
      <div className='mb-2 flex items-start justify-between'>
        <h3 className='text-sm line-clamp-1 font-medium text-text-strong-950'>
          Write professional resumeWrite professional resumeWrite
        </h3>
        <Avatar.Root size='24' color='blue' className='flex-shrink-0'>
          <span className='text-[10px] font-medium'>J</span>
        </Avatar.Root>
      </div>
      <div className='mb-3 flex flex-wrap gap-1'>
        {['Mixing', 'Singing', 'Jazz', 'Hip hop', 'K pop'].map((tag) => (
          <Badge.Root key={tag} variant='light' size='small'>
            {tag}
          </Badge.Root>
        ))}
      </div>
      <p className='text-text-secondary-600 text-sm mb-4 line-clamp-2'>
        We are seeking a talented Website Designer and Front-End Developer to
        join our team. In this role, you will bfse.......
      </p>
      <div className='flex items-center justify-between'>
        <div className='text-right'>
          <p className='text-xs text-text-secondary-600'>Budget</p>
          <p className='text-sm font-medium text-text-strong-950'>$1,400</p>
        </div>
        <button className='text-xs hover:bg-text-strong-900 flex items-center gap-1 rounded-md bg-text-strong-950 px-3 py-1.5 font-medium text-white'>
          Apply <RiArrowRightSLine className='size-3.5' />
        </button>
      </div>
    </div>
  );
};

// --- Calendar Widget Component (Placeholder) ---
const CalendarWidget = () => {
  return (
    <div className='shadow-sm mb-6 rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='text-md flex items-center gap-2 font-semibold text-text-strong-950'>
          <RiCalendarEventLine className='size-5' /> Calendar
        </h3>
        <Link
          href='#'
          className='text-sm text-text-primary-600 hover:text-text-primary-700'
        >
          See All
        </Link>
      </div>
      {/* Placeholder for Calendar Implementation */}
      <div className='text-text-secondary-500 py-10 text-center'>
        Calendar Widget Placeholder
      </div>
    </div>
  );
};

// --- Meetings Widget Component (Placeholder) ---
const MeetingsWidget = () => {
  return (
    <div className='shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
      <div className='border-b border-stroke-soft-200 p-4'>
        {/* Tabs Placeholder */}
        <div className='text-text-secondary-500 py-4 text-center'>
          7 Days / 15 Days / 30 Days Tabs Placeholder
        </div>
      </div>
      {/* Meeting List Placeholder */}
      <div className='text-text-secondary-500 px-4 py-10 text-center'>
        Meeting List Placeholder
      </div>
    </div>
  );
};

// --- Main Content for Worker Dashboard ---
const WorkerMainContent = () => {
  return (
    <main className='flex-1'>
      <Banner />
      {/* Projects Section */}
      <section>
        <SectionHeader title='Projects' href='/worker/projects' />
        <div className='flex flex-col space-y-4'>
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </section>
    </main>
  );
};

// --- Right Sidebar for Worker Dashboard ---
const WorkerRightSidebar = () => {
  return (
    <aside className='hidden w-80 shrink-0 xl:block'>
      <div className='sticky top-20'>
        <CalendarWidget />
        <MeetingsWidget />
      </div>
    </aside>
  );
};

// --- Worker Dashboard Homepage ---
export default function WorkerHomePage() {
  return (
    <div className='bg-bg-subtle-100 flex flex-1 gap-6 px-6 pt-6'>
      <WorkerSidebar />
      <WorkerMainContent />
      <WorkerRightSidebar />
    </div>
  );
}
