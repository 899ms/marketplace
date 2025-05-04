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
import { ProfileActionButtons } from '../../users/profile/profile-action-buttons'; // Use relative path

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
  currentUser: User | null; // Add currentUser
  isLoadingChat: boolean; // Add isLoadingChat
  onHire: () => void; // Add onHire handler prop
  onMessage: () => void; // Add onMessage handler prop
}

// --- Profile Page Sidebar Component (Renamed) ---
export function ProfilePageSidebar({
  userProfile,
  currentUser,
  isLoadingChat,
  onHire,
  onMessage,
}: ProfilePageSidebarProps) {
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
  const chatError = null; // Mock chat error state
  const reviewAvatars = [
    'https://i.pravatar.cc/40?img=32',
    'https://i.pravatar.cc/40?img=45',
    'https://i.pravatar.cc/40?img=12',
  ]; // Mock review avatars

  const handleHireMeClick = () => {
    toast({
      title: "Hire Request Sent!",
      description: `Your request to hire ${userProfile.full_name || userProfile.username} has been sent.`
    });
  };
  const handleOpenChat = () => {
    toast({
      title: "Touch Clicked (Mock)",
      description: `Chat action for ${userProfile.full_name || userProfile.username}.`
    });
  };
  // --- End Mock State & Handlers ---

  return (
    <aside className='hidden w-[352px] max-w-[352px] shrink-0 lg:block'>
      <div className='sticky top-20 flex flex-col gap-4 border border-stroke-soft-200 bg-bg-white-0 max-h-[925px] rounded-[20px] pb-6 shadow-[0_2px_4px_0_rgba(14,18,27,0.03),0_6px_10px_0_rgba(14,18,27,0.06)]'>
        {/* Wrapper Div from UserSidebar */}
        <div className="flex flex-col max-w-[352px] max-h-[328px] p-5 gap-4">
          {/* Profile Section */}
          <div className='flex flex-col items-center gap-2 text-center py-3'> {/* Removed pt-4 px-4 */}
            {user.avatarUrl && user.avatarUrl !== "" ?
              <Avatar.Root size='80'> {/* Matched size */}
                <Avatar.Image src={user.avatarUrl} alt={user.name} />
                <Avatar.Indicator position='bottom'>
                  <Avatar.Status status='online' />
                </Avatar.Indicator>
              </Avatar.Root>
              :
              <Avatar.Root size='80' color='yellow'>{user.name.charAt(0).toUpperCase()}</Avatar.Root> // Matched size
            }
            <div className='text-center'>
              <h2 className='font-medium text-text-strong-950 text-[16px]'> {/* Matched size/weight */}
                {user.name}
              </h2>
              <div className='text-text-secondary-600 mt-1 flex items-center justify-center gap-1 text-sm'>
                <RiStarFill className='size-3.5 text-yellow-400' />
                <span className='text-text-secondary-600 text-paragraph-xs'> {/* Kept original styling for rating */}
                  {user.rating} ({user.reviews})
                </span>
              </div>
            </div>
            <div className='flex items-center justify-center gap-2'> {/* Updated Google icons/text */}
              <RiGoogleFill className='size-4 text-text-sub-600' /> <span className="text-[12px]">Google</span>
              <RiGoogleFill className='size-4 text-text-sub-600' /> <span className="text-[12px]">Google</span>
            </div>
          </div>
          {/* Removed Action Buttons */}

          {/* ADD ACTION BUTTONS COMPONENT */}
          <ProfileActionButtons
            targetUser={userProfile}
            currentUser={currentUser}
            isLoadingChat={isLoadingChat}
            onHire={onHire} // Pass down the prop
            onMessage={onMessage} // Pass down the prop
          />

          {/* Recent Reviews Section */}
          <div> {/* Original wrapper */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between"> {/* Removed mb-2 */}
              <div className="flex items-center gap-1 font-medium text-text-strong-950"> {/* Removed text-label-md */}
                {/* Inline SVG Star */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5"> {/* Changed size-4 back to size-5 and reverted width/height */}
                  <path d="M11.4416 2.92501L12.9083 5.85835C13.1083 6.26668 13.6416 6.65835 14.0916 6.73335L16.7499 7.17501C18.4499 7.45835 18.8499 8.69168 17.6249 9.90835L15.5583 11.975C15.2083 12.325 15.0166 13 15.1249 13.4833L15.7166 16.0417C16.1833 18.0667 15.1083 18.85 13.3166 17.7917L10.8249 16.3167C10.3749 16.05 9.63326 16.05 9.17492 16.3167L6.68326 17.7917C4.89992 18.85 3.81659 18.0583 4.28326 16.0417L4.87492 13.4833C4.98326 13 4.79159 12.325 4.44159 11.975L2.37492 9.90835C1.15826 8.69168 1.54992 7.45835 3.24992 7.17501L5.90826 6.73335C6.34992 6.65835 6.88326 6.26668 7.08326 5.85835L8.54992 2.92501C9.34992 1.33335 10.6499 1.33335 11.4416 2.92501Z" fill="#0A0D14" stroke="#0A0D14" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span className="text-xs">Recent reviews</span> {/* Changed text-sm to text-xs */}
              </div>
              {/* Right section - Avatars (Styled) */}
              <div className="flex items-center gap-2 rounded-full pt-0.5 pr-2.5 pb-0.5 pl-0.5 bg-bg-white-0 shadow-[0_2px_4px_0_rgba(27,28,29,0.04)] border">
                <AvatarGroup.Root size="24"> {/* Changed size 28 to 24 */}
                  {reviewAvatars.map((src, i) => (
                    <Avatar.Root key={i} size="24"> {/* Changed size 28 to 24 */}
                      <Avatar.Image src={src} />
                    </Avatar.Root>
                  ))}
                </AvatarGroup.Root>
                <span className="text-text-secondary-600 text-xs">+4</span> {/* Changed text-sm to text-xs */}
              </div>
            </div>
          </div>
        </div> {/* End Wrapper Div */}

        {/* Sections outside the wrapper */}
        <Divider.Root />

        {/* Skills Section - NEW (Based on original ProfileSidebar structure) */}
        <div className='px-4'>
          <div className='mb-3 flex items-center justify-between'>
            <h3 className='text-text-strong-950 text-[12px] font-semibold'>
              Skills
            </h3>
            {/* TODO: Implement edit functionality later */}
            <button className='text-icon-secondary-400 hover:text-icon-primary-500'>
              <RiPencilLine className='size-4 text-[#99A0AE]' />
            </button>
          </div>
          <div className='space-y-2 text-[12px]'>
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
                <p className='text-[12px] font-medium text-text-strong-950'>
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

        {/* Awards Section - Styled like Tags section */}
        <div className='px-4 max-w-[352px] max-h-[116px]'>
          <div className='mb-3 flex items-center justify-between'>
            <h3 className='text-text-strong-950 font-semibold text-[12px]'>
              Awards
            </h3>
            <button className='text-icon-secondary-400 hover:text-icon-primary-500'>
              <RiPencilLine className='size-4 text-[#99A0AE]' />
            </button>
          </div>
          <div className='flex flex-wrap gap-1.5'>
            {mockAwards.map((award, idx) => (
              <Tag.Root key={idx} className="bg-white rounded-md border border-stroke-soft-300 text-gray-600 px-2 py-0.5">
                {award}
              </Tag.Root>
            ))}
          </div>
        </div>
        <Divider.Root />

        {/* Combined About and Social Links Section - Copied from UserSidebar styles */}
        <div className="flex flex-col max-w-[352px] max-h-[218px] pb-4 px-4 gap-5">
          {/* About Content */}
          <div className='flex items-center justify-between'> {/* Removed mb-2 */}
            <h3 className='text-text-strong-950 text-[12px] font-semibold'>
              About
            </h3>
            {/* TODO: Add Edit button logic if needed for own profile */}
            <button className='text-icon-secondary-400 hover:text-icon-primary-500'>
              <RiPencilLine className='size-4 text-[#99A0AE]' />
            </button>
          </div>
          <p className='line-clamp-5 font-normal text-[12px] leading-4 tracking-normal text-[#525866]'>
            {userProfile.bio || "This user hasn't added a bio yet."}
          </p>

          {/* Social Links */}
          <div className='flex items-center gap-3'>
            {socialLinks.map(({ platform, icon: Icon, color, href }) => (
              <Link
                key={platform}
                href={href}
                className='text-icon-secondary-400 hover:opacity-80'
                target="_blank"
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