'use client';

import React, { useState } from 'react';
import * as Tag from '@/components/ui/tag';
import * as Switch from '@/components/ui/switch';
import { RiInformationLine, RiCloseLine, RiSparklingFill } from '@remixicon/react';
import { cn } from '@/utils/cn';
import { WorkerSearchBar } from './WorkerSearchBar';
import { PriceRangeSlider } from '../../filters/PriceRangeSlider';

// Helper component for the input-like container
interface TagInputContainerProps {
  children: React.ReactNode;
}
const TagInputContainer: React.FC<TagInputContainerProps> = ({ children }) => {
  return (
    <div className='mb-2 flex min-h-[36px] flex-wrap items-center gap-1.5 rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-1.5'>
      {children}
      {/* Render children, and ensure min-height even if empty */}
      {React.Children.count(children) === 0 && (
        <span className='text-xs text-gray-400'>Select...</span> // Changed from text-sm to text-xs
      )}
    </div>
  );
};

// Main Sidebar Component
interface ServiceFilterSidebarProps {
  activeTab: 'Service' | 'Worker' | 'Project';
  // Service specific callbacks
  onServicePriceRangeChange?: (range: [number, number]) => void;
  onServiceSkillsChange?: (skills: string[]) => void;
  // Worker specific callbacks
  onWorkerSearch?: (term: string) => void;
  onWorkerToggleChange?: (option: string, value: boolean) => void;
  workerSearchTerm?: string;
  // Project specific callbacks
  onProjectBudgetRangeChange?: (range: [number, number]) => void;
  onProjectSkillsChange?: (skills: string[]) => void;
  // Shared callbacks/props
  onClearAllFilters?: () => void;
  resetKey?: number;
}

