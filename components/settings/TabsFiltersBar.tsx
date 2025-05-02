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
  RiSearch2Line,      // ← search icon
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
        <Tabs.List className="flex flex-wrap rounded-md bg-[var(--bg-weak-50,#F5F7FA)] p-1">
          {['all', ...(isBuyer ? ['inProgress', 'completed'] : ['active', 'inactive'])].map(
            (key) => (
              <Tabs.Trigger
                key={key}
                value={key}
                className="rounded-md px-3 py-1.5 text-[12px] text-gray-600 data-[state=active]:bg-white data-[state=active]:text-gray-900"
              >
                {key === 'inProgress'
                  ? 'In progress'
                  : key.charAt(0).toUpperCase() + key.slice(1)}
              </Tabs.Trigger>
            ),
          )}
        </Tabs.List>

        {/* -------- Search + filters -------- */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <RiSearch2Line className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 size-4 text-gray-600" />
            <Input
              placeholder="Search…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 w-full rounded-md border border-stroke-soft-200 pl-8 pr-3 text-[12px] placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-ring sm:w-[200px]"
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
            <Button.Root
              variant="neutral"
              mode="stroke"
              size="small"
              className="h-9 text-[12px] text-gray-600"
              onClick={onSellerFilter}
            >
              <Button.Icon as={RiFilter3Line} className="size-4" />
              Filter
            </Button.Root>
          )}

          {/* Sort */}
          <Dropdown.Root>
            <Dropdown.Trigger asChild>
              <button className="inline-flex h-9 items-center gap-1 whitespace-nowrap rounded-md border border-stroke-soft-200 bg-bg-white-0 px-3 text-[12px] text-gray-600 transition-colors hover:bg-bg-neutral-subtle-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <RiSortAsc className="size-4" />
                Sort by
              </button>
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
