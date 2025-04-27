import React from 'react';
import * as Avatar from '@/components/ui/avatar';
import * as Badge from '@/components/ui/badge';
import {
  RiStarFill,
  RiBriefcaseLine,
  RiMoneyDollarCircleLine,
  RiSparklingLine,
} from '@remixicon/react';

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
          <Avatar.Root size='32'>
            <Avatar.Image
              src='https://via.placeholder.com/40' // Placeholder
              alt='Worker Avatar'
            />
          </Avatar.Root>
          <div>
            <div className='text-label-sm font-medium text-text-strong-950'>
              Cleve Music {/* Placeholder Name */}
            </div>
            <div className='text-text-secondary-600 mt-0.5 flex items-center gap-0.5 text-[11px]'>
              <RiStarFill className='size-3 text-yellow-400' />
              <span>4.9 (125)</span> {/* Placeholder Rating */}
            </div>
          </div>
        </div>
        <Avatar.Root size='20' color='blue'>
          {' '}
          {/* Placeholder Initial/Badge */}
          <span className='text-[10px] font-medium'>J</span>
        </Avatar.Root>
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
      <p className='text-text-secondary-600 mb-3 line-clamp-2 text-paragraph-xs'>
        Passionate about delivering high-quality audio mixing and editing.
        Let&apos;s create something.... {/* Placeholder Bio */}
      </p>
      <div className='flex flex-wrap gap-1'>
        {/* Placeholder Badges */}
        <Badge.Root variant='light' size='small'>
          Mixing
        </Badge.Root>
        <Badge.Root variant='light' size='small'>
          Singing
        </Badge.Root>
        <Badge.Root variant='light' size='small'>
          Jazz
        </Badge.Root>
        <Badge.Root variant='light' size='small'>
          Hip hop
        </Badge.Root>
        <Badge.Root variant='light' size='small'>
          K pop
        </Badge.Root>
      </div>
    </div>
  );
};

export default WorkerCard;
