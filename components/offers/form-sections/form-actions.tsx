'use client';

import React from 'react';
import { Root as Button } from '@/components/ui/button';
// import { Loader2 } from 'lucide-react'; // Or your preferred spinner
import * as FancyButton from '@/components/ui/fancy-button';

interface FormActionsProps {
  isSubmitting: boolean;
  onCancel?: () => void; // Optional cancel handler
}

export function FormActions({ isSubmitting, onCancel }: FormActionsProps) {
  return (
    <div className='flex gap-2 w-full'>
      <Button
        type='button'
        disabled={isSubmitting}
        className='text-black w-1/2 rounded-md border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50'
        onClick={onCancel} // Add cancel handler if provided
      >
        Cancel
      </Button>
      <FancyButton.Root
        type='submit'
        disabled={isSubmitting}
        className='w-1/2 min-w-[100px] rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-700 disabled:bg-gray-400' // Added min-width
      >
        {isSubmitting ? (
          <>
            {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
            <span className='animate-pulse'>Sending...</span>
          </>
        ) : (
          'Continue'
        )}
      </FancyButton.Root>
    </div>
  );
}
