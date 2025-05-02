import React from 'react';
import { Chat, User } from '@/utils/supabase/types';
import clsx from 'clsx';

interface ChatListProps {
  chats: Chat[];
  chatProfiles: Record<string, User | null>;
  selectedChatId: string | null;
  onChatSelect: (chatId: string) => void;
  currentUserId: string;
}

export default function ChatList({
  chats,
  chatProfiles,
  selectedChatId,
  onChatSelect,
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

        // TODO: Fetch last message preview later
        const lastMessagePreview = "Last message preview..."; // Placeholder
        const lastMessageTime = chat.created_at; // Placeholder - use actual last message time later

        return (
          // Apply styling for row layout
          <div
            key={chat.id}
            className={clsx(
              'flex cursor-pointer items-center gap-3 border-b border-stroke-soft-200 px-4 py-3 transition-colors hover:bg-bg-subtle-100',
              isSelected ? 'bg-bg-subtle-100' : 'bg-bg-white-0'
            )}
            onClick={() => onChatSelect(chat.id)}
          >
            {/* Avatar */}
            <div className="shrink-0">
              {otherUserProfile?.avatar_url ? (
                <img src={otherUserProfile.avatar_url} alt={displayName} className="size-10 rounded-full object-cover" />
              ) : (
                <div className="flex size-10 items-center justify-center rounded-full bg-bg-subtle-200 font-medium text-text-secondary-600">
                  {displayInitial}
                </div>
              )}
              {/* TODO: Add online indicator later */}
            </div>

            {/* Name and Message Preview */}
            <div className="flex-1 overflow-hidden">
              <div className="flex items-baseline justify-between">
                <h3 className="truncate font-medium text-text-strong-950">{displayName}</h3>
                <span className="ml-2 shrink-0 text-paragraph-xs text-text-sub-400">{formatDate(lastMessageTime)}</span>
              </div>
              <p className="truncate text-paragraph-sm text-text-secondary-600">{lastMessagePreview}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
} 