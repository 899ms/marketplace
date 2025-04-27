'use client';

import React, { useState } from 'react';
// import Link from 'next/link'; // Keep if ProjectCard needs it
import * as TabMenuHorizontal from '@/components/ui/tab-menu-horizontal';
import * as Input from '@/components/ui/input';
import * as Select from '@/components/ui/select';
import { RiSearchLine } from '@remixicon/react';

// Import shared card components
import ServiceCard from '@/components/cards/ServiceCard'; // Assuming path from home refactor
import WorkerCard from '@/components/cards/WorkerCard'; // Assuming path from home refactor
import ProjectCard from '@/components/cards/ProjectCard'; // Assuming a ProjectCard exists or will be created

// Import extracted components for this page
import ServiceFilterSidebar from '@/components/services/list/ServiceFilterSidebar';
import WorkerProfileDrawer from '@/components/worker/WorkerProfileDrawer';

// Removed local component definitions: ServiceCard, WorkerProfileDrawer, WorkerCard, FilterTag, ProjectCard
// Removed filter state and handlers (now encapsulated in ServiceFilterSidebar)

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('Service');
  const [selectedWorker, setSelectedWorker] = useState<boolean>(false);

  // Worker profile handlers (remain here to control the drawer)
  const openWorkerProfile = () => setSelectedWorker(true);
  const closeWorkerProfile = () => setSelectedWorker(false);

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
        <ServiceFilterSidebar />

        {/* Right Content Area */}
        <div className='flex-1'>
          {/* Search and Filters - Only show for Project tab for now */}
          {activeTab === 'Project' && (
            <div className='bg-bg-subtle-100 mb-6 flex flex-col gap-3 rounded-lg p-3 sm:flex-row'>
              {' '}
              {/* Flex wrap for smaller screens */}
              {/* Search Input */}
              <div className='flex-1'>
                <Input.Root>
                  <Input.Wrapper>
                    <Input.Icon as={RiSearchLine} />
                    <Input.Input placeholder='Search Projects...' />
                  </Input.Wrapper>
                </Input.Root>
              </div>
              {/* Project-specific Filter Dropdowns */}
              <div className='flex flex-wrap gap-3'>
                {' '}
                {/* Allow wrapping */}
                <Select.Root defaultValue='deadline' size='small'>
                  <Select.Trigger>
                    <Select.Value placeholder='Deadline' />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Group>
                      <Select.Item value='deadline'>Deadline</Select.Item>
                      <Select.Item value='today'>Today</Select.Item>
                      <Select.Item value='this-week'>This Week</Select.Item>
                      <Select.Item value='this-month'>This Month</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
                <Select.Root defaultValue='purpose' size='small'>
                  <Select.Trigger>
                    <Select.Value placeholder='Purpose' />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Group>
                      <Select.Item value='purpose'>Purpose</Select.Item>
                      <Select.Item value='business'>Business</Select.Item>
                      <Select.Item value='personal'>Personal</Select.Item>
                      <Select.Item value='education'>Education</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
                <Select.Root defaultValue='posting-date' size='small'>
                  <Select.Trigger>
                    <Select.Value placeholder='Posting Date' />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Group>
                      <Select.Item value='posting-date'>
                        Posting Date
                      </Select.Item>
                      <Select.Item value='last-24h'>Last 24h</Select.Item>
                      <Select.Item value='last-week'>Last Week</Select.Item>
                      <Select.Item value='last-month'>Last Month</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              </div>
            </div>
          )}

          {/* Services/Workers Grid based on active tab */}
          {activeTab === 'Worker' && (
            // TODO: Replace with actual data mapping
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {[...Array(9)].map((_, i) => (
                <WorkerCard key={i} onClick={openWorkerProfile} />
              ))}
            </div>
          )}
          {activeTab === 'Service' && (
            // TODO: Replace with actual data mapping
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {[...Array(9)].map((_, i) => (
                <ServiceCard key={i} />
              ))}
            </div>
          )}
          {activeTab === 'Project' && (
            // TODO: Replace with actual data mapping
            <div className='flex flex-col space-y-4'>
              {[...Array(5)].map((_, i) => (
                <ProjectCard key={i} />
              ))}
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
