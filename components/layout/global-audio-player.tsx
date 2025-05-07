'use client';

import React, { useState, useEffect } from 'react';
import { useAudioPlayer } from '@/contexts/AudioContext';
import * as Avatar from '@/components/ui/avatar';
import * as Slider from '@/components/ui/slider';
import {
  RiPlayFill,
  RiPauseFill,
  RiSkipBackFill,
  RiSkipForwardFill,
  RiHeart3Line,
  RiVolumeUpLine,
  RiVolumeDownLine,
  RiVolumeMuteLine,
  RiPlayList2Line,
} from '@remixicon/react';
import { cn } from '@/utils/cn';

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds === Infinity) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default function GlobalAudioPlayer() {
  const {
    currentTrack,
    currentSeller,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlayPause,
    seek,
    setVolume,
  } = useAudioPlayer();

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (currentTrack) {
      setIsVisible(true);
    }
  }, [currentTrack]);

  if (!currentTrack || !currentSeller) return null;

  const handleSeek = (value: number[]) => seek(value[0]);
  const handleVolumeChange = (value: number[]) => setVolume(value[0]);

  const getVolumeIcon = () => {
    if (volume === 0) return RiVolumeMuteLine;
    if (volume < 0.5) return RiVolumeDownLine;
    return RiVolumeUpLine;
  };
  const VolumeIcon = getVolumeIcon();

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-[9999]">
        {/* Toggle button - attached to the bar */}
        <div className="relative h-8 flex justify-end items-center">
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="flex items-center gap-2 bg-white border-t border-l border-r border-stroke-soft-200 shadow-md text-black px-6 py-2 rounded-t-xl shadow-md hover:bg-neutral-1600 transition-colors mr-[24px]"
            aria-label="Toggle player visibility"
          >
            <RiVolumeUpLine className="w-5 h-5" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 transform transition-transform ${isVisible ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Player UI */}
        {isVisible && (
          <div className="h-20 bg-white border-t border-stroke-soft-200 shadow-md px-4 md:px-6 flex items-center justify-between pt-[8px]">
            {/* Left: Track Info */}
            <div className="flex items-center gap-3 min-w-0 w-1/4">
              <Avatar.Root size="40">
                <Avatar.Image src={currentSeller.avatarUrl ?? undefined} alt={currentSeller.name} />
              </Avatar.Root>
              <div className="min-w-0">
                <p className="text-sm font-medium text-text-strong-950 truncate">{currentTrack.title}</p>
                <p className="text-xs text-text-secondary-600 truncate">{currentSeller.name}</p>
              </div>
            </div>

            {/* Center: Controls & Progress */}
            <div className="flex flex-col items-center justify-center flex-grow mx-4 md:mx-8">
              <div className="flex items-center gap-3 md:gap-4 mb-1">
                <button className="text-text-secondary-600 hover:text-text-strong-950 transition-colors">
                  <RiSkipBackFill className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button
                  onClick={togglePlayPause}
                  className="bg-gray-900 hover:bg-gray-700 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-colors"
                >
                  {isPlaying ? (
                    <RiPauseFill className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    <RiPlayFill className="w-4 h-4 md:w-5 md:h-5" />
                  )}
                </button>
                <button className="text-text-secondary-600 hover:text-text-strong-950 transition-colors">
                  <RiSkipForwardFill className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
              <div className="flex items-center gap-2 w-full max-w-md md:max-w-lg lg:max-w-xl">
                <span className="text-xs text-text-secondary-600 font-mono w-10 text-right">{formatTime(currentTime)}</span>
                <Slider.Root
                  value={[currentTime]}
                  max={duration || 0}
                  step={1}
                  onValueChange={handleSeek}
                  className="w-full cursor-pointer [&>span:first-of-type>span]:bg-black"
                >
                  <Slider.Thumb />
                </Slider.Root>
                <span className="text-xs text-text-secondary-600 font-mono w-10 text-left">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Right: Volume & Actions */}
            <div className="flex items-center gap-3 md:gap-4 w-1/4 justify-end">
              <button className="text-text-secondary-600 hover:text-red-500 transition-colors">
                <RiHeart3Line className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 w-24">
                <VolumeIcon className="w-5 h-5 text-text-secondary-600" />
                <Slider.Root
                  value={[volume]}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="w-full cursor-pointer [&>span:first-of-type>span]:bg-black"
                >
                  <Slider.Thumb />
                </Slider.Root>
              </div>
              <button className="text-text-secondary-600 hover:text-text-strong-950 transition-colors">
                <RiPlayList2Line className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
