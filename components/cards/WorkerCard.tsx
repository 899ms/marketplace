import React from 'react';
import * as Avatar from '@/components/ui/avatar';
import * as Badge from '@/components/ui/badge';
import * as Tag from '@/components/ui/tag';

import {
  RiStarFill,
  RiBriefcaseLine,
  RiMoneyDollarCircleLine,
  RiSparklingLine,
} from '@remixicon/react';
import * as Divider from '@/components/ui/divider';


// --- Worker Card Component ---

// Add onClick prop
interface WorkerCardProps {
  onClick?: () => void;
  // Add other props if needed later for data
}

const WorkerCard: React.FC<WorkerCardProps> = ({ onClick }) => {
  // TODO: Accept props for dynamic data
  return (
    <div
      className='shadow-sm hover:shadow-md overflow-hidden rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4 transition-all' // Added hover:shadow-md, transition-all
      onClick={onClick} // Apply onClick handler
      style={{ cursor: onClick ? 'pointer' : 'default' }} // Add cursor pointer if clickable
    >
      <div className='mb-2 flex items-start justify-between'>
        <div className='flex items-center gap-2'>
          <Avatar.Root size='48'>
            <Avatar.Image
              src='https://via.placeholder.com/40' // Placeholder
              alt='Worker Avatar'
            />
          </Avatar.Root>
          <div className='flex flex-col gap-1'>
            <div className='flex flex-row gap-2 items-center'>
              <div className='text-[14px] font-medium text-surface-800'>
                Cleve Music {/* Placeholder Name */}
              </div>
              <div className='text-text-secondary-600 mt-0.5 flex items-center gap-0.5 text-[11px]'>
                <RiStarFill className='size-3 text-yellow-500' />
                <span className='text-[#525866]'>4.9 (125)</span> {/* Placeholder Rating */}
              </div>
            </div>
            <div className='text-text-secondary-600 mb-2 flex items-center gap-1.5 text-[11px]'>
              <span className='inline-flex items-center gap-0.5'>
                <RiMoneyDollarCircleLine className='size-3' /> Salary{' '}
                {/* Placeholder Info */}
              </span>
              <span className='inline-flex items-center gap-0.5'>
                <RiBriefcaseLine className='size-3' /> Work {/* Placeholder Info */}
              </span>
              <span className='inline-flex items-center gap-0.5'>
                <RiSparklingLine className='size-3' /> Specia {/* Placeholder Info */}
              </span>
            </div>
          </div>
        </div>

      </div>

      <Divider.Root className='my-5' />

      <p className='text-[#525866] mb-3 line-clamp-2 text-[14px]'>
        Passionate about delivering high-quality audio mixing and editing.
        Let&apos;s create something.... {/* Placeholder Bio */}
      </p>
      <div className='flex flex-wrap gap-1'>
        {/* Placeholder Badges */}

        <Tag.Root className='text-[12px] text-[#525866]'>Mixing</Tag.Root>
        <Tag.Root className='text-[12px] text-[#525866]'>Singing</Tag.Root>
        <Tag.Root className='text-[12px] text-[#525866]'>Jazz</Tag.Root>
        <Tag.Root className='text-[12px] text-[#525866]'>Hip hop</Tag.Root>
        <Tag.Root className='text-[12px] text-[#525866]'>K pop</Tag.Root>

      </div>
    </div>
  );
};

export default WorkerCard;
