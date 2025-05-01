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
  id: number;
  title: string;
  amount: string;
  status: 'completed' | 'pending' | 'in-progress';
  date?: string;
}

interface MilestoneSectionProps {
  milestones: Milestone[];
  onConfirmPayment?: (milestoneId: number) => void;
}

export function MilestoneSection({
  milestones: initialMilestones,
  onConfirmPayment
}: MilestoneSectionProps) {
  const [milestones, setMilestones] = React.useState<Milestone[]>(initialMilestones);
  const [showAddMilestone, setShowAddMilestone] = React.useState(false);
  const [newMilestoneTitle, setNewMilestoneTitle] = React.useState("");
  const [newMilestoneAmount, setNewMilestoneAmount] = React.useState("");

  const handleSaveMilestone = () => {
    if (!newMilestoneTitle || !newMilestoneAmount) return;

    const newMilestone: Milestone = {
      id: Date.now(),
      title: newMilestoneTitle,
      amount: newMilestoneAmount,
      status: 'pending',
    };
    setMilestones([...milestones, newMilestone]);
    setNewMilestoneTitle("");
    setNewMilestoneAmount("");
    setShowAddMilestone(false);
    console.log("Saving milestone:", newMilestone);
  };

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
                      className="ml-4 flex-shrink-0 cursor-pointer text-text-strong-950"
                    >
                      Confirm Payment
                    </Tag.Root>
                  )}
                </div>
              </div>
            ))}
          </div>

          {showAddMilestone && (
            <div className="flex items-end gap-2 mt-4 ml-9">
              <div className="flex-1">
                <InputRoot size="small">
                  <InputField
                    placeholder="Milestone title"
                    value={newMilestoneTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMilestoneTitle(e.target.value)}
                  />
                </InputRoot>
              </div>
              <div className="w-24">
                <InputRoot size="small">
                  <InputField
                    placeholder="Amount"
                    type="number"
                    value={newMilestoneAmount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMilestoneAmount(e.target.value)}
                  />
                </InputRoot>
              </div>
              <Button.Root size="small" onClick={handleSaveMilestone}>Save</Button.Root>
              <Button.Root variant="neutral" mode="ghost" size="small" onClick={() => setShowAddMilestone(false)}>Cancel</Button.Root>
            </div>
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