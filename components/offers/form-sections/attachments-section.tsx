'use client';

import React, { useState, useEffect } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { Root as Label } from '@/components/ui/label';
import * as Button from '@/components/ui/button';
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

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';
interface ManagedAttachment {
  localId: string;
  file: File;
  name: string;
  size: number;
  status: UploadStatus;
  errorMessage?: string;
  uploadedUrl?: string;
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

  // 1) Sync pre-existing attachments into managedFiles on mount / when fields change
  useEffect(() => {
    const existing = fields.map((f, i) => ({
      localId: `pre-${i}`,
      name: f.name,
      size: f.size,
      status: 'success' as const,
      uploadedUrl: f.url,
      file: new File([], f.name), // dummy File just to satisfy type
    }));
    setManagedFiles(existing);
  }, [fields]);

  // 2) Notify parent when uploads are in flight
  useEffect(() => {
    const currentlyUploading = managedFiles.some(
      (file) => file.status === 'uploading' || file.status === 'idle',
    );
    setIsUploadingFiles(currentlyUploading);
  }, [managedFiles, setIsUploadingFiles]);

  // ... rest of uploadFile, updateManagedFileStatus, handlers unchanged ...

  const uploadFile = async (attachment: ManagedAttachment): Promise<void> => {
    if (!user) {
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
      if (!urlData?.publicUrl) throw new Error('Failed to get public URL');

      updateManagedFileStatus(
        attachment.localId,
        'success',
        undefined,
        urlData.publicUrl,
      );

      const finalData: BaseFileData = {
        name: attachment.name,
        size: attachment.size,
        url: urlData.publicUrl,
      };
      append(finalData);
    } catch (err: any) {
      updateManagedFileStatus(
        attachment.localId,
        'error',
        err.message || 'Upload failed',
      );
    }
  };

  const updateManagedFileStatus = (
    localId: string,
    status: UploadStatus,
    errorMessage?: string,
    uploadedUrl?: string,
  ) => {
    setManagedFiles((current) =>
      current.map((f) =>
        f.localId === localId ? { ...f, status, errorMessage, uploadedUrl } : f,
      ),
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const toUpload = Array.from(e.target.files).map((file) => ({
        localId: crypto.randomUUID(),
        file,
        name: file.name,
        size: file.size,
        status: 'idle' as const,
      }));
      setManagedFiles((m) => [...m, ...toUpload]);
      toUpload.forEach(uploadFile);
      e.target.value = '';
    }
  };

  const handleRemoveFile = (localId: string) => {
    const f = managedFiles.find((f) => f.localId === localId);
    if (f?.uploadedUrl) {
      const idx = fields.findIndex((fld) => fld.url === f.uploadedUrl);
      if (idx !== -1) remove(idx);
    }
    setManagedFiles((m) => m.filter((f) => f.localId !== localId));
  };

  const renderUploadStatusIcon = (status: UploadStatus) => {
    switch (status) {
      case 'uploading':
        return <RiLoader4Line className="animate-spin" />;
      case 'success':
        return <RiCheckLine />;
      case 'error':
        return <RiErrorWarningLine />;
      default:
        return <RiUploadCloud2Line />;
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full items-start">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
        {managedFiles.length > 0 ? (
          managedFiles.map((file) => (
            <div
              key={file.localId}
              className="flex items-center justify-between rounded-md border p-2"
            >
              <div className="flex gap-2 items-center">
                {renderUploadStatusIcon(file.status)}
                <div className="flex flex-col">
                  {/* ← file name as clickable link */}
                  {file.uploadedUrl ? (
                    <a
                      href={file.uploadedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      {file.name}
                    </a>
                  ) : (
                    <span className="text-gray-700">{file.name}</span>
                  )}
                  <span className="text-sm text-gray-500">
                    {formatBytes(file.size)}
                  </span>
                </div>
              </div>
              <RiDeleteBinLine
                className="cursor-pointer"
                onClick={() => handleRemoveFile(file.localId)}
              />
            </div>
          ))
        ) : (
          <div className="text-gray-500">No files attached</div>
        )}
      </div>
      <Label htmlFor="contract-file-upload" className="cursor-pointer">
        <span className="px-2 py-1 border rounded">Attach File</span>
        <input
          id="contract-file-upload"
          type="file"
          className="sr-only"
          multiple
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        />
      </Label>
    </div>
  );
}
