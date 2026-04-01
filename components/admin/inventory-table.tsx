import type { InventoryListItem } from "@/lib/inventory";

import { InventoryRow } from "@/components/admin/inventory-row";

type InventoryTableProps = {
  items: InventoryListItem[];
};

export function InventoryTable({ items }: InventoryTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-black/5">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal">
          Sem dados de estoque
        </p>
        <p className="mt-3 text-sm leading-6 text-ink/65">
          Assim que os itens estiverem carregados no Supabase, o controle de estoque
          aparecera aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <InventoryRow key={item.itemId} item={item} />
      ))}
    </div>
  );
}
