'use client';

import React, { useState, useEffect } from 'react';
import * as Tag from '@/components/ui/tag';
import * as Switch from '@/components/ui/switch';
import { RiInformationLine, RiCloseLine, RiSparklingFill, RiInformationFill } from '@remixicon/react';
import { cn } from '@/utils/cn';
import { WorkerSearchBar } from './WorkerSearchBar';
import { PriceRangeSlider } from '../../filters/PriceRangeSlider';
import Image from 'next/image';

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
  onWorkerSkillsChange?: (skills: string[]) => void;
  onWorkerTagsChange?: (tags: string[]) => void;
  onWorkerToolsChange?: (tools: string[]) => void;
  workerSearchTerm?: string;
  workerSkills?: string[];
  workerTags?: string[];
  workerTools?: string[];
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
  onWorkerSkillsChange,
  onWorkerTagsChange,
  onWorkerToolsChange,
  workerSearchTerm,
  workerSkills = [],
  workerTags = [],
  workerTools = [],
  onProjectBudgetRangeChange,
  onProjectSkillsChange,
  onClearAllFilters,
  resetKey,
}) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [selectedFeaturedTags, setSelectedFeaturedTags] = useState<string[]>([]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isProfessional, setIsProfessional] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  useEffect(() => {
    if (activeTab === 'Worker') {
      setSelectedSkills(workerSkills);
      setSelectedFeaturedTags(workerTags);
      setSelectedTools(workerTools);
    } else {
    }
  }, [activeTab, workerSkills, workerTags, workerTools, resetKey]);

  useEffect(() => {
    setSelectedSkills([]);
    setSelectedTools([]);
    setSelectedFeaturedTags([]);
    setIsAvailable(false);
    setIsProfessional(false);
    setPriceRange([0, 1000]);
  }, [resetKey]);

  const handleSkillToggle = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(newSkills);
    if (activeTab === 'Service' && onServiceSkillsChange) onServiceSkillsChange(newSkills);
    if (activeTab === 'Worker' && onWorkerSkillsChange) onWorkerSkillsChange(newSkills);
    if (activeTab === 'Project' && onProjectSkillsChange) onProjectSkillsChange(newSkills);
  };
  const removeSkill = (skill: string) => {
    const newSkills = selectedSkills.filter((s) => s !== skill);
    setSelectedSkills(newSkills);
    if (activeTab === 'Service' && onServiceSkillsChange) onServiceSkillsChange(newSkills);
    if (activeTab === 'Worker' && onWorkerSkillsChange) onWorkerSkillsChange(newSkills);
    if (activeTab === 'Project' && onProjectSkillsChange) onProjectSkillsChange(newSkills);
  };
  const clearSkills = () => {
    setSelectedSkills([]);
    if (activeTab === 'Service' && onServiceSkillsChange) onServiceSkillsChange([]);
    if (activeTab === 'Worker' && onWorkerSkillsChange) onWorkerSkillsChange([]);
    if (activeTab === 'Project' && onProjectSkillsChange) onProjectSkillsChange([]);
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRange(value);
    if (activeTab === 'Service' && onServicePriceRangeChange) onServicePriceRangeChange(value);
    if (activeTab === 'Project' && onProjectBudgetRangeChange) onProjectBudgetRangeChange(value);
  };

  const handleToggleChange = (option: string, checked: boolean) => {
    if (option === 'available') setIsAvailable(checked);
    if (option === 'professional') setIsProfessional(checked);
    if (activeTab === 'Worker' && onWorkerToggleChange) onWorkerToggleChange(option, checked);
  };

  const handleToolToggle = (tool: string) => {
    const newTools = selectedTools.includes(tool)
      ? selectedTools.filter((t) => t !== tool)
      : [...selectedTools, tool];
    setSelectedTools(newTools);
    if (activeTab === 'Worker' && onWorkerToolsChange) onWorkerToolsChange(newTools);
  };
  const removeTool = (tool: string) => {
    const newTools = selectedTools.filter((t) => t !== tool);
    setSelectedTools(newTools);
    if (activeTab === 'Worker' && onWorkerToolsChange) onWorkerToolsChange(newTools);
  };
  const clearTools = () => {
    setSelectedTools([]);
    if (activeTab === 'Worker' && onWorkerToolsChange) onWorkerToolsChange([]);
  };

  const handleFeaturedTagToggle = (tag: string) => {
    const newTags = selectedFeaturedTags.includes(tag)
      ? selectedFeaturedTags.filter((t) => t !== tag)
      : [...selectedFeaturedTags, tag];
    setSelectedFeaturedTags(newTags);
    if (activeTab === 'Worker' && onWorkerTagsChange) onWorkerTagsChange(newTags);
  };
  const removeFeaturedTag = (tag: string) => {
    const newTags = selectedFeaturedTags.filter((t) => t !== tag);
    setSelectedFeaturedTags(newTags);
    if (activeTab === 'Worker' && onWorkerTagsChange) onWorkerTagsChange(newTags);
  };
  const clearFeaturedTags = () => {
    setSelectedFeaturedTags([]);
    if (activeTab === 'Worker' && onWorkerTagsChange) onWorkerTagsChange([]);
  };

  const handleClearAllFilters = () => {
    if (onClearAllFilters) onClearAllFilters();
  };

  const availableSkills = ['Digital Painting', 'Retrowave', 'NFT'];
  const availableTools = ['Digital Painting', 'Retrowave', 'NFT'];
  const availableFeaturedTags = ['Digital Painting', 'Retrowave', 'NFT'];

  const showWorkerSearch = activeTab === 'Worker';
  const showSkills = activeTab === 'Service' || activeTab === 'Worker' || activeTab === 'Project';
  const showTools = activeTab === 'Service' || activeTab === 'Worker';
  const showFeaturedTags = activeTab === 'Service' || activeTab === 'Worker';
  const showPriceRange = activeTab === 'Service';
  const showBudgetRange = activeTab === 'Project';
  const showWorkerToggles = activeTab === 'Worker';

  return (
    <aside className='flex flex-col w-full h-full text-sm'>
      {showWorkerSearch && (
        <div className="mb-4 px-4">
          <WorkerSearchBar
            onSearch={onWorkerSearch}
            searchTerm={workerSearchTerm}
            resetKey={resetKey}
          />
          <hr className='border-stroke-soft-200 mt-[16px]' />
        </div>
      )}

      {showSkills && (
        <div className='mx-[16px]'>
          <div className='mb-2 flex items-center justify-between'>
            <h3 className='text-[14px] font-medium text-text-strong-950'>Skills</h3>
            {selectedSkills.length > 0 && (
              <button onClick={clearSkills} className='text-[12px] font-medium text-[#525866] underline hover:text-text-primary-600'>
                Clear
              </button>
            )}
          </div>
          <TagInputContainer>
            {selectedSkills.map((skill) => (
              <Tag.Root
                key={skill}
                className="!border font-medium !border-[#525866] text-[#525866]"
              >
                {skill}
                <Tag.Icon
                  as={RiCloseLine}
                  onClick={() => removeSkill(skill)}
                  className="ml-1 cursor-pointer text-[#525866] "
                />
              </Tag.Root>
            ))}
          </TagInputContainer>
          <div className="flex flex-wrap gap-1.5">
            {availableSkills
              .filter((skill) => !selectedSkills.includes(skill))
              .map((skill, idx) => (
                <Tag.Root
                  key={skill}
                  asChild
                  variant="gray"
                  className={cn(
                    'cursor-pointer border !border-stroke-soft-200',
                    idx % 2 === 0 ? 'bg-bg-white-0' : 'bg-bg-alt-100',
                  )}
                >
                  <button onClick={() => handleSkillToggle(skill)}>
                    {skill}
                  </button>
                </Tag.Root>
              ))}
          </div>
          <hr className='border-stroke-soft-200 my-[16px]' />
        </div>
      )}

      {showFeaturedTags && (
        <div className='mx-[16px]'>
          <div className='mb-2 flex items-center justify-between'>
            <div className='flex items-center gap-1'>
              <h3 className='text-[14px] font-medium text-text-strong-950'>Featured Tags</h3>
              <RiSparklingFill className="w-4 text-[#CACFD8] h-4" />
            </div>
            {selectedFeaturedTags.length > 0 && (
              <button onClick={clearFeaturedTags} className='text-[12px] text-[#525866] font-medium underline hover:text-text-primary-600'>
                Clear
              </button>
            )}
          </div>
          <TagInputContainer>
            {selectedFeaturedTags.map((tag) => (
              <Tag.Root key={tag} className="!border font-medium !border-[#525866] text-[#525866]">
                {tag}
                <Tag.Icon as={RiCloseLine} onClick={() => removeFeaturedTag(tag)} className='ml-1 cursor-pointer text-[#525866]' />
              </Tag.Root>
            ))}
          </TagInputContainer>
          <div className='flex flex-wrap gap-1.5'>
            {availableFeaturedTags
              .filter((tag) => !selectedFeaturedTags.includes(tag))
              .map((tag, idx) => (
                <Tag.Root
                  key={tag}
                  asChild
                  variant="gray"
                  className={cn(
                    'cursor-pointer border !border-stroke-soft-200',
                    idx % 2 === 0 ? 'bg-bg-white-0' : 'bg-bg-alt-100',
                  )}
                >
                  <button onClick={() => handleFeaturedTagToggle(tag)}>
                    {tag}
                  </button>
                </Tag.Root>
              ))}
          </div>
          <hr className='border-stroke-soft-200 my-[16px]' />
        </div>
      )}

      {showTools && (
        <div className='mx-[16px]'>
          <div className='mb-2 flex items-center justify-between'>
            <div className='flex items-center gap-1'>
              <h3 className='text-[14px] font-medium text-text-strong-950'>Tools</h3>
              <RiInformationFill className="w-4 text-[#CACFD8] h-4" />
            </div>
            {selectedTools.length > 0 && (
              <button onClick={clearTools} className='text-[12px] text-[#525866] font-medium underline hover:text-text-primary-600'>
                Clear
              </button>
            )}
          </div>
          <TagInputContainer>
            {selectedTools.map((tool) => (
              <Tag.Root key={tool} className="!border font-medium !border-[#525866] text-[#525866]">
                {tool}
                <Tag.Icon as={RiCloseLine} onClick={() => removeTool(tool)} className='ml-1 cursor-pointer text-[#525866]' />
              </Tag.Root>
            ))}
          </TagInputContainer>
          <div className='flex flex-wrap gap-1.5'>
            {availableTools
              .filter((tool) => !selectedTools.includes(tool))
              .map((tool, idx) => (
                <Tag.Root
                  key={tool}
                  asChild
                  variant="gray"
                  className={cn(
                    'cursor-pointer border !border-stroke-soft-200',
                    idx % 2 === 0 ? 'bg-bg-white-0' : 'bg-bg-alt-100',
                  )}
                >
                  <button onClick={() => handleToolToggle(tool)}>
                    {tool}
                  </button>
                </Tag.Root>
              ))}
          </div>
          <hr className='border-stroke-soft-200 my-[16px]' />
        </div>
      )}

      {showPriceRange && (
        <div className='mx-[16px]'>
          <h3 className='mb-3 text-[14px] font-medium text-text-strong-950'>Price Range (USD)</h3>
          <PriceRangeSlider
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={handlePriceRangeChange}
          />
          <hr className='border-stroke-soft-200 my-[16px]' />
        </div>
      )}

      {showBudgetRange && (
        <div className='mx-[16px]'>
          <h3 className='mb-3 text-[14px] font-medium text-text-strong-950'>Budget Range (USD)</h3>
          <PriceRangeSlider
            min={0}
            max={5000}
            step={50}
            value={priceRange}
            onValueChange={handlePriceRangeChange}
          />
          <hr className='border-stroke-soft-200 my-[16px]' />
        </div>
      )}

      {showWorkerToggles && (
        <div className='mx-[16px] space-y-3'>
          <div className='flex items-center justify-between'>
            <label htmlFor='available-switch' className='flex items-center gap-1 text-[14px] font-medium text-text-strong-950'>
              Available Now
              <RiInformationFill className='h-4 w-4 text-[#CACFD8]' />
            </label>
            <Switch.Root
              id='available-switch'
              checked={isAvailable}
              onCheckedChange={(checked) => handleToggleChange('available', checked)}
            />
          </div>
          <div className='flex items-center justify-between'>
            <label htmlFor='professional-switch' className='flex items-center gap-1 text-[14px] font-medium text-text-strong-950'>
              Verified Professional
              <RiSparklingFill className='h-4 w-4 text-[#CACFD8]' />
            </label>
            <Switch.Root
              id='professional-switch'
              checked={isProfessional}
              onCheckedChange={(checked) => handleToggleChange('professional', checked)}
            />
          </div>
          <hr className='border-stroke-soft-200 my-[16px]' />
        </div>
      )}

      <div className='mt-auto px-4 pb-4'>
        <button
          onClick={handleClearAllFilters}
          className='w-full text-center text-[14px] font-medium text-[#525866] underline hover:text-text-primary-600'
        >
          Clear All Filters
        </button>
      </div>
    </aside>
  );
};

export default ServiceFilterSidebar;
