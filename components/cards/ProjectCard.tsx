'use client';

import React from 'react';
import * as Badge from '@/components/ui/badge';

// TODO: Define props based on actual project data
interface ProjectCardProps {
  // Define props like title, description, tags, budget, provider info etc.
}

const ProjectCard: React.FC<ProjectCardProps> = (props) => {
  // Mock structure based on the removed code from services/page.tsx
  return (
    <div className='shadow-sm hover:shadow-md overflow-hidden rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4 transition-all'>
      <h3 className='mb-2 line-clamp-2 text-paragraph-md font-medium text-text-strong-950'>
        Placeholder Project Title
      </h3>
      <div className='mb-3 flex flex-wrap gap-1'>
        <Badge.Root variant='light' size='small'>
          Tag 1
        </Badge.Root>
        <Badge.Root variant='light' size='small'>
          Tag 2
        </Badge.Root>
      </div>
      <p className='text-text-secondary-600 text-sm mb-4 line-clamp-2'>
        Placeholder project description...
      </p>
      <div className='mb-3 flex flex-wrap gap-1.5'>
        <Badge.Root variant='stroke' size='small'>
          Info 1
        </Badge.Root>
        <Badge.Root variant='stroke' size='small'>
          Info 2
        </Badge.Root>
      </div>
      <div className='flex items-center justify-between'>
        <span className='text-xs text-text-secondary-600'>Provider Info</span>
        <span className='text-sm font-medium text-text-strong-950'>$XXX</span>
      </div>
    </div>
  );
};

export default ProjectCard;
