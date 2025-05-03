'use client';

import React from 'react';
import Image from 'next/image';
import * as Badge from '@/components/ui/badge';
import { cn } from '@/utils/cn';
import type { Service } from '@/utils/supabase/types';
import * as Tag from '@/components/ui/tag';

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
    <div className="flex items-center justify-between gap-2 rounded-lg bg-bg-white-0 p-0 shadow-sm">
      <div className='flex items-center gap-4'>
        <div className="relative h-[120px] w-[148px] shrink-0 overflow-hidden rounded-md bg-gray-100">
          <Image
            src={imageUrl}
            alt={service.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col gap-6 items-start justify-center">
          <h3 className="mb-1 text-[20px] font-medium text-[#0E121B] line-clamp-1">
            {service.title}
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            {statusTags.map((tag) => (
              <Tag.Root
                key={tag.text}
                variant="gray"
                className='bg-[#F2F5F8] text-[#525866] text-[12px] font-medium'
              >
                {tag.text}
              </Tag.Root>
            ))}
          </div>
        </div>


      </div>

      <div className="flex shrink-0 items-center gap-16 text-right">
        <div className="flex flex-col">
          <span className="text-[#0E121B] text-[16px] font-normal">
            {currencySymbol}
            {service.price.toLocaleString()}
          </span>
          <span className="text-[12px] text-[#525866] font-medium">Price</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[#0E121B] text-[16px] font-normal">{ordersCount}</span>
          <span className="text-[12px] text-[#525866] font-medium">Orders</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[#0E121B] text-[16px] font-normal">
            {`${currencySymbol} ${salesAmount.toLocaleString()}`}
          </span>
          <span className="text-[12px] text-[#525866] font-medium">Sales amount</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[#0E121B] text-[16px] font-normal">{favoritesCount}</span>
          <span className="text-[12px] text-[#525866] font-medium">Favorites</span>
        </div>
      </div>
    </div>
  );
}
