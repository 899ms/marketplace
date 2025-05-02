'use client';

import React from 'react';
import Image from 'next/image';
import * as Badge from '@/components/ui/badge';
import { cn } from '@/utils/cn';
import type { Service } from '@/utils/supabase/types';

interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  const statusTags = [
    { text: 'Not Yet Published', variant: 'warning' as const },
    { text: 'To be improved', variant: 'info' as const },
  ];
  const ordersCount = 15;
  const salesAmount = 0;
  const favoritesCount = 0;
  const imageUrl = service.images?.[0]?.url || 'https://via.placeholder.com/150/771796';
  const currencySymbol = service.currency === 'CNY' ? '¥' : '$';

  return (
    <div className="flex items-center gap-4 rounded-lg border border-stroke-soft-200 bg-bg-white-0 p-4 shadow-sm">
      <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-md bg-gray-100">
        <Image
          src={imageUrl}
          alt={service.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex-1">
        <h3 className="mb-1 font-medium text-text-strong-950 line-clamp-1">
          {service.title}
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          {statusTags.map((tag) => (
            <Badge.Root
              key={tag.text}
              variant="lighter"
              size="small"
              className={cn(
                'capitalize',
                tag.variant === 'warning' && 'bg-orange-100 text-orange-700',
                tag.variant === 'info' && 'bg-blue-100 text-blue-700',
              )}
            >
              {tag.text}
            </Badge.Root>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-6 text-right">
        <div className="flex flex-col">
          <span className="font-medium text-text-strong-950">
            {currencySymbol}
            {service.price.toLocaleString()}
          </span>
          <span className="text-xs text-text-sub-500">Price</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-text-strong-950">{ordersCount}</span>
          <span className="text-xs text-text-sub-500">Orders</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-text-strong-950">
            {currencySymbol}
            {salesAmount.toLocaleString()}
          </span>
          <span className="text-xs text-text-sub-500">Sales amount</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-text-strong-950">{favoritesCount}</span>
          <span className="text-xs text-text-sub-500">Favorites</span>
        </div>
      </div>
    </div>
  );
}
