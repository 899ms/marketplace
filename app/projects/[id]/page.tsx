'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { RiHomeLine, RiLinksLine, RiBookmarkLine, RiSendPlaneLine, RiShareLine, RiFileCopyLine, RiArrowRightSLine } from '@remixicon/react';
import * as Button from '@/components/ui/button';
import * as Input from '@/components/ui/input';

// Import Supabase functions and types
import {
  jobOperations,
  userOperations,
} from '@/utils/supabase/database';
import type { Job, User, BaseFileData } from '@/utils/supabase/types'; // Import types
import { useAuth } from '@/utils/supabase/AuthContext'; // Import useAuth

// Import Notification hook
import { useNotification } from '@/hooks/use-notification';

// Import existing components
import ClientProfileCard from '@/components/projects/detail/ClientProfileCard';
import ProjectInfoCard from '@/components/projects/detail/ProjectInfoCard';
import ApplicantsList from '@/components/projects/detail/ApplicantsList';
import ProjectHeader from '@/components/projects/detail/ProjectHeader';
import ProjectDetailsSection from '@/components/projects/detail/ProjectDetailsSection';
import SkillsSection from '@/components/projects/detail/SkillsSection';
import AttachmentsSection from '@/components/projects/detail/AttachmentsSection';
import FaqSection from '@/components/projects/detail/FaqSection';

