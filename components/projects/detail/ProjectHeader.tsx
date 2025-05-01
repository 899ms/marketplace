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
      <div className='flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between'>
        <h1 className='text-heading-md font-semibold text-text-strong-950'>{title}</h1>
        <div className="flex items-center gap-2">
          <Badge.Root
            variant='stroke'
            size='medium'
            className='text-text-secondary-600 shrink-0'
            color="gray"
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
