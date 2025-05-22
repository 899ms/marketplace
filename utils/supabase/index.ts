// Client exports
export { default as supabase } from './client';

// Types exports
export * from './types';

// Operations exports
export { userOperations } from './database';

export { authOperations } from './auth';
export type { SignUpCredentials, SignInCredentials } from './auth';

// Authentication exports
export { SignUpSchema, SignInSchema } from './auth';
