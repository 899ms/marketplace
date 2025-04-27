import { z } from 'zod';

// User schema
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  full_name: z.string().nullable(),
  avatar_url: z.string().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
});

export type User = z.infer<typeof UserSchema>;

// Profile schema
export const ProfileSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  username: z.string().min(3).max(50).nullable(),
  bio: z.string().max(500).nullable(),
  website: z.string().url().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
});

export type Profile = z.infer<typeof ProfileSchema>;

// You can add more schemas as needed for your project
// Example for a music-related marketplace:

export const TrackSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(100),
  artist_id: z.string().uuid(),
  description: z.string().max(1000).nullable(),
  price: z.number().positive(),
  genre: z.string().nullable(),
  duration: z.number().positive(),
  cover_url: z.string().url().nullable(),
  audio_url: z.string().url(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
});

export type Track = z.infer<typeof TrackSchema>;

export const OrderSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  track_id: z.string().uuid(),
  status: z.enum(['pending', 'completed', 'cancelled']),
  amount: z.number().positive(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
});

export type Order = z.infer<typeof OrderSchema>;
