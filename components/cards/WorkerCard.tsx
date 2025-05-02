import React from 'react';
import * as Avatar from '@/components/ui/avatar';
import * as Tag from '@/components/ui/tag';
import { User } from '@/utils/supabase/types';

import {
  RiStarFill,
  RiBriefcaseLine,
  RiMoneyDollarCircleLine,
  RiSparklingLine,
} from '@remixicon/react';
import * as Divider from '@/components/ui/divider';

// --- Worker Card Component ---
interface WorkerCardProps {
  worker?: User;
  onClick?: () => void;
}

const WorkerCard: React.FC<WorkerCardProps> = ({ worker, onClick }) => {
  // Use worker data if available, otherwise use placeholders
  const name = worker?.full_name || 'Music Professional';
  const avatarUrl = worker?.avatar_url || null;
  const bio = worker?.bio || 'Passionate about delivering high-quality audio mixing and editing. Let\'s create something amazing together!';

  // Get the first character of the name for the fallback avatar
  const nameInitial = name.charAt(0).toUpperCase();

  return (
    <div
      className='shadow-sm hover:shadow-md overflow-hidden border border-stroke-soft-200 bg-bg-white-0 p-4 transition-all max-w-[334.67px] max-h-[198px] rounded-xl flex flex-col gap-6'
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-2'>
          <Avatar.Root size='48' color='sky'>
            {avatarUrl ? (
              <Avatar.Image
                src={avatarUrl}
                alt={`${name}'s Avatar`}
              />
            ) : (
              // Using just the root with no image shows the default placeholder
              // The placeholder will use the color set in the Avatar.Root
              <div className="flex items-center justify-center size-full">
                {nameInitial}
              </div>
            )}
          </Avatar.Root>
          <div className='flex flex-col gap-1'>
            <div className='flex flex-row gap-2 items-center'>
              <div className='text-[14px] font-medium text-surface-800'>
                {name}
              </div>
              <div className='text-text-secondary-600 mt-0.5 flex items-center gap-0.5 text-[11px]'>
                <RiStarFill className='size-3 text-yellow-500' />
                <span className='text-[#525866]'>4.9 (125)</span> {/* Placeholder Rating */}
              </div>
            </div>
            <div className='text-text-secondary-600 mb-2 flex items-center gap-1.5 text-[11px]'>
              <span className='inline-flex items-center gap-0.5'>
                <RiMoneyDollarCircleLine className='size-3' /> Salary{' '}
              </span>
              <span className='inline-flex items-center gap-0.5'>
                <RiBriefcaseLine className='size-3' /> Work
              </span>
              <span className='inline-flex items-center gap-0.5'>
                <RiSparklingLine className='size-3' /> Special
              </span>
            </div>
          </div>
        </div>
      </div>

      <Divider.Root />

      <p className='text-[#525866] line-clamp-2 text-[14px]'>
        {bio}
      </p>
      <div className='flex flex-wrap gap-1'>
        {/* Placeholder Tags */}
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
