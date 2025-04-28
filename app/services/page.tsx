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
import { ProjectFilters } from '@/components/services/list/project-filters'; // Added import
import WorkerProfileDrawer from '@/components/worker/WorkerProfileDrawer';

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
          {/* Conditionally render ProjectFilters */}
          {activeTab === 'Project' && <ProjectFilters />}

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
