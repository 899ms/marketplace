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
import { serviceOperations, userOperations, jobOperations } from '@/utils/supabase/database';
import { Service, User, Job } from '@/utils/supabase/types';

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
    skills: [] as string[], // Note: skills filter is not implemented in DB query yet
    isAvailable: false,
    isProfessional: false,
    sortBy: 'created_at' as string,
    sortOrder: 'desc' as 'asc' | 'desc',
  };

  // Define default filters state for projects
  const defaultProjectFilters = {
    searchTerm: '',
    skills: [] as string[],
    budgetRange: null as [number, number] | null,
    deadline: null as string | null,
    purpose: null as string | null,
    postingDate: null as string | null,
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

  // Project data state
  const [projects, setProjects] = useState<Job[]>([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [projectIsLoading, setProjectIsLoading] = useState(true);
  const [projectPage, setProjectPage] = useState(1);
  const [projectFilters, setProjectFilters] = useState(defaultProjectFilters);

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
        const { searchTerm, skills, isAvailable, isProfessional, sortBy, sortOrder } = workerFilters;

        // Fetch workers with all filters
        const result = await userOperations.getWorkersWithPagination({
          limit: itemsPerPage,
          offset,
          searchTerm,
          skills,
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

  // Fetch projects with current filters and pagination
  useEffect(() => {
    if (activeTab !== 'Project') return;

    async function loadProjects() {
      setProjectIsLoading(true);
      try {
        const offset = (projectPage - 1) * itemsPerPage;

        // Extract filters for query
        const { searchTerm, skills, budgetRange, sortBy, sortOrder } = projectFilters;

        // Fetch projects with all filters
        const result = await jobOperations.getJobsWithPagination({
          limit: itemsPerPage,
          offset,
          searchTerm,
          skills,
          budgetRange,
          sortBy,
          sortOrder,
        });

        setProjects(result.jobs);
        setTotalProjects(result.total);
      } catch (error) {
        console.error('Error loading projects:', error);
        setProjects([]);
        setTotalProjects(0);
      } finally {
        setProjectIsLoading(false);
      }
    }

    loadProjects();
  }, [activeTab, projectPage, projectFilters]);

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

  // Handle project search term changes
  const handleProjectSearch = (term: string) => {
    setProjectFilters(prev => ({ ...prev, searchTerm: term }));
    setProjectPage(1);
  };

  // Handle general filter changes from ProjectSearchBar (Deadline, Purpose, etc.)
  const handleProjectFilterChange = (filterType: string, value: string | null) => {
    setProjectFilters(prev => ({ ...prev, [filterType]: value }));
    setProjectPage(1);
    // TODO: Add logic to map these filters to DB query parameters if needed
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

  // Handle project skills change from sidebar
  const handleProjectSkillsChange = (skills: string[]) => {
    setProjectFilters(prev => ({ ...prev, skills }));
    setProjectPage(1);
  };

  // Handle project budget change from sidebar
  const handleProjectBudgetRangeChange = (range: [number, number]) => {
    setProjectFilters(prev => ({ ...prev, budgetRange: range }));
    setProjectPage(1);
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
    } else if (activeTab === 'Project') {
      // Toggle logic for project filters
      setProjectFilters(prev => ({ ...prev, [option]: value }));
      setProjectPage(1);
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
    } else if (activeTab === 'Project') {
      setProjectFilters(defaultProjectFilters);
      setProjectPage(1);
    }
    setResetKey(prev => prev + 1);
  };

  // Calculate total pages for services, workers, and projects
  const totalServicePages = Math.max(1, Math.ceil(totalServices / itemsPerPage));
  const totalWorkerPages = Math.max(1, Math.ceil(totalWorkers / itemsPerPage));
  const totalProjectPages = Math.max(1, Math.ceil(totalProjects / itemsPerPage));

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

  // Project pagination handlers
  const handleProjectPrevPage = () => {
    if (projectPage > 1) setProjectPage(prev => prev - 1);
  };

  const handleProjectNextPage = () => {
    if (projectPage < totalProjectPages) setProjectPage(prev => prev + 1);
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value as ActiveTabValue);
    // Reset loading state for the new tab
    if (value === 'Service') {
      setServiceIsLoading(true);
    } else if (value === 'Worker') {
      setWorkerIsLoading(true);
    } else if (value === 'Project') {
      setProjectIsLoading(true);
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

          {/* Filters Sidebar - Pass specific props based on tab */}
          <ServiceFilterSidebar
            activeTab={activeTab}
            // Service props
            onServicePriceRangeChange={handleServicePriceRangeChange}
            onServiceSkillsChange={handleServiceSkillsChange}
            // Worker props
            onWorkerSearch={handleWorkerSearch}
            onWorkerToggleChange={handleToggleChange}
            workerSearchTerm={workerFilters.searchTerm}
            // Project props
            onProjectBudgetRangeChange={handleProjectBudgetRangeChange}
            onProjectSkillsChange={handleProjectSkillsChange}
            // Shared props
            onClearAllFilters={handleClearAllFilters}
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
          {activeTab === 'Project' && (
            <ProjectSearchBar
              onSearch={handleProjectSearch}
              onFilterChange={handleProjectFilterChange}
              searchTerm={projectFilters.searchTerm}
              resetKey={resetKey}
            />
          )}

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
            <>
              {projectIsLoading ? (
                <div className='flex flex-col space-y-4'>
                  {/* Skeleton loaders for projects */}
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className='animate-pulse overflow-hidden rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4 shadow-sm'>
                      <div className='grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]'>
                        <div className='flex flex-col gap-3'>
                          <div className='h-6 bg-gray-200 rounded w-3/4'></div>
                          <div className='flex flex-wrap gap-1.5'>
                            <div className='h-5 bg-gray-200 rounded w-20'></div>
                            <div className='h-5 bg-gray-200 rounded w-24'></div>
                          </div>
                          <div className='h-4 bg-gray-200 rounded w-full'></div>
                          <div className='h-4 bg-gray-200 rounded w-5/6'></div>
                          <div className='flex items-center gap-2 pt-2'>
                            <div className='h-6 w-6 rounded-full bg-gray-200'></div>
                            <div className='h-4 bg-gray-200 rounded w-24'></div>
                          </div>
                        </div>
                        <div className='flex flex-col items-end justify-between gap-4 md:justify-start'>
                          <div className='text-right'>
                            <div className='h-4 bg-gray-200 rounded w-12 mb-1'></div>
                            <div className='h-6 bg-gray-200 rounded w-20'></div>
                          </div>
                          <div className='h-8 bg-gray-200 rounded w-24 mt-auto'></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : projects.length > 0 ? (
                <>
                  <div className='flex flex-col space-y-4'>
                    {projects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        title={project.title}
                        infoBadges={[
                          { label: project.status || 'Open' },
                          { label: project.usage_option || 'Private' },
                          { label: project.privacy_option || 'Public' },
                          // Add more relevant badges based on job data
                        ]}
                        skillTags={project.skill_levels || []}
                        description={project.description || 'No description available.'}
                        client={{
                          // Fetch client data separately or join in query if needed
                          avatarUrl: 'https://placekitten.com/24/24?image=' + project.id.substring(0, 2), // Placeholder
                          name: 'Placeholder Client Name', // Placeholder
                          rating: 4.5, // Placeholder
                          reviewCount: 10 // Placeholder
                        }}
                        budget={project.budget}
                        onApply={() => console.log('Apply clicked for project', project.id)}
                      />
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalProjectPages > 1 && (
                    <div className='flex justify-center gap-2 mt-6'>
                      <button
                        onClick={handleProjectPrevPage}
                        disabled={projectPage === 1}
                        className='px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50'
                      >
                        Previous
                      </button>
                      <span className='px-4 py-1'>
                        Page {projectPage} of {totalProjectPages}
                      </span>
                      <button
                        onClick={handleProjectNextPage}
                        disabled={projectPage === totalProjectPages}
                        className='px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50'
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className='flex flex-col items-center justify-center py-12 text-center'>
                  <p className='text-lg font-medium mb-2'>No projects found</p>
                  <p className='text-gray-500'>Try adjusting your search filters</p>
                </div>
              )}
            </>
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