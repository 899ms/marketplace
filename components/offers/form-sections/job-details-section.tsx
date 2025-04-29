'use client';

import React from 'react';
import { UseFormReturn, Controller } from 'react-hook-form';
import {
  Root as Select,
  Content as SelectContent,
  Item as SelectItem,
  Trigger as SelectTrigger,
  Value as SelectValue,
} from '@/components/ui/select';
import { Root as InputRoot, inputVariants } from '@/components/ui/input';
import { Root as Textarea } from '@/components/ui/textarea';
import { Root as Label } from '@/components/ui/label';
import { SendOfferFormData } from '../schema';
import { cn } from '@/utils/cn';
import type { User, Job } from '@/utils/supabase/types'; // Import User and Job types

// Use Omit to exclude handleSubmit and other methods not needed directly here
type FormMethods = Omit<UseFormReturn<SendOfferFormData>, 'handleSubmit'>;

// Update props interface
interface JobDetailsSectionProps {
  form: FormMethods;
  sellers: Pick<User, 'id' | 'username' | 'full_name'>[]; // Add sellers prop
  jobs: Pick<Job, 'id' | 'title'>[]; // Add jobs prop
  isLoading: boolean; // Add isLoading prop
}

export function JobDetailsSection({
  form,
  sellers,
  jobs,
  isLoading, // Destructure new props
}: JobDetailsSectionProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const inputStyles = inputVariants();

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-semibold'>Job details</h2>

      {/* Send & Select Order */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div>
          <Label htmlFor='sendTo'>Send To</Label>
          <Controller
            name='sendTo'
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoading || sellers.length === 0}
              >
                <SelectTrigger className='mt-1'>
                  <SelectValue
                    placeholder={
                      isLoading ? 'Loading sellers...' : 'Select Recipient'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {sellers.map((seller) => (
                    <SelectItem key={seller.id} value={seller.id}>
                      {seller.username} ({seller.full_name})
                    </SelectItem>
                  ))}
                  {!isLoading && sellers.length === 0 && (
                    <div className='text-sm text-text-tertiary-500 px-2 py-1.5'>
                      No sellers found
                    </div>
                  )}
                </SelectContent>
              </Select>
            )}
          />
          {errors.sendTo && (
            <p className='text-sm mt-1 text-red-500'>{errors.sendTo.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor='selectOrder'>Related Job/Order</Label>
          <Controller
            name='selectOrder'
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoading || jobs.length === 0}
              >
                <SelectTrigger className='mt-1'>
                  <SelectValue
                    placeholder={
                      isLoading ? 'Loading jobs...' : 'Select Job/Order Title'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {jobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title}
                    </SelectItem>
                  ))}
                  {!isLoading && jobs.length === 0 && (
                    <div className='text-sm text-text-tertiary-500 px-2 py-1.5'>
                      No jobs found
                    </div>
                  )}
                </SelectContent>
              </Select>
            )}
          />
          {errors.selectOrder && (
            <p className='text-sm mt-1 text-red-500'>
              {errors.selectOrder.message}
            </p>
          )}
        </div>
      </div>

      {/* Contract Title */}
      <div>
        <Label htmlFor='contractTitle'>Contract title</Label>
        <InputRoot className='mt-1' size='medium'>
          <input
            id='contractTitle'
            {...register('contractTitle')}
            placeholder='Enter the contract title...'
            className={inputStyles.input({ size: 'medium' })}
          />
        </InputRoot>
        {errors.contractTitle && (
          <p className='text-sm mt-1 text-red-500'>
            {errors.contractTitle.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <Label htmlFor='description'>Description</Label>
        <Textarea
          id='description'
          {...register('description')}
          placeholder='Description text here...'
          rows={5}
          className='mt-1'
        />
        {errors.description && (
          <p className='text-sm mt-1 text-red-500'>
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Skill Levels - This was removed from the main form schema, so commenting out */}
      {/*
      <div>
        <Label htmlFor='skillLevels'>Skill Levels</Label>
        <Controller
          name='skillLevels'
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(value) => field.onChange(value ? [value] : [])}
              value={field.value?.[0] || ''}
            >
              <SelectTrigger className='mt-1'>
                <SelectValue placeholder='Select Skills (multi-select needed)' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='directo'>Directo</SelectItem>
                <SelectItem value='trainee'>Trainee</SelectItem>
                <SelectItem value='skilled'>Skilled</SelectItem>
                <SelectItem value='expert'>Expert</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.skillLevels && (
          <p className='text-sm mt-1 text-red-500'>
            {errors.skillLevels.message}
          </p>
        )}
      </div>
      */}
    </div>
  );
}
