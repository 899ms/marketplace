import React from 'react';
import { RiSearchLine } from '@remixicon/react'; // Removed RiArrowDownSLine as Select likely includes it
import { Input } from '@/components/ui/input';
import * as SelectPrimitive from '@/components/ui/select'; // Import as namespace

export function ServiceSearchBar() {
  // TODO: Implement state and handlers for filters
  return (
    <div className='mb-4 rounded-lg bg-gray-100 p-4'> {/* Adjust background color if needed */}
      <div className='flex flex-wrap items-center gap-4'>
        {/* Search Input */}
        <div className='relative flex-grow sm:flex-grow-0 sm:basis-1/3'>
          <RiSearchLine className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500' />
          <Input
            type='search'
            placeholder='Search...'
            className='w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 py-2 text-sm' // Adjust styles as needed
          />
        </div>

        {/* Real-time Dropdown */}
        <SelectPrimitive.Root> {/* Use Root from namespace */}
          <SelectPrimitive.Trigger className='flex-grow rounded-md border border-gray-300 bg-white px-3 py-2 text-sm sm:flex-grow-0 sm:basis-1/6'>
            <SelectPrimitive.Value placeholder='Real-time' />
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Content>
            {/* TODO: Add actual options */}
            <SelectPrimitive.Item value='realtime'>Real-time</SelectPrimitive.Item>
            <SelectPrimitive.Item value='scheduled'>Scheduled</SelectPrimitive.Item>
          </SelectPrimitive.Content>
        </SelectPrimitive.Root>

        {/* Price Range Dropdown */}
        <SelectPrimitive.Root>
          <SelectPrimitive.Trigger className='flex-grow rounded-md border border-gray-300 bg-white px-3 py-2 text-sm sm:flex-grow-0 sm:basis-1/6'>
            <SelectPrimitive.Value placeholder='Price Range' />
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Content>
            {/* TODO: Add actual options */}
            <SelectPrimitive.Item value='low'>$0 - $50</SelectPrimitive.Item>
            <SelectPrimitive.Item value='medium'>$51 - $200</SelectPrimitive.Item>
            <SelectPrimitive.Item value='high'>$201+</SelectPrimitive.Item>
          </SelectPrimitive.Content>
        </SelectPrimitive.Root>

        {/* Due Date Dropdown */}
        <SelectPrimitive.Root>
          <SelectPrimitive.Trigger className='flex-grow rounded-md border border-gray-300 bg-white px-3 py-2 text-sm sm:flex-grow-0 sm:basis-1/6'>
            <SelectPrimitive.Value placeholder='Due Date' />
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Content>
            {/* TODO: Add actual options */}
            <SelectPrimitive.Item value='today'>Today</SelectPrimitive.Item>
            <SelectPrimitive.Item value='week'>This Week</SelectPrimitive.Item>
            <SelectPrimitive.Item value='month'>This Month</SelectPrimitive.Item>
          </SelectPrimitive.Content>
        </SelectPrimitive.Root>
      </div>
    </div>
  );
} 