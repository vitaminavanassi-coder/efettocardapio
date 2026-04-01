import type { MenuItem } from "@/components/menu/menu-screen";
import { OrderSubmitButton } from "@/components/menu/order-submit-button";

type CartItem = MenuItem & {
  quantity: number;
};

type CartSheetProps = {
  items: CartItem[];
  patientName: string;
  totalItems: number;
  isSubmitting: boolean;
  submissionEnabled: boolean;
  onAdd: (item: MenuItem) => void;
  onRemove: (itemId: string) => void;
  onSubmit: () => void;
};

export function CartSheet({
  items,
  patientName,
  totalItems,
  isSubmitting,
  submissionEnabled,
  onAdd,
  onRemove,
  onSubmit,
}: CartSheetProps) {
  const canSubmit =
    submissionEnabled && patientName.trim().length >= 2 && totalItems > 0;

  return (
    <aside className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-md px-4 pb-4 sm:px-5">
      <div className="rounded-[2rem] border border-black/5 bg-white/95 p-4 shadow-[0_-16px_48px_rgba(16,33,51,0.16)] backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-teal">
              Carrinho
            </p>
            <h2 className="mt-1 text-lg font-semibold">
              {totalItems} {totalItems === 1 ? "item" : "itens"} selecionados
            </h2>
          </div>
          <div className="rounded-full bg-sand px-3 py-1 text-sm font-medium text-ink/70">
            {patientName.trim() || "Sem nome"}
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {items.length === 0 ? (
            <p className="rounded-2xl bg-sand px-4 py-3 text-sm leading-6 text-ink/65">
              Escolha os itens do cardapio para montar o pedido.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-2xl bg-sand px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{item.name}</p>
                  <p className="text-sm text-ink/60">{item.quantity} selecionado(s)</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="h-9 w-9 rounded-full bg-white text-lg font-semibold text-ink shadow-sm"
                    onClick={() => onRemove(item.id)}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    className="h-9 w-9 rounded-full bg-ink text-lg font-semibold text-white shadow-sm"
                    onClick={() => onAdd(item)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-4">
          <OrderSubmitButton
            disabled={!canSubmit}
            loading={isSubmitting}
            onClick={onSubmit}
          />
        </div>
      </div>
    </aside>
  );
}
