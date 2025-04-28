'use client';

import React, { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import VerticalStepper from '@/components/jobs/create/VerticalStepper';
import CreateJobMainContent from '@/components/jobs/create/CreateJobMainContent';
import Step1BasicInfoForm from '@/components/jobs/create/Step1BasicInfoForm';
import Step2SkillsForm from '@/components/jobs/create/Step2SkillsForm';
import Step3UsageForm from '@/components/jobs/create/Step3UsageForm';
import Step4Preview from '@/components/jobs/create/Step4Preview';
import { useCreateJobForm } from '@/hooks/useCreateJobForm';
import { useAuth } from '@/utils/supabase/AuthContext';
import supabase from '@/utils/supabase/client';
import { Session } from '@supabase/supabase-js';
import * as AlertUI from '@/components/ui/alert';
import { RiErrorWarningLine, RiCheckboxCircleLine } from '@remixicon/react';

// Debug component to show auth status
const AuthDebug = () => {
  const { user } = useAuth();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      console.log('Client session:', data.session);
    };

    checkSession();
  }, []);

  if (!user) {
    return (
      <div className='mb-4 rounded bg-red-100 p-2 text-red-700'>
        <h4 className='font-bold'>Auth Debug: Not logged in</h4>
        <p>Please log in to create a job.</p>
      </div>
    );
  }

  return (
    <div className='mb-4 rounded bg-green-100 p-2 text-green-700'>
      <h4 className='font-bold'>Auth Debug: Logged in</h4>
      <p>User ID: {user.id}</p>
      <p>Email: {user.email}</p>
      <p>Session active: {session ? 'Yes' : 'No'}</p>
    </div>
  );
};

// Alert component for form submission status
const FormAlert = ({
  error,
  success,
}: {
  error: string | null;
  success: boolean;
}) => {
  if (error) {
    return (
      <AlertUI.Root
        className='mb-4'
        status='error'
        variant='lighter'
        size='small'
      >
        <AlertUI.Icon as={RiErrorWarningLine} />
        <div className='flex flex-col space-y-1'>
          <h5 className='font-medium'>Error</h5>
          <p className='text-paragraph-xs'>{error}</p>
        </div>
      </AlertUI.Root>
    );
  }

  if (success) {
    return (
      <AlertUI.Root
        className='mb-4'
        status='success'
        variant='lighter'
        size='small'
      >
        <AlertUI.Icon as={RiCheckboxCircleLine} />
        <div className='flex flex-col space-y-1'>
          <h5 className='font-medium'>Success</h5>
          <p className='text-paragraph-xs'>
            Your job has been created successfully!
          </p>
        </div>
      </AlertUI.Root>
    );
  }

  return null;
};

export default function CreateJobPage() {
  const {
    activeStep,
    setActiveStep,
    formMethods,
    onSubmit,
    nextStep,
    prevStep,
    isSubmitting,
    error,
    success,
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
          submitForm={onSubmit}
          isSubmitting={isSubmitting}
          error={error}
          success={success}
        />
      ),
    },
  ];

  const stepLabels = stepsConfig.map((s) => s.title);

  return (
    // Wrap with FormProvider to pass formMethods down implicitly if needed,
    // or continue passing explicitly as done here.
    <FormProvider {...formMethods}>
      {/* Add the Auth Debug component */}
      <AuthDebug />

      {/* Display form alerts at the top level */}
      <FormAlert error={error} success={success} />

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
