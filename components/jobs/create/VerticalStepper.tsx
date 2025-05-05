'use client';

import React from 'react';
import * as Button from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { RiArrowRightSLine, RiCustomerService2Line, RiHeadphoneLine } from '@remixicon/react';

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
    <aside className='pt-6 shadow-sm sticky top-20 hidden h-[calc(100vh-10rem)] w-64 shrink-0 flex-col justify-between rounded-xl bg-[#F5F7FA] p-4 lg:flex xl:w-72 max-w-[264px]'>
      <div className=''>
        <p className='text-[16px] text-[#99A0AE] mb-4 font-medium'>
          Transfer Sequence
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
                        ? 'bg-white font-medium text-[#0E121B] text-[14px]'
                        : 'font-medium text-[#525866] text-[14px]',
                    )}
                  >
                    <div className='flex items-center gap-3'>
                      <div
                        className={cn(
                          'flex size-6 items-center justify-center rounded-full text-label-xs font-medium',
                          stepNumber === currentStep
                            ? 'text-[12px] text-white bg-[#525866]'
                            : 'text-[12px] text-[#525866] bg-white',
                        )}
                      >
                        {String(stepNumber)}
                      </div>
                      {label}
                    </div>
                    {stepNumber === currentStep && (
                      <RiArrowRightSLine className='text-[#525866] size-5' />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      {/* Contact Button */}
      <div className='mt-auto pt-4'>
        <p className='text-[14px] text-[#525866] mb-4 text-center'>
          Having trouble with transfer?
        </p>
        <Button.Root variant='neutral' mode='stroke' className='w-full font-medium'>
          <Button.Icon as={RiHeadphoneLine} />
          Contact
        </Button.Root>
      </div>
    </aside>
  );
};

export default VerticalStepper;
