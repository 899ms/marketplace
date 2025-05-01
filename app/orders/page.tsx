'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import * as Avatar from '@/components/ui/avatar';
import * as AvatarGroup from '@/components/ui/avatar-group';
import * as Divider from '@/components/ui/divider';
import * as Button from '@/components/ui/button';
import * as Badge from '@/components/ui/badge';
import * as TabMenuHorizontal from '@/components/ui/tab-menu-horizontal';
import {
  RiStarFill,
  RiStarSFill,
  RiHeart3Line,
  RiSendPlane2Fill,
  RiPencilLine,
  RiTwitchFill,
  RiTwitterXFill,
  RiGoogleFill,
  RiArrowRightSLine,
  RiHeartLine,
  RiSearchLine,
  RiCalendarLine,
  RiSortAsc,
  RiMore2Fill,
  RiArrowLeftSLine,
  RiFilter3Line,
} from '@remixicon/react';
import { clsx } from 'clsx';
import { Input } from '@/components/ui/input';
import * as DatePicker from '@/components/ui/datepicker';
import * as Dropdown from '@/components/ui/dropdown';
import * as Tabs from '@/components/ui/tabs';
import * as Table from '@/components/ui/table';
import * as Pagination from '@/components/ui/pagination';
import { cn } from '@/utils/cn';

// Order Page Sidebar Component
const OrderSidebar = () => {
  const user = {
    name: 'Cleve Music',
    avatarUrl: 'https://via.placeholder.com/80',
    rating: 4.9,
    reviews: 125,
    about:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  };
  const tags = [
    'Grammy',
    'Billboard Music',
    'American Music',
    'BRIT',
    'MTV Music',
    'Eurovision Awards',
  ];
  const reviewAvatars = [
    'https://i.pravatar.cc/40?img=32',
    'https://i.pravatar.cc/40?img=45',
    'https://i.pravatar.cc/40?img=12',
  ];

  return (
    <aside className='hidden max-w-[352px] w-full shrink-0 lg:block'>
      <div className='shadow-sm sticky top-20 flex flex-col gap-4 rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-4'>
        {/* Profile Section */}
        <div className='flex flex-col items-center gap-3 text-center'>
          <Avatar.Root size='80' className="relative">
            <Avatar.Image src={user.avatarUrl} alt={user.name} />
            <Avatar.Indicator position="bottom">
              <Avatar.Status status="online" />
            </Avatar.Indicator>
          </Avatar.Root>
          <div>
            <h2 className='text-label-lg font-medium text-text-strong-950'>
              {user.name}
            </h2>
            <div className='mt-1 flex items-center justify-center gap-1'>
              <RiStarFill className='size-3.5 text-yellow-400' />
              <span className='text-text-secondary-600 text-paragraph-xs'>
                {user.rating} ({user.reviews})
              </span>
            </div>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <RiGoogleFill className='size-5 text-text-sub-600' /> Google
            <RiGoogleFill className='size-5 text-text-sub-600' /> Google
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {/* Follow Button */}
          <Button.Root
            variant="neutral"
            mode="stroke"
            size="xsmall"
            className="w-[85px] h-[32px] rounded-lg border border-stroke-soft-200 bg-bg-white-0 shadow-sm flex items-center justify-center gap-[6px] px-2"
          >
            <span className="text-paragraph-xs">Follow</span>
            <Button.Icon as={RiHeart3Line} className="size-[18px]" />
          </Button.Root>

          {/* Touch Button */}
          <Button.Root
            variant="neutral"
            mode="filled"
            size="xsmall"
            className="w-[83px] h-[32px] rounded-lg bg-[#20232D] border border-[#242628] shadow-md flex items-center justify-center gap-[6px] px-2"
          >
            <span className="text-paragraph-xs text-bg-white-0">Touch</span>
            <Button.Icon as={RiSendPlane2Fill} className="size-[18px]" />
          </Button.Root>
        </div>


        {/* Recent Reviews */}
        <div>
          <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            {/* Left section - Star and text */}
            <div className="flex items-center gap-1 text-label-md font-medium text-text-strong-950">
              <RiStarSFill className="size-6" /> {/* Slightly bigger */}
              <span>Recent reviews</span>
            </div>

            {/* Right section - Avatars */}
            <div className="mt-1 sm:mt-0 flex items-center gap-2">
              <AvatarGroup.Root size="24">
                {reviewAvatars.map((src, i) => (
                  <Avatar.Root key={i} size="24">
                    <Avatar.Image src={src} />
                  </Avatar.Root>
                ))}
              </AvatarGroup.Root>
              <span className="text-text-secondary-600 text-paragraph-xs">+4</span>
            </div>
          </div>
        </div>


        <Divider.Root />

        {/* Tags Section */}
        <div>
          <h3 className="mb-2 text-label-md font-medium text-text-strong-950">
            Tags
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge.Root
                key={tag}
                variant="light"
                size="medium"
                className="bg-white rounded-md border border-stroke-soft-300 text-gray-600 px-2 py-0.5"
              >
                {tag}
              </Badge.Root>
            ))}
          </div>
        </div>


        <Divider.Root />

        {/* About Section */}
        <div>
          <div className='mb-2 flex items-center justify-between'>
            <h3 className='text-label-md font-medium text-text-strong-950'>
              About
            </h3>
            <button className='text-icon-secondary-400 hover:text-icon-primary-500'>
              <RiPencilLine className='size-4' />
            </button>
          </div>
          <p className='text-gray-600 line-clamp-5 text-paragraph-sm'>
            {user.about}
          </p>
        </div>

        {/* Social Links */}
        <div className='flex items-center gap-3 border-t border-stroke-soft-200 pt-4'>
          <Link
            href='#'
            className='text-icon-secondary-400 hover:text-icon-primary-500'
          >
            <RiTwitchFill className='size-5' />
          </Link>
          <Link
            href='#'
            className='text-icon-secondary-400 hover:text-icon-primary-500'
          >
            <RiTwitterXFill className='size-5' />
          </Link>
          <Link
            href='#'
            className='text-icon-secondary-400 hover:text-icon-primary-500'
          >
            <RiGoogleFill className='size-5' />
          </Link>
        </div>
      </div>
    </aside>
  );
};

