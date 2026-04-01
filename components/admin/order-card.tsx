"use client";

import { useState } from "react";

import { OrderStatusButton } from "@/components/admin/order-status-button";
import type { OrderListItem } from "@/lib/orders";

type OrderCardProps = {
  order: OrderListItem;
};

export function OrderCard({ order }: OrderCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isNew = order.status === "novo";

  async function markAsDelivered() {
    setIsSubmitting(true);

    try {
      await fetch(`/api/orders/${order.id}/deliver`, {
        method: "POST",
      });
      window.location.reload();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <article
      className={`rounded-[2rem] p-5 shadow-soft ring-1 ${
        isNew
          ? "bg-[linear-gradient(180deg,#fff7f0_0%,#ffffff_100%)] ring-coral/25"
          : "bg-white ring-black/5"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal">
            {isNew ? "Novo pedido" : "Entregue"}
          </p>
          <h2 className="mt-2 text-2xl font-semibold">{order.patientName}</h2>
          <p className="mt-2 text-sm text-ink/60">
            {new Intl.DateTimeFormat("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(order.createdAt))}
          </p>
        </div>

        <div
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
            isNew ? "bg-coral text-white" : "bg-teal/10 text-teal"
          }`}
        >
          {order.status}
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {order.items.length === 0 ? (
          <p className="rounded-2xl bg-sand px-4 py-3 text-sm text-ink/60">
            Pedido sem itens listados.
          </p>
        ) : (
          order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-2xl bg-sand px-4 py-3"
            >
              <div>
                <p className="font-medium">{item.itemName}</p>
                <p className="text-sm text-ink/60">Quantidade: {item.quantity}</p>
              </div>
              <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold">
                {item.quantity}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-5">
        <OrderStatusButton
          disabled={!isNew || isSubmitting}
          loading={isSubmitting}
          onClick={markAsDelivered}
        />
      </div>
    </article>
  );
}
