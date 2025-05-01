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

  return (
    <div className='p-4'>
      <div className='flex items-center justify-between'>
        {/* Avatar + Info */}
        <div className='flex items-center gap-3'>
          <Avatar.Root size='48'>
            <Avatar.Image src={applicant.avatar} alt={applicant.name} />
            <Avatar.Indicator position='bottom'>
              <div className='size-3 rounded-full bg-green-500 ring-2 ring-white' />
            </Avatar.Indicator>
          </Avatar.Root>

          <div>
            {userRole === 'buyer' && applicant.hired && applicant.replacedBy && (
              <p className='text-xs text-gray-600'>
                Replaced by {applicant.replacedBy}
              </p>
            )}

            <div className='flex items-center gap-1'>
              <p className='text-label-md font-medium text-text-strong-950'>
                {applicant.name}
              </p>
              {userRole === 'buyer' && applicant.hired && (
                <span className='text-xs rounded-full bg-green-100 px-2 py-0.5 font-medium text-green-600'>
                  Hired
                </span>
              )}
            </div>

            {(!applicant.hired || isSeller) && (
              <div className='mt-1 flex items-center gap-2'>
                <div className='flex items-center gap-1 text-gray-600'>
                  <RiStarFill className='size-3 text-yellow-400' />
                  <span className='text-xs'>
                    {applicant.rating} ({applicant.reviews})
                  </span>
                </div>
                <span className="
                  text-xs text-gray-600
                  bg-[var(--state-faded-lighter,#F2F5F8)]
                  rounded-full px-2 py-0.5
                ">
                  {applicant.time}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Larger, borderless message icon */}
        <Button.Root
          variant="neutral"
          mode="ghost"
          size="medium"
          className="p-0"
        >
          <RiMessage3Line className="text-icon-secondary-400 text-2xl hover:text-icon-primary-500" />
        </Button.Root>
      </div>
    </div>
  );
};

export default ApplicantCard;
