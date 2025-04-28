'use client';

import { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateJobFormSchema,
  CreateJobFormData,
} from '@/app/jobs/create/schema';
import { useAuth } from '@/utils/supabase/AuthContext';
import supabase from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export interface UseCreateJobFormReturn {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  formMethods: UseFormReturn<CreateJobFormData>;
  onSubmit: (data: CreateJobFormData) => Promise<void>;
  nextStep: () => void;
  prevStep: () => void;
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
}

const STEPS_COUNT = 4; // Total number of steps

export function useCreateJobForm(): UseCreateJobFormReturn {
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const resolver = zodResolver(CreateJobFormSchema) as any;

  const formMethods = useForm<CreateJobFormData>({
    resolver,
    mode: 'onBlur',
    // Explicitly define all defaults matching schema structure
    defaultValues: {
      title: '',
      description: '',
      budget: 0, // Keep as 0 or potentially undefined if input handles NaN
      currency: 'USD', // Explicitly match schema default
      deadline: undefined, // Explicit optional
      negotiateBudget: false, // Explicitly match schema default
      requirements: '',
      usageOption: 'private', // Explicitly match schema default
      privacyOption: 'public', // Explicitly match schema default
    },
  });

  const nextStep = () => {
    // Optional: Trigger validation for the current step before proceeding
    // const fieldsToValidate = getFieldsForStep(activeStep);
    // formMethods.trigger(fieldsToValidate).then(isValid => {
    //   if (isValid) {
    //      setActiveStep((prev) => Math.min(prev + 1, STEPS_COUNT));
    //   }
    // });
    setActiveStep((prev) => Math.min(prev + 1, STEPS_COUNT));
  };

  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 1));

  const onSubmit = async (data: CreateJobFormData) => {
    if (!user) {
      setError('You must be logged in to create a job');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate data using Zod
      const validatedData = CreateJobFormSchema.parse(data);

      // Prepare job data for insertion
      const jobData = {
        buyer_id: user.id,
        title: validatedData.title,
        description: validatedData.description,
        budget: validatedData.budget,
        currency: validatedData.currency,
        deadline: validatedData.deadline || null,
        negotiate_budget: validatedData.negotiateBudget || false,
        requirements: validatedData.requirements,
        usage_option: validatedData.usageOption,
        privacy_option: validatedData.privacyOption,
        status: 'open', // Default status for new jobs
      };

      // Insert job into database
      const { error: supabaseError } = await supabase
        .from('jobs')
        .insert(jobData);

      if (supabaseError) {
        console.error('Error creating job:', supabaseError);
        setError(supabaseError.message);
        return;
      }

      // Set success and redirect after a short delay
      setSuccess(true);
      setTimeout(() => {
        router.push('/jobs');
        router.refresh(); // Refresh the page data
      }, 1000);
    } catch (err) {
      console.error('Job creation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create job');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    activeStep,
    setActiveStep,
    formMethods,
    onSubmit,
    nextStep,
    prevStep,
    isSubmitting,
    error,
    success,
  };
}
