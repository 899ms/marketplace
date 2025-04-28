'use client';

import React from 'react';
import { RiCalendarEventLine } from '@remixicon/react';

// --- Calendar Widget ---
export function CalendarWidget() {
  // Basic structure - needs actual calendar implementation
  return (
    <div className='rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4'>
      <h3 className='mb-3 text-label-lg font-medium text-text-strong-950'>
        Calendar
      </h3>
      {/* Placeholder for calendar UI */}
      <div className='text-text-secondary-600 flex h-32 items-center justify-center'>
        <RiCalendarEventLine className='mr-2 size-5' />
        Calendar View Here
      </div>
    </div>
  );
}

// --- Meetings Widget ---
export function MeetingsWidget() {
  // Placeholder data
  const meetings = [
    { time: '10:00 AM', title: 'Project Kickoff' },
    { time: '02:30 PM', title: 'Client Sync' },
  ];
  return (
    <div className='rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4'>
      <h3 className='mb-3 text-label-lg font-medium text-text-strong-950'>
        Today&apos;s Meetings
      </h3>
      <ul className='space-y-2'>
        {meetings.map((meeting, idx) => (
          <li key={idx} className='flex items-center text-paragraph-sm'>
            <span className='w-16 font-medium text-text-strong-950'>
              {meeting.time}
            </span>
            <span className='text-text-secondary-600'>{meeting.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Worker Right Sidebar ---
export function WorkerRightSidebar() {
  return (
    <aside className='hidden w-64 shrink-0 flex-col gap-6 lg:flex xl:w-72'>
      <CalendarWidget />
      <MeetingsWidget />
      {/* Add other right sidebar widgets here */}
    </aside>
  );
}
