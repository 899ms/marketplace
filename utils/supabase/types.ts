import { z } from 'zod';

// --- Auth User Schema (Maps to auth.users) ---
// Corresponds to Supabase's user object. Added full_name based on dashboard usage.
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email().optional(), // Email might not always be present depending on auth method
  full_name: z
    .string()
    .nullable()
    .describe('From profiles table, might be null'), // Often fetched via join
  avatar_url: z
    .string()
    .url()
    .nullable()
    .describe('From profiles table, might be null'), // Often fetched via join
  // Supabase auth schema has more fields like phone, created_at, etc. Add as needed.
});
export type User = z.infer<typeof UserSchema>;

// --- Profile Schema (Maps to public.profiles) ---
// Stores public user information, linked to auth.users
// Based on app/dashboard/page.tsx and client/worker data structures
export const ProfileSchema = z.object({
  id: z.string().uuid(), // Primary key of the profiles table
  user_id: z.string().uuid().describe('Foreign key to auth.users.id'),
  username: z.string().min(3).max(50).nullable(),
  full_name: z.string().nullable(), // Used in dashboard
  bio: z.string().max(1000).nullable(), // Increased length based on worker about section
  avatar_url: z.string().url().nullable(), // Used in various components
  website: z.string().url().nullable(),
  rating: z.number().min(0).max(5).nullable().default(0), // Seen in worker/client data
  review_count: z.number().int().nonnegative().nullable().default(0), // Seen in worker/client data
  is_verified: z.boolean().nullable().default(false), // Seen in client data
  // Add other fields observed like social links, is_google, etc., potentially as jsonb
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
});
export type Profile = z.infer<typeof ProfileSchema>;

// --- Project Schema (Maps to public.projects or public.jobs) ---
// Based on app/projects/[id]/page.tsx and app/jobs/create/page.tsx
export const ProjectSchema = z.object({
  id: z.string().uuid(),
  client_id: z.string().uuid().describe('Foreign key to public.profiles.id'), // The user who posted the project
  title: z.string().min(1).max(200),
  subject: z
    .string()
    .min(1)
    .max(200)
    .optional()
    .describe('From job create form, might be same as title'),
  detail: z
    .string()
    .max(5000)
    .nullable()
    .describe('From job create form, project description'), // Allow longer descriptions
  category: z.string().nullable(),
  description: z
    .array(z.string())
    .nullable()
    .describe('Array of description paragraphs? Or single TEXT?'), // Or z.string().nullable()
  requirements: z.array(z.string()).nullable(), // List of requirements
  skills: z.array(z.string()).nullable(), // List of required skills
  // attachments: z.array(z.object({ name: z.string(), type: z.string(), size: z.string() })).nullable(), // Consider storing file metadata or just URLs
  budget: z.number().positive().nullable(), // Assuming numeric, adjust precision as needed
  currency: z.string().length(3).nullable().default('USD'), // From job create form
  deadline: z.string().datetime().nullable(), // Or z.date() depending on DB type
  status: z
    .enum(['open', 'in_progress', 'completed', 'cancelled'])
    .default('open'), // Example statuses
  proposals_count: z.number().int().nonnegative().nullable().default(0),
  // faqs: z.array(z.object({ question: z.string(), answer: z.string(), isOpen: z.boolean() })).nullable(), // Could be jsonb
  // applicants: z.array(z.object({ id: z.string(), name: z.string(), ... })).nullable(), // Probably better handled in a separate applicants table
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // Fields from Job Create Form:
  sources: z.array(z.string()).nullable().describe('Candidate sources'),
  usage_option: z.string().nullable(),
  privacy_option: z.string().nullable(),
});
export type Project = z.infer<typeof ProjectSchema>;

// --- Service Schema (Maps to public.services) ---
// Based on app/services/[id]/page.tsx (RelatedService) and app/workers/[id]/page.tsx (ServiceItemData)
export const ServiceSchema = z.object({
  id: z.string().uuid(),
  worker_id: z.string().uuid().describe('Foreign key to public.profiles.id'), // The worker offering the service
  title: z.string().min(1).max(200),
  description: z.string().max(2000).nullable(),
  price: z.number().nonnegative(), // Allow 0 for "contact for pricing"
  // image: z.string().url().nullable(), // Placeholder URL or actual image storage ref
  rating: z.number().min(0).max(5).nullable().default(0),
  review_count: z.number().int().nonnegative().nullable().default(0),
  // Consider adding category, tags, etc.
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
});
export type Service = z.infer<typeof ServiceSchema>;

