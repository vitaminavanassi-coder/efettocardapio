"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import { getPublicSupabaseEnv } from "@/lib/env";
import type { Database } from "@/types/database";

let browserClient: SupabaseClient<Database> | undefined;

export function getSupabaseBrowserClient() {
  if (!browserClient) {
    const { url, anonKey } = getPublicSupabaseEnv();
    browserClient = createBrowserClient<Database>(url, anonKey);
  }

  return browserClient;
}
