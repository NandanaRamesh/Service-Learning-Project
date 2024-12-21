import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Persist user sessions across page reloads
    autoRefreshToken: true, // Automatically refresh tokens when they expire
    detectSessionInUrl: true, // Detect session from URL query parameters
  },
});
