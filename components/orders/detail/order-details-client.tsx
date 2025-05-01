'use client';

import * as React from 'react';
import {
  User,
  Contract,
  ContractMilestone
} from '@/utils/supabase/types'; // Import the data types
import { ProfileSection } from "./profile-section";
import { FinancialSummary } from "./financial-summary";
import { MilestoneSection } from "./milestone-section";
import { ContractDetails } from "./contract-details";
import { WorkFiles } from "./work-files";
import { confirmMilestonePayment } from '@/app/actions/milestone-actions'; // Import the server action
import { uploadContractAttachments } from '@/app/actions/contract-actions'; // Import the new server action
import { useNotification } from '@/hooks/use-notification'; // Import custom notification hook

// Define user role type
type UserRole = 'buyer' | 'seller';

// Define props for the Client Component
interface OrderDetailsClientProps {
  contract: Contract;
  seller: User;
  buyer: User; // Add buyer prop
  milestones: ContractMilestone[];
  currentUserId: string; // Add current user ID prop
}

export function OrderDetailsClient({
  contract,
  seller,
  buyer,
  milestones: initialMilestonesData,
  currentUserId,
}: OrderDetailsClientProps) {
  const [isConfirming, setIsConfirming] = React.useState<string | null>(null); // Track which milestone is being confirmed
  const { notification } = useNotification(); // Use the custom hook

  // Determine the role of the current user
  const userRole: UserRole = currentUserId === seller.id ? 'seller' : 'buyer';
  const otherParty = userRole === 'seller' ? buyer : seller;

  console.log(`Current user role: ${userRole}`);
  console.log('Other party details:', otherParty);

  // Log received milestones
  console.log('OrderDetailsClient received milestones:', initialMilestonesData);

  // --- Event Handlers (moved from old page.tsx) ---
  const handleConfirmPayment = async (milestoneId: string) => {
    // Only allow buyer to confirm payment
    if (userRole !== 'buyer') {
      notification({ status: 'error', title: 'Action Denied', description: 'Only the buyer can confirm payments.' });
      return;
    }
    if (isConfirming) return; // Prevent double clicks
    setIsConfirming(milestoneId);
    console.log(`Calling server action to confirm payment for milestone ${milestoneId}`);

    const result = await confirmMilestonePayment(milestoneId);

    if (result.success) {
      // Use custom notification
      notification({
        status: 'success',
        title: 'Success',
        description: 'Milestone payment confirmed!',
      });
      // TODO: Add optimistic update or refetch milestones
    } else {
      // Use custom notification
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
    window.open(fileUrl, '_blank'); // Simple download trigger
  };

  // --- Upload Handler --- 
  const handleUpload = async (files: File[]) => {
    console.log(`handleUpload called with ${files.length} files`);
    if (userRole !== 'seller') {
      notification({ status: 'error', title: 'Action Denied', description: 'Only the seller can upload files.' });
      return; // Should not happen if UI is correct, but double-check
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
        // Revalidation is handled by the server action, so the updated files
        // should appear on the next page render/navigation. 
        // Optionally, could add optimistic update here if immediate feedback is desired without full refresh.
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

  // --- Prepare data for child components --- 

  // Example: Format data for ContractDetails
  const contractDetailItems = [
    { label: "Contract ID", value: `#${contract.id.substring(0, 6)}` }, // Shorten UUID for display
    { label: "Start Date", value: contract.created_at ? new Date(contract.created_at).toLocaleDateString() : 'N/A' },
    // Add Deadline if available in Contract type
    // { label: "Deadline", value: contract.deadline ? new Date(contract.deadline).toLocaleDateString() : 'N/A' },
  ];

  // Example: Map attachments for WorkFiles
  const workFileItems = contract.attachments?.map(file => ({
    id: file.url, // Using URL as unique ID for key/download
    name: file.name,
    size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`, // Calculate size in MB
    date: contract.created_at ? new Date(contract.created_at).toLocaleString() : 'N/A', // Use contract creation date for now
  })) || [];

  // Calculate financial summary data (Placeholder - needs real logic)
  const financialData = {
    totalAmount: `$${contract.amount?.toFixed(2) ?? '0.00'}`,
    // These need actual calculation based on milestone status/transactions
    received: "$0.00",
    inEscrow: "$0.00",
    refunded: "$0.00",
  };

  // Map milestones with refined status and logging
  const mappedMilestones = initialMilestonesData.map(m => {
    let displayStatus: 'completed' | 'pending' | 'in-progress';
    switch (m.status) {
      case 'approved':
      case 'paid':
        displayStatus = 'completed';
        break;
      case 'rejected': // Decide how to handle rejected - maybe treat as pending?
      case 'pending':
      default:
        displayStatus = 'pending';
        break;
      // Note: 'in-progress' isn't a status from ContractMilestoneSchema, handle if needed
    }

    // Use due_date if available, otherwise updated_at or created_at?
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

  // Log mapped milestones
  console.log('OrderDetailsClient mapped milestones for section:', mappedMilestones);

  return (
    <div className="container mx-auto py-8 px-4">

      <ProfileSection
        userRole={userRole}
        name={otherParty.full_name}
        rating={4.9} // Placeholder: Rating needs to come from user or reviews data
        totalReviews={125} // Placeholder: Total reviews needed
        specialty={otherParty.bio || (otherParty.user_type === 'seller' ? 'Seller' : 'Buyer')}
        avatarUrl={otherParty.avatar_url || undefined}
      // status={seller.status || 'online'} // Placeholder: Add user status if available
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
    </div>
  );
} 