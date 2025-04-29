import React from 'react';
import * as Avatar from '@/components/ui/avatar';
import * as Tag from '@/components/ui/tag';
import { RiStarFill } from '@remixicon/react';
import * as Divider from '@/components/ui/divider';
import { cn } from '@/utils/cn';

// --- Interfaces --- //
interface WorkerBadge {
  label: string;
  // Add icon if needed later
}

interface WorkerCardProps {
  avatarUrl: string;
  name: string;
  rating: number;
  reviewCount: number;
  badges: WorkerBadge[];
  description: string;
  skills: string[];
  onClick?: () => void;
  className?: string;
}

// --- Google Icon SVG --- //
// Reusable Google Icon component (consider moving to a shared location if used elsewhere)
function GoogleIcon() {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      className='size-4' // Added size class
    >
      <path
        d='M8.14258 6.72729V9.4382H11.9868C11.818 10.31 11.3114 11.0482 10.5517 11.5446L12.8699 13.3073C14.2205 12.0855 14.9998 10.291 14.9998 8.15918C14.9998 7.66283 14.9543 7.18551 14.8699 6.72737L8.14258 6.72729Z'
        fill='#4285F4'
      />
      <path
        d='M4.13966 9.33234L3.61681 9.72456L1.76611 11.1373C2.94145 13.4218 5.35039 15 8.14261 15C10.0712 15 11.688 14.3763 12.8699 13.3073L10.5517 11.5445C9.91532 11.9645 9.10362 12.2191 8.14261 12.2191C6.28545 12.2191 4.70756 10.9909 4.14258 9.33638L4.13966 9.33234Z'
        fill='#34A853'
      />
      <path
        d='M1.76619 4.86285C1.27919 5.80463 1 6.86737 1 8.00007C1 9.13278 1.27919 10.1955 1.76619 11.1373C1.76619 11.1436 4.14288 9.33003 4.14288 9.33003C4.00002 8.91003 3.91558 8.46461 3.91558 8C3.91558 7.5354 4.00002 7.08997 4.14288 6.66997L1.76619 4.86285Z'
        fill='#FBBC05'
      />
      <path
        d='M8.14275 3.78726C9.19473 3.78726 10.1298 4.14361 10.8766 4.83089L12.922 2.82638C11.6817 1.69368 10.0714 1 8.14275 1C5.35054 1 2.94145 2.57181 1.76611 4.86272L4.14273 6.66999C4.70764 5.01543 6.2856 3.78726 8.14275 3.78726Z'
        fill='#EA4335'
      />
    </svg>
  );
}

// --- Worker Card Component --- //
export function WorkerCard({
  avatarUrl,
  name,
  rating,
  reviewCount,
  badges,
  description,
  skills,
  onClick,
  className,
}: WorkerCardProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4 shadow-md transition-shadow hover:shadow-lg',
        onClick && 'cursor-pointer',
        className,
      )}
      onClick={onClick}
    >
      {/* Top Section */}
      <div className='mb-4 flex items-start gap-3'>
        <Avatar.Root size='48'>
          <Avatar.Image src={avatarUrl} alt={`${name}'s avatar`} />
          {/* <Avatar.Fallback>{name.charAt(0)}</Avatar.Fallback> Removed Fallback based on linter error */}
        </Avatar.Root>
        <div className='flex flex-col gap-1'>
          {/* Name & Rating */}
          <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
            <h3 className='text-base font-medium text-text-strong-950'>{name}</h3>
            <div className='flex items-center gap-0.5 text-sm text-text-secondary-600'>
              <RiStarFill className='size-4 text-yellow-500' />
              <span>
                {rating.toFixed(1)} ({reviewCount})
              </span>
            </div>
          </div>
          {/* Badges */}
          <div className='flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-secondary-600'>
            {badges.map((badge) => (
              <span key={badge.label} className='inline-flex items-center gap-1'>
                <GoogleIcon />
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Divider.Root className='my-4' />

      {/* Description */}
      <p className='mb-4 line-clamp-2 text-sm text-text-secondary-600'>
        {description}
      </p>

      {/* Skills Tags */}
      <div className='flex flex-wrap gap-1.5'>
        {skills.map((skill) => (
          <Tag.Root key={skill} variant='gray'>
            {skill}
          </Tag.Root>
        ))}
      </div>
    </div>
  );
}

export default WorkerCard; // Keep default export if needed elsewhere
