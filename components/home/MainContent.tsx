'use client';

import React, { useState } from 'react';
import * as Tabs from '@/components/ui/tabs';
import Banner from './Banner';
import SectionHeader from './SectionHeader';
import ServiceCard from '../cards/ServiceCard';
import WorkerCard from '../cards/WorkerCard';

// Main Content Component
const MainContent = () => {
  const tabItems = ['All', 'Offers', 'Completed', 'Cancelled'];
  const [activeTab, setActiveTab] = useState(tabItems[0]);

  return (
    <main className='flex-1 mt-[3.5rem]'>
      <Banner />

      {/* Hot Services Section */}
      <section className='mb-8'>
        <SectionHeader title='Hot Services' href='/services' />
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {/* Replace with mapped data */}
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
        </div>
      </section>

      {/* Hot Workers Section */}
      <section className='mb-8'>
        <SectionHeader title='Hot Workers' href='/workers' />
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {/* Replace with mapped data */}
          <WorkerCard />
          <WorkerCard />
          <WorkerCard />
        </div>
      </section>

      {/* Category Ranking Section */}
      <section>
        <SectionHeader title='Category Ranking' href='/categories' />
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {/* Replace with mapped data */}
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
        </div>
      </section>

      {/* Orders Section */}
      {/* <section className='mt-8'>
        <SectionHeader title='Orders' href='/orders' />
        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List>
            {tabItems.map((tab) => (
              <Tabs.Trigger key={tab} value={tab}>
                {tab}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <Tabs.Content value={activeTab}>
            <div className='text-text-sub-500 mt-1 text-paragraph-sm'>
              You can manage your orders, view details, and track their status
              here. Find everything you need in one place. We&apos;re here to
              help!
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </section> */}

      <section className='mt-8'>
      </section>

      {/* Review Section */}
      <section className='mt-8'>{/* Review content */}</section>
    </main>
  );
};

export default MainContent;
