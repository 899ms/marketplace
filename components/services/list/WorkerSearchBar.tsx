import React from 'react';
import { RiSearchLine } from '@remixicon/react';
import { Input } from '@/components/ui/input';

export function WorkerSearchBar() {
  // TODO: Implement state and handlers for search
  return (
    <div className='mb-4'> {/* Add margin below */}
      <div className='relative w-full'>
        <RiSearchLine className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500' />
        <Input
          type='search'
          placeholder='Search workers...'
          className='w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm' // Adjust styles as needed
        />
      </div>
    </div>
  );
} 