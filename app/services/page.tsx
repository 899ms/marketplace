'use client';

import React, { useState } from 'react';
// import Link from 'next/link'; // Keep if ProjectCard needs it
import * as TabMenuHorizontal from '@/components/ui/tab-menu-horizontal';
// Removed unused Input, Select, RiSearchLine imports

// Import shared card components
import ServiceCard from '@/components/cards/ServiceCard'; // Assuming path from home refactor
import WorkerCard from '@/components/cards/WorkerCard'; // Assuming path from home refactor
import ProjectCard from '@/components/cards/ProjectCard'; // Assuming a ProjectCard exists or will be created

// Import extracted components for this page
import ServiceFilterSidebar from '@/components/services/list/ServiceFilterSidebar';
// import { ProjectFilters } from '@/components/services/list/project-filters'; // Removed import
import { ServiceSearchBar } from '@/components/services/list/ServiceSearchBar';
import { ProjectSearchBar } from '@/components/services/list/ProjectSearchBar'; // Import the project search bar
// import { WorkerSearchBar } from '@/components/services/list/WorkerSearchBar'; // Removed import
import WorkerProfileDrawer from '@/components/worker/WorkerProfileDrawer';

// Define the possible tab values
type ActiveTabValue = 'Service' | 'Worker' | 'Project';

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<ActiveTabValue>('Service');
  const [selectedWorker, setSelectedWorker] = useState<boolean>(false);

  // Worker profile handlers (remain here to control the drawer)
  const openWorkerProfile = () => setSelectedWorker(true);
  const closeWorkerProfile = () => setSelectedWorker(false);

  return (
    <>
      <div className='flex flex-1 gap-6 px-6 py-6'>
        {/* Left Column: Tabs + Filters */}
        <div className='w-full max-w-[342px] flex-shrink-0 space-y-4'>
          {/* Tab Navigation */}
          <div className='border-b border-stroke-soft-200'>
            <TabMenuHorizontal.Root
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as ActiveTabValue)}
            >
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

          {/* Filters Sidebar */}
          <ServiceFilterSidebar activeTab={activeTab} />
        </div>

        {/* Right Column: Tab Content */}
        <div className='flex-1 space-y-4 min-w-0'>
          {/* Search Bars (Service/Project) */}
          {activeTab === 'Service' && <ServiceSearchBar />}
          {activeTab === 'Project' && <ProjectSearchBar />}
          {/* Note: WorkerSearchBar is rendered inside ServiceFilterSidebar */}

          {/* Grids/Lists */}
          {activeTab === 'Worker' && (
            <div className='grid grid-cols-2 gap-4'>
              {[...Array(9)].map((_, i) => {
                const mockWorkerData = {
                  avatarUrl: 'https://placekitten.com/48/48?image=' + i,
                  name: `Cleve Music ${i + 1}`,
                  rating: 4.5 + Math.random() * 0.5,
                  reviewCount: Math.floor(Math.random() * 200) + 10,
                  badges: [
                    { label: 'Salary' },
                    { label: 'Work' },
                    { label: 'Specialty' },
                  ],
                  description:
                    'Passionate about delivering high-quality audio mixing and editing. Let\'s create something amazing together!',
                  skills: ['Mixing', 'Singing', 'Jazz', 'Hip hop', 'K pop'],
                };
                return (
                  <WorkerCard
                    key={i}
                    {...mockWorkerData}
                    onClick={openWorkerProfile}
                  />
                );
              })}
            </div>
          )}
          {activeTab === 'Service' && (
            <div className='grid grid-cols-3 gap-4'>
              {[...Array(9)].map((_, i) => (
                <ServiceCard key={i} />
              ))}
            </div>
          )}
          {activeTab === 'Project' && (
            <div className='flex flex-col space-y-4'>
              {[...Array(5)].map((_, i) => {
                const mockProjectData = {
                  title: `Write professional resume, cover letter ${i + 1}`,
                  infoBadges: [
                    { label: 'Deadline date' },
                    { label: `${i + 1} sent proposal` },
                    { label: 'Business' },
                  ],
                  skillTags: ['Mixing', 'Singing', 'Jazz', 'Hip hop', 'K pop'],
                  description:
                    'We are seeking a talented Website Designer and Front-End Developer to join our team. In this role, you will be responsible for designing and implementing user-friendly...',
                  client: {
                    avatarUrl: 'https://placekitten.com/24/24?image=' + (i + 10),
                    name: 'Cleve Music',
                    rating: 4.8 + Math.random() * 0.1,
                    reviewCount: Math.floor(Math.random() * 50) + 100,
                  },
                  budget: 1000 + Math.floor(Math.random() * 1000),
                  onApply: () => console.log('Apply clicked for project', i + 1),
                };
                return <ProjectCard key={i} {...mockProjectData} />;
              })}
            </div>
          )}
        </div>
      </div>

      {/* Worker Profile Drawer (Keep outside the main layout) */}
      <WorkerProfileDrawer
        isOpen={selectedWorker}
        onClose={closeWorkerProfile}
      />
    </>
  );
}
