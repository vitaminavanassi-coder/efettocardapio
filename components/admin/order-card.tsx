"use client";

import { useState } from "react";

import { OrderStatusButton } from "@/components/admin/order-status-button";
import { formatOrderTime } from "@/lib/format-order-time";
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
          ? "glass-panel ring-[rgba(255,180,125,0.3)]"
          : "glass-panel ring-white/60"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b06a3c]">
            {isNew ? "Novo pedido" : "Entregue"}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#2f1e14]">
            {order.patientName}
          </h2>
          <p className="mt-2 text-sm text-ink/55">
            {formatOrderTime(order.createdAt)}
          </p>
        </div>

        <div
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
            isNew
              ? "glass-chip-active text-[#b06a3c]"
              : "glass-chip text-[#8f6a54]"
          }`}
        >
          {order.status}
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {order.items.length === 0 ? (
          <p className="glass-chip rounded-2xl px-4 py-3 text-sm text-ink/60">
            Pedido sem itens listados.
          </p>
        ) : (
          order.items.map((item) => (
            <div
              key={item.id}
              className="glass-chip flex items-center justify-between rounded-2xl px-4 py-3"
            >
              <div>
                <p className="font-medium">{item.itemName}</p>
                <p className="text-sm text-ink/60">Quantidade: {item.quantity}</p>
              </div>
              <div className="glass-panel rounded-full px-3 py-1 text-sm font-semibold">
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
