'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/utils/cn';

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  // isActive prop is removed for now, will be added later with router logic
  // isActive?: boolean;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  return (
    <Link
      href={href}
      className='text-text-primary-600 hover:bg-secondary-transparent-50 flex items-center gap-2 rounded-full px-4 py-2 text-paragraph-sm'
    >
      <Icon
        className={cn(
          'size-5',
          /* isActive ? 'text-icon-strong-950' : */ 'text-icon-secondary-400',
        )}
      />
      {label}
    </Link>
  );
};

export default SidebarLink;
