'use client';

import React, { useState, useRef } from 'react';
import * as Badge from '@/components/ui/badge';
import { RiPlayCircleFill, RiPauseCircleFill, RiBookmarkLine } from '@remixicon/react';

interface WorkItemProps {
  url: string;
  title: string;
  remarks: string;
  duration?: string;
  bpm?: string;
  genres?: string[];
}

export function WorkItem({ url, title, remarks, duration, bpm, genres }: WorkItemProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [actualDuration, setActualDuration] = useState<string | null>(null);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || seconds === Infinity) return '--:--';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleMetadataLoaded = () => {
    if (audioRef.current) {
      setActualDuration(formatTime(audioRef.current.duration));
    }
  };

  return (
    <div className="flex items-center justify-between border-b border-stroke-soft-200 py-4 last:border-b-0">
      {/* 1. Play + Info */}
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlayPause}
          className="bg-bg-subtle-100 hover:bg-bg-subtle-200 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors"
        >
          {isPlaying ? (
            <RiPauseCircleFill className="size-8 text-text-strong-950" />
          ) : (
            <RiPlayCircleFill className="size-8 text-text-strong-950" />
          )}
        </button>
        <div>
          <p className="font-medium text-text-strong-950">{title}</p>
          <p className="text-xs text-text-secondary-600">{remarks}</p>
        </div>
        <audio
          ref={audioRef}
          src={url}
          onEnded={handleAudioEnd}
          onLoadedMetadata={handleMetadataLoaded}
          preload="metadata"
        />
      </div>

      {/* 2. Tags (middle split) */}
      <div className="hidden md:flex flex-wrap gap-1.5">
        {(genres ?? []).slice(0, 3).map((genre, idx) => (
          <Badge.Root
            key={idx}
            variant="light"
            size="medium"
            className="bg-[var(--bg-weak-100,#F6F8FA)] rounded-md border border-stroke-soft-300 text-gray-600 px-2 py-0.5"
          >
            {genre}
          </Badge.Root>
        ))}
      </div>

      {/* 3. Duration/BPM + Bookmark */}
      <div className="flex items-center gap-7">
        <div className="text-left">
          <p className="text-paragraph-sm text-gray-600">{actualDuration ?? '--:--'}</p>
          <p className="text-xs text-gray-600">{bpm ?? '-- BPM'}</p>
        </div>
        <button className="text-icon-secondary-400 hover:text-icon-primary-500 shrink-0">
          <RiBookmarkLine className="size-5" />
        </button>
      </div>
    </div>
  );
}
