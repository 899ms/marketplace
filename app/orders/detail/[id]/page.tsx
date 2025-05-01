import { notFound } from 'next/navigation';
import {
  contractOperations,
  userOperations,
  contractMilestoneOperations
} from '@/utils/supabase/database';
import { OrderDetailsClient } from '@/components/orders/detail/order-details-client';

interface OrderDetailsPageProps {
  params: {
    id: string;
  };
}

// Function to fetch all necessary data
async function getOrderDetailsData(id: string) {
  console.log(`Fetching data for order/contract ID: ${id}`);

  const contract = await contractOperations.getContractById(id);
  if (!contract) {
    console.log(`Contract not found for ID: ${id}`);
    return null; // Or throw an error / use notFound()
  }
  console.log('Contract fetched:', contract.id);

  const seller = await userOperations.getUserById(contract.seller_id);
  if (!seller) {
    console.log(`Seller not found for ID: ${contract.seller_id}`);
    // Decide how to handle missing seller - maybe still show contract?
    // For now, let's treat it as essential and return null
    return null;
  }
  console.log('Seller fetched:', seller.id);

  const milestonesResult = await contractMilestoneOperations.getMilestonesByContractId(id);
  // Log the result from the database function
  console.log(`Result from getMilestonesByContractId for ${id}:`, milestonesResult);

  // Ensure milestonesResult is an array before returning
  const milestones = Array.isArray(milestonesResult) ? milestonesResult : [];

  console.log(`Milestones prepared for return: ${milestones.length}`);

  return { contract, seller, milestones };
}

// Page component is now a Server Component
export default async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { id } = params;
  const data = await getOrderDetailsData(id);

  // Handle case where data fetching failed or contract/seller not found
  if (!data) {
    notFound(); // Render the default 404 page
  }

  const { contract, seller, milestones } = data;

  // Render the Client Component and pass fetched data as props
  return (
    <OrderDetailsClient
      contract={contract}
      seller={seller}
      milestones={milestones}
    />
  );
} 