import { createClient } from '@supabase/supabase-js';

// In a real app, these would come from import.meta.env or process.env
// Users should configure these in their environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper to demonstrate intent without breaking the demo if creds are missing
export const isSupabaseConfigured = () => {
    return supabaseUrl !== 'https://placeholder.supabase.co';
}