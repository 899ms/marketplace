'use client';

import React from 'react';
import Link from 'next/link';
import * as LinkButton from '@/components/ui/link-button';
import * as Tag from '@/components/ui/tag';
import * as Button from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';

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
  const { t } = useTranslation('common');

  return (
    <div className='mb-4 flex items-center justify-between'>
      <h2 className='text-[18px] font-medium text-[#0A0D14]'>{title}</h2>
      <LinkButton.Root
        size='small'
        className='text-[14px] text-[#222530] font-medium'
        asChild
      >
        <Link href={href} className=''>
          {t('worker.mainContent.more')}
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
  const { t } = useTranslation('common');

  const title = job.title ?? t('worker.mainContent.untitledProject');
  const budget = job.budget ?? 0;
  const budgetDisplay = `$${budget}`;
  const description = job.description ?? t('worker.mainContent.noDescription');
  const tags = Array.isArray(job.skill_levels) ? job.skill_levels : [];

  return (
    <div className="flex flex-col max-h-[148px] gap-4">
      <div className='flex flex-col gap-2  pt-4'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-col gap-2'>
            <Link href={`/${i18n.language}/projects/${job.id}`} className='hover:underline'>
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
            <p className='text-[14px] text-[#525866]'>{t('worker.mainContent.budget')}</p>
            <p className='text-[18px] font-medium text-[#0E121B]'>
              {budgetDisplay}
            </p>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-[14px] text-[#0E121B] line-clamp-1'>{description}</p>
          <Button.Root mode='stroke' size='small' variant='neutral' asChild className='flex-shrink-0 shadow-sm'>
            <Link href={`/${i18n.language}/projects/${job.id}`}>
              {t('worker.mainContent.apply')}
              <Button.Icon as={RiArrowRightSLine} className='text-[#525866]' />
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
  const { t } = useTranslation('common');

  return (
    <main className='flex-1 max-w-[676px]'>
      <Banner />
      <section className='flex flex-col max-w-[676px] max-h-[632px]'>
        <SectionHeader title={t('worker.mainContent.projects')} href='#' />
        <div className='flex flex-col gap-2'>
          {recentJobs && recentJobs.length > 0 ? (
            recentJobs.map((job) => <ProjectCard key={job.id} job={job} />)
          ) : (
            <p className='px-2 py-4 text-text-secondary-500'>
              {t('worker.mainContent.noProjects')}
            </p>
          )}
        </div>
      </section>
      {/* Add other main content sections here */}
    </main>
  );
}
