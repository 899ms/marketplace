import * as Accordion from "@/components/ui/accordion";
import { RiArrowDownSLine } from '@remixicon/react';

interface ContractDetail {
  label: string;
  value: string;
}

interface ContractDetailsProps {
  contractName?: string | null;
  details: ContractDetail[];
}

export function ContractDetails({
  contractName,
  details
}: ContractDetailsProps) {
  return (
    <Accordion.Root type="single" collapsible defaultValue="item-1" className="w-full bg-white rounded-lg shadow-sm mb-4 border border-stroke-soft-200">
      <Accordion.Item value="item-1" className="border-b border-stroke-soft-200 p-0 rounded-none ring-0 hover:bg-white data-[state=open]:bg-white">

        <Accordion.Header className="px-4 py-3 bg-[#F5F7FA]">
          <Accordion.Trigger className="w-full text-[16px] text-text-strong-950 p-0 m-0 flex justify-between items-center hover:no-underline">
            Details
            <Accordion.Arrow openIcon={RiArrowDownSLine} closeIcon={RiArrowDownSLine} className="size-5 text-gray-500 transition-transform duration-200 group-data-[state=open]/accordion:rotate-180" />
          </Accordion.Trigger>
        </Accordion.Header>

        <Accordion.Content className="pt-0 pb-4 px-4">
          <div className="space-y-[24px] mt-3">
            {contractName && (
              <div className="flex justify-between border-b border-gray-100">
                <span className="text-[14px] text-[#525866]">Contract</span>
                <a href="#" className="text-[16px] text-blue-600 hover:underline cursor-pointer">{contractName}</a>
              </div>
            )}

            {details.map((detail, index) => (
              <div key={index} className="flex justify-between border-b border-gray-100 last:border-b-0">
                <span className="text-[14px] text-[#525866]">{detail.label}</span>
                <span className="text-[16px] text-[#525866]">{detail.value}</span>
              </div>
            ))}

            <div className="flex justify-between border-b border-gray-100 last:border-b-0">
              <span className="text-[14px] text-[#525866]">Deadline</span>
              <span className="text-[16px] text-[#525866]">
                15 March, 2025
              </span>
            </div>
          </div>
        </Accordion.Content>

      </Accordion.Item>
    </Accordion.Root>
  );
} 