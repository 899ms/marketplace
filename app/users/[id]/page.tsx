'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import * as Avatar from '@/components/ui/avatar';
import * as AvatarGroup from '@/components/ui/avatar-group';
import * as Divider from '@/components/ui/divider';
import * as Button from '@/components/ui/button';
import * as Badge from '@/components/ui/badge';
import * as Tag from '@/components/ui/tag';
import * as TabMenuHorizontal from '@/components/ui/tab-menu-horizontal';
import {
  RiStarFill,
  RiStarSFill,
  RiHeart3Line,
  RiSendPlane2Fill,
  RiPencilLine,
  RiTwitchFill,
  RiTwitterXFill,
  RiGoogleFill,
  RiArrowRightSLine,
} from '@remixicon/react';
import { clsx } from 'clsx';
import { userOperations, jobOperations } from '@/utils/supabase/database';
import { User, Job } from '@/utils/supabase/types';

// Helper function to get currency symbol
const getCurrencySymbol = (currency: string): string => {
  switch (currency?.toUpperCase()) {
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    case 'CNY':
      return '¥';
    default:
      return '$'; // Default to USD
  }
};

// User Sidebar Component
const UserSidebar = ({ userData }: { userData: User | null }) => {
  if (!userData) {
    return (
      <aside className='hidden max-w-[352px] w-full shrink-0 lg:block'>
        <div className='shadow-sm sticky top-20 flex flex-col gap-4 rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-4'>
          <div className='flex flex-col items-center gap-3 text-center'>
            <div className='h-20 w-20 rounded-full bg-gray-200 animate-pulse'></div>
            <div className='h-6 w-32 bg-gray-200 animate-pulse'></div>
          </div>
          <div className='h-4 w-full bg-gray-200 animate-pulse'></div>
          <div className='h-20 w-full bg-gray-200 animate-pulse'></div>
        </div>
      </aside>
    );
  }

  const tags = [
    'Grammy',
    'Billboard Music',
    'American Music',
    'BRIT',
    'MTV Music',
    'Eurovision Awards',
  ];
  const reviewAvatars = [
    'https://i.pravatar.cc/40?img=32',
    'https://i.pravatar.cc/40?img=45',
    'https://i.pravatar.cc/40?img=12',
  ];

  return (
    <aside className='hidden max-w-[352px] w-full shrink-0 lg:block'>
      <div className='shadow-sm sticky top-20 flex flex-col gap-4 rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-4'>
        {/* Profile Section */}
        <div className='flex flex-col items-center gap-3 text-center'>
          <Avatar.Root size='80' className="relative">
            <Avatar.Image
              src={userData.avatar_url || 'https://via.placeholder.com/80'}
              alt={userData.full_name || userData.username}
            />
            <Avatar.Indicator position="bottom">
              <Avatar.Status status="online" />
            </Avatar.Indicator>
          </Avatar.Root>
          <div>
            <h2 className='text-label-lg font-medium text-text-strong-950'>
              {userData.full_name || userData.username}
            </h2>
            <div className='mt-1 flex items-center justify-center gap-1'>
              <RiStarFill className='size-3.5 text-yellow-400' />
              <span className='text-text-secondary-600 text-paragraph-xs'>
                4.9 (125) {/* Placeholder ratings - could be added to user schema later */}
              </span>
            </div>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <RiGoogleFill className='size-5 text-text-sub-600' /> Google
            <RiGoogleFill className='size-5 text-text-sub-600' /> Google
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {/* Follow Button */}
          <Button.Root
            variant="neutral"
            mode="stroke"
            size="xsmall"
            className="w-[85px] h-[32px] rounded-lg border border-stroke-soft-200 bg-bg-white-0 shadow-sm flex items-center justify-center gap-[6px] px-2"
          >
            <span className="text-paragraph-xs">Follow</span>
            <Button.Icon as={RiHeart3Line} className="size-[18px]" />
          </Button.Root>

          {/* Touch Button */}
          <Button.Root
            variant="neutral"
            mode="filled"
            size="xsmall"
            className="w-[83px] h-[32px] rounded-lg bg-[#20232D] border border-[#242628] shadow-md flex items-center justify-center gap-[6px] px-2"
          >
            <span className="text-paragraph-xs text-bg-white-0">Touch</span>
            <Button.Icon as={RiSendPlane2Fill} className="size-[18px]" />
          </Button.Root>
        </div>


        {/* Recent Reviews */}
        <div>
          <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            {/* Left section - Star and text */}
            <div className="flex items-center gap-1 text-label-md font-medium text-text-strong-950">
              <RiStarSFill className="size-6" /> {/* Slightly bigger */}
              <span>Recent reviews</span>
            </div>

            {/* Right section - Avatars */}
            <div className="mt-1 sm:mt-0 flex items-center gap-2">
              <AvatarGroup.Root size="24">
                {reviewAvatars.map((src, i) => (
                  <Avatar.Root key={i} size="24">
                    <Avatar.Image src={src} />
                  </Avatar.Root>
                ))}
              </AvatarGroup.Root>
              <span className="text-text-secondary-600 text-paragraph-xs">+4</span>
            </div>
          </div>
        </div>


        <Divider.Root />

        {/* Tags Section */}
        <div>
          <h3 className="mb-2 text-label-md font-medium text-text-strong-950">
            Tags
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge.Root
                key={tag}
                variant="light"
                size="medium"
                className="bg-white rounded-md border border-stroke-soft-300 text-gray-600 px-2 py-0.5"
              >
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

          </div>
          <p className='text-gray-600 line-clamp-5 text-paragraph-sm'>
            {userData.bio || "This user hasn't added a bio yet."}
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
const OrderListItem = ({ job }: { job: Job }) => {
  // Fixed placeholder tags 
  const placeholderTags = ['Mixing', 'Singing', 'Jazz'];

  // Ensure we always have exactly 3 tags to display
  let displayTags: string[] = [];

  // Add available skill_levels first
  if (job.skill_levels && Array.isArray(job.skill_levels)) {
    displayTags = [...job.skill_levels];
  }

  // If we have fewer than 3 tags, add placeholders until we have 3
  while (displayTags.length < 3) {
    const placeholderIndex = displayTags.length;
    if (placeholderIndex < placeholderTags.length) {
      displayTags.push(placeholderTags[placeholderIndex]);
    } else {
      // In case we run out of placeholders
      displayTags.push(`Tag ${displayTags.length + 1}`);
    }
  }

  // Log the tags we're displaying for debugging
  console.log('Displaying tags:', displayTags);

  return (
    <div className='flex items-start justify-between gap-4 border-b border-stroke-soft-200 py-4'>
      <div className='flex-1 max-w-[80%]'>
        {/* Title */}
        <h3 className='mb-1 text-paragraph-lg font-medium text-text-strong-950'>
          {job.title}
        </h3>

        {/* Tags */}
        <div className='mb-2 flex flex-wrap gap-1.5'>
          {displayTags.map((tag, i) => (
            <Tag.Root
              key={i}
              data-state={i === 0 ? "active" : "default"}
            >
              {tag}
            </Tag.Root>
          ))}
        </div>

        {/* Description */}
        <p className='text-text-secondary-600 line-clamp-2 text-paragraph-sm'>
          {job.description || "No description provided."}
        </p>
      </div>

      <div className='shrink-0 text-right'>
        <div className='text-gray-600 text-label-sm'>Budget</div>
        <div className='mb-2 text-label-lg font-medium text-text-strong-950'>
          {getCurrencySymbol(job.currency)}{job.budget.toLocaleString()}
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
      {/* Top row with user info and amount */}
      <div className='flex items-start justify-between mb-3'>
        {/* LEFT SIDE: Avatar + User Info */}
        <div className='flex items-start gap-3'>
          <Avatar.Root size='40' className='shrink-0'>
            <Avatar.Image src={review.avatarUrl} alt={review.name} />
          </Avatar.Root>

          <div className='flex flex-col'>
            {/* Row 1: Name */}
            <div className='text-text-secondary-600 text-label-sm font-medium'>
              {review.name}
            </div>

            {/* Row 2: Rating and Date */}
            <div className='flex items-center gap-1.5'>
              <div className='flex items-center gap-0.5'>
                <RiStarFill className='size-3.5 text-yellow-400' />
                <span className='text-gray-600 text-paragraph-xs'>
                  {review.rating}
                </span>
              </div>
              <span className='text-gray-600 text-paragraph-xs'>
                {review.date}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Amount */}
        <div className='shrink-0 text-right text-label-lg font-medium text-text-strong-950'>
          ${review.amount.toFixed(2)}
        </div>
      </div>

      {/* Bottom row with title and description */}
      <div>
        <h3 className='mb-1 text-paragraph-lg font-medium text-text-strong-950'>
          {review.title}
        </h3>
        <p className='text-gray-600 line-clamp-2 text-paragraph-sm'>
          {review.description}
        </p>
      </div>
    </div>
  );
};

// User Profile Page Component 
export default function UserProfilePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('Order'); // Default to Order tab
  const [userData, setUserData] = useState<User | null>(null);
  const [userJobs, setUserJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userId = params.id;

  // Fetch user data when component mounts or userId changes
  useEffect(() => {
    async function fetchUserData() {
      setIsLoading(true);
      setError(null);

      try {
        console.log('Fetching user data for ID:', userId);
        const user = await userOperations.getUserById(userId);

        if (user) {
          console.log('User data fetched successfully:', user);
          setUserData(user);
        } else {
          console.error('Failed to fetch user data, getUserById returned null');
          setError('User not found');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user profile');
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, [userId]);

  // Fetch jobs when user data is available
  useEffect(() => {
    async function fetchUserJobs() {
      if (!userData) return;

      setIsLoadingJobs(true);
      try {
        console.log('Fetching jobs for buyer ID:', userId);
        const jobs = await jobOperations.getJobsByBuyerId(userId);

        if (jobs && jobs.length > 0) {
          console.log('Jobs fetched successfully:', jobs);
          setUserJobs(jobs);
        } else {
          console.log('No jobs found for this user');
          setUserJobs([]);
        }
      } catch (err) {
        console.error('Error fetching user jobs:', err);
      } finally {
        setIsLoadingJobs(false);
      }
    }

    fetchUserJobs();
  }, [userData, userId]);

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
  ];

  // If there's an error loading the user data
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="mt-2">{error}</p>
          <Link href="/home" className="mt-4 inline-block text-blue-600 underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-1 gap-6 px-6 pt-6'>
      <UserSidebar userData={userData} />
      <main className="flex-1">
        {/* center everything horizontally */}
        <div className="w-full lg:max-w-[1000px] mx-auto px-4 sm:px-6">
          {/* tab bar */}
          <div className="mb-6 border-t-0">
            <TabMenuHorizontal.Root value={activeTab} onValueChange={setActiveTab}>
              <TabMenuHorizontal.List className="flex items-center gap-2 border-none">
                <TabMenuHorizontal.Trigger
                  value="Order"
                  className="
                    px-4 pb-2 text-label-lg font-medium 
                    text-gray-400 
                    data-[state=active]:text-black
                  "
                >
                  Order
                </TabMenuHorizontal.Trigger>
                <TabMenuHorizontal.Trigger
                  value="Review"
                  className="
                    px-4 pb-2 text-label-lg font-medium 
                    text-gray-400 
                    data-[state=active]:text-black
                  "
                >
                  Review
                </TabMenuHorizontal.Trigger>
              </TabMenuHorizontal.List>
            </TabMenuHorizontal.Root>
          </div>

          {/* content panel */}
          <div className="p-4">
            {activeTab === "Order" && (
              <div className="flex flex-col divide-y divide-stroke-soft-200">
                {isLoadingJobs ? (
                  // Loading skeleton for jobs
                  <>
                    <div className="py-4 animate-pulse">
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                    <div className="py-4 animate-pulse">
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </>
                ) : userJobs.length > 0 ? (
                  // Display actual jobs
                  userJobs.map((job) => (
                    <OrderListItem key={job.id} job={job} />
                  ))
                ) : (
                  // No jobs found
                  <div className="py-6 text-center">
                    <p className="text-gray-500">No orders found for this user.</p>
                  </div>
                )}
              </div>
            )}
            {activeTab === "Review" && (
              <div className="flex flex-col divide-y divide-stroke-soft-200">
                {reviewsData.map((review, i) => (
                  <ReviewListItem key={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 