'use client'; // Keep if state/effects are used, otherwise remove

import React from 'react';
import { RiCheckLine } from '@remixicon/react';
import { cn } from '@/utils/cn'; // Assuming utils path is correct

// --- Stepper Component ---
interface StepperProps {
  currentStep: number;
  steps: string[];
}

export function Stepper({ currentStep, steps }: StepperProps) {
  return (
    <div className='mb-8 flex items-center justify-center gap-4'>
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;

        return (
          <React.Fragment key={label}>
            <div className='flex items-center gap-2'>
              <div
                className={cn(
                  'flex size-6 items-center justify-center rounded-full text-label-sm font-medium',
                  isCompleted
                    ? 'bg-success-base text-static-white'
                    : 'text-text-secondary-600 bg-bg-weak-50',
                )}
              >
                {isCompleted ? <RiCheckLine className='size-4' /> : stepNumber}
              </div>
              <span
                className={cn(
                  'text-label-md',
                  isCompleted
                    ? 'text-text-strong-950'
                    : 'text-text-secondary-600',
                )}
              >
                {label}
              </span>
            </div>
            {stepNumber < steps.length && (
              <div className='h-px w-12 bg-stroke-soft-200'></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
