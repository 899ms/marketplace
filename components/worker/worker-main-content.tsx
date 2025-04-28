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


// --- Section Header ---
interface SectionHeaderProps {
  title: string;
  href?: string;
}

export function SectionHeader({ title, href = '#' }: SectionHeaderProps) {
  return (
    <div className='mb-4 flex items-center justify-between'>
      <h2 className='text-[18px] font-semibold text-[#0A0D14]'>{title}</h2>
      <LinkButton.Root
        size='small'
        className='text-[14px] text-[#222530]'
        asChild
      >
        <Link href={href} className=''>
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
    budget: '1400',
    posted: '2 hours ago',
    proposals: 15,
    description: 'We are seeking a talented Website Designer and Front-End Developer to join our ',
    tags: ['Mixing', 'Singing', 'Jazz', 'Hip hop', 'K pop']
  };
  return (
    <>
    <div className='flex flex-col gap-2 px-2 pt-4'>
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col gap-2'>
        <h3 className='text-[14px] font-medium text-[#0A0D14]'>{project.title}</h3>
        <div className='flex flex-row gap-2'>
          {project.tags.map((tag) => (
            <Tag.Root key={tag} className='text-[12px] text-[#525866] '>{tag}</Tag.Root>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-[14px] text-[#525866]'>Budget</p>
        <p className='text-[18px] font-medium text-[#0A0D14]'>${project.budget}</p>
      </div>
    </div>
    <div className='flex justify-between'>
    <p className='text-[14px] text-[#0E121B]'>{project.description}</p>
    <Button.Root mode='stroke' size='xsmall' variant='neutral'>
        Apply
        <Button.Icon as={RiArrowRightSLine} />
      </Button.Root>
    </div>
    </div>
    <Divider.Root />
    </>
  );
}

// --- Worker Main Content ---
export function WorkerMainContent() {
  // Placeholder project data
  const projects = [1, 2, 3]; // Example: map over actual project data

  return (
    <main className='flex-1 mt-[3.5rem]'>
      <Banner />
      <section className='mt-6'>
        <SectionHeader title='Projects' href='#' />
        <div className='flex flex-col gap-2'>
          {projects.map((p) => (
            <ProjectCard key={p} />
          ))}
          
        </div>
      </section>
      {/* Add other main content sections here */}
    </main>
  );
}
