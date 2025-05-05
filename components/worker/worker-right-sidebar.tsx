'use client';

import React from 'react';
import { RiCalendarLine } from '@remixicon/react';
import * as Button from '@/components/ui/button';
import * as Divider from '@/components/ui/divider';
import WidgetSchedule from '../widgets/widget-schedule';
import * as TabMenuHorizontal from '@/components/ui/tab-menu-horizontal';
import { User } from '@/utils/supabase/types';
import { DayPicker } from 'react-day-picker';

// --- Calendar Widget ---
export function CalendarWidget() {
  // Basic structure - needs actual calendar implementation
  return (
    <div className='p-4'>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row gap-1 items-center'>
            <RiCalendarLine className='mr-2 size-6 text-[#525866]' />
            <p className='text-[16px] text-[#0E121B] font-medium'>Calendar</p>
          </div>
          <Button.Root mode='stroke' size='xxsmall' variant='neutral' className='p-2'>See All</Button.Root>
        </div>
      </div>
    </div>
  );
}

const MeetingCard = (
  { withName, deadline, budget, status }: { withName: string, deadline: string, budget: string, status: string }
) => {

  return (
    <div className='p-4 bg-[#F5F7FA] flex flex-col gap-4 rounded-lg'>
      <div className='flex flex-col gap-1'>
        <p className='text-[14px] text-[#0E121B] font-medium'>Meeting with {withName}</p>
        <p className='text-[14px] text-[#525866]'>Deadline {deadline}</p>
      </div>
      <div className='flex flex-row justify-between'>
        <p className='text-[14px] text-[#525866]'>${budget}</p>
        <div className='flex flex-row gap-1 items-center'>

          {status === 'Pending' && <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.49364 0.62176L11.9236 10.1353C11.9737 10.2229 12 10.3224 12 10.4236C12 10.5248 11.9737 10.6242 11.9236 10.7119C11.8736 10.7995 11.8017 10.8723 11.715 10.9229C11.6283 10.9735 11.5301 11.0002 11.43 11.0002H0.570004C0.469946 11.0002 0.371652 10.9735 0.285 10.9229C0.198348 10.8723 0.126392 10.7995 0.0763644 10.7119C0.0263365 10.6242 -6.35474e-07 10.5248 0 10.4236C6.35497e-07 10.3224 0.0263391 10.2229 0.076368 10.1353L5.50636 0.62176C5.5564 0.534116 5.62835 0.461336 5.715 0.410735C5.80165 0.360135 5.89995 0.333496 6 0.333496C6.10005 0.333496 6.19835 0.360135 6.285 0.410735C6.37165 0.461336 6.4436 0.534116 6.49364 0.62176ZM5.42998 8.11727V9.27043H6.57002V8.11727H5.42998ZM5.42998 4.08123V6.96412H6.57002V4.08123H5.42998Z" fill="#FF8447" />
          </svg>
          }
          <p className='text-[12px] text-[#525866] leading-none'>

            {status === 'Timeout' ? <div className='rounded-full bg-[#FB3748] text-white px-2 py-1 flex flex-row gap-1 items-center'>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.2999 2.2998L14.5999 7.9998L11.2999 13.6998H4.6999L1.3999 7.9998L4.6999 2.2998H11.2999ZM7.3999 9.79981V10.9998H8.5999V9.79981H7.3999ZM7.3999 4.9998V8.5998H8.5999V4.9998H7.3999Z" fill="white" />
              </svg>
              {status}
            </div> : status}
          </p></div>
      </div>

    </div>
  )
}



// --- Meetings Widget ---
export function MeetingsWidget() {
  // Placeholder data
  const meetings = [
    { with: 'John Doe', deadline: '01.05.2025', budget: '1000', status: 'Submitted' },
    { with: 'John Doe', deadline: '01.05.2025', budget: '1000', status: 'Pending' },
    { with: 'John Doe', deadline: '01.05.2025', budget: '1000', status: 'Timeout' },
    { with: 'John Doe', deadline: '01.05.2025', budget: '1000', status: 'Timeout' },


  ];
  return (
    <TabMenuHorizontal.Root defaultValue='7_days'  >
      <TabMenuHorizontal.List className='p-4'>
        <TabMenuHorizontal.Trigger value='7_days' className='flex-1'>
          7 Days
        </TabMenuHorizontal.Trigger>
        <TabMenuHorizontal.Trigger value='15_days' className='flex-1'>
          15 Days
        </TabMenuHorizontal.Trigger>
        <TabMenuHorizontal.Trigger value='30_days' className='flex-1'>
          30 Days
        </TabMenuHorizontal.Trigger>
      </TabMenuHorizontal.List>
      <TabMenuHorizontal.Content value='7_days'>
        <div className='flex flex-col gap-2 p-3'>
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.with} withName={meeting.with} deadline={meeting.deadline} budget={meeting.budget} status={meeting.status} />
          ))}
        </div>
      </TabMenuHorizontal.Content>
      <TabMenuHorizontal.Content value='15_days'>
        <div className='flex flex-col gap-2 p-3'>
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.with} withName={meeting.with} deadline={meeting.deadline} budget={meeting.budget} status={meeting.status} />
          ))}
        </div>
      </TabMenuHorizontal.Content>
      <TabMenuHorizontal.Content value='30_days'>
        <div className='flex flex-col gap-2 p-3'>
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.with} withName={meeting.with} deadline={meeting.deadline} budget={meeting.budget} status={meeting.status} />
          ))}
        </div>
      </TabMenuHorizontal.Content>
    </TabMenuHorizontal.Root>
  );
}

// --- Worker Right Sidebar Props ---
interface WorkerRightSidebarProps {
  userProfile: User;
}

// --- Worker Right Sidebar ---
export function WorkerRightSidebar({ userProfile }: WorkerRightSidebarProps) {
  return (
    <aside className='hidden w-64 shrink-0 lg:block min-w-[352px]'>
      <div className='shadow-sm sticky top-20 flex flex-col rounded-xl border border-stroke-soft-200 bg-bg-white-0  mb-6'>

        <WidgetSchedule />
        <Divider.Root className='!mb-0 !pb-0' />
        <MeetingsWidget />
      </div>
    </aside>
  );
}
