'use client';

import React from 'react';
import { RiDownloadLine, RiPlayLine } from '@remixicon/react';

// Define attachment type based on mock data
interface Attachment {
  name: string;
  type: string; // Could be more specific e.g., 'audio' | 'document' | 'image'
  size: string;
}

interface AttachmentsSectionProps {
  attachments: Attachment[];
}

const AttachmentsSection: React.FC<AttachmentsSectionProps> = ({
  attachments,
}) => {
  if (!attachments || attachments.length === 0) return null;

  // Currently only handles the first attachment as per original mock structure
  const attachment = attachments[0];

  return (
    <div className='border-b border-stroke-soft-200 p-6'>
      <h2 className='text-lg mb-4 font-semibold text-text-strong-950'>
        Attachments
      </h2>

      <div className='rounded-lg border border-stroke-soft-200 p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='bg-bg-subtle-100 flex size-10 items-center justify-center rounded-full'>
              {/* TODO: Icon based on attachment.type */}
              <RiPlayLine className='size-5 text-text-strong-950' />
            </div>
            <div>
              <span className='text-sm font-medium text-text-strong-950'>
                {attachment.name}
              </span>
              <span className='text-xs text-text-secondary-600 block'>
                {attachment.size}
              </span>
            </div>
          </div>
          <button className='text-icon-secondary-400 hover:text-icon-primary-500'>
            <RiDownloadLine className='size-5' />
          </button>
        </div>
      </div>
      {/* TODO: Map over all attachments if multiple are possible */}
    </div>
  );
};

export default AttachmentsSection;
