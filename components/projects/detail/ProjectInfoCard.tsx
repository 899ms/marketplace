'use client';

import React from 'react';
import { RiTimeLine, RiCalendarLine, RiFileListLine } from '@remixicon/react';

// Define prop type based on relevant parts of mock data
interface ProjectInfoCardProps {
  budget: string;
  releaseTime: string;
  deadline: string;
  proposals: number;
}

const ProjectInfoCard: React.FC<ProjectInfoCardProps> = ({
  budget,
  releaseTime,
  deadline,
  proposals,
}) => {
  return (
    <div className='divide-y divide-stroke-soft-200'>
      {/* Budget Section */}
      <div className='flex justify-between p-4'>
        <span className='text-text-secondary-600 font-medium'>Budget</span>
        <span className='font-semibold text-text-strong-950'>{budget}</span>
      </div>

      {/* Release Time Section */}
      <div className='p-4'>
        <div className='flex items-center gap-2'>
          <RiTimeLine className='text-icon-secondary-400 size-5' />
          <div>
            <span className='text-sm block font-medium text-text-strong-950'>
              Release time
            </span>
            <span className='text-xs text-text-secondary-600'>
              {releaseTime}
            </span>
          </div>
        </div>
      </div>

      {/* Deadline Section */}
      <div className='p-4'>
        <div className='flex items-center gap-2'>
          <RiCalendarLine className='text-icon-secondary-400 size-5' />
          <div>
            <span className='text-sm block font-medium text-text-strong-950'>
              Deadline
            </span>
            <span className='text-xs text-text-secondary-600'>{deadline}</span>
          </div>
        </div>
      </div>

      {/* Proposals Section */}
      <div className='p-4'>
        <div className='flex items-center gap-2'>
          <RiFileListLine className='text-icon-secondary-400 size-5' />
          <div>
            <span className='text-sm block font-medium text-text-strong-950'>
              Proposals
            </span>
            <span className='text-xs text-text-secondary-600'>{proposals}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfoCard;
