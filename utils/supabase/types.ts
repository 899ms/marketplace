import { z } from 'zod';

// --- User Schema (maps to public.users) ---
export const UserSchema = z.object({
  id: z.string(), // TEXT primary key in SQL
  created_at: z.string().datetime().optional(), // TIMESTAMPTZ default NOW()
  username: z.string(), // TEXT UNIQUE NOT NULL
  full_name: z.string(), // TEXT NOT NULL
  avatar_url: z.string().url().nullable(), // TEXT, nullable
  bio: z.string().nullable(), // TEXT, nullable
  user_type: z.enum(['buyer', 'seller']), // TEXT NOT NULL CHECK
  balance: z.number().optional(), // DECIMAL default 1000
  language: z.enum(['en', 'zh']).optional(), // TEXT default 'zh' CHECK
});
export type User = z.infer<typeof UserSchema>;

// --- Job Schema (maps to public.jobs) ---
export const JobSchema = z.object({
  id: z.string().uuid(), // UUID primary key default uuid_generate_v4()
  created_at: z.string().datetime().optional(), // TIMESTAMPTZ default NOW()
  title: z.string(), // TEXT NOT NULL
  description: z.string(), // TEXT NOT NULL
  requirements: z.string(), // TEXT NOT NULL (If this should be an array, use z.array(z.string()))
  budget: z.number(), // DECIMAL NOT NULL
  buyer_id: z.string(), // TEXT NOT NULL REFERENCES users(id)
  status: z.enum(['open', 'in_progress', 'completed']).optional(), // TEXT default 'open' CHECK
});
export type Job = z.infer<typeof JobSchema>;

// --- Service Schema (maps to public.services) ---
export const ServiceSchema = z.object({
  id: z.string().uuid(), // UUID primary key default uuid_generate_v4()
  created_at: z.string().datetime().optional(), // TIMESTAMPTZ default NOW()
  title: z.string(), // TEXT NOT NULL
  description: z.string(), // TEXT NOT NULL
  price: z.number(), // DECIMAL NOT NULL
  seller_id: z.string(), // TEXT NOT NULL REFERENCES users(id)
  audio_url: z.string().url().nullable(), // TEXT, nullable
});
export type Service = z.infer<typeof ServiceSchema>;

// --- Contract Schema (maps to public.contracts) ---
export const ContractSchema = z
  .object({
    id: z.string().uuid(), // UUID primary key default uuid_generate_v4()
    created_at: z.string().datetime().optional(), // TIMESTAMPTZ default NOW()
    buyer_id: z.string(), // TEXT NOT NULL REFERENCES users(id)
    seller_id: z.string(), // TEXT NOT NULL REFERENCES users(id)
    job_id: z.string().uuid().nullable(), // UUID REFERENCES jobs(id), nullable
    service_id: z.string().uuid().nullable(), // UUID REFERENCES services(id), nullable
    status: z.enum(['pending', 'accepted', 'rejected', 'completed']).optional(), // TEXT default 'pending' CHECK
    amount: z.number(), // DECIMAL NOT NULL
    description: z.string(), // TEXT NOT NULL
  })
  .refine((data) => data.job_id !== null || data.service_id !== null, {
    message: 'Either job_id or service_id must be provided',
    path: ['job_id', 'service_id'], // Adjust path if needed
  });
export type Contract = z.infer<typeof ContractSchema>;

// --- Chat Schema (maps to public.chats) ---
export const ChatSchema = z.object({
  id: z.string().uuid(), // UUID primary key default uuid_generate_v4()
  created_at: z.string().datetime().optional(), // TIMESTAMPTZ default NOW()
  buyer_id: z.string(), // TEXT NOT NULL REFERENCES users(id)
  seller_id: z.string(), // TEXT NOT NULL REFERENCES users(id)
  contract_id: z.string().uuid().nullable(), // UUID REFERENCES contracts(id), nullable
});
export type Chat = z.infer<typeof ChatSchema>;

// --- Message Schema (maps to public.messages) ---
export const MessageSchema = z.object({
  id: z.string().uuid(), // UUID primary key default uuid_generate_v4()
  created_at: z.string().datetime().optional(), // TIMESTAMPTZ default NOW()
  chat_id: z.string().uuid(), // UUID NOT NULL REFERENCES chats(id)
  sender_id: z.string(), // TEXT NOT NULL REFERENCES users(id)
  content: z.string(), // TEXT NOT NULL
  read: z.boolean().optional(), // BOOLEAN default FALSE
});
export type Message = z.infer<typeof MessageSchema>;
