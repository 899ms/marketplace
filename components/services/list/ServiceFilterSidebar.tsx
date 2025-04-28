'use client';

import React, { useState } from 'react';
import * as Tag from '@/components/ui/tag';
import * as Switch from '@/components/ui/switch';
import FilterTag from '@/components/filters/FilterTag'; // Import extracted FilterTag
import { RiInformationLine, RiFireFill } from '@remixicon/react';
import { cn } from '@/utils/cn';

// Remove empty interface
/*
// TODO: Define props if filter state needs to be managed externally
interface ServiceFilterSidebarProps {}
*/

const ServiceFilterSidebar: React.FC /*<ServiceFilterSidebarProps>*/ = () => {
  // Remove props type annotation
  // Internal state for filters - can be lifted later if needed
  const [selectedSkills, setSelectedSkills] = useState(['Retrowave']);
  const [selectedTools, setSelectedTools] = useState(['Retrowave']);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [professionalOnly, setProfessionalOnly] = useState(false);

  // --- Filter Handlers ---
  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };
  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };
  const clearSkills = () => setSelectedSkills([]);

  const handleToolToggle = (tool: string) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool],
    );
  };
  const removeToolFilter = (tool: string) => {
    setSelectedTools(selectedTools.filter((t) => t !== tool));
  };
  const clearTools = () => setSelectedTools([]);

  const clearAllFilters = () => {
    clearSkills();
    clearTools();
    setAvailableOnly(false);
    setProfessionalOnly(false);
  };

  // Mock data for available filters (replace with actual data later)
  const availableSkills = ['Digital Painting', 'Retrowave', 'NFT'];
  const availableTools = ['Digital Painting', 'Retrowave', 'NFT'];
  const featuredTags = ['Digital Painting', 'Retrowave', 'NFT'];

  return (
    <aside className='w-64 flex-shrink-0'>
      {' '}
      {/* Changed from div to aside */}
      {/* Skills Section */}
      <div className='mb-6'>
        <div className='mb-2 flex items-center justify-between'>
          <h3 className='text-label-md font-medium text-text-strong-950'>
            Skills
          </h3>
          {selectedSkills.length > 0 && (
            <button
              onClick={clearSkills}
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
          {availableSkills.map((skill) => (
            <Tag.Root
              key={skill}
              asChild // Use asChild to make the Tag act like a button
              variant='stroke'
              className={cn(
                'cursor-pointer',
                selectedSkills.includes(skill) &&
                  'bg-primary-light-100 border-primary-base text-primary-base', // Active state
              )}
            >
              <button onClick={() => handleSkillToggle(skill)}>{skill}</button>
            </Tag.Root>
          ))}
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
              onClick={clearTools}
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
          {availableTools.map((tool) => (
            <Tag.Root
              key={tool}
              asChild
              variant='stroke'
              className={cn(
                'cursor-pointer',
                selectedTools.includes(tool) &&
                  'bg-primary-light-100 border-primary-base text-primary-base',
              )}
            >
              <button onClick={() => handleToolToggle(tool)}>{tool}</button>
            </Tag.Root>
          ))}
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
          {featuredTags.map((tag) => (
            <Tag.Root key={tag} variant='stroke'>
              <Tag.Icon as={RiFireFill} className='text-orange-500' />
              {tag}
            </Tag.Root>
          ))}
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
          <Switch.Root
            id='available-toggle'
            checked={availableOnly}
            onCheckedChange={setAvailableOnly}
          />
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
          <Switch.Root
            id='professional-toggle'
            checked={professionalOnly}
            onCheckedChange={setProfessionalOnly}
          />
        </div>
      </div>
      {/* Clear Filters Button */}
      {(selectedSkills.length > 0 ||
        selectedTools.length > 0 ||
        availableOnly ||
        professionalOnly) && ( // Show Clear only if filters are active
        <button
          onClick={clearAllFilters}
          className='text-text-secondary-600 text-sm w-full rounded-lg border border-stroke-soft-200 py-2 hover:bg-bg-weak-50'
        >
          Clear Filters
        </button>
      )}
    </aside>
  );
};

export default ServiceFilterSidebar;
