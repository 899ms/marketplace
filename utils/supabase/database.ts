import { supabase } from './client';
import { createServerClient } from './server';
import {
  UserSchema,
  ProfileSchema,
  TrackSchema,
  OrderSchema,
  User,
  Profile,
  Track,
  Order,
} from './types';

/**
 * User-related database operations
 */
export const userOperations = {
  // Get user by ID
  async getUserById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;

    try {
      return UserSchema.parse(data);
    } catch (err) {
      console.error('Invalid user data:', err);
      return null;
    }
  },

  // Get user profile
  async getUserProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !data) return null;

    try {
      return ProfileSchema.parse(data);
    } catch (err) {
      console.error('Invalid profile data:', err);
      return null;
    }
  },

  // Update user profile
  async updateUserProfile(
    profile: Partial<Profile> & { user_id: string },
  ): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        ...profile,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error || !data) {
      console.error('Error updating profile:', error);
      return null;
    }

    try {
      return ProfileSchema.parse(data);
    } catch (err) {
      console.error('Invalid profile data after update:', err);
      return null;
    }
  },
};

/**
 * Track-related database operations
 */
export const trackOperations = {
  // Get all tracks
  async getAllTracks(): Promise<Track[]> {
    const { data, error } = await supabase
      .from('tracks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return [];

    try {
      return data.map((track) => TrackSchema.parse(track));
    } catch (err) {
      console.error('Invalid track data:', err);
      return [];
    }
  },

  // Get track by ID
  async getTrackById(id: string): Promise<Track | null> {
    const { data, error } = await supabase
      .from('tracks')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;

    try {
      return TrackSchema.parse(data);
    } catch (err) {
      console.error('Invalid track data:', err);
      return null;
    }
  },

  // Create a new track
  async createTrack(
    track: Omit<Track, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<Track | null> {
    const { data, error } = await supabase
      .from('tracks')
      .insert({
        ...track,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error || !data) {
      console.error('Error creating track:', error);
      return null;
    }

    try {
      return TrackSchema.parse(data);
    } catch (err) {
      console.error('Invalid track data after creation:', err);
      return null;
    }
  },
};

/**
 * Order-related database operations
 */
export const orderOperations = {
  // Get all orders for a user
  async getUserOrders(userId: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error || !data) return [];

    try {
      return data.map((order) => OrderSchema.parse(order));
    } catch (err) {
      console.error('Invalid order data:', err);
      return [];
    }
  },

  // Create a new order
  async createOrder(
    order: Omit<Order, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<Order | null> {
    const { data, error } = await supabase
      .from('orders')
      .insert({
        ...order,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error || !data) {
      console.error('Error creating order:', error);
      return null;
    }

    try {
      return OrderSchema.parse(data);
    } catch (err) {
      console.error('Invalid order data after creation:', err);
      return null;
    }
  },

  // Update order status
  async updateOrderStatus(
    orderId: string,
    status: Order['status'],
  ): Promise<Order | null> {
    const { data, error } = await supabase
      .from('orders')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId)
      .select()
      .single();

    if (error || !data) {
      console.error('Error updating order:', error);
      return null;
    }

    try {
      return OrderSchema.parse(data);
    } catch (err) {
      console.error('Invalid order data after update:', err);
      return null;
    }
  },
};
