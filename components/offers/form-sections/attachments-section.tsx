'use client';

import React, { useState, useEffect } from 'react';
import { UseFormReturn, useFieldArray, Control } from 'react-hook-form';
import { Root as Label } from '@/components/ui/label';
import { Root as Button } from '@/components/ui/button';
import {
  RiDeleteBinLine,
  RiUploadCloud2Line,
  RiErrorWarningLine,
  RiCheckLine,
  RiLoader4Line,
} from '@remixicon/react';
import { SendOfferFormData } from '../schema';
import type { BaseFileData } from '@/utils/supabase/types';
import { cn } from '@/utils/cn';
import supabase from '@/utils/supabase/client';
import { useAuth } from '@/utils/supabase/AuthContext';

function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Type for internal state management
type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';
interface ManagedAttachment {
  localId: string; // Unique local identifier
  file: File;
  name: string;
  size: number;
  status: UploadStatus;
  errorMessage?: string;
  uploadedUrl?: string; // Store the URL once uploaded
}

type FormMethods = Omit<UseFormReturn<SendOfferFormData>, 'handleSubmit'>;

interface AttachmentsSectionProps {
  form: Pick<
    FormMethods,
    'control' | 'register' | 'formState' | 'setValue' | 'getValues'
  >;
  setIsUploadingFiles: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AttachmentsSection({
  form,
  setIsUploadingFiles,
}: AttachmentsSectionProps) {
  const {
    control,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = form;
  const { user } = useAuth();

  // useFieldArray for the final data that matches the schema ({ name, size, url })
  const { fields, append, remove } = useFieldArray<
    SendOfferFormData,
    'attachments',
    'id'
  >({
    control,
    name: 'attachments',
  });

  // --- Internal State for UI and Upload Management ---
  const [managedFiles, setManagedFiles] = useState<ManagedAttachment[]>([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Add useEffect to monitor managedFiles and update parent state
  useEffect(() => {
    const currentlyUploading = managedFiles.some(
      (file) => file.status === 'uploading' || file.status === 'idle',
    );
    setIsUploadingFiles(currentlyUploading);
  }, [managedFiles, setIsUploadingFiles]);

  // Function to handle actual file upload
  const uploadFile = async (attachment: ManagedAttachment): Promise<void> => {
    if (!user) {
      console.error('Upload Error: User not logged in');
      updateManagedFileStatus(
        attachment.localId,
        'error',
        'User not logged in',
      );
      return;
    }

    updateManagedFileStatus(attachment.localId, 'uploading');

    try {
      const fileExt = attachment.file.name.split('.').pop();
      const uniqueFileName = `${user.id}/${attachment.localId}.${fileExt}`;
      const bucketName = 'contract-attachments';

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(uniqueFileName, attachment.file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(uniqueFileName);

      if (!urlData?.publicUrl) {
        throw new Error('Failed to get public URL after upload.');
      }

      // 1. Update internal state
      updateManagedFileStatus(
        attachment.localId,
        'success',
        undefined,
        urlData.publicUrl,
      );

      // 2. Append the valid data to the actual form state (useFieldArray)
      const finalData: BaseFileData = {
        name: attachment.name,
        size: attachment.size,
        url: urlData.publicUrl,
      };
      append(finalData); // Append the schema-compliant object
    } catch (err: any) {
      console.error(`File upload failed for ${attachment.name}:`, err);
      updateManagedFileStatus(
        attachment.localId,
        'error',
        err.message || 'Upload failed',
      );
    }
  };

  // Helper to update the status of a file in the internal state
  const updateManagedFileStatus = (
    localId: string,
    status: UploadStatus,
    errorMessage?: string,
    uploadedUrl?: string,
  ) => {
    setManagedFiles((currentFiles) =>
      currentFiles.map((f) =>
        f.localId === localId ? { ...f, status, errorMessage, uploadedUrl } : f,
      ),
    );
  };

  // --- Event Handlers ---
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      processAndUploadFiles(Array.from(event.target.files));
      event.target.value = '';
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
    if (event.dataTransfer.files?.length) {
      processAndUploadFiles(Array.from(event.dataTransfer.files));
      event.dataTransfer.clearData();
    }
  };

  // Process files, add to local state, and trigger upload
  const processAndUploadFiles = (files: File[]) => {
    const newManagedFiles: ManagedAttachment[] = [];
    const filesToUpload: ManagedAttachment[] = [];

    files.forEach((file) => {
      // Basic filtering (can be enhanced)
      const acceptedTypes = ['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg'];
      const maxFileSize = 10 * 1024 * 1024; // 10MB
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

      if (!acceptedTypes.includes(fileExtension) || file.size > maxFileSize) {
        console.warn(`File rejected (type/size): ${file.name}`);
        // TODO: Show user feedback for rejected files
        return; // Skip this file
      }

      const localId = crypto.randomUUID(); // Generate unique ID for local tracking
      const newAttachment: ManagedAttachment = {
        localId,
        file,
        name: file.name,
        size: file.size,
        status: 'idle',
      };
      newManagedFiles.push(newAttachment);
      filesToUpload.push(newAttachment);
    });

    if (newManagedFiles.length > 0) {
      setManagedFiles((prev) => [...prev, ...newManagedFiles]);
      // Trigger uploads after state update
      filesToUpload.forEach((fileToUpload) => uploadFile(fileToUpload));
    }
  };

  // Handle Removal
  const handleRemoveFile = (localId: string) => {
    const fileToRemove = managedFiles.find((f) => f.localId === localId);
    if (!fileToRemove) return;

    // 1. Find corresponding entry in the form state (fields) if it was successfully uploaded
    if (fileToRemove.uploadedUrl) {
      const fieldIndex = fields.findIndex(
        (field) => field.url === fileToRemove.uploadedUrl,
      );
      if (fieldIndex !== -1) {
        remove(fieldIndex); // Remove from react-hook-form state
      }
      // TODO: Optional - Add call to delete from Supabase storage
      // supabase.storage.from('contract-attachments').remove([`${user.id}/${localId}.${fileExt}`]);
    }

    // 2. Remove from local managed state
    setManagedFiles((current) => current.filter((f) => f.localId !== localId));
  };

  const renderUploadStatusIcon = (status: UploadStatus | undefined) => {
    switch (status) {
      case 'uploading':
        return <RiLoader4Line className='h-4 w-4 animate-spin text-blue-500' />;
      case 'success':
        return <RiCheckLine className='h-4 w-4 text-green-500' />;
      case 'error':
        return <RiErrorWarningLine className='h-4 w-4 text-red-500' />;
      default:
        return <div className='h-4 w-4' />; // Placeholder for idle
    }
  };

  return (
    <div className='rounded-md border border-stroke-soft-200 p-4'>
      <Label>Attach file(s)</Label>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'mt-2 flex flex-col items-center justify-center rounded-md border-2 border-dashed border-stroke-soft-200 px-6 py-10 transition-colors',
          isDraggingOver ? 'border-indigo-500 bg-indigo-50' : '',
        )}
      >
        <RiUploadCloud2Line
          className={cn(
            'h-12 w-12 transition-colors',
            isDraggingOver ? 'text-indigo-600' : 'text-text-placeholder-400',
          )}
          aria-hidden='true'
        />
        <div className='text-sm text-text-secondary-600 mt-4 text-center'>
          <Label
            htmlFor='contract-file-upload'
            className='text-indigo-600 hover:text-indigo-500 focus-within:ring-indigo-500 relative cursor-pointer rounded-md bg-transparent font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2'
          >
            <span>Click to upload</span>
            <input
              id='contract-file-upload'
              name='contract-file-upload-input'
              type='file'
              className='sr-only'
              multiple
              onChange={handleFileChange}
              accept='.pdf,.doc,.docx,.png,.jpg,.jpeg'
            />
          </Label>
          <p className='inline pl-1'>or drag and drop</p>
        </div>
        <p className='text-xs text-text-tertiary-500 mt-1'>
          Max 10MB per file. PDF, DOCX, PNG, JPG supported.
        </p>
      </div>

      {managedFiles.length > 0 && (
        <div className='mt-4 space-y-2'>
          <p className='text-sm text-text-primary-900 font-medium'>
            Attached files:
          </p>
          {managedFiles.map((item) => (
            <div
              key={item.localId}
              className={cn(
                'bg-bg-surface-0 flex items-center justify-between rounded border p-2',
                item.status === 'error'
                  ? 'border-red-300'
                  : 'border-stroke-soft-200',
              )}
            >
              <div className='flex items-center space-x-2'>
                <div className='h-4 w-4 flex-shrink-0'>
                  {renderUploadStatusIcon(item.status)}
                </div>
                <div className='flex flex-col'>
                  <span
                    className='text-sm text-text-primary-900 truncate font-medium'
                    title={item.name}
                  >
                    {item.name ?? 'Unnamed file'}
                  </span>
                  <span className='text-xs text-text-tertiary-500'>
                    {formatBytes(item.size ?? 0)}
                    {item.status === 'error' && item.errorMessage && (
                      <span className='ml-2 text-red-600'>
                        {' '}
                        - Error: {item.errorMessage}
                      </span>
                    )}
                  </span>
                </div>
              </div>
              <Button
                type='button'
                variant='neutral'
                size='small'
                className='text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50'
                onClick={() => handleRemoveFile(item.localId)}
                aria-label={`Remove ${item.name}`}
                disabled={item.status === 'uploading'}
              >
                <RiDeleteBinLine className='h-4 w-4' />
              </Button>
            </div>
          ))}
        </div>
      )}

      {errors.attachments?.root && (
        <p className='text-sm mt-1 text-red-500'>
          {errors.attachments.root.message}
        </p>
      )}
    </div>
  );
}
