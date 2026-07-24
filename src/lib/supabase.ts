import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySupabase = SupabaseClient<any, 'public', any>;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

let client: AnySupabase | null = null;

export function getSupabase() {
  if (!client) {
    client = createClient(supabaseUrl, supabaseKey);
  }
  return client;
}
