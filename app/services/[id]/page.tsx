'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as Avatar from '@/components/ui/avatar';
import * as Badge from '@/components/ui/badge';
import * as TabMenuHorizontal from '@/components/ui/tab-menu-horizontal';
import * as Button from '@/components/ui/button';
import * as Breadcrumb from '@/components/ui/breadcrumb';
import {
  RiStarFill,
  RiGoogleFill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiHeartLine,
  RiPriceTag3Line,
  RiTimeLine,
  RiCalendar2Line,
  RiMessage2Line,
  RiCheckLine,
  RiMoreLine,
  RiTwitchFill,
  RiTwitterXFill,
  RiHomeLine,
} from '@remixicon/react';
import { cn } from '@/utils/cn';

// Image Carousel Component
const ImageCarousel = ({ images }: { images: string[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const setSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className='mb-4'>
      {/* Main Image */}
      <div className='relative mb-2 h-64 overflow-hidden rounded-xl sm:h-80 md:h-96'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-800 to-purple-500' />

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className='absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-1 text-black transition-all hover:bg-white'
          aria-label='Previous'
        >
          <RiArrowLeftSLine className='size-6' />
        </button>
        <button
          onClick={nextSlide}
          className='absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-1 text-black transition-all hover:bg-white'
          aria-label='Next'
        >
          <RiArrowRightSLine className='size-6' />
        </button>
      </div>

      {/* Thumbnails */}
      <div className='flex gap-2'>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setSlide(index)}
            className={cn(
              'h-16 w-16 overflow-hidden rounded-md border-2 transition-all',
              activeIndex === index
                ? 'border-primary-500'
                : 'border-transparent',
            )}
          >
            <div className='h-full w-full bg-gradient-to-br from-blue-800 to-purple-500 opacity-80' />
          </button>
        ))}
      </div>
    </div>
  );
};

