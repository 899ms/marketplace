"use client";

import * as React from 'react';
import * as Button from "@/components/ui/button";
import * as Avatar from "@/components/ui/avatar";
import { RiStarFill, RiGoogleFill, RiMoreLine } from '@remixicon/react';

// Import UserRole type (assuming it's defined elsewhere or define here)
type UserRole = 'buyer' | 'seller';

interface ProfileSectionProps {
  userRole: UserRole; // Add userRole prop
  name: string;
  rating: number;
  totalReviews: number;
  specialty?: string;
  avatarUrl?: string;
  status?: 'online' | 'offline'; // Assuming status is needed for the green dot
}

export function ProfileSection({
  userRole, // Destructure userRole
  name,
  rating,
  totalReviews,
  specialty,
  avatarUrl,
  status = 'online', // Default to online for the green dot
}: ProfileSectionProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm h-[112px] mx-auto my-4">
      <div className="flex items-center gap-4">
        <Avatar.Root size="48" className="relative">
          <Avatar.Image
            src={avatarUrl || "https://placekitten.com/200/200"}
            alt={name}
          />
          {/* Add green dot for online status */}
          {status === 'online' && (
            <Avatar.Indicator position="bottom">
              <Avatar.Status status="online" />
            </Avatar.Indicator>
          )}
        </Avatar.Root>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium text-text-strong-950">{name}</h2>
            <div className="flex items-center gap-1">
              <RiStarFill className='size-4 text-yellow-400' />
              <span className="text-sm font-medium text-text-sub-600">
                {rating} ({totalReviews})
              </span>
            </div>
          </div>
          {specialty && (
            <div className="flex items-center gap-1 mt-1">
              <RiGoogleFill className="size-4 text-gray-500" />
              <p className="text-sm text-text-secondary-600">{specialty}</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button.Root variant="neutral" mode="stroke" size="medium">Message</Button.Root>
        {/* Conditionally render Rehire button only for buyers */}
        {userRole === 'buyer' && (
          <Button.Root variant="neutral" mode="filled" size="medium">Rehire</Button.Root>
        )}
        <Button.Root variant="neutral" mode="stroke" size="medium" className="p-2">
          <Button.Icon as={RiMoreLine} className="size-5" />
        </Button.Root>
      </div>
    </div>
  );
} 