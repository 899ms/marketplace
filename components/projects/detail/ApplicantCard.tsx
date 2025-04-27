'use client';

import React from 'react';
import * as Avatar from '@/components/ui/avatar';
import { RiStarFill, RiChat3Line } from '@remixicon/react';

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
}

const ApplicantCard: React.FC<ApplicantCardProps> = ({ applicant }) => {
  return (
    <div className='p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Avatar.Root size='40'>
            <Avatar.Image src={applicant.avatar} alt={applicant.name} />
          </Avatar.Root>

          <div>
            <p className='font-medium text-text-strong-950'>{applicant.name}</p>
            {applicant.hired && applicant.replacedBy && (
              <p className='text-xs text-text-secondary-600'>
                Replaced by {applicant.replacedBy}
              </p>
            )}
            {!applicant.hired && (
              <div className='text-xs text-text-secondary-600 flex items-center gap-1'>
                <RiStarFill className='size-3 text-yellow-400' />
                <span>
                  {applicant.rating} ({applicant.reviews})
                </span>
                <span className='mx-1'>•</span>
                <span>{applicant.time}</span>
              </div>
            )}
          </div>
        </div>

        {applicant.hired ? (
          <span className='text-xs rounded-full bg-green-100 px-2 py-0.5 font-medium text-green-600'>
            Hired
          </span>
        ) : (
          <button className='text-icon-secondary-400 hover:text-icon-primary-500'>
            <RiChat3Line className='size-5' />
          </button>
        )}
      </div>
    </div>
  );
};

export default ApplicantCard;
