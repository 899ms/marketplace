'use client'; // Keep client directive if any interactivity is needed within

import React from 'react';
import * as Avatar from '@/components/ui/avatar';
import { RiStarFill, RiGoogleFill } from '@remixicon/react';

// Define prop type based on the client part of mock data
interface ClientProfileCardProps {
  client: {
    name: string;
    avatar: string;
    rating: number;
    reviews: number;
    isVerified: boolean; // Assuming this might be used later (e.g., for a verification badge)
  };
}

const ClientProfileCard: React.FC<ClientProfileCardProps> = ({ client }) => {
  return (
    <div className='border-b border-stroke-soft-200 p-6'>
      <div className='flex flex-col items-center text-center'>
        <Avatar.Root size='80'>
          <Avatar.Image src={client.avatar} alt={client.name} />
          <Avatar.Indicator position='bottom'>
            {/* Assuming online status indicator */}
            <div className='size-4 rounded-full bg-green-500 ring-2 ring-white' />
          </Avatar.Indicator>
        </Avatar.Root>

        <h2 className='text-xl mt-3 font-semibold text-text-strong-950'>
          {client.name}
        </h2>

        <div className='text-text-secondary-600 mt-1 flex items-center gap-1'>
          <RiStarFill className='size-4 text-yellow-400' />
          <span>
            {client.rating} ({client.reviews})
          </span>
        </div>

        <div className='mt-2 flex items-center'>
          {/* Placeholder icons */}
          <RiGoogleFill className='text-text-secondary-600 size-5' />
          <RiGoogleFill className='text-text-secondary-600 size-5' />
        </div>
        {/* TODO: Add verification badge if client.isVerified is true */}
      </div>
    </div>
  );
};

export default ClientProfileCard;
