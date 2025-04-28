'use client';

import React from 'react';
import Link from 'next/link';
import { RiHomeLine } from '@remixicon/react';

// Import extracted components
import ClientProfileCard from '@/components/projects/detail/ClientProfileCard';
import ProjectInfoCard from '@/components/projects/detail/ProjectInfoCard';
import ApplicantsList from '@/components/projects/detail/ApplicantsList';
import ProjectHeader from '@/components/projects/detail/ProjectHeader';
import ProjectDetailsSection from '@/components/projects/detail/ProjectDetailsSection';
import SkillsSection from '@/components/projects/detail/SkillsSection';
import AttachmentsSection from '@/components/projects/detail/AttachmentsSection';
import FaqSection from '@/components/projects/detail/FaqSection';

// Mock data (kept for now, replace with actual fetching later)
const projectData = {
  id: '1',
  title: 'Write professional resume, cover letter',
  category: 'Business',
  description: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus augue sagittis erat consectetur est. Blandit blandit nec mauris pulvinar. Lectus duis amet tortor, sit tincidunt. Rhoncus tincidunt imperdiet penatibus vitae risus, vitae. Blandit auctor justo nisi massa.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus dictum ultrices lacus sodales nunc felis eu, consectetur arcu. Vitae nulla scelerisque id pellentesque feugiat vel eu.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus dictum ultrices lacus sodales nunc felis eu, consectetur arcu. Vitae nulla scelerisque id pellentesque feugiat vel eu.',
  ],
  requirements: [
    'Neque sodales ut etiam sit amet nisi purus. Non tellus orci ac auctor.',
    'Adipiscing elit ut aliquam purus sit amet. Viverra suspendisse potenti nullam ac.',
    'Mauris commodo quis imperdiet massa tincidunt nunc pulvinar',
  ],
  skills: ['Mixing', 'Singing', 'Jazz', 'Hip hop', 'K pop', 'Western Music'],
  attachments: [{ name: 'Audio_Script.mp3', type: 'audio', size: '2.4 MB' }],
  faqs: [
    {
      question: 'How to join the project?',
      answer: '',
      isOpen: false,
    },
    {
      question: 'What requirements must be met to participate in the project?',
      answer:
        'Insert the accordion description here. It would look better as two lines of text.',
      isOpen: false, // Default to closed
    },
    {
      question:
        'How long does it take to receive payment after project completion?',
      answer: '',
      isOpen: false,
    },
    {
      question: 'What requirements must be met to participate in the project?',
      answer: '',
      isOpen: false,
    },
  ],
  client: {
    name: 'Cleve Music',
    avatar: 'https://via.placeholder.com/100',
    rating: 4.9,
    reviews: 125,
    isVerified: true,
  },
  budget: '$140',
  releaseTime: '3h ago',
  deadline: '28 Feb 2025',
  proposals: 5,
  applicants: [
    {
      id: '1',
      name: 'James Brown',
      avatar: 'https://via.placeholder.com/40',
      rating: 4.9,
      reviews: 125,
      time: '1m ago',
      hired: true,
      replacedBy: 'Arthur T.',
    },
    {
      id: '2',
      name: 'James Brown',
      avatar: 'https://via.placeholder.com/40',
      rating: 4.9,
      reviews: 125,
      time: '1m ago',
    },
    {
      id: '3',
      name: 'Sophia Williams',
      avatar: 'https://via.placeholder.com/40',
      rating: 4.9,
      reviews: 125,
      time: '1m ago',
    },
    {
      id: '4',
      name: 'Arthur Taylor',
      avatar: 'https://via.placeholder.com/40',
      rating: 4.9,
      reviews: 125,
      time: '1m ago',
    },
    {
      id: '5',
      name: 'Emma Wright',
      avatar: 'https://via.placeholder.com/40',
      rating: 4.9,
      reviews: 125,
      time: '1m ago',
    },
    {
      id: '6',
      name: 'Emma Wright',
      avatar: 'https://via.placeholder.com/40',
      rating: 4.9,
      reviews: 125,
      time: '1m ago',
    },
  ],
};

// TODO: Fetch actual project data based on params.id
// export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
export default function ProjectDetailPage() {
  // const projectData = await fetchProjectData(params.id); // Replace mock data

  // Removed FAQ state logic (moved to FaqSection)

  return (
    <div className='container mx-auto px-4 py-6 lg:px-8'>
      {/* Header with Breadcrumbs */}
      <div className='mb-6 flex items-center justify-between'>
        <div className='text-sm flex flex-wrap items-center gap-2'>
          {' '}
          {/* Added flex-wrap */}
          <Link
            href='/projects'
            className='text-icon-secondary-400 hover:text-icon-primary-500'
          >
            <RiHomeLine className='size-4' />
          </Link>
          <span className='text-text-secondary-400'>/</span>
          <Link
            href='/projects'
            className='text-text-secondary-600 hover:text-text-strong-950'
          >
            Find Project
          </Link>
          <span className='text-text-secondary-400'>/</span>
          <span className='font-medium text-text-strong-950'>
            Project Detail
          </span>
        </div>
        {/* Removed notification button, likely part of a main layout */}
      </div>

      {/* Main Content Grid */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
        {/* Left Content Area (Project Details) */}
        <div className='md:col-span-8'>
          <div className='shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
            <ProjectHeader
              title={projectData.title}
              category={projectData.category}
            />
            <ProjectDetailsSection
              description={projectData.description}
              requirements={projectData.requirements}
            />
            <SkillsSection skills={projectData.skills} />
            <AttachmentsSection attachments={projectData.attachments} />
            <FaqSection initialFaqs={projectData.faqs} />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className='flex flex-col gap-6 md:col-span-4'>
          {/* Combined Client and Info Card */}
          <div className='shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
            <ClientProfileCard client={projectData.client} />
            <ProjectInfoCard
              budget={projectData.budget}
              releaseTime={projectData.releaseTime}
              deadline={projectData.deadline}
              proposals={projectData.proposals}
            />
          </div>

          {/* Applicants List Card */}
          <ApplicantsList applicants={projectData.applicants} />
        </div>
      </div>
    </div>
  );
}
