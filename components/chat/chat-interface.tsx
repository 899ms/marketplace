import React, { useState, useEffect, useRef, useCallback } from 'react';
import supabase from '@/utils/supabase/client';
import { chatOperations } from '@/utils/supabase/database';
import { Chat, Message, User, MessageSchema } from '@/utils/supabase/types';
import { format } from 'date-fns';

interface ChatInterfaceProps {
  chat: Chat;
  initialMessages: Message[];
  currentUserProfile: User | null;
  otherUserProfile: User | null;
  currentUserId: string;
}

export default function ChatInterface({
  chat,
  initialMessages,
  currentUserProfile,
  otherUserProfile,
  currentUserId,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    chatOperations.markMessagesAsRead(chat.id, currentUserId);

    const channel = supabase
      .channel(`chat_${chat.id}`)
      .on<Message>(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${chat.id}`,
        },
        (payload) => {
          try {
            const parsedMessage = MessageSchema.parse(payload.new);
            setMessages((currentMessages) => {
              if (currentMessages.some((m) => m.id === parsedMessage.id)) {
                return currentMessages;
              }
              return [...currentMessages, parsedMessage];
            });
            if (parsedMessage.sender_id !== currentUserId) {
              chatOperations.markMessagesAsRead(chat.id, currentUserId);
            }
            scrollToBottom();
          } catch (subError) {
            console.error(
              'Failed to parse incoming message:',
              subError,
              payload.new,
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chat.id, currentUserId, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    const content = newMessage.trim();
    setNewMessage('');

    try {
      const sentMessage = await chatOperations.sendMessage({
        chat_id: chat.id,
        sender_id: currentUserId,
        content: content,
      });

      if (!sentMessage) {
        console.error('Failed to send message');
        setNewMessage(content);
      } else {
        scrollToBottom();
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setNewMessage(content);
    } finally {
      setIsSending(false);
    }
  };

  const getInitials = (name?: string | null) => {
    return name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
      : 'U';
  };

  return (
    <div className='flex h-[calc(100vh-theme(space.16))] flex-col bg-white dark:bg-gray-900'>
      <div className='border-b border-gray-200 p-4 dark:border-gray-700'>
        <div className='flex items-center space-x-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 font-semibold text-gray-700 dark:bg-gray-600 dark:text-gray-200'>
            {getInitials(otherUserProfile?.full_name)}
          </div>
          <span className='font-medium text-gray-800 dark:text-gray-200'>
            {otherUserProfile?.username ?? 'User'}
          </span>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto p-4'>
        <div className='space-y-4'>
          {messages.map((message) => {
            const isCurrentUser = message.sender_id === currentUserId;
            const profile = isCurrentUser
              ? currentUserProfile
              : otherUserProfile;
            return (
              <div
                key={message.id}
                className={`flex items-end space-x-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}
                >
                  <p className='text-sm'>{message.content}</p>
                  <p className='mt-1 text-right text-[10px] opacity-70'>
                    {format(new Date(message.created_at!), 'p')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div ref={messagesEndRef} />
      </div>

      <div className='border-t border-gray-200 p-4 dark:border-gray-700'>
        <form
          onSubmit={handleSendMessage}
          className='flex items-center space-x-2'
        >
          <input
            type='text'
            placeholder='Type your message...'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={isSending}
            className='flex-1 rounded-full border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white'
            autoComplete='off'
          />
          <button
            type='submit'
            disabled={!newMessage.trim() || isSending}
            className='rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50'
          >
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
