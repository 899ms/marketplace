'use client';

import React from 'react';
import { RiDownload2Line, RiFileTextLine } from '@remixicon/react';
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
    <div className='px-4 pt-4 pb-8'>
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
              className="flex items-center justify-between gap-4 rounded-lg border border-stroke-soft-200 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <RiFileTextLine className="size-5 text-gray-500 flex-shrink-0" />
                <span className="text-sm font-medium text-text-strong-950 truncate" title={attachment.name}>
                  {attachment.name}
                </span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs text-gray-500">
                  {formatFileSize(attachment.size)}
                </span>
                <RiDownload2Line className="size-5 text-gray-400 group-hover:text-gray-600" />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttachmentsSection;
