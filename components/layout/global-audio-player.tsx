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
  RiArrowUpSLine,
  RiArrowDownSLine,
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

  // Don't render anything if no track is loaded OR if hidden
  if (!currentTrack || !currentSeller) {
    return null;
  }

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
      {currentTrack && currentSeller && (
        <div
          className={cn(
            'fixed left-1/2 transform -translate-x-1/2 z-[9999]',
            isVisible ? 'bottom-[4.2rem]' : 'bottom-[.2rem]'
          )}
        >
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="w-12 h-12 flex items-center justify-center"
            aria-label="Toggle player visibility"
          >
            {isVisible ? (
              <RiArrowDownSLine className="w-7 h-7 text-gray-700" />
            ) : (
              <RiArrowUpSLine className="w-7 h-7 text-gray-700" />
            )}
          </button>
        </div>
      )}


      {isVisible && (

        <div className="fixed bottom-0 left-0 right-0 z-[9999] h-20 bg-white border-t border-stroke-soft-200 shadow-md px-4 md:px-6 flex items-center justify-between">
          {/* Left: Track Info */}
          <div className="flex items-center gap-3 min-w-0 w-1/4">
            <Avatar.Root size="40">
              <Avatar.Image
                src={currentSeller.avatarUrl ?? undefined}
                alt={currentSeller.name}
              />
              {/* Add Fallback if needed */}
            </Avatar.Root>
            <div className="min-w-0">
              <p className="text-sm font-medium text-text-strong-950 truncate">{currentTrack.title}</p>
              {/* Subtitle can be remarks or seller name */}
              <p className="text-xs text-text-secondary-600 truncate">{currentSeller.name}</p>
            </div>
          </div>

          {/* Center: Player Controls & Progress */}
          <div className="flex flex-col items-center justify-center flex-grow mx-4 md:mx-8">
            {/* Controls */}
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
            {/* Progress Bar */}
            <div className="flex items-center gap-2 w-full max-w-md md:max-w-lg lg:max-w-xl">
              <span className="text-xs text-text-secondary-600 font-mono w-10 text-right">{formatTime(currentTime)}</span>
              <Slider.Root
                value={[currentTime]}
                max={duration || 0}
                step={1}
                onValueChange={handleSeek} // Use onValueChange for continuous seeking
                className="w-full cursor-pointer [&>span:first-of-type>span]:bg-black"
              >
                {/* Pass Thumb as children */}
                <Slider.Thumb />
              </Slider.Root>
              <span className="text-xs text-text-secondary-600 font-mono w-10 text-left">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right: Actions & Volume */}
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
                onValueChange={handleVolumeChange} // Use onValueChange
                className="w-full cursor-pointer [&>span:first-of-type>span]:bg-black"
              >
                {/* Pass Thumb as children */}
                <Slider.Thumb />
              </Slider.Root>
            </div>
            <button className="text-text-secondary-600 hover:text-text-strong-950 transition-colors">
              <RiPlayList2Line className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
