'use client';

import React from 'react';
import { UseFormReturn, Controller } from 'react-hook-form';
import { Root as Checkbox } from '@/components/ui/checkbox';
import { Root as Label } from '@/components/ui/label';
import { SendOfferFormData } from '../schema';
import * as Accordion from '@/components/ui/accordion';
import * as Divider from '@/components/ui/divider';
type FormMethods = Omit<UseFormReturn<SendOfferFormData>, 'handleSubmit'>;

interface AgreementSectionProps {
  form: FormMethods;
}

export function AgreementSection({ form }: AgreementSectionProps) {
  const {
    control,
    formState: { errors },
  } = form;

  return (

    <div className='flex flex-col gap-2'>

      <div className='rounded-[12px] border border-stroke-soft-200 p-4 mb-4'>
        <Accordion.Root type='single' collapsible className='space-y-2'>
          <Accordion.Item value='a' className='ring-0 !bg-white'>
            <Accordion.Trigger className='text-[#0E121B] text-[16px] font-medium flex items-center justify-between'>
              How do fixed-price contracts work?
              <Accordion.Arrow className='size-6' />
            </Accordion.Trigger>
            <Accordion.Content className='text-[#525866] text-[14px]'>
              Fermentum egestas at nunc tristique. Feugiat sodales viverra odio nisi non sem mauris. Nisi at purus habitant dictum etiam mi adipiscing. Congue at arcu aenean vitae aliquam eu tortor viverra id. Habitant sagittis faucibus pharetra odio fames rhoncus pellentesque sem est. Nunc ac eget tellus ultrices.
            </Accordion.Content>
          </Accordion.Item>

          <Divider.Root className='w-full w-[97%] mx-auto' />

          <Accordion.Item value='b' className='ring-0 !bg-white'>
            <Accordion.Trigger className='text-[#0E121B] text-[16px] font-medium flex items-center justify-between'>
              What is a Contract Initiation Fee?
              <Accordion.Arrow className='size-6' />
            </Accordion.Trigger>
            <Accordion.Content className='text-[#525866] text-[14px]'>
              Fermentum egestas at nunc tristique. Feugiat sodales viverra odio nisi non sem mauris. Nisi at purus habitant dictum etiam mi adipiscing. Congue at arcu aenean vitae aliquam eu tortor viverra id. Habitant sagittis faucibus pharetra odio fames rhoncus pellentesque sem est. Nunc ac eget tellus ultrices.
            </Accordion.Content>
          </Accordion.Item>

          {/* <Divider.Root className='w-full w-[97%] mx-auto' /> */}

        </Accordion.Root>
      </div>

      <div className='flex items-start space-x-3'>
        <Controller
          name='agreeToTerms'
          control={control}
          render={({ field }) => (
            <Checkbox
              id='agreeToTerms'
              checked={field.value}
              onCheckedChange={field.onChange}
              aria-describedby='agreeToTerms-description'
              className='mt-0.5'
            />
          )}
        />
        <div className='grid gap-1.5 leading-none mt-1'>
          <Label htmlFor='agreeToTerms' id='agreeToTerms-description' className='text-[#525866] text-[14px] whitespace-pre-wrap leading-none'>
            I agree to the{' '}
            <a
              href='/terms'
              target='_blank'
              className='font-medium text-[#0E121B] text-[14px] underline hover:text-[#0E121B]'
            >
              Terms & Conditions
            </a>
            {' and '}
            <a
              href='/privacy'
              target='_blank'
              className='font-medium text-[#0E121B] text-[14px] underline hover:text-[#0E121B]'
            >
              Privacy Policy
            </a>
            .
          </Label>
          {errors.agreeToTerms && (
            <p className='text-sm text-red-500 text-[14px]'>{errors.agreeToTerms.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
