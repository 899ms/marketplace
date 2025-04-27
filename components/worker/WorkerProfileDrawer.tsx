'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import * as Avatar from '@/components/ui/avatar';
import * as Badge from '@/components/ui/badge';
import * as Drawer from '@/components/ui/drawer';
import * as Tabs from '@/components/ui/tabs';
import {
  RiCloseLine,
  RiExternalLinkLine,
  RiStarFill,
  RiGoogleFill,
  RiArrowRightLine,
  RiHeartLine,
  RiPlayLine,
  RiBookmarkLine,
} from '@remixicon/react';
// Assuming ServiceCardSmall is a variant or separate component for the drawer
// import ServiceCardSmall from '@/components/cards/ServiceCardSmall';

// Define necessary types (replace with actual types if available)
interface Service {
  id: number | string;
  title: string;
  rating: number;
  reviews: number;
  price: number | string;
  image?: string; // Optional image for the card
}
interface Review {
  id: number | string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  date: string;
  contractTitle: string;
  content: string;
  amount: string | number;
}
interface WorkItem {
  id: number | string;
  title: string;
  remarks: string;
  tags: string[];
  duration: string;
  bpm: string;
}

interface WorkerProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  // workerData?: Worker; // Pass actual worker data later
}

const WorkerProfileDrawer: React.FC<WorkerProfileDrawerProps> = ({
  isOpen,
  onClose,
  // workerData
}) => {
  const [activeTab, setActiveTab] = useState('About');

  // Mock data within the component for now
  const mockWorkerData = {
    name: 'Cleve Music',
    avatar: 'https://via.placeholder.com/48',
    rating: 4.9,
    reviews: 125,
    specialty: 'Specialist',
    about:
      'TypeScript Specialist Next.js & TypeScript Specialist Next.js & TypeScript Specialist Next.js & TypeScript Specialist Next.js & TypeScript Specialist Next.js & TypeScript Specialist Next.js & TypeScript Specialist Next.js & TypeScript Specialist Next.js & TypeScript Specialist Next.js & TypeScript Specialist Next.js & TypeScript Specialist Next.js & TypeScript Specialist Next.js & TypeScript Specialist Next.js & 5+ Years Experience in Frontend Development Next.js & TypeScript Specialist Next.js & TypeScript...',
    workItems: [
      {
        id: 1,
        title: 'Funky Bounce Logo',
        remarks: 'Worker Remarks Text',
        tags: ['Mixing', 'Singing', 'Jazz'],
        duration: '0:22',
        bpm: '112 BPM',
      },
      {
        id: 2,
        title: 'Another Track',
        remarks: 'Some details',
        tags: ['Pop', 'Mastering'],
        duration: '3:15',
        bpm: '120 BPM',
      },
      // Add more work items...
    ] as WorkItem[],
    services: [
      {
        id: 1,
        title: 'Draw catchy illustrations anime',
        rating: 4.9,
        reviews: 125,
        price: '$101',
      },
      {
        id: 2,
        title: 'Professional Voice Over',
        rating: 5.0,
        reviews: 80,
        price: '$50',
      },
      // Add more services...
    ] as Service[],
    reviewsData: [
      {
        id: 1,
        reviewerName: 'Cleve Music',
        reviewerAvatar: 'https://via.placeholder.com/32',
        rating: 4.9,
        date: 'Jan 8, 2023',
        contractTitle: 'Contract title text here...',
        content:
          'idence.123confidence.123confidence.123cidence.123confidence.123confidence.123cidence.123confidence.123confidence.123 e.123 idence.123confidence.123confidence.123cidence.123confidence.123confidence.',
        amount: '$1000.00',
      },
      {
        id: 2,
        reviewerName: 'Another Client',
        reviewerAvatar: 'https://via.placeholder.com/32',
        rating: 4.5,
        date: 'Feb 15, 2023',
        contractTitle: 'Different contract...',
        content: 'Good work, delivered on time.',
        amount: '$500.00',
      },
      // Add more reviews...
    ] as Review[],
  };

  // Replace mockWorkerData with workerData when passed as prop
  const displayData = mockWorkerData; // workerData || mockWorkerData;

  // Use useEffect to handle focus when the drawer is closed
  useEffect(() => {
    if (!isOpen) {
      // Remove focus from any element when drawer closes
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  }, [isOpen]);

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {/* Overlay is typically handled by Drawer.Root or Drawer.Content in libraries like vaul */}
      {/* {isOpen && (
        <Drawer.Overlay className='fixed inset-0 z-40 bg-black/40' />
      )} */}
      <Drawer.Content className='shadow-xl fixed inset-y-0 right-0 z-50 h-[100dvh] w-full max-w-md overflow-hidden bg-white sm:max-w-lg md:max-w-xl lg:max-w-2xl'>
        <div className='flex h-full flex-col'>
          {/* Header with Close Button and External Link */}
          <div className='border-b border-stroke-soft-200 px-5 py-4'>
            <div className='flex items-center justify-between'>
              <Drawer.Close asChild>
                <button className='focus-visible:ring-ring rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'>
                  <RiCloseLine className='text-text-secondary-600 size-5' />
                  <span className='sr-only'>Close</span>
                </button>
              </Drawer.Close>
              <Link
                href='#' // TODO: Link to actual worker profile page
                className='text-text-primary-600 text-sm flex items-center gap-1.5 font-medium'
              >
                Open in new tab <RiExternalLinkLine className='size-4' />
              </Link>
            </div>

            {/* Profile Information */}
            <div className='mt-5 flex items-start justify-between'>
              <div className='flex items-center gap-4'>
                <Avatar.Root size='48'>
                  <Avatar.Image
                    src={displayData.avatar}
                    alt={displayData.name}
                  />
                </Avatar.Root>
                <div>
                  <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
                    {' '}
                    {/* Added flex-wrap */}
                    <h2 className='text-xl font-semibold text-text-strong-950'>
                      {displayData.name}
                    </h2>
                    <div className='text-sm flex items-center gap-0.5'>
                      <RiStarFill className='size-4 text-yellow-400' />
                      <span className='text-text-secondary-600'>
                        {displayData.rating} ({displayData.reviews})
                      </span>
                    </div>
                  </div>
                  <div className='text-sm text-text-secondary-600 mt-1 flex gap-1'>
                    <RiGoogleFill className='size-4' />
                    <RiGoogleFill className='size-4' />
                    <RiGoogleFill className='size-4' />
                    <span>{displayData.specialty}</span>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <button className='text-sm rounded-md border border-stroke-soft-200 px-3.5 py-2 font-medium text-text-strong-950 transition-colors hover:bg-bg-weak-50'>
                  Hire <RiArrowRightLine className='ml-1.5 inline size-3.5' />
                </button>
                <button className='text-sm hover:bg-text-strong-900 flex items-center justify-center rounded-md bg-text-strong-950 px-3.5 py-2 font-medium text-white transition-colors'>
                  Touch{' '}
                  <RiExternalLinkLine className='ml-1.5 inline size-3.5' />
                </button>
                <button className='text-text-secondary-600 flex items-center justify-center rounded-full p-1.5 transition-colors hover:bg-bg-weak-50 hover:text-red-500'>
                  <RiHeartLine className='size-5' />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className='border-b border-stroke-soft-200'>
            <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
              <Tabs.List className='flex border-0 bg-transparent p-0'>
                {['About', 'Work', 'Service', 'Review'].map((tabName) => (
                  <Tabs.Trigger
                    key={tabName}
                    value={tabName}
                    className='text-sm text-text-secondary-600 flex-1 border-b-2 border-transparent px-4 py-3 text-center font-medium transition-colors data-[state=active]:border-primary-base data-[state=active]:text-text-strong-950'
                  >
                    {tabName}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
            </Tabs.Root>
          </div>

          {/* Content Area - scrollable */}
          <div className='flex-1 overflow-y-auto overflow-x-hidden'>
            {/* About Tab Content */}
            {activeTab === 'About' && (
              <div className='p-5'>
                <p className='text-text-secondary-600 whitespace-pre-wrap text-paragraph-sm leading-relaxed'>
                  {' '}
                  {/* Added whitespace-pre-wrap */}
                  {displayData.about}
                </p>
                {/* Consider adding a 'More' button if content is very long */}
              </div>
            )}

            {/* Work Tab Content */}
            {activeTab === 'Work' && (
              <div className='divide-y divide-stroke-soft-200'>
                {displayData.workItems.map((item) => (
                  <div
                    key={item.id}
                    className='flex items-center justify-between gap-3 p-5'
                  >
                    <div className='flex items-center gap-3.5'>
                      <button className='bg-bg-subtle-100 hover:bg-bg-subtle-200 flex size-11 items-center justify-center rounded-full transition-colors'>
                        <RiPlayLine className='size-5 text-text-strong-950' />
                      </button>
                      <div>
                        <p className='font-medium text-text-strong-950'>
                          {item.title}
                        </p>
                        <p className='text-xs text-text-secondary-600'>
                          {item.remarks}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-4'>
                      <div className='hidden gap-1 lg:flex'>
                        {item.tags.map((tag) => (
                          <Badge.Root key={tag} variant='light' size='small'>
                            {tag}
                          </Badge.Root>
                        ))}
                      </div>
                      <div className='text-right'>
                        <p className='font-medium text-text-strong-950'>
                          {item.duration}
                        </p>
                        <p className='text-xs text-text-secondary-600'>
                          {item.bpm}
                        </p>
                      </div>
                      <button className='text-text-secondary-600 hover:text-text-primary-600 rounded-full p-1.5 transition-colors hover:bg-bg-weak-50'>
                        <RiBookmarkLine className='size-5' />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Service Tab Content */}
            {activeTab === 'Service' && (
              <div className='grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-3'>
                {displayData.services.map((service) => (
                  // Use a dedicated Service Card component here if available
                  // For now, duplicating the simple card structure
                  <div
                    key={service.id}
                    className='shadow-sm hover:shadow-md overflow-hidden rounded-lg border border-stroke-soft-200 bg-bg-white-0 transition-all'
                  >
                    <div className='relative h-40 w-full bg-gradient-to-br from-blue-400 to-purple-500'>
                      {/* Placeholder image or based on service.image */}
                    </div>
                    <div className='p-3.5'>
                      <p className='mb-2.5 line-clamp-2 text-paragraph-sm font-medium text-text-strong-950'>
                        {service.title}
                      </p>
                      <div className='flex items-center justify-between text-paragraph-sm'>
                        <div className='text-text-secondary-600 flex items-center gap-0.5'>
                          <RiStarFill className='size-3.5 text-yellow-400' />
                          <span>
                            {service.rating} ({service.reviews})
                          </span>
                        </div>
                        <span className='font-medium text-text-strong-950'>
                          {service.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Review Tab Content */}
            {activeTab === 'Review' && (
              <div className='divide-y divide-stroke-soft-200'>
                {displayData.reviewsData.map((review) => (
                  <div key={review.id} className='p-5'>
                    <div className='mb-3 flex items-start justify-between'>
                      <div className='flex items-center gap-3'>
                        <Avatar.Root size='32'>
                          <Avatar.Image
                            src={review.reviewerAvatar}
                            alt={review.reviewerName}
                          />
                        </Avatar.Root>
                        <div>
                          <p className='font-medium text-text-strong-950'>
                            {review.reviewerName}
                          </p>
                          <div className='text-xs text-text-secondary-600 flex items-center gap-2'>
                            <div className='flex items-center'>
                              <RiStarFill className='size-3.5 text-yellow-400' />
                              <span>{review.rating}</span>
                            </div>
                            <span>{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <span className='font-medium text-text-strong-950'>
                        {review.amount}
                      </span>
                    </div>
                    <h3 className='mb-2 font-medium text-text-strong-950'>
                      {review.contractTitle}
                    </h3>
                    <p className='text-sm text-text-secondary-600 mb-2.5 line-clamp-3 leading-relaxed'>
                      {' '}
                      {/* Added line-clamp */}
                      {review.content}
                    </p>
                    <button className='text-sm text-text-primary-600 hover:text-text-primary-700 font-medium transition-colors'>
                      More
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Drawer.Content>
    </Drawer.Root>
  );
};

export default WorkerProfileDrawer;
