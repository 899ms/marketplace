export const dynamic = 'force-dynamic';

import { createSupabaseServerClient } from '@/utils/supabase/server';
import { userOperations } from '@/utils/supabase/database';
import { redirect } from 'next/navigation';

// Buyer Home Content (assuming structure from previous app/home/page.tsx)
import Sidebar from '@/components/layout/Sidebar';
import MainContent from '@/components/home/MainContent';

// Seller Home Content
import SellerHomeContent from '@/components/home/seller-home-content';
import { User } from '@/utils/supabase/types'; // Import User type

// Define Buyer Home component locally for clarity
function BuyerHome({ userProfile }: { userProfile: User }) {
  // Pass userProfile to children if they need it
  return (
    <div className='flex flex-1 gap-6 px-6 pt-6'>
      <Sidebar userProfile={userProfile} />
      <MainContent />
    </div>
  );
}

// Main Home Page - Server Component
export default async function HomePage() {
  let supabase;
  try {
    supabase = await createSupabaseServerClient();
  } catch (error) {
    console.error("Error creating Supabase server client:", error);
    // Handle client creation error, maybe redirect to a generic error page
    return <div>Error initializing data connection. Please try again later.</div>;
  }

  const { data: { user }, error: getUserError } = await supabase.auth.getUser();

  if (getUserError || !user) {
    console.log('User not authenticated or error fetching user, redirecting to / (login)', getUserError);
    // Middleware should handle this, but redirect as a fallback
    redirect('/');
  }

  let userProfile: User | null = null;
  try {
    console.log(`Fetching profile for user ID: ${user.id}`);
    userProfile = await userOperations.getUserById(user.id);
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
    redirect('/');
  }

  // --- Conditional Rendering based on user_type ---
  if (userProfile.user_type === 'seller') {
    console.log('Rendering Seller Home Content');
    return <SellerHomeContent userProfile={userProfile} />;
  } else {
    console.log('Rendering Buyer Home Content');
    // Default to buyer view
    return <BuyerHome userProfile={userProfile} />;
  }
}
