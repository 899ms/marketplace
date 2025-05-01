"use client";

import * as React from 'react';
import * as Accordion from "@/components/ui/accordion";
import * as Button from "@/components/ui/button";
import { RiArrowDownSLine, RiUploadCloud2Line, RiCloseLine } from '@remixicon/react';
import { Root as FileUploadRoot } from "@/components/ui/file-upload";

type UserRole = 'buyer' | 'seller';

interface WorkFile {
  id: string;
  name: string;
  size: string;
  date: string;
}

interface WorkFilesProps {
  userRole: UserRole;
  files: WorkFile[];
  onDownload?: (fileId: string) => void;
  onUpload?: (files: File[]) => Promise<void>;
}

export function WorkFiles({
  userRole,
  files,
  onDownload,
  onUpload
}: WorkFilesProps) {
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputId = React.useId();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      console.log('Files selected:', newFiles);
      setUploadedFiles(prev => [...prev, ...newFiles]);
      event.target.value = '';
    } else {
      console.warn('No files found in event target');
    }
  };

  const handleUpload = async (filesToUpload: File[]) => {
    if (!onUpload || isUploading || filesToUpload.length === 0) return;

    setIsUploading(true);
    try {
      await onUpload(filesToUpload);
      setUploadedFiles([]);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Accordion.Root type="single" collapsible defaultValue="item-1" className="w-full bg-white rounded-lg shadow-sm my-4 border border-stroke-soft-200">
      <Accordion.Item value="item-1" className="p-0 rounded-none ring-0 hover:bg-white data-[state=open]:bg-white">
        <Accordion.Header className="px-4 py-3 border-b border-stroke-soft-200">
          <Accordion.Trigger className="w-full text-lg font-semibold text-text-strong-950 p-0 m-0 flex justify-between items-center hover:no-underline">
            Work Files
            <Accordion.Arrow openIcon={RiArrowDownSLine} closeIcon={RiArrowDownSLine} className="size-5 text-gray-500 transition-transform duration-200 group-data-[state=open]/accordion:rotate-180" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="pt-0 pb-4 px-4">
          {userRole === 'seller' && (
            <div className="mt-4 mb-6">
              <FileUploadRoot
                htmlFor={fileInputId}
                className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary-500"
              >
                <div className="flex flex-col items-center justify-center pointer-events-none">
                  <RiUploadCloud2Line className="size-10 text-gray-400 mb-2" />
                  <span className="text-sm font-medium text-text-strong-950">Choose a file or drag & drop it here.</span>
                  <p className="text-xs text-text-secondary-600 mt-1">JPEG, PNG, PDF, and MP4 formats, up to 50 MB.</p>
                </div>
              </FileUploadRoot>
              <input
                type="file"
                id={fileInputId}
                onChange={handleFileChange}
                multiple
                className="sr-only"
              />

              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-md bg-gray-50">
                      <span className="text-sm text-gray-700 truncate flex-1 mr-2">{file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                      <Button.Root variant="neutral" mode="ghost" size="small" type="button" onClick={() => handleRemoveFile(index)} className="p-1">
                        <Button.Icon as={RiCloseLine} className="size-4" />
                      </Button.Root>
                    </div>
                  ))}
                  <Button.Root
                    size="medium"
                    onClick={() => handleUpload(uploadedFiles)}
                    disabled={isUploading || uploadedFiles.length === 0}
                    className="w-full mt-2"
                  >
                    {isUploading ? 'Uploading...' : `Upload ${uploadedFiles.length} File(s)`}
                  </Button.Root>
                </div>
              )}
            </div>
          )}

          <div className="space-y-4 mt-4 border-t border-gray-100 pt-4">
            {files.length === 0 && userRole === 'buyer' && (
              <p className="text-sm text-gray-500 text-center py-4">No work files have been uploaded yet.</p>
            )}
            {files.length === 0 && userRole === 'seller' && !uploadedFiles.length && (
              <p className="text-sm text-gray-500 text-center py-4">Upload your work files using the section above.</p>
            )}
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