'use client';

import React from 'react';
import { WorkerSidebar } from '../../../components/worker/worker-sidebar';
import { WorkerMainContent } from '../../../components/worker/worker-main-content';
import { WorkerRightSidebar } from '../../../components/worker/worker-right-sidebar';

// --- Worker Dashboard Homepage ---
export default function WorkerHomePage() {
  return (
    <div className='bg-bg-subtle-0 flex gap-6 p-6'>
      <WorkerSidebar />
      <WorkerMainContent />
      <WorkerRightSidebar />
    </div>
  );
}
