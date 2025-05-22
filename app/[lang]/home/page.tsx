export const dynamic = 'force-dynamic';

import { createSupabaseServerClient } from '@/utils/supabase/server';
import { serverDbOperations } from '@/utils/supabase/server-db';
import { redirect } from 'next/navigation';

// Buyer Home Content (assuming structure from previous app/home/page.tsx)
import Sidebar from '@/components/layout/Sidebar';
import MainContent from '@/components/home/MainContent';

// Seller Home Content
import SellerHomeContent from '@/components/home/seller-home-content';
import { User, Job } from '@/utils/supabase/types';

// Define Buyer Home component locally for clarity
function BuyerHome({ userProfile }: { userProfile: User }) {
  // Pass userProfile to children if they need it
  return (
    <div className='flex flex-1 gap-6 px-8 mt-8'>
      <Sidebar userProfile={userProfile} />
      <MainContent />
    </div>
  );
}

// Main Home Page - Server Component
export default async function HomePage({ params }: { params: { lang: string } }) {
  const { lang } = params;

  console.log('------------- DEBUG: HOME PAGE LOAD START -------------');

  let supabase;
  try {
    supabase = await createSupabaseServerClient();
    console.log('DEBUG: Successfully created server client');
  } catch (error) {
    console.error("Error creating Supabase server client:", error);
    // Handle client creation error, maybe redirect to a generic error page
    return <div>Error initializing data connection. Please try again later.</div>;
  }

  const { data: { user }, error: getUserError } = await supabase.auth.getUser();

  if (getUserError) {
    console.error('DEBUG: Auth error details:', getUserError);
  }

  if (getUserError || !user) {
    console.log('User not authenticated or error fetching user, redirecting to / (login)', getUserError);
    // Middleware should handle this, but redirect as a fallback
    redirect(`/${lang}`);
  }

  console.log('DEBUG: User authenticated successfully, ID:', user.id);

  let userProfile: User | null = null;
  try {
    console.log(`Fetching profile for user ID: ${user.id}`);
    // Use serverDbOperations instead of userOperations
    userProfile = await serverDbOperations.getUserById(user.id);
    console.log('Fetched profile:', userProfile);
  } catch (error) {
    console.error(`Error fetching user profile for ID ${user.id}:`, error);
    // Render an error state or fallback UI
    return <div>Error loading your profile data. Please try again later.</div>;
  }

  if (!userProfile) {
    console.error(`User profile not found for ID: ${user.id}. Redirecting to login.`);
    // Maybe redirect to profile setup or show error
    // For now, redirecting to login might be safest if profile is essential
    redirect(`/${lang}`);
  }

  console.log('DEBUG: Successfully retrieved user profile');

  // Fetch recent jobs *only if* the user is a seller
  let recentJobs: Job[] = [];
  if (userProfile.user_type === 'seller') {
    try {
      console.log('Fetching recent jobs for seller...');
      // Use serverDbOperations instead of jobOperations
      recentJobs = await serverDbOperations.getRecentJobs(3);
      console.log(`Fetched ${recentJobs.length} recent jobs.`);
    } catch (error) {
      console.error('Error fetching recent jobs:', error);
      // Assign empty array on error so the prop exists
      recentJobs = [];
    }
  }

  console.log('------------- DEBUG: HOME PAGE LOAD COMPLETE -------------');

  // --- Conditional Rendering based on user_type ---
  if (userProfile.user_type === 'seller') {
    console.log('Rendering Seller Home Content with recent jobs');
    // Pass recentJobs to SellerHomeContent
    // Note: SellerHomeContent props will need to be updated in its own file
    return <SellerHomeContent userProfile={userProfile} recentJobs={recentJobs} />;
  } else {
    console.log('Rendering Buyer Home Content');
    // Default to buyer view
    return <BuyerHome userProfile={userProfile} />;
  }
}
