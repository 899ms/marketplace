'use client';

import React from 'react';
import Link from 'next/link';
import * as Table from '@/components/ui/table';
import OrderRowBuyer from '@/components/settings/OrderRowBuyer';
import OrderRowSeller from '@/components/settings/OrderRowSeller';
import { useTranslation } from 'react-i18next';

/* ------------------------------------------------------------------ */
/** Minimal local interfaces so this file can compile on its own.
 *  They duplicate what you already have in OrdersContent – feel free
 *  to centralise in a shared file later.
 */
interface PersonInfo {
  name: string;
  avatarUrl: string;
}
export interface BuyerEngagement {
  id: string;
  type: 'job' | 'contract';
  subject: string;
  price: number;
  currency: string;
  deadline: string;
  proposals?: number | null;
  worker: PersonInfo | null;
  status: string;
}
export interface SellerOrder {
  id: string;
  from: PersonInfo | null;
  subject: string;
  price: number;
  deadline: string;
  rating: number | null;
  status: string;
  currency: string;
}

/* ------------------------------------------------------------------ */
interface Props {
  /** current page slice already cut by parent */
  rows: (BuyerEngagement | SellerOrder)[];
  isBuyer: boolean;
}

/* ------------------------------------------------------------------ */
/** Renders the orders/services table with role‑specific columns.
 *  Row components encapsulate the heavy per‑row JSX.
 */
export default function OrdersTable({ rows, isBuyer }: Props) {
  const { t } = useTranslation('common');

  if (rows.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">{t('ordersTable.noOrders')}</div>
    );
  }

  return (
    <Table.Root className="min-w-full divide-y divide-stroke-soft-200">
      {/* ---------------- Header ---------------- */}
      <Table.Header className="bg-[#F5F7FA] rounded-lg ">
        <Table.Row className='bg-[#F5F7FA] rounded-lg'>
          {isBuyer ? (
            <>
              <Table.Head className="bg-[#F5F7FA] px-3 w-80 py-2 text-left text-[14px] text-[#525866] font-normal">
                {t('ordersTable.details')}
              </Table.Head>
              <Table.Head className="bg-[#F5F7FA] px-3 w-80 py-2 text-left text-[14px] text-[#525866] font-normal">
                {t('ordersTable.finalDeadline')}
              </Table.Head>
              {/* new Proposals column */}
              <Table.Head className="bg-[#F5F7FA] px-3 w-32 py-2 text-left text-[14px] text-[#525866] font-normal">
                {t('ordersTable.proposals')}
              </Table.Head>
              <Table.Head className="bg-[#F5F7FA] px-3 w-80 py-2 text-left text-[14px] text-[#525866] font-normal">
                {t('ordersTable.worker')}
              </Table.Head>
              <Table.Head className="bg-[#F5F7FA] px-3 w-32 py-2 text-left text-[14px] text-[#525866] font-normal">
                {t('ordersTable.status')}
              </Table.Head>
            </>
          ) : (
            <>
              <Table.Head className="bg-[#F5F7FA] px-4 py-3 text-left text-[14px] tracking-wider text-[#525866] font-normal">
                {t('ordersTable.from')}
              </Table.Head>
              <Table.Head className="bg-[#F5F7FA] px-4 py-3 text-left text-[14px] tracking-wider text-[#525866] font-normal">
                {t('ordersTable.details')}
              </Table.Head>
              <Table.Head className="bg-[#F5F7FA] px-4 py-3 text-left text-[14px] tracking-wider text-[#525866] font-normal">
                {t('ordersTable.finalDeadline')}
              </Table.Head>
              <Table.Head className="bg-[#F5F7FA] px-4 py-3 text-left text-[14px] tracking-wider text-[#525866] font-normal">
                {t('ordersTable.rating')}
              </Table.Head>
              <Table.Head className="bg-[#F5F7FA] px-4 py-3 text-left text-[14px] tracking-wider text-[#525866] font-normal">
                {t('ordersTable.status')}
              </Table.Head>
            </>
          )}
          {/* common EMPTY head for actions column */}
          <Table.Head className="bg-[#F5F7FA] px-4 py-3 text-right text-[14px] tracking-wider text-[#525866]" />
        </Table.Row>
      </Table.Header>

      {/* ---------------- Body ---------------- */}
      <Table.Body className="">
        {rows.map((row) =>
          isBuyer ? (
            <OrderRowBuyer key={row.id} engagement={row as BuyerEngagement} />
          ) : (
            <OrderRowSeller key={row.id} order={row as SellerOrder} />
          ),
        )}
      </Table.Body>
    </Table.Root>
  );
}
