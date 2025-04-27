'use client';

import React from 'react';
import * as Badge from '@/components/ui/badge';

interface ProjectHeaderProps {
  title: string;
  category: string;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ title, category }) => {
  return (
    <div className='border-b border-stroke-soft-200 p-6'>
      <div className='flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between'>
        <h1 className='text-2xl font-semibold text-text-strong-950'>{title}</h1>
        <Badge.Root
          variant='stroke'
          size='small'
          className='text-text-secondary-600 shrink-0'
        >
          {category}
        </Badge.Root>
      </div>
    </div>
  );
};

export default ProjectHeader;
