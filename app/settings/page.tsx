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
  RiTimeLine,
  RiBillLine,
  RiErrorWarningLine,
  RiBriefcaseLine,
} from '@remixicon/react';
import { clsx } from 'clsx';
import { Input } from '@/components/ui/input';
import * as DatePicker from '@/components/ui/datepicker';
import * as Dropdown from '@/components/ui/dropdown';
import * as Tabs from '@/components/ui/tabs';
import * as Table from '@/components/ui/table';
import * as Pagination from '@/components/ui/pagination';
import { cn } from '@/utils/cn';
import { useAuth } from '@/utils/supabase/AuthContext';
import { contractOperations, jobOperations, userOperations, contractMilestoneOperations, serviceOperations } from '@/utils/supabase/database';
import type { Contract, Job, User as AppUser, ContractMilestone, Service } from '@/utils/supabase/types';
import Image from 'next/image';

// Type for the active view state
type ActiveView = 'orders' | 'billing' | 'my-services'; // Add other views as needed

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

// Left Sidebar Component - Now checks user type
function OrdersSidebar({ activeView, setActiveView, isSeller }: { activeView: ActiveView, setActiveView: (view: ActiveView) => void, isSeller: boolean }) {
  const { loading, profileLoading } = useAuth();

  // Define links with view keys
  const baseLinks = [
    { name: 'Orders', view: 'orders' as ActiveView, icon: RiTimeLine },
    { name: 'Billing', view: 'billing' as ActiveView, icon: RiBillLine },
  ];

  const links = [
    ...baseLinks,
    ...(isSeller ? [{ name: 'My services', view: 'my-services' as ActiveView, icon: RiBriefcaseLine }] : []),
  ];

  if (loading || profileLoading) {
    return (
      <aside className="w-[240px] shrink-0 border-r border-stroke-soft-200 bg-bg-white-0 p-4 pt-6">
        {/* Skeleton Loader */}
      </aside>
    );
  }

  return (
    <aside className="w-[240px] shrink-0 border-r border-stroke-soft-200 bg-bg-white-0 p-4 pt-6">
      <nav className="flex flex-col gap-1">
        {links.map((link) => {
          const isActive = activeView === link.view;
          const Icon = link.icon;
          return (
            // Use button for internal view switching
            <button
              key={link.view}
              onClick={() => setActiveView(link.view)}
              className={cn(
                'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left transition-colors',
                isActive
                  ? 'bg-bg-brand-subtle-100 font-medium text-text-brand-900'
                  : 'text-text-secondary-600 hover:bg-bg-neutral-subtle-100 hover:text-text-strong-950'
              )}
            >
              {Icon && <Icon className="size-5 shrink-0" />}
              <span>{link.name}</span>
            </button>
          );
        })}
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

// --- Local View Model Interfaces --- 
// (Keep local definitions for mapping clarity)
interface PersonInfo {
  name: string;
  avatarUrl: string;
}
interface BuyerEngagement {
  id: string;
  type: 'job' | 'contract';
  subject: string;
  price: number;
  deadline: string;
  worker: PersonInfo | null;
  status: string;
}
interface SellerOrder {
  id: string;
  from: PersonInfo;
  subject: string;
  price: number;
  deadline: string;
  rating: number | null;
  status: string;
}

// Helper to render status badges based on the image and available Badge props
function renderStatusBadge(status: string, type: 'job' | 'contract' | 'seller_order' | 'service') {
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
  // --- Auth Context --- 
  const { user, userProfile, loading: authLoading, profileLoading } = useAuth();

  // --- State --- 
  const [ordersData, setOrdersData] = React.useState<(BuyerEngagement | SellerOrder)[]>([]);
  const [dataLoading, setDataLoading] = React.useState(true); // Separate state for data fetching
  const [error, setError] = React.useState<string | null>(null);

  const [activeTab, setActiveTab] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  const [sortOption, setSortOption] = React.useState('default');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  // --- Determine User Type --- 
  const userType = userProfile?.user_type; // Get type from profile
  const isBuyer = userType === 'buyer';

  // --- Data Fetching Effect (Added Seller Logic) --- 
  React.useEffect(() => {
    if (authLoading || profileLoading || !user || !userType) {
      setDataLoading(false);
      return;
    }
    const fetchOrders = async () => {
      setDataLoading(true);
      setError(null);
      console.log(`Fetching orders for ${userType} ID: ${user.id}`);
      try {
        let fetchedData: (BuyerEngagement | SellerOrder)[] = [];

        if (isBuyer) {
          // --- Buyer Logic (remains the same) --- 
          const [jobs, contracts] = await Promise.all([
            jobOperations.getJobsByBuyerId(user.id),
            contractOperations.getUserContracts(user.id)
          ]);
          const contractsByJobId = new Map<string, Contract>();
          contracts.forEach(contract => { if (contract.job_id) { contractsByJobId.set(contract.job_id, contract); } });

          const buyerEngagementsPromises = jobs.map(async (job): Promise<BuyerEngagement | null> => {
            const relatedContract = contractsByJobId.get(job.id);
            if (relatedContract && relatedContract.seller_id) {
              const sellerProfile = await userOperations.getUserById(relatedContract.seller_id);
              const workerInfo = sellerProfile ? { name: sellerProfile.full_name, avatarUrl: sellerProfile.avatar_url || 'https://via.placeholder.com/40' } : null;
              return {
                id: relatedContract.id,
                type: 'contract',
                subject: job.title,
                price: relatedContract.amount,
                deadline: job.deadline || 'N/A',
                worker: workerInfo,
                status: relatedContract.status || 'pending',
              };
            } else {
              return {
                id: job.id,
                type: 'job',
                subject: job.title,
                price: job.budget,
                deadline: job.deadline || 'N/A',
                worker: null,
                status: job.status || 'open',
              };
            }
          });
          const resolvedEngagements = await Promise.all(buyerEngagementsPromises);
          fetchedData = resolvedEngagements.filter(e => e !== null) as BuyerEngagement[];
          console.log(`Buyer: Fetched ${jobs.length} jobs, found ${contractsByJobId.size} contracts linked to jobs, mapped ${fetchedData.length} engagements.`);

        } else {
          // --- Seller Logic --- 
          const contracts = await contractOperations.getUserContracts(user.id);
          const sellerContracts = contracts.filter(c => c.seller_id === user.id);
          console.log(`Seller: Fetched ${contracts.length} total contracts, ${sellerContracts.length} are seller contracts.`);

          const sellerOrdersPromises = sellerContracts.map(async (contract): Promise<SellerOrder | null> => {
            // Ensure buyer_id exists before trying to fetch
            if (!contract.buyer_id) {
              console.warn(`Contract ${contract.id} is missing buyer_id.`);
              return null;
            }
            const buyerProfile = await userOperations.getUserById(contract.buyer_id);
            // Decide how to handle orders if buyer profile isn't found
            if (!buyerProfile) {
              console.warn(`Buyer profile not found for ID: ${contract.buyer_id} on contract ${contract.id}`);
              // Option: Skip this order
              return null;
              // Option: Use placeholder data
              // buyerInfo = { name: 'Unknown Buyer', avatarUrl: '...' }; 
            }

            const buyerInfo = {
              name: buyerProfile.full_name,
              avatarUrl: buyerProfile.avatar_url || 'https://via.placeholder.com/40',
            };

            // TODO: Determine rating for the seller on this contract (requires rating system)
            const ratingPlaceholder = 4.5; // Placeholder rating
            // TODO: Determine deadline for seller (might come from job or milestones?)
            const deadlinePlaceholder = 'N/A'; // Placeholder deadline

            return {
              id: contract.id, // Use contract ID for seller orders
              from: buyerInfo,
              subject: contract.title || 'Contract Title Missing',
              price: contract.amount,
              deadline: deadlinePlaceholder, // Use placeholder or fetch logic
              rating: ratingPlaceholder, // Use placeholder or fetch logic
              status: contract.status || 'pending',
            };
          });

          const resolvedSellerOrders = await Promise.all(sellerOrdersPromises);
          fetchedData = resolvedSellerOrders.filter(order => order !== null) as SellerOrder[];
          console.log(`Seller: Mapped ${fetchedData.length} valid seller orders.`);
        }
        setOrdersData(fetchedData);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders.");
        setOrdersData([]);
      } finally {
        setDataLoading(false);
      }
    };
    fetchOrders();
  }, [user, userType, authLoading, profileLoading, isBuyer]);

  // --- Conditional Data & Logic (using fetched `ordersData`) --- 

  // TODO: Implement filtering & sorting on fetched `ordersData`
  const filteredAndSortedOrders = ordersData; // Placeholder

  const totalItems = filteredAndSortedOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentTableData = filteredAndSortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ... summaryData (can be updated based on fetched data later) ...
  const summaryData = {
    milestone: {
      title: 'Milestone',
      description: 'For only $4.99 per month!',
      learnMoreLink: '#',
      icon: <RiHeartLine className="size-5 text-icon-brand-500" />,
    },
    totalAmount: {
      title: 'Total Amount',
      value: isBuyer ? '$500.00' : '$50110.00',
      actions: isBuyer ? (
        <div className="flex gap-2 text-sm">
          <button className="text-text-brand-900 hover:underline">Top up</button>
          <button className="text-text-brand-900 hover:underline">Withdraw</button>
        </div>
      ) : null,
    },
    settled: {
      title: 'Settled',
      value: isBuyer ? '$5100.00' : '$11500.00',
    },
    inEscrow: {
      title: 'In Escrow',
      value: isBuyer ? '$110.00' : '$111.00',
    },
  };

  // ... handlers ...
  const handlePreviousPage = () => { setCurrentPage((prev) => Math.max(prev - 1, 1)); };
  const handleNextPage = () => { setCurrentPage((prev) => Math.min(prev + 1, totalPages)); };

  // --- Render Logic --- 

  // Handle initial auth loading
  if (authLoading || profileLoading) {
    return (
      <main className="flex-1 bg-bg-alt-white-100 p-6 flex items-center justify-center">
        <p>Loading user information...</p>
        {/* TODO: Add a spinner component */}
      </main>
    );
  }

  // Handle case where user is not logged in or profile couldn't load
  if (!user || !userProfile || !userType) {
    return (
      <main className="flex-1 bg-bg-alt-white-100 p-6 flex items-center justify-center">
        <p>Please log in to view your orders.</p>
        {/* Optionally link to login page */}
      </main>
    );
  }

  return (
    <main className="flex-1 bg-bg-alt-white-100 p-6">
      {/* Top Summary Section - Now uses conditional summaryData */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Milestone Card (assuming same for both) */}
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
          actions={summaryData.totalAmount.actions} // Pass conditional actions
        />
        <SummaryCard title={summaryData.settled.title} value={summaryData.settled.value} />
        <SummaryCard title={summaryData.inEscrow.title} value={summaryData.inEscrow.value} />
      </div>

      {/* Tabs and Filters Section - Conditional Rendering */}
      <div className="mb-4 rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4 shadow-sm">
        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Conditional Tabs */}
            <Tabs.List className="flex-wrap">
              <Tabs.Trigger value="all">All</Tabs.Trigger>
              {isBuyer ? (
                <>
                  <Tabs.Trigger value="inProgress">In progress</Tabs.Trigger>
                  <Tabs.Trigger value="completed">Completed</Tabs.Trigger>
                </>
              ) : (
                <>
                  <Tabs.Trigger value="active">Active</Tabs.Trigger>
                  <Tabs.Trigger value="inactive">Inactive</Tabs.Trigger>
                </>
              )}
            </Tabs.List>

            {/* Conditional Filters/Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 w-full rounded-md border border-stroke-soft-200 bg-bg-white-0 px-3 text-sm placeholder:text-text-sub-400 focus:outline-none focus:ring-1 focus:ring-ring sm:w-[200px]"
              // TODO: Add search icon prefix if Input component supports it easily
              />
              {isBuyer ? (
                // Buyer: Date Picker
                <Dropdown.Root>
                  <Dropdown.Trigger asChild>
                    <button className="inline-flex h-9 w-full items-center justify-center gap-1 whitespace-nowrap rounded-md border border-stroke-soft-200 bg-bg-white-0 px-3 text-sm font-medium text-text-secondary-600 transition-colors hover:bg-bg-neutral-subtle-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:w-auto">
                      <RiCalendarLine className="size-4" />
                      <span>{selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}</span>
                    </button>
                  </Dropdown.Trigger>
                  <Dropdown.Content align="start" className="w-auto p-0">
                    <DatePicker.Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate} // Make sure setSelectedDate is available
                      initialFocus
                    />
                  </Dropdown.Content>
                </Dropdown.Root>
              ) : (
                // Seller: Filter Button
                <Button.Root
                  variant="neutral"
                  mode="stroke"
                  size="small"
                  className="h-9 w-full sm:w-auto"
                // TODO: Add onClick handler for filtering
                >
                  <Button.Icon as={RiFilter3Line} className="size-4" />
                  Filter
                </Button.Root>
              )}
              {/* Sort Dropdown (Common for both) */}
              <Dropdown.Root>
                <Dropdown.Trigger asChild>
                  <button className="inline-flex h-9 items-center justify-center gap-1 whitespace-nowrap rounded-md border border-stroke-soft-200 bg-bg-white-0 px-3 text-sm font-medium text-text-secondary-600 transition-colors hover:bg-bg-neutral-subtle-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    <RiSortAsc className="size-4" />
                    Sort by
                  </button>
                </Dropdown.Trigger>
                <Dropdown.Content align="end">
                  {/* TODO: Adjust sort options based on view if needed */}
                  <Dropdown.Item onSelect={() => setSortOption('date_asc')}>Date Ascending</Dropdown.Item>
                  <Dropdown.Item onSelect={() => setSortOption('date_desc')}>Date Descending</Dropdown.Item>
                  <Dropdown.Item onSelect={() => setSortOption('name_asc')}>Name Ascending</Dropdown.Item>
                </Dropdown.Content>
              </Dropdown.Root>
            </div>
          </div>
        </Tabs.Root>
      </div>

      {/* Table Section - Conditional Headers and Body */}
      <div className="overflow-hidden rounded-lg border border-stroke-soft-200 bg-bg-white-0 shadow-sm">
        {/* Handle Data Loading / Error / Empty States */}
        {dataLoading ? (
          <div className="p-4 text-center">Loading orders...</div>
          // TODO: Add spinner
        ) : error ? (
          <div className="p-4 text-center text-red-600">{error}</div>
        ) : currentTableData.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No orders found.</div>
        ) : (
          <Table.Root className="min-w-full divide-y divide-stroke-soft-200">
            {/* Conditional Table Header */}
            <Table.Header className="bg-bg-alt-white-100">
              <Table.Row>
                {isBuyer ? (
                  <>
                    <Table.Head className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-sub-500">Details</Table.Head>
                    <Table.Head className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-sub-500">Final deadline</Table.Head>
                    <Table.Head className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-sub-500">Worker / Job</Table.Head>
                    <Table.Head className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-sub-500">Status</Table.Head>
                  </>
                ) : (
                  <>
                    <Table.Head className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-sub-500">From</Table.Head>
                    <Table.Head className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-sub-500">Details</Table.Head>
                    <Table.Head className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-sub-500">Final deadline</Table.Head>
                    <Table.Head className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-sub-500">Rating</Table.Head>
                    <Table.Head className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-sub-500">Status</Table.Head>
                  </>
                )}
                <Table.Head className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-text-sub-500"></Table.Head> {/* Actions Column (Common) */}
              </Table.Row>
            </Table.Header>
            {/* Conditional Table Body with Type Narrowing and Safer Rendering */}
            <Table.Body className="divide-y divide-stroke-soft-200 bg-bg-white-0">
              {currentTableData.map((order) => {
                // Determine link based on type (needed for dropdown)
                const isBuyerJobPosting = isBuyer && (order as BuyerEngagement).type === 'job';
                const detailLink = isBuyerJobPosting ? `/projects/${order.id}` : `/orders/detail/${order.id}`;

                // Ensure the Table.Row is returned directly from the map callback
                return (
                  <Table.Row key={order.id}>
                    {isBuyer ? (
                      // --- Buyer Row --- 
                      (() => {
                        const engagement = order as BuyerEngagement;
                        return (
                          <>
                            <Table.Cell className="px-4 py-3 align-top">
                              {/* Conditional Link for Buyer - Use detailLink */}
                              <Link href={detailLink} className="block group hover:text-blue-600">
                                <div className="text-sm font-medium text-text-strong-950 group-hover:underline">{engagement.subject}</div>
                              </Link>
                              <div className="text-sm text-text-secondary-600">${engagement.price.toLocaleString()}</div>
                            </Table.Cell>
                            <Table.Cell className="px-4 py-3 text-sm text-text-secondary-600 align-top whitespace-nowrap">{engagement.deadline}</Table.Cell>
                            <Table.Cell className="px-4 py-3 align-top whitespace-nowrap">
                              {engagement.worker ? (
                                <div className="flex items-center gap-2">
                                  <Avatar.Root size="32">
                                    <Avatar.Image
                                      src={engagement.worker.avatarUrl || 'https://via.placeholder.com/40'}
                                      alt={engagement.worker.name}
                                    />
                                  </Avatar.Root>
                                  <span className="text-sm font-medium text-text-strong-950">{engagement.worker.name}</span>
                                </div>
                              ) : (
                                <span className="text-sm text-text-sub-400 italic">Job Posting</span>
                              )}
                            </Table.Cell>
                            <Table.Cell className="px-4 py-3 align-top whitespace-nowrap">
                              {renderStatusBadge(engagement.status, engagement.type)}
                            </Table.Cell>
                          </>
                        );
                      })()
                    ) : (
                      // --- Seller Row --- 
                      (() => {
                        const sellerOrder = order as SellerOrder;
                        // Seller always links to order detail
                        const sellerLink = `/orders/detail/${sellerOrder.id}`;
                        return (
                          <>
                            <Table.Cell className="px-4 py-3 align-top whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <Avatar.Root size="32">
                                  {sellerOrder.from && (
                                    <Avatar.Image
                                      src={sellerOrder.from.avatarUrl || 'https://via.placeholder.com/40'}
                                      alt={sellerOrder.from.name}
                                    />
                                  )}
                                </Avatar.Root>
                                <span className="text-sm font-medium text-text-strong-950">
                                  {sellerOrder.from ? sellerOrder.from.name : 'Unknown Buyer'}
                                </span>
                              </div>
                            </Table.Cell>
                            <Table.Cell className="px-4 py-3 align-top">
                              {/* Seller Link (always order detail) */}
                              <Link href={sellerLink} className="block group hover:text-blue-600">
                                <div className="text-sm font-medium text-text-strong-950 group-hover:underline">{sellerOrder.subject}</div>
                              </Link>
                              <div className="text-sm text-text-secondary-600">${sellerOrder.price.toLocaleString()}</div>
                            </Table.Cell>
                            <Table.Cell className="px-4 py-3 text-sm text-text-secondary-600 align-top whitespace-nowrap">{sellerOrder.deadline}</Table.Cell>
                            <Table.Cell className="px-4 py-3 align-top whitespace-nowrap">
                              {typeof sellerOrder.rating === 'number' ? (
                                <div className="flex items-center gap-1 text-sm text-text-secondary-600">
                                  <RiStarFill className='size-4 text-yellow-400' />
                                  <span>{sellerOrder.rating.toFixed(1)}</span>
                                </div>
                              ) : (
                                <span className="text-sm text-text-sub-400">-</span>
                              )}
                            </Table.Cell>
                            <Table.Cell className="px-4 py-3 align-top whitespace-nowrap">
                              {renderStatusBadge(sellerOrder.status, 'seller_order')}
                            </Table.Cell>
                          </>
                        );
                      })()
                    )}
                    {/* Actions Column (Common) */}
                    <Table.Cell className="px-4 py-3 text-right align-top whitespace-nowrap">
                      <Dropdown.Root>
                        <Dropdown.Trigger asChild>
                          <button className="p-1 text-text-sub-400 hover:text-text-strong-950 focus:outline-none">
                            <RiMore2Fill className="size-5" />
                          </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="end">
                          {/* Use Link for View Details with conditional href */}
                          <Dropdown.Item asChild>
                            <Link href={detailLink}>View Details</Link>
                          </Dropdown.Item>
                          <Dropdown.Item>{isBuyer ? 'Message Worker' : 'Message Buyer'}</Dropdown.Item>
                          <Dropdown.Separator />
                          <Dropdown.Item className="text-text-danger-500">Cancel Order</Dropdown.Item>
                        </Dropdown.Content>
                      </Dropdown.Root>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Root>
        )}
      </div>

      {/* Pagination Section (Common) */}
      {/* Only show pagination if there are multiple pages */}
      {totalPages > 1 && (
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
      )}
    </main>
  );
}

// Service Card Subcomponent (Copied from my-services)
interface ServiceCardProps {
  service: Service;
}
function ServiceCard({ service }: ServiceCardProps) {
  const statusTags = [
    { text: 'Not Yet Published', variant: 'warning' as const },
    { text: 'To be improved', variant: 'info' as const },
  ];
  const ordersCount = 15;
  const salesAmount = 0;
  const favoritesCount = 0;
  const imageUrl = service.images?.[0]?.url || 'https://via.placeholder.com/150/771796';
  const currencySymbol = service.currency === 'CNY' ? '¥' : '$';

  return (
    <div className="flex items-center gap-4 rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4 shadow-sm">
      {/* Image */}
      <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-md bg-gray-100">
        <Image
          src={imageUrl}
          alt={service.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      {/* Details */}
      <div className="flex-1">
        <h3 className="mb-1 font-medium text-text-strong-950 line-clamp-1">{service.title}</h3>
        <div className="flex flex-wrap items-center gap-2">
          {statusTags.map((tag) => (
            <Badge.Root
              key={tag.text}
              variant="lighter"
              size="small"
              className={cn(
                'capitalize',
                tag.variant === 'warning' && 'bg-orange-100 text-orange-700',
                tag.variant === 'info' && 'bg-blue-100 text-blue-700'
              )}
            >
              {tag.text}
            </Badge.Root>
          ))}
        </div>
      </div>
      {/* Stats */}
      <div className="flex shrink-0 items-center gap-6 text-right">
        {/* ... stats divs (Price, Orders, Sales, Favorites) ... */}
        <div className="flex flex-col">
          <span className="font-medium text-text-strong-950">{currencySymbol}{service.price.toLocaleString()}</span>
          <span className="text-xs text-text-sub-500">Price</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-text-strong-950">{ordersCount}</span>
          <span className="text-xs text-text-sub-500">Orders</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-text-strong-950">{currencySymbol}{salesAmount.toLocaleString()}</span>
          <span className="text-xs text-text-sub-500">Sales amount</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-text-strong-950">{favoritesCount}</span>
          <span className="text-xs text-text-sub-500">Favorites</span>
        </div>
      </div>
    </div>
  );
}

// My Services View Component (Adapted from MyServicesContent)
function MyServicesView() {
  const { user, userProfile, loading: authLoading, profileLoading } = useAuth();
  const [services, setServices] = React.useState<Service[]>([]);
  const [dataLoading, setDataLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const isSeller = userProfile?.user_type === 'seller';

  React.useEffect(() => {
    // Basic guard, main check done in OrdersPage conditional render
    if (!user || !isSeller) {
      setDataLoading(false);
      return;
    }

    const fetchServices = async () => {
      setDataLoading(true);
      setError(null);
      try {
        const fetchedServices = await serviceOperations.getServicesBySellerId(user.id);
        setServices(fetchedServices);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services.");
        setServices([]);
      } finally {
        setDataLoading(false);
      }
    };
    fetchServices();
  }, [user, isSeller]); // Depend on user and isSeller

  // Don't need auth loading check here, handled by OrdersPage

  return (
    <main className="flex-1 bg-bg-alt-white-100 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-text-strong-950">My Services</h1>
        {/* More Options Dropdown */}
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <button className="flex size-8 items-center justify-center rounded-lg border border-stroke-soft-200 bg-bg-white-0 text-icon-sub-400 shadow-sm transition hover:bg-bg-neutral-subtle-100 hover:text-icon-secondary-400">
              <RiMore2Fill className="size-5" />
            </button>
          </Dropdown.Trigger>
          <Dropdown.Content align="end">
            <Dropdown.Item>Create New Service</Dropdown.Item>
            <Dropdown.Item>Manage Settings</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>
      </div>

      {/* Services List */}
      {dataLoading ? (
        <div className="text-center">Loading services...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : services.length === 0 ? (
        <div className="text-center text-gray-500">You haven't created any services yet.</div>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </main>
  );
}

// Main Orders Page Component
export default function OrdersPage() {
  const [activeView, setActiveView] = React.useState<ActiveView>('orders'); // Default view
  const { userProfile, loading, profileLoading } = useAuth(); // Get loading states

  const isSeller = userProfile?.user_type === 'seller';

  // Show loading state for the whole page while auth is resolving
  if (loading || profileLoading) {
    return (
      <div className="flex min-h-screen bg-bg-alt-white-100">
        {/* Sidebar Skeleton */}
        <aside className="w-[240px] shrink-0 border-r border-stroke-soft-200 bg-bg-white-0 p-4 pt-6">
          {/* Placeholder */}
        </aside>
        {/* Content Skeleton */}
        <main className="flex-1 p-6"><p>Loading...</p></main>
      </div>
    );
  }

  // If no profile (e.g., not logged in), maybe redirect or show login message
  // This depends on whether non-logged-in users can see anything here

  return (
    <div className="flex min-h-screen bg-bg-alt-white-100">
      <OrdersSidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isSeller={!!isSeller}
      />

      {/* Conditionally render the main content based on activeView */}
      <div className="flex-1">
        {activeView === 'orders' && <OrdersContent />}
        {/* Render MyServicesView only if view is active AND user is seller */}
        {activeView === 'my-services' && isSeller && <MyServicesView />}
        {activeView === 'billing' /* && <BillingView /> */}
        {/* Handle edge case where My Services is selected but user isn't seller */}
        {activeView === 'my-services' && !isSeller && (
          <main className="flex-1 p-6"><p className="text-red-500">Access Denied: My Services is only available for sellers.</p></main>
        )}
        {/* TODO: Add BillingView component rendering */}
      </div>
    </div>
  );
}
