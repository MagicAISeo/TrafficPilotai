import { createClient } from '@supabase/supabase-js';

const meta = import.meta as unknown as { env?: Record<string, string> };

const SUPABASE_URL =
  meta.env?.VITE_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  'https://skvgazailxpzbrsfzqqz.supabase.co';

const SUPABASE_ANON_KEY =
  meta.env?.VITE_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  'sb_publishable_R-IaEV-C4FgDz3y-fna9xA_NxHM7KBy';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const SUPABASE_CONFIG = {
  projectId: 'skvgazailxpzbrsfzqqz',
  supabaseUrl: SUPABASE_URL,
  publishableKey: SUPABASE_ANON_KEY,
};

