'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';

import * as Breadcrumb from '@/components/ui/breadcrumb';

import { RelatedServiceCard } from '../../../components/services/detail/related-service-card';
import { ReviewItem } from '../../../components/services/detail/review-item';

import { RiArrowRightSLine, RiCheckLine, RiHomeLine } from '@remixicon/react';

import { ServiceInfoLeft } from '../../../components/services/detail/service-info-left';
import { ServiceInfoRight } from '../../../components/services/detail/service-info-right';

// Define the type for related services, matching the RelatedServiceCard component expectation
interface RelatedService {
  id: string;
  title: string;
  price: number;
  rating: number;
  reviews: number;
}

interface ServicePageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

// Service Detail Component
export default function ServiceDetailPage({
  params,
  searchParams,
}: ServicePageProps) {
  // Use React's 'use' hook to resolve the promises
  const awaitedParams = use(params);
  console.log('Awaited Params:', searchParams);
  // Resolve searchParams even if not immediately used, to satisfy types
  //const awaitedSearchParams = searchParams ? use(searchParams) : undefined;

  const [activeTab, setActiveTab] = useState('Details');

  // Placeholder data - would be fetched from API in a real application
  const service = {
    id: awaitedParams.id,
    title: 'You will get WordPress Website Design',
    images: ['/placeholder1.jpg', '/placeholder2.jpg', '/placeholder3.jpg'],
    price: 140,
    days: 3,
    deadline: '05.25.2024',
    about:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a gallery of type...",
    skills: [
      'Grammy',
      'Billboard Music',
      'American Music',
      'BRIT',
      'MTV Music',
      'Eurovision Awards',
    ],
    tools: ['Grammy', 'Billboard Music', 'American Music', 'BRIT'],
    provider: {
      name: 'Cleve Music',
      avatar: 'https://via.placeholder.com/80',
      rating: 4.9,
      reviews: 125,
    },
    options: [
      {
        name: 'Preparation of consumption tax return (general taxation)',
        price: 201,
      },
      {
        name: 'Consumption tax return preparation (simplified taxation)',
        price: 154,
      },
      { name: 'Express Service', price: 201 },
      {
        name: 'Sending paper documents of supporting documents (if they are divided by subject)',
        price: 37,
      },
      { name: 'Bookkeeping service (50 entries-5,000 yen)', price: 34 },
      {
        name: 'Electronic filing (proxy sending, user identification number obtained)',
        price: 34,
      },
      { name: 'Medical Expense Deduction Receipts (20 or more)', price: 34 },
    ],
    description:
      'I am a full stack Web Developer with Experience in WordPress design and development. I have a good hand of experience in WordPress Installation, WordPress Responsive Design, WordPress Development, WordPress Plugin Integration, WordPress speed optimization, and WordPress SEO.',
    services: [
      'WordPress Theme Development',
      'WordPress Theme Customization',
      'Divi Theme/Builder',
      'Elementor Pro...',
    ],
    relatedServices: [
      {
        id: '1',
        title: 'Draw catchy and eye-catching illustrations anime',
        price: 101,
        rating: 4.9,
        reviews: 125,
      },
      {
        id: '2',
        title: 'Draw catchy and eye-catching illustrations anime',
        price: 101,
        rating: 4.9,
        reviews: 125,
      },
      {
        id: '3',
        title: 'Draw catchy and eye-catching illustrations anime',
        price: 101,
        rating: 4.9,
        reviews: 125,
      },
    ],
    reviews: [
      {
        id: '1',
        user: {
          name: 'Cleve Music',
          avatar: 'https://via.placeholder.com/40',
          rating: 4.9,
        },
        date: 'Jan 8, 2023',
        text: 'idence.123confidence.123confidence.123idence.123confidence.123confidence.123idence.123confidence.123confidence.123idence.123confidence.123confidence.123idence.123confidence.123confidence.123idence.123confidence.123confidence.123',
        amount: 1000.0,
      },
      {
        id: '2',
        user: {
          name: 'Cleve Music',
          avatar: 'https://via.placeholder.com/40',
          rating: 4.9,
        },
        date: 'Jan 8, 2023',
        text: 'idence.123confidence.123confidence.123idence.123confidence.123confidence.123idence.123confidence.123confidence.123idence.123confidence.123confidence.123idence.123confidence.123confidence.123idence.123confidence.123confidence.123',
        amount: 1000.0,
      },
      {
        id: '3',
        user: {
          name: 'Cleve Music',
          avatar: 'https://via.placeholder.com/40',
          rating: 4.9,
        },
        date: 'Jan 8, 2023',
        text: 'idence.123confidence.123confidence.123idence.123confidence.123confidence.123idence.123confidence.123confidence.123idence.123confidence.123confidence.123idence.123confidence.123confidence.123idence.123confidence.123confidence.123',
        amount: 1000.0,
      },
    ],
  };

  // Related service card component
  // const RelatedServiceCard = (...) => { ... }; // Removed

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Details':
        return (
          <div className='space-y-6'>
            {/* Service Description Section */}
            <div className='space-y-2'>
              <h3 className='font-semibold text-text-strong-950'>
                Description
              </h3>
              <p className='text-sm text-text-secondary-600'>
                {service.description}
              </p>
            </div>
            {/* Services Offered Section */}
            <div className='space-y-2'>
              <h3 className='font-semibold text-text-strong-950'>
                Services Provided
              </h3>
              <ul className='space-y-1'>
                {service.services.map((item, idx) => (
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
            {/* Related Services Section */}
            <div>
              <h3 className='mb-3 font-semibold text-text-strong-950'>
                Related Services
              </h3>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                {service.relatedServices.map((related) => (
                  <RelatedServiceCard key={related.id} service={related} />
                ))}
              </div>
            </div>
          </div>
        );
      case 'Options':
        return (
          <div className='divide-y divide-stroke-soft-200 rounded-lg border border-stroke-soft-200'>
            {service.options.map((option, index) => (
              <div
                key={index}
                className='flex items-center justify-between px-4 py-3'
              >
                <span className='text-sm text-text-secondary-600'>
                  {option.name}
                </span>
                <span className='text-sm font-medium text-text-strong-950'>
                  +${option.price}
                </span>
              </div>
            ))}
          </div>
        );
      case 'Portfolio':
        return (
          <div className='text-text-secondary-600 py-10 text-center'>
            {/* Placeholder */}
            Portfolio content will be displayed here.
          </div>
        );
      case 'Review':
        return (
          <div className='divide-y divide-stroke-soft-200'>
            {service.reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='container mx-auto px-4 py-10'>
      {/* Breadcrumb Navigation */}
      <div className='mb-4'>
        <Breadcrumb.Root>
          <Breadcrumb.Item asChild>
            <Link href='/home'>
              <Breadcrumb.Icon as={RiHomeLine} />
              Home
            </Link>
          </Breadcrumb.Item>

          <Breadcrumb.ArrowIcon as={RiArrowRightSLine} />

          <Breadcrumb.Item asChild>
            <Link href='/services'>Services</Link>
          </Breadcrumb.Item>

          <Breadcrumb.ArrowIcon as={RiArrowRightSLine} />

          <Breadcrumb.Item active>{service.title}</Breadcrumb.Item>
        </Breadcrumb.Root>
      </div>

      {/* Page Title */}
      <h1 className='text-2xl mb-6 font-semibold text-text-strong-950'>
        {service.title}
      </h1>

      {/* Main Content Area */}
      <div className='grid grid-cols-1 gap-8 md:grid-cols-12'>
        {/* Left Column */}
        <div className='md:col-span-8'>
          {/* Render ServiceInfoLeft */}
          <ServiceInfoLeft
            service={service}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Render Tab Content directly below tabs in the same column */}
          <div className='mb-8'>{renderTabContent()}</div>
        </div>

        {/* Right Column */}
        <div className='md:col-span-4'>
          {/* Use ServiceInfoRight component */}
          <ServiceInfoRight service={service} />
        </div>
      </div>
    </div>
  );
}
