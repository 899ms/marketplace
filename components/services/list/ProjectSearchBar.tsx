import React, { useState, useEffect, useRef } from 'react';
import { RiSearchLine } from '@remixicon/react';
import { Input } from '@/components/ui/input';
import * as SelectPrimitive from '@/components/ui/select';

interface ProjectSearchBarProps {
  onSearch: (term: string) => void;
  onFilterChange?: (filterType: string, value: string) => void;
  searchTerm?: string;
  resetKey?: number;
}

export function ProjectSearchBar({
  onSearch,
  onFilterChange,
  searchTerm: externalSearchTerm,
  resetKey = 0
}: ProjectSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const prevSearchTerm = useRef(searchTerm);
  const isInitialMount = useRef(true);

  // Reset search input when resetKey changes
  useEffect(() => {
    if (resetKey > 0) {
      setSearchTerm('');
    }
  }, [resetKey]);

  // Update internal state when external search term changes
  useEffect(() => {
    if (externalSearchTerm !== undefined && externalSearchTerm !== searchTerm) {
      setSearchTerm(externalSearchTerm);
    }
  }, [externalSearchTerm]);

  // Implement improved debounced search
  useEffect(() => {
    // Skip if it's the initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevSearchTerm.current = searchTerm;
      return;
    }

    // Skip if the search term hasn't changed
    if (prevSearchTerm.current === searchTerm) {
      return;
    }

    // Update previous search term
    prevSearchTerm.current = searchTerm;

    // Clear previous timeout if it exists
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
      searchTimeout.current = null;
    }

    // Only set timeout if there's a search term or it was cleared
    searchTimeout.current = setTimeout(() => {
      onSearch(searchTerm);
    }, 2000);

    // Cleanup function
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
        searchTimeout.current = null;
      }
    };
  }, [searchTerm]); // Removed onSearch from dependencies

  // Handle filter changes (add logic here if needed)
  const handleFilterChange = (filterType: string, value: string) => {
    if (onFilterChange) {
      onFilterChange(filterType, value);
    }
  };

  return (
    <div className='mb-4 rounded-lg bg-[#E1E4EA] px-6 py-5'> {/* Adjust background color if needed */}
      <div className='flex flex-wrap items-center gap-[8px]'>
        {/* Search Input */}
        <div className='relative flex-grow sm:flex-grow-0 sm:basis-1/3 max-w-[310px] '>
          <RiSearchLine className='absolute left-3 top-1/2 size-5 -translate-y-1/2 text-[#525866]' />
          <Input
            type='search'
            placeholder='Search projects...' // Updated placeholder
            className='w-full max-w-[310px] rounded-[10px] border font-[400] border-gray-300 bg-white py-2 pl-9 pr-3 text-[14px] text-[#99A0AE]' // Adjusted styles
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Deadline Dropdown */}
        <SelectPrimitive.Root onValueChange={(value) => handleFilterChange('deadline', value)}>
          <SelectPrimitive.Trigger className='w-full sm:flex-none sm:w-[200px] rounded-[0.6rem] border border-[#E1E4EA] bg-white px-3 py-2 text-[14px] data-[placeholder]:!text-[#000000]'>
            <SelectPrimitive.Value placeholder='Deadline' /> {/* Updated placeholder */}
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Content>
            {/* TODO: Add actual deadline options */}
            <SelectPrimitive.Item value='urgent'>Urgent</SelectPrimitive.Item>
            <SelectPrimitive.Item value='week'>Within a week</SelectPrimitive.Item>
            <SelectPrimitive.Item value='month'>Within a month</SelectPrimitive.Item>
          </SelectPrimitive.Content>
        </SelectPrimitive.Root>

        {/* Purpose Dropdown */}
        <SelectPrimitive.Root onValueChange={(value) => handleFilterChange('purpose', value)}>
          <SelectPrimitive.Trigger
            className='w-full sm:flex-none sm:w-[200px] rounded-[0.6rem] border border-[#E1E4EA] bg-white px-3 py-2 text-[14px] data-[placeholder]:!text-[#000000]'>
            <SelectPrimitive.Value placeholder='Purpose' /> {/* Updated placeholder */}
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Content>
            {/* TODO: Add actual purpose options */}
            <SelectPrimitive.Item value='mixing'>Mixing</SelectPrimitive.Item>
            <SelectPrimitive.Item value='mastering'>Mastering</SelectPrimitive.Item>
            <SelectPrimitive.Item value='songwriting'>Songwriting</SelectPrimitive.Item>
          </SelectPrimitive.Content>
        </SelectPrimitive.Root>

        {/* Posting Date Dropdown */}
        <SelectPrimitive.Root onValueChange={(value) => handleFilterChange('postingDate', value)}>
          <SelectPrimitive.Trigger className='w-full sm:flex-none sm:w-[200px] rounded-[0.6rem] border border-[#E1E4EA] bg-white px-3 py-2 text-[14px] data-[placeholder]:!text-[#000000]'>
            <SelectPrimitive.Value placeholder='Posting Date' /> {/* Updated placeholder */}
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Content>
            {/* TODO: Add actual posting date options */}
            <SelectPrimitive.Item value='today'>Today</SelectPrimitive.Item>
            <SelectPrimitive.Item value='last_week'>Last 7 days</SelectPrimitive.Item>
            <SelectPrimitive.Item value='last_month'>Last 30 days</SelectPrimitive.Item>
          </SelectPrimitive.Content>
        </SelectPrimitive.Root>
      </div>
    </div>
  );
} 