// Order List Item Component
const OrderListItem = () => {
  // Example data - replace with props
  const order = {
    title: 'Write professional resume, cover letter',
    tags: ['Mixing', 'Singing', 'Jazz', 'Hip hop', 'K pop'],
    description:
      "We are seeking a talented Website Designer and Front-End Developer to join our team. In this role, you will be responsible for creating visually appealing and user-friendly websites that meet our clients' needs. You",
    budget: 1400,
  };

  return (
    <div className='flex items-start justify-between gap-4 border-b border-stroke-soft-200 py-4'>

      <div className='flex-1 max-w-[80%]'>
        {/* Title */}
        <h3 className='mb-1 text-paragraph-lg font-medium text-text-strong-950'>
          {order.title}
        </h3>

        {/* Tags */}
        <div className='mb-2 flex flex-wrap gap-1.5'>
          {order.tags.map((tag, i) => (
            <Badge.Root
              key={tag}
              variant='light'
              size='small'
              className={clsx(
                'bg-white px-2 py-0.5 rounded-md',
                i === 0
                  ? 'border border-black text-text-strong-950'     // first tag: black border + text
                  : 'border border-gray-300 text-text-secondary-600' // others: gray border + text
              )}
            >
              {tag}
            </Badge.Root>
          ))}
        </div>

        {/* Description */}
        <p className='text-text-secondary-600 line-clamp-2 text-paragraph-sm'>
          {order.description}
        </p>
      </div>

      <div className='shrink-0 text-right'>
        <div className='text-gray-600 text-label-sm'>Budget</div>
        <div className='mb-2 text-label-lg font-medium text-text-strong-950'>
          ${order.budget.toLocaleString()}
        </div>
        <Button.Root variant='neutral' mode='stroke' size='small'>
          Apply
          <Button.Icon as={RiArrowRightSLine} />
        </Button.Root>
      </div>
    </div>
  );
};

