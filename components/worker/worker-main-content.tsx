'use client';

import React from 'react';
import Link from 'next/link';
import * as LinkButton from '@/components/ui/link-button';
import { Banner } from './banner';
import {
  RiArrowRightSLine,
  RiMoneyDollarCircleLine,
  RiTimeLine,
} from '@remixicon/react';

// --- Section Header ---
interface SectionHeaderProps {
  title: string;
  href?: string;
}

export function SectionHeader({ title, href = '#' }: SectionHeaderProps) {
  return (
    <div className='mb-4 flex items-center justify-between'>
      <h2 className='text-xl font-semibold text-text-strong-950'>{title}</h2>
      <LinkButton.Root
        variant='gray'
        size='small'
        className='text-label-md'
        asChild
      >
        <Link href={href}>
          More
          <LinkButton.Icon as={RiArrowRightSLine} />
        </Link>
      </LinkButton.Root>
    </div>
  );
}

// --- Project Card ---
export function ProjectCard() {
  // Placeholder data - replace with actual data fetching/props
  const project = {
    title: 'Need Professional Backend Developer (NodeJs)',
    budget: '$500 - $1k',
    posted: '2 hours ago',
    proposals: 15,
  };
  return (
    <div className='rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4'>
      <h3 className='mb-2 font-medium text-text-strong-950'>{project.title}</h3>
      <div className='text-text-secondary-600 mb-3 flex items-center gap-4 text-paragraph-sm'>
        <span className='flex items-center gap-1'>
          <RiMoneyDollarCircleLine className='text-icon-primary-500 size-4' />{' '}
          {project.budget}
        </span>
        <span className='flex items-center gap-1'>
          <RiTimeLine className='text-icon-primary-500 size-4' />{' '}
          {project.posted}
        </span>
      </div>
      <p className='text-text-secondary-600 mb-4 text-paragraph-sm'>
        Proposals:{' '}
        <span className='font-medium text-text-strong-950'>
          {project.proposals}
        </span>
      </p>
      <LinkButton.Root size='small' variant='primary' asChild>
        <Link href='#'>
          {' '}
          {/* TODO: Add correct link */}
          Submit a Proposal
        </Link>
      </LinkButton.Root>
    </div>
  );
}

// --- Worker Main Content ---
export function WorkerMainContent() {
  // Placeholder project data
  const projects = [1, 2, 3]; // Example: map over actual project data

  return (
    <main className='flex-1'>
      <Banner />
      <section className='mt-6'>
        <SectionHeader title='Recent Projects' href='#' />
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {projects.map((p) => (
            <ProjectCard key={p} />
          ))}
        </div>
      </section>
      {/* Add other main content sections here */}
    </main>
  );
}
