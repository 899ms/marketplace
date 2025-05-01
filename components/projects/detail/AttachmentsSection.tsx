'use client';

import React from 'react';
import { RiPlayCircleFill } from '@remixicon/react';

// Define attachment type based on mock data
interface Attachment {
  name: string;
  type: string; // e.g. 'audio' | 'document' | 'image'
  size: string;
}

interface AttachmentsSectionProps {
  attachments: Attachment[];
}

const AttachmentsSection: React.FC<AttachmentsSectionProps> = ({
  attachments,
}) => {
  if (!attachments || attachments.length === 0) return null;

  // Currently only handles the first attachment
  const attachment = attachments[0];

  return (
    <div className="border-b border-stroke-soft-200 p-6">
      <h2
        className="
          text-base
          font-semibold
          leading-6
          tracking-[-0.015em]
          text-[#161922]
          mb-4
        "
      >
        Attachments
      </h2>

      <div className="inline-block rounded-xl border border-stroke-soft-200 p-4">
        <div className="flex items-center justify-between gap-6">
          {/* Attachment name & size */}
          <div>
            <span className="text-sm font-medium text-text-strong-950">
              {attachment.name}
            </span>
          </div>

          {/* Play icon on right */}
          <div className="bg-bg-subtle-100 flex size-10 items-center justify-center rounded-full">
            <RiPlayCircleFill className="size-7 text-text-strong-950" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttachmentsSection;
