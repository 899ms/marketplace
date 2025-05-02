'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useNotification } from '@/hooks/use-notification';

import * as Avatar from '@/components/ui/avatar';
import * as Divider from '@/components/ui/divider';
import * as Badge from '@/components/ui/badge'; // Keep Badge import for tags if needed
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
  RiHeart3Line,
  RiSendPlane2Fill,
  RiLoader4Line,
  RiStarSFill,
} from '@remixicon/react';
import { cn } from '@/utils/cn';
import * as Tag from '@/components/ui/tag'; // Keep Tag import for tags section
import { User } from '@/utils/supabase/types';
import * as Button from '@/components/ui/button'; // Add Button import
import * as AvatarGroup from '@/components/ui/avatar-group'; // Add AvatarGroup import

// --- Helper Components (Keep SidebarLink as it's used) ---
interface SidebarLinkProps {
  href?: string;
  icon: React.ElementType;
  label: string;
  isActive?: boolean; // Add isActive prop for potential future use
  onClick?: () => void;
}

const SidebarLink = ({ href, icon: Icon, label, isActive, onClick }: SidebarLinkProps) => {
  const commonClasses = cn(
    'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-label-md transition-colors duration-200',
    'text-text-secondary-600 focus:outline-none focus:ring-2 focus:ring-border-focus-base',
    isActive ? 'bg-action-hover-bg-inverse-0 text-text-strong-950' : 'hover:bg-action-hover-bg-inverse-0 hover:text-text-strong-950'
  );

  const content = (
    <>
      <Icon className={cn('size-5', isActive ? 'text-text-strong-950' : 'text-text-secondary-600')} />
      <span className={isActive ? 'font-medium' : ''}>{label}</span>
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={commonClasses}>
        {content}
      </button>
    );
  }
  if (href) {
    return (
      <Link href={href} className={commonClasses}>
        {content}
      </Link>
    );
  }
  return (
    <div className={cn(commonClasses, 'cursor-not-allowed opacity-50')}>
      {content}
    </div>
  );
};

// --- Profile Page Sidebar Props ---
interface ProfilePageSidebarProps {
  userProfile: User;
  // Add other specific props if needed for profile page context
}

