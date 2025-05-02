'use client';

import React, { useState, useEffect } from 'react';
import * as TabMenuHorizontal from '@/components/ui/tab-menu-horizontal';
import MusicUploadDialog from '@/components/blocks/music-upload-dialog';
import { ProfilePageSidebar } from '@/components/worker/profile/profile-page-sidebar';
import { ServiceCard } from '@/components/worker/profile/service-card';
import { WorkItem } from '@/components/worker/profile/work-item';
import { ReviewItem } from '@/components/worker/profile/review-item';
import { AboutSection } from '@/components/worker/profile/AboutSection';
import { RiArrowUpCircleLine, RiUploadCloud2Line, RiLoader4Line } from '@remixicon/react';
import { User, Service, MusicItem } from '@/utils/supabase/types';
import { serviceOperations } from '@/utils/supabase/database';

// --- Restore Mock Data ---
const workerData = {
  id: '1',
  name: 'Cleve Music', // This won't be used directly, user prop takes precedence
  avatar: 'https://via.placeholder.com/100', // This won't be used directly
  rating: 4.9, // Use this for mock display
  reviewCount: 125, // Use this for mock display
  isGoogle: true, // This won't be used directly
  socialLinks: ['twitch', 'twitter', 'google'], // This won't be used directly
  about: {
    description: // This won't be used directly, user.bio takes precedence
      'Next.js & TypeScript Specialist\n5+ Years Experience in Frontend Development\nReal Time Web Applications\nFreelance & Startup Experience\nProblem Solving, High-Performance UIs',
  },
  skills: [], // Keep empty, handled by sidebar
  awards: [], // Keep empty, handled by sidebar
  workItems: [
    {
      title: 'Funky Bounce Logo',
      description: 'Worker Remarks Text',
      duration: '0:22',
      bpm: '112 BPM',
      genres: ['Mixing', 'Singing', 'Jazz', 'Hip hop', 'K pop'],
    },
    // Add other mock work items as needed...
    {
      title: 'Another Work Item',
      description: 'More Remarks',
      duration: '1:30',
      bpm: '90 BPM',
      genres: ['Pop', 'Mixing'],
    },
  ],
  reviews: [
    {
      id: 'mock-rev-1',
      reviewer: 'Cleve Music',
      reviewerAvatar: 'https://via.placeholder.com/40',
      rating: 4.9,
      date: 'Jan 8, 2023',
      contractTitle: 'Contract title text here..ntr',
      content:
        'idence.123confidence.123confidence.123cidence.123confidence.123confidence.',
      price: 1000,
    },
    // Add other mock reviews...
    {
      id: 'mock-rev-2',
      reviewer: 'Another Client',
      reviewerAvatar: 'https://via.placeholder.com/40?img=2',
      rating: 5.0,
      date: 'Feb 15, 2023',
      contractTitle: 'Second contract title',
      content:
        'Excellent work, delivered on time!',
      price: 500,
    },
  ],
};
// --- End Restore Mock Data ---

interface SellerProfilePageProps {
  user: User;
}

