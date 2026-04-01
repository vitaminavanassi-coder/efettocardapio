"use client";

import { startTransition, useCallback, useEffect, useRef, useState } from "react";

import { AdminAlertsToggle } from "@/components/admin/admin-alerts-toggle";
import { BrandLogo } from "@/components/brand/brand-logo";
import Link from "next/link";

import { NewOrderSound } from "@/components/admin/new-order-sound";
import { OrderList } from "@/components/admin/order-list";
import type { OrderListItem } from "@/lib/orders";
import { useOrdersRealtime } from "@/hooks/use-orders-realtime";

type AdminDashboardProps = {
  orders: OrderListItem[];
};

export function AdminDashboard({ orders }: AdminDashboardProps) {
  const [liveOrders, setLiveOrders] = useState(orders);
  const [soundTick, setSoundTick] = useState(0);
  const [latestAlertPatient, setLatestAlertPatient] = useState("");
  const liveOrdersRef = useRef(orders);

  useEffect(() => {
    setLiveOrders(orders);
  }, [orders]);

  useEffect(() => {
    liveOrdersRef.current = liveOrders;
  }, [liveOrders]);

  const refreshOrders = useCallback(async (playAlert: boolean) => {
    const response = await fetch("/api/admin/orders", { cache: "no-store" });

    if (!response.ok) {
      return;
    }

    const data = (await response.json()) as { orders: OrderListItem[] };
    const previousOrders = liveOrdersRef.current;

    setLiveOrders(data.orders);

    if (!playAlert) {
      return;
    }

    const previousIds = new Set(previousOrders.map((order) => order.id));
    const latestNewOrder = data.orders.find(
      (order) => order.status === "novo" && !previousIds.has(order.id),
    );

    if (latestNewOrder) {
      setLatestAlertPatient(latestNewOrder.patientName);
      setSoundTick((value) => value + 1);
    }
  }, []);

  function markOrderAsDelivered(orderId: string) {
    startTransition(() => {
      setLiveOrders((currentOrders) =>
        currentOrders
          .map((order) =>
            order.id === orderId
              ? {
                  ...order,
                  status: "entregue" as const,
                  deliveredAt: new Date().toISOString(),
                }
              : order,
          )
          .sort((left, right) => Number(left.status === "entregue") - Number(right.status === "entregue")),
      );
    });

    void refreshOrders(false);
  }

  useOrdersRealtime({
    onOrderInserted() {
      void refreshOrders(true);
    },
    onOrderUpdated() {
      void refreshOrders(false);
    },
  });

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      void refreshOrders(false);
    }, 1000);

    function handleFocus() {
      void refreshOrders(false);
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        void refreshOrders(false);
      }
    }

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [refreshOrders]);

  const newOrders = liveOrders.filter((order) => order.status === "novo");
  const deliveredOrders = liveOrders.filter((order) => order.status === "entregue");

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
                <p className="mt-2 text-3xl font-semibold text-[#8f562f]">{newOrders.length}</p>
              </div>
              <div className="glass-panel rounded-[1.6rem] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Total</p>
                <p className="mt-2 text-3xl font-semibold text-[#5a3a28]">{liveOrders.length}</p>
              </div>
              <div className="glass-panel rounded-[1.6rem] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Tela</p>
                <p className="mt-2 text-lg font-semibold text-[#5a3a28]">/admin</p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/admin/inventory"
              className="glass-button-primary inline-flex rounded-full px-4 py-2.5 text-sm font-medium text-white"
            >
              Abrir mini estoque
            </Link>
            <AdminAlertsToggle />
          </div>
        </header>

        <section className="mt-6 space-y-5">
          <div className="space-y-3">
            <div className="px-1">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8f562f]">
                Pedidos novos
              </p>
            </div>
            <OrderList
              orders={newOrders}
              emptyTitle="Nenhum pedido novo"
              emptyDescription="Assim que um paciente finalizar o pedido pelo celular, ele aparece aqui automaticamente."
              onDelivered={markOrderAsDelivered}
            />
          </div>

          <details className="glass-shell rounded-[2.4rem] p-4" open={deliveredOrders.length > 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-2 py-1">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8f562f]">
                  Historico
                </p>
                <p className="mt-1 text-sm text-ink/55">
                  Pedidos entregues ficam recolhidos aqui embaixo.
                </p>
              </div>
              <div className="glass-chip rounded-full px-3 py-1 text-sm font-medium text-[#8f4c24]">
                {deliveredOrders.length}
              </div>
            </summary>

            <div className="mt-4">
              <OrderList
                orders={deliveredOrders}
                emptyTitle="Historico vazio"
                emptyDescription="Assim que um pedido for marcado como entregue, ele sai da parte principal e aparece aqui."
              />
            </div>
          </details>
        </section>
      </div>

      <NewOrderSound tick={soundTick} patientName={latestAlertPatient} />
    </main>
  );
}
