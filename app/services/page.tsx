'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ServicesPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/services/search');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="animate-pulse">Redirecting to services search page...</div>
    </div>
  );
}
