'use client';

import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation'; // No longer needed for redirection
import { useAuth } from '@/utils/supabase/AuthContext';
import { chatOperations, userOperations } from '@/utils/supabase/database';
import { Chat, User, Message } from '@/utils/supabase/types';
import ChatPopupWrapper from '@/components/chat/chat-popup-wrapper';
import ChatList from '@/components/chat/chat-list';

export default function ChatsPage() {
  const { user: currentUser, loading: authLoading } = useAuth();
  // const router = useRouter(); // Removed
  const [chats, setChats] = useState<Chat[]>([]);
  const [chatProfiles, setChatProfiles] = useState<Record<string, User | null>>({});
  const [currentUserProfile, setCurrentUserProfile] = useState<User | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedChatMessages, setSelectedChatMessages] = useState<Message[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // // Effect for redirection based on auth state - REMOVED
  // useEffect(() => {
  //   if (!authLoading && !currentUser) {
  //     router.push('/');
  //   }
  // }, [currentUser, authLoading, router]);

  // Effect to fetch initial chat data *only* if logged in
  useEffect(() => {
    // Only proceed if authentication is not loading and user is logged in
    // Middleware handles the redirect, so we only need to check if currentUser exists before fetching
    if (authLoading || !currentUser) {
      setIsLoadingData(false);
      return;
    }

    const fetchInitialData = async () => {
      setIsLoadingData(true);
      setError(null);
      try {
        const currentUserId = currentUser.id;
        const [userProfile, userChats] = await Promise.all([
          userOperations.getUserById(currentUserId),
          chatOperations.getUserChats(currentUserId),
        ]);

        setCurrentUserProfile(userProfile);
        setChats(userChats);

        const profilePromises = userChats.map(chat => {
          const otherUserId = chat.buyer_id === currentUserId
            ? chat.seller_id
            : chat.buyer_id;
          return userOperations.getUserById(otherUserId).then(profile => ({ chatId: chat.id, profile }));
        });

        const profilesResults = await Promise.all(profilePromises);
        const profiles: Record<string, User | null> = profilesResults.reduce((acc, { chatId, profile }) => {
          acc[chatId] = profile;
          return acc;
        }, {} as Record<string, User | null>);

        setChatProfiles(profiles);

      } catch (err: any) {
        console.error('Error fetching initial chat data:', err);
        setError(err.message || 'Failed to load initial chat data');
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchInitialData();
    // Ensure dependency array only relies on necessary variables for fetching
  }, [currentUser, authLoading]);

  // Effect to fetch messages when a chat is selected
  useEffect(() => {
    // Only fetch if logged in and a chat is selected
    if (!selectedChatId || !currentUser || authLoading) {
      setSelectedChatMessages([]);
      return;
    }

    const fetchMessages = async () => {
      setIsLoadingMessages(true);
      try {
        const messages = await chatOperations.getChatMessages(selectedChatId);
        setSelectedChatMessages(messages);
      } catch (err: any) {
        console.error(`Error fetching messages for chat ${selectedChatId}:`, err);
      } finally {
        setIsLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [selectedChatId, currentUser, authLoading]); // Dependency array remains the same

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId === selectedChatId ? null : chatId);
  };

  // --- Add function to close the chat popup ---
  const handleCloseChat = () => {
    setSelectedChatId(null);
  };
  // --- End added function ---

  const getSelectedChat = () => {
    if (!selectedChatId) return null;
    return chats.find(c => c.id === selectedChatId);
  };

  const selectedChat = getSelectedChat();

  // Loading State: Show loading if auth is loading OR initial data is loading
  // If middleware redirects, this component might unmount before rendering, but this is still good practice.
  if (authLoading || isLoadingData) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-2xl font-bold">My Chats</h1>
        <div className="animate-pulse rounded-lg border bg-gray-100 p-4 h-24 dark:bg-gray-700"></div>
      </div>
    );
  }

  // Middleware should prevent rendering if !currentUser, but this is a safeguard
  if (!currentUser) {
    // This case should ideally not be reached if middleware is working correctly
    return null;
  }

  // Error State
  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  // --- Render actual content only if loaded and authenticated ---
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">My Chats</h1>

      {chats.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">You have no chats yet.</p>
      ) : (
        <ChatList
          chats={chats}
          chatProfiles={chatProfiles}
          selectedChatId={selectedChatId}
          onChatSelect={handleChatSelect}
        />
      )}

      {/* Chat popup */}
      {selectedChat && currentUserProfile && (
        <ChatPopupWrapper
          key={selectedChat.id}
          chat={selectedChat}
          initialMessages={selectedChatMessages}
          currentUserProfile={currentUserProfile}
          otherUserProfile={chatProfiles[selectedChat.id]}
          currentUserId={currentUser.id}
          isLoadingMessages={isLoadingMessages}
          position="bottom-right"
          onClose={handleCloseChat}
        />
      )}
    </div>
  );
} 