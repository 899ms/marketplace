'use client';

import { useState, useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/supabase/AuthContext';
import supabase from '@/utils/supabase/client';
import { SendOfferSchema, SendOfferFormData } from '@/components/offers/schema';
import { User, Job, BaseFileData } from '@/utils/supabase/types';
import { chatOperations } from '@/utils/supabase/database';

export interface UseSendOfferFormReturn {
  formMethods: UseFormReturn<SendOfferFormData>;
  onSubmit: (data: SendOfferFormData) => Promise<void>;
  isSubmitting: boolean;
  isLoadingSellers: boolean;
  isLoadingJobs: boolean;
  error: string | null;
  success: boolean;
  sellers: Pick<User, 'id' | 'username' | 'full_name'>[];
  jobs: Pick<Job, 'id' | 'title'>[];
  isUploadingFiles: boolean;
  setIsUploadingFiles: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useSendOfferForm(): UseSendOfferFormReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingFiles, setIsUploadingFiles] = useState(false);
  const [isLoadingSellers, setIsLoadingSellers] = useState(false);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [sellers, setSellers] = useState<
    Pick<User, 'id' | 'username' | 'full_name'>[]
  >([]);
  const [jobs, setJobs] = useState<Pick<Job, 'id' | 'title'>[]>([]);

  const { user } = useAuth();
  const router = useRouter();

  const formMethods = useForm<SendOfferFormData>({
    resolver: zodResolver(SendOfferSchema),
    mode: 'onBlur',
    defaultValues: {
      sendTo: '',
      skillLevels: [],
      selectOrder: '',
      contractTitle: '',
      description: '',
      paymentType: 'one-time',
      amount: undefined,
      currency: 'USD',
      deadline: undefined,
      milestones: [],
      attachments: [],
      agreeToTerms: false,
    },
  });

  // Fetch Sellers (Users with user_type == 'seller')
  useEffect(() => {
    const fetchSellers = async () => {
      if (!user) return; // Only fetch if user is logged in
      setIsLoadingSellers(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from('users')
          .select('id, username, full_name')
          .eq('user_type', 'seller');

        if (fetchError) throw fetchError;
        setSellers(data || []);
      } catch (err: any) {
        console.error('Error fetching sellers:', err);
        setError(`Failed to load sellers: ${err.message}`);
        setSellers([]); // Clear sellers on error
      } finally {
        setIsLoadingSellers(false);
      }
    };

    fetchSellers();
  }, [user]); // Re-fetch if user changes

  // Fetch Buyer's Jobs
  useEffect(() => {
    const fetchJobs = async () => {
      if (!user) return; // Only fetch if user is logged in
      setIsLoadingJobs(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from('jobs')
          .select('id, title')
          .eq('buyer_id', user.id);

        if (fetchError) throw fetchError;
        setJobs(data || []);
      } catch (err: any) {
        console.error('Error fetching jobs:', err);
        setError(`Failed to load your jobs: ${err.message}`);
        setJobs([]); // Clear jobs on error
      } finally {
        setIsLoadingJobs(false);
      }
    };

    fetchJobs();
  }, [user]); // Re-fetch if user changes

  const onSubmit = async (data: SendOfferFormData) => {
    if (!user) {
      setError('You must be logged in to send an offer');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const validatedData = data;

      let totalAmount = 0;
      if (validatedData.paymentType === 'one-time') {
        totalAmount = validatedData.amount!;
      } else if (validatedData.milestones?.length) {
        totalAmount = validatedData.milestones.reduce(
          (sum, m) => sum + m.amount,
          0,
        );
      }

      const contractData = {
        buyer_id: user.id,
        seller_id: validatedData.sendTo,
        job_id: validatedData.selectOrder || null,
        service_id: null,
        status: 'pending',
        amount: totalAmount,
        title: validatedData.contractTitle,
        description: validatedData.description,
        attachments: validatedData.attachments || null,
        currency: validatedData.currency,
      };


      const { data: newContract, error: contractError } = await supabase
        .from('contracts')
        .insert(contractData)
        .select('id, buyer_id, seller_id')
        .single();

      // --- DEBUG LOGGING START ---
      console.log('Contract creation attempt complete.');
      if (contractError) {
        console.error('Contract creation FAILED:', contractError);
      } else {
        console.log('Contract created successfully:', newContract);
      }
      // --- DEBUG LOGGING END ---

      if (contractError || !newContract) {
        throw contractError || new Error('Failed to create contract record');
      }

      // --- DEBUG LOGGING START ---
      console.log('Attempting to create chat with data:', {
        buyer_id: newContract.buyer_id,
        seller_id: newContract.seller_id,
        contract_id: newContract.id,
      });
      // --- DEBUG LOGGING END ---
      try {
        const newChat = await chatOperations.createChat({
          buyer_id: newContract.buyer_id,
          seller_id: newContract.seller_id,
          contract_id: newContract.id,
        });

        // --- DEBUG LOGGING START ---
        console.log('chatOperations.createChat call finished.');
        // --- DEBUG LOGGING END ---

        if (!newChat) {
          console.error(
            `Offer sent (Contract ID: ${newContract.id}), but failed to create associated chat. createChat returned null.`,
          );
          setError(
            `Offer sent, but couldn't initiate chat. Please contact support if needed.`,
          );
        } else {
          console.log(
            `Chat created successfully (Chat ID: ${newChat.id}) for Contract ID: ${newContract.id}`,
          );
        }
      } catch (chatErr: any) {
        // --- DEBUG LOGGING START ---
        console.error(
          `Error caught during chatOperations.createChat call for contract ${newContract.id}:`,
          chatErr,
        );
        // --- DEBUG LOGGING END ---
        setError(
          `Offer sent, but failed to create chat: ${chatErr.message || 'Unknown error'}.`,
        );
      }

      if (
        validatedData.paymentType === 'installment' &&
        validatedData.milestones?.length
      ) {
        const milestoneData = validatedData.milestones.map((m, index) => ({
          contract_id: newContract.id,
          description: m.description,
          amount: m.amount,
          due_date: m.dueDate?.toISOString() || null,
          status: 'pending',
          sequence: index + 1,
        }));

        const { error: milestoneError } = await supabase
          .from('contract_milestones')
          .insert(milestoneData);

        if (milestoneError) {
          console.error('Failed to insert milestones:', milestoneError);
          const currentError = error ? `${error} ` : '';
          setError(
            `${currentError}Offer & chat created, but failed to save milestones: ${milestoneError.message}`,
          );
        }
      }

      if (!error) {
        setSuccess(true);
      }
    } catch (err: any) {
      console.error('Send Offer error:', err);
      setError(err.message || 'Failed to send offer. Please try again.');
      setSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formMethods,
    onSubmit,
    isSubmitting,
    isLoadingSellers,
    isLoadingJobs,
    error,
    success,
    sellers,
    jobs,
    isUploadingFiles,
    setIsUploadingFiles,
  };
}
