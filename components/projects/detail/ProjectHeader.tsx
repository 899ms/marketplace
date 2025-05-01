'use client';

import React from 'react';
import * as Badge from '@/components/ui/badge';
import { RiBookmarkLine } from '@remixicon/react';
import * as Button from '@/components/ui/button';

interface ProjectHeaderProps {
  title: string;
  category: string;
  showBookmark?: boolean;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ title, category, showBookmark }) => {
  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        {/* Left side: title + category */}
        <div className='flex items-center gap-2'>
          <h1 className='font-medium text-[24px] leading-[32px] tracking-normal text-text-strong-950'>
            {title}
          </h1>
          <Badge.Root
            variant="light"
            size="small"
            color="gray"
            className="
              shrink-0
              w-[81px] h-[20px]
              px-4 py-1
              gap-[2px]
              rounded-full
              bg-neutral-100 border border-neutral-200
              flex items-center justify-center
              text-text-secondary-600
            "
          >
            {category}
          </Badge.Root>
        </div>

        {/* Right side: bookmark */}
        {showBookmark && (
          <Button.Root
            variant="neutral"
            mode="ghost"
            size="small"
            className="text-icon-secondary-400 hover:text-icon-primary-500"
          >
            <Button.Icon>
              <RiBookmarkLine />
            </Button.Icon>
          </Button.Root>
        )}
      </div>

      {/* underline */}
      <div className="w-[99%] h-[2px] bg-stroke-soft-200 mx-auto mt-8" />
    </div>
  );
};

export default ProjectHeader;
