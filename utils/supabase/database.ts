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
  ContractMilestoneSchema,
  ContractMilestone,
  MusicItemSchema,
  MusicItem,
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
        music_data: Array.isArray(data.music_data) ? data.music_data : null,
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
          music_data: null,
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

  // Get recent workers (sellers)
  async getRecentWorkers(limit: number = 3): Promise<User[]> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_type', 'seller')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching recent workers:', error);
        return [];
      }

      if (!data || !Array.isArray(data) || data.length === 0) {
        console.log('No workers found');
        return [];
      }

      console.log(`Found ${data.length} recent workers`);

      try {
        const users = data.map((user) => UserSchema.parse(user));
        return users;
      } catch (err) {
        console.error('Error parsing worker data:', err);
        return [];
      }
    } catch (err) {
      console.error('Unexpected error in getRecentWorkers:', err);
      return [];
    }
  },

  // Get workers (sellers) with pagination and filtering
  async getWorkersWithPagination({
    limit = 9,
    offset = 0,
    searchTerm = '',
    skills = [],
    isAvailable = false,
    isProfessional = false,
    sortBy = 'created_at',
    sortOrder = 'desc',
  }: {
    limit?: number;
    offset?: number;
    searchTerm?: string;
    skills?: string[];
    isAvailable?: boolean;
    isProfessional?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<{ workers: User[]; total: number }> {
    try {
      let query = supabase
        .from('users')
        .select('*', { count: 'exact' })
        .eq('user_type', 'seller');

      // Apply search term filter if provided (search in username or full_name)
      if (searchTerm && searchTerm.trim() !== '') {
        query = query.or(
          `username.ilike.%${searchTerm}%,full_name.ilike.%${searchTerm}%`,
        );
      }

      // Note: We're not applying skills filter as the User schema doesn't have a skills field
      // If you add skills to the users table in the future, you can uncomment this
      // if (skills && skills.length > 0) {
      //   query = query.overlaps('skills', skills);
      // }

      // Apply professional filter if set - update to match your schema
      // Currently there's no is_professional field, so this is commented out
      // if (isProfessional) {
      //   query = query.eq('is_professional', true);
      // }

      // Apply available filter based on recent login - update to match your schema
      // Currently there's no last_online field, so this is commented out
      // if (isAvailable) {
      //   const oneDayAgo = new Date();
      //   oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      //   query = query.gte('last_online', oneDayAgo.toISOString());
      // }

      // Apply sorting
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });

      // Apply pagination
      query = query.range(offset, offset + limit - 1);

      const { data, error, count } = await query;

      if (error) {
        console.error('Supabase error fetching workers:', error);
        return { workers: [], total: 0 };
      }

      if (!data || !Array.isArray(data) || data.length === 0) {
        console.log('No workers found or empty array returned');
        return { workers: [], total: 0 };
      }

      console.log(`Found ${data.length} workers with pagination`);

      // Process users one by one to avoid failing all if one fails
      const validWorkers: User[] = [];

      for (const worker of data) {
        try {
          const parsedWorker = UserSchema.parse(worker);
          validWorkers.push(parsedWorker);
        } catch (err) {
          console.error(`Error validating worker ${worker.id}:`, err);
          // Continue with next worker instead of failing the whole array
        }
      }

      return {
        workers: validWorkers,
        total: count || validWorkers.length,
      };
    } catch (err) {
      console.error('Unexpected error in getWorkersWithPagination:', err);
      return { workers: [], total: 0 };
    }
  },

  // Get music data for a specific user (intended for sellers)
  async getUserMusicData(userId: string): Promise<MusicItem[]> {
    console.log(`getUserMusicData: Fetching music data for user ID: ${userId}`);

    try {
      const { data, error } = await supabase
        .from('users')
        .select('music_data')
        .eq('id', userId)
        .single();

      if (error) {
        console.error(
          `getUserMusicData DB Error for ID ${userId}:`,
          error.message,
        );
        return [];
      }

      if (!data || !data.music_data || !Array.isArray(data.music_data)) {
        console.log(
          `getUserMusicData: No valid music_data found for ID ${userId}`,
        );
        return [];
      }

      // Validate the array against the MusicItemSchema
      try {
        const parsedMusicData = z.array(MusicItemSchema).parse(data.music_data);
        console.log(
          `getUserMusicData: Successfully parsed music data for ID ${userId}:`,
          parsedMusicData.length,
          'items',
        );
        return parsedMusicData;
      } catch (validationErr) {
        console.error(
          `getUserMusicData Zod validation errors for ID ${userId}:`,
          validationErr,
        );
        // Optionally, filter out invalid items instead of returning empty
        const validItems = data.music_data.filter((item) => {
          try {
            MusicItemSchema.parse(item);
            return true;
          } catch {
            return false;
          }
        });
        console.warn(
          `getUserMusicData: Returning ${validItems.length} valid items after filtering.`,
        );
        return validItems;
      }
    } catch (err) {
      console.error(`getUserMusicData Unexpected error for ID ${userId}:`, err);
      return [];
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
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('buyer_id', buyerId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error fetching jobs:', error);
        return [];
      }

      if (!data || !Array.isArray(data)) {
        console.log('No jobs found or empty array returned');
        return [];
      }

      console.log(`Found ${data.length} jobs for buyer ID ${buyerId}`);

      // Process each job individually to avoid failing all if one fails
      const validJobs: Job[] = [];

      for (const job of data) {
        try {
          // Ensure all required fields have appropriate values
          const processedJob = {
            ...job,
            id: String(job.id),
            title: String(job.title || ''),
            description: job.description || null,
            budget: typeof job.budget === 'number' ? job.budget : 0,
            buyer_id: String(job.buyer_id || buyerId),
            currency: job.currency || 'USD',
            created_at: job.created_at ? String(job.created_at) : null,
            // Handle array fields carefully
            skill_levels: Array.isArray(job.skill_levels)
              ? job.skill_levels
              : [],
            candidate_sources: Array.isArray(job.candidate_sources)
              ? job.candidate_sources
              : [],
            files: Array.isArray(job.files) ? job.files : [],
          };

          const validJob = JobSchema.parse(processedJob);
          validJobs.push(validJob);
        } catch (err) {
          console.error(`Error processing job ${job.id}:`, err);
          // Continue with next job instead of failing the whole array
        }
      }

      console.log(
        `Successfully processed ${validJobs.length} out of ${data.length} jobs`,
      );
      return validJobs;
    } catch (err) {
      console.error('Unexpected error in getJobsByBuyerId:', err);
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

  // Get jobs with pagination and filtering
  async getJobsWithPagination({
    limit = 9,
    offset = 0,
    searchTerm = '',
    skills = [], // Changed from skill_levels to skills for consistency
    budgetRange = null,
    sortBy = 'created_at',
    sortOrder = 'desc',
  }: {
    limit?: number;
    offset?: number;
    searchTerm?: string;
    skills?: string[];
    budgetRange?: [number, number] | null;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<{ jobs: Job[]; total: number }> {
    try {
      let query = supabase.from('jobs').select('*', { count: 'exact' });

      // Apply search term filter if provided (search in title or description)
      if (searchTerm && searchTerm.trim() !== '') {
        query = query.or(
          `title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`,
        );
      }

      // Apply skills filter if provided
      if (skills && skills.length > 0) {
        // Assuming 'skill_levels' is the correct column name in your 'jobs' table
        query = query.overlaps('skill_levels', skills);
      }

      // Apply budget range filter if provided
      if (budgetRange && budgetRange.length === 2) {
        const [minBudget, maxBudget] = budgetRange;
        query = query.gte('budget', minBudget).lte('budget', maxBudget);
      }

      // Apply sorting
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });

      // Apply pagination
      query = query.range(offset, offset + limit - 1);

      const { data, error, count } = await query;

      if (error) {
        console.error('Supabase error fetching jobs:', error);
        return { jobs: [], total: 0 };
      }

      if (!data || !Array.isArray(data) || data.length === 0) {
        console.log('No jobs found or empty array returned');
        return { jobs: [], total: 0 };
      }

      console.log(`Found ${data.length} jobs with pagination`);

      // Process jobs one by one
      const validJobs: Job[] = [];

      for (const job of data) {
        try {
          const parsedJob = JobSchema.parse(job);
          validJobs.push(parsedJob);
        } catch (err) {
          console.error(`Error validating job ${job.id}:`, err);
          // Continue with next job
        }
      }

      return {
        jobs: validJobs,
        total: count || validJobs.length,
      };
    } catch (err) {
      console.error('Unexpected error in getJobsWithPagination:', err);
      return { jobs: [], total: 0 };
    }
  },

  // Get recent jobs
  async getRecentJobs(limit: number = 3): Promise<Job[]> {
    console.log(`Fetching ${limit} recent jobs...`);
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Supabase error fetching recent jobs:', error);
        return [];
      }

      if (!data || !Array.isArray(data) || data.length === 0) {
        console.log('No recent jobs found.');
        return [];
      }

      console.log(`Found ${data.length} recent jobs.`);

      // Validate each job
      const validJobs: Job[] = [];
      for (const job of data) {
        try {
          // Ensure all required fields have appropriate values before parsing
          const processedJob = {
            ...job,
            id: String(job.id),
            title: String(job.title || ''),
            description: job.description || null,
            budget: typeof job.budget === 'number' ? job.budget : 0,
            buyer_id: String(job.buyer_id || ''), // Needs a buyer ID, even if empty
            currency: job.currency || 'USD',
            created_at: job.created_at ? String(job.created_at) : null,
            // Handle array/JSON fields carefully
            skill_levels: Array.isArray(job.skill_levels)
              ? job.skill_levels
              : [],
            candidate_sources: Array.isArray(job.candidate_sources)
              ? job.candidate_sources
              : [],
            files: Array.isArray(job.files) ? job.files : [],
            status: ['open', 'in_progress', 'completed'].includes(job.status)
              ? job.status
              : 'open', // Provide default if null/invalid
            deadline: job.deadline ? String(job.deadline) : null,
            negotiate_budget:
              typeof job.negotiate_budget === 'boolean'
                ? job.negotiate_budget
                : false,
            usage_option: ['private', 'business'].includes(job.usage_option)
              ? job.usage_option
              : 'private',
            privacy_option: ['public', 'private'].includes(job.privacy_option)
              ? job.privacy_option
              : 'public',
          };

          const parsedJob = JobSchema.parse(processedJob);
          validJobs.push(parsedJob);
        } catch (validationErr) {
          console.error(
            `Error validating recent job ${job.id}:`,
            validationErr,
          );
          // Continue with the next job
        }
      }

      console.log(`Successfully processed ${validJobs.length} recent jobs.`);
      return validJobs;
    } catch (err) {
      console.error('Unexpected error in getRecentJobs:', err);
      return [];
    }
  },
};

