import React from 'react';
import { Chat, User } from '@/utils/supabase/types';
import clsx from 'clsx';

interface ChatListProps {
  chats: Chat[];
  chatProfiles: Record<string, User | null>;
  selectedChatId: string | null;
  onChatSelect: (chatId: string) => void;
  currentUserId: string;
  // TODO: Add last_message_at prop once data fetching is updated
  // last_message_at?: string | null; 
}

// Helper function to format relative time
const formatRelativeTime = (dateString?: string | null): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // Format time if it's today
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays <= 7) {
    // Format as day of the week if within the last 7 days
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  } else {
    // Format as short date if older than a week
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

export default function ChatList({
  chats,
  chatProfiles,
  selectedChatId,
  onChatSelect,
  currentUserId,
}: ChatListProps) {
  // Helper function to format date
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    // Simple date format for list view
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (chats.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-text-secondary-600">You don't have any chats yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {chats.map((chat) => {
        const otherUserProfile = chatProfiles[chat.id];
        // Use full_name, fallback to username, then 'Unknown User'
        const displayName = otherUserProfile?.full_name || otherUserProfile?.username || 'Unknown User';
        const displayInitial = displayName[0]?.toUpperCase() || '?';
        const isSelected = selectedChatId === chat.id;

        // TODO: Replace chat.created_at with actual last message timestamp when available
        const lastActivityTime = chat.created_at;
        const relativeTime = formatRelativeTime(lastActivityTime);

        return (
          // Apply styling for row layout
          <div
            key={chat.id}
            className={clsx(
              'flex cursor-pointer items-start gap-3 border-b border-stroke-soft-200 px-4 py-3 transition-colors hover:bg-bg-subtle-100', // Use items-start for alignment
              isSelected ? 'bg-bg-subtle-100' : 'bg-bg-white-0'
            )}
            onClick={() => onChatSelect(chat.id)}
          >
            {/* Avatar */}
            <div className="shrink-0 pt-1"> {/* Add padding-top to align avatar with text */}
              {otherUserProfile?.avatar_url ? (
                <img src={otherUserProfile.avatar_url} alt={displayName} className="size-10 rounded-full object-cover" />
              ) : (
                <div className="flex size-10 items-center justify-center rounded-full bg-bg-subtle-200 font-medium text-text-secondary-600">
                  {displayInitial}
                </div>
              )}
              {/* TODO: Add online indicator later */}
            </div>

            {/* Name and Last Activity Time */}
            <div className="flex-1 overflow-hidden">
              <div className="flex items-baseline justify-between">
                <h3 className="truncate font-medium text-text-strong-950">{displayName}</h3>
                {/* Display relative time */}
                <span className="ml-2 shrink-0 text-paragraph-xs text-text-sub-400">{relativeTime}</span>
              </div>
              {/* TODO: Add last message preview text here later */}
              <p className="truncate text-paragraph-sm text-text-secondary-600">
                {/* Placeholder for last message text */}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
} 