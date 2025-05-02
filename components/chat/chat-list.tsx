import React from 'react';
import { Chat, User } from '@/utils/supabase/types';
import clsx from 'clsx';
import * as Avatar from '@/components/ui/avatar';
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

  // Return based on seconds ago, minutes ago, hours ago, days ago, weeks ago, months ago, years ago
  if (diffTime < 60 * 1000) {
    return 'Just now';
  } else if (diffTime < 60 * 60 * 1000) {
    return `${Math.floor(diffTime / (60 * 1000))} ${Math.floor(diffTime / (60 * 1000)) > 1 ? 'minutes' : 'minute'} ago`;
  } else if (diffTime < 24 * 60 * 60 * 1000) {
    return `${Math.floor(diffTime / (60 * 60 * 1000))} ${Math.floor(diffTime / (60 * 60 * 1000)) > 1 ? 'hours' : 'hour'} ago`;
  } else if (diffTime < 7 * 24 * 60 * 60 * 1000) {
    return `${Math.floor(diffTime / (24 * 60 * 60 * 1000))} ${Math.floor(diffTime / (24 * 60 * 60 * 1000)) > 1 ? 'days' : 'day'} ago`;
  } else if (diffTime < 30 * 24 * 60 * 60 * 1000) {
    return `${Math.floor(diffTime / (30 * 24 * 60 * 60 * 1000))} ${Math.floor(diffTime / (30 * 24 * 60 * 60 * 1000)) > 1 ? 'weeks' : 'week'} ago`;
  } else if (diffTime < 365 * 24 * 60 * 60 * 1000) {
    return `${Math.floor(diffTime / (30 * 24 * 60 * 60 * 1000))} ${Math.floor(diffTime / (30 * 24 * 60 * 60 * 1000)) > 1 ? 'months' : 'month'} ago`;
  } else {
    return `${Math.floor(diffTime / (365 * 24 * 60 * 60 * 1000))} ${Math.floor(diffTime / (365 * 24 * 60 * 60 * 1000)) > 1 ? 'years' : 'year'} ago`;
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
    <div className="flex flex-col px-4 gap-2 custom-scrollbar h-full">
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

          <div key={chat.id} className={`flex gap-3 p-2 items-center ${isSelected ? 'bg-[#F5F7FA]' : 'bg-white'} rounded-lg cursor-pointer`} onClick={() => onChatSelect(chat.id)}>
            <div>
              {otherUserProfile?.avatar_url && otherUserProfile?.avatar_url != "" ? (
                <Avatar.Root size='40'>
                  <Avatar.Image src={otherUserProfile?.avatar_url} alt={displayName} />
                  <Avatar.Indicator position='bottom'>
                    <Avatar.Status status='online' />
                  </Avatar.Indicator>
                </Avatar.Root>
              ) : (
                <Avatar.Root size='40' color='yellow'>
                  {displayInitial}
                </Avatar.Root>
              )}
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-[#525866] text-[12px] font-medium'>{displayName}</p>
              <p className='text-[#525866] text-[12px]'>{relativeTime}</p>
            </div>
          </div>
        );
      })}

    </div>
  );
} 