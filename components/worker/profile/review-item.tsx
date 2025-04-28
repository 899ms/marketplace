'use client';

import React from 'react';
import * as Avatar from '@/components/ui/avatar';
import * as Button from '@/components/ui/button';
import { RiStarFill, RiHeartLine } from '@remixicon/react';
import { ReviewItemData } from './types'; // Import type from the same directory

// Review Item Component
interface ReviewItemProps {
  review: ReviewItemData;
}

export function ReviewItem({ review }: ReviewItemProps) {
  return (
    <div className='border-b border-stroke-soft-200 py-5 last:border-b-0'>
      {/* Top Section: Reviewer Info, Rating, Date */}
      <div className='mb-3 flex items-start justify-between'>
        <div className='flex items-center gap-3'>
          <Avatar.Root size='32'>
            <Avatar.Image src={review.reviewerAvatar} alt={review.reviewer} />
            {/* Add status indicator if available */}
          </Avatar.Root>
          <div>
            <p className='text-label-md font-medium text-text-strong-950'>
              {review.reviewer}
            </p>
            <div className='text-text-secondary-600 flex items-center gap-2 text-paragraph-xs'>
              <div className='flex items-center gap-0.5'>
                <RiStarFill className='size-3.5 text-yellow-400' />
                <span>{review.rating}</span>
              </div>
              <span>{review.date}</span>
            </div>
          </div>
        </div>
        {/* Optional: Add action button like report/reply */}
      </div>

      {/* Middle Section: Contract Title and Content */}
      <div className='mb-3'>
        <p className='mb-1 text-paragraph-sm font-medium text-text-strong-950'>
          {review.contractTitle}
        </p>
        <p className='text-text-secondary-600 line-clamp-3 text-paragraph-sm'>
          {/* TODO: Add expand/collapse functionality for long reviews */}
          {review.content}
        </p>
      </div>

      {/* Bottom Section: Price and Like Button */}
      <div className='flex items-center justify-between'>
        <span className='text-label-md font-medium text-text-strong-950'>
          ${review.price}
        </span>
        <Button.Root variant='neutral' mode='ghost' size='small'>
          <Button.Icon as={RiHeartLine} />
          Like
        </Button.Root>
      </div>
    </div>
  );
}
