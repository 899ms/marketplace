'use client';

import React from 'react';
import { useAuth } from '@/utils/supabase/AuthContext';
import { serviceOperations } from '@/utils/supabase/database';
import type { Service } from '@/utils/supabase/types';
import Link from 'next/link'; // For sidebar links
import * as Dropdown from '@/components/ui/dropdown';
import * as Badge from '@/components/ui/badge';
import { RiMore2Fill } from '@remixicon/react';
import Image from 'next/image'; // For service images
import { RiErrorWarningLine } from '@remixicon/react'; // Example icon for tags
import { cn } from '@/utils/cn';

// TODO: Reuse or adapt the sidebar component from orders/page.tsx
// For now, a simplified placeholder
function SettingsSidebar() {
  // Placeholder: Links should be dynamic based on user type
  // and highlight the current page.
  const links = [
    { name: 'Profile', href: '/settings/profile' }, // Example links
    { name: 'Security', href: '/settings/security' },
    { name: 'Notifications', href: '/settings/notifications' },
    { name: 'Orders', href: '/orders' },
    { name: 'Billing', href: '/billing' },
    { name: 'My services', href: '/my-services' }, // This page
  ];

  return (
    <aside className="w-[240px] shrink-0 border-r border-stroke-soft-200 bg-bg-white-0 p-4 pt-6">
      <h2 className="mb-4 px-3 text-xs font-medium uppercase text-text-sub-400">Settings</h2>
      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center gap-2 rounded-md px-3 py-2 ${link.href === '/my-services' ? 'bg-bg-brand-subtle-100 font-medium text-text-brand-900' : 'text-text-secondary-600 hover:bg-bg-neutral-subtle-100 hover:text-text-strong-950'}`}
          >
            {/* Placeholder for icons */}
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

// --- Service Card Subcomponent --- 
interface ServiceCardProps {
  service: Service;
}

function ServiceCard({ service }: ServiceCardProps) {
  // Placeholder data - replace with actual fetched/calculated data
  const statusTags = [
    { text: 'Not Yet Published', variant: 'warning' as const }, // Placeholder status
    { text: 'To be improved', variant: 'info' as const }, // Placeholder status
  ];
  const ordersCount = 15; // Placeholder
  const salesAmount = 0; // Placeholder
  const favoritesCount = 0; // Placeholder

  // Use first image or a placeholder
  const imageUrl = service.images?.[0]?.url || 'https://via.placeholder.com/150/771796'; // Placeholder image URL
  const currencySymbol = service.currency === 'CNY' ? '¥' : '$'; // Simple currency symbol logic

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
        {/* Status Tags */}
        <div className="flex flex-wrap items-center gap-2">
          {statusTags.map((tag) => (
            <Badge.Root
              key={tag.text}
              variant="lighter" // Or map tag.variant to Badge variants
              size="small"
              className={cn(
                'capitalize',
                // Add specific colors based on tag.variant if needed
                tag.variant === 'warning' && 'bg-orange-100 text-orange-700',
                tag.variant === 'info' && 'bg-blue-100 text-blue-700'
              )}
            // icon={tag.variant === 'info' ? RiErrorWarningLine : undefined} // Example icon usage
            >
              {tag.text}
            </Badge.Root>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="flex shrink-0 items-center gap-6 text-right">
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

// Main Content Area for My Services
function MyServicesContent() {
  const { user, userProfile, loading: authLoading, profileLoading } = useAuth();
  const [services, setServices] = React.useState<Service[]>([]);
  const [dataLoading, setDataLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const isSeller = userProfile?.user_type === 'seller';

  // Fetch services when user is identified as a seller
  React.useEffect(() => {
    if (authLoading || profileLoading) return; // Wait for auth check

    if (!user || !isSeller) {
      setDataLoading(false);
      // Handle non-sellers or logged-out users (redirect or show message)
      console.log("User is not a seller or not logged in.");
      return;
    }

    const fetchServices = async () => {
      setDataLoading(true);
      setError(null);
      try {
        console.log(`Fetching services for seller ID: ${user.id}`);
        const fetchedServices = await serviceOperations.getServicesBySellerId(user.id);
        setServices(fetchedServices);
        console.log(`Fetched ${fetchedServices.length} services.`);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services.");
        setServices([]);
      } finally {
        setDataLoading(false);
      }
    };

    fetchServices();
  }, [user, isSeller, authLoading, profileLoading]);

  // Loading states
  if (authLoading || profileLoading) {
    return <div className="p-6 text-center">Loading user info...</div>;
  }

  // Handle non-sellers
  if (!isSeller) {
    return <div className="p-6 text-center">This page is only available for sellers.</div>;
  }

  // Main content rendering
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
            {/* TODO: Add relevant actions */}
            <Dropdown.Item>Create New Service</Dropdown.Item>
            <Dropdown.Item>Manage Settings</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>
      </div>

      {/* Services List - Map fetched data to ServiceCard */}
      {dataLoading ? (
        <div className="text-center">Loading services...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : services.length === 0 ? (
        <div className="text-center text-gray-500">You haven't created any services yet.</div>
        // TODO: Add a "Create Service" button here?
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

// Main Page Component
export default function MyServicesPage() {
  // Assuming AuthProvider wraps the layout or app higher up
  return (
    <div className="flex min-h-screen bg-bg-alt-white-100">
      {/* TODO: Use the actual shared sidebar component */}
      <SettingsSidebar />
      <MyServicesContent />
    </div>
  );
} 