// --- Profile Page Sidebar Component (Renamed) ---
export function ProfilePageSidebar({ userProfile }: ProfilePageSidebarProps) {
  const { notification: toast } = useNotification();

  // Use userProfile directly or map to a simpler structure if preferred
  const user = {
    name: userProfile.full_name ?? 'User',
    avatarUrl: userProfile.avatar_url ?? '',
    // Use mock/placeholder rating & reviews until fetched
    rating: 4.9, // Placeholder
    reviews: 125, // Placeholder
  };

  // Mock tags and links as per the image
  const mockAwards = [
    'Grammy',
    'Billboard Music',
    'American Music',
    'BRIT',
    'MTV Music',
    'Eurovision Awards',
  ];

  const socialLinks = [
    { platform: 'twitch', icon: RiTwitchFill, color: '#6441A5', href: '#' },
    { platform: 'twitter', icon: RiTwitterXFill, color: '#000000', href: '#' },
    { platform: 'google', icon: RiGoogleFill, color: '#DB4437', href: '#' }, // Example color
  ];

  // --- Mock State & Handlers for Buttons/Reviews --- 
  const isLoadingChat = false; // Mock chat loading state
  const chatError = null; // Mock chat error state
  const reviewAvatars = [
    'https://i.pravatar.cc/40?img=32',
    'https://i.pravatar.cc/40?img=45',
    'https://i.pravatar.cc/40?img=12',
  ]; // Mock review avatars

  const handleHireMeClick = () => {
    toast({
      title: "Hire Request Sent!",
      description: `Your request to hire ${userProfile.full_name || userProfile.username} has been sent.`,
      status: "success",
      variant: "filled"
    });
  };
  const handleOpenChat = () => {
    toast({
      title: "Touch Clicked (Mock)",
      description: `Chat action for ${userProfile.full_name || userProfile.username}.`,
      status: "information",
      variant: "filled"
    });
  };
  // --- End Mock State & Handlers ---

  // Adjust class names if needed to remove margin/padding specific to dashboard layout
  // e.g., remove mt-[3.5rem] from <aside> if it's not needed
  // e.g., remove mb-6 from inner div if spacing is handled differently
  return (
    <aside className='hidden w-full shrink-0 lg:block'> {/* Adjust width/responsive classes as needed */}
      <div className='shadow-sm sticky top-20 flex flex-col gap-4 rounded-xl border border-stroke-soft-200 bg-bg-white-0 pb-4'> {/* Reduced gap-6 to gap-4 */}
        {/* Profile Section - Matches image */}
        <div className='flex flex-col items-center gap-3 pt-4 px-4'> {/* Removed pb-6 */}
          {user.avatarUrl && user.avatarUrl !== "" ?
            <Avatar.Root size='80'>
              <Avatar.Image src={user.avatarUrl} alt={user.name} />
              <Avatar.Indicator position='bottom' className='translate-x-1 translate-y-1'>
                {/* Green dot indicator like the image */}
                <div className='size-4 rounded-full bg-green-500 ring-2 ring-white' />
              </Avatar.Indicator>
            </Avatar.Root>
            :
            <Avatar.Root size='80' color='yellow'>{user.name.charAt(0).toUpperCase()}</Avatar.Root> // Fallback initial
          }
          <div className='text-center'>
            <h2 className='text-lg font-medium text-text-strong-950'> {/* Adjust text size/weight if needed */}
              {user.name}
            </h2>
            <div className='text-text-secondary-600 mt-1 flex items-center justify-center gap-1 text-sm'> {/* Adjust text size/color */}
              <RiStarFill className='size-4 text-yellow-400' /> {/* Adjust color if needed */}
              <span>
                {user.rating} ({user.reviews})
              </span>
            </div>
          </div>
          {/* Icons below rating - Replace with Google items */}
          <div className='text-text-secondary-600 flex items-center justify-center gap-3 text-xs mt-2'>
            {/* Remove original Salary/Work/Specia spans */}
            {/* <span className='inline-flex items-center gap-1'> ... </span> */}
            {/* <span className='inline-flex items-center gap-1'> ... </span> */}
            {/* <span className='inline-flex items-center gap-1'> ... </span> */}

            {/* Add two Google items */}
            <span className='inline-flex items-center gap-1'>
              <RiGoogleFill className='size-4 text-text-sub-600' /> {/* Adjust size/color as needed */}
              Google
            </span>
            <span className='inline-flex items-center gap-1'>
              <RiGoogleFill className='size-4 text-text-sub-600' /> {/* Adjust size/color as needed */}
              Google
            </span>
          </div>
        </div>
        {/* Remove this Divider */}
        {/* <Divider.Root /> */}

        {/* Action Buttons - Copied & Adapted */}
        <div className="flex items-center justify-center gap-2 px-4">
          {/* Hire Me Button (Formerly Follow) */}
          <Button.Root
            variant="neutral"
            mode="stroke"
            size="xsmall"
            className="w-[85px] h-[32px] rounded-lg border border-stroke-soft-200 bg-bg-white-0 shadow-sm flex items-center justify-center gap-[6px] px-2"
            onClick={handleHireMeClick}
            aria-label={"Hire user"}
          >
            <span className="text-paragraph-xs">Hire Me</span>
            <Button.Icon as={RiHeart3Line} className="size-[18px]" />
          </Button.Root>

          {/* Touch Button */}
          <Button.Root
            variant="neutral"
            mode="filled"
            size="xsmall"
            className="w-[83px] h-[32px] rounded-lg bg-[#20232D] border border-[#242628] shadow-md flex items-center justify-center gap-[6px] px-2"
            onClick={handleOpenChat}
            disabled={isLoadingChat || !userProfile}
            aria-label={!userProfile ? "Cannot message user" : "Send message"}
          >
            {isLoadingChat ? (
              <RiLoader4Line className="animate-spin text-white" size={18} />
            ) : (
              <>
                <span className="text-paragraph-xs text-bg-white-0">Touch</span>
                <Button.Icon as={RiSendPlane2Fill} className="size-[18px] text-white" />
              </>
            )}
          </Button.Root>
        </div>

        {/* Display Chat Error - Placeholder/Removed */}
        {/* {chatError && (
          <p className="text-xs text-red-600 mb-2 text-center">Error: {chatError}</p>
        )} */}

        {/* Recent Reviews - Copied & Adapted */}
        <div className="px-4"> {/* Added px-4 */}
          <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-1 text-label-md font-medium text-text-strong-950">
              <RiStarSFill className="size-6" />
              <span>Recent reviews</span>
            </div>
            <div className="mt-1 sm:mt-0 flex items-center gap-2">
              <AvatarGroup.Root size="24">
                {reviewAvatars.map((src, i) => (
                  <Avatar.Root key={i} size="24">
                    <Avatar.Image src={src} />
                  </Avatar.Root>
                ))}
              </AvatarGroup.Root>
              <span className="text-text-secondary-600 text-paragraph-xs">+4</span> {/* Placeholder count */}
            </div>
          </div>
        </div>

        <Divider.Root />

        {/* Skills Section - NEW (Based on original ProfileSidebar structure) */}
        <div className='px-4'>
          <div className='mb-3 flex items-center justify-between'>
            <h3 className='text-text-secondary-600 text-label-md font-medium'>
              Skills
            </h3>
            {/* TODO: Implement edit functionality later */}
            <button className='text-icon-secondary-400 hover:text-icon-primary-500'>
              <RiPencilLine className='size-4 text-[#99A0AE]' />
            </button>
          </div>
          <div className='space-y-2'>
            {/* Mock Skills Data - Add actual data source later */}
            {[
              { name: 'Singer', details: 'Female', price: '$150 per song' },
              { name: 'Songwriter', details: 'Lyric', contactForPricing: true },
              {
                name: 'Top-line writer',
                details: 'vocal melody',
                contactForPricing: true,
              },
              { name: 'Vocal Tuning', details: '', contactForPricing: true },
            ].map((skill, idx) => (
              <div key={idx}>
                <p className='text-sm font-medium text-text-strong-950'>
                  {skill.name}
                  {skill.details ? ` - ${skill.details}` : ''}
                </p>
                {skill.price && (
                  <p className='text-xs text-text-secondary-600'>{skill.price}</p>
                )}
                {skill.contactForPricing && (
                  <p className='text-xs text-text-primary-600'>
                    Contact for pricing
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        <Divider.Root />

        {/* Awards Section - Use Tag component */}
        <div className='px-4'>
          <div className='mb-3 flex items-center justify-between'>
            <h3 className='text-text-secondary-600 text-label-md font-medium'>
              Awards
            </h3>
            <button className='text-icon-secondary-400 hover:text-icon-primary-500'>
              <RiPencilLine className='size-4 text-[#99A0AE]' />
            </button>
          </div>
          <div className='flex flex-wrap gap-1.5'>
            {mockAwards.map((award, idx) => (
              <Tag.Root key={idx}>
                {award}
              </Tag.Root>
            ))}
          </div>
        </div>
        <Divider.Root />

        {/* About Section - Modified to include Links */}
        <div className='px-4'>
          <div className='mb-2 flex items-center justify-between'>
            <h3 className='text-text-secondary-600 text-label-md font-medium'>
              About
            </h3>
            {/* TODO: Implement edit functionality later */}
            <button className='text-icon-secondary-400 hover:text-icon-primary-500'>
              <RiPencilLine className='size-4 text-[#99A0AE]' />
            </button>
          </div>
          <p className='text-text-secondary-600 line-clamp-3 text-sm mb-3'> {/* Added mb-3 for spacing */}
            {userProfile.bio || "This user hasn't added a bio yet."}
          </p>
          {/* Social Links moved here */}
          <div className='flex items-center gap-3'>
            {socialLinks.map(({ platform, icon: Icon, color, href }) => (
              <Link
                key={platform}
                href={href} // TODO: Use actual links from user data later
                className='text-icon-secondary-400 hover:opacity-80'
                target="_blank" // Open social links in new tab
                rel="noopener noreferrer"
              >
                <Icon className='size-7' style={{ color: color }} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
} 