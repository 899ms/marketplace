'use client';

import * as React from 'react';
import {
  User,
  Contract,
  ContractMilestone,
  Chat,
  Message
} from '@/utils/supabase/types';
import { useAuth } from '@/utils/supabase/AuthContext';
import { chatOperations, userOperations } from '@/utils/supabase/database';
import ChatPopupWrapper from '@/components/chat/chat-popup-wrapper';
import { ProfileSection } from "./profile-section";
import { FinancialSummary } from "./financial-summary";
import { MilestoneSection } from "./milestone-section";
import { ContractDetails } from "./contract-details";
import { WorkFiles } from "./work-files";
import { confirmMilestonePayment } from '@/app/actions/milestone-actions';
import { uploadContractAttachments } from '@/app/actions/contract-actions';
import { useNotification } from '@/hooks/use-notification';

// Define user role type
type UserRole = 'buyer' | 'seller';

// Define props for the Client Component
interface OrderDetailsClientProps {
  contract: Contract;
  seller: User;
  buyer: User;
  milestones: ContractMilestone[];
  currentUserId: string;
}

export function OrderDetailsClient({
  contract,
  seller,
  buyer,
  milestones: initialMilestonesData,
  currentUserId,
}: OrderDetailsClientProps) {
  // --- State --- 
  const [isConfirming, setIsConfirming] = React.useState<string | null>(null);
  const [currentUserProfile, setCurrentUserProfile] = React.useState<User | null>(null);
  const [activeChat, setActiveChat] = React.useState<Chat | null>(null);
  const [activeChatMessages, setActiveChatMessages] = React.useState<Message[]>([]);
  const [isLoadingChat, setIsLoadingChat] = React.useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = React.useState(false);
  const [chatError, setChatError] = React.useState<string | null>(null);

  // --- Hooks --- 
  const { notification } = useNotification();
  const { user: authUser, loading: authLoading } = useAuth();

  // --- Derived State --- 
  const userRole: UserRole = currentUserId === seller.id ? 'seller' : 'buyer';
  const otherParty = userRole === 'seller' ? buyer : seller;

  // --- Effects --- 
  React.useEffect(() => {
    if (currentUserId) {
      userOperations.getUserById(currentUserId)
        .then(profile => {
          if (profile) {
            setCurrentUserProfile(profile);
            console.log('Current user profile fetched:', profile.id);
          } else {
            console.error('Could not fetch current user profile');
            setChatError('Could not load your profile data.');
          }
        })
        .catch(err => {
          console.error('Error fetching current user profile:', err);
          setChatError('Error loading your profile data.');
        });
    }
  }, [currentUserId]);

  React.useEffect(() => {
    console.log(`Current user role: ${userRole}`);
    console.log('Other party details:', otherParty);
    console.log('OrderDetailsClient received milestones:', initialMilestonesData);
  }, [userRole, otherParty, initialMilestonesData]);

  // --- Chat Handlers --- 
  const handleOpenChat = async () => {
    if (!currentUserProfile || !otherParty || isLoadingChat) {
      console.warn('Cannot open chat: Missing user profiles or already loading.');
      if (!currentUserProfile) setChatError("Your profile isn't loaded yet.");
      return;
    }
    setIsLoadingChat(true);
    setChatError(null);
    console.log(`Attempting to find/create chat between Buyer ${contract.buyer_id} and Seller ${contract.seller_id}`);

    try {
      const chat = await chatOperations.findOrCreateChat(contract.buyer_id, contract.seller_id);
      if (chat) {
        console.log('Chat found/created:', chat.id);
        setActiveChat(chat);
        setActiveChatMessages([]);
      } else {
        throw new Error('Could not find or create a chat.');
      }
    } catch (err: any) {
      console.error('Error opening chat:', err);
      setChatError(err.message || 'Failed to open chat.');
      notification({ status: 'error', title: 'Chat Error', description: err.message || 'Failed to open chat.' });
    }
    setIsLoadingChat(false);
  };

  const handleCloseChat = () => {
    setActiveChat(null);
    setActiveChatMessages([]);
    setChatError(null);
    console.log('Chat closed');
  };

  // --- Other Event Handlers (handleConfirmPayment, handleDownload, handleUpload) --- 
  const handleConfirmPayment = async (milestoneId: string) => {
    if (userRole !== 'buyer') {
      notification({ status: 'error', title: 'Action Denied', description: 'Only the buyer can confirm payments.' });
      return;
    }
    if (isConfirming) return;
    setIsConfirming(milestoneId);
    console.log(`Calling server action to confirm payment for milestone ${milestoneId}`);

    const result = await confirmMilestonePayment(milestoneId);

    if (result.success) {
      notification({
        status: 'success',
        title: 'Success',
        description: 'Milestone payment confirmed!',
      });
    } else {
      notification({
        status: 'error',
        title: 'Error',
        description: result.error || 'Failed to confirm payment.',
      });
    }
    setIsConfirming(null);
  };

  const handleDownload = (fileUrl: string) => {
    console.log(`Downloading file from ${fileUrl}`);
    window.open(fileUrl, '_blank');
  };

  const handleUpload = async (files: File[]) => {
    console.log(`handleUpload called with ${files.length} files`);
    if (userRole !== 'seller') {
      notification({ status: 'error', title: 'Action Denied', description: 'Only the seller can upload files.' });
      return;
    }

    if (!files || files.length === 0) {
      notification({ status: 'warning', title: 'No Files', description: 'Please select files to upload.' });
      return;
    }

    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file, file.name);
    });

    try {
      const result = await uploadContractAttachments(contract.id, formData);
      if (result.success) {
        notification({
          status: 'success',
          title: 'Upload Successful',
          description: result.message || `${files.length} file(s) uploaded.`
        });
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error: any) {
      console.error("Upload failed:", error);
      notification({
        status: 'error',
        title: 'Upload Failed',
        description: error.message || 'Could not upload files.',
      });
    }
  };

  // --- Rehire Handler --- 
  const handleRehireClick = () => {
    // TODO: Implement actual rehire logic later
    console.log(`Rehiring user: ${otherParty.full_name} (ID: ${otherParty.id})`);
    notification({
      status: 'success',
      title: 'Rehire Initiated',
      description: `You have successfully initiated the rehire process for ${otherParty.full_name}.`,
      variant: 'filled', // Optional: make it stand out
    });
  };
  // --- End Rehire Handler ---

  // --- Prepare data for child components --- 

  const contractDetailItems = [
    { label: "Contract ID", value: `#${contract.id.substring(0, 6)}` },
    { label: "Start Date", value: contract.created_at ? new Date(contract.created_at).toLocaleDateString() : 'N/A' },
  ];

  const workFileItems = contract.attachments?.map(file => ({
    id: file.url,
    name: file.name,
    size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
    date: contract.created_at ? new Date(contract.created_at).toLocaleString() : 'N/A',
  })) || [];

  const financialData = {
    totalAmount: `$${contract.amount?.toFixed(2) ?? '0.00'}`,
    received: "$0.00",
    inEscrow: "$0.00",
    refunded: "$0.00",
  };

  const mappedMilestones = initialMilestonesData.map(m => {
    let displayStatus: 'completed' | 'pending' | 'in-progress';
    switch (m.status) {
      case 'approved':
      case 'paid':
        displayStatus = 'completed';
        break;
      case 'rejected':
      case 'pending':
      default:
        displayStatus = 'pending';
        break;
    }

    const displayDate = m.due_date ? new Date(m.due_date).toLocaleString()
      : m.updated_at ? new Date(m.updated_at).toLocaleString()
        : m.created_at ? new Date(m.created_at).toLocaleString()
          : undefined;

    return {
      id: m.id,
      title: m.description,
      amount: String(m.amount ?? 0),
      status: displayStatus,
      date: displayDate
    };
  });

  console.log('OrderDetailsClient mapped milestones for section:', mappedMilestones);

  return (
    <div className="container mx-auto py-8 px-4">

      <ProfileSection
        userRole={userRole}
        name={otherParty.full_name}
        rating={4.9}
        totalReviews={125}
        specialty={otherParty.bio || (otherParty.user_type === 'seller' ? 'Seller' : 'Buyer')}
        avatarUrl={otherParty.avatar_url || undefined}
        onMessageClick={handleOpenChat}
        isMessagingLoading={isLoadingChat}
        onRehireClick={handleRehireClick}
        disabled={!currentUserProfile || authLoading}
      />

      <FinancialSummary {...financialData} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="max-w-[614px]">
          <MilestoneSection
            userRole={userRole}
            contractId={contract.id}
            milestones={mappedMilestones}
            onConfirmPayment={handleConfirmPayment}
            isConfirmingId={isConfirming}
          />
        </div>
        <div>
          <ContractDetails
            contractName={contract.title}
            details={contractDetailItems}
          />
          <WorkFiles
            userRole={userRole}
            files={workFileItems}
            onDownload={handleDownload}
            onUpload={handleUpload}
          />
        </div>
      </div>

      {activeChat && currentUserProfile && otherParty && (
        <ChatPopupWrapper
          key={activeChat.id}
          chat={activeChat}
          initialMessages={activeChatMessages}
          currentUserProfile={currentUserProfile}
          otherUserProfile={otherParty}
          currentUserId={currentUserId}
          isLoadingMessages={isLoadingMessages}
          onClose={handleCloseChat}
          position="bottom-right"
        />
      )}

      {chatError && (
        <div className="fixed bottom-4 left-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50" role="alert">
          <strong className="font-bold">Chat Error: </strong>
          <span className="block sm:inline">{chatError}</span>
        </div>
      )}

    </div>
  );
} 