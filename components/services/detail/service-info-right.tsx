'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Service, Chat, Message, User } from '@/utils/supabase/types'; // Import Chat, Message, User
import { useAuth } from '@/utils/supabase/AuthContext'; // Added useAuth
import { chatOperations, userOperations } from '@/utils/supabase/database'; // Added chatOperations, userOperations
import * as Avatar from '@/components/ui/avatar';
import * as Button from '@/components/ui/button';
import * as Tag from '@/components/ui/tag'; // Import Tag
import { notification as toast } from '@/hooks/use-notification'; // Added import for toast
import ChatPopupWrapper from '@/components/chat/chat-popup-wrapper'; // Added ChatPopupWrapper
import {
  RiStarFill,
  RiHeartLine,
  RiSendPlaneLine,
  RiArrowRightSLine,
  RiGoogleFill,
  RiTwitchFill,
  RiTwitterXFill,
  RiMoneyCnyCircleLine,
  RiGroupLine,
  RiCalendarLine,
  RiLoader4Line // Added loader icon
} from '@remixicon/react';

// Remove the old specific data interfaces
/*
interface ServiceProviderInfo { ... }
interface ServiceInfoRightData { ... }
*/

interface ServiceInfoRightProps {
  service: Service; // Use the full Service type
}

// Define dummy tools data
const dummyTools = ['Adobe Audition', 'Pro Tools', 'Logic Pro X', 'FL Studio'];

