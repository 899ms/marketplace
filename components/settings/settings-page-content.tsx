'use client';

import React from 'react';
import { useAuth } from '@/utils/supabase/AuthContext';
import { useSearchParams } from 'next/navigation';

/* ------------- split‑out settings components ------------- */
import OrdersSidebar from '@/components/settings/OrdersSidebar';
import OrdersContent from '@/components/settings/OrdersContent';
import MyServicesView from '@/components/settings/MyServicesView';

/* --------------------------------------------------------- */
/** Keys that decide which "big view" we're showing */
export type ActiveView = 'orders' | 'billing' | 'my-services';

/** Main Settings / Orders page content (Client Component) */
export default function SettingsPageContent() {
  const searchParams = useSearchParams();
  const currentTab = (searchParams.get('tab') as ActiveView) || 'orders';

  /* load auth + profile once at the top level so children can rely
     on the Supabase context without individual spinner flashes  */
  const { userProfile, loading, profileLoading } = useAuth();
  const isSeller = userProfile?.user_type === 'seller';

  /* --------------- global skeleton while auth resolves --------------- */
  if (loading || profileLoading) {
    return (
      <div className="flex min-h-screen bg-bg-alt-white-100">
        <aside className="w-[240px] shrink-0 border-r border-stroke-soft-200 bg-bg-white-0 p-4 pt-6" />
        <main className="flex-1 p-6">Loading…</main>
      </div>
    );
  }

  /* --------------- main layout --------------- */
  return (
    <div className="flex min-h-screen bg-bg-alt-white-100 overflow-hidden mx-auto">
      {/* left nav – adds "My services" only if `isSeller` */}
      <OrdersSidebar activeView={currentTab} isSeller={!!isSeller} />

      {/* right content – switch on currentTab */}
      <div className="flex flex-1 flex-col w-[1132px] pl-7 pt-8 overflow-y-auto">
        {currentTab === 'orders' && <OrdersContent />}

        {currentTab === 'my-services' && isSeller && <MyServicesView />}

        {currentTab === 'my-services' && !isSeller && (
          <main>
            <p className="text-red-500">
              Access Denied: "My Services" is only available for sellers.
            </p>
          </main>
        )}

        {currentTab === 'billing' && (
          <main>
            {/* TODO: BillingView component once implemented */}
            <p className="text-text-sub-400">Billing view coming soon…</p>
          </main>
        )}
      </div>
    </div>
  );
} 