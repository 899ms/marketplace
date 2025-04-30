'use client'; // Assuming child components might need client interactivity

import React from 'react';
import { WorkerSidebar } from '@/components/worker/worker-sidebar'; // Adjust path if needed
import { WorkerMainContent } from '@/components/worker/worker-main-content'; // Adjust path if needed
import { WorkerRightSidebar } from '@/components/worker/worker-right-sidebar'; // Adjust path if needed
import { User } from '@/utils/supabase/types'; // Import User type

interface SellerHomeContentProps {
  userProfile: User; // Accept user profile as prop
}

// Renamed from WorkerHomePage
export default function SellerHomeContent({ userProfile }: SellerHomeContentProps) {
  // Pass userProfile down to child components if they need it
  return (
    <div className='bg-bg-subtle-0 flex flex-1 gap-6 p-6'>
      <WorkerSidebar userProfile={userProfile} />
      <WorkerMainContent userProfile={userProfile} />
      <WorkerRightSidebar userProfile={userProfile} />
    </div>
  );
} 