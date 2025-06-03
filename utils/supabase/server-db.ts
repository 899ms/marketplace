import { createSupabaseServerClient } from './server';
import { User, Job, UserSchema } from './types';
import { z } from 'zod';

export const serverDbOperations = {
  async getUserById(id: string): Promise<User | null> {
    console.log(`[SERVER] getUserById: Fetching user with ID: ${id}`);
    const supabase = await createSupabaseServerClient();

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error(`[SERVER] getUserById DB Error for ID ${id}:`, error.message);
        return null;
      }

      if (!data) {
        console.error(`[SERVER] getUserById: No data returned for ID ${id}`);
        return null;
      }

      console.log(`[SERVER] getUserById: Raw data fetched:`, JSON.stringify(data));

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

      try {
        const parsedUser = UserSchema.parse(processedData);
        console.log(`[SERVER] getUserById: Successfully parsed data for ID ${id}`);
        return parsedUser;
      } catch (validationErr) {
        if (validationErr instanceof z.ZodError) {
          console.error(`[SERVER] getUserById Zod validation errors:`);
          validationErr.errors.forEach((error, index) => {
            console.error(
              `Error ${index + 1}: Path: [${error.path.join('.')}], Message: ${error.message}`,
            );
          });
        }

        // Try a more forgiving approach - create a valid user with defaults if possible
        console.log('[SERVER] Attempting to create a valid user with defaults');
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
      console.error(`[SERVER] getUserById Unexpected error for ID ${id}:`, err);
      return null;
    }
  },

  async getRecentJobs(limit = 3): Promise<Job[]> {
    console.log(`[SERVER] Fetching recent ${limit} jobs`);
    const supabase = await createSupabaseServerClient();

    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('[SERVER] Error fetching recent jobs:', error);
        return [];
      }

      if (!data || !Array.isArray(data) || data.length === 0) {
        console.log('[SERVER] No jobs found');
        return [];
      }

      console.log(`[SERVER] Found ${data.length} recent jobs`);
      return data as Job[];
    } catch (err) {
      console.error('[SERVER] Unexpected error in getRecentJobs:', err);
      return [];
    }
  }
}; 