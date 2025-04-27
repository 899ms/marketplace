'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import * as Avatar from '@/components/ui/avatar';
import * as Badge from '@/components/ui/badge';
import * as Input from '@/components/ui/input';
import * as Select from '@/components/ui/select';
import * as TabMenuHorizontal from '@/components/ui/tab-menu-horizontal';
import * as Tag from '@/components/ui/tag';
import * as Switch from '@/components/ui/switch';
import * as Drawer from '@/components/ui/drawer';
import * as Tabs from '@/components/ui/tabs';
import {
  RiSearchLine,
  RiStarFill,
  RiCloseLine,
  RiFilter2Line,
  RiInformationLine,
  RiGoogleFill,
  RiFireFill,
  RiMoneyDollarCircleLine,
  RiBriefcaseLine,
  RiSparklingLine,
  RiTimeLine,
  RiExternalLinkLine,
  RiArrowRightLine,
  RiHeartLine,
  RiPlayLine,
  RiBookmarkLine,
} from '@remixicon/react';
import { cn } from '@/utils/cn';

// Reusing ServiceCard from home page with slight modifications for search page
const ServiceCard = () => {
  return (
    <div className='shadow-sm hover:shadow-md overflow-hidden rounded-lg border border-stroke-soft-200 bg-bg-white-0 transition-all'>
      {/* Image Section with Blue "J" Avatar */}
      <div className='relative h-40 w-full bg-gradient-to-br from-blue-400 to-purple-500'>
        <div className='absolute right-3 top-3'>
          <Avatar.Root size='32' color='blue'>
            <span className='text-label-sm font-medium'>J</span>
          </Avatar.Root>
        </div>
      </div>

      <div className='p-3'>
        {/* Title */}
        <p className='mb-2 line-clamp-2 text-paragraph-sm font-medium text-text-strong-950'>
          Draw catchy and eye-catching illustrations anime
        </p>

        {/* Provider Info */}
        <div className='text-text-secondary-600 mb-2 flex items-center gap-1 text-paragraph-xs'>
          <Avatar.Root size='20'>
            <span className='rounded-full bg-blue-100 px-1 py-0.5 text-[10px] text-blue-600'>
              E
            </span>
          </Avatar.Root>
          <span>Cleve Music</span>
          <div className='ml-1 flex'>
            <RiGoogleFill className='size-3.5' />
            <RiGoogleFill className='size-3.5' />
            <RiGoogleFill className='size-3.5' />
          </div>
        </div>

        {/* Rating and Price */}
        <div className='flex items-center justify-between text-paragraph-sm'>
          <div className='text-text-secondary-600 flex items-center gap-0.5'>
            <RiStarFill className='size-3.5 text-yellow-400' />
            <span>4.9 (125)</span>
          </div>
          <span className='font-medium text-text-strong-950'>$101</span>
        </div>
      </div>
    </div>
  );
};

