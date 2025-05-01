"use client";

import { ProfileSection } from "@/components/orders/detail/profile-section";
import { FinancialSummary } from "@/components/orders/detail/financial-summary";
import { MilestoneSection } from "@/components/orders/detail/milestone-section";
import { ContractDetails } from "@/components/orders/detail/contract-details";
import { WorkFiles } from "@/components/orders/detail/work-files";

interface OrderDetailsPageProps {
  params: {
    id: string;
  };
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  // Dummy data for demonstration
  const orderData = {
    seller: {
      name: "Cleve Music",
      rating: 4.9,
      totalReviews: 125,
      specialty: "Specia",
      avatarUrl: "https://placekitten.com/200/200",
    },
    financials: {
      totalAmount: "$511111100.00",
      received: "$111500.00",
      inEscrow: "$0.00",
      refunded: "$0.00",
    },
    milestones: [
      {
        id: 1,
        title: "Order created (Milestone Amount)",
        amount: "500",
        status: "completed" as const,
        date: "23 Jan 2025, 14:27",
      },
      {
        id: 2,
        title: "Milestone 1",
        amount: "58",
        status: "completed" as const,
        date: "23 Jan 2025, 14:27",
      },
      {
        id: 3,
        title: "Milestone 2",
        amount: "120",
        status: "pending" as const,
      },
      {
        id: 4,
        title: "Milestone 3",
        amount: "100",
        status: "pending" as const,
      },
      {
        id: 5,
        title: "Milestone 4",
        amount: "100",
        status: "pending" as const,
      },
      {
        id: 6,
        title: "Milestone 5",
        amount: "100",
        status: "pending" as const,
      },
    ],
    contract: {
      name: "Contract name",
      details: [
        { label: "Contract ID", value: "#126895" },
        { label: "Start Date", value: "10 March, 2025" },
        { label: "Deadline", value: "15 March, 2025" },
      ],
    },
    workFiles: [
      {
        id: "1",
        name: "my-cv.mp3",
        size: "0.56 MB",
        date: "23 Jan 2025, 14:27",
      },
      {
        id: "2",
        name: "my-cv.mp3",
        size: "0.56 MB",
        date: "23 Jan 2025, 14:27",
      },
    ],
  };

  const handleConfirmPayment = (milestoneId: number) => {
    // In a real app, this would trigger an API call
    console.log(`Confirming payment for milestone ${milestoneId}`);
  };

  const handleDownload = (fileId: string) => {
    // In a real app, this would trigger a download
    console.log(`Downloading file ${fileId}`);
  };

  return (
    <div className="container mx-auto py-8 px-4">


      <ProfileSection {...orderData.seller} />

      <FinancialSummary {...orderData.financials} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <MilestoneSection
            milestones={orderData.milestones}
            onConfirmPayment={handleConfirmPayment}
          />
        </div>
        <div>
          <ContractDetails
            contractName={orderData.contract.name}
            details={orderData.contract.details}
          />
          <WorkFiles
            files={orderData.workFiles}
            onDownload={handleDownload}
          />
        </div>
      </div>
    </div>
  );
} 