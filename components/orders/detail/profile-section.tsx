"use client";

import * as React from 'react';
import * as Button from "@/components/ui/button";
import * as Avatar from "@/components/ui/avatar";
import { RiStarFill, RiGoogleFill, RiMoreLine } from '@remixicon/react';

type UserRole = 'buyer' | 'seller';

interface ProfileSectionProps {
  userRole: UserRole;
  name: string;
  rating: number;
  totalReviews: number;
  specialty?: string;
  avatarUrl?: string;
  status?: 'online' | 'offline';
}

export function ProfileSection({
  userRole,
  name,
  rating,
  totalReviews,
  specialty,
  avatarUrl,
  status = 'online',
}: ProfileSectionProps) {
  return (
    <div
      className="
        flex items-center justify-between
        p-4 bg-white rounded-lg
        border border-gray-200
      "
      style={{
        boxShadow:
          "0px 2px 4px 0px #0E121B08, " +
          "0px 6px 10px 0px #0E121B0F"
      }}
    >
      <div className="flex items-center gap-4">
        <Avatar.Root size="48" className="relative">
          <Avatar.Image
            src={avatarUrl || "https://placekitten.com/200/200"}
            alt={name}
          />
          {status === 'online' && (
            <Avatar.Indicator position="bottom">
              <Avatar.Status status="online" />
            </Avatar.Indicator>
          )}
        </Avatar.Root>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium text-text-strong-950">{name}</h2>
            <div className="flex items-center">
              <RiStarFill className="size-4 text-yellow-400" />
              <span className="text-sm text-gray-600">
                {rating}({totalReviews})
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
        <Button.Root
          variant="neutral"
          mode="stroke"
          size="medium"
          className="px-6"
        >
          Message
        </Button.Root>

        {userRole === 'buyer' && (
          <Button.Root
            variant="neutral"
            mode="filled"
            size="medium"
            className="px-6"
          >
            Rehire
          </Button.Root>
        )}

        <Button.Root
          variant="neutral"
          mode="stroke"
          size="medium"
          className="px-4"
        >
          <Button.Icon as={RiMoreLine} className="size-5" />
        </Button.Root>

      </div>
    </div>
  );
}