const ServiceFilterSidebar: React.FC<ServiceFilterSidebarProps> = ({
  activeTab,
  onServicePriceRangeChange,
  onServiceSkillsChange,
  onWorkerSearch,
  onWorkerToggleChange,
  workerSearchTerm,
  onProjectBudgetRangeChange,
  onProjectSkillsChange,
  onClearAllFilters,
  resetKey,
}) => {
  const [selectedSkills, setSelectedSkills] = useState(['Retrowave']);
  const [selectedTools, setSelectedTools] = useState(['Retrowave']);
  const [selectedFeaturedTags, setSelectedFeaturedTags] = useState([
    'Retrowave',
  ]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isProfessional, setIsProfessional] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]); // Default full range

  // --- Updated Filter Handlers --- //

  // Combined handler for Skills/Tags
  const handleSkillToggle = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(newSkills);
    // Call appropriate parent handler based on tab
    if (activeTab === 'Service' && onServiceSkillsChange) onServiceSkillsChange(newSkills);
    if (activeTab === 'Project' && onProjectSkillsChange) onProjectSkillsChange(newSkills);
    // Workers don't use this skills filter currently
  };
  const removeSkill = (skill: string) => {
    const newSkills = selectedSkills.filter((s) => s !== skill);
    setSelectedSkills(newSkills);
    if (activeTab === 'Service' && onServiceSkillsChange) onServiceSkillsChange(newSkills);
    if (activeTab === 'Project' && onProjectSkillsChange) onProjectSkillsChange(newSkills);
  };
  const clearSkills = () => {
    setSelectedSkills([]);
    if (activeTab === 'Service' && onServiceSkillsChange) onServiceSkillsChange([]);
    if (activeTab === 'Project' && onProjectSkillsChange) onProjectSkillsChange([]);
  };

  // Combined handler for Price/Budget Range
  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRange(value);
    if (activeTab === 'Service' && onServicePriceRangeChange) onServicePriceRangeChange(value);
    if (activeTab === 'Project' && onProjectBudgetRangeChange) onProjectBudgetRangeChange(value);
  };

  // Combined handler for Toggles (Available/Professional)
  const handleToggleChange = (option: string, checked: boolean) => {
    if (option === 'available') setIsAvailable(checked);
    if (option === 'professional') setIsProfessional(checked);
    // Only workers use these toggles currently
    if (activeTab === 'Worker' && onWorkerToggleChange) onWorkerToggleChange(option, checked);
  };

  // Tool handlers (only used for Service/Worker, not needed for Project)
  const handleToolToggle = (tool: string) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool],
    );
    // TODO: Add onToolsChange callback if needed for Service/Worker
  };
  const removeTool = (tool: string) => {
    setSelectedTools((prev) => prev.filter((t) => t !== tool));
    // TODO: Add onToolsChange callback if needed for Service/Worker
  };
  const clearTools = () => setSelectedTools([]);

  // Featured Tag handlers (only used for Service/Worker, not needed for Project)
  const handleFeaturedTagToggle = (tag: string) => {
    setSelectedFeaturedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
    // TODO: Add onFeaturedTagsChange callback if needed for Service/Worker
  };
  const removeFeaturedTag = (tag: string) => {
    setSelectedFeaturedTags((prev) => prev.filter((t) => t !== tag));
    // TODO: Add onFeaturedTagsChange callback if needed for Service/Worker
  };

  // Clear all filters handler
  const handleClearAllFilters = () => {
    // Reset local state
    setSelectedSkills([]);
    setSelectedTools([]);
    setSelectedFeaturedTags([]);
    setIsAvailable(false);
    setIsProfessional(false);
    setPriceRange([0, 1000]); // Reset to full range

    // Notify parent component
    if (onClearAllFilters) onClearAllFilters();
  };

  // Mock data (keep or replace with fetched options)
  const availableSkills = ['Digital Painting', 'Retrowave', 'NFT'];
  const availableTools = ['Digital Painting', 'Retrowave', 'NFT'];
  const availableFeaturedTags = ['Digital Painting', 'Retrowave', 'NFT'];

  return (
    <aside className='w-full space-y-6 text-sm'>
      {/* Worker Search Bar */}
      {activeTab === 'Worker' && (
        <WorkerSearchBar
          onSearch={onWorkerSearch}
          searchTerm={workerSearchTerm}
          resetKey={resetKey}
        />
      )}

      {/* Skills Section (Service & Project) */}
      {(activeTab === 'Service' || activeTab === 'Project') && (
        <div>
          <div className='mb-2 flex items-center justify-between'>
            <h3 className='text-xs font-medium text-text-strong-950'>Skills</h3>
            {selectedSkills.length > 0 && (
              <button onClick={clearSkills} className='text-xs text-text-secondary-600 hover:text-text-primary-600'>
                Clear
              </button>
            )}
          </div>
          <TagInputContainer>
            {selectedSkills.map((skill) => (
              <Tag.Root key={skill} variant='stroke'>
                {skill}
                <Tag.Icon as={RiCloseLine} onClick={() => removeSkill(skill)} className='ml-1 cursor-pointer' />
              </Tag.Root>
            ))}
          </TagInputContainer>
          <div className='flex flex-wrap gap-1.5'>
            {availableSkills
              .filter((skill) => !selectedSkills.includes(skill))
              .map((skill) => (
                <Tag.Root key={skill} asChild variant='gray' className='cursor-pointer'>
                  <button onClick={() => handleSkillToggle(skill)}>{skill}</button>
                </Tag.Root>
              ))}
          </div>
          <hr className='my-6 border-stroke-soft-200' />
        </div>
      )}

      {/* Tools Section (Service Only) */}
      {activeTab === 'Service' && (
        <div>
          <div className='mb-2 flex items-center justify-between'>
            <div className='flex items-center gap-1'>
              <h3 className='text-xs font-medium text-text-strong-950'>Tools</h3>
              <button className='text-icon-secondary-400'><RiInformationLine className='size-4' /></button>
            </div>
            {selectedTools.length > 0 && (
              <button onClick={clearTools} className='text-xs text-text-secondary-600 hover:text-text-primary-600'>
                Clear
              </button>
            )}
          </div>
          <TagInputContainer>
            {selectedTools.map((tool) => (
              <Tag.Root key={tool} variant='stroke'>
                {tool}
                <Tag.Icon as={RiCloseLine} onClick={() => removeTool(tool)} className='ml-1 cursor-pointer' />
              </Tag.Root>
            ))}
          </TagInputContainer>
          <div className='flex flex-wrap gap-1.5'>
            {availableTools
              .filter((tool) => !selectedTools.includes(tool))
              .map((tool) => (
                <Tag.Root key={tool} asChild variant='gray' className='cursor-pointer'>
                  <button onClick={() => handleToolToggle(tool)}>{tool}</button>
                </Tag.Root>
              ))}
          </div>
          <hr className='my-6 border-stroke-soft-200' />
        </div>
      )}

      {/* Featured Tags Section (Service Only) */}
      {activeTab === 'Service' && (
        <div>
          <div className='mb-2 flex items-center gap-1'>
            <h3 className='text-xs font-medium text-text-strong-950'>Featured Tags</h3>
            <button className='text-icon-secondary-400'><RiInformationLine className='size-4' /></button>
          </div>
          <TagInputContainer>
            {selectedFeaturedTags.map((tag) => (
              <Tag.Root key={tag} variant='stroke' className='border-black'>
                <Tag.Icon as={RiSparklingFill} className='text-orange-500' />
                {tag}
                <Tag.Icon as={RiCloseLine} onClick={() => removeFeaturedTag(tag)} className='ml-1 cursor-pointer' />
              </Tag.Root>
            ))}
          </TagInputContainer>
          <div className='flex flex-wrap gap-1.5'>
            {availableFeaturedTags
              .filter((tag) => !selectedFeaturedTags.includes(tag))
              .map((tag) => (
                <Tag.Root key={tag} asChild variant='gray' className='cursor-pointer'>
                  <button onClick={() => handleFeaturedTagToggle(tag)}>
                    <Tag.Icon as={RiSparklingFill} className='text-orange-500' />
                    {tag}
                  </button>
                </Tag.Root>
              ))}
          </div>
          <hr className='my-6 border-stroke-soft-200' />
        </div>
      )}

      {/* Toggle Options Section (Worker Only) */}
      {activeTab === 'Worker' && (
        <div className='space-y-4'>
          {/* Available Toggle */}
          <div className='flex items-center gap-3'>
            <Switch.Root id='available-toggle' checked={isAvailable} onCheckedChange={(checked) => handleToggleChange('available', checked)} />
            <div>
              <label htmlFor='available-toggle' className='cursor-pointer font-medium text-text-strong-950'>Available</label>
              <p className='text-xs text-text-secondary-600'>Recent Online</p>
            </div>
          </div>
          {/* Professional Services Toggle */}
          <div className='flex items-center gap-3'>
            <Switch.Root id='professional-toggle' checked={isProfessional} onCheckedChange={(checked) => handleToggleChange('professional', checked)} />
            <div>
              <label htmlFor='professional-toggle' className='cursor-pointer font-medium text-text-strong-950'>Professional Services</label>
              <p className='text-xs text-text-secondary-600'>Vetted skills and expertise</p>
            </div>
          </div>
          <hr className='my-6 border-stroke-soft-200' />
        </div>
      )}

      {/* Price/Budget Section (Service & Project) */}
      {(activeTab === 'Service' || activeTab === 'Project') && (
        <div>
          <h3 className='mb-3 text-xs font-medium text-text-strong-950'>
            {activeTab === 'Service' ? 'Price' : 'Budget'}
          </h3>
          <PriceRangeSlider
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            max={1000} // Example max value, adjust as needed
            step={10}
            minStepsBetweenThumbs={1}
          />
          <hr className='my-6 border-stroke-soft-200' />
        </div>
      )}

      {/* Clear Filters Button */}
      <div className="pt-4">
        <button
          onClick={handleClearAllFilters}
          className="w-full py-2 px-4 border border-gray-300 rounded-lg text-center text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </aside>
  );
};

export default ServiceFilterSidebar;
