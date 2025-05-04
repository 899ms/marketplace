'use client'; // Mark component as client-side

import Link from 'next/link';
import Image from 'next/image'; // Import next/image
import * as Button from './ui/button';
import * as FancyButton from './ui/fancy-button'; // Import FancyButton
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
  RiSettings3Line, // Icon for Settings
  RiLogoutBoxRLine, // Icon for Logout
  RiMoonLine, // Added
  RiFileCopyLine, // Added for Copy ID
  RiFileList2Line, // Added for Orders
  RiQuestionLine, // Added for Help Center
  RiChat1Line,
  RiArrowDownFill,
  RiArrowDropDownFill, // Added for Live Chat
} from '@remixicon/react';
import { useState } from 'react';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'; // Assuming a copy hook exists
import { useAuth } from '@/utils/supabase/AuthContext'; // Import useAuth
import usFlagIcon from '@/assets/images/icons/United_States.svg'; // Import the SVG file

export default function Navbar() {
  // --- Get Auth State using useAuth hook ---
  const { user, userProfile, signOut, loading } = useAuth();
  // Replace the placeholder isLoggedIn with the actual user state
  // const isLoggedIn = true; // Remove this line
  // -----------------------------------------

  const [isDarkMode, setIsDarkMode] = useState(false);
  const { copy, hasCopied } = useCopyToClipboard();
  // const userId = '1235984'; // Use user.id instead

  // TODO: Implement Dark Mode toggle logic (e.g., using next-themes)
  const handleDarkModeToggle = () => {
    setIsDarkMode((prev) => !prev);
    // Add theme switching logic here
  };

  // Handle Logout
  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      console.error('Error logging out:', error);
      // TODO: Show notification to user
    }
    // No need to redirect here, AuthProvider listener will update state
  };

  // Optional: Basic loading state
  if (loading) {
    return (
      <nav className='fixed top-0 left-0 right-0 z-50 bg-white shadow-sm'>
        <div className='flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8'>
          {/* Simplified loading state or skeleton */}
          <div>Loading...</div>
        </div>
      </nav>
    );
  }

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-white'>
      <div className='mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-8 py-5 gap-4 border-b border-stroke-soft-200 shadow-sm'>
        {/* Left Section: Logo and Nav Links */}
        <div className='flex items-center gap-8'>
          {/* Logo */}
          <Link
            href='/home'
            className='text-lg flex items-center gap-2 font-semibold text-text-strong-950'
          >
            {/* Replace placeholder SVG with Next.js Image */}
            <Image
              src='/images/logo.svg' // Path relative to the public directory
              alt='Marketplace Logo' // Descriptive alt text
              width={40} // Increased width
              height={40} // Increased height
              priority // Load the logo quickly as it's important
            />
            {/* You can add text next to the logo if needed, e.g., <span>MyBrand</span> */}
          </Link>
          {/* Navigation Links Container - Apply new styles */}
          <div className='text-text-secondary-600 hidden items-center gap-5   text-label-md lg:flex'>

            <Link href='/services/search?tab=Worker' className='hover:text-text-strong-950 px-2 py-1 rounded-md hover:bg-bg-weak-50 transition-colors'> {/* Added padding/hover bg */}
              Find Worker
            </Link>
            <Link href='/services/search?tab=Service' className='hover:text-text-strong-950  py-1 rounded-md hover:bg-bg-weak-50 transition-colors'> {/* Added padding/hover bg for better click area */}
              Find Services
            </Link>
            <Link href='/services/search?tab=Project' className='hover:text-text-strong-950 px-2 py-1 rounded-md hover:bg-bg-weak-50 transition-colors'> {/* Added padding/hover bg */}
              Find Projects
            </Link>
            <Link href='/bonus' className='hover:text-text-strong-950 px-2 py-1 rounded-md hover:bg-bg-weak-50 transition-colors'> {/* Added padding/hover bg */}
              Bonus
            </Link>
          </div>
        </div>

        {/* Right Section: Search, Language, Auth Buttons/Account */}
        <div className='flex items-center gap-3 sm:gap-4'>
          {/* Search Input */}
          <div className='relative hidden sm:block'>
            <Input.Root>
              <Input.Wrapper size='medium' className='h-10 w-[220px] rounded-10 border bg-white shadow-regular-xs gap-1.5'>
                <Input.Icon
                  as={RiSearchLine}
                  className='text-icon-secondary-400'
                />
                <Input.Input
                  placeholder='Discover more'
                  className='w-52 lg:w-64 font-normal'
                />
              </Input.Wrapper>
            </Input.Root>
          </div>

          {/* Language Selector moved down */}

          {user ? ( // Use user !== null for checking login status
            <>
              {/* Create Button - Updated with conditional link */}
              <Link
                href={
                  userProfile?.user_type === 'seller'
                    ? '/worker/services/create'
                    : '/jobs/create'
                }
                passHref
              >
                <FancyButton.Root variant='neutral' size='medium' className='gap-4 font-medium text-sm'>
                  Create
                  <FancyButton.Icon as={RiAddLine} />
                </FancyButton.Root>
              </Link>

              {/* Language Selector Dropdown - Moved here */}
              {/* TODO: Replace with actual Dropdown implementation */}

              {/* Use imported SVG variable */}
              <Image
                src={usFlagIcon} // Use the imported variable
                alt="Select Language"
                width={24}
                height={24}
              />


              {/* Notifications Button */}
              <button className='text-icon-secondary-400 hover:bg-bg-neutral-subtle-100 relative rounded-md p-2'>
                {/* TODO: Add notification indicator logic */}
                <span className='absolute right-1.5 top-1.5 block h-2 w-2 rounded-full bg-error-base ring-2 ring-bg-white-0'></span>
                <RiNotification3Line className='size-5' />
              </button>

              {/* --- Account Dropdown --- */}
              <Dropdown.Root>
                <Dropdown.Trigger asChild>
                  <button className='text-text-secondary-600 hover:bg-bg-neutral-subtle-100 flex items-center rounded-10 border border-stroke-soft-200 p-1 pr-2 h-10 bg-white'>
                    {user.user_metadata?.avatar_url ? <Avatar.Root size='32'>
                      {/* Use user avatar or fallback */}
                      <Avatar.Image
                        src={
                          user.user_metadata?.avatar_url ||
                          'https://via.placeholder.com/40'
                        } // Use actual avatar_url from metadata
                        alt={
                          user.user_metadata?.full_name ||
                          user.email ||
                          'User Avatar'
                        } // Use name or email for alt text
                      />
                    </Avatar.Root> :
                      <Avatar.Root size='32' color='yellow'>{user.user_metadata?.full_name?.charAt(0).toUpperCase()}</Avatar.Root>}
                    <span className='hidden md:inline text-sm pl-2 pr-0.5 font-medium'>Account</span>
                    <RiArrowDropDownFill className='text-icon-sub-500 hidden size-8 md:inline' />                  </button>
                </Dropdown.Trigger>
                <Dropdown.Content align='end' className='w-72'>
                  {/* User Info Section */}
                  <div className='mb-1 flex items-center gap-3 p-2'>
                    <Avatar.Root size='40'>
                      <Avatar.Image
                        src={
                          user.user_metadata?.avatar_url ||
                          'https://via.placeholder.com/40'
                        } // Use actual avatar_url from metadata
                        alt={
                          user.user_metadata?.full_name ||
                          user.email ||
                          'User Avatar'
                        } // Use name or email for alt text
                      />
                    </Avatar.Root>
                    <div className='flex-1'>
                      <div className='text-label-sm text-text-strong-950'>
                        {user.user_metadata?.full_name || user.email || 'User'}{' '}
                        {/* Display user name or email */}
                      </div>
                      <div className='mt-0.5 flex items-center gap-1'>
                        <span className='text-paragraph-xs text-text-sub-600'>
                          ID: {user.id} {/* Use actual user ID */}
                        </span>
                        <button
                          onClick={() => copy(user.id)} // Copy actual user ID
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
                  <Link href='/settings' passHref>
                    {' '}
                    {/* Link to settings page */}
                    <Dropdown.Item>
                      <Dropdown.ItemIcon as={RiSettings3Line} />
                      Account Settings
                    </Dropdown.Item>
                  </Link>

                  {/* Orders */}
                  <Link href='/orders' passHref>
                    {' '}
                    {/* Link to orders page */}
                    <Dropdown.Item>
                      <Dropdown.ItemIcon as={RiFileList2Line} />
                      Orders
                    </Dropdown.Item>
                  </Link>

                  <Divider.Root className='mx-2 my-1' />

                  {/* Support Section */}
                  <Dropdown.Label>SUPPORT</Dropdown.Label>
                  {/* TODO: Add links to help/chat pages */}
                  <Dropdown.Item>
                    <Dropdown.ItemIcon as={RiQuestionLine} />
                    Help Center
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Dropdown.ItemIcon as={RiChat1Line} />
                    Live chat
                  </Dropdown.Item>

                  <Divider.Root className='mx-2 my-1' />

                  {/* Balance Section - TODO: Fetch actual balance */}
                  <div className='flex items-center justify-between p-2'>
                    <div>
                      <div className='text-text-secondary-600 text-label-sm'>
                        Balance
                      </div>
                      <div className='text-label-md font-medium text-text-strong-950'>
                        12,000.05 {/* Example balance */}
                      </div>
                    </div>
                    <Button.Root variant='primary' mode='stroke' size='small'>
                      Top up
                    </Button.Root>
                  </div>

                  <Divider.Root className='mx-2 my-1' />

                  {/* Logout */}
                  <Dropdown.Item
                    className='text-error-base'
                    onSelect={handleLogout}
                  >
                    {' '}
                    {/* Call handleLogout on select */}
                    <Dropdown.ItemIcon as={RiLogoutBoxRLine} />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown.Root>
              {/* --- End Account Dropdown --- */}
            </>
          ) : (
            // --- Logged Out State ---
            <>
              <Link href='/auth/login' passHref>
                {' '}
                {/* Link to login page */}
                <Button.Root variant='neutral' mode='stroke' size='medium'>
                  Log In
                </Button.Root>
              </Link>
              <Link href='/auth/signup' passHref>
                {' '}
                {/* Link to sign up page */}
                <Button.Root variant='neutral' mode='filled' size='medium'>
                  Free Start {/* Or Sign Up */}
                </Button.Root>
              </Link>
            </>
            // --- End Logged Out State ---
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
