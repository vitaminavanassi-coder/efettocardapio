import Link from "next/link";

import { InventoryTable } from "@/components/admin/inventory-table";
import { listInventoryItems, type InventoryListItem } from "@/lib/inventory";

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  let items: InventoryListItem[] = [];

  try {
    items = await listInventoryItems();
  } catch {
    items = [];
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffdf8_0%,#eef5f4_100%)] px-4 py-5 text-ink sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-black/5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal">
                Estoque
              </p>
              <h1 className="mt-3 text-3xl font-semibold">Controle simples por item</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/70">
                Ajuste a quantidade, o limite de alerta e marque itens como indisponiveis
                quando necessario.
              </p>
            </div>

            <Link
              href="/admin"
              className="inline-flex rounded-full bg-ink px-4 py-2 text-sm font-medium text-white"
            >
              Voltar para pedidos
            </Link>
          </div>
        </header>

        <section className="mt-6">
          <InventoryTable items={items} />
        </section>
      </div>
    </main>
  );
}
