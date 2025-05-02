'use client';

import React from 'react';
import Link from 'next/link';

export interface SummaryData {
  milestone: {
    title: string;
    description: string;
    learnMoreLink: string;
    icon: React.ReactNode;
  };
  totalAmount: { title: string; value: string; actions?: React.ReactNode };
  settled: { title: string; value: string };
  inEscrow: { title: string; value: string };
}

interface Props {
  data: SummaryData;
}

/* ------------------------------------------------------------------ */
/* Milestone card (¼) + money summary card (¾) — all text = 12 px      */
/* ------------------------------------------------------------------ */
export default function SummarySection({ data }: Props) {
  return (
    <div className="mb-6 grid gap-4 grid-cols-1 lg:grid-cols-4 text-[12px]">
      {/* ─────────── Milestone (¼) ─────────── */}
      <div className="rounded-lg border border-stroke-soft-200 bg-[var(--bg-weak-50,#F5F7FA)] p-4 shadow-sm lg:col-span-1">
        <div className="flex items-start gap-3">

          <div>
            <span className="h-8 w-8 shrink-0">{data.milestone.icon}</span>
            <span className="font-medium text-text-strong-950">
              {data.milestone.title}
            </span>
            <p className="mt-1 text-gray-600">
              {data.milestone.description}{' '}
              <Link
                href={data.milestone.learnMoreLink}
                className="underline underline-offset-2 text-gray-600"
              >
                Learn&nbsp;More
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ─────────── Money summary (¾) ─────────── */}
      <div className="rounded-lg border border-stroke-soft-200 bg-[var(--bg-weak-50,#F5F7FA)] p-4 shadow-sm lg:col-span-3">
        <div className="grid grid-cols-3 gap-6">
          {/* Total Amount */}
          <div>
            <h4 className="font-medium text-gray-600">{data.totalAmount.title}</h4>
            <div className="flex  gap-2">
              <p className="text-[18px] mt-1 font-semibold text-text-strong-950">
                {data.totalAmount.value}
              </p>
              {data.totalAmount.actions && (
                <div className="mt-1 flex gap-3 text-blue-600">
                  {data.totalAmount.actions}
                </div>
              )}
            </div>
          </div>

          {/* Settled */}
          <div>
            <h4 className="font-medium text-gray-600">{data.settled.title}</h4>
            <p className="text-[18px] mt-1 font-semibold text-text-strong-950">
              {data.settled.value}
            </p>
          </div>

          {/* In Escrow */}
          <div>
            <h4 className="font-medium text-gray-600">{data.inEscrow.title}</h4>
            <p className="text-[18px] mt-1 font-semibold text-text-strong-950">
              {data.inEscrow.value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
