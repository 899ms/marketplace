'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import * as Avatar from '@/components/ui/avatar';
import * as Drawer from '@/components/ui/drawer';
import * as Tabs from '@/components/ui/tabs';
import {
  RiCloseLine,
  RiExternalLinkLine,
  RiStarFill,
  RiGoogleFill,
  RiArrowRightLine,
  RiHeartLine,
  RiArrowUpCircleLine,
} from '@remixicon/react';

import BlockFileUploadDialog from '@/components/blocks/block-file-upload-dialog';
import { AboutSection } from '@/components/worker/profile/AboutSection';
import { WorkItem } from '@/components/worker/profile/work-item';
import { ServiceCard } from '@/components/worker/profile/service-card';
import { ReviewItem } from '@/components/worker/profile/review-item';

interface WorkerProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const WorkerProfileDrawer: React.FC<WorkerProfileDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'work' | 'services' | 'reviews'>('about');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const worker = {
    name: 'Cleve Music',
    avatar: 'https://via.placeholder.com/64',   // bigger avatar placeholder
    rating: 4.9,
    reviewCount: 125,
    specialty: 'Next.js & TypeScript Specialist',
    about:
      'Next.js & TypeScript Specialist\n5+ Years Experience in Front-end Development\nReal-time Web Applications\nFreelance & Startup Experience\nProblem Solving, High-Performance UIs',
    workItems: [
      {
        title: 'Funky Bounce Logo',
        description: 'Worker remarks text',
        duration: '0:22',
        bpm: '112 BPM',
        genres: ['Mixing', 'Singing', 'Jazz'],
      },
      {
        title: 'Another Track',
        description: 'Some details',
        duration: '3:15',
        bpm: '120 BPM',
        genres: ['Pop', 'Mastering'],
      },
    ],
    services: [
      {
        id: '1',
        title: 'Draw catchy illustrations anime',
        image: 'bg-gradient-to-br from-blue-400 to-purple-500',
        price: 101,
        rating: 4.9,
        reviewCount: 125,
      },
      {
        id: '2',
        title: 'Professional Voice Over',
        image: 'bg-gradient-to-br from-blue-400 to-purple-500',
        price: 50,
        rating: 5.0,
        reviewCount: 80,
      },
    ],
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

  useEffect(() => {
    if (!isOpen && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [isOpen]);

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Content className="fixed inset-y-0 right-0 z-50 h-[100dvh] w-full max-w-md shadow-xl overflow-hidden bg-white sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <div className="flex h-full flex-col">
          {/* header */}
          <div className="border-b border-stroke-soft-200 px-5 py-4">
            <div className="flex items-center justify-between">
              <Drawer.Close asChild>
                <button className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <RiCloseLine className="size-5 text-text-secondary-600" />
                  <span className="sr-only">Close</span>
                </button>
              </Drawer.Close>

              {/* “Open in new tab” link – blue & underlined */}
              <Link
                href="#"
                className="flex items-center gap-1.5 text-sm font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700"
              >
                Open in new tab <RiExternalLinkLine className="size-4" />
              </Link>
            </div>

            <div className="mt-5 flex items-start justify-between px-5">
              <div className="flex items-center gap-4">
                {/* bigger avatar */}
                <Avatar.Root size="64">
                  <Avatar.Image src={worker.avatar} alt={worker.name} />
                </Avatar.Root>

                <div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <h2 className="text-xl font-semibold text-text-strong-950">
                      {worker.name}
                    </h2>
                    <div className="flex items-center gap-0.5 text-sm text-text-secondary-600">
                      <RiStarFill className="size-4 text-yellow-400" />
                      <span>
                        {worker.rating} ({worker.reviewCount})
                      </span>
                    </div>
                  </div>
                  <div className="mt-1 flex gap-1 text-sm text-text-secondary-600">
                    <RiGoogleFill className="size-4" />
                    <RiGoogleFill className="size-4" />
                    <RiGoogleFill className="size-4" />
                    <span>{worker.specialty}</span>
                  </div>
                </div>
              </div>

              {/* equal-width buttons */}
              <div className="flex items-center gap-3">
                <button className="w-[96px] rounded-md border border-stroke-soft-200 px-3.5 py-2 text-sm font-medium text-text-strong-950 transition-colors hover:bg-bg-weak-50">
                  Hire <RiArrowRightLine className="ml-1.5 inline size-3.5" />
                </button>
                <button className="w-[96px] flex items-center justify-center rounded-md bg-text-strong-950 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-text-strong-900">
                  Touch <RiExternalLinkLine className="ml-1.5 inline size-3.5" />
                </button>
                <button className="rounded-full p-1.5 text-text-secondary-600 transition-colors hover:bg-bg-weak-50 hover:text-red-500">
                  <RiHeartLine className="size-5" />
                </button>
              </div>
            </div>
          </div>

          {/* tabs */}
          <div className="border-b border-stroke-soft-200 px-5">
            <Tabs.Root value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
              <Tabs.List className="flex p-0">
                {[
                  { key: 'about', label: 'About' },
                  { key: 'work', label: 'Work' },
                  { key: 'services', label: 'Service' },
                  { key: 'reviews', label: 'Review' },
                ].map(({ key, label }) => (
                  <Tabs.Trigger
                    key={key}
                    value={key}
                    className="flex-1 border-b-2 border-transparent bg-transparent px-4 py-3 text-center text-sm font-medium text-text-secondary-600 transition-colors data-[state=active]:border-primary-base data-[state=active]:text-text-strong-950 data-[state=active]:bg-transparent"
                  >
                    {label}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
            </Tabs.Root>
          </div>

          {/* content */}
          <div className="flex-1 overflow-x-hidden overflow-y-auto px-5 py-5">
            {activeTab === 'about' && (
              <>
                <AboutSection about={worker.about} />

                {/* Work section */}
                <div className="mt-8 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-text-strong-950 pb-1 border-b-2 border-text-strong-950">
                    Work
                  </h3>
                  <button
                    className="flex h-[32px] w-[90px] items-center justify-center gap-[2px] rounded-lg shadow-[0_1px_2px_rgba(27,28,29,0.48),0_0_0_1px_#242628]"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%), #20232D',
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

                {/* Services */}
                <h3 className="mt-8 inline-block text-xl sm:text-2xl font-semibold text-text-strong-950 pb-1 border-b-2 border-text-strong-950">
                  Service
                </h3>
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {worker.services.map((svc) => (
                    <ServiceCard key={svc.id} service={svc} />
                  ))}
                </div>

                {/* Reviews */}
                <h3 className="mt-8 inline-block text-xl sm:text-2xl font-semibold text-text-strong-950 pb-1 border-b-2 border-text-strong-950">
                  Review
                </h3>
                <div className="mt-8 space-y-5 divide-y divide-stroke-soft-200">
                  {worker.reviews.map((r) => (
                    <ReviewItem key={r.id} review={r} />
                  ))}
                </div>
              </>
            )}

            {activeTab === 'work' && (
              <div className="divide-y divide-stroke-soft-200">
                {worker.workItems.map((item, i) => (
                  <WorkItem key={i} item={item} />
                ))}
              </div>
            )}

            {activeTab === 'services' && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                {worker.services.map((svc) => (
                  <ServiceCard key={svc.id} service={svc} />
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="divide-y divide-stroke-soft-200">
                {worker.reviews.map((r) => (
                  <ReviewItem key={r.id} review={r} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Drawer.Content>

      <BlockFileUploadDialog
        open={isUploadModalOpen}
        onOpenChange={setIsUploadModalOpen}
      />
    </Drawer.Root>
  );
};

export default WorkerProfileDrawer;
