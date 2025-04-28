'use client';

import React from 'react';
import * as Input from '@/components/ui/input';
import * as Select from '@/components/ui/select';
import { RiSearchLine } from '@remixicon/react';

export function ProjectFilters() {
  return (
    <div className='bg-bg-subtle-100 mb-6 flex flex-col gap-3 rounded-lg p-3 sm:flex-row'>
      {/* Search Input */}
      <div className='flex-1'>
        <Input.Root>
          <Input.Wrapper>
            <Input.Icon as={RiSearchLine} />
            <Input.Input placeholder='Search Projects...' />
          </Input.Wrapper>
        </Input.Root>
      </div>
      {/* Filter Dropdowns */}
      <div className='flex flex-wrap gap-3'>
        <Select.Root defaultValue='deadline' size='small'>
          <Select.Trigger>
            <Select.Value placeholder='Deadline' />
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              <Select.Item value='deadline'>Deadline</Select.Item>
              <Select.Item value='today'>Today</Select.Item>
              <Select.Item value='this-week'>This Week</Select.Item>
              <Select.Item value='this-month'>This Month</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
        <Select.Root defaultValue='purpose' size='small'>
          <Select.Trigger>
            <Select.Value placeholder='Purpose' />
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              <Select.Item value='purpose'>Purpose</Select.Item>
              <Select.Item value='business'>Business</Select.Item>
              <Select.Item value='personal'>Personal</Select.Item>
              <Select.Item value='education'>Education</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
        <Select.Root defaultValue='posting-date' size='small'>
          <Select.Trigger>
            <Select.Value placeholder='Posting Date' />
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              <Select.Item value='posting-date'>Posting Date</Select.Item>
              <Select.Item value='last-24h'>Last 24h</Select.Item>
              <Select.Item value='last-week'>Last Week</Select.Item>
              <Select.Item value='last-month'>Last Month</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </div>
    </div>
  );
}
