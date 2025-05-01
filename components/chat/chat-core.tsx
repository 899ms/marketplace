import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import supabase from '@/utils/supabase/client';
import { chatOperations } from '@/utils/supabase/database';
import { Chat, Message, User, MessageSchema, BaseFileData } from '@/utils/supabase/types';
import {
  ImageMessageData,
  OfferMessageData,
  MilestoneEventData,
  SystemEventData,
} from '@/utils/supabase/message-data-types';
import { format, isSameDay, formatRelative, parseISO, isToday, isYesterday } from 'date-fns';
import { Root as Avatar, Image as AvatarImage } from '@/components/ui/avatar';
import { Root as Button } from '@/components/ui/button';
import { Root as Textarea } from '@/components/ui/textarea';
import { Root as LinkButton } from '@/components/ui/link-button';
import * as FancyButtonModule from '@/components/ui/fancy-button';
import { Paperclip, Send, Smile, MoreVertical, Clock, XCircle, FileImage, CheckCircle } from 'lucide-react';
import Link from 'next/link';

function formatMessageTimestamp(timestamp: string | null | undefined): string {
  if (!timestamp) return '';
  try {
    const date = parseISO(timestamp);
    return format(date, 'p');
  } catch (error) {
    console.error('Error formatting timestamp:', error);
    return '';
  }
}

function formatDateSeparator(dateKey: string | null | undefined): string {
  if (!dateKey) return 'Date Unknown';
  try {
    const date = parseISO(dateKey);

    if (isToday(date)) {
      return 'Today';
    }
    if (isYesterday(date)) {
      return 'Yesterday';
    }
    return format(date, 'MMM d, yyyy');

  } catch (error) {
    console.error('Error formatting date separator:', error);
    return 'Date Error';
  }
}

interface GroupedMessages {
  [date: string]: Message[];
}

function groupMessagesByDate(messages: Message[]): GroupedMessages {
  return messages.reduce((groups, message) => {
    if (!message.created_at) return groups;
    const messageDate = parseISO(message.created_at);
    const dateKey = format(messageDate, 'yyyy-MM-dd');
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(message);
    return groups;
  }, {} as GroupedMessages);
}

interface ChatCoreProps {
  chat: Chat;
  initialMessages: Message[];
  currentUserProfile: User | null;
  otherUserProfile: User | null;
  currentUserId: string;
  isPopup?: boolean;
  onClose?: () => void;
}

interface ChatMessageRendererProps {
  message: Message;
  isCurrentUser: boolean;
  senderProfile: User | null;
  timestamp: string;
  senderName: string;
}

