'use client';

import React, { useState, useEffect } from 'react';
import { Chat, User, Contract, ContractMilestone } from '@/utils/supabase/types';
import { contractOperations, contractMilestoneOperations } from '@/utils/supabase/database';
import * as Avatar from '@/components/ui/avatar';
import { RiLoader4Line } from '@remixicon/react';

interface ChatDetailsPanelProps {
  chat: Chat | null;
  otherUserProfile: User | null;
  currentUserProfile: User | null; // Added current user profile
}

// Helper to format dates (adjust format as needed)
const formatDate = (dateString?: string | null) => {
  if (!dateString) return 'N/A';
  try {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(dateString));
  } catch (e) {
    return 'Invalid Date';
  }
};

// Helper to format currency
const formatCurrency = (amount?: number | null, currency: string = 'USD') => {
  if (amount == null) return 'N/A';
  // Basic currency formatting, enhance as needed
  const symbols: Record<string, string> = { USD: '$ ', EUR: '€ ', CNY: '¥ ' };
  return `${symbols[currency] || '$ '}${amount.toFixed(2)}`;
};

export default function ChatDetailsPanel({ chat, otherUserProfile, currentUserProfile }: ChatDetailsPanelProps) {
  const [contractDetails, setContractDetails] = useState<Contract | null>(null);
  const [milestones, setMilestones] = useState<ContractMilestone[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!chat?.contract_id) {
        setContractDetails(null);
        setMilestones([]);
        setIsLoading(false);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);
      setContractDetails(null);
      setMilestones([]);

      try {
        const [contractData, milestoneData] = await Promise.all([
          contractOperations.getContractById(chat.contract_id),
          contractMilestoneOperations.getMilestonesByContractId(chat.contract_id),
        ]);

        if (contractData) {
          setContractDetails(contractData);
        } else {
          setError('Contract details not found.');
        }
        setMilestones(milestoneData || []);

      } catch (err: any) {
        console.error('Error fetching chat details:', err);
        setError('Failed to load contract details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [chat?.contract_id]);

  // Determine Owner (Buyer) and Worker (Seller)
  const owner = chat?.buyer_id === currentUserProfile?.id ? currentUserProfile : otherUserProfile;
  const worker = chat?.seller_id === currentUserProfile?.id ? currentUserProfile : otherUserProfile;

  // Render Loading State
  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-bg-subtle-50 p-4">
        <RiLoader4Line className="animate-spin text-xl" />
      </div>
    );
  }

  // Render Empty State (No chat selected)
  if (!chat) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-bg-subtle-50 p-4">
        <p className="text-text-secondary-600">Select a chat to view details.</p>
      </div>
    );
  }

  // Render Error State
  if (error) {
    return (
      <div className="h-full w-full bg-bg-subtle-50 p-4">
        <h2 className="mb-4 text-lg font-medium text-text-strong-950">Details</h2>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  // Render Details Panel Content
  return (
    <div className="flex h-full flex-col overflow-y-auto bg-bg-subtle-50 p-4">
      {/* Details Section */}
      <div className="mb-6 rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4">
        <h3 className="mb-3 text-label-lg font-medium text-text-strong-950">Details</h3>
        {contractDetails ? (
          <dl className="space-y-2 text-paragraph-sm">
            <div className="flex justify-between">
              <dt className="text-text-secondary-600">Contract</dt>
              <dd className="text-text-primary-950">{contractDetails.title || 'Contract Name Here...'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-secondary-600">Contract ID</dt>
              <dd className="text-text-primary-950">#{contractDetails.id.substring(0, 8)}...</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-secondary-600">Start Date</dt>
              <dd className="text-text-primary-950">{formatDate(contractDetails.created_at)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-secondary-600">Amount</dt>
              <dd className="font-medium text-text-strong-950">{formatCurrency(contractDetails.amount, contractDetails.currency)}</dd>
            </div>
          </dl>
        ) : (
          <p className="text-text-secondary-600 text-paragraph-sm">Contract details unavailable.</p>
        )}
      </div>

      {/* Files Section */}
      <div className="mb-6 rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4">
        <h3 className="mb-3 text-label-lg font-medium text-text-strong-950">Files</h3>
        {contractDetails?.attachments && contractDetails.attachments.length > 0 ? (
          <div className="space-y-2">
            {contractDetails.attachments.map((file, index) => (
              <div key={index} className="flex items-center justify-between rounded border border-stroke-soft-200 p-2">
                <span className="text-paragraph-sm truncate pr-2">{file.name}</span>
                <span className="text-paragraph-xs text-text-secondary-600 shrink-0">{(file.size / 1024 / 1024).toFixed(2)}mb</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-paragraph-sm text-text-secondary-600">No files found for this contract.</p>
        )}
      </div>

      {/* People Section */}
      <div className="mb-6 rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4">
        <h3 className="mb-3 text-label-lg font-medium text-text-strong-950">People</h3>
        <div className="space-y-3">
          {owner && (
            <div className="flex items-center gap-3">
              <Avatar.Root size="40">
                <Avatar.Image src={owner.avatar_url || 'https://via.placeholder.com/40'} alt={owner.full_name || 'Owner'} />
              </Avatar.Root>
              <div>
                <p className="text-paragraph-sm font-medium text-text-primary-950">{owner.full_name || 'Owner Name'}</p>
                <p className="text-paragraph-xs text-text-secondary-600">Owner{owner.id === currentUserProfile?.id ? ' (You)' : ''}</p>
              </div>
            </div>
          )}
          {worker && (
            <div className="flex items-center gap-3">
              <Avatar.Root size="40">
                <Avatar.Image src={worker.avatar_url || 'https://via.placeholder.com/40'} alt={worker.full_name || 'Worker'} />
              </Avatar.Root>
              <div>
                <p className="text-paragraph-sm font-medium text-text-primary-950">{worker.full_name || 'Worker Name'}</p>
                <p className="text-paragraph-xs text-text-secondary-600">Worker{worker.id === currentUserProfile?.id ? ' (You)' : ''}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Milestones Section */}
      {milestones.length > 0 && (
        <div className="rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4">
          <h3 className="mb-3 text-label-lg font-medium text-text-strong-950">Milestones</h3>
          <div className="space-y-2">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="rounded border border-stroke-soft-200 p-2">
                <p className="text-paragraph-sm font-medium">{milestone.description}</p>
                <p className="text-paragraph-xs text-text-secondary-600">Amount: {formatCurrency(milestone.amount, contractDetails?.currency)} - Status: {milestone.status}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 