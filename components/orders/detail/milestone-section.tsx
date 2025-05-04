"use client";

import * as React from 'react';
import * as Accordion from "@/components/ui/accordion";
import * as Button from "@/components/ui/button";
import { Input as InputField, Root as InputRoot } from "@/components/ui/input";
import * as Tag from "@/components/ui/tag";
import {
  RiCheckFill,
  RiTimeLine,
  RiAddLine,
  RiArrowDownSLine
} from '@remixicon/react';

// Import UserRole type
type UserRole = 'buyer' | 'seller';

interface Milestone {
  id: string;
  title: string;
  amount: string;
  status: 'completed' | 'pending' | 'in-progress';
  date?: string;
  sequence?: number;
}

interface MilestoneSectionProps {
  userRole: UserRole; // Add userRole prop
  contractId: string;
  milestones: Milestone[];
  onConfirmPayment?: (milestoneId: string) => void;
  isConfirmingId?: string | null;
}

export function MilestoneSection({
  userRole, // Destructure userRole
  contractId,
  milestones: initialMilestones,
  onConfirmPayment,
  isConfirmingId
}: MilestoneSectionProps) {
  // Log initial props
  console.log('MilestoneSection received initialMilestones:', initialMilestones);

  const [milestones, setMilestones] = React.useState<Milestone[]>(initialMilestones);
  const [showAddMilestone, setShowAddMilestone] = React.useState(false);
  const [newMilestoneTitle, setNewMilestoneTitle] = React.useState("");
  const [newMilestoneAmount, setNewMilestoneAmount] = React.useState("");
  const [newMilestoneDueDate, setNewMilestoneDueDate] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);

  // Log state after initialization
  React.useEffect(() => {
    console.log('MilestoneSection milestones state initialized:', milestones);
  }, []); // Run only once on mount

  // Update local state if initialMilestones prop changes
  React.useEffect(() => {
    setMilestones(initialMilestones);
  }, [initialMilestones]);

  const handleAddFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSaving || userRole !== 'buyer') return; // Prevent saving if not buyer or already saving
    setIsSaving(true);

    const formData = new FormData(event.currentTarget);
    const nextSequence = (milestones.length > 0 ? Math.max(...milestones.map((m, i) => m.sequence ?? i)) : 0) + 1;

    const { addMilestone } = await import('@/app/actions/milestone-actions');
    const result = await addMilestone(contractId, nextSequence, formData);

    if (result.success && result.milestone) {
      setNewMilestoneTitle("");
      setNewMilestoneAmount("");
      setShowAddMilestone(false);
      setNewMilestoneDueDate("");
      // TODO: Optimistically update or refetch milestones
    } else {
      console.error("Failed to add milestone:", result.error);
      const { notification } = await import('@/hooks/use-notification');
      notification({ status: 'error', title: 'Error', description: result.error || 'Failed to add milestone.' });
    }
    setIsSaving(false);
  };

  // Log state just before rendering
  console.log('MilestoneSection rendering with milestones state:', milestones);

  return (
    <Accordion.Root type="single" collapsible defaultValue="item-1" className="w-full bg-white rounded-[16px] shadow-[0px_1px_2px_0px_rgba(10,13,20,0.03)] mb-4 border border-stroke-soft-200">
      <Accordion.Item value="item-1" className="p-0 rounded-none ring-0 hover:bg-white data-[state=open]:bg-white">

        <Accordion.Header className="px-4 py-3 border-b border-stroke-soft-200 bg-[#F5F7FA]">
          <Accordion.Trigger className="w-full text-[16px] text-text-strong-950 p-0 m-0 flex font-medium justify-between items-center hover:no-underline">
            Timeline
            <Accordion.Arrow openIcon={RiArrowDownSLine} closeIcon={RiArrowDownSLine} className="size-5 text-gray-500 transition-transform duration-200 group-data-[state=open]/accordion:rotate-180" />
          </Accordion.Trigger>
        </Accordion.Header>

        <Accordion.Content className="p-[16px]">
          <div className="space-y-[24px] mt-4 ">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="flex items-start gap-3 pb-2.5">
                {/* status icon */}
                <div className="mt-1 flex-shrink-0">
                  {milestone.status === 'completed' ? (
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <RiCheckFill className="h-4 w-4" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      <RiTimeLine className="h-4 w-4 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* title+amount on the left, date on the far right */}
                <div className="flex-1 flex justify-between items-center min-w-0 mt-[-7px]">
                  <div className="min-w-0 gap-1">
                    <h4 className="text-[16px] pb-1 text-[#0E121B]">
                      {milestone.title}
                    </h4>
                    <p className="text-[16px] text-[#0E121B] mt-[4px]">
                      ${milestone.amount}
                    </p>
                  </div>
                  {milestone.date && (
                    <p className="text-[12px] text-[#525866]">
                      {milestone.date}
                    </p>
                  )}
                </div>

                {/* only buyers see “Confirm Payment” on pending items */}
                {userRole === 'buyer' && milestone.status === 'pending' && (
                  <Tag.Root
                    onClick={() => onConfirmPayment?.(milestone.id)}
                    className={`ml-4 flex-shrink-0 cursor-pointer text-text-strong-950 ${isConfirmingId === milestone.id ? 'opacity-50 pointer-events-none' : ''
                      }`}
                  >
                    {isConfirmingId === milestone.id ? 'Confirming...' : 'Confirm Payment'}
                  </Tag.Root>
                )}
              </div>
            ))}
          </div>

          {/* Only show Add Milestone form/button for buyers */}
          {userRole === 'buyer' && (
            <>
              {showAddMilestone && (
                <form onSubmit={handleAddFormSubmit} className="flex items-end gap-2 mt-4 ml-9">
                  <div className="flex-1">
                    <InputRoot size="small">
                      <InputField
                        name="description"
                        placeholder="Milestone title"
                        value={newMilestoneTitle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMilestoneTitle(e.target.value)}
                        required
                        className="p-2"
                      />
                    </InputRoot>
                  </div>
                  <div className="w-24">
                    <InputRoot size="small">
                      <InputField
                        name="amount"
                        placeholder="Amount"
                        type="number"
                        value={newMilestoneAmount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMilestoneAmount(e.target.value)}
                        required
                        step="0.01"
                        className="p-2"
                      />
                    </InputRoot>
                  </div>
                  <div className="w-36">
                    <InputRoot size="small">
                      <InputField
                        name="dueDate"
                        placeholder="Due Date (Optional)"
                        type="date"
                        value={newMilestoneDueDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMilestoneDueDate(e.target.value)}
                        className="p-2"
                      />
                    </InputRoot>
                  </div>
                  <Button.Root type="submit" size="small" disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save'}
                  </Button.Root>
                  <Button.Root variant="neutral" mode="ghost" size="small" type="button" onClick={() => setShowAddMilestone(false)} disabled={isSaving}>
                    Cancel
                  </Button.Root>
                </form>
              )}

              {!showAddMilestone && (
                <button
                  onClick={() => setShowAddMilestone(true)}
                  className="flex items-center gap-1 text-text-strong-950 hover:text-text-secondary-600 mt-6 ml-9 text-sm font-medium"
                >
                  <RiAddLine className="h-5 w-5" />
                  <span>Add a new milestone</span>
                </button>
              )}
            </>
          )}
        </Accordion.Content>

      </Accordion.Item>
    </Accordion.Root>
  );
} 