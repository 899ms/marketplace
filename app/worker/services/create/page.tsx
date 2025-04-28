'use client';

import React, { useState } from 'react';
import { Stepper } from '@/components/worker/stepper';
import { Step1BasicInfo } from '@/components/worker/create-service-step-1';
import { Step2Pricing } from '@/components/worker/create-service-step-2';
import { Step3Review } from '@/components/worker/create-service-step-3';

// --- Main Page Component ---
export default function CreateServicePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ['Basic Info', 'Pricing', 'Review'];

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const submitForm = () => {
    console.log('Form Submitted!');
    // TODO: Add actual form submission logic
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo nextStep={nextStep} />;
      case 2:
        return <Step2Pricing nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step3Review prevStep={prevStep} submitForm={submitForm} />;
      default:
        return null;
    }
  };

  return (
    <div className='bg-bg-subtle-0 min-h-screen p-6'>
      <Stepper currentStep={currentStep} steps={steps} />
      {renderStep()}
    </div>
  );
}
