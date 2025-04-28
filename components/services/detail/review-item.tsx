'use client';

import React from 'react';
import * as Avatar from '@/components/ui/avatar';

import { RiStarFill } from '@remixicon/react';
import { Review } from './types'; // Import type

interface ReviewItemProps {
  review: Review;
}

export function ReviewItem({ review }: ReviewItemProps) {
  return (
    <div className='py-5'>
      {' '}
      {/* Removed border from item, handled by divider in parent */}
      {/* Top Section: Reviewer Info, Rating, Date */}
      <div className='mb-3 flex items-start justify-between'>
        <div className='flex items-center gap-3'>
          <Avatar.Root size='40'>
            <Avatar.Image src={review.user.avatar} alt={review.user.name} />
            {/* Add status indicator if available */}
          </Avatar.Root>
          <div>
            <p className='text-label-md font-medium text-text-strong-950'>
              {review.user.name}
            </p>
            <div className='text-text-secondary-600 flex items-center gap-2 text-paragraph-xs'>
              <div className='flex items-center gap-0.5'>
                <RiStarFill className='size-3.5 text-yellow-400' />
                <span>{review.user.rating}</span>
              </div>
              <span>{review.date}</span>
            </div>
          </div>
        </div>
        {/* Price/Amount */}
        <span className='text-label-md font-medium text-text-strong-950'>
          ${review.amount.toFixed(2)}
        </span>
      </div>
      {/* Middle Section: Content */}
      <div className='mb-3'>
        <p className='text-text-secondary-600 line-clamp-3 text-paragraph-sm'>
          {/* TODO: Add expand/collapse functionality for long reviews */}
          {review.text}
        </p>
        {/* Optional: Add Show More button here */}
      </div>
      {/* Bottom Section: Actions (e.g., Like Button) */}
      {/*
      <div className='flex items-center justify-end'>
        <Button.Root variant='neutral' mode='ghost' size='small'>
          <Button.Icon as={RiHeartLine} />
          Like
        </Button.Root>
      </div>
      */}
    </div>
  );
}
