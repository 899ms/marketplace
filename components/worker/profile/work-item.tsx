'use client';

import React from 'react';
import * as Badge from '@/components/ui/badge';
import { RiPlayLine, RiBookmarkLine } from '@remixicon/react';
import { WorkItemData } from './types'; // adjust import path as needed

interface WorkItemProps {
  item: WorkItemData;
}

export function WorkItem({ item }: WorkItemProps) {
  return (
    <div className="flex items-center justify-between border-b border-stroke-soft-200 py-4 last:border-b-0">
      {/* 1. Play + Info */}
      <div className="flex items-center gap-3">
        <button className="bg-bg-subtle-100 hover:bg-bg-subtle-200 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors">
          <RiPlayLine className="size-5 text-text-strong-950" />
        </button>
        <div>
          <p className="font-medium text-text-strong-950">{item.title}</p>
          <p className="text-xs text-text-secondary-600">{item.description}</p>
        </div>
      </div>

      {/* 2. Tags (middle split) */}
      <div className="hidden md:flex flex-wrap gap-1.5">
        {item.genres.slice(0, 3).map((genre, idx) => (
          <Badge.Root
            key={idx}
            variant="light"
            size="medium"
            className="bg-[var(--bg-weak-100,#F6F8FA)] rounded-md border border-stroke-soft-300 text-gray-600 px-2 py-0.5"
          >
            {genre}
          </Badge.Root>
        ))}
      </div>

      {/* 3. Duration/BPM + Bookmark */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-paragraph-sm text-gray-600">{item.duration}</p>
          <p className="text-xs text-gray-600">{item.bpm}</p>
        </div>
        <button className="text-icon-secondary-400 hover:text-icon-primary-500 shrink-0">
          <RiBookmarkLine className="size-5" />
        </button>
      </div>
    </div>
  );
}
