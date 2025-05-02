'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { RiHomeLine, RiLinksLine, RiBookmarkLine, RiSendPlaneLine, RiShareLine, RiFileCopyLine, RiArrowRightSLine, RiLoader4Line } from '@remixicon/react';
import * as Button from '@/components/ui/button';
import * as Input from '@/components/ui/input';

// Import Supabase functions and types
import {
  jobOperations,
  userOperations,
  chatOperations,
} from '@/utils/supabase/database';
import type { Job, User, BaseFileData, Chat, Message } from '@/utils/supabase/types'; // Import types
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
import ChatPopupWrapper from '@/components/chat/chat-popup-wrapper';

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

// --- Mock Applicants (Buyer vs. Seller views) ---
const mockApplicants = [
  {
    id: '1',
    name: 'James Brown',
    avatar: 'https://via.placeholder.com/40',
    rating: 4.9,
    reviews: 125,
    time: '1m ago',
    // for buyer view: this one was already hired & replaced
    hired: true,
    replacedBy: 'Arthur Taylor',
    unreadMessages: 0,
  },
  {
    id: '2',
    name: 'Sophia Williams',
    avatar: 'https://via.placeholder.com/40',
    rating: 4.9,
    reviews: 125,
    time: '1m ago',
    // not hired, but has unread messages
    hired: false,
    unreadMessages: 2,
  },
  {
    id: '3',
    name: 'Arthur Taylor',
    avatar: 'https://via.placeholder.com/40',
    rating: 4.9,
    reviews: 125,
    time: '1m ago',
    hired: false,
    unreadMessages: 0,
  },
  {
    id: '4',
    name: 'Emma Wright',
    avatar: 'https://via.placeholder.com/40',
    rating: 4.9,
    reviews: 125,
    time: '1m ago',
    hired: false,
    unreadMessages: 0,
  },
  {
    id: '5',
    name: 'Emma Wright',
    avatar: 'https://via.placeholder.com/40',
    rating: 4.9,
    reviews: 125,
    time: '1m ago',
    hired: false,
    unreadMessages: 0,
  },
];


