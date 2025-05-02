'use client';

import React from 'react';
import { useAuth } from '@/utils/supabase/AuthContext';
import { cn } from '@/utils/cn';
import {
  RiTimeLine,
  RiBillLine,
  RiBriefcaseLine,
} from '@remixicon/react';
import type { ActiveView } from '@/app/settings/page';

/* ------------------------------------------------------------------ */
/** Left navigation panel shown on every settings page.
 *  ‑ Buyers see “Orders” + “Billing”
 *  ‑ Sellers see an extra “My services” link.
 */
interface Props {
  activeView: ActiveView;
  setActiveView: (v: ActiveView) => void;
  isSeller: boolean;
}

export default function OrdersSidebar({
  activeView,
  setActiveView,
  isSeller,
}: Props) {
  const { loading, profileLoading } = useAuth();

  /* -------- build link list dynamically -------- */
  const baseLinks = [
    { name: 'Orders', view: 'orders' as ActiveView, icon: RiTimeLine },
    { name: 'Billing', view: 'billing' as ActiveView, icon: RiBillLine },
  ];
  const links = [
    ...baseLinks,
    ...(isSeller
      ? [
        {
          name: 'My services',
          view: 'my-services' as ActiveView,
          icon: RiBriefcaseLine,
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

  /* ------------------ real sidebar ------------------ */
  return (
    <aside className="w-[240px] shrink-0 border-r border-stroke-soft-200 bg-bg-white-0 p-4 pt-6">
      <nav className="flex flex-col gap-1">
        {links.map(({ name, view, icon: Icon }) => {
          const selected = activeView === view;
          return (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={cn(
                'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left transition-colors',
                selected
                  ? 'bg-bg-brand-subtle-100 font-medium text-text-brand-900'
                  : 'text-text-secondary-600 hover:bg-bg-neutral-subtle-100 hover:text-text-strong-950',
              )}
            >
              <Icon className="size-5 shrink-0" />
              <span>{name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
