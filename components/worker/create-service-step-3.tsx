'use client';

import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CreateServiceFormData } from '@/app/worker/services/create/schema';
import { ImageCarousel } from '@/components/services/detail/image-carousel';
import { ServiceInfoLeft } from '@/components/services/detail/service-info-left';
import * as Button from '@/components/ui/button';
import * as Avatar from '@/components/ui/avatar';
import * as Badge from '@/components/ui/badge';
import { useAuth } from '@/utils/supabase/AuthContext';
import { formatCurrency } from '@/utils/formatters';
import {
  RiArrowLeftSLine,
  RiCheckLine,
  RiLoader4Line,
  RiPriceTag3Line,
  RiTimeLine,
  RiStarFill,
} from '@remixicon/react';
import { cn } from '@/utils/cn';

interface Step3ReviewProps {
  formMethods: UseFormReturn<CreateServiceFormData>;
  prevStep: () => void;
  submitForm: () => void;
  isSubmitting: boolean;
}

// Simplified Right Panel specifically for Step 3 Review
function Step3ServiceInfoRight({
  serviceData,
  sellerName,
  sellerAvatar,
  prevStep,
  submitForm,
  isSubmitting,
}: {
  serviceData: CreateServiceFormData;
  sellerName: string;
  sellerAvatar?: string;
  prevStep: () => void;
  submitForm: () => void;
  isSubmitting: boolean;
}) {
  return (
    <div className='shadow-sm rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6'>
      {/* Seller Info Preview */}
      <div className='mb-6 flex items-center gap-3 border-b border-stroke-soft-200 pb-4'>
        <Avatar.Root size='40'>
          <Avatar.Image src={sellerAvatar || ''} alt={sellerName} />
        </Avatar.Root>
        <div>
          <div className='font-semibold text-text-strong-950'>{sellerName}</div>
        </div>
      </div>

      {/* Price & Lead Time Preview */}
      <div className='mb-6 space-y-3'>
        <div className='flex items-center justify-between'>
          <div className='text-sm text-text-secondary-600 flex items-center gap-2'>
            <RiPriceTag3Line className='size-4' />
            Price
          </div>
          <span className='font-semibold text-text-strong-950'>
            {formatCurrency(serviceData.price, serviceData.currency)}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-sm text-text-secondary-600 flex items-center gap-2'>
            <RiTimeLine className='size-4' />
            Lead Time
          </div>
          <span className='font-semibold text-text-strong-950'>
            {serviceData.lead_time} Day{serviceData.lead_time !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex flex-col gap-3'>
        <Button.Root
          variant='neutral'
          mode='stroke'
          onClick={prevStep}
          disabled={isSubmitting}
        >
          <Button.Icon as={RiArrowLeftSLine} />
          Edit / Go Back
        </Button.Root>
        <Button.Root
          variant='neutral'
          mode='filled'
          onClick={submitForm}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Button.Icon as={RiLoader4Line} className='animate-spin' />
              Submitting...
            </>
          ) : (
            'Post Service'
          )}
        </Button.Root>
      </div>
    </div>
  );
}

export function Step3Review({
  formMethods,
  prevStep,
  submitForm,
  isSubmitting,
}: Step3ReviewProps) {
  const [activeTab, setActiveTab] = useState('Details');
  const formData = formMethods.getValues();
  const { user } = useAuth();

  const servicePreviewData = {
    id: 'preview',
    title: formData.title,
    images:
      formData.images?.map(
        (img) =>
          img.url ||
          (img.file ? URL.createObjectURL(img.file) : '/placeholder-image.svg'),
      ) || [],
    price: formData.price,
    currency: formData.currency,
    lead_time: formData.lead_time,
    description: formData.description,
    services: formData.includes || [],
    options:
      formData.additionalServices?.map((addSvc) => ({
        name: addSvc.name,
        price: addSvc.price,
      })) || [],
    provider: {
      name: user?.user_metadata?.full_name || user?.email || 'Your Name',
      avatar: user?.user_metadata?.avatar_url,
      rating: 0,
      reviews: 0,
    },
    skills: formData.tags || [],
    tools: [],
    relatedServices: [],
    reviews: [],
  };

  React.useEffect(() => {
    const imageUrls = servicePreviewData.images;
    return () => {
      imageUrls.forEach((url) => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [servicePreviewData.images]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Details':
        return (
          <div className='shadow-sm space-y-6 rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6'>
            <div className='space-y-2'>
              <h3 className='font-semibold text-text-strong-950'>
                Description
              </h3>
              <p className='text-sm text-text-secondary-600 whitespace-pre-wrap'>
                {servicePreviewData.description}
              </p>
            </div>
            <div className='space-y-2'>
              <h3 className='font-semibold text-text-strong-950'>
                What's Included
              </h3>
              <ul className='space-y-1'>
                {servicePreviewData.services.map((item, idx) => (
                  <li
                    key={idx}
                    className='text-sm text-text-secondary-600 flex items-center gap-2'
                  >
                    <RiCheckLine className='size-4 shrink-0 text-success-base' />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {servicePreviewData.skills.length > 0 && (
              <div className='space-y-2'>
                <h3 className='font-semibold text-text-strong-950'>Tags</h3>
                <div className='flex flex-wrap gap-2'>
                  {servicePreviewData.skills.map((tag, idx) => (
                    <Badge.Root
                      key={idx}
                      variant='light'
                      color='gray'
                      size='medium'
                    >
                      {tag}
                    </Badge.Root>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case 'Options':
        if (
          !servicePreviewData.options ||
          servicePreviewData.options.length === 0
        ) {
          return (
            <div className='text-text-secondary-600 py-6 text-center'>
              No additional services offered.
            </div>
          );
        }
        return (
          <div className='shadow-sm divide-y divide-stroke-soft-200 rounded-xl border border-stroke-soft-200 bg-bg-white-0'>
            {servicePreviewData.options.map((option, index) => (
              <div
                key={index}
                className='flex items-center justify-between px-4 py-3'
              >
                <span className='text-sm text-text-secondary-600'>
                  {option.name}
                </span>
                <span className='text-sm font-medium text-text-strong-950'>
                  +{formatCurrency(option.price, formData.currency)}
                </span>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='mx-auto max-w-5xl'>
      <h1 className='text-2xl mb-6 font-semibold text-text-strong-950'>
        {servicePreviewData.title || 'Service Title Preview'}
      </h1>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-12'>
        <div className='md:col-span-8'>
          <div className='mb-6'>
            <ImageCarousel images={servicePreviewData.images} />
          </div>
          <ServiceInfoLeft
            service={servicePreviewData as any}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <div className='mt-0'>{renderTabContent()}</div>
        </div>
        <div className='md:col-span-4'>
          <Step3ServiceInfoRight
            serviceData={formData}
            sellerName={servicePreviewData.provider.name}
            sellerAvatar={servicePreviewData.provider.avatar}
            prevStep={prevStep}
            submitForm={submitForm}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
