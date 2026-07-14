import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// Browser-side client — uses anon key, respects Row Level Security
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
