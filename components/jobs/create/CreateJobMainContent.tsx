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
    <main className='mx-auto flex-1 px-4 py-6 md:px-10 flex flex-col items-center'>
      {' '}
      {/* Added flex-1 */}
      <h1 className='text-[32px] mb-1 font-semibold text-[#0A0D14]'>
        Create job
      </h1>
      <p className='text-[#525866] text-[18px] mb-8'>
        Define details, set the budget
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
              className='shadow-sm overflow-hidden rounded-3xl border !bg-white !border-[#E1E4EA] !px-0'
            >
              <Accordion.Trigger className='!p-4 !mx-0 group/trigger flex w-full items-center justify-between p-4 text-left hover:bg-bg-weak-50 w-full'>
                {' '}
                {/* Added group */}
                <div className='flex items-center gap-3'>
                  <div className='flex size-10 items-center justify-center rounded-full bg-white text-[#0E121B] text-[14px] font-medium border border-[border-[#E1E4EA]'>
                    {String(stepNumber).padStart(2, '0')}
                  </div>
                  <span className='text-[14px] font-medium text-[#0E121B]'>
                    {step.title}
                  </span>
                </div>
                <div className='flex items-center justify-center size-6 rounded-md border border-[#E1E4EA]'>
                  <RiArrowDownSLine className='text-[#525866] size-5 transition-transform duration-200 group-data-[state=open]/trigger:rotate-180' />{' '}
                </div>
                {/* Use group state */}
              </Accordion.Trigger>
              <Accordion.Content className='py-4 mt-2 border-t border-[#E1E4EA] '>
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
