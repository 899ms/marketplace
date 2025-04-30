import React from 'react';
import { Chat, User } from '@/utils/supabase/types';

interface ChatListProps {
  chats: Chat[];
  chatProfiles: Record<string, User | null>;
  selectedChatId: string | null;
  onChatSelect: (chatId: string) => void;
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
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  if (chats.length === 0) {
    return (
      <div className="rounded-lg border p-6 text-center">
        <p className="text-lg text-gray-500">You don't have any chats yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {chats.map((chat) => {
        const otherUserProfile = chatProfiles[chat.id];
        const otherUserName = otherUserProfile?.username || 'User';
        const isSelected = selectedChatId === chat.id;

        return (
          <div
            key={chat.id}
            className={`cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${isSelected ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            onClick={() => onChatSelect(chat.id)}
          >
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700 dark:bg-blue-800 dark:text-blue-200">
                {otherUserName[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <h3 className="font-medium">{otherUserName}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Created: {formatDate(chat.created_at)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 