// --- Review Schema (Maps to public.reviews) ---
// Based on app/services/[id]/page.tsx (Review) and app/workers/[id]/page.tsx (ReviewItemData)
export const ReviewSchema = z.object({
  id: z.string().uuid(),
  reviewer_id: z.string().uuid().describe('Foreign key to public.profiles.id'), // User who wrote the review
  target_profile_id: z
    .string()
    .uuid()
    .nullable()
    .describe('Reviewed profile ID (worker/client)'),
  target_service_id: z
    .string()
    .uuid()
    .nullable()
    .describe('Reviewed service ID'),
  target_project_id: z
    .string()
    .uuid()
    .nullable()
    .describe('Reviewed project ID'), // Or target_job_id
  rating: z.number().min(1).max(5), // Assuming rating is mandatory 1-5
  content: z.string().max(2000).nullable().describe('Review text'),
  contract_title: z
    .string()
    .nullable()
    .describe('Associated contract/project title'), // As seen in ReviewItemData
  amount: z
    .number()
    .positive()
    .nullable()
    .describe('Associated contract amount'), // As seen in ReviewItemData
  created_at: z.string().datetime(), // Review date
  // Need constraints to ensure at least one target_*_id is set
});
export type Review = z.infer<typeof ReviewSchema>;

// --- Work Item Schema (Maps to public.work_items) ---
// Based on app/workers/[id]/page.tsx (WorkItemData) - Portfolio items for workers
export const WorkItemSchema = z.object({
  id: z.string().uuid(),
  worker_id: z.string().uuid().describe('Foreign key to public.profiles.id'),
  title: z.string().min(1).max(150),
  description: z.string().max(1000).nullable(),
  genres: z.array(z.string()).nullable(),
  duration: z
    .string()
    .nullable()
    .describe('Formatted duration string like 0:22'), // Or store as seconds (number)?
  bpm: z.string().nullable().describe('Formatted BPM string like 112 BPM'), // Or store as number?
  // Add fields for media URLs (audio, video, image)
  media_url: z.string().url().nullable(),
  thumbnail_url: z.string().url().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
});
export type WorkItem = z.infer<typeof WorkItemSchema>;

// --- Skill Schema (Could be public.skills table or used within JSON) ---
// Based on app/workers/[id]/page.tsx workerData.skills
export const SkillSchema = z.object({
  name: z.string(),
  details: z.string().nullable(),
  price_info: z
    .string()
    .nullable()
    .describe('e.g., "$150 per song" or "Contact for Pricing"'), // Or separate price/currency fields
  // Could link to a predefined list of skills: skill_id: z.string().uuid()
});
export type Skill = z.infer<typeof SkillSchema>;

// --- Award Schema (Could be public.awards table or used within JSON) ---
// Based on app/workers/[id]/page.tsx workerData.awards
export const AwardSchema = z.object({
  name: z.string(),
  // year: z.number().int().optional(),
  // issuing_body: z.string().optional(),
});
export type Award = z.infer<typeof AwardSchema>;

// --- FAQ Schema (Could be public.faqs table or used within JSON) ---
// Based on app/projects/[id]/page.tsx projectData.faqs
export const FaqSchema = z.object({
  question: z.string(),
  answer: z.string().nullable(),
  // project_id: z.string().uuid().optional(), // If stored in separate table
  // service_id: z.string().uuid().optional(), // If stored in separate table
});
export type Faq = z.infer<typeof FaqSchema>;

// --- Attachment Schema (Could be public.attachments table or used within JSON) ---
// Based on app/projects/[id]/page.tsx projectData.attachments
export const AttachmentSchema = z.object({
  name: z.string(),
  type: z.string().describe('e.g., "audio", "document", "image"'), // Or use mime type
  size_description: z.string().nullable().describe('e.g., "2.4 MB"'), // Store size in bytes (number) instead?
  url: z.string().url().describe('URL to the stored file in Supabase Storage'),
  // project_id: z.string().uuid().optional(), // If stored in separate table
});
export type Attachment = z.infer<typeof AttachmentSchema>;
