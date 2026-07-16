import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// Browser-side client — uses anon key, respects Row Level Security
// Lazy singleton so the module can be imported during SSR/build without crashing
let _client: ReturnType<typeof createClient<Database>> | null = null;

function getSupabaseClient() {
  if (!_client) {
    _client = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return _client;
}

export const supabase = new Proxy({} as ReturnType<typeof createClient<Database>>, {
  get(_target, prop) {
    const client = getSupabaseClient();
    const value = (client as unknown as Record<string | symbol, unknown>)[prop];
    if (typeof value === "function") {
      return (value as Function).bind(client);
    }
    return value;
  },
});
