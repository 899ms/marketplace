import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import supabase from '@/utils/supabase/client';
import { chatOperations } from '@/utils/supabase/database';
import { Chat, Message, User, MessageSchema, BaseFileData } from '@/utils/supabase/types';
import { format, isSameDay, formatRelative, parseISO } from 'date-fns';
import { Root as Avatar, Image as AvatarImage } from '@/components/ui/avatar';
import { Root as Button } from '@/components/ui/button';
import { Root as Textarea } from '@/components/ui/textarea';
import { Root as CompactButton } from '@/components/ui/compact-button';
import { Root as LinkButton } from '@/components/ui/link-button';
import { Paperclip, Send, Smile, MoreVertical, Clock, XCircle, FileImage } from 'lucide-react';

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

function formatDateSeparator(timestamp: string | null | undefined): string {
  if (!timestamp) return 'Date Unknown';
  try {
    const date = parseISO(timestamp);
    return formatRelative(date, new Date()).split(' at')[0];
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
  console.log(`ChatMessageRenderer: Rendering message ID ${message.id}`);
  console.log(`  Type: ${message.message_type}`);
  console.log(`  Data:`, message.data);

  const alignmentClass = isCurrentUser ? 'items-end' : 'items-start';
  const bubbleClass = isCurrentUser
    ? 'bg-blue-500 text-white rounded-l-lg rounded-tr-lg'
    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-r-lg rounded-tl-lg';
  const textAlignClass = isCurrentUser ? 'text-right' : 'text-left';

  const renderTextMessage = () => (
    <div className={`max-w-[70%] px-3 py-2 ${bubbleClass}`}>
      <p className="text-sm whitespace-pre-wrap">{message.content || ''}</p>
    </div>
  );

  const renderImageMessage = () => {
    const imageData = message.data as BaseFileData[] | null;
    if (!imageData || imageData.length === 0) return <p className='italic text-xs text-gray-500'>[Attachment data missing]</p>;

    return (
      <div className={`${bubbleClass} max-w-[70%] overflow-hidden`}>
        <div className="grid gap-0.5 p-1">
          {imageData.map((file, index) => (
            <a
              key={index}
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-1.5 bg-black/10 dark:bg-white/10 rounded hover:bg-black/20 dark:hover:bg-white/20 transition-colors cursor-pointer"
              title={`Open ${file.name}`}
            >
              <FileImage size={24} className="text-gray-700 dark:text-gray-300 flex-shrink-0" />
              <div className="text-xs overflow-hidden">
                <p className={`font-medium truncate ${isCurrentUser ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>{file.name}</p>
                <p className={`opacity-80 ${isCurrentUser ? 'text-blue-100' : 'text-gray-600 dark:text-gray-300'}`}>{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </a>
          ))}
        </div>
        {message.content && <p className="text-sm px-2.5 py-1.5 border-t border-black/10 dark:border-white/10">{message.content}</p>}
      </div>
    );
  };

  const renderOfferMessage = (isCurrentUser: boolean) => {
    // Define a type for the offer data structure for better type safety
    interface OfferMessageData {
      title: string;
      description?: string;
      price: number;
      currency: string;
      deliveryTime?: string | null; // Can be null if formatting failed or no date
      contractId: string;
    }

    const offerData = message.data as OfferMessageData | null;
    if (!offerData) return <p className='italic text-xs text-gray-500'>[Offer data missing]</p>;

    const truncatedDescription = offerData.description
      ? (offerData.description.length > 80 ? offerData.description.substring(0, 80) + '...' : offerData.description)
      : 'No description provided.';

    // Determine if the current viewer is the recipient (seller)
    const isRecipient = !isCurrentUser;

    return (
      <div className="border rounded-lg p-4 max-w-xs w-full bg-white dark:bg-gray-800 shadow-sm">
        {/* Top section: Title and Price */}
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate pr-2" title={offerData.title}>{offerData.title || "Offer"}</h4>
          <span className="font-bold text-sm text-gray-700 dark:text-gray-300 flex-shrink-0">{offerData.currency || 'US$'}{offerData.price?.toFixed(2) || '0.00'}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{truncatedDescription}</p>

        {/* Delivery Time Section */}
        <p className="text-xs font-medium text-gray-800 dark:text-gray-200 mb-1">Your offer includes</p>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
          <Clock size={14} className="mr-1.5 flex-shrink-0" />
          <span>{offerData.deliveryTime || 'Delivery time not specified'}</span>
        </div>

        {/* Action Buttons - Only show for the recipient (seller) */}
        {isRecipient && (
          <div className="flex justify-end space-x-2">
            <Button variant="neutral" mode="stroke" size="small">Decline</Button>
            <Button variant="primary" mode="filled" size="small">Accept</Button>
          </div>
        )}

        {/* Display content (comment) below offer if it exists */}
        {message.content && <p className="text-sm mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">{message.content}</p>}
      </div>
    );
  };

  const renderMilestoneMessage = () => {
    const milestoneData = message.data as any;
    if (!milestoneData) return <p className='italic text-xs text-gray-500'>[Milestone data missing]</p>;
    return (
      <div className="border rounded-lg p-3 max-w-xs w-full bg-white dark:bg-gray-800 shadow-sm">
        <h4 className="font-medium text-sm mb-1">{milestoneData.title || "Milestone"}</h4>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Amount: {milestoneData.currency || '$'}{milestoneData.amount || '0.00'}</p>
        <LinkButton asChild variant="primary" size="small" className="p-0 h-auto">
          <a href={milestoneData.contractLink || '#'}>View contract</a>
        </LinkButton>
        {message.content && <p className="text-sm mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">{message.content}</p>}
      </div>
    );
  };

  const renderSystemEventMessage = () => {
    const eventData = message.data as any;
    if (!eventData) return <p className='italic text-xs text-gray-500'>[System event data missing]</p>;

    return (
      <div className="text-center w-full my-2">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{eventData.text || message.content}</p>
        {eventData.buttonLabel && (
          <Button asChild variant="neutral" mode="stroke" size="small">
            <a href={eventData.buttonLink || '#'}>{eventData.buttonLabel}</a>
          </Button>
        )}
        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{senderName} {timestamp}</p>
      </div>
    );
  };

  let contentElement;
  if (message.message_type === 'system_event') {
    return renderSystemEventMessage();
  }

  switch (message.message_type) {
    case 'image':
      contentElement = renderImageMessage();
      break;
    case 'offer':
      contentElement = renderOfferMessage(isCurrentUser);
      break;
    case 'milestone':
      contentElement = renderMilestoneMessage();
      break;
    case 'text':
    case null:
    case undefined:
    default:
      contentElement = renderTextMessage();
  }

  return (
    <div className={`flex flex-col w-full ${alignmentClass}`}>
      <div className={`flex gap-2 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {!isCurrentUser && (
          <Avatar size="24" className="mt-auto mb-2 self-end">
            <AvatarImage
              src={senderProfile?.avatar_url ?? undefined}
              alt={senderProfile?.username ?? 'User'}
            />
          </Avatar>
        )}
        {contentElement}
        {isCurrentUser && (
          <Avatar size="24" className="mt-auto mb-2 self-end">
            <AvatarImage
              src={senderProfile?.avatar_url ?? undefined}
              alt={senderProfile?.username ?? 'User'}
            />
          </Avatar>
        )}
      </div>
      <p className={`text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 ${isCurrentUser ? 'text-right mr-8' : 'text-left ml-8'}`}>
        {senderName} {timestamp}
      </p>
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
    ? 'rounded-lg shadow-lg h-[500px] w-[350px] border dark:border-gray-700 overflow-hidden'
    : 'h-screen';

  return (
    <div className={`${containerClass} ${containerModeClass}`}>
      <div className='flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-3 flex-shrink-0'>
        <div className='flex items-center space-x-3'>
          <div className='relative'>
            <Avatar size="32">
              <AvatarImage
                src={otherUserProfile?.avatar_url ?? undefined}
                alt={otherUserProfile?.username ?? 'U'}
              />
            </Avatar>
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-800" title="Online"></span>
          </div>
          <div>
            <p className='font-medium text-sm text-gray-900 dark:text-gray-100'>{otherUserProfile?.username ?? 'User'}</p>
            <p className='text-xs text-green-600 dark:text-green-400'>Online</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {isPopup && onClose && (
            <CompactButton variant="ghost" size="medium" onClick={onClose} aria-label="Close chat">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </CompactButton>
          )}
          <CompactButton variant="ghost" size="medium" aria-label="More options">
            <MoreVertical size={18} />
          </CompactButton>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
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
              const senderName = isCurrentUser ? 'Me' : senderProfile?.username ?? 'User';
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
            <CompactButton
              variant="ghost"
              size="medium"
              type="button"
              onClick={clearSelectedFile}
              aria-label="Remove attachment"
              className="ml-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50"
            >
              <XCircle size={18} />
            </CompactButton>
          </div>
        )}
        <form onSubmit={handleSendMessage} className='flex items-end space-x-2'>
          <CompactButton variant="ghost" size="medium" type="button" aria-label="Emoji">
            <Smile size={20} />
          </CompactButton>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          <CompactButton
            variant="ghost"
            size="medium"
            type="button"
            aria-label="Attach file"
            onClick={handleAttachmentClick}
            disabled={isSending}
          >
            <Paperclip size={20} />
          </CompactButton>
          <Textarea
            placeholder={selectedFile ? 'Add a caption...' : 'Type your message...'}
            value={newMessage}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewMessage(e.target.value)}
            onKeyDown={handleTextareaKeyDown}
            disabled={isSending}
            className='flex-1 resize-none border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white min-h-[40px] max-h-[120px] overflow-y-auto'
            rows={1}
            autoComplete='off'
          />
          <Button
            type='submit'
            disabled={(!newMessage.trim() && !selectedFile) || isSending}
            size="small"
          >
            {isSending ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <Send size={16} className='mr-1.5' />
            )}
            {isSending ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </div>
    </div>
  );
} 