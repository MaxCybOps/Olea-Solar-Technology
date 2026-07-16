import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// Server-side admin client — uses service role key, bypasses RLS
// Never import this in client components or expose to the browser
let _admin: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseAdmin() {
  if (!_admin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error("Supabase admin env vars are not set");
    _admin = createClient<Database>(url, key);
  }
  return _admin;
}

// Named export kept for backwards compat — resolves lazily via getter
export const supabaseAdmin = new Proxy({} as ReturnType<typeof createClient<Database>>, {
  get(_target, prop) {
    return (getSupabaseAdmin() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
