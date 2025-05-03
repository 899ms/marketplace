'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import * as Avatar from '@/components/ui/avatar';
import * as Drawer from '@/components/ui/drawer';
import * as Tabs from '@/components/ui/tabs';
import { useAuth } from '@/utils/supabase/AuthContext';
import { chatOperations, userOperations } from '@/utils/supabase/database';
import { useNotification } from '@/hooks/use-notification';
import ChatPopupWrapper from '@/components/chat/chat-popup-wrapper';
import {
  RiCloseLine,
  RiSendPlaneLine,
  RiStarFill,
  RiGoogleFill,
  RiArrowDropRightLine,
  RiHeart3Line,
  RiArrowRightCircleLine,
  RiLoader4Line,
} from '@remixicon/react';
import * as DialogPrimitive from "@radix-ui/react-dialog";

import BlockFileUploadDialog from '@/components/blocks/block-file-upload-dialog';
import { AboutSection } from '@/components/worker/profile/AboutSection';
import { WorkItem } from '@/components/worker/profile/work-item';
import { ServiceCard } from '@/components/worker/profile/service-card';
import { ReviewItem } from '@/components/worker/profile/review-item';
import { User, Service, Chat, Message, MusicItem } from '@/utils/supabase/types';
import MusicUploadDialog from '@/components/blocks/music-upload-dialog';

interface WorkerProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  worker: User | null;
  services: Service[] | null;
  isLoading: boolean;
}

const placeholderWorkerData = {
  name: 'Cleve Music',
  avatar: 'https://via.placeholder.com/64',
  rating: 4.9,
  reviewCount: 125,
  specialty: 'Next.js & TypeScript Specialist',
  about: '...',
  reviews: [
    {
      id: '1',
      reviewer: 'Cleve Music',
      reviewerAvatar: 'https://via.placeholder.com/32',
      rating: 4.9,
      date: 'Jan 8 2023',
      contractTitle: 'Contract title text here…',
      content:
        'Great communication, quick turnaround and high-quality delivery. Would definitely work again!',
      price: 1000,
    },
    {
      id: '2',
      reviewer: 'Another Client',
      reviewerAvatar: 'https://via.placeholder.com/32',
      rating: 4.5,
      date: 'Feb 15 2023',
      contractTitle: 'Different contract…',
      content: 'Good work, delivered on time.',
      price: 500,
    },
  ],
};

