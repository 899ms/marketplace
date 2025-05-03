import React, { useState, useEffect, useRef } from 'react';
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
    // Skip if it's the initial mount or if the search term hasn't changed
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

    // Only set timeout if there's a search term or it was cleared (to handle empty search)
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

  // Handle filter changes
  const handleFilterChange = (filterType: string, value: string) => {
    if (onFilterChange) {
      onFilterChange(filterType, value);
    }
  };

  return (
    <div className="mb-4 rounded-[12px] bg-[#E1E4EA] px-[24px] py-[20px]">
      <div className="flex flex-wrap items-center gap-2">
        {/* Search Input */}
        <div className="relative flex-grow sm:flex-grow-0 sm:basis-1/3">
          <RiSearchLine className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
          <Input
            type="search"
            placeholder="Search services..."
            className="w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 py-2 text-[14px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Real-time Dropdown */}
        <SelectPrimitive.Root onValueChange={(value) => handleFilterChange('leadTime', value)}>
          <SelectPrimitive.Trigger className="flex-grow rounded-md border border-gray-300 bg-white px-3 py-2 text-[14px] sm:flex-grow-0 sm:basis-[calc(20%+8px)]">
            <SelectPrimitive.Value placeholder="Lead Time" />
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Content>
            <SelectPrimitive.Item value="7">7 days</SelectPrimitive.Item>
            <SelectPrimitive.Item value="14">14 days</SelectPrimitive.Item>
            <SelectPrimitive.Item value="30">30 days</SelectPrimitive.Item>
          </SelectPrimitive.Content>
        </SelectPrimitive.Root>

        {/* Price Range Dropdown */}
        <SelectPrimitive.Root onValueChange={(value) => handleFilterChange('priceRange', value)}>
          <SelectPrimitive.Trigger className="flex-grow rounded-md border border-gray-300 bg-white px-3 py-2 text-[14px] sm:flex-grow-0 sm:basis-[calc(20%+8px)]">
            <SelectPrimitive.Value placeholder="Price Range" />
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Content>
            <SelectPrimitive.Item value="low">$0 - $50</SelectPrimitive.Item>
            <SelectPrimitive.Item value="medium">$51 - $200</SelectPrimitive.Item>
            <SelectPrimitive.Item value="high">$201+</SelectPrimitive.Item>
          </SelectPrimitive.Content>
        </SelectPrimitive.Root>

        {/* Sort Dropdown */}
        <SelectPrimitive.Root onValueChange={(value) => handleFilterChange('sort', value)}>
          <SelectPrimitive.Trigger className="flex-grow rounded-md border border-gray-300 bg-white px-3 py-2 text-[14px] sm:flex-grow-0 sm:basis-[calc(20%+8px)]">
            <SelectPrimitive.Value placeholder="Sort By" />
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Content>
            <SelectPrimitive.Item value="newest">Newest First</SelectPrimitive.Item>
            <SelectPrimitive.Item value="oldest">Oldest First</SelectPrimitive.Item>
            <SelectPrimitive.Item value="price_asc">Price: Low to High</SelectPrimitive.Item>
            <SelectPrimitive.Item value="price_desc">Price: High to Low</SelectPrimitive.Item>
          </SelectPrimitive.Content>
        </SelectPrimitive.Root>
      </div>
    </div>
  );
}
