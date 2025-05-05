'use client';

import React from 'react';
import Link from 'next/link';
import * as LinkButton from '@/components/ui/link-button';
import * as Tag from '@/components/ui/tag';
import * as Button from '@/components/ui/button';

import Banner from './banner';
import {
  RiArrowRightSLine,
  RiMoneyDollarCircleLine,
  RiTimeLine,
} from '@remixicon/react';
import * as Divider from '@/components/ui/divider';
import { Job, User } from '@/utils/supabase/types';


// --- Section Header ---
interface SectionHeaderProps {
  title: string;
  href?: string;
}

export function SectionHeader({ title, href = '#' }: SectionHeaderProps) {
  return (
    <div className='mb-4 flex items-center justify-between'>
      <h2 className='text-[18px] font-medium text-[#0A0D14]'>{title}</h2>
      <LinkButton.Root
        size='small'
        className='text-[14px] text-[#222530] font-medium'
        asChild
      >
        <Link href={href} className=''>
          More
          <LinkButton.Icon as={RiArrowRightSLine} className='size-5' />
        </Link>
      </LinkButton.Root>
    </div>
  );
}

// --- Project Card ---
interface ProjectCardProps {
  job: Job;
}

export function ProjectCard({ job }: ProjectCardProps) {
  const title = job.title ?? 'Untitled Project';
  const budget = job.budget ?? 0;
  const budgetDisplay = `$${budget}`;
  const description = job.description ?? 'No description provided.';
  const tags = Array.isArray(job.skill_levels) ? job.skill_levels : [];

  return (
    <div className="flex flex-col max-h-[148px] gap-4">
      <div className='flex flex-col gap-2  pt-4'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-col gap-2'>
            <Link href={`/projects/${job.id}`} className='hover:underline'>
              <h3 className='font-medium text-[#0A0D14] text-[20px]'>{title}</h3>
            </Link>
            <div className='flex flex-row gap-2'>
              {tags.map((tag) => (
                <Tag.Root key={tag} className='text-[12px] text-[#525866] '>
                  {tag}
                </Tag.Root>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-[14px] text-[#525866]'>Budget</p>
            <p className='text-[18px] font-medium text-[#0A0D14]'>
              {budgetDisplay}
            </p>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-[14px] text-[#0E121B] line-clamp-1'>{description}</p>
          <Button.Root mode='stroke' size='small' variant='neutral' asChild className='flex-shrink-0 shadow-sm'>
            <Link href={`/projects/${job.id}`}>
              Apply
              <Button.Icon as={RiArrowRightSLine} />
            </Link>
          </Button.Root>
        </div>
      </div>
      <Divider.Root />
    </div>
  );
}

// --- Worker Main Content Props ---
interface WorkerMainContentProps {
  userProfile: User;
  recentJobs: Job[];
}

// --- Worker Main Content ---
export function WorkerMainContent({ userProfile, recentJobs }: WorkerMainContentProps) {
  return (
    <main className='flex-1 max-w-[676px]'>
      <Banner />
      <section className='flex flex-col max-w-[676px] max-h-[632px]'>
        <SectionHeader title='Projects' href='#' />
        <div className='flex flex-col gap-2'>
          {recentJobs && recentJobs.length > 0 ? (
            recentJobs.map((job) => <ProjectCard key={job.id} job={job} />)
          ) : (
            <p className='px-2 py-4 text-text-secondary-500'>
              No recent projects found.
            </p>
          )}
        </div>
      </section>
      {/* Add other main content sections here */}
    </main>
  );
}
