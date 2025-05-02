import React from 'react';
import * as Avatar from '@/components/ui/avatar';
import * as Button from '@/components/ui/button';
import { RiStarFill, RiHeartLine } from '@remixicon/react';
import { ReviewItemData } from './types';

interface ReviewItemProps {
  review: ReviewItemData;
}

export function ReviewItem({ review }: ReviewItemProps) {
  return (
    <div className="border-stroke-soft-200 py-4">
      {/* Top row: avatar + name on left, price + like on right */}
      <div className="flex items-start justify-between mb-3">
        {/* left */}
        <div className="flex items-start gap-3">
          <Avatar.Root size="48">
            <Avatar.Image src={review.reviewerAvatar} alt={review.reviewer} />
          </Avatar.Root>
          <div className="flex flex-col">
            <p className="text-text-secondary-600 text-label-sm font-medium">
              {review.reviewer}
            </p>
            <div className="flex items-center gap-2 text-paragraph-xs text-gray-600">
              <div className="flex items-center gap-0.5">
                <RiStarFill className="size-3.5 text-yellow-400" />
                <span>{review.rating}</span>
              </div>
              <span>{review.date}</span>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col items-end">
          <span className="text-label-lg font-medium text-text-strong-950">
            ${review.price.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Bottom row: title + description */}
      <div>
        <h3 className="mb-1 text-paragraph-lg font-medium text-text-strong-950">
          {review.contractTitle}
        </h3>
        <p className="text-gray-600 line-clamp-2 text-paragraph-sm">
          {review.content}
        </p>
      </div>
    </div>
  );
}
