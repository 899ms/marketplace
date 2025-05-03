'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/utils/cn';

interface SidebarLinkProps {
  href?: string;
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

const SidebarLink = ({ href, icon: Icon, label, onClick }: SidebarLinkProps) => {
  const commonClasses = 'text-text-primary-600 hover:bg-gray-100 hover:text-text-strong-950 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-paragraph-sm text-left transition-colors duration-150';

  const content = (
    <>
      <Icon
        className={cn(
          'size-5',
          'text-icon-secondary-400',
        )}
      />
      {label}
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={commonClasses}>
        {content}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className={commonClasses}>
        {content}
      </Link>
    );
  }

  return null;
};

export default SidebarLink;
