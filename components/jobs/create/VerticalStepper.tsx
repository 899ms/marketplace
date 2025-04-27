'use client';

import React from 'react';
import * as Button from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { RiArrowRightSLine, RiCustomerService2Line } from '@remixicon/react';

// --- Vertical Stepper Component ---
interface VerticalStepperProps {
  currentStep: number;
  steps: string[];
  onStepClick: (step: number) => void;
}

const VerticalStepper = ({
  currentStep,
  steps,
  onStepClick,
}: VerticalStepperProps) => {
  return (
    <aside className='shadow-sm sticky top-20 hidden h-[calc(100vh-10rem)] w-64 shrink-0 flex-col justify-between rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-4 lg:flex xl:w-72'>
      <div>
        <p className='text-xs text-text-secondary-600 mb-4 font-semibold uppercase'>
          TRANSFER SEQUENCE
        </p>
        <nav>
          <ul className='flex flex-col gap-1'>
            {steps.map((label, index) => {
              const stepNumber = index + 1;
              return (
                <li key={label}>
                  <button
                    onClick={() => onStepClick(stepNumber)}
                    className={cn(
                      'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-label-md transition-colors duration-200',
                      stepNumber === currentStep
                        ? 'bg-bg-weak-50 font-medium text-text-strong-950'
                        : 'text-text-secondary-600 hover:bg-bg-weak-50 hover:text-text-strong-950',
                    )}
                  >
                    <div className='flex items-center gap-3'>
                      <div
                        className={cn(
                          'flex size-5 items-center justify-center rounded-full text-label-xs font-medium',
                          stepNumber === currentStep
                            ? 'bg-primary-base text-static-white'
                            : 'text-text-secondary-600 bg-bg-soft-200',
                        )}
                      >
                        {String(stepNumber).padStart(2, '0')}
                      </div>
                      {label}
                    </div>
                    {stepNumber === currentStep && (
                      <RiArrowRightSLine className='text-text-secondary-600 size-4' />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      {/* Contact Button */}
      <div className='mt-auto border-t border-stroke-soft-200 pt-4'>
        <p className='text-sm text-text-secondary-600 mb-2 text-center'>
          Having trouble with transfer?
        </p>
        <Button.Root variant='neutral' mode='stroke' className='w-full'>
          <Button.Icon as={RiCustomerService2Line} />
          Contact
        </Button.Root>
      </div>
    </aside>
  );
};

export default VerticalStepper;