function ChatMessageRenderer({
  message,
  isCurrentUser,
  senderProfile,
  timestamp,
  senderName,
}: ChatMessageRendererProps) {
  const alignmentContainerClass = isCurrentUser ? 'justify-end' : 'justify-start';
  const alignmentItemsClass = isCurrentUser ? 'items-end' : 'items-start';
  const bubbleBaseClass = 'p-3 rounded-xl shadow-sm';
  const userBubbleClass = 'bg-blue-500 text-white rounded-br-none';
  const otherBubbleClass = 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none';

  const bubbleClass = isCurrentUser ? userBubbleClass : otherBubbleClass;
  const cardClass = 'border dark:border-gray-600 rounded-lg p-3 max-w-xs w-full bg-white dark:bg-gray-800 shadow-md';
  const cardTextColor = 'text-gray-900 dark:text-gray-100';
  const cardSubTextColor = 'text-gray-600 dark:text-gray-400';
  const plainTextColor = 'text-gray-800 dark:text-gray-100';
  const messageContentMaxWidth = 'max-w-[85%]';

  const renderImageMessage = () => {
    const imageData = message.data as ImageMessageData | null;
    const firstImage = imageData?.[0];

    if (!firstImage) return <p className='italic text-xs text-gray-500'>[Image data missing]</p>;

    return (
      <div className={`${bubbleBaseClass} ${bubbleClass} p-0 overflow-hidden`}>
        <a
          href={firstImage.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
          title={`View image: ${firstImage.name}`}
        >
          <img
            src={firstImage.url}
            alt={firstImage.name || 'Chat attachment'}
            className="max-w-full h-auto max-h-64 object-contain transition-opacity group-hover:opacity-90"
          />
        </a>
        {message.content && (
          <p className={`text-sm whitespace-pre-wrap break-words p-3 pt-2 ${isCurrentUser ? 'text-white' : cardSubTextColor}`}>
            {message.content}
          </p>
        )}
      </div>
    );
  };

  const renderOfferMessage = (isCurrentUser: boolean) => {
    const offerData = message.data as OfferMessageData | null;
    if (!offerData) return <p className='italic text-xs text-gray-500'>[Offer data missing]</p>;

    const truncatedDescription = offerData.description
      ? (offerData.description.length > 80 ? offerData.description.substring(0, 80) + '...' : offerData.description)
      : 'No description provided.';

    const isRecipient = !isCurrentUser;

    return (
      <div className={cardClass}>
        <div className="flex justify-between items-start mb-2">
          <h4 className={`font-semibold text-base mr-2 ${cardTextColor}`} title={offerData.title}>
            {offerData.title || "Custom Offer"}
          </h4>
          <span className="font-bold text-base text-blue-600 dark:text-blue-400 flex-shrink-0">
            {offerData.currency || '$'}{offerData.price?.toFixed(2) ?? '0.00'}
          </span>
        </div>

        <p className={`text-sm mb-3 ${cardSubTextColor}`}>
          {truncatedDescription}
        </p>

        <div className={`flex items-center text-sm mb-4 ${cardSubTextColor}`}>
          <Clock size={16} className="mr-2 flex-shrink-0" />
          <span>Delivery: {offerData.deliveryTime || 'Not specified'}</span>
        </div>

        <div className="flex flex-col space-y-2">
          <LinkButton
            asChild
            variant="primary"
            size="small"
            className="w-full justify-center"
          >
            <Link href={`/offers/${offerData.contractId}`}>
              View Offer Details
            </Link>
          </LinkButton>

          {isRecipient && (
            <div className="flex justify-end space-x-2 pt-2 border-t dark:border-gray-600">
              <Button variant="neutral" mode="stroke" size="small">Decline</Button>
              <Button variant="primary" mode="filled" size="small">Accept</Button>
            </div>
          )}
        </div>

        {message.content && (
          <p className={`text-sm mt-3 pt-3 border-t dark:border-gray-600 whitespace-pre-wrap ${cardTextColor}`}>
            {message.content}
          </p>
        )}
      </div>
    );
  };

  const renderMilestoneEventMessage = () => {
    const eventData = message.data as MilestoneEventData | null;
    if (!eventData) return <p className='italic text-xs text-gray-500'>[Milestone data missing]</p>;

    const truncatedDescription = eventData.description
      ? (eventData.description.length > 50 ? eventData.description.substring(0, 50) + '...' : eventData.description)
      : 'Milestone details';

    const isCompleted = eventData.status === 'completed';
    const Icon = isCompleted ? CheckCircle : Clock;
    const iconColor = isCompleted ? 'text-green-500' : 'text-blue-500';

    return (
      <div className={cardClass}>
        <div className="flex items-start mb-2">
          <Icon size={18} className={`mr-2 mt-0.5 flex-shrink-0 ${iconColor}`} />
          <div>
            <h4 className={`font-medium text-base ${cardTextColor}`} title={eventData.description}>
              Milestone: &quot;{truncatedDescription}&quot;
            </h4>
            {eventData.amount != null && (
              <p className={`text-sm mt-1 ${cardSubTextColor}`}>
                Amount: {eventData.currency || '$'}{eventData.amount.toFixed(2)}
              </p>
            )}
          </div>
        </div>

        <LinkButton
          asChild
          variant="primary"
          size="small"
          className="w-full justify-center mt-2"
        >
          <Link href={`/orders/detail/${eventData.contractId}`}>
            View Contract
          </Link>
        </LinkButton>
      </div>
    );
  };

  const renderSystemEventMessage = () => {
    const eventData = message.data as SystemEventData | null;
    const textToShow = eventData?.eventText || message.content || '[System Event]';

    return (
      <div className="text-center w-full my-4 px-4">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {textToShow} — {timestamp}
        </span>
      </div>
    );
  };

  let contentElement = null;
  let preContentText: string | null = null;

  if (message.message_type === 'system_event') {
    return renderSystemEventMessage();
  }

  if (message.message_type !== 'text') {
    switch (message.message_type) {
      case 'image':
        contentElement = renderImageMessage();
        break;
      case 'offer':
        contentElement = renderOfferMessage(isCurrentUser);
        break;
      case 'milestone_activated':
        contentElement = renderMilestoneEventMessage();
        break;
      case 'milestone_completed':
        contentElement = renderMilestoneEventMessage();
        break;
      default:
        contentElement = (
          <p className={`text-sm italic ${plainTextColor}`}>
            [Unsupported message type: {message.message_type}] {message.content || ''}
          </p>
        );
        break;
    }
  }

  return (
    <div className={`flex w-full mb-4 ${alignmentContainerClass}`}>
      <div className={`flex items-end gap-2 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <Avatar className="w-8 h-8 flex-shrink-0 mb-1">
          {senderProfile?.avatar_url ? (
            <AvatarImage src={senderProfile.avatar_url} alt={senderName} />
          ) : (
            <div className="w-full h-full rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-sm font-semibold text-gray-600 dark:text-gray-300">
              {senderName?.charAt(0).toUpperCase()}
            </div>
          )}
        </Avatar>
        <div className={`flex flex-col ${alignmentItemsClass} ${messageContentMaxWidth}`}>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
            {senderName}
          </p>
          {message.message_type === 'text' ? (
            <p className={`text-sm whitespace-pre-wrap break-words ${plainTextColor}`}>
              {message.content || ''}
            </p>
          ) : (
            contentElement // Render the bubble/card for non-text types
          )}
          <p className={`text-[10px] text-gray-400 dark:text-gray-500 mt-1`}>
            {timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ChatCore({
  chat,
  initialMessages,
  currentUserProfile,
  otherUserProfile,
  currentUserId,
  isPopup = false,
  onClose,
}: ChatCoreProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
  }, []);

  useEffect(() => {
    console.log('ChatCore: initialMessages prop updated', initialMessages);
    setMessages(initialMessages);
    setTimeout(scrollToBottom, 50);
  }, [initialMessages, scrollToBottom]);

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
            setTimeout(scrollToBottom, 100);
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

  const handleSendMessage = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const textContent = newMessage.trim();

    if ((!textContent && !selectedFile) || isSending) return;

    setIsSending(true);
    setNewMessage('');
    let fileToUpload = selectedFile;
    setSelectedFile(null);

    let attachmentData: BaseFileData[] | null = null;
    let finalMessageType: Message['message_type'] = 'text';

    try {
      if (fileToUpload) {
        console.log(`Uploading file: ${fileToUpload.name} (${fileToUpload.size} bytes)`);
        finalMessageType = 'image';
        try {
          const timestamp = Date.now();
          const uniqueFileName = `${timestamp}-${fileToUpload.name}`.replace(/\s+/g, '_');
          const filePath = `public/${chat.id}/${currentUserId}/${uniqueFileName}`;

          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('chat-attachments')
            .upload(filePath, fileToUpload, { cacheControl: '3600', upsert: false });

          if (uploadError) throw uploadError;

          console.log('Upload successful:', uploadData);
          const { data: urlData } = supabase.storage
            .from('chat-attachments')
            .getPublicUrl(filePath);

          if (!urlData?.publicUrl) throw new Error('Could not get public URL');

          attachmentData = [{
            name: fileToUpload.name,
            size: fileToUpload.size,
            url: urlData.publicUrl,
          }];

        } catch (uploadError: any) {
          console.error('Error uploading attachment during send:', uploadError);
          alert(`File upload failed: ${uploadError.message}. Message not sent.`);
          setNewMessage(textContent);
          setIsSending(false);
          return;
        }
      }

      console.log(`Sending message. Type: ${finalMessageType}, Content: "${textContent}", Data:`, attachmentData);
      const sentMessage = await chatOperations.sendMessage({
        chat_id: chat.id,
        sender_id: currentUserId,
        content: textContent,
        message_type: attachmentData ? 'image' : 'text',
        data: attachmentData,
      });

      if (!sentMessage) {
        console.error('Failed to send message after potential upload');
        setNewMessage(textContent);
      } else {
        scrollToBottom();
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setNewMessage(textContent);
    } finally {
      setIsSending(false);
    }
  };

  const handleAttachmentClick = () => {
    if (isSending) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && !isSending) {
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('File is too large. Maximum size is 5MB.');
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const groupedMessages = groupMessagesByDate(messages);
  const sortedDateKeys = Object.keys(groupedMessages).sort();

  const containerClass = 'flex flex-col bg-white dark:bg-gray-800';
  const containerModeClass = isPopup
    ? 'rounded-lg shadow-xl border dark:border-gray-700 overflow-hidden w-[800px] fixed bottom-4 right-4 z-50'
    : 'h-screen';

  return (
    <div className={`${containerClass} ${containerModeClass}`}>
      <div className='flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-3 flex-shrink-0'>
        <div className='flex items-center space-x-3'>
          <div className='relative'>
            <Avatar size="32">
              <AvatarImage
                src={otherUserProfile?.avatar_url ?? undefined}
                alt={otherUserProfile?.username ?? 'User'}
              />
            </Avatar>
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-800" title="Online"></span>
          </div>
          <div>
            <p className='font-medium text-sm text-gray-900 dark:text-gray-100'>
              {otherUserProfile?.full_name ?? otherUserProfile?.username ?? 'User'}
            </p>
            <p className='text-xs text-green-600 dark:text-green-400'>Online</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {isPopup && onClose && (
            <Button
              variant="neutral"
              mode="ghost"
              size="medium"
              onClick={onClose}
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          )}
          <Button
            variant="neutral"
            mode="ghost"
            size="medium"
            aria-label="More options"
          >
            <MoreVertical size={18} />
          </Button>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto p-4 md:px-6 space-y-0'>
        {sortedDateKeys.map((dateKey) => (
          <Fragment key={dateKey}>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white dark:bg-gray-800 px-2 text-xs text-gray-500 dark:text-gray-400">
                  {formatDateSeparator(dateKey)}
                </span>
              </div>
            </div>
            {groupedMessages[dateKey].map((message) => {
              const isCurrentUser = message.sender_id === currentUserId;
              const senderProfile = isCurrentUser ? currentUserProfile : otherUserProfile;
              const senderName = isCurrentUser
                ? 'Me'
                : senderProfile?.full_name ?? senderProfile?.username ?? 'User';
              return (
                <ChatMessageRenderer
                  key={message.id}
                  message={message}
                  isCurrentUser={isCurrentUser}
                  senderProfile={senderProfile}
                  timestamp={formatMessageTimestamp(message.created_at)}
                  senderName={senderName}
                />
              );
            })}
          </Fragment>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className='border-t border-gray-200 dark:border-gray-700 p-3 flex-shrink-0'>
        {selectedFile && (
          <div className="mb-2 flex items-center justify-between rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2 text-sm">
            <div className="flex items-center space-x-2 overflow-hidden">
              <FileImage size={18} className="text-gray-500 dark:text-gray-400 flex-shrink-0" />
              <span className="truncate text-gray-700 dark:text-gray-200" title={selectedFile.name}>{selectedFile.name}</span>
              <span className="ml-auto text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">({(selectedFile.size / 1024).toFixed(1)} KB)</span>
            </div>
            <Button
              variant="neutral"
              mode="ghost"
              size="medium"
              type="button"
              onClick={clearSelectedFile}
              aria-label="Remove attachment"
              className="ml-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50"
            >
              <XCircle size={18} />
            </Button>
          </div>
        )}
        <form onSubmit={handleSendMessage} className='flex flex-col space-y-2'>
          <div>
            <Textarea
              placeholder={selectedFile ? 'Add a caption...' : 'Type your message...'}
              value={newMessage}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewMessage(e.target.value)}
              onKeyDown={handleTextareaKeyDown}
              disabled={isSending}
              className='resize-none border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500 block w-full min-h-[40px] max-h-[120px] overflow-y-auto text-sm p-2.5'
              rows={1}
              autoComplete='off'
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Button
                variant="neutral"
                mode="ghost"
                size="xsmall"
                type="button"
                aria-label="Emoji"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <Smile />
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
              <Button
                variant="neutral"
                mode="ghost"
                size="xsmall"
                type="button"
                aria-label="Attach file"
                onClick={handleAttachmentClick}
                disabled={isSending}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <Paperclip />
              </Button>
            </div>
            <div>
              <FancyButtonModule.Root
                type='submit'
                disabled={(!newMessage.trim() && !selectedFile) || isSending}
                variant="primary"
                className="!px-4 !py-2"
              >
                {isSending ? (
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <Send size={16} />
                )}
                <span className={`ml-2 ${isSending ? 'opacity-0' : 'opacity-100'}`}>Send</span>
              </FancyButtonModule.Root>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 