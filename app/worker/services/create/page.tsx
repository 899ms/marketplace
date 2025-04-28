'use client';

import React from 'react';
import { FormProvider } from 'react-hook-form';

import { Step1BasicInfo } from '@/components/worker/create-service-step-1';
import { Step2Pricing } from '@/components/worker/create-service-step-2';
import { Step3Review } from '@/components/worker/create-service-step-3';
import { useCreateServiceForm } from '@/hooks/useCreateServiceForm';
import { Stepper } from '@/components/worker/stepper';

export default function CreateServicePage() {
  const {
    activeStep,
    formMethods,
    onSubmit,
    nextStep,
    prevStep,
    isSubmitting,
  } = useCreateServiceForm();

  const steps = ['Basic Info', 'Pricing & Details', 'Review'];

  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return <Step1BasicInfo formMethods={formMethods} nextStep={nextStep} />;
      case 2:
        return (
          <Step2Pricing
            formMethods={formMethods}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <Step3Review
            formMethods={formMethods}
            prevStep={prevStep}
            submitForm={formMethods.handleSubmit(onSubmit)}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className='px-4 py-10 md:px-10'>
      <div className='mx-auto mb-8 max-w-3xl'>
        <Stepper currentStep={activeStep} steps={steps} />
      </div>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          {renderStep()}
        </form>
      </FormProvider>
    </div>
  );
}
