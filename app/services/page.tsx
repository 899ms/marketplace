'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import * as Avatar from '@/components/ui/avatar';
import * as Badge from '@/components/ui/badge';
import * as Input from '@/components/ui/input';
import * as Select from '@/components/ui/select';
import * as TabMenuHorizontal from '@/components/ui/tab-menu-horizontal';
import * as Tag from '@/components/ui/tag';
import * as Switch from '@/components/ui/switch';
import {
  RiSearchLine,
  RiStarFill,
  RiCloseLine,
  RiFilter2Line,
  RiInformationLine,
  RiGoogleFill,
  RiFireFill,
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
          {/* Search and Filters */}
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

          {/* Services Grid */}
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
        </div>
      </div>
    </div>
  );
}
