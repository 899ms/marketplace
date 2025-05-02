'use client';

import React, { useState, useEffect } from 'react';
import { Chat, User, Contract, ContractMilestone } from '@/utils/supabase/types';
import { contractOperations, contractMilestoneOperations } from '@/utils/supabase/database';
import * as Avatar from '@/components/ui/avatar';
import * as Accordion from '@/components/ui/accordion';
import { RiArrowDownSLine, RiArrowUpSLine, RiLoader4Line } from '@remixicon/react';

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
  const symbols: Record<string, string> = { USD: '$', EUR: '€', CNY: '¥' };
  return `${symbols[currency] || '$'}${amount.toFixed(2)}`;
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
        <p className="text-[#525866] text-[14px]">Select a chat to view details.</p>
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
    <div className="flex h-full flex-col">
      <div className='flex justify-end border-y border-gray-200 p-3 flex-shrink-0'>
        <div className='flex items-center gap-2 h-10 cursor-pointer'>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 7H21" stroke="#484848" stroke-width="1.5" stroke-linecap="round" />
            <path d="M3 12H21" stroke="#484848" stroke-width="1.5" stroke-linecap="round" />
            <path d="M3 17H21" stroke="#484848" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </div>
      </div>
      <div className='flex flex-col gap-2 p-4 overflow-y-auto custom-scrollbar'>
        <Accordion.Root type='multiple' className='space-y-6' defaultValue={['a', 'b', 'c', 'd']}>
          <Accordion.Item value='a' className='p-0'>
            <Accordion.Trigger className='m-0 w-full bg-[#F5F7FA] rounded-t-lg flex items-center justify-between'>
              <p className='text-[#0E121B] text-[16px] font-medium'>Details</p>
              <Accordion.Arrow openIcon={RiArrowDownSLine} closeIcon={RiArrowUpSLine} />
            </Accordion.Trigger>
            <Accordion.Content className='bg-white p-4'>
              <div className='flex flex-col gap-2'>
                <div className='flex flex-row items-center justify-between border-b border-[#E2E4E9] pb-2'>
                  <p className='text-[#525866] text-[12px]'>Contract</p>
                  <p className='text-[#0E121B] text-[12px] font-medium'>#{contractDetails?.title}</p>
                </div>
                <div className='flex flex-row items-center justify-between border-b border-[#E2E4E9] pb-2'>
                  <p className='text-[#525866] text-[12px]'>Contract ID</p>
                  <p className='text-[#0E121B] text-[12px] font-medium'>#{contractDetails?.id.substring(0, 8)}...</p>
                </div>
                <div className='flex flex-row items-center justify-between border-b border-[#E2E4E9] pb-2'>
                  <p className='text-[#525866] text-[12px]'>Start Date</p>
                  <p className='text-[#0E121B] text-[12px] font-medium'>{formatDate(contractDetails?.created_at)}</p>
                </div>
                <div className='flex flex-row items-center justify-between border-b border-[#E2E4E9] pb-2'>
                  <p className='text-[#525866] text-[12px]'>Deadline</p>
                  <p className='text-[#0E121B] text-[12px] font-medium'>{'No deadline set'}</p>
                </div>
                <div className='flex flex-row items-center justify-between border-b border-[#E2E4E9] pb-4 mt-2'>
                  <p className='text-[#525866] text-[12px]'>Amount</p>
                  <p className='text-[#0E121B] text-[24px] font-medium'>{formatCurrency(contractDetails?.amount, contractDetails?.currency)}</p>
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value='b' className='p-0'>
            <Accordion.Trigger className='m-0 w-full bg-[#F5F7FA] -t-lg flex items-center justify-between'>
              <p className='text-[#0E121B] text-[16px] font-medium'>Files</p>
              <Accordion.Arrow openIcon={RiArrowDownSLine} closeIcon={RiArrowUpSLine} />
            </Accordion.Trigger>
            <Accordion.Content className='bg-white p-4'>
              <div className='flex flex-col gap-2'>
                {contractDetails?.attachments && contractDetails.attachments.length > 0 ? (
                  <div className="space-y-2">
                    {contractDetails.attachments.map((file, index) => (
                      <div key={index} className="flex flex-row items-center justify-between border-b border-[#E2E4E9] pb-2">
                        <a href={file.url} target='_blank' rel='noopener noreferrer' className='text-[12px] text-[#525866] truncate'>{file.name}</a>
                        <span className="text-[12px] text-[#525866]">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-text-secondary-600 text-paragraph-sm">No files found for this contract.</p>
                )}
              </div>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value='c' className='p-0'>
            <Accordion.Trigger className='m-0 w-full bg-[#F5F7FA] -t-lg flex items-center justify-between'>
              <p className='text-[#0E121B] text-[16px] font-medium'>People</p>
              <Accordion.Arrow openIcon={RiArrowDownSLine} closeIcon={RiArrowUpSLine} />
            </Accordion.Trigger>
            <Accordion.Content className='bg-white p-4'>
              <div className='flex flex-col gap-4'>
                {owner && <div className='flex flex-row items-center gap-2'>

                  <Avatar.Root size='40'>
                    {owner?.avatar_url && owner?.avatar_url != "" ? (
                      <Avatar.Image src={owner?.avatar_url} />
                    ) : (
                      <Avatar.Root size='40' color='yellow'>
                        {otherUserProfile?.full_name?.charAt(0) ?? owner?.username?.charAt(0)}
                      </Avatar.Root>
                    )}

                  </Avatar.Root>
                  <div className='flex flex-col gap-0.5'>
                    <p className='text-[14px] text-[#525866] font-medium'>{owner?.full_name}</p>
                    <p className='text-[12px] text-[#525866] font-medium'>{owner?.id === currentUserProfile?.id ? 'Owner (You)' : 'Owner'}</p>
                  </div>
                </div>
                }
                {worker && <div className='flex flex-row items-center gap-2'>
                  <Avatar.Root size='40'>
                    {worker?.avatar_url && worker?.avatar_url != "" ? (
                      <Avatar.Image src={worker?.avatar_url} />
                    ) : (
                      <Avatar.Root size='40' color='yellow'>
                        {otherUserProfile?.full_name?.charAt(0) ?? owner?.username?.charAt(0)}
                      </Avatar.Root>
                    )}

                  </Avatar.Root>
                  <div className='flex flex-col gap-0.5'>
                    <p className='text-[14px] text-[#525866] font-medium'>{worker?.full_name}</p>
                    <p className='text-[12px] text-[#525866] font-medium'>{worker?.id === currentUserProfile?.id ? 'Worker (You)' : 'Worker'}</p>
                  </div>
                </div>
                }
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value='d' className='p-0'>
            <Accordion.Trigger className='m-0 w-full bg-[#F5F7FA] -t-lg flex items-center justify-between'>
              <p className='text-[#0E121B] text-[16px] font-medium'>Milestones</p>
              <Accordion.Arrow openIcon={RiArrowDownSLine} closeIcon={RiArrowUpSLine} />
            </Accordion.Trigger>
            <Accordion.Content className='bg-white p-4'>
              {milestones.length > 0 ? milestones.map((milestone, index) => (
                <div className='flex flex-col gap-2 border-b border-[#E2E4E9] p-2 pb-4'>
                  <p className='text-[14px] text-[#525866] font-medium'>{`${index + 1}. ${milestone.description}`}</p>
                  <div className='flex flex-row items-center justify-between gap-2'>
                    <p className='text-[12px] text-[#525866] font-medium'>Status: <span className='text-[#0E121B] font-medium capitalize'>{milestone.status}</span></p>
                    <p className='text-[14px] text-[#0E121B] font-medium'>{formatCurrency(milestone.amount, contractDetails?.currency)}</p>
                  </div>
                </div>
              )) : <p className='text-text-secondary-600 text-paragraph-sm'>No milestones found for this contract.</p>}
            </Accordion.Content>
          </Accordion.Item>

        </Accordion.Root>
      </div>

      {/* Details Section
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
      {/* <div className="mb-6 rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4">
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
      </div> */}

      {/* People Section */}
      {/* <div className="mb-6 rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4">
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
      </div> */}

      {/* Milestones Section */}
      {/* {milestones.length > 0 && (
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
      )} */}
    </div>
  );
} 