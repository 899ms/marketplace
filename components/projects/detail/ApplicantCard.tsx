'use client';

import React from 'react';
import * as Avatar from '@/components/ui/avatar';
import { RiStarFill, RiChat3Line } from '@remixicon/react';
import * as Button from '@/components/ui/button';

// Define prop type for a single applicant
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
        <div className='flex items-center gap-3'>
          <Avatar.Root size='40'>
            <Avatar.Image src={applicant.avatar} alt={applicant.name} />
          </Avatar.Root>

          <div>
            {userRole === 'buyer' && applicant.hired && applicant.replacedBy && (
              <p className='text-xs text-text-secondary-600'>
                Replaced by {applicant.replacedBy}
              </p>
            )}

            <div className="flex items-center gap-1">
              <p className='text-label-md font-medium text-text-strong-950'>{applicant.name}</p>
              {userRole === 'buyer' && applicant.hired && (
                <span className='text-xs rounded-full bg-green-100 px-2 py-0.5 font-medium text-green-600'>
                  Hired
                </span>
              )}
            </div>

            {(!applicant.hired || isSeller) && (
              <div className='text-paragraph-sm text-text-secondary-600 flex items-center gap-1 mt-0.5'>
                <RiStarFill className='size-3.5 text-yellow-400' />
                <span>
                  {applicant.rating} ({applicant.reviews})
                </span>
                <span className='mx-1 text-text-disabled-400'>•</span>
                <span>{applicant.time}</span>
              </div>
            )}
          </div>
        </div>

        {userRole === 'buyer' && !applicant.hired && (
          <Button.Root variant="neutral" mode="ghost" size="small" className="rounded-full text-icon-secondary-400 hover:text-icon-primary-500">
            <Button.Icon><RiChat3Line /></Button.Icon>
          </Button.Root>
        )}
        {isSeller && (
          <Button.Root variant="neutral" mode="stroke" size="small">
            View
          </Button.Root>
        )}
      </div>
    </div>
  );
};

export default ApplicantCard;
