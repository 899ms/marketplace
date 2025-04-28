import supabase from './client';
// Comment out server client import as it's causing issues in Pages Router
// import { createServerClient } from './server';
import {
  UserSchema,
  JobSchema,
  ServiceSchema,
  ContractSchema,
  ChatSchema,
  MessageSchema,
  User,
  Job,
  Service,
  Contract,
  Chat,
  Message,
} from './types';
import { z } from 'zod';

/**
 * User-related database operations
 */
export const userOperations = {
  // Get user by ID
  async getUserById(id: string): Promise<User | null> {
    console.log(`getUserById: Fetching user with ID: ${id}`);

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error(`getUserById DB Error for ID ${id}:`, error.message);
        return null;
      }

      if (!data) {
        console.error(`getUserById: No data returned for ID ${id}`);
        return null;
      }

      console.log(`getUserById: Raw data fetched:`, JSON.stringify(data));

      // Ensure data types are correct before validation
      const processedData = {
        id: String(data.id),
        username: String(data.username || data.id), // Fallback to ID if username is missing
        full_name: String(data.full_name || ''),
        user_type:
          data.user_type === 'buyer' || data.user_type === 'seller'
            ? data.user_type
            : 'buyer',
        created_at: data.created_at,
        avatar_url: data.avatar_url,
        bio: data.bio,
        balance: typeof data.balance === 'number' ? data.balance : 1000,
        language: ['en', 'zh'].includes(data.language) ? data.language : 'zh',
      };

      console.log(
        `getUserById: Processed data:`,
        JSON.stringify(processedData),
      );

      try {
        const parsedUser = UserSchema.parse(processedData);
        console.log(`getUserById: Successfully parsed data for ID ${id}`);
        return parsedUser;
      } catch (validationErr) {
        if (validationErr instanceof z.ZodError) {
          console.error(`getUserById Zod validation errors:`);
          validationErr.errors.forEach((error, index) => {
            console.error(
              `Error ${index + 1}: Path: [${error.path.join('.')}], Message: ${error.message}`,
            );
          });
        }

        // Try a more forgiving approach - create a valid user with defaults if possible
        console.log('Attempting to create a valid user with defaults');
        return {
          id: String(id),
          username: String(data.username || id),
          full_name: String(data.full_name || 'User'),
          user_type: data.user_type === 'seller' ? 'seller' : 'buyer',
          avatar_url: null,
          bio: null,
          balance: 1000,
          language: 'zh',
        };
      }
    } catch (err) {
      console.error(`getUserById Unexpected error for ID ${id}:`, err);
      return null;
    }
  },

  // Update user
  async updateUser(
    userId: string,
    userData: Partial<Omit<User, 'id' | 'created_at'>>,
  ): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .update({
        ...userData,
        // Don't update id or created_at
      })
      .eq('id', userId)
      .select()
      .single();

    if (error || !data) {
      console.error('Error updating user:', error);
      return null;
    }

    try {
      return UserSchema.parse(data);
    } catch (err) {
      console.error('Invalid user data after update:', err);
      return null;
    }
  },
};

/**
 * Job-related database operations
 */
export const jobOperations = {
  // Get all jobs
  async getAllJobs(): Promise<Job[]> {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return [];

    try {
      return data.map((job) => JobSchema.parse(job));
    } catch (err) {
      console.error('Invalid job data:', err);
      return [];
    }
  },

  // Get job by ID
  async getJobById(id: string): Promise<Job | null> {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;

    try {
      return JobSchema.parse(data);
    } catch (err) {
      console.error('Invalid job data:', err);
      return null;
    }
  },

  // Get jobs by buyer ID
  async getJobsByBuyerId(buyerId: string): Promise<Job[]> {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('buyer_id', buyerId)
      .order('created_at', { ascending: false });

    if (error || !data) return [];

    try {
      return data.map((job) => JobSchema.parse(job));
    } catch (err) {
      console.error('Invalid job data:', err);
      return [];
    }
  },

  // Create a new job
  async createJob(job: Omit<Job, 'id' | 'created_at'>): Promise<Job | null> {
    const { data, error } = await supabase
      .from('jobs')
      .insert(job)
      .select()
      .single();

    if (error || !data) {
      console.error('Error creating job:', error);
      return null;
    }

    try {
      return JobSchema.parse(data);
    } catch (err) {
      console.error('Invalid job data after creation:', err);
      return null;
    }
  },

  // Update job
  async updateJob(
    jobId: string,
    jobData: Partial<Omit<Job, 'id' | 'created_at'>>,
  ): Promise<Job | null> {
    const { data, error } = await supabase
      .from('jobs')
      .update(jobData)
      .eq('id', jobId)
      .select()
      .single();

    if (error || !data) {
      console.error('Error updating job:', error);
      return null;
    }

    try {
      return JobSchema.parse(data);
    } catch (err) {
      console.error('Invalid job data after update:', err);
      return null;
    }
  },
};

/**
 * Service-related database operations
 */
