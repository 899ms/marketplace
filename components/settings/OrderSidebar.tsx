'use client';

import React from 'react';
import Link from 'next/link';
import * as Avatar from '@/components/ui/avatar';
import * as AvatarGroup from '@/components/ui/avatar-group';
import * as Divider from '@/components/ui/divider';
import * as Button from '@/components/ui/button';
import * as Badge from '@/components/ui/badge';
import {
  RiStarFill,
  RiStarSFill,
  RiHeart3Line,
  RiSendPlane2Fill,
  RiPencilLine,
  RiTwitchFill,
  RiTwitterXFill,
  RiGoogleFill,
} from '@remixicon/react';

/* ------------------------------------------------------------------ */
/** Right‑hand “seller profile” card originally embedded in your file.
 *  It’s purely cosmetic and role‑agnostic.
 */
export default function OrderSidebar() {
  /* static placeholder data – you’ll likely swap with real API later */
  const user = {
    name: 'Cleve Music',
    avatarUrl: 'https://via.placeholder.com/80',
    rating: 4.9,
    reviews: 125,
    about:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s…",
  };

  const tags = [
    'Grammy',
    'Billboard Music',
    'American Music',
    'BRIT',
    'MTV Music',
    'Eurovision Awards',
  ];

  const reviewAvatars = [
    'https://i.pravatar.cc/40?img=32',
    'https://i.pravatar.cc/40?img=45',
    'https://i.pravatar.cc/40?img=12',
  ];

  return (
    <aside className="hidden w-full max-w-[352px] shrink-0 lg:block">
      <div className="sticky top-20 flex flex-col gap-4 rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-4 shadow-sm">
        {/* ---------- Profile ---------- */}
        <div className="flex flex-col items-center gap-3 text-center">
          <Avatar.Root size="80" className="relative">
            <Avatar.Image src={user.avatarUrl} alt={user.name} />
            <Avatar.Indicator position="bottom">
              <Avatar.Status status="online" />
            </Avatar.Indicator>
          </Avatar.Root>

          <div>
            <h2 className="text-label-lg font-medium text-text-strong-950">
              {user.name}
            </h2>
            <div className="mt-1 flex items-center justify-center gap-1">
              <RiStarFill className="size-3.5 text-yellow-400" />
              <span className="text-paragraph-xs text-text-secondary-600">
                {user.rating} ({user.reviews})
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <RiGoogleFill className="size-5 text-text-sub-600" />
            Google
            <RiGoogleFill className="size-5 text-text-sub-600" />
            Google
          </div>
        </div>

        {/* ---------- Follow / Touch buttons ---------- */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <Button.Root
            variant="neutral"
            mode="stroke"
            size="xsmall"
            className="flex h-[32px] w-[85px] items-center justify-center gap-[6px] rounded-lg border border-stroke-soft-200 bg-bg-white-0 px-2 shadow-sm"
          >
            <span className="text-paragraph-xs">Follow</span>
            <Button.Icon as={RiHeart3Line} className="size-[18px]" />
          </Button.Root>

          <Button.Root
            variant="neutral"
            mode="filled"
            size="xsmall"
            className="flex h-[32px] w-[83px] items-center justify-center gap-[6px] rounded-lg border border-[#242628] bg-[#20232D] px-2 shadow-md"
          >
            <span className="text-paragraph-xs text-bg-white-0">Touch</span>
            <Button.Icon as={RiSendPlane2Fill} className="size-[18px]" />
          </Button.Root>
        </div>

        {/* ---------- Recent reviews ---------- */}
        <div>
          <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-1 text-label-md font-medium text-text-strong-950">
              <RiStarSFill className="size-6" />
              <span>Recent reviews</span>
            </div>

            <div className="mt-1 flex items-center gap-2 sm:mt-0">
              <AvatarGroup.Root size="24">
                {reviewAvatars.map((src) => (
                  <Avatar.Root key={src} size="24">
                    <Avatar.Image src={src} />
                  </Avatar.Root>
                ))}
              </AvatarGroup.Root>
              <span className="text-paragraph-xs text-text-secondary-600">
                +4
              </span>
            </div>
          </div>
        </div>

        <Divider.Root />

        {/* ---------- Tags ---------- */}
        <div>
          <h3 className="mb-2 text-label-md font-medium text-text-strong-950">
            Tags
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge.Root
                key={tag}
                variant="light"
                size="medium"
                className="rounded-md border border-stroke-soft-300 bg-white px-2 py-0.5 text-gray-600"
              >
                {tag}
              </Badge.Root>
            ))}
          </div>
        </div>

        <Divider.Root />

        {/* ---------- About ---------- */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-label-md font-medium text-text-strong-950">
              About
            </h3>
            <button className="text-icon-secondary-400 hover:text-icon-primary-500">
              <RiPencilLine className="size-4" />
            </button>
          </div>
          <p className="line-clamp-5 text-paragraph-sm text-gray-600">
            {user.about}
          </p>
        </div>

        {/* ---------- Social links ---------- */}
        <div className="flex items-center gap-3 border-t border-stroke-soft-200 pt-4">
          <Link
            href="#"
            className="text-icon-secondary-400 hover:text-icon-primary-500"
          >
            <RiTwitchFill className="size-5" />
          </Link>
          <Link
            href="#"
            className="text-icon-secondary-400 hover:text-icon-primary-500"
          >
            <RiTwitterXFill className="size-5" />
          </Link>
          <Link
            href="#"
            className="text-icon-secondary-400 hover:text-icon-primary-500"
          >
            <RiGoogleFill className="size-5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
