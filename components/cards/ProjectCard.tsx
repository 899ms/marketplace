'use client';

import React from 'react';
import * as Avatar from '@/components/ui/avatar';
import * as Tag from '@/components/ui/tag';
import * as Badge from '@/components/ui/badge';
import * as Button from '@/components/ui/button';
import { RiStarFill, RiArrowRightSLine } from '@remixicon/react';
import { cn } from '@/utils/cn';
import { useNotification, notification as notify } from '@/hooks/use-notification';

// --- Interfaces --- //
interface ProjectInfoBadge {
  label: string;
}

interface ClientInfo {
  avatarUrl: string;
  name: string;
  rating: number;
  reviewCount: number;
}

interface ProjectCardProps {
  title: string;
  infoBadges: ProjectInfoBadge[];
  skillTags: string[];
  description: string;
  client: ClientInfo;
  budget: number;
  onApply?: () => void;
  className?: string;
  projectId?: string;
}

// --- Project Card Component --- //
export function ProjectCard({
  title,
  infoBadges,
  skillTags,
  description,
  client,
  budget,
  onApply,
  className,
  projectId,
}: ProjectCardProps) {
  const handleApplyClick = () => {
    if (onApply) {
      onApply();
    }

    notify({
      status: 'success',
      title: 'Application Sent!',
      description: `Successfully applied to project: ${title}`,
      duration: 5000,
    });

    console.log('Apply button clicked for project ID:', projectId);
  };

  return (
    <div
      className={cn(
        'overflow-hidden border-b border-stroke-soft-200 bg-bg-white-0 p-4 shadow-sm transition-shadow hover:shadow-md',
        className,
      )}
    >
      <div className='grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]'>
        {/* Left Column (Content) */}
        <div className='flex flex-col gap-1.5'>
          {/* Title and Info Badges */}
          <div className='flex flex-wrap items-center items-start gap-x-3'>
            <h3 className='text-[20px] font-medium text-text-strong-950'>{title}</h3>
            <div className='flex flex-wrap gap-1.5'>
              {infoBadges.map((badge) => (
                <Badge.Root
                  key={badge.label}
                  variant='light'
                  className={cn(
                    'inline-flex items-center',
                    'bg-[#F6F8FA]',
                    'px-[16px] py-[11px]',
                    'border border-[#E2E4E9]',
                    'rounded-full',
                    'text-[#525866] text-[12px] leading-[16px]'
                  )}
                >
                  {badge.label}
                </Badge.Root>
              ))}
            </div>
          </div>

          {/* Skill Tags */}
          <div className='flex flex-wrap gap-1.5'>
            {skillTags.map((skill, index) => (
              <Tag.Root
                key={skill}
                variant={index === 0 ? 'stroke' : 'gray'}
                className={index === 0 ? 'border-black' : ''}
              >
                {skill}
              </Tag.Root>
            ))}
          </div>

          {/* Description */}
          <p className='line-clamp-3 text-[14px] text-[#0E121B] text-text-secondary-600'>
            {description}
          </p>

          {/* Client Info */}
          <div className='flex items-center gap-1 pt-2'>
            <Avatar.Root className='w-[20px] h-[20px]'>
              <Avatar.Image src={client.avatarUrl} alt={`${client.name}'s avatar`} />
            </Avatar.Root>
            <span className='text-[12px] font-medium text-[#525866]'>
              {client.name}
            </span>
            <div className='flex items-center gap-0.5 text-[12px] text-[#525866]'>
              <RiStarFill className='size-3 text-yellow-500' />
              <span>
                {client.rating.toFixed(1)}({client.reviewCount})
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (Budget & Apply) */}
        <div className='flex flex-col gap-2'>
          <div className='text-right'>
            <p className='text-[14px] text-[#525866]'>Budget</p>
            <p className='text-[18px] font-medium text-text-strong-950'>
              ${budget.toLocaleString()}
            </p>
          </div>
          <Button.Root
            variant='neutral'
            mode='stroke'
            size='small'
            className={cn(
              'text-[14px] w-full md:w-auto !shadow-[0_1px_2px_0_rgba(82,88,102,0.06)]',
            )}
            onClick={handleApplyClick}
          >
            Apply
            <RiArrowRightSLine className='size-4' />
          </Button.Root>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
