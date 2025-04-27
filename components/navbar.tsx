'use client'; // Mark component as client-side

import Link from 'next/link';
import Image from 'next/image'; // Using next/image for optimization
import * as Button from './ui/button';
import * as Input from './ui/input';
import * as Dropdown from './ui/dropdown';
import * as Avatar from './ui/avatar';
import * as Switch from './ui/switch'; // Import Switch
import * as Badge from './ui/badge'; // Import Badge
import * as Divider from './ui/divider'; // Import Divider
import {
  RiSearchLine,
  RiGlobalLine,
  RiAddLine,
  RiNotification3Line,
  RiArrowDownSLine,
  RiUserLine, // Icon for Profile
  RiSettings3Line, // Icon for Settings
  RiLogoutBoxRLine, // Icon for Logout
  RiMoonLine, // Added
  RiFileCopyLine, // Added for Copy ID
  RiFileList2Line, // Added for Orders
  RiQuestionLine, // Added for Help Center
  RiChat1Line, // Added for Live Chat
} from '@remixicon/react';
import { useState } from 'react';
import { cn } from '@/utils/cn'; // Import cn utility
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'; // Assuming a copy hook exists

export default function Navbar() {
  // --- Placeholder for Auth State ---
  const isLoggedIn = true; // Set to true to show logged-in state, false for logged-out
  // TODO: Replace with actual authentication check
  // ---------------------------------

  const [isDarkMode, setIsDarkMode] = useState(false);
  const { copy, hasCopied } = useCopyToClipboard(); // Assuming hook usage
  const userId = '1235984'; // Example User ID

  // TODO: Implement Dark Mode toggle logic (e.g., using next-themes)
  const handleDarkModeToggle = () => {
    setIsDarkMode((prev) => !prev);
    // Add theme switching logic here
  };

  return (
    <nav className='border-b border-stroke-soft-200'>
      <div className='flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8'>
        {/* Left Section: Logo and Nav Links */}
        <div className='flex items-center gap-8'>
          {/* Logo */}
          <Link
            href='/'
            className='text-lg flex items-center gap-2 font-semibold text-text-strong-950'
          >
            {/* Placeholder for actual logo - assuming an SVG or Image component */}
            <svg
              width='30'
              height='30'
              viewBox='0 0 30 30'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M15 2.5C15.663 2.5 16.2989 2.76339 16.7678 3.23223C17.2366 3.70107 17.5 4.33696 17.5 5V25C17.5 25.663 17.2366 26.2989 16.7678 26.7678C16.2989 27.2366 15.663 27.5 15 27.5C14.337 27.5 13.7011 27.2366 13.2322 26.7678C12.7634 26.2989 12.5 25.663 12.5 25V5C12.5 4.33696 12.7634 3.70107 13.2322 3.23223C13.7011 2.76339 14.337 2.5 15 2.5ZM7.5 7.5C8.16304 7.5 8.79893 7.76339 9.26777 8.23223C9.73661 8.70107 10 9.33696 10 10V20C10 20.663 9.73661 21.2989 9.26777 21.7678C8.79893 22.2366 8.16304 22.5 7.5 22.5C6.83696 22.5 6.20107 22.2366 5.73223 21.7678C5.26339 21.2989 5 20.663 5 20V10C5 9.33696 5.26339 8.70107 5.73223 8.23223C6.20107 7.76339 6.83696 7.5 7.5 7.5ZM22.5 7.5C23.163 7.5 23.7989 7.76339 24.2678 8.23223C24.7366 8.70107 25 9.33696 25 10V20C25 20.663 24.7366 21.2989 24.2678 21.7678C23.7989 22.2366 23.163 22.5 22.5 22.5C21.837 22.5 21.2011 22.2366 20.7322 21.7678C20.2634 21.2989 20 20.663 20 20V10C20 9.33696 20.2634 8.70107 20.7322 8.23223C21.2011 7.76339 21.837 7.5 22.5 7.5Z'
                fill='currentColor'
              />
            </svg>
            {/* Add actual logo text if needed */}
          </Link>
          {/* Navigation Links */}
          <div className='text-text-secondary-600 hidden items-center gap-6 text-label-md lg:flex'>
            <Link href='/services' className='hover:text-text-strong-950'>
              Find Services
            </Link>
            <Link href='/workers' className='hover:text-text-strong-950'>
              Find Workers
            </Link>
            <Link href='/projects' className='hover:text-text-strong-950'>
              Find Projects
            </Link>
            <Link href='/bonus' className='hover:text-text-strong-950'>
              Bonus
            </Link>
          </div>
        </div>

        {/* Right Section: Search, Language, Auth Buttons/Account */}
        <div className='flex items-center gap-3 sm:gap-4'>
          {/* Search Input */}
          <div className='relative hidden sm:block'>
            <Input.Root>
              <Input.Wrapper size='medium'>
                <Input.Icon
                  as={RiSearchLine}
                  className='text-icon-secondary-400'
                />
                <Input.Input
                  placeholder='Discover more'
                  className='w-52 lg:w-64'
                />
              </Input.Wrapper>
            </Input.Root>
          </div>

          {/* Language Selector Dropdown - Placeholder */}
          {/* TODO: Replace with actual Dropdown implementation */}
          <button className='text-icon-secondary-400 hover:bg-bg-neutral-subtle-100 hidden rounded-md p-2 sm:flex'>
            <RiGlobalLine className='size-5' />
          </button>

          {isLoggedIn ? (
            <>
              {/* Create Button */}
              <Button.Root variant='neutral' mode='filled' size='medium'>
                Create
                <Button.Icon as={RiAddLine} />
              </Button.Root>

              {/* Notifications Button */}
              <button className='text-icon-secondary-400 hover:bg-bg-neutral-subtle-100 relative rounded-md p-2'>
                {/* TODO: Add notification indicator logic */}
                <span className='absolute right-1.5 top-1.5 block h-2 w-2 rounded-full bg-error-base ring-2 ring-bg-white-0'></span>
                <RiNotification3Line className='size-5' />
              </button>

              {/* --- Account Dropdown --- */}
              <Dropdown.Root>
                <Dropdown.Trigger asChild>
                  <button className='text-text-secondary-600 hover:bg-bg-neutral-subtle-100 flex items-center gap-2 rounded-lg border border-stroke-soft-200 p-1 pr-2 text-label-md'>
                    <Avatar.Root size='40'>
                      {/* Placeholder - Replace with actual user image */}
                      <Avatar.Image
                        src='https://via.placeholder.com/40'
                        alt='User Avatar'
                      />
                    </Avatar.Root>
                    <span className='hidden md:inline'>Account</span>
                    <RiArrowDownSLine className='text-icon-sub-500 hidden size-4 md:inline' />
                  </button>
                </Dropdown.Trigger>
                <Dropdown.Content align='end' className='w-72'>
                  {/* User Info Section */}
                  <div className='mb-1 flex items-center gap-3 p-2'>
                    <Avatar.Root size='40'>
                      <Avatar.Image
                        src='https://via.placeholder.com/40'
                        alt='Emma Wright'
                      />
                      {/* Add Fallback logic if needed, Avatar component might handle it */}
                    </Avatar.Root>
                    <div className='flex-1'>
                      <div className='text-label-sm text-text-strong-950'>
                        Emma Wright
                      </div>
                      <div className='mt-0.5 flex items-center gap-1'>
                        <span className='text-paragraph-xs text-text-sub-600'>
                          ID: {userId}
                        </span>
                        <button
                          onClick={() => copy(userId)}
                          title='Copy ID'
                          className='text-icon-secondary-400 hover:text-icon-primary-500'
                        >
                          <RiFileCopyLine className='size-3.5' />
                        </button>
                        {hasCopied && (
                          <Badge.Root
                            variant='light'
                            color='green'
                            size='small'
                          >
                            Copied
                          </Badge.Root>
                        )}
                      </div>
                    </div>
                    {/* <Badge.Root variant='light' color='green' size='medium'>PRO</Badge.Root> /* Optional PRO badge if needed */}
                  </div>

                  <Divider.Root className='mx-2 my-1' />

                  {/* Dark Mode Toggle */}
                  <Dropdown.Item
                    className='cursor-default hover:bg-transparent focus:bg-transparent data-[highlighted]:bg-transparent' // Prevent hover/focus style
                    onSelect={(e) => e.preventDefault()} // Prevent closing on select
                  >
                    <Dropdown.ItemIcon as={RiMoonLine} />
                    Dark Mode
                    <span className='flex-1' />
                    <Switch.Root
                      checked={isDarkMode}
                      onCheckedChange={handleDarkModeToggle}
                    />
                  </Dropdown.Item>

                  {/* Account Settings */}
                  <Dropdown.Item>
                    <Dropdown.ItemIcon as={RiSettings3Line} />
                    Account Settings
                  </Dropdown.Item>

                  {/* Orders */}
                  <Dropdown.Item>
                    <Dropdown.ItemIcon as={RiFileList2Line} />
                    Orders
                  </Dropdown.Item>

                  <Divider.Root className='mx-2 my-1' />

                  {/* Support Section */}
                  <Dropdown.Label>SUPPORT</Dropdown.Label>
                  <Dropdown.Item>
                    <Dropdown.ItemIcon as={RiQuestionLine} />
                    Help Center
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Dropdown.ItemIcon as={RiChat1Line} />
                    Live chat
                  </Dropdown.Item>

                  <Divider.Root className='mx-2 my-1' />

                  {/* Balance Section */}
                  <div className='flex items-center justify-between p-2'>
                    <div>
                      <div className='text-text-secondary-600 text-label-sm'>
                        Balance
                      </div>
                      <div className='text-label-md font-medium text-text-strong-950'>
                        12,000.05
                      </div>{' '}
                      {/* Example balance */}
                    </div>
                    <Button.Root variant='primary' mode='stroke' size='small'>
                      Top up
                    </Button.Root>
                  </div>

                  <Divider.Root className='mx-2 my-1' />

                  {/* Logout */}
                  <Dropdown.Item className='text-error-base'>
                    <Dropdown.ItemIcon as={RiLogoutBoxRLine} />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown.Root>
              {/* --- End Account Dropdown --- */}
            </>
          ) : (
            <>
              {/* Free Start Button */}
              <Button.Root variant='neutral' mode='filled' size='medium'>
                Free Start
              </Button.Root>
            </>
          )}

          {/* Mobile Menu Button - Placeholder */}
          <div className='lg:hidden'>
            {/* TODO: Add mobile menu toggle button & functionality */}
            <button className='text-icon-secondary-400 hover:bg-bg-neutral-subtle-100 rounded-md p-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
