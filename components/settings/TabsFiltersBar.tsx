'use client';

import React from 'react';
import Link from 'next/link';
import * as Tabs from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import * as DatePicker from '@/components/ui/datepicker';
import * as Dropdown from '@/components/ui/dropdown';
import * as Button from '@/components/ui/button';
import {
  RiCalendarLine,
  RiFilter3Line,
  RiSortAsc,
  RiSearch2Line,
  RiArrowDownSLine,      // ← search icon
} from '@remixicon/react';

interface Props {
  activeTab: string;
  setActiveTab: (v: string) => void;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (d: Date | undefined) => void;
  sortOption: string;
  setSortOption: (v: string) => void;
  isBuyer: boolean;
  onSellerFilter?: () => void;
}

/* ------------------------------------------------------------ */
/* Tabs row + search + filters / sort                            */
/* ------------------------------------------------------------ */
export default function TabsFiltersBar({
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  selectedDate,
  setSelectedDate,
  setSortOption,
  isBuyer,
  onSellerFilter,
}: Props) {
  return (
    <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        {/* ---------------- Tabs ---------------- */}
        <Tabs.List className="flex rounded-lg bg-[#F5F7FA] p-1 h-auto">
          {['all', ...(isBuyer ? ['inProgress', 'completed'] : ['active', 'inactive'])].map(
            (key) => (
              <Tabs.Trigger
                key={key}
                value={key}
                className="rounded-lg px-8 py-1.5 text-[14px] text-[#99A0AE] font-medium data-[state=active]:bg-white data-[state=active]:text-[#525866] !data-[state=active]:shadow-md"
              >
                {key === 'inProgress'
                  ? 'In progress'
                  : key.charAt(0).toUpperCase() + key.slice(1)}
              </Tabs.Trigger>
            ),
          )}
        </Tabs.List>

        {/* -------- Search + filters -------- */}
        <div className="flex gap-2 items-center">
          {/* Search */}
          <div className="relative lg:w-[300px]">
            <RiSearch2Line className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 size-4 text-[#99A0AE]" />
            <Input
              placeholder="Search…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 w-full rounded-lg border border-[#E1E4EA] pl-8 pr-3 text-[12px] placeholder:text-[#99A0AE] focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          {isBuyer ? (
            /* Buyer – date picker */
            <Dropdown.Root>
              <Dropdown.Trigger asChild>
                <button className="inline-flex h-9 items-center gap-1 whitespace-nowrap rounded-md border border-stroke-soft-200 bg-bg-white-0 px-3 text-[12px] text-gray-600 transition-colors hover:bg-bg-neutral-subtle-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <RiCalendarLine className="size-4" />
                  {selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}
                </button>
              </Dropdown.Trigger>
              <Dropdown.Content align="start" className="w-auto p-0">
                <DatePicker.Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </Dropdown.Content>
            </Dropdown.Root>
          ) : (
            /* Seller – Filter button */
            <Button.Root variant='neutral' mode='stroke' size='small' className='text-[#525866] text-[14px] font-medium'>
              <Button.Icon as={RiFilter3Line} className="w-5 h-4 text-[#525866]" />
              Filter
            </Button.Root>
          )}

          {/* Sort */}
          <Dropdown.Root>
            <Dropdown.Trigger asChild>
              <Button.Root variant='neutral' mode='stroke' size='small' className='text-[#525866] text-[14px] font-normal'>
                <Button.Icon as={RiSortAsc} className="w-4 h-5 text-[#99A0AE]" />
                Sort by
                <Button.Icon as={RiArrowDownSLine} className='w-4 h-5 text-[#99A0AE]' />
              </Button.Root>
            </Dropdown.Trigger>
            <Dropdown.Content align="end">
              <Dropdown.Item onSelect={() => setSortOption('date_asc')}>
                Date Ascending
              </Dropdown.Item>
              <Dropdown.Item onSelect={() => setSortOption('date_desc')}>
                Date Descending
              </Dropdown.Item>
              <Dropdown.Item onSelect={() => setSortOption('name_asc')}>
                Name Ascending
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>
        </div>
      </div>
    </Tabs.Root>
  );
}
