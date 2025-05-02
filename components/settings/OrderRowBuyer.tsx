'use client';

import React from 'react';
import Link from 'next/link';
import * as Avatar from '@/components/ui/avatar';
import * as Dropdown from '@/components/ui/dropdown';
import * as Table from '@/components/ui/table';
import { RiMore2Fill } from '@remixicon/react';
import renderStatusBadge from '@/components/settings/StatusBadge';

/* ---------- interface (now includes proposals) ---------- */
interface PersonInfo {
  name: string;
  avatarUrl: string;
}
export interface BuyerEngagement {
  id: string;
  type: 'job' | 'contract';
  subject: string;
  price: number;
  deadline: string;
  proposals?: number | null;
  worker: PersonInfo | null;
  status: string;
}

interface Props {
  engagement: BuyerEngagement;
}

/* ---------- one table row for a BUYER ---------- */
export default function OrderRowBuyer({ engagement }: Props) {
  const isJob = engagement.type === 'job';
  const detailLink = isJob
    ? `/projects/${engagement.id}`
    : `/orders/detail/${engagement.id}`;

  return (
    <Table.Row>
      {/* Details + price */}
      <Table.Cell className="px-4 py-3 align-top">
        <Link href={detailLink} className="block group hover:text-blue-600">
          <div className="text-sm font-medium text-text-strong-950 group-hover:underline">
            {engagement.subject}
          </div>
        </Link>
        <div className="text-sm text-text-secondary-600">
          ${engagement.price.toLocaleString()}
        </div>
      </Table.Cell>

      {/* Final deadline */}
      <Table.Cell className="px-4 py-3 text-sm text-text-secondary-600 align-top whitespace-nowrap">
        {engagement.deadline}
      </Table.Cell>

      {/* Proposals */}
      <Table.Cell className="px-4 py-3 text-sm text-text-secondary-600 align-top whitespace-nowrap">
        {engagement.proposals ?? '–'}
      </Table.Cell>

      {/* Worker / Job Posting */}
      <Table.Cell className="px-4 py-3 align-top whitespace-nowrap">
        {engagement.worker ? (
          <div className="flex items-center gap-2">
            <Avatar.Root size="32">
              <Avatar.Image
                src={engagement.worker.avatarUrl || 'https://via.placeholder.com/40'}
                alt={engagement.worker.name}
              />
            </Avatar.Root>
            <span className="text-sm font-medium text-text-strong-950">
              {engagement.worker.name}
            </span>
          </div>
        ) : (
          <span className="text-sm text-text-sub-400 italic">Job Posting</span>
        )}
      </Table.Cell>

      {/* Status */}
      <Table.Cell className="px-4 py-3 align-top whitespace-nowrap">
        {renderStatusBadge(engagement.status, engagement.type)}
      </Table.Cell>

      {/* Actions */}
      <Table.Cell className="px-4 py-3 text-right align-top whitespace-nowrap">
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <button className="p-1 text-text-sub-400 hover:text-text-strong-950 focus:outline-none">
              <RiMore2Fill className="size-5" />
            </button>
          </Dropdown.Trigger>
          <Dropdown.Content align="end">
            <Dropdown.Item asChild>
              <Link href={detailLink}>View Details</Link>
            </Dropdown.Item>
            <Dropdown.Item disabled={!engagement.worker}>
              Message Worker
            </Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item className="text-text-danger-500">
              Cancel Order
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>
      </Table.Cell>
    </Table.Row>
  );
}
