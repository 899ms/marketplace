import React from 'react';
import { RiSearchLine } from '@remixicon/react';
import { Input } from '@/components/ui/input';
import * as SelectPrimitive from '@/components/ui/select';

export function ProjectSearchBar() {
  // TODO: Implement state and handlers for filters
  return (
    <div className='mb-4 rounded-lg bg-gray-100 p-4'> {/* Adjust background color if needed */}
      <div className='flex flex-wrap items-center gap-4'>
        {/* Search Input */}
        <div className='relative flex-grow sm:flex-grow-0 sm:basis-1/3'>
          <RiSearchLine className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500' />
          <Input
            type='search'
            placeholder='Search projects...' // Updated placeholder
            className='w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm' // Adjusted styles
          />
        </div>

        {/* Deadline Dropdown */}
        <SelectPrimitive.Root>
          <SelectPrimitive.Trigger className='flex-grow rounded-md border border-gray-300 bg-white px-3 py-2 text-sm sm:flex-grow-0 sm:basis-1/6'>
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
        <SelectPrimitive.Root>
          <SelectPrimitive.Trigger className='flex-grow rounded-md border border-gray-300 bg-white px-3 py-2 text-sm sm:flex-grow-0 sm:basis-1/6'>
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
        <SelectPrimitive.Root>
          <SelectPrimitive.Trigger className='flex-grow rounded-md border border-gray-300 bg-white px-3 py-2 text-sm sm:flex-grow-0 sm:basis-1/6'>
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