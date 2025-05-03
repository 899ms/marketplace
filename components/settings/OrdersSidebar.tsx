'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/utils/supabase/AuthContext';
import { cn } from '@/utils/cn';
import * as TabMenuVertical from '@/components/ui/tab-menu-vertical';
import {
  RiTimeLine,
  RiBillLine,
  RiBriefcaseLine,
  RiArrowRightSLine,
} from '@remixicon/react';
import type { ActiveView } from './settings-page-content';
import { useRouter } from 'next/navigation';
import { Icons } from "@/assets/images/icons/icons";
/* ------------------------------------------------------------------ */
/** Left navigation panel shown on every settings page.
 *  ‑ Buyers see “Orders” + “Billing”
 *  ‑ Sellers see an extra “My services” link.
 */


interface Props {
  activeView: ActiveView;
  isSeller: boolean;
}

export default function OrdersSidebar({
  activeView,
  isSeller,
}: Props) {
  const { loading, profileLoading } = useAuth();
  const router = useRouter();

  /* -------- build link list dynamically -------- */
  const baseLinks = [
    { name: 'Orders', view: 'orders' as ActiveView, icon: Icons.Clock },
    { name: 'Billing', view: 'billing' as ActiveView, icon: Icons.DollarCircle },
  ];
  const links = [
    ...baseLinks,
    ...(isSeller
      ? [
        {
          name: 'My services',
          view: 'my-services' as ActiveView,
          icon: Icons.Crown,
        },
      ]
      : []),
  ];

  /* -------- skeleton while auth finishes -------- */
  if (loading || profileLoading) {
    return (
      <aside className="w-[240px] shrink-0 border-r border-stroke-soft-200 bg-bg-white-0 p-4 pt-6" />
    );
  }

  const handleValueChange = (value: string) => {
    router.push(`/settings?tab=${value}`);
  };

  /* ------------------ real sidebar ------------------ */
  return (
    <aside className="w-[240px] shrink-0 border-r border-stroke-soft-200 bg-bg-white-0 p-4 pt-6">
      <TabMenuVertical.Root defaultValue={activeView} onValueChange={handleValueChange}>
        <TabMenuVertical.List>
          {links.map(({ name, view, icon: Icon }) => (
            <TabMenuVertical.Trigger key={view} value={view}>
              {/* <TabMenuVertical.Icon as={Icon} /> */}
              <Icon className='text-black' />
              {name}
              <TabMenuVertical.ArrowIcon as={RiArrowRightSLine} />
            </TabMenuVertical.Trigger>

          ))}
        </TabMenuVertical.List>
      </TabMenuVertical.Root>
    </aside>
  );
}
