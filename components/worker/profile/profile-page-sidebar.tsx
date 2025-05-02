'use client';

import React from 'react';
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
} from '@remixicon/react';
import { cn } from '@/utils/cn';
import * as Tag from '@/components/ui/tag'; // Keep Tag import for tags section
import { User } from '@/utils/supabase/types';

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
  // Remove notification hook if not used here, or keep if needed
  const { notification } = useNotification();

  // Use userProfile directly or map to a simpler structure if preferred
  const user = {
    name: userProfile.full_name ?? 'User',
    avatarUrl: userProfile.avatar_url ?? '',
    // Use mock/placeholder rating & reviews until fetched
    rating: 4.9, // Placeholder
    reviews: 125, // Placeholder
  };

  // Mock tags and links as per the image
  const tags = [
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

  // Remove handleComingSoonClick or adapt if needed for profile page
  // const handleComingSoonClick = () => { ... };

  // Adjust class names if needed to remove margin/padding specific to dashboard layout
  // e.g., remove mt-[3.5rem] from <aside> if it's not needed
  // e.g., remove mb-6 from inner div if spacing is handled differently
  return (
    <aside className='hidden w-full shrink-0 lg:block'> {/* Adjust width/responsive classes as needed */}
      <div className='shadow-sm sticky top-20 flex flex-col gap-6 rounded-xl border border-stroke-soft-200 bg-bg-white-0 pb-4'>
        {/* Profile Section - Matches image */}
        <div className='flex flex-col items-center gap-3 pb-6 pt-4 px-4'>
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
          {/* Icons below rating - Matches image */}
          <div className='text-text-secondary-600 flex items-center justify-center gap-3 text-xs mt-2'>
            <span className='inline-flex items-center gap-1'>
              {/* Salary Icon - Placeholder */}
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.99978 5.38672V7.29339L7.32645 7.06005C6.98645 6.94005 6.77979 6.82672 6.77979 6.24672C6.77979 5.77339 7.13312 5.38672 7.56645 5.38672H7.99978Z" fill="#F27B2C" />
                <path d="M10.22 9.75321C10.22 10.2265 9.86667 10.6132 9.43333 10.6132H9V8.70654L9.67333 8.93988C10.0133 9.05988 10.22 9.17321 10.22 9.75321Z" fill="#F27B2C" />
                <path d="M11.2935 1.3335H5.70683C3.28016 1.3335 1.8335 2.78016 1.8335 5.20683V10.7935C1.8335 13.2202 3.28016 14.6668 5.70683 14.6668H11.2935C13.7202 14.6668 15.1668 13.2202 15.1668 10.7935V5.20683C15.1668 2.78016 13.7202 1.3335 11.2935 1.3335ZM10.0068 8.00016C10.5268 8.18016 11.2202 8.56016 11.2202 9.7535C11.2202 10.7802 10.4202 11.6135 9.4335 11.6135H9.00016V12.0002C9.00016 12.2735 8.7735 12.5002 8.50016 12.5002C8.22683 12.5002 8.00016 12.2735 8.00016 12.0002V11.6135H7.76016C6.66683 11.6135 5.78016 10.6868 5.78016 9.5535C5.78016 9.28016 6.00016 9.0535 6.28016 9.0535C6.5535 9.0535 6.78016 9.28016 6.78016 9.5535C6.78016 10.1402 7.22016 10.6135 7.76016 10.6135H8.00016V8.3535L6.9935 8.00016C6.4735 7.82016 5.78016 7.44016 5.78016 6.24683C5.78016 5.22016 6.58016 4.38683 7.56683 4.38683H8.00016V4.00016C8.00016 3.72683 8.22683 3.50016 8.50016 3.50016C8.7735 3.50016 9.00016 3.72683 9.00016 4.00016V4.38683H9.24016C10.3335 4.38683 11.2202 5.3135 11.2202 6.44683C11.2202 6.72016 11.0002 6.94683 10.7202 6.94683C10.4468 6.94683 10.2202 6.72016 10.2202 6.44683C10.2202 5.86016 9.78016 5.38683 9.24016 5.38683H9.00016V7.64683L10.0068 8.00016Z" fill="#F27B2C" />
              </svg>
              Salary
            </span>
            <span className='inline-flex items-center gap-1'>
              {/* Work Icon - Placeholder */}
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_24005_11186)">
                  <path d="M6.59977 4.99316C6.22644 4.99316 5.93311 5.29316 5.93311 5.65983C5.93311 6.0265 6.23311 6.3265 6.59977 6.3265C6.96644 6.3265 7.26644 6.0265 7.26644 5.65983C7.26644 5.29316 6.96644 4.99316 6.59977 4.99316Z" fill="#5A36BF" />
                  <path d="M14.8068 3.36016C14.2468 2.06016 13.0135 1.3335 11.2935 1.3335H5.70683C3.56683 1.3335 1.8335 3.06683 1.8335 5.20683V10.7935C1.8335 12.5135 2.56016 13.7468 3.86016 14.3068C3.98683 14.3602 4.1335 14.3268 4.22683 14.2335L14.7335 3.72683C14.8335 3.62683 14.8668 3.48016 14.8068 3.36016ZM7.52016 8.16016C7.26016 8.4135 6.92016 8.5335 6.58016 8.5335C6.24016 8.5335 5.90016 8.40683 5.64016 8.16016C4.96016 7.52016 4.2135 6.50016 4.50016 5.28683C4.7535 4.18683 5.72683 3.6935 6.58016 3.6935C7.4335 3.6935 8.40683 4.18683 8.66016 5.2935C8.94016 6.50016 8.1935 7.52016 7.52016 8.16016Z" fill="#5A36BF" />
                  <path d="M13.4798 13.6868C13.6264 13.8335 13.6064 14.0735 13.4264 14.1735C12.8398 14.5002 12.1264 14.6668 11.2931 14.6668H5.70643C5.5131 14.6668 5.4331 14.4402 5.56643 14.3068L9.5931 10.2802C9.72644 10.1468 9.9331 10.1468 10.0664 10.2802L13.4798 13.6868Z" fill="#5A36BF" />
                  <path d="M15.1667 5.20643V10.7931C15.1667 11.6264 15 12.3464 14.6733 12.9264C14.5733 13.1064 14.3333 13.1198 14.1867 12.9798L10.7733 9.56643C10.64 9.4331 10.64 9.22643 10.7733 9.0931L14.8 5.06643C14.94 4.9331 15.1667 5.0131 15.1667 5.20643Z" fill="#5A36BF" />
                </g>
                <defs>
                  <clipPath id="clip0_24005_11186">
                    <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
              Work
            </span>
            <span className='inline-flex items-center gap-1'>
              {/* Specia Icon - Placeholder */}
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.65327 2.33977L10.8266 4.68643C10.9866 5.0131 11.4133 5.32643 11.7733 5.38643L13.8999 5.73977C15.2599 5.96643 15.5799 6.9531 14.5999 7.92643L12.9466 9.57977C12.6666 9.85977 12.5133 10.3998 12.5999 10.7864L13.0733 12.8331C13.4466 14.4531 12.5866 15.0798 11.1533 14.2331L9.15994 13.0531C8.79994 12.8398 8.20661 12.8398 7.83994 13.0531L5.84661 14.2331C4.41994 15.0798 3.55327 14.4464 3.92661 12.8331L4.39994 10.7864C4.48661 10.3998 4.33327 9.85977 4.05327 9.57977L2.39994 7.92643C1.42661 6.9531 1.73994 5.96643 3.09994 5.73977L5.22661 5.38643C5.57994 5.32643 6.00661 5.0131 6.16661 4.68643L7.33994 2.33977C7.97994 1.06643 9.01994 1.06643 9.65327 2.33977Z" fill="#253EA7" />
              </svg>
              Specia
            </span>
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

        {/* Tags Section - Matches image */}
        <div className='px-4'>
          <div className='mb-3 flex items-center justify-between'>
            <h3 className='text-text-secondary-600 text-label-md font-medium'>
              Tags
            </h3>
            {/* TODO: Implement edit functionality later */}
            <button className='text-icon-secondary-400 hover:text-icon-primary-500'>
              <RiPencilLine className='size-4 text-[#99A0AE]' />
            </button>
          </div>
          <div className='flex flex-wrap gap-1.5'>
            {tags.map((tag, idx) => (
              <Tag.Root
                key={idx}
              >
                {tag}
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