"use client";

import { useState } from "react";

import { CartSheet } from "@/components/menu/cart-sheet";
import { CategoryTabs } from "@/components/menu/category-tabs";
import { ItemCard } from "@/components/menu/item-card";
import { PatientNameForm } from "@/components/menu/patient-name-form";

export type MenuItem = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  available: boolean;
};

type CartItem = MenuItem & {
  quantity: number;
};

type MenuScreenProps = {
  categories: string[];
  items: MenuItem[];
};

export function MenuScreen({ categories, items }: MenuScreenProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0] ?? "");
  const [patientName, setPatientName] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const visibleItems = activeCategory
    ? items.filter((item) => item.category === activeCategory)
    : items;

  function addItem(item: MenuItem) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((entry) => entry.id === item.id);

      if (!existingItem) {
        return [...currentCart, { ...item, quantity: 1 }];
      }

      return currentCart.map((entry) =>
        entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry,
      );
    });
  }

  function removeItem(itemId: string) {
    setCart((currentCart) =>
      currentCart
        .map((entry) =>
          entry.id === itemId ? { ...entry, quantity: entry.quantity - 1 } : entry,
        )
        .filter((entry) => entry.quantity > 0),
    );
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(232,122,93,0.18),_transparent_32%),linear-gradient(180deg,#fffdf8_0%,#f4efe5_100%)] pb-40 text-ink">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-4 sm:px-5">
        <header className="rounded-[2rem] bg-[linear-gradient(135deg,#102133,#1f4052)] p-5 text-white shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                Clinica Efetto
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight">
                Cardapio digital para pedir em poucos toques
              </h1>
            </div>
            <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white/80">
              QR
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-white/75">
            Informe seu nome, escolha os itens e envie para a recepcao.
          </p>
        </header>

        <div className="mt-5 space-y-5">
          <PatientNameForm value={patientName} onChange={setPatientName} />

          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />

          <section className="space-y-3">
            {visibleItems.map((item) => (
              <ItemCard key={item.id} item={item} onAdd={addItem} />
            ))}
          </section>
        </div>
      </div>

      <CartSheet
        items={cart}
        patientName={patientName}
        totalItems={totalItems}
        onAdd={addItem}
        onRemove={removeItem}
      />
    </main>
  );
}
