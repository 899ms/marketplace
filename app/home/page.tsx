'use client'; // Keep use client as it renders client components

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MainContent from '@/components/home/MainContent';

// Removed imports: Link, Avatar, Divider, LinkButton, Badge, Tabs, RemixIcons, cn
// Removed component definitions: SidebarLink, Sidebar, Banner, SectionHeader, ServiceCard, WorkerCard, MainContent
// Removed data: user, dummyBanners, tabItems
// Removed interfaces: SidebarLinkProps, SectionHeaderProps

// Buyer Dashboard Homepage
export default function HomePage() {
  return (
    <div className='flex flex-1 gap-6 px-6 pt-6'>
      <Sidebar />
      <MainContent />
    </div>
  );
}
