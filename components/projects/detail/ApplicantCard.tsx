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
}

interface ApplicantCardProps {
  applicant: Applicant;
  userRole: 'buyer' | 'seller';
}

const ApplicantCard: React.FC<ApplicantCardProps> = ({ applicant, userRole }) => {
  const isSeller = userRole === 'seller';
  const showReplaced = userRole === 'buyer' && applicant.hired && applicant.replacedBy;
  const showMessage = userRole === 'buyer' && !applicant.hired;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        {/* Avatar + Info */}
        <div className="flex items-center gap-3">
          <Avatar.Root size="48">
            <Avatar.Image src={applicant.avatar} alt={applicant.name} />
            <Avatar.Indicator position="bottom">
              <div className="size-3 rounded-full bg-green-500 ring-2 ring-white" />
            </Avatar.Indicator>
          </Avatar.Root>

          <div>
            {/* “Replaced by …” line (buyer + hired) */}
            {showReplaced && (
              <p className="text-xs text-gray-600 mb-1">
                Replaced by {applicant.replacedBy}
              </p>
            )}

            {/* Name + optional “Hired” pill */}
            <div className="flex items-center gap-2">
              <p className="text-label-md font-medium text-text-strong-950">
                {applicant.name}
              </p>
              {showReplaced && (
                <span className="text-xs rounded-full bg-green-100 px-2 py-0.5 font-medium text-green-600">
                  Hired
                </span>
              )}
            </div>

            {/* Rating + [time pill if buyer & not hired] */}
            <div className="mt-1 flex items-center gap-2">
              <div className="flex items-center gap-1 text-gray-600">
                <RiStarFill className="size-5 text-yellow-400" />
                <span className="text-xs">
                  {applicant.rating} ({applicant.reviews})
                </span>
              </div>
              {showMessage && (
                <span className="
                  text-xs text-gray-600
                  bg-[var(--state-faded-lighter,#F2F5F8)]
                  rounded-full px-2 py-0.5
                ">
                  {applicant.time}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action (view / message) */}
        {isSeller ? (
          <Button.Root variant="neutral" mode="stroke" size="small">
            view
          </Button.Root>
        ) : showMessage ? (
          <Button.Root variant="neutral" mode="ghost" size="small" className="p-0">
            <RiMessage3Line className="size-8 text-icon-secondary-400 hover:text-icon-primary-500" />
          </Button.Root>
        ) : null}
      </div>
    </div>
  );
};

export default ApplicantCard;
