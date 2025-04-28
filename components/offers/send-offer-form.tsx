'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SendOfferSchema, SendOfferFormData } from './schema';

// Import section components
import { JobDetailsSection } from './form-sections/job-details-section';
import { ContractTermsSection } from './form-sections/contract-terms-section';
import { AttachmentsSection } from './form-sections/attachments-section';
import { AgreementSection } from './form-sections/agreement-section';
import { FormActions } from './form-sections/form-actions';

interface SendOfferFormProps {
  offerId: string;
  // Add other props like default values, user details etc. if necessary
}

export function SendOfferForm({ offerId }: SendOfferFormProps) {
  // Keep paymentType state here as it controls conditional rendering in ContractTermsSection
  const [paymentType, setPaymentType] = useState<'one-time' | 'installment'>(
    'one-time',
  );

  // Initialize useForm hook
  const form = useForm<SendOfferFormData>({
    resolver: zodResolver(SendOfferSchema),
    defaultValues: {
      // Ensure default values match schema expectations
      paymentType: 'one-time',
      agreeToTerms: false,
      skillLevels: [], // Default to empty array
      currency: 'CNY', // Default currency for one-time
      milestones: [], // Default to empty array for installment
      amount: undefined, // Explicitly undefined
      deadline: undefined,
      // Initialize other fields as needed
      sendTo: '',
      selectOrder: '',
      contractTitle: '',
      description: '',
    },
    mode: 'onBlur', // Optional: trigger validation on blur
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: SendOfferFormData) => {
    console.log('Form Data:', data);
    // Replace with your actual API submission logic
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Form submitted successfully');
    // Add post-submission logic (e.g., redirect, show success message)
  };

  // Optional: Handle Cancel action
  const handleCancel = () => {
    console.log('Form cancelled');
    // Add navigation logic if needed
    // e.g., router.back();
  };

  return (
    // Pass the whole form object down, sections can destructure what they need
    // Pass paymentType state and setter to ContractTermsSection
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
      <JobDetailsSection form={form} />

      <ContractTermsSection
        form={form}
        paymentType={paymentType}
        setPaymentType={setPaymentType}
      />

      <AttachmentsSection form={form} />

      <AgreementSection form={form} />

      <FormActions isSubmitting={isSubmitting} onCancel={handleCancel} />
    </form>
  );
}
