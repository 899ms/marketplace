'use client';

import React from 'react';
import * as Accordion from '@/components/ui/accordion';
import { RiArrowDownSLine } from '@remixicon/react';

// --- Main Content Component ---
interface CreateJobMainContentProps {
  steps: { title: string; content?: React.ReactNode }[];
  activeStep: number;
  setActiveStep: (step: number) => void;
}

const CreateJobMainContent = ({
  steps,
  activeStep,
  setActiveStep,
}: CreateJobMainContentProps) => {
  const activeValue = `item-${activeStep}`;

  // Allow programmatic control via activeStep, but also allow user interaction
  const handleValueChange = (value: string) => {
    if (value) {
      // Only update if an item is opened
      const stepNum = parseInt(value.split('-')[1]);
      setActiveStep(stepNum);
    }
  };

  return (
    <main className='mx-auto flex-1 px-4 py-6 md:px-10'>
      {' '}
      {/* Added flex-1 */}
      <h1 className='text-3xl mb-2 font-semibold text-text-strong-950'>
        Create job
      </h1>
      <p className='text-text-secondary-600 mb-8'>
        Define details, set the budget and outline preferences
      </p>
      <Accordion.Root
        type='single'
        collapsible
        className='w-full max-w-2xl space-y-3'
        value={activeValue} // Control expansion based on activeStep
        onValueChange={handleValueChange} // Update activeStep when accordion changes
      >
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          return (
            <Accordion.Item
              value={`item-${stepNumber}`}
              key={stepNumber}
              className='shadow-sm overflow-hidden rounded-xl border border-stroke-soft-200 bg-bg-white-0 data-[state=open]:border-stroke-strong-950'
            >
              <Accordion.Trigger className='group/trigger flex w-full items-center justify-between p-4 text-left hover:bg-bg-weak-50'>
                {' '}
                {/* Added group */}
                <div className='flex items-center gap-3'>
                  <div className='text-text-secondary-600 flex size-6 items-center justify-center rounded-full bg-bg-soft-200 text-label-xs font-medium'>
                    {String(stepNumber).padStart(2, '0')}
                  </div>
                  <span className='text-label-md font-medium text-text-strong-950'>
                    {step.title}
                  </span>
                </div>
                <RiArrowDownSLine className='text-text-secondary-600 size-5 transition-transform duration-200 group-data-[state=open]/trigger:rotate-180' />{' '}
                {/* Use group state */}
              </Accordion.Trigger>
              <Accordion.Content className='border-t border-stroke-soft-200 p-6'>
                {step.content || <p>Content for {step.title} goes here...</p>}
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </main>
  );
};

export default CreateJobMainContent;
