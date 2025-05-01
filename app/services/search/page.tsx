import React, { Suspense } from 'react';
import SearchPageClient from './search-page-client'; // Import the new client component

// Simple loading component
function LoadingFallback() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <p>Loading search results...</p>
      {/* You can add a spinner or more sophisticated skeleton here */}
    </div>
  );
}

export default function ServicesSearchPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SearchPageClient />
    </Suspense>
  );
} 