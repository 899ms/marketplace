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
    <div className='border-b border-stroke-soft-200 p-6'>
      <div className='flex flex-col items-start gap-2 sm:flex-row sm:items-center'>
        <h1 className='font-medium text-[24px] leading-[32px] tracking-normal text-text-strong-950'>{title}</h1>
        <div className="flex items-center gap-2">
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
          {showBookmark && (
            <Button.Root variant="neutral" mode="ghost" size="small" className="text-icon-secondary-400 hover:text-icon-primary-500">
              <Button.Icon><RiBookmarkLine /></Button.Icon>
            </Button.Root>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
