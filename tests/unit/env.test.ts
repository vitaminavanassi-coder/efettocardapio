import { describe, expect, it } from "vitest";

import { getRequiredEnv } from "@/lib/env";

describe("getRequiredEnv", () => {
  it("throws when a required env var is missing", () => {
    expect(() => getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL")).toThrow(
      "Missing required environment variable: NEXT_PUBLIC_SUPABASE_URL",
    );
  });
});
