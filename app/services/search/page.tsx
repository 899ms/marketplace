'use client';

import React, { useState, useEffect } from 'react';
// import Link from 'next/link'; // Keep if ProjectCard needs it
import * as TabMenuHorizontal from '@/components/ui/tab-menu-horizontal';
// Removed unused Input, Select, RiSearchLine imports

// Import shared card components
import ServiceCard from '@/components/cards/ServiceCard';
import WorkerCard from '@/components/cards/WorkerCard';
import ProjectCard from '@/components/cards/ProjectCard';

// Import extracted components for this page
import ServiceFilterSidebar from '@/components/services/list/ServiceFilterSidebar';
// import { ProjectFilters } from '@/components/services/list/project-filters'; // Removed import
import { ServiceSearchBar } from '@/components/services/list/ServiceSearchBar';
import { ProjectSearchBar } from '@/components/services/list/ProjectSearchBar';
import WorkerProfileDrawer from '@/components/worker/WorkerProfileDrawer';
import { serviceOperations, userOperations } from '@/utils/supabase/database';
import { Service, User } from '@/utils/supabase/types';

// Define the possible tab values
type ActiveTabValue = 'Service' | 'Worker' | 'Project';

export default function ServicesSearchPage() {
  const [activeTab, setActiveTab] = useState<ActiveTabValue>('Service');
  const [selectedWorker, setSelectedWorker] = useState<boolean>(false);

  // Define default filters state for services
  const defaultServiceFilters = {
    searchTerm: '',
    priceRange: null as [number, number] | null,
    tags: [] as string[],
    leadTime: null as number | null,
    sortBy: 'created_at' as string,
    sortOrder: 'desc' as 'asc' | 'desc',
    available: false,
    professional: false,
  };

  // Define default filters state for workers
  const defaultWorkerFilters = {
    searchTerm: '',
    isAvailable: false,
    isProfessional: false,
    sortBy: 'created_at' as string,
    sortOrder: 'desc' as 'asc' | 'desc',
  };

  // Service data state
  const [services, setServices] = useState<Service[]>([]);
  const [totalServices, setTotalServices] = useState(0);
  const [serviceIsLoading, setServiceIsLoading] = useState(true);
  const [servicePage, setServicePage] = useState(1);
  const [serviceFilters, setServiceFilters] = useState(defaultServiceFilters);

  // Worker data state
  const [workers, setWorkers] = useState<User[]>([]);
  const [totalWorkers, setTotalWorkers] = useState(0);
  const [workerIsLoading, setWorkerIsLoading] = useState(true);
  const [workerPage, setWorkerPage] = useState(1);
  const [workerFilters, setWorkerFilters] = useState(defaultWorkerFilters);

  const [resetKey, setResetKey] = useState(0);
  const itemsPerPage = 9;

  // Worker profile handlers
  const openWorkerProfile = () => setSelectedWorker(true);
  const closeWorkerProfile = () => setSelectedWorker(false);

  // Fetch services with current filters and pagination
  useEffect(() => {
    if (activeTab !== 'Service') return;

    async function loadServices() {
      setServiceIsLoading(true);
      try {
        const offset = (servicePage - 1) * itemsPerPage;

        // Extract filters for query
        const { searchTerm, priceRange, tags, sortBy, sortOrder } = serviceFilters;

        // Fetch services with all filters
        const result = await serviceOperations.getServicesWithPagination({
          limit: itemsPerPage,
          offset,
          searchTerm,
          priceRange,
          tags,
          sortBy,
          sortOrder,
        });

        setServices(result.services);
        setTotalServices(result.total);
      } catch (error) {
        console.error('Error loading services:', error);
        setServices([]);
        setTotalServices(0);
      } finally {
        setServiceIsLoading(false);
      }
    }

    loadServices();
  }, [activeTab, servicePage, serviceFilters]);

  // Fetch workers with current filters and pagination
  useEffect(() => {
    if (activeTab !== 'Worker') return;

    async function loadWorkers() {
      setWorkerIsLoading(true);
      try {
        const offset = (workerPage - 1) * itemsPerPage;

        // Extract filters for query
        const { searchTerm, isAvailable, isProfessional, sortBy, sortOrder } = workerFilters;

        // Fetch workers with all filters
        const result = await userOperations.getWorkersWithPagination({
          limit: itemsPerPage,
          offset,
          searchTerm,
          isAvailable,
          isProfessional,
          sortBy,
          sortOrder,
        });

        setWorkers(result.workers);
        setTotalWorkers(result.total);
      } catch (error) {
        console.error('Error loading workers:', error);
        setWorkers([]);
        setTotalWorkers(0);
      } finally {
        setWorkerIsLoading(false);
      }
    }

    loadWorkers();
  }, [activeTab, workerPage, workerFilters]);

  // Handle service search term changes
  const handleServiceSearch = (term: string) => {
    setServiceFilters(prev => ({ ...prev, searchTerm: term }));
    setServicePage(1); // Reset to page 1 when search changes
  };

  // Handle worker search term changes
  const handleWorkerSearch = (term: string) => {
    setWorkerFilters(prev => ({ ...prev, searchTerm: term }));
    setWorkerPage(1); // Reset to page 1 when search changes
  };

  // Handle service filter changes from search bar
  const handleServiceFilterChange = (filterType: string, value: string) => {
    switch (filterType) {
      case 'leadTime':
        setServiceFilters(prev => ({ ...prev, leadTime: parseInt(value) }));
        break;
      case 'priceRange':
        let priceRange: [number, number] | null = null;
        if (value === 'low') priceRange = [0, 50];
        else if (value === 'medium') priceRange = [51, 200];
        else if (value === 'high') priceRange = [201, 10000];
        setServiceFilters(prev => ({ ...prev, priceRange }));
        break;
      case 'sort':
        let sortConfig = { sortBy: 'created_at', sortOrder: 'desc' as 'asc' | 'desc' };
        if (value === 'newest') {
          sortConfig = { sortBy: 'created_at', sortOrder: 'desc' };
        } else if (value === 'oldest') {
          sortConfig = { sortBy: 'created_at', sortOrder: 'asc' };
        } else if (value === 'price_asc') {
          sortConfig = { sortBy: 'price', sortOrder: 'asc' };
        } else if (value === 'price_desc') {
          sortConfig = { sortBy: 'price', sortOrder: 'desc' };
        }
        setServiceFilters(prev => ({ ...prev, ...sortConfig }));
        break;
    }
    setServicePage(1); // Reset to page 1 when filters change
  };

  // Handle service price range filter from sidebar
  const handleServicePriceRangeChange = (range: [number, number]) => {
    setServiceFilters(prev => ({ ...prev, priceRange: range }));
    setServicePage(1);
  };

  // Handle service tag filters from sidebar
  const handleServiceSkillsChange = (skills: string[]) => {
    setServiceFilters(prev => ({ ...prev, tags: skills }));
    setServicePage(1);
  };

  // Handle toggle changes from sidebar
  const handleToggleChange = (option: string, value: boolean) => {
    if (activeTab === 'Service') {
      if (option === 'available') {
        setServiceFilters(prev => ({ ...prev, available: value }));
      } else if (option === 'professional') {
        setServiceFilters(prev => ({ ...prev, professional: value }));
      }
      setServicePage(1);
    } else if (activeTab === 'Worker') {
      if (option === 'available') {
        setWorkerFilters(prev => ({ ...prev, isAvailable: value }));
      } else if (option === 'professional') {
        setWorkerFilters(prev => ({ ...prev, isProfessional: value }));
      }
      setWorkerPage(1);
    }
  };

  // Handle clearing all filters
  const handleClearAllFilters = () => {
    if (activeTab === 'Service') {
      setServiceFilters(defaultServiceFilters);
      setServicePage(1);
    } else if (activeTab === 'Worker') {
      setWorkerFilters(defaultWorkerFilters);
      setWorkerPage(1);
    }
    setResetKey(prev => prev + 1);
  };

  // Calculate total pages for services and workers
  const totalServicePages = Math.max(1, Math.ceil(totalServices / itemsPerPage));
  const totalWorkerPages = Math.max(1, Math.ceil(totalWorkers / itemsPerPage));

  // Service pagination handlers
  const handleServicePrevPage = () => {
    if (servicePage > 1) setServicePage(prev => prev - 1);
  };

  const handleServiceNextPage = () => {
    if (servicePage < totalServicePages) setServicePage(prev => prev + 1);
  };

  // Worker pagination handlers
  const handleWorkerPrevPage = () => {
    if (workerPage > 1) setWorkerPage(prev => prev - 1);
  };

  const handleWorkerNextPage = () => {
    if (workerPage < totalWorkerPages) setWorkerPage(prev => prev + 1);
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value as ActiveTabValue);
    // Reset loading state for the new tab
    if (value === 'Service') {
      setServiceIsLoading(true);
    } else if (value === 'Worker') {
      setWorkerIsLoading(true);
    }
  };

  return (
    <>
      <div className='flex flex-1 gap-6 px-6 py-6'>
        {/* Left Column: Tabs + Filters */}
        <div className='w-full max-w-[342px] flex-shrink-0 space-y-4'>
          {/* Tab Navigation */}
          <div className='border-b border-stroke-soft-200'>
            <TabMenuHorizontal.Root
              value={activeTab}
              onValueChange={handleTabChange}
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
          <ServiceFilterSidebar
            activeTab={activeTab}
            onPriceRangeChange={handleServicePriceRangeChange}
            onSkillsChange={activeTab === 'Service' ? handleServiceSkillsChange : undefined}
            onToggleChange={handleToggleChange}
            onClearAllFilters={handleClearAllFilters}
            onWorkerSearch={handleWorkerSearch}
            workerSearchTerm={workerFilters.searchTerm}
            resetKey={resetKey}
          />
        </div>

        {/* Right Column: Tab Content */}
        <div className='flex-1 space-y-4 min-w-0'>
          {/* Search Bars */}
          {activeTab === 'Service' && (
            <ServiceSearchBar
              onSearch={handleServiceSearch}
              onFilterChange={handleServiceFilterChange}
              searchTerm={serviceFilters.searchTerm}
              resetKey={resetKey}
            />
          )}
          {activeTab === 'Project' && <ProjectSearchBar />}

          {/* Services Grid with Loading State */}
          {activeTab === 'Service' && (
            <>
              {serviceIsLoading ? (
                <div className='grid grid-cols-3 gap-4'>
                  {/* Skeleton loaders for services */}
                  {[...Array(itemsPerPage)].map((_, i) => (
                    <div key={i} className='animate-pulse shadow-sm overflow-hidden rounded-lg border border-stroke-soft-200 bg-bg-white-0'>
                      <div className='h-40 w-full bg-gray-200'></div>
                      <div className='p-3 space-y-2'>
                        <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                        <div className='h-3 bg-gray-200 rounded w-1/2'></div>
                        <div className='flex justify-between'>
                          <div className='h-3 bg-gray-200 rounded w-1/4'></div>
                          <div className='h-3 bg-gray-200 rounded w-1/4'></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : services.length > 0 ? (
                <>
                  <div className='grid grid-cols-3 gap-4'>
                    {services.map((service) => (
                      <ServiceCard key={service.id} service={service} />
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalServicePages > 1 && (
                    <div className='flex justify-center gap-2 mt-6'>
                      <button
                        onClick={handleServicePrevPage}
                        disabled={servicePage === 1}
                        className='px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50'
                      >
                        Previous
                      </button>
                      <span className='px-4 py-1'>
                        Page {servicePage} of {totalServicePages}
                      </span>
                      <button
                        onClick={handleServiceNextPage}
                        disabled={servicePage === totalServicePages}
                        className='px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50'
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className='flex flex-col items-center justify-center py-12 text-center'>
                  <p className='text-lg font-medium mb-2'>No services found</p>
                  <p className='text-gray-500'>Try adjusting your search filters</p>
                </div>
              )}
            </>
          )}

          {/* Workers Grid with Loading State */}
          {activeTab === 'Worker' && (
            <>
              {workerIsLoading ? (
                <div className='grid grid-cols-2 gap-4'>
                  {/* Skeleton loaders for workers */}
                  {[...Array(itemsPerPage)].map((_, i) => (
                    <div key={i} className='animate-pulse shadow-sm overflow-hidden rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4'>
                      <div className='flex gap-3'>
                        <div className='h-12 w-12 rounded-full bg-gray-200'></div>
                        <div className='flex-1'>
                          <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
                          <div className='h-3 bg-gray-200 rounded w-1/2 mb-4'></div>
                          <div className='flex flex-wrap gap-1 mb-2'>
                            <div className='h-6 rounded bg-gray-200 w-16'></div>
                            <div className='h-6 rounded bg-gray-200 w-20'></div>
                          </div>
                        </div>
                      </div>
                      <div className='h-4 bg-gray-200 rounded mt-3'></div>
                    </div>
                  ))}
                </div>
              ) : workers.length > 0 ? (
                <>
                  <div className='grid grid-cols-2 gap-4'>
                    {workers.map((worker) => (
                      <WorkerCard
                        key={worker.id}
                        worker={worker}
                        onClick={openWorkerProfile}
                      />
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalWorkerPages > 1 && (
                    <div className='flex justify-center gap-2 mt-6'>
                      <button
                        onClick={handleWorkerPrevPage}
                        disabled={workerPage === 1}
                        className='px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50'
                      >
                        Previous
                      </button>
                      <span className='px-4 py-1'>
                        Page {workerPage} of {totalWorkerPages}
                      </span>
                      <button
                        onClick={handleWorkerNextPage}
                        disabled={workerPage === totalWorkerPages}
                        className='px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50'
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className='flex flex-col items-center justify-center py-12 text-center'>
                  <p className='text-lg font-medium mb-2'>No workers found</p>
                  <p className='text-gray-500'>Try adjusting your search filters</p>
                </div>
              )}
            </>
          )}

          {/* Project Tab */}
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

      {/* Worker Profile Drawer */}
      <WorkerProfileDrawer
        isOpen={selectedWorker}
        onClose={closeWorkerProfile}
      />
    </>
  );
} 