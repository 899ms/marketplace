'use client';

import React from 'react';
import Link from 'next/link';
import * as Avatar from '@/components/ui/avatar';
import * as Dropdown from '@/components/ui/dropdown';
import * as Table from '@/components/ui/table';
import { RiMore2Fill, RiStarFill } from '@remixicon/react';
import renderStatusBadge from '@/components/settings/StatusBadge'; // badge helper

/* -------- lightweight interface (or import a shared one) -------- */
interface PersonInfo {
  name: string;
  avatarUrl: string;
}
export interface SellerOrder {
  id: string;
  from: PersonInfo | null;
  subject: string;
  price: number;
  deadline: string;
  rating: number | null;
  status: string;
}

/* ---------------------------------------------------------------- */
interface Props {
  order: SellerOrder;
}

/* ---------------------------------------------------------------- */
/** One table row for a SELLER in Orders view */
export default function OrderRowSeller({ order }: Props) {
  const detailLink = `/orders/detail/${order.id}`;

  return (
    <Table.Row>
      {/* -------- From (buyer) -------- */}
      <Table.Cell className="px-4 py-3 align-top whitespace-nowrap">
        <div className="flex items-center gap-2">
          <Avatar.Root size="32">
            {order.from && (
              <Avatar.Image
                src={order.from.avatarUrl || 'https://via.placeholder.com/40'}
                alt={order.from.name}
              />
            )}
          </Avatar.Root>
          <span className="text-sm font-medium text-text-strong-950">
            {order.from ? order.from.name : 'Unknown Buyer'}
          </span>
        </div>
      </Table.Cell>

      {/* -------- Details + price -------- */}
      <Table.Cell className="px-4 py-3 align-top">
        <Link href={detailLink} className="block group hover:text-blue-600">
          <div className="text-sm font-medium text-text-strong-950 group-hover:underline">
            {order.subject}
          </div>
        </Link>
        <div className="text-sm text-text-secondary-600">
          ${order.price.toLocaleString()}
        </div>
      </Table.Cell>

      {/* -------- Final deadline -------- */}
      <Table.Cell className="px-4 py-3 text-sm text-text-secondary-600 align-top whitespace-nowrap">
        {order.deadline}
      </Table.Cell>

      {/* -------- Rating -------- */}
      <Table.Cell className="px-4 py-3 align-top whitespace-nowrap">
        {typeof order.rating === 'number' ? (
          <div className="flex items-center gap-1 text-sm text-text-secondary-600">
            <RiStarFill className="size-4 text-yellow-400" />
            <span>{order.rating.toFixed(1)}</span>
          </div>
        ) : (
          <span className="text-sm text-text-sub-400">‑</span>
        )}
      </Table.Cell>

      {/* -------- Status -------- */}
      <Table.Cell className="px-4 py-3 align-top whitespace-nowrap">
        {renderStatusBadge(order.status, 'seller_order')}
      </Table.Cell>

      {/* -------- Actions dropdown -------- */}
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
            <Dropdown.Item>Message Buyer</Dropdown.Item>
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
