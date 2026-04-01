"use client";

import { useState } from "react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { CartSheet } from "@/components/menu/cart-sheet";
import { CategoryTabs } from "@/components/menu/category-tabs";
import { ItemCard } from "@/components/menu/item-card";
import { OrderSuccessState } from "@/components/menu/order-success-state";
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
  submissionEnabled?: boolean;
};

export function MenuScreen({
  categories,
  items,
  submissionEnabled = true,
}: MenuScreenProps) {
  const [activeCategory, setActiveCategory] = useState("");
  const [patientName, setPatientName] = useState("");
  const [hasEnteredMenu, setHasEnteredMenu] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const visibleItems = activeCategory
    ? items.filter((item) => item.category === activeCategory)
    : items;
  const hasPatientName = patientName.trim().length >= 2;

  function continueToMenu() {
    if (!hasPatientName) {
      return;
    }

    setHasEnteredMenu(true);
  }

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

  async function submitCart() {
    if (
      !submissionEnabled ||
      patientName.trim().length < 2 ||
      totalItems === 0 ||
      isSubmitting
    ) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          patientName: patientName.trim(),
          items: cart.map((item) => ({
            itemId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Nao foi possivel enviar o pedido.");
      }

      setCart([]);
      setShowSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!hasEnteredMenu) {
    return (
      <main
        className="h-[100svh] overflow-hidden text-ink"
        style={{
          background:
            "radial-gradient(circle at top, rgba(255,230,210,0.28), transparent 28%), linear-gradient(180deg, #ffbf8a 0%, #f79a5d 48%, #ea7931 100%)",
        }}
      >
        <div className="mx-auto h-[100svh] w-full max-w-md px-6">
          <div className="relative h-full">
            <div className="absolute inset-x-0 top-[12svh]">
              <div className="flex justify-center px-5">
                <BrandLogo priority className="h-auto w-[14.25rem]" />
              </div>
            </div>

            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
              <div className="w-full p-1">
                <div className="glass-panel mx-auto max-w-[21.5rem] rounded-[2.25rem] p-4.5">
                  <PatientNameForm
                    value={patientName}
                    onChange={setPatientName}
                    onSubmit={continueToMenu}
                    submitDisabled={!hasPatientName}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-[17.25rem] text-ink">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-4 sm:px-5">
        <header className="pb-3 pt-1">
          <div className="flex justify-center">
            <BrandLogo priority className="h-auto w-[15.25rem]" />
          </div>
        </header>

        <div className="space-y-4">
          {!submissionEnabled ? (
            <section className="glass-panel rounded-[2rem] px-4 py-3 text-sm leading-6 text-[#8c4d27]">
              Configure o Supabase para liberar pedidos reais.
            </section>
          ) : null}

          {showSuccess ? <OrderSuccessState patientName={patientName} /> : null}

          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />

          <section className="space-y-3 pb-2">
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
        isSubmitting={isSubmitting}
        submissionEnabled={submissionEnabled}
        onAdd={addItem}
        onRemove={removeItem}
        onSubmit={submitCart}
      />
    </main>
  );
}
