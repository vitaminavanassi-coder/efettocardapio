"use client";

import { useState } from "react";

import type { InventoryListItem } from "@/lib/inventory";

type InventoryRowProps = {
  item: InventoryListItem;
};

export function InventoryRow({ item }: InventoryRowProps) {
  const [quantityCurrent, setQuantityCurrent] = useState(item.quantityCurrent);
  const [alertThreshold, setAlertThreshold] = useState(item.alertThreshold);
  const [unavailableManual, setUnavailableManual] = useState(item.unavailableManual);
  const [isSaving, setIsSaving] = useState(false);

  const isLowStock = unavailableManual || quantityCurrent <= alertThreshold;

  async function save() {
    setIsSaving(true);

    try {
      await fetch(`/api/inventory/${item.itemId}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          quantityCurrent,
          alertThreshold,
          unavailableManual,
        }),
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <article className="rounded-[1.75rem] bg-white p-4 shadow-soft ring-1 ring-black/5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <span className="rounded-full bg-sand px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/60">
              {item.category}
            </span>
            {isLowStock ? (
              <span className="rounded-full bg-coral px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                Estoque baixo
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-sm text-ink/60">{item.slug}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-4 lg:min-w-[540px]">
          <label className="text-sm font-medium text-ink/70">
            Quantidade
            <input
              type="number"
              min={0}
              value={quantityCurrent}
              className="mt-2 w-full rounded-2xl border-0 bg-sand px-3 py-2.5 outline-none ring-1 ring-transparent transition focus:ring-coral"
              onChange={(event) => setQuantityCurrent(Number(event.target.value))}
            />
          </label>

          <label className="text-sm font-medium text-ink/70">
            Alerta
            <input
              type="number"
              min={0}
              value={alertThreshold}
              className="mt-2 w-full rounded-2xl border-0 bg-sand px-3 py-2.5 outline-none ring-1 ring-transparent transition focus:ring-coral"
              onChange={(event) => setAlertThreshold(Number(event.target.value))}
            />
          </label>

          <label className="flex items-end gap-3 rounded-2xl bg-sand px-3 py-3 text-sm font-medium text-ink/70">
            <input
              type="checkbox"
              checked={unavailableManual}
              onChange={(event) => setUnavailableManual(event.target.checked)}
            />
            Indisponivel
          </label>

          <button
            type="button"
            className="rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:bg-ink/90 disabled:opacity-40"
            disabled={isSaving}
            onClick={save}
          >
            {isSaving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </article>
  );
}
