import type { InventoryListItem } from "@/lib/inventory";

import { InventoryRow } from "@/components/admin/inventory-row";

type InventoryTableProps = {
  items: InventoryListItem[];
};

export function InventoryTable({ items }: InventoryTableProps) {
  if (items.length === 0) {
    return (
      <div className="glass-panel rounded-[2rem] p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#b06a3c]">
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
