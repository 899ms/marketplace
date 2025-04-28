'use client';

import React from 'react';
import { UseFormReturn, Controller } from 'react-hook-form';
import {
  Group as RadioGroup,
  Item as RadioGroupItem,
} from '@/components/ui/radio';
import { Root as Label } from '@/components/ui/label';
import { SendOfferFormData } from '../schema';
import { OneTimePaymentDetails } from './one-time-payment-details';
import { InstallmentPaymentDetails } from './installment-payment-details';
import { cn } from '@/utils/cn';

type FormMethods = Omit<UseFormReturn<SendOfferFormData>, 'handleSubmit'>;

interface ContractTermsSectionProps {
  form: FormMethods;
  // We need paymentType state here to conditionally render details
  // Or we could pass watch('paymentType') down
  paymentType: 'one-time' | 'installment';
  setPaymentType: React.Dispatch<
    React.SetStateAction<'one-time' | 'installment'>
  >;
}

export function ContractTermsSection({
  form,
  paymentType,
  setPaymentType,
}: ContractTermsSectionProps) {
  const {
    control,
    formState: { errors },
    setValue,
  } = form;

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-semibold'>Contract terms</h2>

      {/* Payment Type Selection */}
      <Controller
        name='paymentType'
        control={control}
        render={({ field }) => (
          <RadioGroup
            onValueChange={(value) => {
              const newPaymentType = value as 'one-time' | 'installment';
              field.onChange(newPaymentType);
              setPaymentType(newPaymentType);
              // Reset fields when switching types
              if (newPaymentType === 'one-time') {
                setValue('milestones', [], { shouldValidate: true }); // Clear milestones
              } else {
                setValue('amount', undefined, { shouldValidate: true }); // Clear one-time fields
                setValue('currency', undefined);
                setValue('deadline', undefined);
              }
            }}
            defaultValue={field.value}
            className='grid grid-cols-1 gap-4 md:grid-cols-2'
          >
            <Label
              htmlFor='one-time'
              className={cn(
                'flex cursor-pointer flex-col items-start space-y-1 rounded-md border-2 p-4 transition-colors',
                field.value === 'one-time'
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-400',
              )}
            >
              <RadioGroupItem
                value='one-time'
                id='one-time'
                className='sr-only'
              />
              <span className='font-semibold'>One-time payment</span>
              <span className='text-sm text-gray-500'>
                Pay full amount with a single payment.
              </span>
            </Label>
            <Label
              htmlFor='installment'
              className={cn(
                'flex cursor-pointer flex-col items-start space-y-1 rounded-md border-2 p-4 transition-colors',
                field.value === 'installment'
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-400',
              )}
            >
              <RadioGroupItem
                value='installment'
                id='installment'
                className='sr-only'
              />
              <span className='font-semibold'>Installment payment</span>
              <span className='text-sm text-gray-500'>
                Pay full amount with multiple payments.
              </span>
            </Label>
          </RadioGroup>
        )}
      />
      {errors.paymentType && (
        <p className='text-sm mt-1 text-red-500'>
          {errors.paymentType.message}
        </p>
      )}

      {/* Conditional Payment Details */}
      {paymentType === 'one-time' && <OneTimePaymentDetails form={form} />}
      {paymentType === 'installment' && (
        <InstallmentPaymentDetails form={form} />
      )}
    </div>
  );
}
