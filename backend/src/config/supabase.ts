import { createClient } from '@supabase/supabase-js';
import { env } from './env';

// Create a Supabase client with the Service Role key for backend operations
// (e.g., verifying users, accessing storage directly, bypassing RLS)
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