// Service Detail Component
export default function ServiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState('Details');

  // Placeholder data - would be fetched from API in a real application
  const service = {
    id: params.id,
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

  // Related service card component (reusing from services page with modifications)
  const RelatedServiceCard = ({ service }: { service: any }) => {
    return (
      <div className='shadow-sm hover:shadow-md overflow-hidden rounded-lg border border-stroke-soft-200 bg-bg-white-0 transition-all'>
        {/* Image Section with Blue "J" Avatar */}
        <div className='relative h-32 w-full bg-gradient-to-br from-blue-400 to-purple-500'>
          <div className='absolute right-3 top-3'>
            <Avatar.Root size='32' color='blue'>
              <span className='text-label-xs font-medium'>J</span>
            </Avatar.Root>
          </div>
        </div>

        <div className='p-2'>
          {/* Title */}
          <p className='mb-1 line-clamp-1 text-paragraph-xs font-medium text-text-strong-950'>
            {service.title}
          </p>

          {/* Rating and Price */}
          <div className='flex items-center justify-between text-paragraph-xs'>
            <div className='text-text-secondary-600 flex items-center gap-0.5'>
              <RiStarFill className='size-3 text-yellow-400' />
              <span>
                {service.rating} ({service.reviews})
              </span>
            </div>
            <span className='font-medium text-text-strong-950'>
              ${service.price}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Review item component
  const ReviewItem = ({ review }: { review: any }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <div className='border-b border-stroke-soft-200 py-4'>
        {/* Top row with avatar, user info, and price */}
        <div className='mb-2 flex items-start'>
          {/* Avatar */}
          <Avatar.Root size='40' className='mr-3 shrink-0'>
            <Avatar.Image src={review.user.avatar} alt={review.user.name} />
          </Avatar.Root>

          <div className='flex-1'>
            {/* User info section */}
            <div className='mb-3'>
              {/* Username */}
              <div className='mb-1 font-medium text-text-strong-950'>
                {review.user.name}
              </div>

              {/* Rating and date */}
              <div className='flex items-center gap-1.5'>
                <div className='flex items-center'>
                  <RiStarFill className='mr-0.5 size-3.5 text-yellow-400' />
                  <span className='text-text-secondary-600 text-paragraph-xs'>
                    {review.user.rating}
                  </span>
                </div>
                <span className='text-text-secondary-600 text-paragraph-xs'>
                  {review.date}
                </span>
              </div>
            </div>

            {/* Review text section */}
            <p
              className={cn(
                'text-text-secondary-600 pr-4 text-paragraph-sm',
                !expanded && 'line-clamp-2',
              )}
            >
              {review.text}
            </p>
          </div>

          {/* Price */}
          <div className='min-w-20 text-right'>
            <div className='font-medium text-text-strong-950'>
              ${review.amount.toFixed(2)}
            </div>
          </div>
        </div>

        {/* More button in separate row */}
        <div className='flex justify-end'>
          <button
            onClick={() => setExpanded(!expanded)}
            className='text-text-secondary-600 hover:text-text-primary-500 text-paragraph-sm'
          >
            More
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className='flex flex-1 flex-col px-20 py-6'>
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
      <div className='flex flex-col gap-6 lg:flex-row'>
        {/* Left Content */}
        <div className='flex-1'>
          {/* Image Carousel */}
          <ImageCarousel images={service.images} />

          {/* Tabs Navigation */}
          <div className='mb-6'>
            <TabMenuHorizontal.Root
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabMenuHorizontal.List>
                <TabMenuHorizontal.Trigger value='Details'>
                  Details
                </TabMenuHorizontal.Trigger>
                <TabMenuHorizontal.Trigger value='Options'>
                  Options
                </TabMenuHorizontal.Trigger>
                <TabMenuHorizontal.Trigger value='Portfolio'>
                  Portfolio
                </TabMenuHorizontal.Trigger>
                <TabMenuHorizontal.Trigger value='Review'>
                  Review
                </TabMenuHorizontal.Trigger>
              </TabMenuHorizontal.List>
            </TabMenuHorizontal.Root>
          </div>

          {/* Tab Content */}
          <div className='mb-8'>
            {activeTab === 'Details' && (
              <div>
                <p className='text-text-secondary-600 mb-4 text-paragraph-md'>
                  {service.description}
                </p>

                <h3 className='text-lg mb-2 font-medium'>
                  My wordpress website design services:
                </h3>
                <ul className='mb-6 space-y-1'>
                  {service.services.map((item, index) => (
                    <li
                      key={index}
                      className='text-text-secondary-600 flex items-start gap-2 text-paragraph-md'
                    >
                      <RiCheckLine className='mt-1 size-4 text-green-500' />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href='#'
                  className='text-text-primary-600 hover:underline'
                >
                  Show More
                </Link>
              </div>
            )}

            {activeTab === 'Options' && (
              <div>
                <div className='border border-stroke-soft-200'>
                  {service.options.map((option, index) => (
                    <div
                      key={index}
                      className={cn(
                        'flex items-center justify-between px-5 py-4',
                        index < service.options.length - 1 &&
                          'border-b border-stroke-soft-200',
                      )}
                    >
                      <span className='text-text-secondary-600 text-paragraph-sm'>
                        {option.name}
                      </span>
                      <span className='font-medium text-text-strong-950'>
                        ${option.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Portfolio' && (
              <div>
                <p className='text-text-secondary-600'>
                  Portfolio content would go here
                </p>
              </div>
            )}

            {activeTab === 'Review' && (
              <div>
                {service.reviews.map((review) => (
                  <ReviewItem key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>

          {/* More Services Section */}
          <div>
            <h2 className='text-xl mb-4 font-semibold text-text-strong-950'>
              More
            </h2>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
              {service.relatedServices.map((relatedService) => (
                <RelatedServiceCard
                  key={relatedService.id}
                  service={relatedService}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className='w-full shrink-0 lg:w-72'>
          <div className='sticky top-20 rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5'>
            {/* Profile Header with Favorite Button */}
            <div className='relative mb-4'>
              <div className='flex flex-col items-center text-center'>
                <Avatar.Root size='56'>
                  <Avatar.Image
                    src={service.provider.avatar}
                    alt={service.provider.name}
                  />
                  <Avatar.Indicator position='bottom'>
                    <div className='h-2 w-2 rounded-full bg-green-500' />
                  </Avatar.Indicator>
                </Avatar.Root>

                <div className='mt-2'>
                  <h2 className='text-label-md font-medium text-text-strong-950'>
                    {service.provider.name}
                  </h2>
                  <div className='text-text-secondary-600 mt-1 flex items-center justify-center gap-1 text-paragraph-xs'>
                    <RiStarFill className='size-3.5 text-yellow-400' />
                    <span>
                      {service.provider.rating} ({service.provider.reviews})
                    </span>
                  </div>
                </div>

                <div className='mt-1 flex items-center gap-2'>
                  <RiGoogleFill className='size-4 text-text-sub-600' />
                  <RiGoogleFill className='size-4 text-text-sub-600' />
                </div>
              </div>

              {/* Favorite Button - Absolute Positioned */}
              <button className='text-text-secondary-400 hover:text-text-primary-500 absolute right-0 top-0'>
                <RiHeartLine className='size-5' />
              </button>
            </div>

            {/* Divider */}
            <div className='mb-4 h-px w-full bg-stroke-soft-200'></div>

            {/* Service Info */}
            <div className='mb-4 space-y-3'>
              <div className='flex items-center justify-between'>
                <div className='text-text-secondary-600 flex items-center gap-2'>
                  <RiPriceTag3Line className='size-4' />
                  <span className='text-paragraph-sm'>Price</span>
                </div>
                <span className='text-lg font-semibold text-text-strong-950'>
                  ${service.price}
                </span>
              </div>

              <div className='flex items-center justify-between'>
                <div className='text-text-secondary-600 flex items-center gap-2'>
                  <RiTimeLine className='size-4' />
                  <span className='text-paragraph-sm'>Sold</span>
                </div>
                <span className='font-medium text-text-strong-950'>
                  {service.days}
                </span>
              </div>

              <div className='flex items-center justify-between'>
                <div className='text-text-secondary-600 flex items-center gap-2'>
                  <RiCalendar2Line className='size-4' />
                  <span className='text-paragraph-sm'>Deadline</span>
                </div>
                <span className='font-medium text-text-strong-950'>
                  {service.deadline}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='mb-4 grid grid-cols-2 gap-2'>
              <Button.Root variant='neutral' mode='stroke' size='small'>
                <Button.Icon as={RiMessage2Line} />
                Message
              </Button.Root>

              <Button.Root variant='neutral' size='small'>
                Hire
                <Button.Icon as={RiArrowRightSLine} />
              </Button.Root>
            </div>

            {/* About Section */}
            <div className='mb-4'>
              <h3 className='mb-2 text-label-md font-medium text-text-strong-950'>
                About
              </h3>
              <p className='text-text-secondary-600 text-paragraph-xs'>
                {service.about}
              </p>
            </div>

            {/* Social Links */}
            <div className='mb-4 flex items-center gap-3'>
              <Link
                href='#'
                className='text-text-secondary-600 hover:text-[#6441a5]'
              >
                <RiTwitchFill className='size-5' />
              </Link>
              <Link
                href='#'
                className='text-text-secondary-600 hover:text-text-strong-950'
              >
                <RiTwitterXFill className='size-5' />
              </Link>
              <Link
                href='#'
                className='text-text-secondary-600 hover:text-text-primary-500'
              >
                <RiGoogleFill className='size-5' />
              </Link>
            </div>

            {/* Skills Section */}
            <div className='mb-4'>
              <h3 className='mb-2 text-label-md font-medium text-text-strong-950'>
                Skills
              </h3>
              <div className='flex flex-wrap gap-1.5'>
                {service.skills.map((skill, index) => (
                  <Badge.Root key={index} variant='light' size='small'>
                    {skill}
                  </Badge.Root>
                ))}
              </div>
            </div>

            {/* Tools Section */}
            <div>
              <h3 className='mb-2 text-label-md font-medium text-text-strong-950'>
                Tools
              </h3>
              <div className='flex flex-wrap gap-1.5'>
                {service.tools.map((tool, index) => (
                  <Badge.Root key={index} variant='light' size='small'>
                    {tool}
                  </Badge.Root>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
