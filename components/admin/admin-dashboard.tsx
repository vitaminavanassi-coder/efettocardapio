"use client";

import { BrandLogo } from "@/components/brand/brand-logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { NewOrderSound } from "@/components/admin/new-order-sound";
import { OrderList } from "@/components/admin/order-list";
import type { OrderListItem } from "@/lib/orders";
import { useOrdersRealtime } from "@/hooks/use-orders-realtime";

type AdminDashboardProps = {
  orders: OrderListItem[];
};

export function AdminDashboard({ orders }: AdminDashboardProps) {
  const router = useRouter();
  const [soundTick, setSoundTick] = useState(0);

  useOrdersRealtime({
    onOrderInserted() {
      setSoundTick((value) => value + 1);
      router.refresh();
    },
    onOrderUpdated() {
      router.refresh();
    },
  });

  const newOrders = orders.filter((order) => order.status === "novo").length;

  return (
    <main className="min-h-screen px-4 py-5 text-ink sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="glass-shell rounded-[3rem] p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <BrandLogo className="h-auto w-[14rem]" />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="glass-panel rounded-[1.6rem] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Novos</p>
                <p className="mt-2 text-3xl font-semibold text-[#8f562f]">{newOrders}</p>
              </div>
              <div className="glass-panel rounded-[1.6rem] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Total</p>
                <p className="mt-2 text-3xl font-semibold text-[#5a3a28]">{orders.length}</p>
              </div>
              <div className="glass-panel rounded-[1.6rem] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Tela</p>
                <p className="mt-2 text-lg font-semibold text-[#5a3a28]">/admin</p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <Link
              href="/admin/inventory"
              className="glass-button-secondary inline-flex rounded-full px-4 py-2.5 text-sm font-medium text-[#9a603a]"
            >
              Abrir mini estoque
            </Link>
          </div>
        </header>

        <section className="mt-6">
          <OrderList orders={orders} />
        </section>
      </div>

      <NewOrderSound tick={soundTick} />
    </main>
  );
}
