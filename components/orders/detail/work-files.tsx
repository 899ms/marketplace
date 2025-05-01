"use client";

import * as React from 'react';
import * as Accordion from "@/components/ui/accordion";
import * as Button from "@/components/ui/button";
import { RiArrowDownSLine } from '@remixicon/react';

interface WorkFile {
  id: string;
  name: string;
  size: string;
  date: string;
}

interface WorkFilesProps {
  files: WorkFile[];
  onDownload?: (fileId: string) => void;
}

export function WorkFiles({ files, onDownload }: WorkFilesProps) {
  return (
    <Accordion.Root type="single" collapsible className="w-full bg-white rounded-lg shadow-sm my-4 border border-stroke-soft-200">
      <Accordion.Item value="item-1" className="p-0 rounded-none ring-0 hover:bg-white data-[state=open]:bg-white">
        <Accordion.Header className="px-4 py-3 border-b border-stroke-soft-200">
          <Accordion.Trigger className="w-full text-lg font-semibold text-text-strong-950 p-0 m-0 flex justify-between items-center hover:no-underline">
            Work file
            <Accordion.Arrow openIcon={RiArrowDownSLine} closeIcon={RiArrowDownSLine} className="size-5 text-gray-500 transition-transform duration-200 group-data-[state=open]/accordion:rotate-180" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="pt-0 pb-4 px-4">
          <div className="space-y-4 mt-4">
            {files.map((file) => (
              <div key={file.id} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-text-strong-950">{file.name}</p>
                  <div className="flex gap-2 text-xs text-text-secondary-600 mt-1">
                    <span>{file.size}</span>
                    <span>{file.date}</span>
                  </div>
                </div>
                <Button.Root
                  variant="neutral"
                  mode="stroke"
                  size="small"
                  onClick={() => onDownload?.(file.id)}
                >
                  Download
                </Button.Root>
              </div>
            ))}
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
} 