const WorkerProfileDrawer: React.FC<WorkerProfileDrawerProps> = ({
  isOpen,
  onClose,
  worker,
  services,
  isLoading,
}) => {
  const authContext = useAuth();
  const { notification: toast } = useNotification();
  const [activeTab, setActiveTab] = useState<'about' | 'work' | 'services' | 'reviews'>('about');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const [currentUserProfile, setCurrentUserProfile] = useState<User | null>(null);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [activeChatMessages, setActiveChatMessages] = useState<Message[]>([]);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  const displayName = worker?.full_name || worker?.username || (isLoading ? 'Loading...' : 'Worker');
  const displayAvatar = worker?.avatar_url ?? undefined;
  const displayBio = worker?.bio || (isLoading ? 'Loading bio...' : 'No bio provided.');

  useEffect(() => {
    const fetchCurrentUserProfile = async () => {
      if (authContext.user?.id) {
        const profile = await userOperations.getUserById(authContext.user.id);
        setCurrentUserProfile(profile);
      }
    };
    fetchCurrentUserProfile();
  }, [authContext.user]);

  const handleHireClick = () => {
    toast({
      description: `Hire Initiated: Proceeding to hire ${displayName}.`,
    });
  };

  const handleOpenChat = async () => {
    if (!currentUserProfile || !worker) {
      setChatError('Could not load user profiles. Please log in.');
      return;
    }
    if (currentUserProfile.id === worker.id) {
      setChatError("You cannot start a chat with yourself.");
      return;
    }

    setIsLoadingChat(true);
    setChatError(null);
    setActiveChat(null);
    setActiveChatMessages([]);

    try {
      const chat = await chatOperations.findOrCreateChat(currentUserProfile.id, worker.id);
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

  useEffect(() => {
    if (!isOpen && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    if (isOpen && !isLoading && worker) {
      setActiveTab('about');
    }
  }, [isOpen, isLoading, worker]);

  const disableActions = !currentUserProfile || !worker || isLoading || currentUserProfile?.id === worker?.id;

  const handleUploadComplete = (updatedMusicData: MusicItem[]) => {
    console.log('Drawer: Upload complete, new music data:', updatedMusicData);
    // TODO: Potentially refresh worker data or update state here
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Content
        className="fixed inset-y-0 right-0 z-50 h-[100dvh] w-full shadow-xl overflow-x-hidden bg-white flex flex-col"
        style={{ maxWidth: '800px' }}
      >
        <DialogPrimitive.Title className="sr-only">
          {`Worker Profile: ${displayName}`}
        </DialogPrimitive.Title>

        <div className="flex flex-col flex-grow">
          {/* header */}
          <div className="px-[24px] pt-4 flex-shrink-0">
            <div className="flex items-center justify-between h-[60px]">
              <Drawer.Close asChild>
                <button className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <RiCloseLine className="size-[20px] m-[16px] text-text-secondary-600" />
                  <span className="sr-only">Close</span>
                </button>
              </Drawer.Close>

              <div className='flex items-center gap-1.5'>
                <Link
                  href={worker ? `/users/${worker.id}` : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 text-[14px] font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700 ${!worker || isLoading ? 'pointer-events-none opacity-50' : ''}`}>
                  Open in new tab
                </Link>
                <RiArrowRightCircleLine className="size-5 text-[#525866]" />
              </div>
            </div>

            {isLoading ? (
              <div className="mt-5 flex h-[88px] items-center justify-center px-5">
                <RiLoader4Line className="size-8 animate-spin text-text-secondary-600" />
              </div>
            ) : worker ? (
              <div className="mt-5 flex items-center justify-between px-5">
                <div className="flex items-center gap-4">
                  <Link href={`/users/${worker.id}`} passHref legacyBehavior>
                    <a className="inline-block">
                      <Avatar.Root size="64">
                        <Avatar.Image src={displayAvatar ? displayAvatar : undefined} alt={displayName} />
                      </Avatar.Root>
                    </a>
                  </Link>

                  <div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <Link href={`/users/${worker.id}`} passHref legacyBehavior>
                        <a className="inline-block hover:underline">
                          <h2 className="text-[18px] font-semibold text-text-strong-950">
                            {displayName}
                          </h2>
                        </a>
                      </Link>
                      <div className="flex items-center gap-0.5 text-[14px] text-gray-600">
                        <RiStarFill className="size-4 text-yellow-400" />
                        <span>4.8 (100+)</span>
                      </div>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-[12px] text-text-secondary-600">
                      <RiGoogleFill className="size-4" />
                      <RiGoogleFill className="size-4" />
                      <RiGoogleFill className="size-4" />
                      <span>Music Producer</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    className="
                      w-[100px]            /* 100px wide */
                      rounded-lg           /* 8px radius */
                      border border-[#E1E4EA]  /* 1px #E1E4EA */
                      bg-white             /* #FFFFFF */
                      px-[6px] py-[6px]    /* 6px padding all around */
                      flex items-center justify-center gap-[2px] /* 2px between icon/text */
                      text-sm font-medium text-[#525866] /* 14px/20px, 500, #525866 */
                      shadow-[0_1px_2px_0_rgba(10,13,20,0.03)] /* 0 1px 2px 0 rgba(10,13,20,0.03) */
                      transition-colors
                      hover:bg-bg-weak-50
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                    onClick={handleHireClick}
                    disabled={disableActions}
                    aria-label={currentUserProfile?.id === worker?.id ? "Cannot hire yourself" : `Hire ${displayName}`}
                  >
                    <div className="flex items-center gap-[2px]">
                      Hire <RiArrowDropRightLine className="size-7" />
                    </div>
                  </button>
                  <button
                    className="
                      w-[100px]
                      rounded-lg
                      border border-transparent /* no visible border */
                      bg-text-strong-950       /* your #20232D */
                      px-[6px] py-[6px]
                      flex items-center justify-center gap-[2px]
                      text-sm font-medium text-white
                      shadow-[0_0_0_1px_rgba(36,38,40,1),0_1px_2px_0_rgba(27,28,29,0.48)]
                      /* 0 0 0 1px rgba(36,38,40,1) + 0 1px 2px 0 rgba(27,28,29,0.48) */
                      transition-colors
                      hover:bg-text-strong-900
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                    onClick={handleOpenChat}
                    disabled={disableActions || isLoadingChat}
                    aria-label={currentUserProfile?.id === worker?.id ? "Cannot message yourself" : `Message ${displayName}`}
                  >
                    {isLoadingChat ? (
                      <RiLoader4Line className="animate-spin" size={18} />
                    ) : (
                      <>
                        <div className='flex items-center gap-[2px]'>

                          Touch
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 stroke-current text-white"
                          >
                            <path
                              d="M6.66641 5.2668L13.7414 2.90846C16.9164 1.85013 18.6414 3.58346 17.5914 6.75846L15.2331 13.8335C13.6497 18.5918 11.0497 18.5918 9.46641 13.8335L8.76641 11.7335L6.66641 11.0335C1.90807 9.45013 1.90807 6.85846 6.66641 5.2668Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8.92578 11.375L11.9091 8.3833"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </>
                    )}
                  </button>
                  <button className="rounded-full text-gray-400 transition-colors hover:bg-bg-weak-50 hover:text-red-500">
                    <RiHeart3Line className="size-[30px]" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-5 flex h-[88px] items-center justify-center px-5 text-text-secondary-600">
                Could not load worker profile.
              </div>
            )}
            {chatError && (
              <p className="text-xs text-red-600 px-5 mt-2 text-center">Error: {chatError}</p>
            )}
          </div>

          <div className="mt-[16px] h-px bg-stroke-soft-200 w-[95%] mx-auto flex-shrink-0" />

          {!isLoading && worker && (
            <div className="px-[24px] pt-4 flex-shrink-0">
              <Tabs.Root value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
                <Tabs.List className="flex justify-start gap-5 px-0">
                  {[
                    { key: 'about', label: 'About' },
                    { key: 'work', label: 'Work' },
                    { key: 'services', label: `Service` },
                    { key: 'reviews', label: 'Review' },
                  ].map(({ key, label }) => (
                    <Tabs.Trigger
                      key={key}
                      value={key}
                      className="
                        inline-flex 
                        justify-start 
                        border-b-2 
                        border-transparent 
                        bg-transparent 
                        px-0
                        py-3 
                        text-[20px] 
                        font-medium 
                        text-text-secondary-600 
                        transition-colors 
                        data-[state=active]:border-black 
                        data-[state=active]:text-text-strong-950 
                        data-[state=active]:bg-transparent
                      "
                    >
                      {label}
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>
              </Tabs.Root>
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-[24px] py-5">
            {isLoading ? (
              <div className="flex h-full items-center justify-center">
                <RiLoader4Line className="size-10 animate-spin text-text-secondary-600" />
              </div>
            ) : worker ? (
              <>
                {activeTab === 'about' && (
                  <>
                    <AboutSection about={displayBio} />

                    <div className="mt-8 flex items-center justify-between">
                      <h3 className="text-[20px] font-semibold text-text-strong-950 pb-1 border-b border-text-strong-950">
                        Work
                      </h3>
                    </div>
                    <div className="divide-y divide-stroke-soft-200">
                      {worker.music_data && worker.music_data.length > 0 ? (
                        worker.music_data.map((item: MusicItem, i) => (
                          <WorkItem
                            key={i}
                            url={item.url}
                            title={item.title}
                            remarks={item.remarks ?? ''}
                            sellerName={displayName}
                            sellerAvatarUrl={displayAvatar ?? null}
                            duration={`0:${(i % 60).toString().padStart(2, '0')}`}
                            bpm={`${90 + (i * 5) % 60} BPM`}
                            genres={['Pop', 'Electronic', 'Vocal'].slice(i % 2, (i % 2) + 2)}
                          />
                        ))
                      ) : (
                        <p className="py-4 text-sm text-text-secondary-600">No work items uploaded yet.</p>
                      )}
                    </div>

                    <h3 className="mt-8 inline-block text-[20px] font-semibold text-text-strong-950 pb-1 border-b border-text-strong-950">
                      Service
                    </h3>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {services && services.length > 0 ? (
                        services.slice(0, 3).map((svc) => (
                          <ServiceCard
                            key={svc.id}
                            service={svc}
                            sellerAvatarUrl={displayAvatar ? displayAvatar : undefined}
                            sellerName={displayName}
                          />
                        ))
                      ) : (
                        <p className="text-sm text-text-secondary-600 col-span-full">No services found for this worker.</p>
                      )}
                    </div>

                    <h3 className="mt-8 inline-block text-[20px] font-semibold text-text-strong-950 pb-1 border-b border-text-strong-950">
                      Review
                    </h3>
                    <div className="mt-4 space-y-5">
                      {placeholderWorkerData.reviews.map((r) => (
                        <ReviewItem key={r.id} review={r} />
                      ))}
                    </div>
                  </>
                )}

                {activeTab === 'work' && (
                  <div className="divide-y divide-stroke-soft-200">
                    {worker.music_data && worker.music_data.length > 0 ? (
                      worker.music_data.map((item: MusicItem, i) => (
                        <WorkItem
                          key={i}
                          url={item.url}
                          title={item.title}
                          remarks={item.remarks ?? ''}
                          sellerName={displayName}
                          sellerAvatarUrl={displayAvatar ?? null}
                          duration={`0:${(i % 60).toString().padStart(2, '0')}`}
                          bpm={`${90 + (i * 5) % 60} BPM`}
                          genres={['Pop', 'Electronic', 'Vocal'].slice(i % 2, (i % 2) + 2)}
                        />
                      ))
                    ) : (
                      <div className="text-center text-text-secondary-600 py-10">
                        <p>No work items uploaded yet.</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'services' && (
                  <>
                    {services && services.length > 0 ? (
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
                        {services.map((svc) => (
                          <ServiceCard
                            key={svc.id}
                            service={svc}
                            sellerAvatarUrl={displayAvatar ? displayAvatar : undefined}
                            sellerName={displayName}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-text-secondary-600 py-10">
                        <p>This worker currently has no services listed.</p>
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-5 divide-y divide-stroke-soft-200">
                    {placeholderWorkerData.reviews.length > 0 ? (
                      placeholderWorkerData.reviews.map((review) => (
                        <ReviewItem key={review.id} review={review} />
                      ))
                    ) : (
                      <div className="text-center text-text-secondary-600 py-10">
                        <p>No reviews available yet.</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="flex h-full items-center justify-center text-text-secondary-600">
                Could not load worker profile content.
              </div>
            )}
          </div>
        </div>

        {worker && (
          <MusicUploadDialog
            open={isUploadModalOpen}
            onOpenChange={setIsUploadModalOpen}
            userId={worker.id}
            onUploadComplete={handleUploadComplete}
          />
        )}
        {activeChat && currentUserProfile && worker && (
          <ChatPopupWrapper
            key={activeChat.id}
            chat={activeChat}
            initialMessages={activeChatMessages}
            currentUserProfile={currentUserProfile}
            otherUserProfile={worker}
            currentUserId={currentUserProfile.id}
            isLoadingMessages={isLoadingMessages}
            onClose={handleCloseChat}
            position="bottom-right"
          />
        )}
      </Drawer.Content>
    </Drawer.Root>
  );
};

export default WorkerProfileDrawer;