// Review List Item Component
const ReviewListItem = () => {
  const review = {
    avatarUrl: 'https://via.placeholder.com/40',
    name: 'Cleve Music',
    rating: 4.9,
    date: 'Jan 8, 2023',
    title: 'Contract title text here...',
    description:
      "Working with Ralph on a UX audit for our website was a game-changer. Ralph didn't just identify pain points-he offered innovative solutions that empowered me to make key business decisions with confidence.123confidence.123confidence.123confidence.123confidence.123confidence.123confidence.123confidence.123confidence.123",
    amount: 1000.0,
  };

  return (
    <div className='border-b border-stroke-soft-200 py-4'>
      {/* Top row with user info and amount */}
      <div className='flex items-start justify-between mb-3'>
        {/* LEFT SIDE: Avatar + User Info */}
        <div className='flex items-start gap-3'>
          <Avatar.Root size='40' className='shrink-0'>
            <Avatar.Image src={review.avatarUrl} alt={review.name} />
          </Avatar.Root>

          <div className='flex flex-col'>
            {/* Row 1: Name */}
            <div className='text-text-secondary-600 text-label-sm font-medium'>
              {review.name}
            </div>

            {/* Row 2: Rating and Date */}
            <div className='flex items-center gap-1.5'>
              <div className='flex items-center gap-0.5'>
                <RiStarFill className='size-3.5 text-yellow-400' />
                <span className='text-gray-600 text-paragraph-xs'>
                  {review.rating}
                </span>
              </div>
              <span className='text-gray-600 text-paragraph-xs'>
                {review.date}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Amount */}
        <div className='shrink-0 text-right text-label-lg font-medium text-text-strong-950'>
          ${review.amount.toFixed(2)}
        </div>
      </div>

      {/* Bottom row with title and description */}
      <div>
        <h3 className='mb-1 text-paragraph-lg font-medium text-text-strong-950'>
          {review.title}
        </h3>
        <p className='text-gray-600 line-clamp-2 text-paragraph-sm'>
          {review.description}
        </p>
      </div>
    </div>
  );
};

// Left Sidebar Component
function OrdersSidebar() {
  return (
    <aside className="w-[240px] shrink-0 border-r border-stroke-soft-200 bg-bg-white-0 p-4 pt-6">
      <nav className="flex flex-col gap-1">
        {/* Active link styling example */}
        <Link
          href="/orders"
          className="flex items-center gap-2 rounded-md bg-bg-brand-subtle-100 px-3 py-2 font-medium text-text-brand-900"
        >
          <span>Orders</span>
          <span className="ml-auto text-xs font-normal text-text-brand-secondary-600">{/* Counter */}</span>
        </Link>
        <Link
          href="/billing"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-text-secondary-600 hover:bg-bg-neutral-subtle-100 hover:text-text-strong-950"
        >
          <span>Billing</span>
        </Link>
      </nav>
    </aside>
  );
}

// Summary Card Component (Helper)
interface SummaryCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
}

function SummaryCard({ title, value, icon, actions }: SummaryCardProps) {
  return (
    <div className="rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm text-text-secondary-600">{title}</span>
        </div>
        {actions}
      </div>
      <p className="mt-1 text-xl font-semibold text-text-strong-950">{value}</p>
    </div>
  );
}

// Mock data matching the SELLER VIEW image structure
// TODO: Replace with actual data fetched from API/Supabase
const mockOrders = [
  {
    id: '1',
    from: { name: 'James Brown', avatarUrl: 'https://i.pravatar.cc/40?img=1' },
    subject: 'Subject name',
    price: 1598,
    deadline: '05.26.2025',
    rating: null,
    status: 'active',
  },
  {
    id: '2',
    from: { name: 'Arthur Taylor', avatarUrl: 'https://i.pravatar.cc/40?img=2' },
    subject: 'Subject name',
    price: 1598,
    deadline: '05.26.2025',
    rating: 4.5,
    status: 'pending',
  },
  {
    id: '3',
    from: { name: 'Matthew Johnson', avatarUrl: 'https://i.pravatar.cc/40?img=3' },
    subject: 'Subject name',
    price: 1598,
    deadline: '05.26.2025',
    rating: 4.5,
    status: 'active',
  },
  {
    id: '4',
    from: { name: 'Emma Wright', avatarUrl: 'https://i.pravatar.cc/40?img=4' },
    subject: 'Subject name',
    price: 1598,
    deadline: '05.26.2025',
    rating: 4.5,
    status: 'active',
  },
  {
    id: '5',
    from: { name: 'Natalia Nowak', avatarUrl: 'https://i.pravatar.cc/40?img=5' },
    subject: 'Subject name',
    price: 1598,
    deadline: '05.26.2025',
    rating: 4.5,
    status: 'active',
  },
  {
    id: '6',
    from: { name: 'Wei Chen', avatarUrl: 'https://i.pravatar.cc/40?img=6' },
    subject: 'Subject name',
    price: 1598,
    deadline: '05.26.2025',
    rating: 4.5,
    status: 'active',
  },
  // Add more mock data mirroring the seller view...
];

