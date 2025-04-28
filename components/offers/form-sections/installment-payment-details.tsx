'use client';

import React, { useState } from 'react';
import {
  UseFormReturn,
  Controller,
  useFieldArray,
  FieldErrors,
} from 'react-hook-form';
import { Root as InputRoot, inputVariants } from '@/components/ui/input';
import { Root as Textarea } from '@/components/ui/textarea';
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
import { RiCalendarLine, RiDeleteBinLine } from '@remixicon/react';
import { format } from 'date-fns';

type FormMethods = Omit<UseFormReturn<SendOfferFormData>, 'handleSubmit'>;

interface InstallmentPaymentDetailsProps {
  form: FormMethods;
}

export function InstallmentPaymentDetails({
  form,
}: InstallmentPaymentDetailsProps) {
  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = form;
  const [milestoneCalendarOpen, setMilestoneCalendarOpen] = useState<
    number | null
  >(null);
  const inputStyles = inputVariants();

  const { fields, append, remove } = useFieldArray<
    SendOfferFormData,
    'milestones'
  >({
    control,
    name: 'milestones',
  });

  const addMilestone = () => {
    append({
      description: '',
      amount: 0,
      currency: 'CNY',
      deadline: undefined,
    });
  };

  // Type assertion for nested array errors - handle potential undefined
  const milestoneErrors = errors.milestones as
    | FieldErrors<SendOfferFormData['milestones']>[number]
    | undefined;

  return (
    <div className='space-y-4 rounded-md border bg-gray-50 p-4'>
      <h3 className='mb-4 font-medium'>Installment Payment Details</h3>
      <div className='space-y-4'>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className='shadow-sm relative rounded border bg-white p-4'
          >
            {/* Remove Milestone Button */}
            <div className='absolute right-2 top-2'>
              <Button
                type='button'
                onClick={() => remove(index)}
                className='rounded p-1 text-red-500 hover:bg-red-100 hover:text-red-700'
                aria-label='Remove milestone'
              >
                <RiDeleteBinLine className='h-4 w-4' />
              </Button>
            </div>

            {/* Milestone Description */}
            <Label className='mb-2 block font-medium'>{`${index + 1}. Milestone description`}</Label>
            <Textarea
              {...register(`milestones.${index}.description`)}
              placeholder='Placeholder text...'
              rows={3}
              className='mt-1'
            />
            {errors.milestones?.[index]?.description && (
              <p className='text-sm mt-1 text-red-500'>
                {errors.milestones[index]?.description?.message}
              </p>
            )}

            {/* Milestone Amount & Deadline */}
            <div className='mt-4 grid grid-cols-1 items-end gap-4 md:grid-cols-3'>
              {/* Milestone Amount Input */}
              <div>
                <Label htmlFor={`milestones.${index}.amount`}>Amount</Label>
                <InputRoot className='mt-1' size='medium'>
                  <div className={inputStyles.wrapper({ size: 'medium' })}>
                    <div className='pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3'>
                      <span className='sm:text-sm text-gray-500'>¥</span>
                    </div>
                    <input
                      id={`milestones.${index}.amount`}
                      type='number'
                      step='0.01'
                      {...register(`milestones.${index}.amount`, {
                        valueAsNumber: true,
                      })}
                      placeholder='0.00'
                      className={cn(
                        inputStyles.input({ size: 'medium' }),
                        'pl-7 pr-16',
                      )}
                    />
                    <div className='absolute inset-y-0 right-0 flex items-center pr-1'>
                      <Label
                        htmlFor={`milestones.${index}.currency`}
                        className='sr-only'
                      >
                        Currency
                      </Label>
                      <Controller
                        name={`milestones.${index}.currency`}
                        control={control}
                        render={({ field: currencyField }) => (
                          <select
                            id={`milestones.${index}.currency`}
                            {...currencyField}
                            className='focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-full appearance-none rounded-md border-transparent bg-transparent py-0 pl-1 pr-2 text-gray-500'
                          >
                            <option>CNY</option>
                            <option>USD</option>
                            <option>EUR</option>
                          </select>
                        )}
                      />
                    </div>
                  </div>
                </InputRoot>
                {errors.milestones?.[index]?.amount && (
                  <p className='text-sm mt-1 text-red-500'>
                    {errors.milestones[index]?.amount?.message}
                  </p>
                )}
                {errors.milestones?.[index]?.currency &&
                  !errors.milestones?.[index]?.amount && (
                    <p className='text-sm mt-1 text-red-500'>
                      {errors.milestones[index]?.currency?.message}
                    </p>
                  )}
              </div>

              {/* Milestone Deadline Date Picker */}
              <div>
                <Label htmlFor={`milestones.${index}.deadline`}>
                  Deadline (Optional)
                </Label>
                <Controller
                  name={`milestones.${index}.deadline`}
                  control={control}
                  render={({ field: milestoneField }) => (
                    <Popover
                      open={milestoneCalendarOpen === index}
                      onOpenChange={(isOpen) =>
                        setMilestoneCalendarOpen(isOpen ? index : null)
                      }
                    >
                      <PopoverTrigger asChild>
                        <Button
                          type='button'
                          className={cn(
                            'mt-1 w-full justify-start rounded-md border border-gray-300 bg-white px-3 py-2 text-left font-normal hover:bg-gray-50',
                            !milestoneField.value && 'text-muted-foreground',
                          )}
                        >
                          <RiCalendarLine className='mr-2 h-4 w-4' />
                          {milestoneField.value ? (
                            format(milestoneField.value, 'PPP')
                          ) : (
                            <span>DD / MM / YYYY</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Calendar
                          mode='single'
                          selected={milestoneField.value}
                          onSelect={(date) => {
                            milestoneField.onChange(date);
                            setMilestoneCalendarOpen(null);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.milestones?.[index]?.deadline && (
                  <p className='text-sm mt-1 text-red-500'>
                    {errors.milestones[index]?.deadline?.message}
                  </p>
                )}
              </div>
              {/* Empty div for grid alignment */}
              <div></div>
            </div>
          </div>
        ))}
      </div>
      {/* Add Milestone Button */}
      <Button
        type='button'
        onClick={addMilestone}
        className='text-sm mt-4 w-max rounded-md border border-gray-300 bg-white px-3 py-2 hover:bg-gray-50'
      >
        Add milestone
      </Button>
      {/* Display root error for milestones array if present */}
      {errors.milestones &&
        typeof errors.milestones === 'object' &&
        !Array.isArray(errors.milestones) &&
        errors.milestones.message && (
          <p className='text-sm mt-2 text-red-500'>
            {errors.milestones.message}
          </p>
        )}
    </div>
  );
}
