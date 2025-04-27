import React from 'react';
import { RiStarFill, RiGoogleFill } from '@remixicon/react';

// --- Service Card Component ---
const ServiceCard = () => {
  // TODO: Accept props for dynamic data
  return (
    <div className='shadow-sm overflow-hidden rounded-lg border border-stroke-soft-200 bg-bg-white-0'>
      <div className='h-40 w-full bg-gradient-to-br from-blue-400 to-purple-500'></div>
      <div className='p-3'>
        <p className='mb-2 line-clamp-2 text-paragraph-sm font-medium text-text-strong-950'>
          Draw catchy and eye-catching illustrations anime
        </p>
        <div className='text-text-secondary-600 mb-2 flex items-center gap-1 text-paragraph-xs'>
          <div className='size-4 rounded-full bg-gray-300'></div>{' '}
          {/* Placeholder Avatar */}
          <span>Cleve Music</span> {/* Placeholder Name */}
          {/* Placeholder Icons */}
          <RiGoogleFill className='ml-1 size-3' />
          <RiGoogleFill className='size-3' />
          <RiGoogleFill className='size-3' />
        </div>
        <div className='flex items-center justify-between text-paragraph-sm'>
          <div className='text-text-secondary-600 flex items-center gap-0.5'>
            <RiStarFill className='size-3.5 text-yellow-400' />
            <span>4.9 (125)</span> {/* Placeholder Rating */}
          </div>
          <span className='font-medium text-text-strong-950'>$101</span>{' '}
          {/* Placeholder Price */}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