// Helper to render status badges based on the image and available Badge props
function renderStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'active':
      // Use lighter variant with green text/bg hint
      return (
        <Badge.Root variant="lighter" size="medium" className="bg-green-100 text-green-700">
          Active
        </Badge.Root>
      );
    case 'pending':
      // Use lighter variant with orange/yellow text/bg hint
      return (
        <Badge.Root variant="lighter" size="medium" className="bg-orange-100 text-orange-700">
          Pending
        </Badge.Root>
      );
    case 'close':
      // Use stroke variant with neutral colors for the outlined style
      return (
        <Badge.Root variant="stroke" size="medium" className="border-gray-300 text-gray-600">
          Close
        </Badge.Root>
      );
    case 'dispute':
    case 'overdue':
      // Use lighter variant with red text/bg hint
      return (
        <Badge.Root variant="lighter" size="medium" className="bg-red-100 text-red-700 capitalize">
          {status} {/* Display original status text (Dispute/Overdue) */}
        </Badge.Root>
      );
    default:
      // Default neutral badge
      return (
        <Badge.Root variant="light" size="medium" className="bg-gray-100 text-gray-600">
          {status}
        </Badge.Root>
      );
  }
}

// Right Content Area Component
function OrdersContent() {
  const [activeTab, setActiveTab] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortOption, setSortOption] = React.useState('default');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const summaryData = {
    milestone: {
      title: 'Milestone',
      description: 'For only $4.99 per month!',
      learnMoreLink: '#',
      icon: <RiHeartLine className="size-5 text-icon-brand-500" />,
    },
    totalAmount: {
      title: 'Total Amount',
      value: '$50110.00',
    },
    settled: {
      title: 'Settled',
      value: '$11500.00',
    },
    inEscrow: {
      title: 'In Escrow',
      value: '$111.00',
    },
  };

  const filteredAndSortedOrders = mockOrders;
  const totalItems = filteredAndSortedOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentTableData = filteredAndSortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <main className="flex-1 bg-bg-alt-white-100 p-6">
      {/* Top Summary Section */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Milestone Card */}
        <div className="rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4 shadow-sm md:col-span-1 lg:col-span-1">
          <div className="flex items-start gap-2">
            {summaryData.milestone.icon}
            <div>
              <span className="text-sm font-medium text-text-strong-950">{summaryData.milestone.title}</span>
              <p className="mt-1 text-xs text-text-secondary-600">
                {summaryData.milestone.description}{' '}
                <Link href={summaryData.milestone.learnMoreLink} className="font-medium text-text-brand-900 hover:underline">
                  Learn More
                </Link>
              </p>
            </div>
          </div>
        </div>
        {/* Other Summary Cards */}
        <SummaryCard
          title={summaryData.totalAmount.title}
          value={summaryData.totalAmount.value}
        />
        <SummaryCard title={summaryData.settled.title} value={summaryData.settled.value} />
        <SummaryCard title={summaryData.inEscrow.title} value={summaryData.inEscrow.value} />
      </div>

      {/* Tabs and Filters Section */}
      <div className="mb-4 rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4 shadow-sm">
        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Tabs.List className="flex-wrap">
              <Tabs.Trigger value="all">All</Tabs.Trigger>
              <Tabs.Trigger value="active">Active</Tabs.Trigger>
              <Tabs.Trigger value="inactive">Inactive</Tabs.Trigger>
            </Tabs.List>
            <div className="flex flex-wrap items-center gap-2">
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 w-full rounded-md border border-stroke-soft-200 bg-bg-white-0 px-3 text-sm placeholder:text-text-sub-400 focus:outline-none focus:ring-1 focus:ring-ring sm:w-[200px]"
              />
              <Button.Root
                variant="neutral"
                mode="stroke"
                size="small"
                className="h-9 w-full sm:w-auto"
              >
                <Button.Icon as={RiFilter3Line} className="size-4" />
                Filter
              </Button.Root>
              <Dropdown.Root>
                <Dropdown.Trigger asChild>
                  <button className="inline-flex h-9 items-center justify-center gap-1 whitespace-nowrap rounded-md border border-stroke-soft-200 bg-bg-white-0 px-3 text-sm font-medium text-text-secondary-600 transition-colors hover:bg-bg-neutral-subtle-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    <RiSortAsc className="size-4" />
                    Sort by
                  </button>
                </Dropdown.Trigger>
                <Dropdown.Content align="end">
                  <Dropdown.Item onSelect={() => setSortOption('date_asc')}>Date Ascending</Dropdown.Item>
                  <Dropdown.Item onSelect={() => setSortOption('date_desc')}>Date Descending</Dropdown.Item>
                  <Dropdown.Item onSelect={() => setSortOption('name_asc')}>Name Ascending</Dropdown.Item>
                </Dropdown.Content>
              </Dropdown.Root>
            </div>
          </div>
        </Tabs.Root>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-lg border border-stroke-soft-200 bg-bg-white-0 shadow-sm">
        <Table.Root className="min-w-full divide-y divide-stroke-soft-200">
          <Table.Header className="bg-bg-alt-white-100">
            <Table.Row>
              <Table.Head className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-sub-500">From</Table.Head>
              <Table.Head className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-sub-500">Details</Table.Head>
              <Table.Head className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-sub-500">Final deadline</Table.Head>
              <Table.Head className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-sub-500">Rating</Table.Head>
              <Table.Head className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-sub-500">Status</Table.Head>
              <Table.Head className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-text-sub-500"></Table.Head> {/* Actions */}
            </Table.Row>
          </Table.Header>
          <Table.Body className="divide-y divide-stroke-soft-200 bg-bg-white-0">
            {currentTableData.map((order) => (
              <Table.Row key={order.id}>
                <Table.Cell className="px-4 py-3 align-top whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Avatar.Root size="32">
                      <Avatar.Image src={order.from.avatarUrl} alt={order.from.name} />
                    </Avatar.Root>
                    <span className="text-sm font-medium text-text-strong-950">{order.from.name}</span>
                  </div>
                </Table.Cell>
                <Table.Cell className="px-4 py-3 align-top">
                  <div className="text-sm font-medium text-text-strong-950">{order.subject}</div>
                  <div className="text-sm text-text-secondary-600">${order.price.toLocaleString()}</div>
                </Table.Cell>
                <Table.Cell className="px-4 py-3 text-sm text-text-secondary-600 align-top whitespace-nowrap">{order.deadline}</Table.Cell>
                <Table.Cell className="px-4 py-3 align-top whitespace-nowrap">
                  {order.rating !== null ? (
                    <div className="flex items-center gap-1 text-sm text-text-secondary-600">
                      <RiStarFill className='size-4 text-yellow-400' />
                      <span>{order.rating.toFixed(1)}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-text-sub-400">-</span> // Or leave empty
                  )}
                </Table.Cell>
                <Table.Cell className="px-4 py-3 align-top whitespace-nowrap">
                  {renderStatusBadge(order.status)}
                </Table.Cell>
                <Table.Cell className="px-4 py-3 text-right align-top whitespace-nowrap">
                  <Dropdown.Root>
                    <Dropdown.Trigger asChild>
                      <button className="p-1 text-text-sub-400 hover:text-text-strong-950 focus:outline-none">
                        <RiMore2Fill className="size-5" />
                      </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content align="end">
                      {/* TODO: Update actions based on seller view */}
                      <Dropdown.Item>View Details</Dropdown.Item>
                      <Dropdown.Item>Message Buyer</Dropdown.Item>
                      <Dropdown.Separator />
                      <Dropdown.Item className="text-text-danger-500">Cancel Order</Dropdown.Item>
                    </Dropdown.Content>
                  </Dropdown.Root>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>

      {/* Pagination Section */}
      <div className="mt-4 flex items-center justify-center border-t border-stroke-soft-200 pt-4">
        <Pagination.Root variant="basic">
          <Pagination.NavButton
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            <Pagination.NavIcon as={RiArrowLeftSLine} />
          </Pagination.NavButton>
          <Pagination.Item
            current
            aria-label={`Page ${currentPage}`}
          >
            {currentPage}
          </Pagination.Item>
          <Pagination.NavButton
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
          >
            <Pagination.NavIcon as={RiArrowRightSLine} />
          </Pagination.NavButton>
        </Pagination.Root>
      </div>
    </main>
  );
}

// Main Orders Page Component
export default function OrdersPage() {
  return (
    <div className="flex min-h-screen bg-bg-alt-white-100">
      <OrdersSidebar />
      <OrdersContent />
    </div>
  );
}
