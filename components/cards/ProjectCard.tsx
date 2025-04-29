'use client';

import React from 'react';
import * as Avatar from '@/components/ui/avatar';
import * as Tag from '@/components/ui/tag';
import * as Button from '@/components/ui/button'; // Import as namespace
import { RiStarFill, RiArrowRightSLine } from '@remixicon/react';
import { cn } from '@/utils/cn';

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
  onApply?: () => void; // Optional handler for apply button
  className?: string;
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
}: ProjectCardProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4 shadow-sm transition-shadow hover:shadow-md',
        className,
      )}
    >
      <div className='grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]'>
        {/* Left Column (Content) */}
        <div className='flex flex-col gap-3'>
          {/* Title and Info Badges */}
          <div className='flex flex-wrap items-start gap-x-3 gap-y-2'>
            <h3 className='text-lg font-medium text-text-strong-950'>{title}</h3>
            <div className='flex flex-wrap gap-1.5'>
              {infoBadges.map((badge) => (
                <Tag.Root key={badge.label} variant='gray'>
                  {badge.label}
                </Tag.Root>
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
          <p className='line-clamp-3 text-sm text-text-secondary-600'>
            {description}
          </p>

          {/* Client Info */}
          <div className='flex items-center gap-2 pt-2'>
            <Avatar.Root size='24'>
              <Avatar.Image src={client.avatarUrl} alt={`${client.name}'s avatar`} />
            </Avatar.Root>
            <span className='text-xs font-medium text-text-strong-950'>
              {client.name}
            </span>
            <div className='flex items-center gap-0.5 text-xs text-text-secondary-600'>
              <RiStarFill className='size-3 text-yellow-500' />
              <span>
                {client.rating.toFixed(1)} ({client.reviewCount})
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (Budget & Apply) */}
        <div className='flex flex-col items-end justify-between gap-4 md:justify-start'>
          <div className='text-right'>
            <p className='text-xs text-text-secondary-600'>Budget</p>
            <p className='text-lg font-medium text-text-strong-950'>
              ${budget.toLocaleString()}
            </p>
          </div>
          {onApply && (
            <Button.Root
              variant='neutral'
              size='small'
              className='mt-auto w-full md:w-auto'
              onClick={onApply}
            >
              Apply
              <RiArrowRightSLine className='ml-1 size-4' />
            </Button.Root>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
