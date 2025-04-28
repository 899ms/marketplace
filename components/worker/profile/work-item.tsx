'use client';

import React from 'react';
import * as Badge from '@/components/ui/badge';
import { RiPlayLine, RiBookmarkLine } from '@remixicon/react';
import { WorkItemData } from './types'; // Import type from the same directory

// Work Item Component
interface WorkItemProps {
  item: WorkItemData;
}

export function WorkItem({ item }: WorkItemProps) {
  return (
    <div className='flex items-center justify-between gap-4 border-b border-stroke-soft-200 py-4 last:border-b-0'>
      {/* Left Side: Play Button and Info */}
      <div className='flex items-center gap-3'>
        <button className='bg-bg-subtle-100 hover:bg-bg-subtle-200 flex size-10 shrink-0 items-center justify-center rounded-full transition-colors'>
          <RiPlayLine className='size-5 text-text-strong-950' />
        </button>
        <div>
          <p className='font-medium text-text-strong-950'>{item.title}</p>
          <p className='text-xs text-text-secondary-600'>{item.description}</p>
        </div>
      </div>

      {/* Right Side: Genres, Duration/BPM, Bookmark */}
      <div className='flex items-center gap-3'>
        {/* Genres (Hidden on smaller screens) */}
        <div className='hidden shrink-0 gap-1 md:flex'>
          {item.genres.slice(0, 3).map((genre: string, idx: number) => (
            <Badge.Root key={idx} variant='light' size='small'>
              {genre}
            </Badge.Root>
          ))}
        </div>
        {/* Duration and BPM */}
        <div className='shrink-0 text-right'>
          <p className='text-paragraph-sm text-text-strong-950'>
            {item.duration}
          </p>
          <p className='text-xs text-text-secondary-600'>{item.bpm}</p>
        </div>
        {/* Bookmark Button */}
        <button className='text-icon-secondary-400 hover:text-icon-primary-500 shrink-0'>
          <RiBookmarkLine className='size-5' />
        </button>
      </div>
    </div>
  );
}
