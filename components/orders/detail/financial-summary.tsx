import { RiHandHeartLine, RiHeartPulseLine } from '@remixicon/react';

interface FinancialSummaryProps {
  totalAmount: string;
  received: string;
  inEscrow: string;
  refunded: string;
}

export function FinancialSummary({
  totalAmount,
  received,
  inEscrow,
  refunded,
}: FinancialSummaryProps) {
  return (
    <div className="flex gap-[1rem] my-4">
      {/* Financial Details */}
      <div className="flex-1 grid grid-cols-4 gap-4 bg-bg-weak-50 p-6 rounded-lg h-[100px]">
        <div className="flex flex-col justify-center">
          <span className="text-sm text-text-secondary-600">Total Amount</span>
          <span className="text-xl font-medium text-text-strong-950 mt-1">{totalAmount}</span>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-sm text-text-secondary-600">Received</span>
          <span className="text-xl font-medium text-text-strong-950 mt-1">{received}</span>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-sm text-text-secondary-600">In Escrow</span>
          <span className="text-xl font-medium text-text-strong-950 mt-1">{inEscrow}</span>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-sm text-text-secondary-600">Refunded</span>
          <span className="text-xl font-medium text-text-strong-950 mt-1">{refunded}</span>
        </div>
      </div>

      {/* Milestone Box */}
      <div className="flex-1 bg-bg-weak-50 p-3 rounded-lg h-[100px] flex flex-col">
        <div>
          <RiHeartPulseLine className="size-5 text-text-secondary-600" />
        </div>
        <h4 className="text-sm font-medium text-text-strong-950 mt-1">Milestone</h4>
        <div className="mt-0.5">
          <p className="text-[12px] text-gray-600">
            For only $4.99 per month!
            <a href="#" className="underline hover:text-text-primary-500 ml-1">
              Learn More
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 