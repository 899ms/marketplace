'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { SendOfferForm } from '@/components/offers/send-offer-form';
import { OfferProfileSidebar } from '@/components/offers/offer-profile-sidebar';

interface SendOfferPageProps {
  // params: {
  //   offerid: string;
  // };
}

// Updated mock worker data for the OfferProfileSidebar
const mockOfferWorker = {
  name: 'Cleve Music',
  avatar: 'https://placekitten.com/100/100',
  rating: 4.9,
  reviewCount: 128, // Renamed from reviews if needed, matching OfferProfileSidebar
  isGoogle: true,
  socialLinks: ['google', 'twitch'],
  about:
    "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...", // Added about text
  skills: [
    { name: 'Grammy', details: 'Billboard Music' },
    { name: 'American Music', details: 'BRIT' },
    { name: 'MTV Music', details: 'Eurovision Awards' },
    { name: 'Products (1)' }, // Skill for Tools/Products section example
  ],
  // Awards removed
};

// This page will be a client component because the form itself is a client component.
// Alternatively, wrap SendOfferForm in Suspense if fetching data server-side.
export default function SendOfferPage() {
  // Use the useParams hook to get route parameters
  const params = useParams<{ offerid: string }>(); // Specify expected param shape
  const offerid = params.offerid; // Access directly from hook result

  // Handle case where offerid might not be available initially (optional but good practice)
  if (!offerid) {
    // Render loading state or return null/error
    return <div>Loading offer details...</div>;
  }

  // TODO: Fetch actual data based on offerid (worker details, order details, etc.)

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-[40px] text-[#0E121B] mb-8 font-bold'>Send an offer</h1>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-7'>
        {/* Left Column: Form */}
        <div className='lg:col-span-5'>
          <SendOfferForm offerId={offerid} />
        </div>

        {/* Right Column: Offer Profile Sidebar */}

        <div className='lg:col-span-2 rounded-xl border border-stroke-soft-200'>
          <div className='sticky top-20 space-y-2 '>
            {/* 
              TODO: Fetch actual worker data instead of using mock data. 
              The data might come from the offerid, recipient selection, or related entities.
            */}
            <OfferProfileSidebar worker={mockOfferWorker} />
          </div>
        </div>
      </div>
    </div>
  );
}
