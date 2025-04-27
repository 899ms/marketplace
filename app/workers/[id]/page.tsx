'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import * as Avatar from '@/components/ui/avatar';
import * as Badge from '@/components/ui/badge';
import * as TabMenuHorizontal from '@/components/ui/tab-menu-horizontal';
import * as Button from '@/components/ui/button';
import * as Tabs from '@/components/ui/tabs';
import * as Modal from '@/components/ui/modal';
import BlockFileUploadDialog from '@/components/blocks/block-file-upload-dialog';
import {
  RiStarFill,
  RiGoogleFill,
  RiPlayLine,
  RiBookmarkLine,
  RiHeartLine,
  RiMoneyDollarCircleLine,
  RiBriefcaseLine,
  RiSparklingLine,
  RiExternalLinkLine,
  RiUploadCloud2Line,
} from '@remixicon/react';
import { cn } from '@/utils/cn';

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

// Service Card Component
const ServiceCard = ({ service }: { service: any }) => {
  return (
    <div className='shadow-sm hover:shadow-md overflow-hidden rounded-lg border border-stroke-soft-200 bg-bg-white-0 transition-all'>
      {/* Image Section with Blue "J" Avatar */}
      <div className={`relative h-40 w-full ${service.image}`}>
        <div className='absolute right-3 top-3'>
          <Avatar.Root size='32' color='blue'>
            <span className='text-label-sm font-medium'>J</span>
          </Avatar.Root>
        </div>
      </div>

      <div className='p-3'>
        {/* Title */}
        <p className='mb-2 line-clamp-2 text-paragraph-sm font-medium text-text-strong-950'>
          {service.title}
        </p>

        {/* Rating and Price */}
        <div className='flex items-center justify-between text-paragraph-sm'>
          <div className='text-text-secondary-600 flex items-center gap-0.5'>
            <RiStarFill className='size-3.5 text-yellow-400' />
            <span>
              {service.rating} ({service.reviewCount})
            </span>
          </div>
          <span className='font-medium text-text-strong-950'>
            ${service.price}
          </span>
        </div>
      </div>
    </div>
  );
};

// Work Item Component
const WorkItem = ({ item }: { item: any }) => {
  return (
    <div className='flex items-center justify-between gap-4 border-b border-stroke-soft-200 py-4 last:border-b-0'>
      <div className='flex items-center gap-3'>
        <button className='bg-bg-subtle-100 hover:bg-bg-subtle-200 flex size-10 items-center justify-center rounded-full transition-colors'>
          <RiPlayLine className='size-5 text-text-strong-950' />
        </button>
        <div>
          <p className='font-medium text-text-strong-950'>{item.title}</p>
          <p className='text-xs text-text-secondary-600'>{item.description}</p>
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <div className='hidden gap-1 md:flex'>
          {item.genres.slice(0, 3).map((genre: string, idx: number) => (
            <Badge.Root key={idx} variant='light' size='small'>
              {genre}
            </Badge.Root>
          ))}
        </div>
        <div className='text-right'>
          <p className='text-text-strong-950'>{item.duration}</p>
          <p className='text-xs text-text-secondary-600'>{item.bpm}</p>
        </div>
        <button className='text-text-secondary-600 hover:text-text-primary-600'>
          <RiBookmarkLine className='size-5' />
        </button>
      </div>
    </div>
  );
};

// Review Item Component
const ReviewItem = ({ review }: { review: any }) => {
  return (
    <div className='border-b border-stroke-soft-200 py-5 last:border-b-0'>
      <div className='mb-3 flex items-start justify-between'>
        <div className='flex items-center gap-3'>
          <Avatar.Root size='32'>
            <Avatar.Image src={review.reviewerAvatar} alt={review.reviewer} />
          </Avatar.Root>
          <div>
            <p className='font-medium text-text-strong-950'>
              {review.reviewer}
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
          ${review.price.toFixed(2)}
        </span>
      </div>

      <h3 className='mb-2 font-medium text-text-strong-950'>
        {review.contractTitle}
      </h3>

      <p className='text-text-secondary-600 text-sm mb-2'>{review.content}</p>

      <button className='text-sm text-text-primary-600 hover:text-text-primary-700 font-medium'>
        More
      </button>
    </div>
  );
};

