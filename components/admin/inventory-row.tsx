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
    <article className="glass-panel rounded-[2rem] p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-[#2f1e14]">{item.name}</h2>
            <span className="glass-chip rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/60">
              {item.category}
            </span>
            {isLowStock ? (
              <span className="glass-chip-active rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b06a3c]">
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
              className="glass-input mt-2 w-full rounded-2xl px-3 py-2.5 outline-none transition focus:ring-2 focus:ring-[rgba(255,170,111,0.24)]"
              onChange={(event) => setQuantityCurrent(Number(event.target.value))}
            />
          </label>

          <label className="text-sm font-medium text-ink/70">
            Alerta
            <input
              type="number"
              min={0}
              value={alertThreshold}
              className="glass-input mt-2 w-full rounded-2xl px-3 py-2.5 outline-none transition focus:ring-2 focus:ring-[rgba(255,170,111,0.24)]"
              onChange={(event) => setAlertThreshold(Number(event.target.value))}
            />
          </label>

          <label className="glass-chip flex items-end gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-ink/70">
            <input
              type="checkbox"
              checked={unavailableManual}
              onChange={(event) => setUnavailableManual(event.target.checked)}
            />
            Indisponivel
          </label>

          <button
            type="button"
            className="glass-button-primary rounded-2xl px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-px disabled:opacity-40"
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
