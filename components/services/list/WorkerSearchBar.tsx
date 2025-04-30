import React, { useState, useEffect } from 'react';
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
    if (onSearch) onSearch(searchTerm);
  };

  return (
    <div className='mb-4'>
      <form onSubmit={handleSubmit} className='relative w-full flex'>
        <div className='relative flex-grow'>
          <RiSearchLine className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500' />
          <Input
            type='search'
            placeholder='Search workers...'
            className='w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
        >
          Search
        </button>
      </form>
    </div>
  );
} 