export default function WorkerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const worker = workerData; // In reality, this would be fetched based on params.id
  const [activeTab, setActiveTab] = useState('Work');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div className='container mx-auto px-4 py-6'>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-12'>
        {/* Left Sidebar */}
        <div className='md:col-span-3'>
          <div className='shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
            {/* Profile Section */}
            <div className='mb-6 flex flex-col items-center p-6 text-center'>
              <Avatar.Root size='80'>
                <Avatar.Image src={worker.avatar} alt={worker.name} />
              </Avatar.Root>

              <h1 className='text-xl mt-3 font-semibold text-text-strong-950'>
                {worker.name}
              </h1>

              <div className='mt-1 flex items-center gap-1'>
                <RiStarFill className='size-4 text-yellow-400' />
                <span className='text-text-secondary-600'>
                  {worker.rating} ({worker.reviewCount})
                </span>
              </div>

              <div className='mt-2 flex items-center gap-1'>
                <RiGoogleFill className='size-4' />
                <RiGoogleFill className='size-4' />
                <RiGoogleFill className='size-4' />
                <span className='text-text-secondary-600 text-sm'>Specia</span>
              </div>

              <div className='mt-4 flex gap-2'>
                <button className='text-sm flex flex-1 items-center justify-center gap-1 rounded-md border border-stroke-soft-200 px-3 py-1.5 font-medium text-text-strong-950 hover:bg-bg-weak-50'>
                  Hire <RiExternalLinkLine className='size-3.5' />
                </button>

                <button className='text-sm hover:bg-text-strong-900 flex flex-1 items-center justify-center gap-1 rounded-md bg-text-strong-950 px-3 py-1.5 font-medium text-white'>
                  Touch <RiExternalLinkLine className='size-3.5' />
                </button>

                <button className='text-text-secondary-600 flex items-center justify-center rounded-full p-1.5 hover:bg-bg-weak-50 hover:text-red-500'>
                  <RiHeartLine className='size-5' />
                </button>
              </div>
            </div>

            {/* Skills Section */}
            <div className='p-4'>
              <h2 className='mb-3 font-semibold text-text-strong-950'>
                Skills
              </h2>
              <div className='space-y-2'>
                {worker.skills.map((skill, idx) => (
                  <div key={idx}>
                    <p className='text-sm font-medium text-text-strong-950'>
                      {skill.name}
                      {skill.details ? ` - ${skill.details}` : ''}
                    </p>
                    {skill.price && (
                      <p className='text-xs text-text-secondary-600'>
                        Average price - {skill.price}
                      </p>
                    )}
                    {skill.contactForPricing && (
                      <p className='text-xs text-text-primary-600'>
                        Contact for pricing
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Awards Section */}
            <div className='p-4'>
              <h2 className='mb-3 font-semibold text-text-strong-950'>
                Awards
              </h2>
              <div className='text-sm text-text-secondary-600 space-y-1'>
                {worker.awards.map((award, idx) => (
                  <p key={idx}>{award}</p>
                ))}
              </div>
            </div>

            {/* About Section */}
            <div className='p-4'>
              <h2 className='mb-3 font-semibold text-text-strong-950'>About</h2>
              <p className='text-sm text-text-secondary-600 mb-6'>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>

              {/* Social Media Icons */}
              <div className='flex items-center gap-4 pt-2'>
                <button className='text-[#6441A5] hover:opacity-80'>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43z' />
                  </svg>
                </button>
                <button className='text-black hover:opacity-80'>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                  </svg>
                </button>
                <button className='hover:opacity-80'>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M21.8055 10.0415H12V14.0415H17.6515C16.827 16.3275 14.6115 18.0415 12 18.0415C8.6865 18.0415 6 15.355 6 12.0415C6 8.72799 8.6865 6.04149 12 6.04149C13.5295 6.04149 14.921 6.60799 15.9805 7.53649L18.809 4.70799C17.023 3.01799 14.634 1.94849 12 1.94849C6.4775 1.94849 2 6.42599 2 12.0415C2 17.657 6.4775 22.0415 12 22.0415C16.9705 22.0415 21.1225 18.5125 21.8055 13.7575C21.9355 13.1975 22 12.6255 22 12.0415C22 11.456 21.9415 10.7575 21.8055 10.0415Z'
                      fill='#4285F4'
                    />
                    <path
                      d='M3.15234 7.3455L6.43784 9.755C7.32684 7.554 9.48034 6.0415 11.9993 6.0415C13.5288 6.0415 14.9203 6.608 15.9798 7.5365L18.8083 4.708C17.0223 3.018 14.6333 1.9485 11.9993 1.9485C8.19434 1.9485 4.88284 4.1715 3.15234 7.3455Z'
                      fill='#EA4335'
                    />
                    <path
                      d='M12.0002 22.0415C14.5832 22.0415 16.9302 21.0115 18.7047 19.405L15.6097 16.785C14.5719 17.5455 13.3039 18.0415 12.0002 18.0415C9.39916 18.0415 7.19066 16.3335 6.35866 14.0575L3.09766 16.5395C4.75266 19.778 8.11366 22.0415 12.0002 22.0415Z'
                      fill='#34A853'
                    />
                    <path
                      d='M21.8055 10.0415H12V14.0415H17.6515C17.2555 15.1185 16.536 16.0295 15.608 16.785L15.6095 16.7835L18.7045 19.4035C18.4855 19.6025 22 17.0415 22 12.0415C22 11.4555 21.9415 10.7575 21.8055 10.0415Z'
                      fill='#FBBC05'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='md:col-span-9'>
          {/* Tab Navigation */}
          <div className='mb-6 border-b border-stroke-soft-200'>
            <TabMenuHorizontal.Root
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabMenuHorizontal.List>
                <TabMenuHorizontal.Trigger value='About'>
                  About
                </TabMenuHorizontal.Trigger>
                <TabMenuHorizontal.Trigger value='Work'>
                  Work
                </TabMenuHorizontal.Trigger>
                <TabMenuHorizontal.Trigger value='Service'>
                  Service
                </TabMenuHorizontal.Trigger>
                <TabMenuHorizontal.Trigger value='Review'>
                  Review
                </TabMenuHorizontal.Trigger>
              </TabMenuHorizontal.List>
            </TabMenuHorizontal.Root>
          </div>

          {/* Tab Content */}
          <div>
            {/* About Tab Content */}
            {activeTab === 'About' && (
              <div>
                <div className='text-text-secondary-600 mb-4 whitespace-pre-line'>
                  {worker.about.description}
                </div>
                <button className='text-sm text-text-primary-600 hover:text-text-primary-700 font-medium'>
                  More
                </button>
              </div>
            )}

            {/* Work Tab Content */}
            {activeTab === 'Work' && (
              <div>
                <div className='mb-4 flex justify-end'>
                  <Button.Root
                    variant='neutral'
                    mode='stroke'
                    onClick={() => setIsUploadModalOpen(true)}
                  >
                    <Button.Icon as={RiUploadCloud2Line} />
                    Upload
                  </Button.Root>
                </div>

                <div className='divide-y divide-stroke-soft-200'>
                  {worker.workItems.map((item, idx) => (
                    <WorkItem key={idx} item={item} />
                  ))}
                </div>
              </div>
            )}

            {/* Service Tab Content */}
            {activeTab === 'Service' && (
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {worker.services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}

            {/* Review Tab Content */}
            {activeTab === 'Review' && (
              <div className='divide-y divide-stroke-soft-200'>
                {worker.reviews.map((review) => (
                  <ReviewItem key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* File Upload Modal */}
      {isUploadModalOpen && (
        <BlockFileUploadDialog
          open={isUploadModalOpen}
          onOpenChange={setIsUploadModalOpen}
        />
      )}
    </div>
  );
}
