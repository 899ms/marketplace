import React, { useState, useEffect } from 'react';
import { RiSearchLine } from '@remixicon/react'; // Removed RiArrowDownSLine as Select likely includes it
import { Input } from '@/components/ui/input';
import * as SelectPrimitive from '@/components/ui/select'; // Import as namespace

interface ServiceSearchBarProps {
  onSearch: (term: string) => void;
  onFilterChange?: (filterType: string, value: string) => void;
  searchTerm?: string; // Add prop to receive search term value
  resetKey?: number; // Add prop to trigger reset when filters are cleared
}

export function ServiceSearchBar({
  onSearch,
  onFilterChange,
  searchTerm: externalSearchTerm,
  resetKey = 0
}: ServiceSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Reset search input when resetKey changes
  useEffect(() => {
    if (resetKey > 0) {
      setSearchTerm('');
    }
  }, [resetKey]);

  // Update internal state when external search term changes
  useEffect(() => {
    if (externalSearchTerm !== undefined) {
      setSearchTerm(externalSearchTerm);
    }
  }, [externalSearchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  // Handle filter changes
  const handleFilterChange = (filterType: string, value: string) => {
    if (onFilterChange) {
      onFilterChange(filterType, value);
    }
  };

  return (
    <div className='mb-4 rounded-lg bg-gray-100 p-4'> {/* Adjust background color if needed */}
      <form onSubmit={handleSubmit} className='flex flex-wrap items-center gap-4'>
        {/* Search Input */}
        <div className='relative flex-grow sm:flex-grow-0 sm:basis-1/3'>
          <RiSearchLine className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500' />
          <Input
            type='search'
            placeholder='Search services...'
            className='w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 py-2 text-sm' // Adjust styles as needed
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
        >
          Search
        </button>

        {/* Real-time Dropdown */}
        <SelectPrimitive.Root onValueChange={(value) => handleFilterChange('leadTime', value)}>
          <SelectPrimitive.Trigger className='flex-grow rounded-md border border-gray-300 bg-white px-3 py-2 text-sm sm:flex-grow-0 sm:basis-1/6'>
            <SelectPrimitive.Value placeholder='Lead Time' />
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Content>
            <SelectPrimitive.Item value='7'>7 days</SelectPrimitive.Item>
            <SelectPrimitive.Item value='14'>14 days</SelectPrimitive.Item>
            <SelectPrimitive.Item value='30'>30 days</SelectPrimitive.Item>
          </SelectPrimitive.Content>
        </SelectPrimitive.Root>

        {/* Price Range Dropdown */}
        <SelectPrimitive.Root onValueChange={(value) => handleFilterChange('priceRange', value)}>
          <SelectPrimitive.Trigger className='flex-grow rounded-md border border-gray-300 bg-white px-3 py-2 text-sm sm:flex-grow-0 sm:basis-1/6'>
            <SelectPrimitive.Value placeholder='Price Range' />
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Content>
            <SelectPrimitive.Item value='low'>$0 - $50</SelectPrimitive.Item>
            <SelectPrimitive.Item value='medium'>$51 - $200</SelectPrimitive.Item>
            <SelectPrimitive.Item value='high'>$201+</SelectPrimitive.Item>
          </SelectPrimitive.Content>
        </SelectPrimitive.Root>

        {/* Sort Dropdown */}
        <SelectPrimitive.Root onValueChange={(value) => handleFilterChange('sort', value)}>
          <SelectPrimitive.Trigger className='flex-grow rounded-md border border-gray-300 bg-white px-3 py-2 text-sm sm:flex-grow-0 sm:basis-1/6'>
            <SelectPrimitive.Value placeholder='Sort By' />
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Content>
            <SelectPrimitive.Item value='newest'>Newest First</SelectPrimitive.Item>
            <SelectPrimitive.Item value='oldest'>Oldest First</SelectPrimitive.Item>
            <SelectPrimitive.Item value='price_asc'>Price: Low to High</SelectPrimitive.Item>
            <SelectPrimitive.Item value='price_desc'>Price: High to Low</SelectPrimitive.Item>
          </SelectPrimitive.Content>
        </SelectPrimitive.Root>
      </form>
    </div>
  );
} 