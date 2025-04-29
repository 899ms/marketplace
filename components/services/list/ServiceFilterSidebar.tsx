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
  activeTab: 'Service' | 'Worker' | 'Project'; // Add activeTab prop
}

const ServiceFilterSidebar: React.FC<ServiceFilterSidebarProps> = ({
  activeTab, // Destructure activeTab
}) => {
  const [selectedSkills, setSelectedSkills] = useState(['Retrowave']);
  const [selectedTools, setSelectedTools] = useState(['Retrowave']);
  const [selectedFeaturedTags, setSelectedFeaturedTags] = useState([
    'Retrowave',
  ]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isProfessional, setIsProfessional] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([300, 450]); // Price state

  // --- Filter Handlers ---
  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };
  const removeSkill = (skill: string) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skill));
  };
  const clearSkills = () => setSelectedSkills([]);

  const handleToolToggle = (tool: string) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool],
    );
  };
  const removeTool = (tool: string) => {
    setSelectedTools((prev) => prev.filter((t) => t !== tool));
  };
  const clearTools = () => setSelectedTools([]);

  const handleFeaturedTagToggle = (tag: string) => {
    setSelectedFeaturedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };
  const removeFeaturedTag = (tag: string) => {
    setSelectedFeaturedTags((prev) => prev.filter((t) => t !== tag));
  };

  // Mock data
  const availableSkills = ['Digital Painting', 'Retrowave', 'NFT'];
  const availableTools = ['Digital Painting', 'Retrowave', 'NFT'];
  const availableFeaturedTags = ['Digital Painting', 'Retrowave', 'NFT'];

  return (
    <aside className='w-full space-y-6 text-sm'> { /* Base size is sm, headings will be xs */}
      {/* Conditionally render Worker Search Bar at the top */}
      {activeTab === 'Worker' && <WorkerSearchBar />}

      {/* Filters for Service/Worker Tabs */}
      {(activeTab === 'Service' || activeTab === 'Worker') && (
        <>
          {/* Skills Section */}
          <div>
            <div className='mb-2 flex items-center justify-between'>
              <h3 className='text-xs font-medium text-text-strong-950'>Skills</h3> {/* Changed to text-xs */}
              {selectedSkills.length > 0 && (
                <button
                  onClick={clearSkills}
                  className='text-xs text-text-secondary-600 hover:text-text-primary-600'
                >
                  Clear
                </button>
              )}
            </div>
            <TagInputContainer>
              {selectedSkills.map((skill) => (
                <Tag.Root key={skill} variant='stroke'> {/* Use stroke for selected */}
                  {skill}
                  <Tag.Icon
                    as={RiCloseLine}
                    onClick={() => removeSkill(skill)}
                    className='ml-1 cursor-pointer'
                  />
                </Tag.Root>
              ))}
            </TagInputContainer>
            <div className='flex flex-wrap gap-1.5'>
              {availableSkills
                .filter((skill) => !selectedSkills.includes(skill))
                .map((skill) => (
                  <Tag.Root
                    key={skill}
                    asChild
                    variant='gray' /* Use gray for available */
                    className='cursor-pointer'
                  >
                    <button onClick={() => handleSkillToggle(skill)}>{skill}</button>
                  </Tag.Root>
                ))}
            </div>
            <hr className='my-6 border-stroke-soft-200' />
          </div>

          {/* Tools Section */}
          <div>
            <div className='mb-2 flex items-center justify-between'>
              <div className='flex items-center gap-1'>
                <h3 className='text-xs font-medium text-text-strong-950'>Tools</h3> {/* Changed to text-xs */}
                <button className='text-icon-secondary-400'>
                  <RiInformationLine className='size-4' />
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
            <TagInputContainer>
              {selectedTools.map((tool) => (
                <Tag.Root key={tool} variant='stroke'> {/* Use stroke for selected */}
                  {tool}
                  <Tag.Icon
                    as={RiCloseLine}
                    onClick={() => removeTool(tool)}
                    className='ml-1 cursor-pointer'
                  />
                </Tag.Root>
              ))}
            </TagInputContainer>
            <div className='flex flex-wrap gap-1.5'>
              {availableTools
                .filter((tool) => !selectedTools.includes(tool))
                .map((tool) => (
                  <Tag.Root
                    key={tool}
                    asChild
                    variant='gray' /* Use gray for available */
                    className='cursor-pointer'
                  >
                    <button onClick={() => handleToolToggle(tool)}>{tool}</button>
                  </Tag.Root>
                ))}
            </div>
            <hr className='my-6 border-stroke-soft-200' />
          </div>

          {/* Featured Tags Section */}
          <div>
            <div className='mb-2 flex items-center gap-1'>
              <h3 className='text-xs font-medium text-text-strong-950'>Featured Tags</h3> {/* Changed to text-xs */}
              <button className='text-icon-secondary-400'>
                <RiInformationLine className='size-4' />
              </button>
            </div>
            <TagInputContainer>
              {selectedFeaturedTags.map((tag) => (
                <Tag.Root
                  key={tag}
                  variant='stroke' /* Use stroke for selected */
                  className='border-black' /* Specific border from image */
                >
                  <Tag.Icon as={RiSparklingFill} className='text-orange-500' />
                  {tag}
                  <Tag.Icon
                    as={RiCloseLine}
                    onClick={() => removeFeaturedTag(tag)}
                    className='ml-1 cursor-pointer'
                  />
                </Tag.Root>
              ))}
            </TagInputContainer>
            <div className='flex flex-wrap gap-1.5'>
              {availableFeaturedTags
                .filter((tag) => !selectedFeaturedTags.includes(tag))
                .map((tag) => (
                  <Tag.Root
                    key={tag}
                    asChild
                    variant='gray' /* Use gray for available */
                    className='cursor-pointer'
                  >
                    <button onClick={() => handleFeaturedTagToggle(tag)}>
                      <Tag.Icon as={RiSparklingFill} className='text-orange-500' />
                      {tag}
                    </button>
                  </Tag.Root>
                ))}
            </div>
            <hr className='my-6 border-stroke-soft-200' />
          </div>

          {/* Toggle Options Section */}
          <div className='space-y-4'>
            {/* Available Toggle */}
            <div className='flex items-center gap-3'> { /* Use gap for spacing */}
              <Switch.Root
                id='available-toggle'
                checked={isAvailable}
                onCheckedChange={setIsAvailable}
              />
              {/* Text block */}
              <div>
                <label htmlFor='available-toggle' className='cursor-pointer font-medium text-text-strong-950'>
                  Available
                </label>
                <p className='text-xs text-text-secondary-600'>Recent Online</p>
              </div>
            </div>

            {/* Professional Services Toggle */}
            <div className='flex items-center gap-3'> { /* Use gap for spacing */}
              <Switch.Root
                id='professional-toggle'
                checked={isProfessional}
                onCheckedChange={setIsProfessional}
              />
              {/* Text block */}
              <div>
                <label htmlFor='professional-toggle' className='cursor-pointer font-medium text-text-strong-950'>
                  Professional Services
                </label>
                <p className='text-xs text-text-secondary-600'>
                  Vetted skills and expertise
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Filters for Project Tab */}
      {activeTab === 'Project' && (
        <>
          {/* Skills Section */}
          <div>
            <div className='mb-2 flex items-center justify-between'>
              {/* TODO: Add info icon? */}
              <h3 className='text-xs font-medium text-text-strong-950'>Skills</h3>
              {selectedSkills.length > 0 && (
                <button
                  onClick={clearSkills}
                  className='text-xs text-text-secondary-600 hover:text-text-primary-600'
                >
                  Clear
                </button>
              )}
            </div>
            <TagInputContainer>
              {selectedSkills.map((skill) => (
                <Tag.Root key={skill} variant='stroke'>
                  {skill}
                  <Tag.Icon
                    as={RiCloseLine}
                    onClick={() => removeSkill(skill)}
                    className='ml-1 cursor-pointer'
                  />
                </Tag.Root>
              ))}
            </TagInputContainer>
            <div className='flex flex-wrap gap-1.5'>
              {availableSkills
                .filter((skill) => !selectedSkills.includes(skill))
                .map((skill) => (
                  <Tag.Root
                    key={skill}
                    asChild
                    variant='gray'
                    className='cursor-pointer'
                  >
                    <button onClick={() => handleSkillToggle(skill)}>{skill}</button>
                  </Tag.Root>
                ))}
            </div>
            <hr className='my-6 border-stroke-soft-200' />
          </div>

          {/* Tools Section */}
          <div>
            <div className='mb-2 flex items-center justify-between'>
              <div className='flex items-center gap-1'>
                <h3 className='text-xs font-medium text-text-strong-950'>Tools</h3>
                {/* TODO: Add info icon? */}
                <button className='text-icon-secondary-400'>
                  <RiInformationLine className='size-4' />
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
            <TagInputContainer>
              {selectedTools.map((tool) => (
                <Tag.Root key={tool} variant='stroke'>
                  {tool}
                  <Tag.Icon
                    as={RiCloseLine}
                    onClick={() => removeTool(tool)}
                    className='ml-1 cursor-pointer'
                  />
                </Tag.Root>
              ))}
            </TagInputContainer>
            <div className='flex flex-wrap gap-1.5'>
              {availableTools
                .filter((tool) => !selectedTools.includes(tool))
                .map((tool) => (
                  <Tag.Root
                    key={tool}
                    asChild
                    variant='gray'
                    className='cursor-pointer'
                  >
                    <button onClick={() => handleToolToggle(tool)}>{tool}</button>
                  </Tag.Root>
                ))}
            </div>
            <hr className='my-6 border-stroke-soft-200' />
          </div>

          {/* Price Section */}
          <div>
            <h3 className='mb-3 text-xs font-medium text-text-strong-950'>
              Price
            </h3>
            <PriceRangeSlider
              value={priceRange}
              onValueChange={setPriceRange}
              max={1000} // Example max value
              step={10} // Example step
              minStepsBetweenThumbs={1} // Example min distance
            />
            {/* Removed separate value display */}
            <hr className='my-6 border-stroke-soft-200' />
          </div>
        </>
      )}
    </aside>
  );
};

export default ServiceFilterSidebar;
