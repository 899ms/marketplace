'use client';

import React from 'react';
import { FormProvider } from 'react-hook-form';
import VerticalStepper from '@/components/jobs/create/VerticalStepper';
import CreateJobMainContent from '@/components/jobs/create/CreateJobMainContent';
import Step1BasicInfoForm from '@/components/jobs/create/Step1BasicInfoForm';
import Step2SkillsForm from '@/components/jobs/create/Step2SkillsForm';
import Step3UsageForm from '@/components/jobs/create/Step3UsageForm';
import Step4Preview from '@/components/jobs/create/Step4Preview';
import { useCreateJobForm } from '@/hooks/useCreateJobForm';

export default function CreateJobPage() {
  const {
    activeStep,
    setActiveStep,
    formMethods,
    onSubmit,
    nextStep,
    prevStep,
  } = useCreateJobForm();

  // Define steps configuration using extracted components
  const stepsConfig = [
    {
      title: 'Basic information',
      content: (
        <Step1BasicInfoForm formMethods={formMethods} nextStep={nextStep} />
      ),
    },
    {
      title: 'Skills & Requirements', // Updated title
      content: (
        <Step2SkillsForm
          formMethods={formMethods}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
    },
    {
      title: 'Usage & Privacy', // Updated title
      content: (
        <Step3UsageForm
          formMethods={formMethods}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ),
    },
    {
      title: 'Preview & Post', // Updated title
      content: (
        <Step4Preview
          formMethods={formMethods}
          prevStep={prevStep}
          submitForm={onSubmit} // Pass the onSubmit from the hook
        />
      ),
    },
  ];

  const stepLabels = stepsConfig.map((s) => s.title);

  return (
    // Wrap with FormProvider to pass formMethods down implicitly if needed,
    // or continue passing explicitly as done here.
    <FormProvider {...formMethods}>
      <div className='bg-bg-subtle-100 flex flex-1 gap-6 px-4 py-6 md:px-10'>
        <VerticalStepper
          currentStep={activeStep}
          steps={stepLabels}
          onStepClick={setActiveStep}
        />
        <CreateJobMainContent
          steps={stepsConfig}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </div>
    </FormProvider>
  );
}
