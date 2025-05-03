'use client';

import React from 'react';
import Link from 'next/link';
import * as Avatar from '@/components/ui/avatar';
import * as Dropdown from '@/components/ui/dropdown';
import * as Table from '@/components/ui/table';
import * as Tag from '@/components/ui/tag';
import { RiMore2Fill, RiStarFill, RiUserLine } from '@remixicon/react';
import renderStatusIcon from '@/components/settings/StatusBadge'; // icon helper
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
    <Table.Row className='border-b border-[#E1E4EA]'>
      {/* -------- From (buyer) -------- */}
      <Table.Cell className=" align-center whitespace-nowrap">
        <div className="flex items-center gap-4">
          {order.from && order.from.avatarUrl ? (<Avatar.Root size="40">

            <Avatar.Image
              src={order.from.avatarUrl}
              alt={order.from.name}
            />
          </Avatar.Root>
          ) : (
            <Avatar.Root size="40">
              {order.from?.name?.charAt(0)}
            </Avatar.Root>
          )}

          <span className="text-[14px] font-medium text-[#525866]">
            {order.from ? order.from.name : 'Unknown Buyer'}
          </span>
        </div>
      </Table.Cell>

      {/* -------- Details + price -------- */}
      <Table.Cell className=" align-center">
        <Link href={detailLink} className="flex flex-col gap-1 hover:text-blue-600">
          <div className="text-[14px] font-normal text-[#525866] group-hover:underline">
            {order.subject}
          </div>
        </Link>
        <div className="text-[12px] text-[#0E121B]">
          ${order.price.toLocaleString()}
        </div>
      </Table.Cell>

      {/* -------- Final deadline -------- */}
      <Table.Cell className=" text-[14px] text-[#525866] align-center whitespace-nowrap">
        {order.deadline}
      </Table.Cell>

      {/* -------- Rating -------- */}
      <Table.Cell className=" align-center whitespace-nowrap">
        {typeof order.rating === 'number' ? (
          <div className="flex items-center gap-1">
            <RiStarFill className="size-4 text-yellow-500" />
            <span className='text-[14px] text-[#525866] leading-none'>{order.rating.toFixed(1)}</span>
          </div>
        ) : (
          <span className="text-sm text-text-sub-400">‑</span>
        )}
      </Table.Cell>

      {/* -------- Status -------- */}
      <Table.Cell className=" align-center whitespace-nowrap">
        <div className='flex flex-row item-center gap-2 capitalize'>
          <Tag.Root
            variant="stroke"
            className='flex flex-row item-center gap-2 capitalize'
          >
            {order.status && (order.status === 'pending' || order.status === 'close' || order.status === 'dispute' || order.status === 'overdue') && (
              renderStatusIcon(order.status)
            )}
            {order.status}
          </Tag.Root>
        </div>
      </Table.Cell>

      {/* -------- Actions dropdown -------- */}
      <Table.Cell className=" text-right align-center whitespace-nowrap">
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
