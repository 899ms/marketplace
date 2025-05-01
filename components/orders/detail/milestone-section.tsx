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

interface Milestone {
  id: string;
  title: string;
  amount: string;
  status: 'completed' | 'pending' | 'in-progress';
  date?: string;
  sequence?: number;
}

interface MilestoneSectionProps {
  contractId: string;
  milestones: Milestone[];
  onConfirmPayment?: (milestoneId: string) => void;
  isConfirmingId?: string | null;
}

export function MilestoneSection({
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
    if (isSaving) return;
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
    <Accordion.Root type="single" collapsible defaultValue="item-1" className="w-full bg-white rounded-lg shadow-sm my-4 border border-stroke-soft-200">
      <Accordion.Item value="item-1" className="p-0 rounded-none ring-0 hover:bg-white data-[state=open]:bg-white">
        <Accordion.Header className="px-4 py-3 border-b border-stroke-soft-200">
          <Accordion.Trigger className="w-full text-lg font-semibold text-text-strong-950 p-0 m-0 flex justify-between items-center hover:no-underline">
            Timeline
            <Accordion.Arrow openIcon={RiArrowDownSLine} closeIcon={RiArrowDownSLine} className="size-5 text-gray-500 transition-transform duration-200 group-data-[state=open]/accordion:rotate-180" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="pt-0 pb-4 px-4">
          <div className="space-y-4 mt-4">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="flex items-start gap-3">
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

                <div className="flex-1 flex justify-between items-center min-w-0">
                  <div className="min-w-0">
                    <h4 className="text-sm font-medium text-text-strong-950 truncate">{milestone.title}</h4>
                    <p className="text-sm text-text-secondary-600 mt-0.5">${milestone.amount}</p>
                    {milestone.date && (
                      <p className="text-xs text-gray-400 mt-0.5">{milestone.date}</p>
                    )}
                  </div>

                  {milestone.status === 'pending' && (
                    <Tag.Root
                      onClick={() => onConfirmPayment?.(milestone.id)}
                      className={`ml-4 flex-shrink-0 cursor-pointer text-text-strong-950 ${isConfirmingId === milestone.id ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      {isConfirmingId === milestone.id ? 'Confirming...' : 'Confirm Payment'}
                    </Tag.Root>
                  )}
                </div>
              </div>
            ))}
          </div>

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
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
} 