export const serviceOperations = {
  // Get all services
  async getAllServices(): Promise<Service[]> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return [];

    try {
      return data.map((service) => ServiceSchema.parse(service));
    } catch (err) {
      console.error('Invalid service data:', err);
      return [];
    }
  },

  // Get service by ID
  async getServiceById(id: string): Promise<Service | null> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;

    try {
      return ServiceSchema.parse(data);
    } catch (err) {
      console.error('Invalid service data:', err);
      return null;
    }
  },

  // Get services by seller ID
  async getServicesBySellerId(sellerId: string): Promise<Service[]> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false });

    if (error || !data) return [];

    try {
      return data.map((service) => ServiceSchema.parse(service));
    } catch (err) {
      console.error('Invalid service data:', err);
      return [];
    }
  },

  // Create a new service
  async createService(
    service: Omit<Service, 'id' | 'created_at'>,
  ): Promise<Service | null> {
    const { data, error } = await supabase
      .from('services')
      .insert(service)
      .select()
      .single();

    if (error || !data) {
      console.error('Error creating service:', error);
      return null;
    }

    try {
      return ServiceSchema.parse(data);
    } catch (err) {
      console.error('Invalid service data after creation:', err);
      return null;
    }
  },

  // Update service
  async updateService(
    serviceId: string,
    serviceData: Partial<Omit<Service, 'id' | 'created_at'>>,
  ): Promise<Service | null> {
    const { data, error } = await supabase
      .from('services')
      .update(serviceData)
      .eq('id', serviceId)
      .select()
      .single();

    if (error || !data) {
      console.error('Error updating service:', error);
      return null;
    }

    try {
      return ServiceSchema.parse(data);
    } catch (err) {
      console.error('Invalid service data after update:', err);
      return null;
    }
  },
};

/**
 * Contract-related database operations
 */
export const contractOperations = {
  // Get all contracts for a user (as buyer or seller)
  async getUserContracts(userId: string): Promise<Contract[]> {
    const { data, error } = await supabase
      .from('contracts')
      .select('*')
      .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`) // Get contracts where user is buyer OR seller
      .order('created_at', { ascending: false });

    if (error || !data) return [];

    try {
      return data.map((contract) => ContractSchema.parse(contract));
    } catch (err) {
      console.error('Invalid contract data:', err);
      return [];
    }
  },

  // Get contract by ID
  async getContractById(id: string): Promise<Contract | null> {
    const { data, error } = await supabase
      .from('contracts')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;

    try {
      return ContractSchema.parse(data);
    } catch (err) {
      console.error('Invalid contract data:', err);
      return null;
    }
  },

  // Create a new contract
  async createContract(
    contract: Omit<Contract, 'id' | 'created_at'>,
  ): Promise<Contract | null> {
    const { data, error } = await supabase
      .from('contracts')
      .insert(contract)
      .select()
      .single();

    if (error || !data) {
      console.error('Error creating contract:', error);
      return null;
    }

    try {
      return ContractSchema.parse(data);
    } catch (err) {
      console.error('Invalid contract data after creation:', err);
      return null;
    }
  },

  // Update contract
  async updateContract(
    contractId: string,
    contractData: Partial<Omit<Contract, 'id' | 'created_at'>>,
  ): Promise<Contract | null> {
    const { data, error } = await supabase
      .from('contracts')
      .update(contractData)
      .eq('id', contractId)
      .select()
      .single();

    if (error || !data) {
      console.error('Error updating contract:', error);
      return null;
    }

    try {
      return ContractSchema.parse(data);
    } catch (err) {
      console.error('Invalid contract data after update:', err);
      return null;
    }
  },

  // Update contract status
  async updateContractStatus(
    contractId: string,
    status: Contract['status'],
  ): Promise<Contract | null> {
    return this.updateContract(contractId, { status });
  },
};

/**
 * Chat and message operations
 */
export const chatOperations = {
  // Get chat by ID
  async getChatById(id: string): Promise<Chat | null> {
    const { data, error } = await supabase
      .from('chats')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;

    try {
      return ChatSchema.parse(data);
    } catch (err) {
      console.error('Invalid chat data:', err);
      return null;
    }
  },

  // Get chats for a user (as buyer or seller)
  async getUserChats(userId: string): Promise<Chat[]> {
    const { data, error } = await supabase
      .from('chats')
      .select('*')
      .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`) // Get chats where user is buyer OR seller
      .order('created_at', { ascending: false });

    if (error || !data) return [];

    try {
      return data.map((chat) => ChatSchema.parse(chat));
    } catch (err) {
      console.error('Invalid chat data:', err);
      return [];
    }
  },

  // Create a new chat
  async createChat(
    chat: Omit<Chat, 'id' | 'created_at'>,
  ): Promise<Chat | null> {
    const { data, error } = await supabase
      .from('chats')
      .insert(chat)
      .select()
      .single();

    if (error || !data) {
      console.error('Error creating chat:', error);
      return null;
    }

    try {
      return ChatSchema.parse(data);
    } catch (err) {
      console.error('Invalid chat data after creation:', err);
      return null;
    }
  },

  // Get messages for a chat
  async getChatMessages(chatId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true }); // Oldest first for chat history

    if (error || !data) return [];

    try {
      return data.map((message) => MessageSchema.parse(message));
    } catch (err) {
      console.error('Invalid message data:', err);
      return [];
    }
  },

  // Send a message
  async sendMessage(
    message: Omit<Message, 'id' | 'created_at' | 'read'>,
  ): Promise<Message | null> {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        ...message,
        read: false, // New messages are unread by default
      })
      .select()
      .single();

    if (error || !data) {
      console.error('Error sending message:', error);
      return null;
    }

    try {
      return MessageSchema.parse(data);
    } catch (err) {
      console.error('Invalid message data after sending:', err);
      return null;
    }
  },

  // Mark messages as read
  async markMessagesAsRead(chatId: string, userId: string): Promise<boolean> {
    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('chat_id', chatId)
      .neq('sender_id', userId) // Only mark messages from the other person
      .eq('read', false); // Only update unread messages

    if (error) {
      console.error('Error marking messages as read:', error);
      return false;
    }

    return true;
  },
};
