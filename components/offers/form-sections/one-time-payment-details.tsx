'use client';

import React, { useState } from 'react';
import { UseFormReturn, Controller } from 'react-hook-form';
import { Root as InputRoot, inputVariants } from '@/components/ui/input';
import { Root as Label } from '@/components/ui/label';
import { Root as Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/datepicker';
import {
  Root as Popover,
  Content as PopoverContent,
  Trigger as PopoverTrigger,
} from '@/components/ui/popover';
import { SendOfferFormData } from '../schema';
import { cn } from '@/utils/cn';
import { RiCalendarLine } from '@remixicon/react';
import { format } from 'date-fns';

type FormMethods = Omit<UseFormReturn<SendOfferFormData>, 'handleSubmit'>;

interface OneTimePaymentDetailsProps {
  form: FormMethods;
}

export function OneTimePaymentDetails({ form }: OneTimePaymentDetailsProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const [deadlineCalendarOpen, setDeadlineCalendarOpen] = useState(false);
  const inputStyles = inputVariants();

  return (
    <div className='space-y-4 rounded-md border bg-gray-50 p-4'>
      <h3 className='mb-4 font-medium'>One-time Payment Details</h3>
      <div className='grid grid-cols-1 items-end gap-4 md:grid-cols-3'>
        {/* Amount Input with Affix */}
        <div>
          <Label htmlFor='amount'>Amount</Label>
          <InputRoot className='mt-1' size='medium'>
            <input
              id='amount'
              type='number'
              step='0.01'
              {...register('amount', { valueAsNumber: true })}
              placeholder='0.00'
              className={cn(inputStyles.input({ size: 'medium' }))}
            />
          </InputRoot>
          {errors.amount && (
            <p className='text-sm mt-1 text-red-500'>{errors.amount.message}</p>
          )}
        </div>

        {/* Deadline Date Picker */}
        <div>
          <Label htmlFor='deadline'>Deadline (Optional)</Label>
          <Controller
            name='deadline'
            control={control}
            render={({ field }) => (
              <Popover
                open={deadlineCalendarOpen}
                onOpenChange={setDeadlineCalendarOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    type='button'
                    className={cn(
                      'mt-1 w-full justify-start rounded-md border border-gray-300 bg-white px-3 py-2 text-left font-normal hover:bg-gray-50',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    <RiCalendarLine className='mr-2 h-4 w-4' />
                    {field.value ? (
                      format(field.value, 'PPP')
                    ) : (
                      <span>DD / MM / YYYY</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={field.value || undefined}
                    onSelect={(date) => {
                      field.onChange(date);
                      setDeadlineCalendarOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.deadline && (
            <p className='text-sm mt-1 text-red-500'>
              {errors.deadline.message}
            </p>
          )}
        </div>
        {/* Empty div for grid alignment */}
        <div></div>
      </div>
    </div>
  );
}