/**
 * Service-related database operations
 */
export const serviceOperations = {
  // Get all services
  async getAllServices(): Promise<Service[]> {
    try {
      // Extended query with join to get seller information
      const { data, error } = await supabase
        .from('services')
        .select(
          `
          *,
          seller:seller_id (
            full_name,
            username
          )
        `,
        )
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error fetching services:', error);
        return [];
      }

      if (!data || !Array.isArray(data) || data.length === 0) {
        console.log('No services found or empty array returned');
        return [];
      }

      console.log(
        'Raw services data from Supabase with seller info:',
        data.length,
        'services found',
      );

      // Process services one by one to avoid failing all if one fails
      const validServices: Service[] = [];

      for (const service of data) {
        try {
          // Extract seller info from the join result
          const sellerInfo = service.seller || {};

          // Ensure created_at is a string (some types might cause issues)
          const processedService = {
            ...service,
            seller_name:
              sellerInfo.full_name || sellerInfo.username || 'Unknown Seller',
            created_at: service.created_at ? String(service.created_at) : null,
          };

          const parsedService = ServiceSchema.parse(processedService);
          validServices.push(parsedService);
        } catch (err) {
          console.error(`Error validating service ${service.id}:`, err);
          // Continue with next service instead of failing the whole array
        }
      }

      console.log(
        `Successfully processed ${validServices.length} out of ${data.length} services`,
      );
      return validServices;
    } catch (err) {
      console.error('Unexpected error in getAllServices:', err);
      return [];
    }
  },

  // Get service by ID
  async getServiceById(id: string): Promise<Service | null> {
    // Modified select query to join with users table
    const { data, error } = await supabase
      .from('services')
      .select(
        `
        *,
        seller:users!services_seller_id_fkey (
          id,
          full_name,
          username,
          avatar_url,
          bio
        )
        `,
      )
      .eq('id', id)
      .maybeSingle(); // Use maybeSingle to handle not found gracefully

    if (error) {
      console.error(`Error fetching service ${id}:`, error);
      return null;
    }

    if (!data) {
      console.log(`Service with ID ${id} not found.`);
      return null;
    }

    console.log(`Raw service data for ${id}:`, data);

    try {
      // Process the data to match the ServiceSchema, including seller info
      const sellerInfo = data.seller || {};
      const processedService = {
        ...data,
        seller_name:
          sellerInfo.full_name || sellerInfo.username || 'Unknown Seller',
        seller_avatar_url: sellerInfo.avatar_url || null, // Add avatar URL
        seller_bio: sellerInfo.bio || null, // Add seller bio
        created_at: data.created_at ? String(data.created_at) : null,
      };
      // Remove the nested seller object as it's not part of ServiceSchema
      delete processedService.seller;

      // Validate with ServiceSchema
      const parsedService = ServiceSchema.parse(processedService);
      console.log(`Successfully parsed service ${id}`);
      return parsedService;
    } catch (err) {
      console.error(`Invalid service data for ID ${id}:`, err);
      if (err instanceof z.ZodError) {
        console.error('Zod validation errors:', err.errors);
      }
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

  // Get services with pagination, filtering, and user join
  async getServicesWithPagination({
    limit = 9,
    offset = 0,
    searchTerm = '',
    priceRange = null,
    tags = [],
    sortBy = 'created_at',
    sortOrder = 'desc',
  }: {
    limit?: number;
    offset?: number;
    searchTerm?: string;
    priceRange?: [number, number] | null;
    tags?: string[];
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<{ services: Service[]; total: number }> {
    try {
      let query = supabase.from('services').select(
        `
          *,
          users!services_seller_id_fkey (
            id,
            full_name,
            username,
            avatar_url
          )
          `,
        { count: 'exact' },
      );

      // Apply search term filter if provided
      if (searchTerm && searchTerm.trim() !== '') {
        query = query.ilike('title', `%${searchTerm}%`);
      }

      // Apply price range filter if provided
      if (priceRange && priceRange.length === 2) {
        const [minPrice, maxPrice] = priceRange;
        query = query.gte('price', minPrice).lte('price', maxPrice);
      }

      // Apply tags filter if provided
      if (tags && tags.length > 0) {
        // Use overlap operator to find services with any of the specified tags
        query = query.overlaps('tags', tags);
      }

      // Apply sorting
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });

      // Apply pagination
      query = query.range(offset, offset + limit - 1);

      const { data, error, count } = await query;

      if (error) {
        console.error('Supabase error fetching services:', error);
        return { services: [], total: 0 };
      }

      if (!data || !Array.isArray(data) || data.length === 0) {
        console.log('No services found or empty array returned');
        return { services: [], total: 0 };
      }

      console.log(`Found ${data.length} services with pagination`);

      // Process services one by one to avoid failing all if one fails
      const validServices: Service[] = [];

      for (const service of data) {
        try {
          // Extract seller info from the join result
          const sellerInfo = service.users || {};

          // Process service data
          const processedService = {
            ...service,
            seller_name:
              sellerInfo.full_name || sellerInfo.username || 'Unknown Seller',
            created_at: service.created_at ? String(service.created_at) : null,
          };

          // Remove the nested users object to match our schema
          delete processedService.users;

          const parsedService = ServiceSchema.parse(processedService);
          validServices.push(parsedService);
        } catch (err) {
          console.error(`Error validating service ${service.id}:`, err);
          // Continue with next service instead of failing the whole array
        }
      }

      return {
        services: validServices,
        total: count || validServices.length,
      };
    } catch (err) {
      console.error('Unexpected error in getServicesWithPagination:', err);
      return { services: [], total: 0 };
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

  // Find an existing chat between two users or create a new one
  async findOrCreateChat(
    buyerId: string,
    sellerId: string,
  ): Promise<Chat | null> {
    console.log(
      `findOrCreateChat: Attempting to find/create chat between Buyer ${buyerId} and Seller ${sellerId}`,
    );
    if (!buyerId || !sellerId) {
      console.error(
        'findOrCreateChat: Both buyerId and sellerId are required.',
      );
      return null;
    }
    if (buyerId === sellerId) {
      console.error(
        'findOrCreateChat: buyerId and sellerId cannot be the same.',
      );
      return null;
    }

    try {
      // 1. Check if a chat already exists between these two users
      console.log(
        `findOrCreateChat: Checking for existing chat between ${buyerId} and ${sellerId}`,
      );
      const { data: existingChats, error: findError } = await supabase
        .from('chats')
        .select('*')
        .or(
          `and(buyer_id.eq.${buyerId},seller_id.eq.${sellerId}),and(buyer_id.eq.${sellerId},seller_id.eq.${buyerId})`,
        )
        .limit(1);

      // If the initial find query itself fails, stop here.
      if (findError) {
        console.error(
          'findOrCreateChat: Error finding existing chat:',
          findError,
        );
        return null; // Don't proceed if the check failed
      }

      // If an existing chat is found
      if (existingChats && existingChats.length > 0) {
        console.log(
          `findOrCreateChat: Found existing chat ID: ${existingChats[0].id}`,
        );
        try {
          // Try to parse the existing chat
          const parsedChat = ChatSchema.parse(existingChats[0]);
          return parsedChat; // Return the valid existing chat
        } catch (parseError) {
          console.error(
            'findOrCreateChat: Error parsing existing chat data:',
            parseError,
          );
          // If parsing fails, it indicates data inconsistency. Stop here.
          return null; // Don't proceed to create a duplicate if parsing failed
        }
      }

      // 2. If no chat exists (and the find query didn't error), create a new one
      console.log(
        'findOrCreateChat: No existing chat found, creating a new one.',
      );
      const newChat = await this.createChat({
        buyer_id: buyerId,
        seller_id: sellerId,
        contract_id: null, // Explicitly set contract_id to null
      });

      if (newChat) {
        console.log(
          `findOrCreateChat: Successfully created new chat ID: ${newChat.id}`,
        );
        return newChat;
      } else {
        console.error(
          'findOrCreateChat: Failed to create a new chat (createChat returned null).',
        );
        return null;
      }
    } catch (err) {
      console.error(
        'findOrCreateChat: Unexpected error during find/create process:',
        err,
      );
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

/**
 * Contract Milestone operations
 */
export const contractMilestoneOperations = {
  // Get milestones for a specific contract
  async getMilestonesByContractId(
    contractId: string,
  ): Promise<ContractMilestone[]> {
    console.log(`Fetching milestones for contract ID: ${contractId}`);
    if (!contractId) {
      console.error('getMilestonesByContractId: contractId is required.');
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('contract_milestones')
        .select('*')
        .eq('contract_id', contractId)
        .order('sequence', { ascending: true });

      // Log the raw response from Supabase
      console.log(
        `Raw Supabase response for milestones (contract ${contractId}):`,
        { data, error },
      );

      if (error) {
        console.error(
          `Supabase error fetching milestones for contract ${contractId}:`,
          error,
        );
        return [];
      }

      if (!data || !Array.isArray(data)) {
        console.log(`No milestones found for contract ${contractId}`);
        return [];
      }

      console.log(`Found ${data.length} milestones for contract ${contractId}`);

      // Validate each milestone
      const validMilestones: ContractMilestone[] = [];
      for (const milestone of data) {
        try {
          // Ensure all required fields have appropriate values before parsing
          const processedMilestone = {
            ...milestone,
            id: String(milestone.id),
            contract_id: String(milestone.contract_id),
            description: String(milestone.description || ''),
            due_date: milestone.due_date ? String(milestone.due_date) : null,
            amount:
              typeof milestone.amount === 'number' ? milestone.amount : null,
            status: ['pending', 'approved', 'rejected', 'paid'].includes(
              milestone.status,
            )
              ? milestone.status
              : 'pending',
            sequence:
              typeof milestone.sequence === 'number' ? milestone.sequence : 1,
            created_at: milestone.created_at
              ? String(milestone.created_at)
              : undefined,
            updated_at: milestone.updated_at
              ? String(milestone.updated_at)
              : undefined,
          };
          const parsedMilestone =
            ContractMilestoneSchema.parse(processedMilestone);
          validMilestones.push(parsedMilestone);
        } catch (validationErr) {
          console.error(
            `Error validating milestone ${milestone.id}:`,
            validationErr,
          );
          // Continue with the next milestone
        }
      }
      return validMilestones;
    } catch (err) {
      console.error(
        `Unexpected error in getMilestonesByContractId for ${contractId}:`,
        err,
      );
      return [];
    }
  },

  // Add other milestone operations here (create, update, delete) if needed later
  // Update milestone status
  async updateMilestoneStatus(
    milestoneId: string,
    status: ContractMilestone['status'],
  ): Promise<ContractMilestone | null> {
    console.log(`Updating milestone ${milestoneId} to status: ${status}`);
    if (!milestoneId || !status) {
      console.error(
        'updateMilestoneStatus: milestoneId and status are required.',
      );
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('contract_milestones')
        .update({ status: status, updated_at: new Date().toISOString() }) // Also update updated_at
        .eq('id', milestoneId)
        .select()
        .single();

      if (error) {
        console.error(
          `Supabase error updating milestone ${milestoneId}:`,
          error,
        );
        return null;
      }
      if (!data) {
        console.error(
          `No data returned after updating milestone ${milestoneId}.`,
        );
        return null;
      }

      console.log(`Milestone ${milestoneId} status updated successfully.`);
      // Validate the returned data
      const parsedMilestone = ContractMilestoneSchema.parse(data);
      return parsedMilestone;
    } catch (err) {
      console.error(
        `Unexpected error in updateMilestoneStatus for ${milestoneId}:`,
        err,
      );
      if (err instanceof z.ZodError) {
        console.error('Zod validation errors:', err.errors);
      }
      return null;
    }
  },

  // Create a new milestone
  async createMilestone(
    milestoneData: Omit<ContractMilestone, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<ContractMilestone | null> {
    console.log(
      'Creating new milestone for contract:',
      milestoneData.contract_id,
    );

    try {
      // Default status to pending if not provided
      const dataToInsert = {
        ...milestoneData,
        status: milestoneData.status || 'pending',
        // created_at and updated_at will be set by the database or triggers
      };

      const { data, error } = await supabase
        .from('contract_milestones')
        .insert(dataToInsert)
        .select()
        .single();

      if (error) {
        console.error('Supabase error creating milestone:', error);
        return null;
      }
      if (!data) {
        console.error('No data returned after creating milestone.');
        return null;
      }

      console.log('Milestone created successfully:', data.id);
      // Validate the returned data
      const parsedMilestone = ContractMilestoneSchema.parse(data);
      return parsedMilestone;
    } catch (err) {
      console.error('Unexpected error in createMilestone:', err);
      if (err instanceof z.ZodError) {
        console.error('Zod validation errors:', err.errors);
      }
      return null;
    }
  },
};
