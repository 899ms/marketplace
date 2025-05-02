'use client';

import React from 'react';
import * as Avatar from '@/components/ui/avatar';
import { RiStarFill, RiMessage3Line } from '@remixicon/react';
import * as Button from '@/components/ui/button';

export interface Applicant {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  time: string;
  hired?: boolean;
  replacedBy?: string;
  unreadMessages?: number;
}

interface ApplicantCardProps {
  applicant: Applicant;
  userRole: 'buyer' | 'seller';
}

const ApplicantCard: React.FC<ApplicantCardProps> = ({ applicant, userRole }) => {
  const isSeller = userRole === 'seller';
  const showReplaced = userRole === 'buyer' && applicant.hired && applicant.replacedBy;
  const showMessage = userRole === 'buyer' && !applicant.hired;
  const unread = applicant.unreadMessages ?? 0;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        {/* Avatar + Info */}
        <div className="flex items-start gap-3">
          <Avatar.Root size="40">
            <Avatar.Image src={applicant.avatar} alt={applicant.name} />
            <Avatar.Indicator position="bottom">
              <div className="size-3 rounded-full bg-green-500 ring-2 ring-white" />
            </Avatar.Indicator>
          </Avatar.Root>

          <div className="flex-1">
            {/* Name */}
            <p className="text-[14px] font-medium text-text-strong-950">
              {applicant.name}
            </p>

            {/* “Replaced by …” for hired buyers */}
            {showReplaced && (
              <p className="text-[12px] text-gray-600">
                Replaced by {applicant.replacedBy}
              </p>
            )}

            {/* Rating + time pill for non-hired buyers */}
            {!showReplaced && (
              <div className="flex items-center gap-2">
                <RiStarFill className="size-5 text-yellow-400" />
                <span className="text-[12px] text-gray-600">
                  {applicant.rating}({applicant.reviews})
                </span>
                {showMessage && (
                  <span className="text-[12px] text-gray-600 bg-[var(--state-faded-lighter,#F2F5F8)] rounded-full px-2 py-0.5">
                    {applicant.time}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right-side action */}
        {showReplaced ? (
          <span className="text-[12px] rounded-full bg-green-100 px-3 py-1 font-medium text-green-600">
            Hired
          </span>
        ) : isSeller ? (
          <Button.Root variant="neutral" mode="stroke" size="small">
            view
          </Button.Root>
        ) : showMessage ? (
          <Button.Root
            variant="neutral"
            mode="ghost"
            size="small"
            className="p-0 relative"
          >
            <RiMessage3Line className="size-8 text-icon-secondary-400 hover:text-icon-primary-500" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-medium text-white">
                {unread}
              </span>
            )}
          </Button.Root>
        ) : null}
      </div>
      {applicant.hired && userRole === 'buyer' && (
        /* 95% width separator */
        <div className="w-[95%] mx-auto mt-[16px] h-px bg-stroke-soft-200" />
      )}
    </div>
  );
};

export default ApplicantCard;
