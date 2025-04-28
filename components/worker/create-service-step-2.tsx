'use client';

import React from 'react';
import * as Button from '@/components/ui/button';
import * as Input from '@/components/ui/input';
import * as Label from '@/components/ui/label';
import * as Select from '@/components/ui/select';
import {
  RiCloseLine,
  RiInformationLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiAddLine,
} from '@remixicon/react';
import { cn } from '@/utils/cn'; // Assuming utils path is correct

interface Step2PricingProps {
  nextStep: () => void;
  prevStep: () => void;
  // Add formData and setFormData props if needed
}

export function Step2Pricing({ nextStep, prevStep }: Step2PricingProps) {
  // TODO: Add state and handlers for inputs
  return (
    <div className='shadow-sm mx-auto max-w-2xl rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
      {/* Header */}
      <div className='flex items-center justify-between border-b border-stroke-soft-200 p-4'>
        <div>
          <h2 className='font-semibold text-text-strong-950'>Post Service</h2>
          <p className='text-sm text-text-secondary-600'>Price and Details</p>
        </div>
        <Button.Root variant='neutral' mode='ghost' size='medium'>
          <Button.Icon as={RiCloseLine} />
        </Button.Root>
      </div>

      {/* Form Fields */}
      <div className='space-y-6 p-6'>
        {/* Pricing and Lead Time */}
        <div className='grid grid-cols-2 gap-4'>
          {/* Pricing */}
          <div className='flex flex-col gap-1'>
            <Label.Root className='flex items-center gap-1 text-label-sm text-text-strong-950'>
              Pricing
              <RiInformationLine className='text-icon-secondary-400 size-4' />
            </Label.Root>
            <div className='flex gap-2'>
              <Input.Root className='flex-1'>
                <Input.Wrapper>
                  <Input.InlineAffix>¥</Input.InlineAffix>
                  <Input.Input
                    type='number'
                    placeholder='0.00'
                    defaultValue={0.0}
                  />
                </Input.Wrapper>
              </Input.Root>
              <Select.Root defaultValue='CNY' size='small'>
                <Select.Trigger className='w-auto'>
                  {/* Placeholder for Flag + Currency */}
                  <div className='flex items-center gap-1.5'>
                    {/* TODO: Replace with dynamic flag based on currency */}
                    <span className='flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white'>
                      C
                    </span>
                    CNY
                  </div>
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    <Select.Item value='CNY'>CNY</Select.Item>
                    <Select.Item value='USD'>USD</Select.Item>
                    {/* Add other currencies */}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </div>
          </div>
          {/* Lead Time */}
          <div className='flex flex-col gap-1'>
            <Label.Root className='text-label-sm text-text-strong-950'>
              Lead Time
            </Label.Root>
            <Select.Root defaultValue='7' size='small'>
              <Select.Trigger>
                <Select.Value placeholder='Select lead time' />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  <Select.Item value='1'>1 Day</Select.Item>
                  <Select.Item value='3'>3 Days</Select.Item>
                  <Select.Item value='7'>7 Days</Select.Item>
                  <Select.Item value='14'>14 Days</Select.Item>
                  {/* Add other options */}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </div>
        </div>

        {/* Service Includes */}
        <div className='flex flex-col gap-1'>
          <Label.Root className='text-label-sm text-text-strong-950'>
            Service Includes
          </Label.Root>
          {/* TODO: Map over included items - state needed */}
          <div className='flex items-center gap-2 rounded-lg border border-stroke-soft-200 p-3'>
            <Input.Root className='flex-1'>
              <Input.Wrapper>
                <Input.Input placeholder='Ex. Source File' />
              </Input.Wrapper>
            </Input.Root>
            <Button.Root variant='neutral' mode='ghost' size='small'>
              <Button.Icon as={RiCloseLine} />
            </Button.Root>
          </div>
          {/* Placeholder for another included item */}
          <div className='flex items-center gap-2 rounded-lg border border-stroke-soft-200 p-3'>
            <Input.Root className='flex-1'>
              <Input.Wrapper>
                <Input.Input placeholder='Ex. Commercial Use License' />
              </Input.Wrapper>
            </Input.Root>
            <Button.Root variant='neutral' mode='ghost' size='small'>
              <Button.Icon as={RiCloseLine} />
            </Button.Root>
          </div>
          {/* Add Button */}
          <Button.Root
            variant='neutral'
            mode='stroke'
            size='small'
            className='mt-2 w-fit'
          >
            <Button.Icon as={RiAddLine} />
            Add Item
          </Button.Root>
        </div>
      </div>

      {/* Footer / Navigation */}
      <div className='flex items-center justify-between border-t border-stroke-soft-200 p-4'>
        {/* Step Indicators */}
        <div className='flex gap-1.5'>
          <span className='block h-1.5 w-1.5 rounded-full bg-bg-soft-200'></span>
          <span className='block h-1.5 w-4 rounded-full bg-primary-base'></span>
          <span className='block h-1.5 w-1.5 rounded-full bg-bg-soft-200'></span>
        </div>
        {/* Action Buttons */}
        <div>
          <Button.Root
            variant='neutral'
            mode='stroke'
            className='mr-2'
            onClick={prevStep}
          >
            <Button.Icon as={RiArrowLeftSLine} />
            Previous
          </Button.Root>
          <Button.Root variant='neutral' mode='filled' onClick={nextStep}>
            Next
            <Button.Icon as={RiArrowRightSLine} />
          </Button.Root>
        </div>
      </div>
    </div>
  );
}
