'use client';

import React from 'react';
import * as Button from '@/components/ui/button';
import * as FancyButton from '@/components/ui/fancy-button';
import { RiHeart3Line, RiLoader4Line, RiArrowRightSLine } from '@remixicon/react';
import { User } from '@/utils/supabase/types';

interface ProfileActionButtonsProps {
  targetUser: User; // The user whose profile is being viewed
  currentUser: User | null; // The logged-in user
  isLoadingChat: boolean;
  onHire: () => void; // Placeholder for hire action
  onMessage: () => void; // Action to open chat
}

export function ProfileActionButtons({
  targetUser,
  currentUser,
  isLoadingChat,
  onHire,
  onMessage,
}: ProfileActionButtonsProps) {
  const isOwnProfile = currentUser?.id === targetUser.id;

  return (
    <div className="flex items-center justify-center gap-4">
      {/* Hire Button (Previously Follow) */}
      <Button.Root
        variant="neutral"
        mode="stroke"
        size="xsmall"
        className="w-[85px] h-[32px] rounded-lg border border-stroke-soft-200 bg-bg-white-0 shadow-sm flex items-center justify-center gap-[6px] px-2"
        onClick={onHire} // Use the passed-in hire handler
        disabled={!currentUser || isOwnProfile}
        aria-label={isOwnProfile ? "Cannot hire yourself" : "Hire user"}
      >
        <span className="text-paragraph-xs">Hire</span> {/* Changed text */}
        {/* Consider changing the icon if RiHeart3Line isn't appropriate for "Hire" */}
        <Button.Icon as={RiArrowRightSLine} className="size-5" /> {/* Changed icon */}
      </Button.Root>

      {/* Touch Button */}
      <FancyButton.Root
        variant="neutral"
        size="xsmall"
        className="w-[83px] h-[32px] rounded-lg"
        onClick={onMessage} // Use the passed-in message handler
        disabled={!currentUser || isLoadingChat || isOwnProfile}
        aria-label={isOwnProfile ? "Cannot message yourself" : "Send message"}
      >
        {isLoadingChat ? (
          <RiLoader4Line className="animate-spin text-white" size={18} />
        ) : (
          <>
            <span className="text-paragraph-xs text-static-white">Touch</span>
            <FancyButton.Icon as="span">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5 text-static-white">
                <path d="M6.16689 5.26667L13.2419 2.90834C16.4169 1.85001 18.1419 3.58334 17.0919 6.75834L14.7336 13.8333C13.1502 18.5917 10.5502 18.5917 8.96689 13.8333L8.26689 11.7333L6.16689 11.0333C1.40856 9.45001 1.40856 6.85834 6.16689 5.26667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.4248 11.375L11.4081 8.38336" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </FancyButton.Icon>
          </>
        )}
      </FancyButton.Root>
    </div>
  );
} 