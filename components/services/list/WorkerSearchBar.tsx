import React, { useState, useEffect, useRef } from 'react';
import { RiSearchLine } from '@remixicon/react';
import { Input } from '@/components/ui/input';

interface WorkerSearchBarProps {
  onSearch?: (term: string) => void;
  searchTerm?: string;
  resetKey?: number;
}

export function WorkerSearchBar({
  onSearch,
  searchTerm: externalSearchTerm,
  resetKey = 0
}: WorkerSearchBarProps) {
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
    // Skip if no search handler provided
    if (!onSearch) return;

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

    // Set new timeout to trigger search after 2 seconds
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

  return (
    <div className='mb-4'>
      <div className='relative w-full'>
        <RiSearchLine className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500' />
        <Input
          type='search'
          placeholder='Search workers...'
          className='w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
} 