"use client";

import { useEffect } from "react";

import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

type UseOrdersRealtimeOptions = {
  onOrderInserted: () => void;
  onOrderUpdated: () => void;
};

export function useOrdersRealtime({
  onOrderInserted,
  onOrderUpdated,
}: UseOrdersRealtimeOptions) {
  useEffect(() => {
    try {
      const supabase = getSupabaseBrowserClient();
      const channel = supabase
        .channel("admin-orders")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "orders",
          },
          () => onOrderInserted(),
        )
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "orders",
          },
          () => onOrderUpdated(),
        )
        .subscribe();

      return () => {
        void supabase.removeChannel(channel);
      };
    } catch {
      return;
    }
  }, [onOrderInserted, onOrderUpdated]);
}