// --- Mock Data (Keep for sections not yet implemented with real data) ---
const mockFaqs = [
  {
    question: 'How to join the project?',
    answer: '',
    isOpen: false,
  },
  {
    question: 'What requirements must be met to participate in the project?',
    answer:
      'Insert the accordion description here. It would look better as two lines of text.',
    isOpen: false,
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
];

const mockApplicants = [
  {
    id: '1',
    name: 'James Brown',
    avatar: 'https://via.placeholder.com/40',
    rating: 4.9,
    reviews: 125,
    time: '1m ago',
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
];

// --- Placeholder Seller Components ---
const SellerActionButtons = ({ onApply }: { onApply: () => void }) => (
  <div className="flex items-center gap-3 p-4 pt-0 mt-4">
    <Button.Root variant="neutral" mode="stroke" className="flex-1">
      Message
      <Button.Icon><RiSendPlaneLine /></Button.Icon>
    </Button.Root>
    <Button.Root
      variant="neutral"
      mode="filled"
      className="flex-1"
      onClick={onApply}
    >
      Apply
      <Button.Icon><RiArrowRightSLine /></Button.Icon>
    </Button.Root>
  </div>
);

// NOTE: ProjectLinkCard requires a link - Job schema doesn't have one.
const ProjectLinkCard = ({ link }: { link: string }) => (
  <div className="shadow-sm rounded-xl bg-bg-white-0 p-4">
    <label
      htmlFor="project-link"
      className="mb-2 block text-label-md font-medium text-text-strong-950"
    >
      Link
    </label>
    <Input.Root>
      <Input.Wrapper className="flex items-center bg-white border border-gray-300 rounded-md px-2 py-1">
        {/* link icon */}
        <RiLinksLine className="size-5 text-gray-400 mr-2" />
        {/* read-only input */}
        <Input.Input
          id="project-link"
          readOnly
          value={link}
          className="bg-transparent text-gray-400 flex-1 focus:outline-none"
        />
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

export default function ProjectDetailPage() {
  const { id: projectId } = useParams<{ id: string }>(); // Get project ID from route
  const authContext = useAuth();
  const { notification } = useNotification(); // Use the notification hook

  // State for fetched data
  const [projectDataState, setProjectDataState] = useState<Job | null>(null);
  const [clientDataState, setClientDataState] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<'buyer' | 'seller' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId || authContext.loading) return; // Wait for ID and auth loading

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      setProjectDataState(null); // Clear previous data
      setClientDataState(null);
      setUserRole(null);

      try {
        // 1. Fetch Job data
        const jobData = await jobOperations.getJobById(projectId);
        if (!jobData) {
          throw new Error('Project not found.');
        }
        setProjectDataState(jobData);

        // 2. Fetch Client (Buyer) data
        const clientData = await userOperations.getUserById(jobData.buyer_id);
        if (!clientData) {
          // Handle case where client data might be missing but job exists
          console.warn(`Client data not found for buyer ID: ${jobData.buyer_id}`);
          // Proceed without client data if needed, or throw error
          // throw new Error('Client not found.');
        }
        setClientDataState(clientData);

        // 3. Determine User Role
        if (authContext.user) {
          const role = authContext.user.id === jobData.buyer_id ? 'buyer' : 'seller';
          setUserRole('buyer');
        } else {
          setUserRole('seller'); // Default to seller view if not logged in
        }

      } catch (err: any) {
        console.error('Error fetching project details:', err);
        setError(err.message || 'Failed to load project details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

  }, [projectId, authContext.user?.id, authContext.loading]); // Re-run if ID or user changes

  // Derived boolean for cleaner conditional rendering
  const isSeller = userRole === 'seller';

  // Handler for the Apply button click
  const handleApplyClick = () => {
    // TODO: Add actual application logic here (e.g., API call)
    console.log('Apply button clicked');

    // Show success notification
    notification({
      status: 'success',
      title: 'Application Sent',
      description: 'Your application for this project has been submitted successfully.',
    });
  };

  // --- Render Logic ---
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 lg:px-8 text-center">
        Loading project details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 lg:px-8 text-center text-red-600">
        Error: {error}
      </div>
    );
  }

  if (!projectDataState) {
    // This case might occur if fetchData completes but projectData is null (e.g., not found)
    return (
      <div className="container mx-auto px-4 py-6 lg:px-8 text-center">
        Project could not be loaded.
      </div>
    );
  }

  // Prepare data for child components, handling missing fields
  const projectTitle = projectDataState.title ?? 'Untitled Project';
  // Map usage_option or use default - check JobSchema for exact field/values
  const projectCategory = projectDataState.usage_option === 'business' ? 'Business' : 'Private';
  const projectDescription = projectDataState.description ? [projectDataState.description] : []; // Wrap in array if needed
  // const projectRequirements = []; // Requirements field is not in JobSchema
  const projectSkills = projectDataState.skill_levels ?? [];
  // Adapt attachment structure if BaseFileData doesn't match AttachmentsSection expectation
  const projectAttachments = (projectDataState.files ?? []).map(file => ({ name: file.name, type: 'file', size: `${(file.size / (1024 * 1024)).toFixed(1)} MB` }));

  const clientName = clientDataState?.full_name ?? 'Unknown Client';
  const clientAvatar = clientDataState?.avatar_url ?? 'https://via.placeholder.com/100'; // Placeholder avatar
  // Rating, Reviews, isVerified are not in UserSchema - use placeholders
  const clientRating = 4.9; // Placeholder
  const clientReviews = 125; // Placeholder
  const clientIsVerified = true; // Placeholder

  const projectBudget = `$${projectDataState.budget ?? 0}`;
  // Derive Release Time (Example: using raw date for now)
  const projectReleaseTime = projectDataState.created_at ? new Date(projectDataState.created_at).toLocaleDateString() : 'N/A';
  const projectDeadline = projectDataState.deadline ?? 'N/A';
  const projectProposals = 5; // Placeholder - not in JobSchema
  const projectLink = 'https://www.example.com'; // Placeholder - not in JobSchema


  return (
    <div className='container mx-auto px-4 py-6 lg:px-8'>
      {/* Header with Breadcrumbs */}
      <div className='mb-6 flex items-center justify-between'>
        <div className='text-sm flex flex-wrap items-center gap-2'>
          <Link
            href={!isSeller ? '/projects' : '/jobs'}
            className='text-icon-secondary-400 hover:text-icon-primary-500'
          >
            <RiHomeLine className='size-4' />
          </Link>
          <span className='text-text-secondary-400'>/</span>
          <Link
            href={!isSeller ? '/projects' : '/jobs'}
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
          <div className='shadow-[0px_16px_32px_-12px_#0E121B1A] rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
            <ProjectHeader
              title={projectTitle}
              category={projectCategory}
              showBookmark={isSeller}
            />
            <ProjectDetailsSection
              description={projectDescription}
              requirements={[]} // Pass empty array as requirements are not fetched
            />
            <SkillsSection skills={projectSkills} />
            <AttachmentsSection attachments={projectAttachments} />
            <FaqSection initialFaqs={mockFaqs} /> {/* Use mock FAQs */}
          </div>
        </div>

        {/* Right Sidebar - Conditionally Rendered */}
        <div className='flex flex-col gap-6 md:col-span-4'>
          {!isSeller ? (
            // Buyer Sidebar Layout
            <>
              <div className='shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
                <ClientProfileCard client={{
                  name: clientName,
                  avatar: clientAvatar,
                  rating: clientRating,
                  reviews: clientReviews,
                  isVerified: clientIsVerified
                }} />
                <div className="w-[90%] mx-auto my-4 h-[2px] bg-stroke-soft-200" />
                <ProjectInfoCard
                  budget={projectBudget}
                  releaseTime={projectReleaseTime}
                  deadline={projectDeadline}
                  proposals={projectProposals} // Use placeholder
                />
              </div>
              {/* Pass userRole which is 'buyer' here */}
              <ApplicantsList applicants={mockApplicants} userRole={'buyer'} />
            </>
          ) : (
            // Seller Sidebar Layout
            <>
              <div className='shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
                <ClientProfileCard client={{
                  name: clientName,
                  avatar: clientAvatar,
                  rating: clientRating, // Placeholder
                  reviews: clientReviews, // Placeholder
                  isVerified: clientIsVerified // Placeholder
                }} />
                <div className="w-[90%] mx-auto my-4 h-[2px] bg-stroke-soft-200" />
                <ProjectInfoCard
                  budget={projectBudget}
                  releaseTime={projectReleaseTime}
                  deadline={projectDeadline}
                  proposals={projectProposals} // Use placeholder
                />
                <SellerActionButtons onApply={handleApplyClick} />
              </div>
              {/* Pass userRole which is 'seller' here */}
              <ApplicantsList applicants={mockApplicants} userRole={'seller'} />
              <ProjectLinkCard link={projectLink} /> {/* Use placeholder link */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