export default function SellerProfilePage({ user }: SellerProfilePageProps) {
  const [activeTab, setActiveTab] = useState('about');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [errorServices, setErrorServices] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      if (!user?.id) {
        setIsLoadingServices(false);
        setErrorServices('Seller ID is missing.');
        return;
      }

      setIsLoadingServices(true);
      setErrorServices(null);
      try {
        const fetchedServices = await serviceOperations.getServicesBySellerId(user.id);
        console.log('Fetched services:', fetchedServices);
        setServices(fetchedServices);
      } catch (error) {
        console.error('Error fetching services:', error);
        setErrorServices('Failed to load services.');
      } finally {
        setIsLoadingServices(false);
      }
    }

    fetchServices();
  }, [user?.id]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <>
            <AboutSection about={user.bio ?? 'This seller hasn\'t added a bio yet.'} />

            {/* 1) Work - Use workerData */}
            <div className="mt-8 flex items-center justify-between">
              <h3 className="text-xl sm:text-xl font-semibold text-text-strong-950 pb-1 border-b-2 border-text-strong-950">
                Work
              </h3>
              <button
                className="
                  flex items-center justify-center gap-[2px]
                  w-[90px] h-[32px]
                  rounded-lg
                  shadow-[0_1px_2px_rgba(27,28,29,0.48),0_0_0_1px_#242628]
                "
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%), #20232D'
                }}
                onClick={() => setIsUploadModalOpen(true)}
              >
                <RiArrowUpCircleLine className="size-5 text-white" />
                <span className="text-[14px] font-medium leading-5 text-white">
                  Upload
                </span>
              </button>
            </div>
            <div className="divide-y divide-stroke-soft-200">
              {/* Use user.music_data if available */}
              {user.music_data && user.music_data.length > 0 ? (
                user.music_data.map((item: MusicItem, i) => (
                  <WorkItem
                    key={i}
                    url={item.url}
                    title={item.title}
                    remarks={item.remarks ?? ''}
                    sellerName={user.full_name ?? user.username ?? 'Seller'}
                    sellerAvatarUrl={user.avatar_url ?? null}
                    duration={`0:${(i % 60).toString().padStart(2, '0')}`}
                    bpm={`${90 + (i * 5) % 60} BPM`}
                    genres={['Pop', 'Electronic', 'Vocal'].slice(i % 2, (i % 2) + 2)}
                  />
                ))
              ) : (
                <p className="py-4 text-text-secondary-400">No work items uploaded yet.</p>
              )}
            </div>

            {/* 2) Services - Use fetched services */}
            <h3 className="inline-block text-xl sm:text-2xl font-semibold text-text-strong-950 mt-8 pb-1 border-b-2 border-text-strong-950">Service</h3>
            <div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {isLoadingServices ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="border border-stroke-soft-200 rounded-lg p-4 animate-pulse">
                    <div className="h-32 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))
              ) : errorServices ? (
                <p className="py-4 text-red-600 col-span-full">{errorServices}</p>
              ) : services.length > 0 ? (
                services.slice(0, 3).map((svc) => (
                  <ServiceCard
                    key={svc.id}
                    service={svc}
                    rating={workerData.rating}
                    reviewCount={workerData.reviewCount}
                  />
                ))
              ) : (
                <p className="py-4 text-text-secondary-400 col-span-full">No services offered yet.</p>
              )}
            </div>

            {/* 3) Reviews - Use workerData */}
            <h3 className="inline-block text-xl sm:text-2xl font-semibold text-text-strong-950 mt-8 pb-1 border-b-2 border-text-strong-950">Review</h3>
            <div className='mt-8 space-y-5 divide-y divide-stroke-soft-200'>
              {workerData.reviews.length > 0 ? (
                workerData.reviews.map((r) => (
                  <ReviewItem key={r.id} review={r} />
                ))
              ) : (
                <p className="py-4 text-text-secondary-400">No reviews yet.</p>
              )}
            </div>
          </>
        );
      case 'work':
        return (
          <div className='divide-y divide-stroke-soft-200'>
            {/* TODO: Add loading state for music_data if fetched separately */}
            {user.music_data && user.music_data.length > 0 ? (
              user.music_data.map((item: MusicItem, index) => (
                <WorkItem
                  key={index}
                  url={item.url}
                  title={item.title}
                  remarks={item.remarks ?? ''}
                  sellerName={user.full_name ?? user.username ?? 'Seller'}
                  sellerAvatarUrl={user.avatar_url ?? null}
                  duration={`0:${(index % 60).toString().padStart(2, '0')}`}
                  bpm={`${90 + (index * 5) % 60} BPM`}
                  genres={['Pop', 'Electronic', 'Vocal'].slice(index % 2, (index % 2) + 2)}
                />
              ))
            ) : (
              <p className="py-4 text-text-secondary-400">No work items uploaded yet.</p>
            )}
          </div>
        );
      case 'services':
        return (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {isLoadingServices ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="border border-stroke-soft-200 rounded-lg p-4 animate-pulse">
                  <div className="h-32 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))
            ) : errorServices ? (
              <p className="py-4 text-red-600 col-span-full">{errorServices}</p>
            ) : services.length > 0 ? (
              services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  rating={workerData.rating}
                  reviewCount={workerData.reviewCount}
                />
              ))
            ) : (
              <p className="py-4 text-text-secondary-400 col-span-full">No services offered yet.</p>
            )}
          </div>
        );
      case 'reviews':
        return (
          <div className='space-y-5 divide-y divide-stroke-soft-200'>
            {workerData.reviews.length > 0 ? (
              workerData.reviews.map((review) => (
                <ReviewItem key={review.id} review={review} />
              ))
            ) : (
              <p className="py-4 text-text-secondary-400">No reviews yet.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  // TODO: Add state and handler for updated music data if needed for refresh
  const handleUploadComplete = (updatedMusicData: any[]) => {
    console.log('Upload complete, new music data:', updatedMusicData);
    // Here you could potentially update local state to refresh the work items
    // For now, just logging it.
  };

  return (
    <div className='px-6 py-5'>
      {/* Two-column layout - Changed to Flexbox */}
      <div className='flex gap-8'>
        {/* Left Sidebar Column */}
        <div className='w-[352px] shrink-0'> {/* Set fixed width and prevent shrinking */}
          <div className='sticky top-20'>
            <ProfilePageSidebar userProfile={user} />
          </div>
        </div>

        {/* Right Main Content Column (Tabs) */}
        <div className='flex-1 overflow-hidden max-w-[1000px] flex flex-col gap-6'> {/* Use flex-1, keep overflow/max-h/flex/gap */}
          {/* Tabs */}
          <div className='border-b border-stroke-soft-200'>
            <TabMenuHorizontal.Root
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabMenuHorizontal.List>
                <TabMenuHorizontal.Trigger value='about'>
                  About
                </TabMenuHorizontal.Trigger>
                <TabMenuHorizontal.Trigger value='work'>
                  Work
                </TabMenuHorizontal.Trigger>
                <TabMenuHorizontal.Trigger value='services'>
                  Service
                </TabMenuHorizontal.Trigger>
                <TabMenuHorizontal.Trigger value='reviews'>
                  Review
                </TabMenuHorizontal.Trigger>
              </TabMenuHorizontal.List>
            </TabMenuHorizontal.Root>
          </div>

          {/* Tab Content Area */}
          <div>{renderTabContent()}</div>
        </div>
      </div>

      {/* File Upload Modal - Use the new MusicUploadDialog */}
      <MusicUploadDialog
        open={isUploadModalOpen}
        onOpenChange={setIsUploadModalOpen}
        userId={user.id}
        onUploadComplete={handleUploadComplete}
      />
    </div>
  );
} 