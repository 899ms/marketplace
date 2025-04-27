import { z } from 'zod';

// Based on FormData interface and potential alignment with JobSchema
export const CreateJobFormSchema = z.object({
  // Step 1: Basic Info
  title: z.string().min(1, 'Subject is required'), // Renamed from 'subject' to match JobSchema
  description: z
    .string()
    .min(1, 'Detail is required')
    .max(1000, 'Detail must be 1000 characters or less'), // Renamed from 'detail'
  budget: z
    .number({ invalid_type_error: 'Amount must be a number' })
    .positive('Amount must be positive'), // Renamed from 'amount', ensure it's positive
  currency: z.string().min(1, 'Currency is required').default('USD'), // Assuming USD default
  deadline: z.string().optional(), // Keep as string for now, could use z.date() if using a date picker component that yields Date objects
  negotiateBudget: z.boolean().optional().default(false),

  // Step 2: Skills (Refining based on JobSchema - requirements could map here)
  requirements: z.string().min(1, 'Requirements are required'), // Map 'skills', 'sources', 'files' potentially into a richer 'requirements' text field or structured data if needed later
  // skills: z.array(z.string()).optional(), // Keep if needed separately
  // sources: z.array(z.string()).optional(), // Keep if needed separately
  // files: z.custom<File[]>().optional(), // Use z.custom for File objects, add validation if needed

  // Step 3: Usage
  usageOption: z
    .enum(['private', 'business'], {
      required_error: 'Usage option is required',
    })
    .default('private'),
  privacyOption: z
    .enum(['public', 'private'], {
      required_error: 'Privacy option is required',
    })
    .default('public'),

  // Potentially add buyer_id here if needed, though it might be added server-side or contextually
  // buyer_id: z.string().uuid('Invalid buyer ID'),
});

export type CreateJobFormData = z.infer<typeof CreateJobFormSchema>;

// Example of refining requirements if it was more structured
// requirements: z.object({
//   skills: z.array(z.string()).optional(),
//   sources: z.array(z.string()).optional(),
//   // Add more fields as needed
// }).optional(),
