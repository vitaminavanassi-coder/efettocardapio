import Link from "next/link";

import { BrandLogo } from "@/components/brand/brand-logo";
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
    <main className="min-h-screen px-4 py-5 text-ink sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="glass-shell rounded-[3rem] p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <BrandLogo className="h-auto w-[14rem]" />
            </div>

            <Link
              href="/admin"
              className="glass-button-primary inline-flex rounded-full px-4 py-2.5 text-sm font-medium text-white"
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
