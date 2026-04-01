import { createClient } from "@supabase/supabase-js";

import { getRequiredEnv } from "@/lib/env";

let adminClient: ReturnType<typeof createClient> | undefined;

export function getSupabaseAdminClient() {
  if (!adminClient) {
    adminClient = createClient(
      getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
      getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );
  }

  return adminClient;
}
