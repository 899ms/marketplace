'use client';

import React, { useState } from 'react';
import * as TabMenuHorizontal from '@/components/ui/tab-menu-horizontal';
import BlockFileUploadDialog from '@/components/blocks/block-file-upload-dialog';
import { ProfilePageSidebar } from '@/components/worker/profile/profile-page-sidebar';
import { ServiceCard } from '@/components/worker/profile/service-card';
import { WorkItem } from '@/components/worker/profile/work-item';
import { ReviewItem } from '@/components/worker/profile/review-item';
import { AboutSection } from '@/components/worker/profile/AboutSection';
import { RiArrowUpCircleLine, RiUploadCloud2Line } from '@remixicon/react';
import { User } from '@/utils/supabase/types';

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
  services: [
    {
      id: 'mock-svc-1',
      title: 'Draw catchy illustrations anime',
      price: 101,
      description: 'Detailed description for catchy anime illustrations.',
      seller_id: 'mock-seller-123',
      audio_url: null,
      lead_time: 3,
      currency: 'USD',
      images: [{ url: 'https://placekitten.com/300/160', name: 'kitten1.jpg', size: 12345 }],
      created_at: new Date().toISOString(), // Keep for type compatibility
      updated_at: new Date().toISOString(), // Keep for type compatibility
      category_id: 'cat-anime',
      skill_levels: ['Intermediate'],
      status: 'active',
      // Add any other fields needed by ServiceCard or ServiceSchema
      tags: [],
      includes: [],
      additional_services: [],
    },
    // Add other mock services...
    {
      id: 'mock-svc-2',
      title: 'Write compelling song lyrics',
      price: 75,
      description: 'Professional songwriting services.',
      seller_id: 'mock-seller-123',
      audio_url: null,
      lead_time: 5,
      currency: 'USD',
      images: [{ url: 'https://placekitten.com/300/161', name: 'kitten2.jpg', size: 23456 }],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category_id: 'cat-songwriting',
      skill_levels: ['Expert'],
      status: 'active',
      tags: [],
      includes: [],
      additional_services: [],
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
              {workerData.workItems.length > 0 ? (
                workerData.workItems.map((item, i) => (
                  <WorkItem key={i} item={item} />
                ))
              ) : (
                <p className="py-4 text-text-secondary-400">No work items uploaded yet.</p>
              )}
            </div>

            {/* 2) Services - Use workerData */}
            <h3 className="inline-block text-xl sm:text-2xl font-semibold text-text-strong-950 mt-8 pb-1 border-b-2 border-text-strong-950">Service</h3>
            <div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {workerData.services.length > 0 ? (
                workerData.services.map((svc) => (
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
            {workerData.workItems.length > 0 ? (
              workerData.workItems.map((item, index) => (
                <WorkItem key={index} item={item} />
              ))
            ) : (
              <p className="py-4 text-text-secondary-400">No work items uploaded yet.</p>
            )}
          </div>
        );
      case 'services':
        return (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {workerData.services.length > 0 ? (
              workerData.services.map((service) => (
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

  return (
    <div className='container mx-auto px-4 py-10'>
      {/* Two-column layout */}
      <div className='grid grid-cols-1 gap-8 md:grid-cols-12'>
        {/* Left Sidebar Column */}
        <div className='md:col-span-4 lg:col-span-3'>
          <div className='sticky top-20'>
            <ProfilePageSidebar userProfile={user} />
          </div>
        </div>

        {/* Right Main Content Column (Tabs) */}
        <div className='md:col-span-8 lg:col-span-9'>
          {/* Tabs */}
          <div className='mb-6 border-b border-stroke-soft-200'>
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
          <div className='min-h-[400px]'>{renderTabContent()}</div>
        </div>
      </div>

      {/* File Upload Modal */}
      <BlockFileUploadDialog
        open={isUploadModalOpen}
        onOpenChange={setIsUploadModalOpen}
      />
    </div>
  );
} 