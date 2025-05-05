'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import {
  RiCalendarLine,
} from '@remixicon/react';


import * as Button from '@/components/ui/button';

import DayPicker from '@/components/day-picker';

import * as WidgetBox from '@/components/widget-box';






export default function WidgetSchedule({
  emptyState,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
  emptyState?: boolean;
}) {
  const [selectedDay, setSelectedDay] = React.useState<Date>(new Date());

  // React.useEffect(() => {
  //   console.log('selectedDay: ', format(selectedDay, 'yyy MMM dd'));
  // }, [selectedDay]);

  return (
    <WidgetBox.Root {...rest} className="ring-0">
      <WidgetBox.Header>
        <WidgetBox.HeaderIcon as={RiCalendarLine} />
        Calendar
        <Button.Root variant='neutral' mode='stroke' size='xsmall'>
          See All
        </Button.Root>
      </WidgetBox.Header>

      <DayPicker defaultDate={selectedDay} onDayChange={setSelectedDay} />

    </WidgetBox.Root>
  );
}
