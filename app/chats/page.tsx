'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/utils/supabase/AuthContext';
import { chatOperations, userOperations } from '@/utils/supabase/database';
import { Chat, User, Message } from '@/utils/supabase/types';
import ChatPopupWrapper from '@/components/chat/chat-popup-wrapper';
import ChatList from '@/components/chat/chat-list';
import ChatLoadingSkeleton from '@/components/chat/chat-loading-skeleton';

export default function ChatsPage() {
  const { user: currentUser, loading: authLoading } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [chatProfiles, setChatProfiles] = useState<Record<string, User | null>>({});
  const [currentUserProfile, setCurrentUserProfile] = useState<User | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedChatMessages, setSelectedChatMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading || !currentUser) {
      setIsLoading(!authLoading); // Set loading to false if not authenticated
      return;
    }

    const fetchInitialData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const currentUserId = currentUser.id;

        // Fetch user profile
        const userProfile = await userOperations.getUserById(currentUserId);
        setCurrentUserProfile(userProfile);

        // Fetch all chats for the current user
        const userChats = await chatOperations.getUserChats(currentUserId);
        setChats(userChats);

        // Fetch other user profiles for each chat
        const profiles: Record<string, User | null> = {};
        for (const chat of userChats) {
          const otherUserId = chat.buyer_id === currentUserId
            ? chat.seller_id
            : chat.buyer_id;
          const profile = await userOperations.getUserById(otherUserId);
          profiles[chat.id] = profile;
        }
        setChatProfiles(profiles);

      } catch (err: any) {
        console.error('Error fetching initial chat data:', err);
        setError(err.message || 'Failed to load initial chat data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [currentUser, authLoading]);

  // Effect to fetch messages when a chat is selected
  useEffect(() => {
    if (!selectedChatId || !currentUser) {
      setSelectedChatMessages([]); // Clear messages if no chat is selected
      return;
    }

    const fetchMessages = async () => {
      setIsLoadingMessages(true);
      try {
        const messages = await chatOperations.getChatMessages(selectedChatId);
        setSelectedChatMessages(messages);
      } catch (err: any) {
        console.error(`Error fetching messages for chat ${selectedChatId}:`, err);
        // Optionally set a specific message error state
      } finally {
        setIsLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [selectedChatId, currentUser]);

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId === selectedChatId ? null : chatId);
  };

  const getSelectedChat = () => {
    if (!selectedChatId) return null;
    return chats.find(c => c.id === selectedChatId);
  };

  const selectedChat = getSelectedChat();

  // Loading and Error States
  if (authLoading || isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-2xl font-bold">My Chats</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse rounded-lg border bg-gray-100 p-4 h-24"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <div className="p-4">Please log in to view your chats.</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">My Chats</h1>

      <ChatList
        chats={chats}
        chatProfiles={chatProfiles}
        selectedChatId={selectedChatId}
        onChatSelect={handleChatSelect}
      />

      {/* Chat popup - shown when a chat is selected and data is ready */}
      {selectedChat && currentUserProfile && (
        <ChatPopupWrapper
          key={selectedChat.id} // Add key to force re-render when chat changes
          chat={selectedChat}
          initialMessages={selectedChatMessages} // Pass fetched messages
          currentUserProfile={currentUserProfile}
          otherUserProfile={chatProfiles[selectedChat.id]}
          currentUserId={currentUser.id}
          isLoadingMessages={isLoadingMessages} // Pass loading state
          buttonLabel="Chat" // This is not actually used by ChatPopupWrapper, consider removing if unused elsewhere
          position="bottom-right"
        />
      )}
    </div>
  );
} 