// Worker Profile Drawer Component
const WorkerProfileDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [activeTab, setActiveTab] = useState('About');

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
      {isOpen && <div className='fixed inset-0 z-50 bg-black/40' />}
      <Drawer.Content className='shadow-lg fixed inset-y-0 right-0 z-50 h-full w-full max-w-3xl bg-white sm:max-w-xl md:max-w-2xl'>
        <div className='flex h-full flex-col'>
          {/* Header */}
          <div className='border-b border-stroke-soft-200 p-4'>
            <div className='flex items-center justify-between'>
              <button onClick={onClose} className='text-text-secondary-600'>
                <RiCloseLine className='size-5' />
              </button>
              <Link
                href='#'
                className='text-text-primary-600 text-sm flex items-center gap-1'
              >
                Open in new tab <RiExternalLinkLine className='size-4' />
              </Link>
            </div>

            <div className='mt-4 flex items-start justify-between'>
              <div className='flex items-center gap-3'>
                <Avatar.Root size='40'>
                  <Avatar.Image
                    src='https://via.placeholder.com/40'
                    alt='Cleve Music'
                  />
                </Avatar.Root>
                <div>
                  <div className='flex items-center gap-1.5'>
                    <h2 className='text-lg font-medium text-text-strong-950'>
                      Cleve Music
                    </h2>
                    <div className='text-sm flex items-center gap-0.5'>
                      <RiStarFill className='size-4 text-yellow-400' />
                      <span className='text-text-secondary-600'>4.9 (125)</span>
                    </div>
                  </div>
                  <div className='text-sm text-text-secondary-600 flex gap-1'>
                    <RiGoogleFill className='size-4' />
                    <RiGoogleFill className='size-4' />
                    <RiGoogleFill className='size-4' />
                    <span>Specia</span>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <button className='text-sm rounded-md border border-stroke-soft-200 px-3 py-1.5 font-medium text-text-strong-950 hover:bg-bg-weak-50'>
                  Hire <RiArrowRightLine className='ml-1 inline size-3.5' />
                </button>
                <button className='text-sm flex items-center justify-center rounded-md bg-text-strong-950 px-3 py-1.5 text-white'>
                  Touch <RiExternalLinkLine className='ml-1 inline size-3.5' />
                </button>
                <button className='text-text-secondary-600 hover:text-red-500'>
                  <RiHeartLine className='size-5' />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className='border-b border-stroke-soft-200'>
            <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
              <Tabs.List className='flex'>
                <Tabs.Trigger
                  value='About'
                  className='flex-1 px-4 py-2 text-center'
                >
                  About
                </Tabs.Trigger>
                <Tabs.Trigger
                  value='Work'
                  className='flex-1 px-4 py-2 text-center'
                >
                  Work
                </Tabs.Trigger>
                <Tabs.Trigger
                  value='Service'
                  className='flex-1 px-4 py-2 text-center'
                >
                  Service
                </Tabs.Trigger>
                <Tabs.Trigger
                  value='Review'
                  className='flex-1 px-4 py-2 text-center'
                >
                  Review
                </Tabs.Trigger>
              </Tabs.List>
            </Tabs.Root>
          </div>

          {/* Content Area - scrollable */}
          <div className='flex-1 overflow-y-auto'>
            {/* About Tab Content */}
            {activeTab === 'About' && (
              <div className='p-4'>
                <p className='text-text-secondary-600'>
                  TypeScript Specialist Next.js & TypeScript Specialist Next.js
                  & TypeScript Specialist Next.js & TypeScript Specialist
                  Next.js & TypeScript Specialist Next.js & TypeScript
                  Specialist Next.js & TypeScript Specialist Next.js &
                  TypeScript Specialist Next.js & TypeScript Specialist Next.js
                  & TypeScript Specialist Next.js & TypeScript Specialist
                  Next.js & TypeScript Specialist Next.js & TypeScript
                  Specialist Next.js & 5+ Years Experience in Frontend
                  Development Next.js & TypeScript Specialist Next.js &
                  TypeScript...
                </p>
                <button className='text-sm text-text-primary-600 mt-2'>
                  More
                </button>
              </div>
            )}

            {/* Work Tab Content */}
            {activeTab === 'Work' && (
              <div className='p-4'>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className='mb-4 flex items-center justify-between border-b border-stroke-soft-200 pb-4 last:border-0'
                  >
                    <div className='flex items-center gap-3'>
                      <button className='bg-bg-subtle-100 flex size-10 items-center justify-center rounded-full'>
                        <RiPlayLine className='size-5 text-text-strong-950' />
                      </button>
                      <div>
                        <p className='font-medium text-text-strong-950'>
                          Funky Bounce Logo
                        </p>
                        <p className='text-sm text-text-secondary-600'>
                          Worker Remarks Text
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='flex gap-1'>
                        {['Mixing', 'Singing', 'Jazz', 'Hip hop', 'K pop'].map(
                          (tag) => (
                            <Badge.Root key={tag} variant='light' size='small'>
                              {tag}
                            </Badge.Root>
                          ),
                        )}
                      </div>
                      <div className='text-right'>
                        <p className='text-text-strong-950'>0:22</p>
                        <p className='text-xs text-text-secondary-600'>
                          112 BPM
                        </p>
                      </div>
                      <button className='text-text-secondary-600'>
                        <RiBookmarkLine className='size-5' />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Service Tab Content */}
            {activeTab === 'Service' && (
              <div className='grid grid-cols-2 gap-4 p-4 md:grid-cols-3'>
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className='shadow-sm hover:shadow-md overflow-hidden rounded-lg border border-stroke-soft-200 bg-bg-white-0 transition-all'
                  >
                    {/* Image with avatar badge */}
                    <div className='relative h-40 w-full bg-gradient-to-br from-blue-400 to-purple-500'>
                      <div className='absolute right-3 top-3'>
                        <Avatar.Root size='32' color='blue'>
                          <span className='text-label-sm font-medium'>J</span>
                        </Avatar.Root>
                      </div>
                    </div>

                    <div className='p-3'>
                      <p className='mb-2 line-clamp-2 text-paragraph-sm font-medium text-text-strong-950'>
                        Draw catchy and eye-catching illustrations anime
                      </p>

                      <div className='flex items-center justify-between text-paragraph-sm'>
                        <div className='text-text-secondary-600 flex items-center gap-0.5'>
                          <RiStarFill className='size-3.5 text-yellow-400' />
                          <span>4.9 (125)</span>
                        </div>
                        <span className='font-medium text-text-strong-950'>
                          $101
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Review Tab Content */}
            {activeTab === 'Review' && (
              <div className='p-4'>
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className='mb-6 border-b border-stroke-soft-200 pb-6 last:border-0'
                  >
                    <div className='mb-3 flex items-start justify-between'>
                      <div className='flex items-center gap-3'>
                        <Avatar.Root size='32'>
                          <Avatar.Image
                            src='https://via.placeholder.com/32'
                            alt='Reviewer'
                          />
                        </Avatar.Root>
                        <div>
                          <p className='font-medium text-text-strong-950'>
                            Cleve Music
                          </p>
                          <div className='text-sm text-text-secondary-600 flex items-center gap-2'>
                            <div className='flex items-center'>
                              <RiStarFill className='size-3.5 text-yellow-400' />
                              <span>4.9</span>
                            </div>
                            <span>Jan 8, 2023</span>
                          </div>
                        </div>
                      </div>
                      <span className='font-medium text-text-strong-950'>
                        $1000.00
                      </span>
                    </div>

                    <h3 className='mb-2 font-medium text-text-strong-950'>
                      Contract title text here...Contract title text here..ntr
                    </h3>

                    <p className='text-text-secondary-600 mb-2'>
                      idence.123confidence.123confidence.123cidence.123confidence.123confidence.123cidence.123confidence.123confidence.123
                      e.123
                      idence.123confidence.123confidence.123cidence.123confidence.123confidence.
                    </p>

                    <button className='text-sm text-text-primary-600'>
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

// Worker Card Component from home page
const WorkerCard = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div
      className='shadow-sm hover:shadow-md cursor-pointer overflow-hidden rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4 transition-all'
      onClick={onClick}
    >
      <div className='mb-2 flex items-start justify-between'>
        <div className='flex items-center gap-2'>
          <Avatar.Root size='32'>
            <Avatar.Image
              src='https://via.placeholder.com/40'
              alt='Worker Avatar'
            />
          </Avatar.Root>
          <div>
            <div className='text-label-sm font-medium text-text-strong-950'>
              Cleve Music
            </div>
            <div className='text-text-secondary-600 mt-0.5 flex items-center gap-0.5 text-[11px]'>
              <RiStarFill className='size-3 text-yellow-400' />
              <span>4.9 (125)</span>
            </div>
          </div>
        </div>
        <Avatar.Root size='20' color='blue'>
          <span className='text-[10px] font-medium'>J</span>
        </Avatar.Root>
      </div>
      <div className='text-text-secondary-600 mb-2 flex items-center gap-1.5 text-[11px]'>
        <span className='inline-flex items-center gap-0.5'>
          <RiMoneyDollarCircleLine className='size-3' /> Salary
        </span>
        <span className='inline-flex items-center gap-0.5'>
          <RiBriefcaseLine className='size-3' /> Work
        </span>
        <span className='inline-flex items-center gap-0.5'>
          <RiSparklingLine className='size-3' /> Specia
        </span>
      </div>
      <p className='text-text-secondary-600 mb-3 line-clamp-2 text-paragraph-xs'>
        Passionate about delivering high-quality audio mixing and editing. Let's
        create something....
      </p>
      <div className='flex flex-wrap gap-1'>
        <Badge.Root variant='light' size='small'>
          Mixing
        </Badge.Root>
        <Badge.Root variant='light' size='small'>
          Singing
        </Badge.Root>
        <Badge.Root variant='light' size='small'>
          Jazz
        </Badge.Root>
        <Badge.Root variant='light' size='small'>
          Hip hop
        </Badge.Root>
        <Badge.Root variant='light' size='small'>
          K pop
        </Badge.Root>
      </div>
    </div>
  );
};

// Filter Tag Component
const FilterTag = ({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) => {
  return (
    <div className='text-xs text-text-secondary-600 flex items-center gap-1 rounded-md bg-bg-weak-50 px-2 py-1'>
      {label}
      <button
        onClick={onRemove}
        className='text-text-secondary-400 hover:text-text-secondary-600'
      >
        <RiCloseLine className='size-3.5' />
      </button>
    </div>
  );
};

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('Service');
  const [selectedWorker, setSelectedWorker] = useState<boolean>(false);

  // Worker profile handlers
  const openWorkerProfile = () => setSelectedWorker(true);
  const closeWorkerProfile = () => setSelectedWorker(false);

  // Example filter states
  const [selectedSkills, setSelectedSkills] = useState(['Retrowave']);
  const [selectedTools, setSelectedTools] = useState(['Retrowave']);

  // Filter removal handlers
  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const removeToolFilter = (tool: string) => {
    setSelectedTools(selectedTools.filter((t) => t !== tool));
  };

  const clearAllFilters = () => {
    setSelectedSkills([]);
    setSelectedTools([]);
  };

  return (
    <div className='flex flex-1 flex-col gap-4 px-6 py-6'>
      {/* Tab Navigation */}
      <div className='border-b border-stroke-soft-200'>
        <TabMenuHorizontal.Root value={activeTab} onValueChange={setActiveTab}>
          <TabMenuHorizontal.List>
            <TabMenuHorizontal.Trigger value='Service'>
              Service
            </TabMenuHorizontal.Trigger>
            <TabMenuHorizontal.Trigger value='Worker'>
              Worker
            </TabMenuHorizontal.Trigger>
            <TabMenuHorizontal.Trigger value='Project'>
              Project
            </TabMenuHorizontal.Trigger>
          </TabMenuHorizontal.List>
        </TabMenuHorizontal.Root>
      </div>

      {/* Main Content Area */}
      <div className='flex gap-6'>
        {/* Left Sidebar Filters */}
        <div className='w-64 flex-shrink-0'>
          {/* Skills Section */}
          <div className='mb-6'>
            <div className='mb-2 flex items-center justify-between'>
              <h3 className='text-label-md font-medium text-text-strong-950'>
                Skills
              </h3>
              {selectedSkills.length > 0 && (
                <button
                  onClick={() => setSelectedSkills([])}
                  className='text-xs text-text-secondary-600 hover:text-text-primary-600'
                >
                  Clear
                </button>
              )}
            </div>
            {/* Selected Skills */}
            {selectedSkills.length > 0 && (
              <div className='mb-2 flex flex-wrap gap-1'>
                {selectedSkills.map((skill) => (
                  <FilterTag
                    key={skill}
                    label={skill}
                    onRemove={() => removeSkill(skill)}
                  />
                ))}
              </div>
            )}
            {/* Available Skills */}
            <div className='flex flex-wrap gap-1.5'>
              <Tag.Root
                variant='stroke'
                className={cn(
                  selectedSkills.includes('Digital Painting') &&
                    'bg-bg-weak-50',
                )}
              >
                Digital Painting
              </Tag.Root>
              <Tag.Root
                variant='stroke'
                className={cn(
                  selectedSkills.includes('Retrowave') && 'bg-bg-weak-50',
                )}
              >
                Retrowave
              </Tag.Root>
              <Tag.Root
                variant='stroke'
                className={cn(
                  selectedSkills.includes('NFT') && 'bg-bg-weak-50',
                )}
              >
                NFT
              </Tag.Root>
            </div>
          </div>

          {/* Tools Section */}
          <div className='mb-6'>
            <div className='mb-2 flex items-center justify-between'>
              <div className='flex items-center gap-1'>
                <h3 className='text-label-md font-medium text-text-strong-950'>
                  Tools
                </h3>
                <button className='text-icon-secondary-400'>
                  <RiInformationLine className='size-3.5' />
                </button>
              </div>
              {selectedTools.length > 0 && (
                <button
                  onClick={() => setSelectedTools([])}
                  className='text-xs text-text-secondary-600 hover:text-text-primary-600'
                >
                  Clear
                </button>
              )}
            </div>
            {/* Selected Tools */}
            {selectedTools.length > 0 && (
              <div className='mb-2 flex flex-wrap gap-1'>
                {selectedTools.map((tool) => (
                  <FilterTag
                    key={tool}
                    label={tool}
                    onRemove={() => removeToolFilter(tool)}
                  />
                ))}
              </div>
            )}
            {/* Available Tools */}
            <div className='flex flex-wrap gap-1.5'>
              <Tag.Root
                variant='stroke'
                className={cn(
                  selectedTools.includes('Digital Painting') && 'bg-bg-weak-50',
                )}
              >
                Digital Painting
              </Tag.Root>
              <Tag.Root
                variant='stroke'
                className={cn(
                  selectedTools.includes('Retrowave') && 'bg-bg-weak-50',
                )}
              >
                Retrowave
              </Tag.Root>
              <Tag.Root
                variant='stroke'
                className={cn(selectedTools.includes('NFT') && 'bg-bg-weak-50')}
              >
                NFT
              </Tag.Root>
            </div>
          </div>

          {/* Featured Tags */}
          <div className='mb-6'>
            <div className='mb-2 flex items-center gap-1'>
              <h3 className='text-label-md font-medium text-text-strong-950'>
                Featured Tags
              </h3>
              <button className='text-icon-secondary-400'>
                <RiInformationLine className='size-3.5' />
              </button>
            </div>
            <div className='flex flex-wrap gap-1.5'>
              <Tag.Root variant='stroke'>
                <Tag.Icon as={RiFireFill} className='text-orange-500' />
                Digital Painting
              </Tag.Root>
              <Tag.Root variant='stroke'>
                <Tag.Icon as={RiFireFill} className='text-orange-500' />
                Retrowave
              </Tag.Root>
              <Tag.Root variant='stroke'>
                <Tag.Icon as={RiFireFill} className='text-orange-500' />
                NFT
              </Tag.Root>
            </div>
          </div>

          {/* Toggle Options */}
          <div className='mb-6 space-y-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-label-md font-medium text-text-strong-950'>
                  Available
                </p>
                <p className='text-text-secondary-600 text-paragraph-xs'>
                  Recent Online
                </p>
              </div>
              <Switch.Root id='available-toggle' />
            </div>

            <div className='flex items-center justify-between'>
              <div>
                <p className='text-label-md font-medium text-text-strong-950'>
                  Professional Services
                </p>
                <p className='text-text-secondary-600 text-paragraph-xs'>
                  Vetted skills and expertise
                </p>
              </div>
              <Switch.Root id='professional-toggle' />
            </div>
          </div>

          {/* Clear Filters Button */}
          <button
            onClick={clearAllFilters}
            className='text-text-secondary-600 w-full rounded-lg border border-stroke-soft-200 py-2 hover:bg-bg-weak-50'
          >
            Clear Filters
          </button>
        </div>

        {/* Right Content Area */}
        <div className='flex-1'>
          {/* Search and Filters - Only show for Service and Project tabs */}
          {activeTab !== 'Worker' && (
            <div className='bg-bg-subtle-100 mb-6 flex gap-3 rounded-lg p-3'>
              {/* Search Input */}
              <div className='flex-1'>
                <Input.Root>
                  <Input.Wrapper>
                    <Input.Icon as={RiSearchLine} />
                    <Input.Input placeholder='Search...' />
                  </Input.Wrapper>
                </Input.Root>
              </div>

              {/* Filter Dropdowns */}
              <div className='flex gap-3'>
                <Select.Root defaultValue='real-time' size='small'>
                  <Select.Trigger>
                    <Select.Value placeholder='Real-time' />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Group>
                      <Select.Item value='real-time'>Real-time</Select.Item>
                      <Select.Item value='any-time'>Any time</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>

                <Select.Root defaultValue='price-range' size='small'>
                  <Select.Trigger>
                    <Select.Value placeholder='Price Range' />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Group>
                      <Select.Item value='price-range'>Price Range</Select.Item>
                      <Select.Item value='0-50'>$0-$50</Select.Item>
                      <Select.Item value='50-100'>$50-$100</Select.Item>
                      <Select.Item value='100-plus'>$100+</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>

                <Select.Root defaultValue='due-date' size='small'>
                  <Select.Trigger>
                    <Select.Value placeholder='Due Date' />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Group>
                      <Select.Item value='due-date'>Due Date</Select.Item>
                      <Select.Item value='1-day'>1 Day</Select.Item>
                      <Select.Item value='3-days'>3 Days</Select.Item>
                      <Select.Item value='7-days'>7 Days</Select.Item>
                      <Select.Item value='any'>Any</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              </div>
            </div>
          )}

          {/* Services/Workers Grid based on active tab */}
          {activeTab === 'Worker' && (
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              <WorkerCard onClick={openWorkerProfile} />
              <WorkerCard onClick={openWorkerProfile} />
              <WorkerCard onClick={openWorkerProfile} />
              <WorkerCard onClick={openWorkerProfile} />
              <WorkerCard onClick={openWorkerProfile} />
              <WorkerCard onClick={openWorkerProfile} />
              <WorkerCard onClick={openWorkerProfile} />
              <WorkerCard onClick={openWorkerProfile} />
              <WorkerCard onClick={openWorkerProfile} />
            </div>
          )}
          {activeTab === 'Service' && (
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              <ServiceCard />
              <ServiceCard />
              <ServiceCard />
              <ServiceCard />
              <ServiceCard />
              <ServiceCard />
              <ServiceCard />
              <ServiceCard />
              <ServiceCard />
            </div>
          )}
          {activeTab === 'Project' && (
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {/* Project cards would go here */}
              <div className='flex h-40 items-center justify-center rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4'>
                <p className='text-text-secondary-600 text-center'>
                  Project listing coming soon
                </p>
              </div>
              <div className='flex h-40 items-center justify-center rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4'>
                <p className='text-text-secondary-600 text-center'>
                  Project listing coming soon
                </p>
              </div>
              <div className='flex h-40 items-center justify-center rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4'>
                <p className='text-text-secondary-600 text-center'>
                  Project listing coming soon
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Worker Profile Drawer */}
      <WorkerProfileDrawer
        isOpen={selectedWorker}
        onClose={closeWorkerProfile}
      />
    </div>
  );
}
