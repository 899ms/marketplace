import { z } from 'zod';

// Define the payment type enum
const PaymentType = z.enum(['one-time', 'installment']);

// Define the milestone schema for installment payments
const MilestoneSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().length(3, 'Currency code must be 3 letters'), // Assuming 3-letter currency codes like CNY
  deadline: z.date().optional(),
});

// Define the main form schema
export const SendOfferSchema = z
  .object({
    // Job Details
    // Assuming 'sendTo' and 'selectOrder' might be IDs or more complex objects later,
    // using string for now.
    sendTo: z.string().min(1, 'Recipient is required'),
    selectOrder: z.string().min(1, 'Order selection is required'),
    contractTitle: z.string().min(1, 'Contract title is required'),
    description: z.string().min(1, 'Description is required').max(1000),
    skillLevels: z
      .array(z.string())
      .min(1, 'At least one skill level is required'), // Assuming skill levels are strings

    // Contract Terms
    paymentType: PaymentType,
    amount: z.number().positive('Amount must be positive').optional(), // Optional for installment
    currency: z
      .string()
      .length(3, 'Currency code must be 3 letters')
      .optional(), // Optional for installment
    deadline: z.date().optional(),

    // Installment specific fields
    milestones: z.array(MilestoneSchema).optional(),

    // Attachments - Handling files needs client-side logic beyond basic schema
    // For schema, we might just track if files are present or their metadata later.
    // attachments: z.array(z.any()).optional(), // Placeholder

    // Agreement
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms and conditions',
    }),
  })
  .refine(
    (data) => {
      if (data.paymentType === 'one-time') {
        // For one-time payment, amount and currency are required
        return data.amount !== undefined && data.currency !== undefined;
      }
      return true;
    },
    {
      message: 'Amount and currency are required for one-time payment',
      path: ['amount'], // You can associate the error with a specific field
    },
  )
  .refine(
    (data) => {
      if (data.paymentType === 'installment') {
        // For installment payment, milestones are required
        return data.milestones && data.milestones.length > 0;
      }
      return true;
    },
    {
      message: 'At least one milestone is required for installment payment',
      path: ['milestones'],
    },
  );

// Export the inferred TypeScript type
export type SendOfferFormData = z.infer<typeof SendOfferSchema>;