export function ServiceInfoRight({ service }: ServiceInfoRightProps) {
  const { user: currentUser } = useAuth(); // Get current user
  const [sellerProfile, setSellerProfile] = useState<User | null>(null); // State for seller profile
  const [currentUserProfile, setCurrentUserProfile] = useState<User | null>(null); // State for current user profile
  const [activeChat, setActiveChat] = useState<Chat | null>(null); // State for active chat
  const [activeChatMessages, setActiveChatMessages] = useState<Message[]>([]); // State for messages
  const [isLoadingChat, setIsLoadingChat] = useState(false); // State for loading chat
  const [isLoadingMessages, setIsLoadingMessages] = useState(false); // Separate loading state for messages
  const [chatError, setChatError] = useState<string | null>(null); // State for chat errors

  // Fetch profiles
  useEffect(() => {
    const fetchProfiles = async () => {
      if (service.seller_id) {
        const profile = await userOperations.getUserById(service.seller_id);
        setSellerProfile(profile);
      }
      if (currentUser?.id) {
        const profile = await userOperations.getUserById(currentUser.id);
        setCurrentUserProfile(profile);
      }
    };
    fetchProfiles();
  }, [service.seller_id, currentUser]);

  // Keep social icon helper if needed, otherwise remove
  // const getSocialIcon = (platform: string) => { ... };

  // Helper to format currency (basic example)
  const formatCurrency = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', { // Adjust locale as needed
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0, // Adjust as needed
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // --- Hire Button Handler --- 
  const handleHireClick = () => {
    // TODO: Implement actual hiring logic later
    toast({
      title: "Hire Request Sent! (Dummy)",
      description: `Successfully initiated hiring process for service: ${service.title} (ID: ${service.id}). You will be redirected soon.`, // Added dummy data
      status: "success",
      variant: "filled"
    });
    // Optionally, redirect after a short delay or after actual API call succeeds
    // setTimeout(() => { window.location.href = `/orders/create?serviceId=${service.id}`; }, 2000);
  };
  // --- End Hire Button Handler ---

  // --- Message Button Handlers --- 
  const handleOpenChat = async () => {
    if (!currentUser || !sellerProfile) {
      setChatError('Could not load user profiles. Please try again later.');
      console.error('Cannot open chat: Missing current user or seller profile.');
      return;
    }
    if (currentUser.id === sellerProfile.id) {
      setChatError("You cannot start a chat with yourself.");
      return;
    }

    setIsLoadingChat(true);
    setChatError(null);
    setActiveChat(null);
    setActiveChatMessages([]);

    try {
      const chat = await chatOperations.findOrCreateChat(currentUser.id, sellerProfile.id);
      if (chat) {
        setActiveChat(chat);
        setIsLoadingMessages(true);
        const messages = await chatOperations.getChatMessages(chat.id);
        setActiveChatMessages(messages);
      } else {
        setChatError('Failed to find or create chat conversation.');
      }
    } catch (error: any) {
      console.error('Error opening chat:', error);
      setChatError(error.message || 'An unexpected error occurred.');
    } finally {
      setIsLoadingChat(false);
      setIsLoadingMessages(false);
    }
  };

  const handleCloseChat = () => {
    setActiveChat(null);
    setActiveChatMessages([]);
    setChatError(null);
  };
  // --- End Message Button Handlers ---

  return (
    <div className='sticky top-20'>
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5'>
        {/* Provider Info - Use service.seller_name, seller_avatar_url */}
        <div className="relative mb-4">
          <div className="flex flex-col items-center text-center">
            <Avatar.Root size="56">
              <Avatar.Image
                src={service.seller_avatar_url || 'https://via.placeholder.com/56'}
                alt={service.seller_name || 'Seller'}
              />
              {/* online-status dot */}
              <Avatar.Indicator position="bottom">
                <div className="size-3 rounded-full bg-green-500 ring-2 ring-white" />
              </Avatar.Indicator>
            </Avatar.Root>

            {/* heart icon top-right */}
            <button className="absolute top-0 right-0 p-1 text-icon-secondary-400 hover:text-icon-primary-500">
              <RiHeartLine className="size-5" />
            </button>

            <div className="mt-2">
              <Link href={`/workers/${service.seller_id}`} passHref>
                <h2 className="text-label-md font-medium text-text-strong-950 hover:underline">
                  {service.seller_name || 'Unknown Seller'}
                </h2>
              </Link>

              {/* rating (no "reviews" text) */}
              <div className="mt-1 flex items-center justify-center gap-1 text-text-secondary-600 text-paragraph-xs">
                <RiStarFill className="size-3.5 text-yellow-400" />
                <span className="text-gray-600" >4.9 (125)</span>
              </div>

              {/* two Google icons + "Google" twice */}
              <div className="mt-1 flex items-center justify-center gap-1 text-text-secondary-600 text-paragraph-xs">
                <RiGoogleFill className="size-3.5" />
                <span>Google</span>
                <RiGoogleFill className="size-3.5" />
                <span>Google</span>
              </div>
            </div>
          </div>
        </div>


        <div className='mb-4 h-px w-full bg-stroke-soft-200'></div>

        {/* Pricing, Delivery & Proposals */}
        <div className='mb-4 space-y-3'>
          <div className='flex items-center justify-between'>
            <div className='text-text-secondary-600 flex items-center gap-2'>
              <RiMoneyCnyCircleLine className='size-4' />
              <span className='text-paragraph-sm'>Price</span>
            </div>
            <span className='text-[24px] text-text-strong-950'>
              {formatCurrency(service.price, service.currency || 'USD')}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='text-text-secondary-600 flex items-center gap-2'>
              <RiGroupLine className='size-4' />
              <span className='text-paragraph-sm'>Sold</span>
            </div>
            <span className='font-medium text-text-strong-950'>
              5
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='text-text-secondary-600 flex items-center gap-2'>
              <RiCalendarLine className='size-4' />
              <span className='text-paragraph-sm'>Deadline</span>
            </div>
            <span className='font-medium text-text-strong-950'>
              05.25.2025
            </span>
          </div>
        </div>

        {/* Action Buttons - Update links/actions */}
        <div className='mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2'>
          {/* Message Button - Changed to use onClick */}
          <Button.Root
            variant='neutral'
            mode='stroke'
            size='small'
            onClick={handleOpenChat}
            disabled={!currentUser || isLoadingChat || !sellerProfile} // Disable conditions
            aria-label={currentUser?.id === service.seller_id ? "Cannot message yourself" : "Send message to seller"}
          >
            {isLoadingChat ? (
              <>
                <RiLoader4Line className="animate-spin mr-2" size={16} />
                Opening...
              </>
            ) : (
              <>
                Message
                <Button.Icon as={RiSendPlaneLine} />
              </>
            )}
          </Button.Root>
          {/* Hire Button */}
          <Button.Root
            variant='neutral'
            mode='stroke'
            size='small'
            onClick={handleHireClick}
          >
            Hire
            <Button.Icon as={RiArrowRightSLine} />
          </Button.Root>
        </div>

        {/* Display Chat Error if exists */}
        {chatError && (
          <p className="text-xs text-red-600 mb-4 text-center">Error: {chatError}</p>
        )}

        {/* About Seller Section */}
        {service.seller_bio && (
          <div className="mb-4">
            <h3 className="mb-2 text-label-md font-medium text-text-strong-950">
              About
            </h3>
            <p className="text-text-secondary-600 line-clamp-3 text-paragraph-xs">
              {service.seller_bio}
            </p>
            {/* social icons: Twitch, Twitter, Google */}
            <div className="mt-4 flex items-center gap-3">
              <RiTwitchFill className="size-5 text-icon-secondary-400 hover:text-icon-primary-500" />
              <RiTwitterXFill className="size-5 text-icon-secondary-400 hover:text-icon-primary-500" />
              <RiGoogleFill className="size-5 text-icon-secondary-400 hover:text-icon-primary-500" />
            </div>
          </div>
        )}


        <div className='mb-4 h-px w-full bg-stroke-soft-200'></div>

        {/* Tags Section - Use service.tags and Tag component */}
        {service.tags && service.tags.length > 0 && (
          <div className='mb-4'>
            <h3 className='mb-2 text-label-md font-medium text-text-strong-950'>
              Skills
            </h3>
            <div className='flex flex-wrap gap-1.5'>
              {service.tags.map((tag, index) => (
                <Tag.Root key={index}>
                  {tag}
                </Tag.Root>
              ))}
            </div>
          </div>
        )}

        {/* Tools Section (Dummy Data) - Use Tag component */}
        <div>
          <h3 className='mb-2 text-label-md font-medium text-text-strong-950'>
            Tools
          </h3>
          <div className='flex flex-wrap gap-1.5'>
            {dummyTools.map((tool, index) => (
              <Tag.Root key={index}>
                {tool}
              </Tag.Root>
            ))}
          </div>
        </div>

      </div>

      {/* Conditionally render Chat Popup */}
      {activeChat && currentUserProfile && sellerProfile && currentUser && (
        <ChatPopupWrapper
          key={activeChat.id} // Important for re-rendering if chat changes
          chat={activeChat}
          initialMessages={activeChatMessages}
          currentUserProfile={currentUserProfile}
          otherUserProfile={sellerProfile} // Pass fetched seller profile
          currentUserId={currentUser.id} // Safe now due to check above
          isLoadingMessages={isLoadingMessages} // Pass message loading state
          onClose={handleCloseChat}
          position="bottom-right" // Or configure as needed
        />
      )}
    </div>
  );
}
