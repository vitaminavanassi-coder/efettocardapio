"use client";

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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(46,140,132,0.18),_transparent_28%),linear-gradient(180deg,#fffdf8_0%,#eef5f4_100%)] px-4 py-5 text-ink sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-[2rem] bg-[linear-gradient(135deg,#102133,#1b4853)] p-6 text-white shadow-soft">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                Painel da recepcao
              </p>
              <h1 className="mt-3 text-3xl font-semibold">
                Pedidos chegando em tempo real
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
                Acompanhe os pedidos novos, confirme as entregas e mantenha a operacao
                fluindo sem perder nenhuma solicitacao.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-[1.4rem] bg-white/10 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-white/65">Novos</p>
                <p className="mt-2 text-3xl font-semibold">{newOrders}</p>
              </div>
              <div className="rounded-[1.4rem] bg-white/10 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-white/65">Total</p>
                <p className="mt-2 text-3xl font-semibold">{orders.length}</p>
              </div>
              <div className="rounded-[1.4rem] bg-white/10 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-white/65">Tela</p>
                <p className="mt-2 text-lg font-semibold">/admin</p>
              </div>
            </div>
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
