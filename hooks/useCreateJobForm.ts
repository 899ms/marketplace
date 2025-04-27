'use client';

import { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateJobFormSchema,
  CreateJobFormData,
} from '@/app/jobs/create/schema';
// import { createClient } from '@/utils/supabase/client'; // Uncomment when Supabase client setup is ready
// import { JobSchema } from '@/utils/supabase/types'; // Import if needed for mapping before insert

export interface UseCreateJobFormReturn {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  formMethods: UseFormReturn<CreateJobFormData>;
  onSubmit: (data: CreateJobFormData) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const STEPS_COUNT = 4; // Total number of steps

export function useCreateJobForm(): UseCreateJobFormReturn {
  const [activeStep, setActiveStep] = useState(1);
  // const supabase = createClient(); // Uncomment when Supabase client setup is ready

  const formMethods = useForm<CreateJobFormData>({
    resolver: zodResolver(CreateJobFormSchema),
    mode: 'onBlur', // Validate on blur
    // Explicitly define all defaults, including undefined for optional fields
    defaultValues: {
      title: '',
      description: '',
      budget: undefined,
      currency: 'USD', // Default from schema
      deadline: undefined, // Explicitly undefined for optional string
      negotiateBudget: false, // Default from schema
      requirements: '',
      usageOption: 'private', // Default from schema
      privacyOption: 'public', // Default from schema
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
    console.log('Form Data Submitted:', data);

    // --- TODO: Implement actual Supabase insert logic ---
    // 1. Map data to match Supabase 'jobs' table schema if necessary
    //    const jobToInsert = {
    //      title: data.title,
    //      description: data.description,
    //      requirements: data.requirements, // Ensure this matches your table structure
    //      budget: data.budget,
    //      // buyer_id: await getUserId(), // Get current user ID
    //      // status: 'open', // Default status
    //      // deadline: data.deadline ? new Date(data.deadline).toISOString() : null, // Convert if needed
    //    };
    //
    // 2. Perform the insert
    // try {
    //   const { error } = await supabase.from('jobs').insert(jobToInsert);
    //   if (error) {
    //     console.error('Error inserting job:', error);
    //     // Handle error (e.g., show notification to user)
    //   } else {
    //     console.log('Job created successfully!');
    //     // Handle success (e.g., redirect to job details page or dashboard)
    //   }
    // } catch (e) {
    //   console.error('Exception during job insert:', e);
    //   // Handle exception
    // }
  };

  return {
    activeStep,
    setActiveStep,
    formMethods,
    onSubmit,
    nextStep,
    prevStep,
  };
}

// Helper function to get fields for a specific step (if validation per step is needed)
// function getFieldsForStep(step: number): (keyof CreateJobFormData)[] {
//   switch (step) {
//     case 1: return ['title', 'description', 'budget', 'currency', 'deadline', 'negotiateBudget'];
//     case 2: return ['requirements']; // Adjust based on final schema
//     case 3: return ['usageOption', 'privacyOption'];
//     default: return [];
//   }
// }
