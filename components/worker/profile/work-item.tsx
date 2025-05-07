'use client';

import React from 'react';
import { useAudioPlayer } from '@/contexts/AudioContext';
import * as Badge from '@/components/ui/badge';
import { RiPlayCircleFill, RiPauseCircleFill, RiBookmarkLine } from '@remixicon/react';
import { Bookmark } from 'lucide-react';

interface WorkItemProps {
  url: string;
  title: string;
  remarks: string;
  sellerName: string;
  sellerAvatarUrl: string | null;
  duration?: string;
  bpm?: string;
  genres?: string[];
}

export function WorkItem({ url, title, remarks, sellerName, sellerAvatarUrl, duration, bpm, genres }: WorkItemProps) {
  const {
    loadTrack,
    currentTrack,
    currentSeller,
    isPlaying,
    togglePlayPause
  } = useAudioPlayer();

  const isActiveTrack = currentTrack?.url === url;

  const handlePlayClick = () => {
    if (isActiveTrack) {
      togglePlayPause(); // Just toggle state
    } else {
      loadTrack(
        { url, title, remarks },
        { name: sellerName, avatarUrl: sellerAvatarUrl }
      );
    }
  };

  return (
    <div className="flex items-center justify-between py-[12px]">
      {/* 1. Play + Info */}
      <div className="flex items-center gap-2.5 w-[200px]">
        <button
          onClick={handlePlayClick}
          className="bg-bg-subtle-100 hover:bg-bg-subtle-200 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors"
        >
          {isActiveTrack && isPlaying ? (
            <RiPauseCircleFill className="size-8 text-[#525866]" />
          ) : (
            <RiPlayCircleFill className="size-8 text-[#525866]" />
          )}
        </button>
        <div className="min-w-0">
          <p className="text-[14px] font-medium text-text-strong-950 truncate">{title}</p>
          <p className="text-[12px] text-[#99A0AE] truncate">{remarks}</p>
        </div>
      </div>

      {/* 2. Tags (middle split) */}
      <div className="hidden md:flex flex-wrap gap-1.5">
        {(genres ?? []).slice(0, 3).map((genre, idx) => (
          <Badge.Root
            key={idx}
            variant="light"
            size="medium"
            className="bg-[#F6F8FA] font-medium rounded-md text-[#525866] px-2 py-1"
          >
            {genre}
          </Badge.Root>
        ))}
      </div>

      {/* 3. Duration/BPM + Bookmark */}
      <div className="flex items-center w-[125px] justify-between ">
        <div className="text-left text-[#525866] text-[12px]">
          <p className="">{duration ?? '--:--'}</p>
          <p className="">{bpm ?? '-- BPM'}</p>
        </div>
        <button className="text-[#525866] hover:text-icon-primary-500 shrink-0">
          <Bookmark className="w-[16px] h-[14px] text-[#525866]" />
        </button>
      </div>
    </div>
  );
}
