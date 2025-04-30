'use client';

import React, { useState } from 'react';
import * as TabMenuHorizontal from '@/components/ui/tab-menu-horizontal';
import BlockFileUploadDialog from '@/components/blocks/block-file-upload-dialog';
import { ProfileSidebar } from '@/components/worker/profile/profile-sidebar';
import { ServiceCard } from '@/components/worker/profile/service-card';
import { WorkItem } from '@/components/worker/profile/work-item';
import { ReviewItem } from '@/components/worker/profile/review-item';
import { AboutSection } from '@/components/worker/profile/AboutSection';
import { RiArrowUpCircleLine, RiUploadCloud2Line } from '@remixicon/react';

// Mock data for the worker profile
const workerData = {
  id: '1',
  name: 'Cleve Music',
  avatar: 'https://via.placeholder.com/100',
  rating: 4.9,
  reviewCount: 125,
  isGoogle: true,
  socialLinks: ['twitch', 'twitter', 'google'],
  about: {
    description:
      'Next.js & TypeScript Specialist\n5+ Years Experience in Frontend Development\nReal Time Web Applications\nFreelance & Startup Experience\nProblem Solving, High-Performance UIs',
  },
  skills: [
    { name: 'Singer', details: 'Female', price: '$150 per song' },
    { name: 'Songwriter', details: 'Lyric', contactForPricing: true },
    {
      name: 'Top-line writer',
      details: 'vocal melody',
      contactForPricing: true,
    },
    { name: 'Vocal Tuning', details: '', contactForPricing: true },
  ],
  awards: [
    'Grammy',
    'Billboard Music',
    'American Music',
    'BRIT',
    'MTV Music',
    'Eurovision Awards',
  ],
  workItems: [
    {
      title: 'Funky Bounce Logo',
      description: 'Worker Remarks Text',
      duration: '0:22',
      bpm: '112 BPM',
      genres: ['Mixing', 'Singing', 'Jazz', 'Hip hop', 'K pop'],
    },
    {
      title: 'Funky Bounce Logo',
      description: 'Worker Remarks Text',
      duration: '0:22',
      bpm: '112 BPM',
      genres: ['Mixing', 'Singing', 'Jazz', 'Hip hop', 'K pop'],
    },
    {
      title: 'Funky Bounce Logo',
      description: 'Worker Remarks Text',
      duration: '0:22',
      bpm: '112 BPM',
      genres: ['Mixing', 'Singing', 'Jazz', 'Hip hop', 'K pop'],
    },
    {
      title: 'Funky Bounce Logo',
      description: 'Worker Remarks Text',
      duration: '0:22',
      bpm: '112 BPM',
      genres: ['Mixing', 'Singing', 'Jazz', 'Hip hop', 'K pop'],
    },
    {
      title: 'Funky Bounce Logo',
      description: 'Worker Remarks Text',
      duration: '0:22',
      bpm: '112 BPM',
      genres: ['Mixing', 'Singing', 'Jazz', 'Hip hop', 'K pop'],
    },
    {
      title: 'Funky Bounce Logo',
      description: 'Worker Remarks Text',
      duration: '0:22',
      bpm: '112 BPM',
      genres: ['Mixing', 'Singing', 'Jazz', 'Hip hop', 'K pop'],
    },
  ],
  services: [
    {
      id: '1',
      title: 'Draw catchy and eye-catching illustrations anime',
      image: 'bg-gradient-to-br from-blue-400 to-purple-500',
      price: 101,
      rating: 4.9,
      reviewCount: 125,
    },
    {
      id: '2',
      title: 'Draw catchy and eye-catching illustrations anime',
      image: 'bg-gradient-to-br from-blue-400 to-purple-500',
      price: 101,
      rating: 4.9,
      reviewCount: 125,
    },
    {
      id: '3',
      title: 'Draw catchy and eye-catching illustrations anime',
      image: 'bg-gradient-to-br from-blue-400 to-purple-500',
      price: 101,
      rating: 4.9,
      reviewCount: 125,
    },
  ],
  reviews: [
    {
      id: '1',
      reviewer: 'Cleve Music',
      reviewerAvatar: 'https://via.placeholder.com/40',
      rating: 4.9,
      date: 'Jan 8, 2023',
      contractTitle: 'Contract title text here...Contract title text here..ntr',
      content:
        'idence.123confidence.123confidence.123cidence.123confidence.123confidence.123cidence.123confidence.123confidence.123 e.123 idence.123confidence.123confidence.123cidence.123confidence.123confidence.',
      price: 1000,
    },
    {
      id: '2',
      reviewer: 'Cleve Music',
      reviewerAvatar: 'https://via.placeholder.com/40',
      rating: 4.9,
      date: 'Jan 8, 2023',
      contractTitle: 'Contract title text here...Contract title text here..ntr',
      content:
        'idence.123confidence.123confidence.123cidence.123confidence.123confidence.123cidence.123confidence.123confidence.123 e.123 idence.123confidence.123confidence.123cidence.123confidence.123confidence.',
      price: 1000,
    },
  ],
};

export default function WorkerDetailPage() {
  const worker = workerData;
  const [activeTab, setActiveTab] = useState('work');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Function to render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <>

            <AboutSection about={worker.about.description} />

            {/* 1) Work */}
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
              {worker.workItems.map((item, i) => (
                <WorkItem key={i} item={item} />
              ))}
            </div>


            {/* 2) Services */}
            <h3 className="inline-block text-xl sm:text-2xl font-semibold text-text-strong-950 mt-8 pb-1 border-b-2 border-text-strong-950">Service</h3>
            <div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {worker.services.map((svc) => (
                <ServiceCard key={svc.id} service={svc} />
              ))}
            </div>

            {/* 3) Reviews */}
            <h3 className="inline-block text-xl sm:text-2xl font-semibold text-text-strong-950 mt-8 pb-1 border-b-2 border-text-strong-950">Review</h3>
            <div className='mt-8 space-y-5 divide-y divide-stroke-soft-200'>
              {worker.reviews.map((r) => (
                <ReviewItem key={r.id} review={r} />
              ))}
            </div>
          </>
        );
      case 'work':
        return (
          <div className='divide-y divide-stroke-soft-200'>
            {worker.workItems.map((item, index) => (
              <WorkItem key={index} item={item} />
            ))}
          </div>
        );
      case 'services':
        return (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {worker.services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        );
      case 'reviews':
        return (
          <div className='space-y-5 divide-y divide-stroke-soft-200'>
            {worker.reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
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
            <ProfileSidebar worker={worker} />
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
