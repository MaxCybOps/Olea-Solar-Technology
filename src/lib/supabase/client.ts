import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

// Browser-side client — uses anon key, respects Row Level Security.
// Uses createBrowserClient (not plain createClient) so the auth session is
// persisted in cookies, not localStorage — server components and middleware
// read the session from cookies, so this is required for admin auth to work.
// Lazy singleton so the module can be imported during SSR/build without crashing.
let _client: ReturnType<typeof createBrowserClient<Database>> | null = null;

function getSupabaseClient() {
  if (!_client) {
    _client = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return _client;
}

export const supabase = new Proxy({} as ReturnType<typeof createBrowserClient<Database>>, {
  get(_target, prop) {
    const client = getSupabaseClient();
    const value = (client as unknown as Record<string | symbol, unknown>)[prop];
    if (typeof value === "function") {
      return (value as Function).bind(client);
    }
    return value;
  },
});
