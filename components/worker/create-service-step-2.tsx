'use client';

import React from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import {
  CreateServiceFormData,
  isStep2Complete,
} from '@/app/worker/services/create/schema';
import * as Button from '@/components/ui/button';
import * as Input from '@/components/ui/input';
import * as Label from '@/components/ui/label';
import * as Select from '@/components/ui/select';
import {
  RiCloseLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiInformationLine,
  RiAddLine,
  RiDeleteBinLine,
} from '@remixicon/react';

// Dummy currency options - replace with actual data source if available
const currencyOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
  { value: 'CNY', label: 'CNY' },
];

interface Step2PricingProps {
  formMethods: UseFormReturn<CreateServiceFormData>;
  nextStep: () => void;
  prevStep: () => void;
}

export function Step2Pricing({
  formMethods,
  nextStep,
  prevStep,
}: Step2PricingProps) {
  const {
    register,
    setValue,
    getValues,
    watch,
    control,
    formState: { errors },
  } = formMethods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'additionalServices',
  });

  const currency = watch('currency') || 'USD';

  const addAdditionalService = () => {
    append({ name: '', price: 0 });
  };

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
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {/* Pricing Field */}
          <div className='flex flex-col gap-1'>
            <Label.Root className='flex items-center gap-1 text-label-sm text-text-strong-950'>
              Pricing
            </Label.Root>
            <div className='flex items-center gap-0'>
              <Input.Root className='flex-grow rounded-r-none'>
                <Input.Wrapper>
                  <div className='px-3 text-text-sub-600'>
                    {currency === 'USD'
                      ? '$'
                      : currency === 'EUR'
                        ? '€'
                        : currency === 'GBP'
                          ? '£'
                          : currency === 'CNY'
                            ? '¥'
                            : '$'}
                  </div>
                  <Input.Input
                    type='number'
                    placeholder='0.00'
                    min='1'
                    step='0.01'
                    {...register('price', { valueAsNumber: true })}
                  />
                </Input.Wrapper>
              </Input.Root>
              <Select.Root
                value={currency}
                onValueChange={(value) =>
                  setValue('currency', value, { shouldValidate: true })
                }
              >
                <Select.Trigger className='w-[100px] rounded-l-none border-l-0'>
                  <Select.Value />
                </Select.Trigger>
                <Select.Content>
                  {currencyOptions.map((option) => (
                    <Select.Item key={option.value} value={option.value}>
                      {option.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </div>
            {errors.price && (
              <p className='text-xs mt-1 text-red-500'>
                {errors.price?.message?.toString()}
              </p>
            )}
            {errors.currency && (
              <p className='text-xs mt-1 text-red-500'>
                {errors.currency?.message?.toString()}
              </p>
            )}
          </div>

          {/* Lead Time Field */}
          <div className='flex flex-col gap-1'>
            <Label.Root className='text-label-sm text-text-strong-950'>
              Lead Time (days)
            </Label.Root>
            <Input.Root>
              <Input.Wrapper>
                <Input.Input
                  type='number'
                  placeholder='e.g., 7'
                  min='1'
                  step='1'
                  {...register('lead_time', { valueAsNumber: true })}
                />
              </Input.Wrapper>
            </Input.Root>
            {errors.lead_time && (
              <p className='text-xs mt-1 text-red-500'>
                {errors.lead_time?.message?.toString()}
              </p>
            )}
          </div>
        </div>

        <hr className='border-stroke-soft-200' />

        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-text-strong-950'>
            Additional Services (Optional)
          </h3>
          {fields.map((item, index) => (
            <div
              key={item.id}
              className='flex flex-col gap-4 rounded-md border border-stroke-soft-200 p-4 sm:flex-row sm:items-end'
            >
              <div className='flex-grow'>
                <Label.Root
                  htmlFor={`additionalServices.${index}.name`}
                  className='text-label-sm text-text-strong-950'
                >
                  Service Name
                </Label.Root>
                <Input.Root className='mt-1'>
                  <Input.Wrapper>
                    <Input.Input
                      id={`additionalServices.${index}.name`}
                      placeholder='e.g., Extra Revision'
                      {...register(`additionalServices.${index}.name` as const)}
                    />
                  </Input.Wrapper>
                </Input.Root>
                {errors.additionalServices?.[index]?.name && (
                  <p className='text-xs mt-1 text-red-500'>
                    {errors.additionalServices[index]?.name?.message}
                  </p>
                )}
              </div>

              <div className='w-full sm:w-auto'>
                <Label.Root
                  htmlFor={`additionalServices.${index}.price`}
                  className='text-label-sm text-text-strong-950'
                >
                  Price ({currency})
                </Label.Root>
                <Input.Root className='mt-1'>
                  <Input.Wrapper>
                    <div className='px-3 text-text-sub-600'>
                      {currency === 'USD'
                        ? '$'
                        : currency === 'EUR'
                          ? '€'
                          : currency === 'GBP'
                            ? '£'
                            : currency === 'CNY'
                              ? '¥'
                              : '$'}
                    </div>
                    <Input.Input
                      id={`additionalServices.${index}.price`}
                      type='number'
                      placeholder='0.00'
                      min='1'
                      step='0.01'
                      {...register(
                        `additionalServices.${index}.price` as const,
                        {
                          valueAsNumber: true,
                        },
                      )}
                    />
                  </Input.Wrapper>
                </Input.Root>
                {errors.additionalServices?.[index]?.price && (
                  <p className='text-xs mt-1 text-red-500'>
                    {errors.additionalServices[index]?.price?.message}
                  </p>
                )}
              </div>

              <Button.Root
                variant='neutral'
                mode='ghost'
                size='small'
                onClick={() => remove(index)}
                className='mt-auto h-9 w-full flex-shrink-0 sm:mb-[1px] sm:w-auto'
                type='button'
              >
                <Button.Icon as={RiDeleteBinLine} className='text-red-500' />
              </Button.Root>
            </div>
          ))}

          <Button.Root
            variant='neutral'
            mode='stroke'
            onClick={addAdditionalService}
            className='w-full sm:w-auto'
            type='button'
          >
            <Button.Icon as={RiAddLine} />
            <span>Add Additional Service</span>
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
        <div className='flex gap-2'>
          <Button.Root variant='neutral' mode='stroke' onClick={prevStep}>
            <Button.Icon as={RiArrowLeftSLine} />
            <span>Previous</span>
          </Button.Root>
          <Button.Root
            variant='neutral'
            mode='filled'
            onClick={nextStep}
            disabled={!isStep2Complete(getValues())}
          >
            <span>Next</span>
            <Button.Icon as={RiArrowRightSLine} />
          </Button.Root>
        </div>
      </div>
    </div>
  );
}