// --- Placeholder Seller Components ---
const SellerActionButtons = ({
  onApply,
  onMessageClick,
  isLoadingChat,
  disabled,
}: {
  onApply: () => void;
  onMessageClick: () => void;
  isLoadingChat: boolean;
  disabled: boolean;
}) => (
  <div className="flex items-center gap-3 p-4 pt-0 mt-4">
    <Button.Root
      variant="neutral"
      mode="stroke"
      className="flex-1"
      onClick={onMessageClick}
      disabled={disabled || isLoadingChat}
    >
      {isLoadingChat ? (
        <>
          <RiLoader4Line className="animate-spin mr-2" size={16} />
          Opening...
        </>
      ) : (
        <>
          Message
          <Button.Icon><RiSendPlaneLine /></Button.Icon>
        </>
      )}
    </Button.Root>
    <Button.Root
      variant="neutral"
      mode="filled"
      className="flex-1"
      onClick={onApply}
      disabled={disabled}
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
  const { id: projectId } = useParams<{ id: string }>();
  const authContext = useAuth();
  const { notification } = useNotification();

  // State for fetched data
  const [projectDataState, setProjectDataState] = useState<Job | null>(null);
  const [clientDataState, setClientDataState] = useState<User | null>(null);
  const [currentUserProfile, setCurrentUserProfile] = useState<User | null>(null); // Added state for current user profile
  const [pageViewRole, setPageViewRole] = useState<
    'owner' | 'seller_visitor' | 'buyer_visitor' | 'anonymous'
  >('anonymous'); // More specific role state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Chat State --- 
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [activeChatMessages, setActiveChatMessages] = useState<Message[]>([]);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  // --- End Chat State ---

  useEffect(() => {
    if (!projectId || authContext.loading) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      setProjectDataState(null);
      setClientDataState(null);
      setCurrentUserProfile(null); // Reset current user profile
      setPageViewRole('anonymous'); // Reset role

      let fetchedJobData: Job | null = null;

      try {
        // 1. Fetch Job data
        const jobData = await jobOperations.getJobById(projectId);
        if (!jobData) {
          throw new Error('Project not found.');
        }
        setProjectDataState(jobData);
        fetchedJobData = jobData; // Store for role determination

        // 2. Fetch Client (Buyer) data
        const clientData = await userOperations.getUserById(jobData.buyer_id);
        setClientDataState(clientData);
        // Don't throw error if client not found, just proceed

        // 3. Fetch Current User Profile (if logged in)
        let fetchedCurrentUserProfile: User | null = null;
        if (authContext.user?.id) {
          fetchedCurrentUserProfile = await userOperations.getUserById(authContext.user.id);
          setCurrentUserProfile(fetchedCurrentUserProfile);
        }

        // 4. Determine Page View Role using fetched data
        if (authContext.user && fetchedJobData) {
          if (authContext.user.id === fetchedJobData.buyer_id) {
            setPageViewRole('owner');
            console.log("Setting pageViewRole: owner");
          } else if (fetchedCurrentUserProfile?.user_type === 'seller') {
            setPageViewRole('seller_visitor');
            console.log("Setting pageViewRole: seller_visitor");
          } else if (fetchedCurrentUserProfile?.user_type === 'buyer') {
            setPageViewRole('buyer_visitor');
            console.log("Setting pageViewRole: buyer_visitor");
          } else {
            // Logged in, but not owner and not seller/buyer type (shouldn't happen?)
            setPageViewRole('anonymous');
            console.log("Setting pageViewRole: anonymous (logged in, unexpected type)");
          }
        } else {
          // Not logged in
          setPageViewRole('anonymous');
          console.log("Setting pageViewRole: anonymous (not logged in)");
        }

        // Reset chat state on new fetch
        setActiveChat(null);
        setActiveChatMessages([]);
        setChatError(null);

      } catch (err: any) {
        console.error('Error fetching project details:', err);
        setError(err.message || 'Failed to load project details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

  }, [projectId, authContext.user?.id, authContext.loading]);

  // Derived boolean for cleaner conditional rendering (kept for simplicity where applicable)
  const isOwner = pageViewRole === 'owner';
  const isSellerVisitor = pageViewRole === 'seller_visitor';
  const isBuyerVisitor = pageViewRole === 'buyer_visitor';
  const isAnonymous = pageViewRole === 'anonymous';

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

  // --- Chat Handlers ---
  const handleOpenChat = async () => {
    if (!currentUserProfile || !clientDataState) {
      setChatError('Could not load user profiles. Please try again later.');
      return;
    }
    // Ensure we don't allow opening chat if the roles are incorrect (e.g., buyer trying to message buyer)
    if (pageViewRole !== 'seller_visitor') {
      console.warn('Attempted to open chat with incorrect role:', pageViewRole);
      return;
    }

    setIsLoadingChat(true);
    setChatError(null);
    setActiveChat(null);
    setActiveChatMessages([]);

    try {
      // Seller (currentUserProfile) messaging Buyer (clientDataState)
      const chat = await chatOperations.findOrCreateChat(clientDataState.id, currentUserProfile.id);
      if (chat) {
        setActiveChat(chat);
        setIsLoadingMessages(true);
        const messages = await chatOperations.getChatMessages(chat.id);
        setActiveChatMessages(messages);
      } else {
        setChatError('Failed to find or create chat conversation.');
      }
    } catch (error: any) {
      console.error('Error opening chat:', error);
      setChatError(error.message || 'An unexpected error occurred.');
    } finally {
      setIsLoadingChat(false);
      setIsLoadingMessages(false);
    }
  };

  const handleCloseChat = () => {
    setActiveChat(null);
    setActiveChatMessages([]);
    setChatError(null);
  };
  // --- End Chat Handlers ---

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

  // Adjust breadcrumb logic based on role if needed
  const findWorksLabel = isOwner || isBuyerVisitor ? 'Find Project' : 'Find Works';
  const findWorksLink = isOwner || isBuyerVisitor ? '/projects' : '/jobs'; // Example adjustment

  return (
    <div className='container mx-auto px-4 py-6 lg:px-8'>
      {/* Header with Breadcrumbs - updated links */}
      <div className='mb-6 flex items-center justify-between'>
        <div className='text-sm flex flex-wrap items-center gap-2'>
          {/* Updated Home Link */}
          <Link
            href="/home"
            className='text-icon-secondary-400 hover:text-icon-primary-500'
          >
            <RiHomeLine className='size-4' />
          </Link>
          <span className='text-text-secondary-400'>/</span>
          {/* Updated Find Project/Works Link */}
          <Link
            href="/services/search?tab=Project"
            className='text-text-secondary-600 hover:text-text-strong-950'
          >
            {findWorksLabel} { /* Keep dynamic label for now */}
          </Link>
          <span className='text-text-secondary-400'>/</span>
          <span className='font-medium text-text-strong-950'>
            Project Detail
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
        {/* Left Content Area (Project Details) */}
        <div className='md:col-span-8'>
          <div className='shadow-[0px_16px_32px_-12px_#0E121B1A] rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
            <ProjectHeader
              title={projectTitle}
              category={projectCategory}
              showBookmark={isSellerVisitor || isAnonymous} // Show bookmark for non-owners
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

        {/* Right Sidebar - Conditionally Rendered based on pageViewRole */}
        <div className='flex flex-col gap-6 md:col-span-4'>
          {(isOwner || isBuyerVisitor || isAnonymous) && (
            // Sidebar Layout for Owner, Buyer Visitor, Anonymous (No Apply Button)
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
              {/* No Action Buttons for these roles */}
              {/* Anonymous doesn't see applicants */}
              {!isAnonymous && <ApplicantsList applicants={mockApplicants} userRole={isOwner ? 'buyer' : 'seller'} />}
              {/* Link Card might still be relevant for Anonymous? */}
              {(isAnonymous || isBuyerVisitor) && <ProjectLinkCard link={projectLink} />}
            </div>
          )}
          {isSellerVisitor && (
            // Seller Visitor Sidebar Layout (With Apply Button)
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
                <SellerActionButtons
                  onApply={handleApplyClick}
                  onMessageClick={handleOpenChat}
                  isLoadingChat={isLoadingChat}
                  disabled={!currentUserProfile || !clientDataState}
                />
              </div>
              {/* Display Chat Error */}
              {chatError && (
                <p className="text-xs text-red-600 -mt-4 mb-2 text-center">Error: {chatError}</p>
              )}
              <ApplicantsList applicants={mockApplicants} userRole={'seller'} />
              <ProjectLinkCard link={projectLink} />
            </>
          )}
        </div>
      </div>
      {/* Conditionally render Chat Popup */}
      {activeChat && currentUserProfile && clientDataState && (
        <ChatPopupWrapper
          key={activeChat.id}
          chat={activeChat}
          initialMessages={activeChatMessages}
          currentUserProfile={currentUserProfile} // Seller is current user here
          otherUserProfile={clientDataState} // Buyer is other user here
          currentUserId={currentUserProfile.id}
          isLoadingMessages={isLoadingMessages}
          onClose={handleCloseChat}
          position="bottom-right"
        />
      )}
    </div>
  );
}
