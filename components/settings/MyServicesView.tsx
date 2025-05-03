'use client';

import React from 'react';
import { RiMore2Fill, RiMoreFill } from '@remixicon/react';
import * as Dropdown from '@/components/ui/dropdown';
import { useAuth } from '@/utils/supabase/AuthContext';
import { serviceOperations } from '@/utils/supabase/database';
import type { Service } from '@/utils/supabase/types';
import ServiceCard from '@/components/settings/ServiceCard';

/* ------------------------------------------------------------------ */
/** Full seller‑only page that lists the user’s services. The parent
 *  (`page.tsx`) mounts this component *only* when the current account
 *  is a seller and “My services” view is active.
 */
export default function MyServicesView() {
  const { user, userProfile, loading: authLoading, profileLoading } = useAuth();

  const [services, setServices] = React.useState<Service[]>([]);
  const [dataLoading, setDataLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const isSeller = userProfile?.user_type === 'seller';

  /* ------------------ fetch seller services ------------------ */
  React.useEffect(() => {
    if (!user || !isSeller) {
      setDataLoading(false);
      return;
    }

    const fetchServices = async () => {
      setDataLoading(true);
      setError(null);
      try {
        const fetched = await serviceOperations.getServicesBySellerId(user.id);
        setServices(fetched);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services.');
        setServices([]);
      } finally {
        setDataLoading(false);
      }
    };

    fetchServices();
  }, [user, isSeller]);

  /* ------------------ auth skeleton ------------------ */
  if (authLoading || profileLoading) return null; // handled by parent

  /* ------------------ render ------------------ */
  return (
    <main className="flex-1 bg-bg-alt-white-100 p-6 h-full">
      {/* ---------- header row ---------- */}
      <div className="mb-6 flex items-center justify-between border-b border-[#E1E4EA] pb-4 h-[10%]">
        <h1 className="text-[24px] font-medium text-[#222530]">
          My Services
        </h1>

        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <button className="flex size-8 items-center justify-center rounded-lg border border-[#E1E4EA] bg-bg-white-0 text-icon-sub-400 shadow-sm transition hover:bg-bg-neutral-subtle-100 hover:text-icon-secondary-400">
              <RiMoreFill className="size-5 text-[#99A0AE]" />
            </button>
          </Dropdown.Trigger>
          <Dropdown.Content align="end">
            <Dropdown.Item>Create New Service</Dropdown.Item>
            <Dropdown.Item>Manage Settings</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>
      </div>

      {/* ---------- list / states ---------- */}
      {dataLoading ? (
        <div className="text-center">Loading services…</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : services.length === 0 ? (
        <div className="text-center text-gray-500">
          You haven’t created any services yet.
        </div>
      ) : (
        <div className="space-y-4 h-[90%] overflow-y-auto  custom-scrollbar pr-4">
          {services.map((svc) => (
            <ServiceCard key={svc.id} service={svc} />
          ))}
        </div>
      )}
    </main>
  );
}
