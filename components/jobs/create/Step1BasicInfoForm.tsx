'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import * as Button from '@/components/ui/button';
import * as Input from '@/components/ui/input';
import * as Label from '@/components/ui/label';
import * as Select from '@/components/ui/select';
import * as Switch from '@/components/ui/switch';
import * as Textarea from '@/components/ui/textarea';
import { RiInformationLine, RiCalendarLine } from '@remixicon/react';
import { CreateJobFormData } from '@/app/jobs/create/schema';
import FormFieldError from './FormFieldError'; // Assuming a general error component

interface Step1Props {
  formMethods: UseFormReturn<CreateJobFormData>;
  nextStep: () => void;
}

const Step1BasicInfoForm: React.FC<Step1Props> = ({
  formMethods,
  nextStep,
}) => {
  const {
    register,
    formState: { errors },
  } = formMethods;

  return (
    <form onSubmit={(e) => e.preventDefault()} className='space-y-6'>
      {/* Subject/Title */}
      <div className='flex flex-col gap-1'>
        <Label.Root
          htmlFor='title'
          className='text-label-sm text-text-strong-950'
        >
          Subject
        </Label.Root>
        <Input.Root>
          <Input.Wrapper>
            <Input.Input
              id='title'
              placeholder='Project subject'
              {...register('title')}
            />
          </Input.Wrapper>
        </Input.Root>
        <FormFieldError error={errors.title} />
      </div>

      {/* Detail/Description */}
      <div className='flex flex-col gap-1'>
        <Label.Root
          htmlFor='description'
          className='text-label-sm text-text-strong-950'
        >
          Detail
        </Label.Root>
        <Textarea.Root
          id='description'
          rows={4}
          placeholder='Details'
          className='resize-none'
          {...register('description')}
        />
        <span className='text-xs text-text-secondary-600 self-end'>
          Max 1000 characters
        </span>
        <FormFieldError error={errors.description} />
      </div>

      {/* Amount & Deadline Row */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {/* Amount/Budget */}
        <div className='flex flex-col gap-1'>
          <Label.Root
            htmlFor='budget'
            className='flex items-center gap-1 text-label-sm text-text-strong-950'
          >
            Amount
            <RiInformationLine className='text-icon-secondary-400 size-4' />
          </Label.Root>
          <div className='flex gap-2'>
            <Input.Root className='flex-1'>
              <Input.Wrapper>
                <Input.InlineAffix>¥</Input.InlineAffix>{' '}
                {/* TODO: Make dynamic based on currency */}
                <Input.Input
                  id='budget'
                  type='number'
                  placeholder='0.00'
                  step='0.01' // Allow decimals
                  {...register('budget', { valueAsNumber: true })}
                />
              </Input.Wrapper>
            </Input.Root>
            {/* TODO: Connect Select to formMethods.control if needed */}
            <Select.Root
              defaultValue='USD'
              size='small'
              {...register('currency')}
            >
              <Select.Trigger className='w-auto'>
                <Select.Value />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {/* Add currency symbols/flags later */}
                  <Select.Item value='USD'>USD</Select.Item>
                  <Select.Item value='CNY'>CNY</Select.Item>
                  <Select.Item value='EUR'>EUR</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </div>
          <FormFieldError error={errors.budget} />
          <FormFieldError error={errors.currency} />
        </div>

        {/* Deadline */}
        <div className='flex flex-col gap-1'>
          <Label.Root
            htmlFor='deadline'
            className='flex items-center gap-1 text-label-sm text-text-strong-950'
          >
            Deadline (Optional)
            <RiInformationLine className='text-icon-secondary-400 size-4' />
          </Label.Root>
          <Input.Root>
            <Input.Wrapper>
              <Input.Icon>
                <RiCalendarLine />
              </Input.Icon>
              <Input.Input
                id='deadline'
                placeholder='DD / MM / YYYY'
                type='date' // Use date type for better UX
                {...register('deadline')}
              />
            </Input.Wrapper>
          </Input.Root>
          <FormFieldError error={errors.deadline} />
        </div>
      </div>

      {/* Negotiate Budget */}
      <div className='flex items-center gap-2'>
        <Switch.Root id='negotiate-budget' {...register('negotiateBudget')} />
        <Label.Root
          htmlFor='negotiate-budget'
          className='text-sm text-text-secondary-600 cursor-pointer'
        >
          Negotiate the budget
        </Label.Root>
      </div>
      <FormFieldError error={errors.negotiateBudget} />

      {/* Navigation */}
      <div className='flex justify-end'>
        {/* Type submit triggers RHF validation if mode allows */}
        <Button.Root variant='neutral' mode='filled' onClick={nextStep}>
          Next
        </Button.Root>
      </div>
    </form>
  );
};

export default Step1BasicInfoForm;
