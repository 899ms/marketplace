'use client';

import React from 'react';
import { RiDownload2Line, RiPlayCircleFill } from '@remixicon/react';
import { BaseFileData } from '@/utils/supabase/types';

// Updated props to use BaseFileData which includes URL
interface AttachmentsSectionProps {
  attachments: BaseFileData[];
}

// Helper function to format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

const AttachmentsSection: React.FC<AttachmentsSectionProps> = ({
  attachments,
}) => {
  if (!attachments || attachments.length === 0) return null;

  return (
    <div className='pt-[24px]'>
      <h2 className="text-base font-semibold leading-6 tracking-[-0.015em] text-[#161922] mb-4">
        Attachments
      </h2>

      <ul className="space-y-3">
        {attachments.map((attachment, index) => (
          <li key={index}>
            <a
              href={attachment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl border border-stroke-soft-200 p-[14px] hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
            >
              <span className="text-[14px] pr-[16px] font-medium text-text-strong-950 truncate" title={attachment.name}>
                {attachment.name}
              </span>
              <RiPlayCircleFill className="size-6 text-gray-500 flex-shrink-0" />
            </a>
          </li>
        ))}
      </ul>

      <div className="h-[1.5px] bg-stroke-soft-200 mx-auto mt-[24px]" />
    </div>
  );
};

export default AttachmentsSection;
