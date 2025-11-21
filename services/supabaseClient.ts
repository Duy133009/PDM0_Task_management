import { createClient } from '@supabase/supabase-js';

// Credentials from the old task-manager-login repo
const supabaseUrl = 'https://hiojtrjfatfxbffrihnx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhpb2p0cmpmYXRmeGJmZnJpaG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1Njk1NjEsImV4cCI6MjA3ODE0NTU2MX0.HuCpZ2HaNrPXrh6mGR9aH6VGQXEQyDFHzP3_ep9f8Eg';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const isSupabaseConfigured = () => {
    return true;
}