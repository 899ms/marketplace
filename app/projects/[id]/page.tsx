'use client';

import React from 'react';
import Link from 'next/link';
import { RiHomeLine, RiNotification4Line, RiBookmarkLine, RiSendPlaneLine, RiShareLine, RiFileCopyLine, RiArrowRightSLine } from '@remixicon/react';
import * as Button from '@/components/ui/button';
import * as Input from '@/components/ui/input';

// Import existing components
import ClientProfileCard from '@/components/projects/detail/ClientProfileCard';
import ProjectInfoCard from '@/components/projects/detail/ProjectInfoCard';
import ApplicantsList from '@/components/projects/detail/ApplicantsList'; // Assuming this will be adapted for seller view
import ProjectHeader from '@/components/projects/detail/ProjectHeader';
import ProjectDetailsSection from '@/components/projects/detail/ProjectDetailsSection';
import SkillsSection from '@/components/projects/detail/SkillsSection';
import AttachmentsSection from '@/components/projects/detail/AttachmentsSection';
import FaqSection from '@/components/projects/detail/FaqSection';

// --- Mock Data (Keep using existing data structure) ---
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
  attachments: [{ name: 'test.wav', type: 'audio', size: '2.4 MB' }], // Updated attachment name
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
  deadline: '03.25.2025', // Updated deadline format
  proposals: 5,
  applicants: [
    { // Simplified applicant structure for seller list
      id: '1',
      name: 'James Brown',
      avatar: 'https://via.placeholder.com/40',
      rating: 4.9,
      reviews: 125,
      time: '1m ago',
      // Removed hired/replacedBy for initial seller view
    },
    {
      id: '2',
      name: 'Sophia Williams',
      avatar: 'https://via.placeholder.com/40',
      rating: 4.9,
      reviews: 125,
      time: '1m ago',
    },
    {
      id: '3',
      name: 'Arthur Taylor',
      avatar: 'https://via.placeholder.com/40',
      rating: 4.9,
      reviews: 125,
      time: '1m ago',
    },
    {
      id: '4',
      name: 'Emma Wright',
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
    // Removed duplicate applicant
  ],
  projectLink: 'https://www.google.com/', // Added placeholder link
};

// --- Placeholder Seller Components ---
// These can be extracted into separate files in components/projects/detail later

const SellerActionButtons = () => (
  <div className="flex items-center gap-3 p-4 pt-0"> {/* Added padding adjustment */}
    <Button.Root variant="neutral" mode="stroke" className="flex-1"> {/* Changed hierarchy to variant/mode */}
      <Button.Icon><RiSendPlaneLine /></Button.Icon>
      Message {/* Removed Button.Label */}
    </Button.Root>
    <Button.Root variant="primary" mode="filled" className="flex-1"> {/* Assuming primary filled for Apply */}
      Apply {/* Removed Button.Label */}
      {/* Arrow Icon if needed */}
    </Button.Root>
  </div>
);

const ProjectLinkCard = ({ link }: { link: string }) => (
  <div className="shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-4">
    <label htmlFor="project-link" className="mb-2 block text-label-md font-medium text-text-strong-950">Link</label>
    <Input.Root>
      <Input.Wrapper>
        <Input.Input id="project-link" readOnly value={link} />
        {/* Place button inside wrapper, likely styled with absolute/padding by Input styles */}
        <button
          onClick={() => navigator.clipboard.writeText(link)}
          className="text-icon-secondary-400 hover:text-icon-primary-500 p-1"
          aria-label="Copy link"
        >
          <RiFileCopyLine className="size-5" />
        </button>
      </Input.Wrapper>
    </Input.Root>
  </div>
);

// --- Main Page Component ---

// TODO: Fetch actual project data based on params.id
export default function ProjectDetailPage() {
  // const projectData = await fetchProjectData(params.id); // Replace mock data

  // Determine user role (hardcoded for now, replace with actual logic)
  const userRole: 'buyer' | 'seller' = 'seller';
  const isSeller = userRole === 'seller'; // Derived boolean for checks

  return (
    <div className='container mx-auto px-4 py-6 lg:px-8'>
      {/* Header with Breadcrumbs */}
      <div className='mb-6 flex items-center justify-between'>
        <div className='text-sm flex flex-wrap items-center gap-2'>
          <Link
            href={!isSeller ? '/projects' : '/jobs'} // Use isSeller
            className='text-icon-secondary-400 hover:text-icon-primary-500'
          >
            <RiHomeLine className='size-4' />
          </Link>
          <span className='text-text-secondary-400'>/</span>
          <Link
            href={!isSeller ? '/projects' : '/jobs'} // Use isSeller
            className='text-text-secondary-600 hover:text-text-strong-950'
          >
            {!isSeller ? 'Find Project' : 'Find Works'}
          </Link>
          <span className='text-text-secondary-400'>/</span>
          <span className='font-medium text-text-strong-950'>
            Project Detail
          </span>
        </div>
        {/* Optional: Right side elements like notifications, can be part of main layout */}
      </div>

      {/* Main Content Grid */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
        {/* Left Content Area (Project Details) */}
        <div className='md:col-span-8'>
          <div className='shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
            <ProjectHeader
              title={projectData.title}
              category={projectData.category}
              showBookmark={isSeller} // Use isSeller
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

        {/* Right Sidebar - Conditionally Rendered */}
        <div className='flex flex-col gap-6 md:col-span-4'>
          {!isSeller ? ( // Use !isSeller for buyer view
            // Buyer Sidebar Layout
            <>
              <div className='shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
                <ClientProfileCard client={projectData.client} />
                <ProjectInfoCard
                  budget={projectData.budget}
                  releaseTime={projectData.releaseTime}
                  deadline={projectData.deadline}
                  proposals={projectData.proposals}
                />
                {/* Buyer sees action buttons within the list */}
              </div>
              <ApplicantsList applicants={projectData.applicants} userRole={userRole} />
            </>
          ) : (
            // Seller Sidebar Layout
            <>
              <div className='shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
                <ClientProfileCard client={projectData.client} />
                {/* Seller sees Info + Actions first */}
                <ProjectInfoCard
                  budget={projectData.budget}
                  releaseTime={projectData.releaseTime}
                  deadline={projectData.deadline}
                  proposals={projectData.proposals}
                />
                <SellerActionButtons />
              </div>
              {/* Seller sees simplified list */}
              <ApplicantsList applicants={projectData.applicants} userRole={userRole} />
              {/* Seller sees Link Card */}
              <ProjectLinkCard link={projectData.projectLink} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
