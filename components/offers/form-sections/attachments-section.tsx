'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Root as Label } from '@/components/ui/label';
// import { Root as Button } from '@/components/ui/button'; // If needed for delete
// import { RiDeleteBinLine } from '@remixicon/react'; // If needed for delete
import { SendOfferFormData } from '../schema';

// TODO: Implement actual file upload logic (state, handling, display)

type FormMethods = Omit<UseFormReturn<SendOfferFormData>, 'handleSubmit'>;

interface AttachmentsSectionProps {
  form: FormMethods;
}

export function AttachmentsSection({ form }: AttachmentsSectionProps) {
  const {
    register,
    formState: { errors },
  } = form;

  // Placeholder state/logic for file handling
  // const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => { ... };
  // const handleRemoveFile = (index: number) => { ... };

  return (
    <div className='rounded-md border p-4'>
      <Label htmlFor='attachments'>Attach file(s)</Label>
      <div className='mt-2 flex items-center justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5'>
        <div className='space-y-1 text-center'>
          <svg
            className='mx-auto h-12 w-12 text-gray-400'
            stroke='currentColor'
            fill='none'
            viewBox='0 0 48 48'
            aria-hidden='true'
          >
            <path
              d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <div className='text-sm flex justify-center text-gray-600'>
            <Label
              htmlFor='file-upload'
              className='text-indigo-600 hover:text-indigo-500 focus-within:ring-indigo-500 relative cursor-pointer rounded-md bg-white font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2'
            >
              <span>Upload a file</span>
              {/* Use register for form state, but onChange needed for actual file capture */}
              <input
                id='file-upload'
                // {...register('attachments')} // Registering file inputs directly is complex
                name='attachments' // Keep name for potential FormData submission
                type='file'
                className='sr-only'
                multiple
                // onChange={handleFileChange} // Add state update handler
              />
            </Label>
            <p className='pl-1'>or drag and drop</p>
          </div>
          <p className='text-xs text-gray-500'>
            PNG, JPG, PDF, etc. up to 10MB
          </p>
        </div>
      </div>
      {/* TODO: Display uploaded files with remove buttons */}
      {/* <div className="mt-4 space-y-2">
          {attachedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded-md bg-gray-50">
              <span className="text-sm">{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
              <Button type="button" variant="ghost" size="sm" className="text-red-500" onClick={() => handleRemoveFile(index)}>
                 <RiDeleteBinLine className="h-4 w-4"/>
              </Button>
            </div>
          ))}
       </div> */}
      {/* Display potential errors related to attachments if schema includes them */}
      {/* {errors.attachments && <p className="text-red-500 text-sm mt-1">{errors.attachments.message}</p>} */}
    </div>
  );
}
