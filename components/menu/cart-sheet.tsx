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
      <div className="glass-shell h-[15.5rem] rounded-[2.1rem] p-3.5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-[#5a3a28]">
              {totalItems} {totalItems === 1 ? "item" : "itens"} selecionados
            </h2>
          </div>
          <div className="glass-chip rounded-full px-3 py-1 text-xs font-medium text-ink/70">
            {patientName.trim() || "Sem nome"}
          </div>
        </div>

        <div className="mx-auto mt-2.5 h-1.5 w-14 rounded-full bg-[rgba(128,96,72,0.15)]" />

        <div className="mt-3 max-h-[7.1rem] space-y-2.5 overflow-y-auto pr-1">
          {items.length === 0 ? (
            <p className="glass-panel rounded-2xl px-4 py-3 text-sm leading-5 text-ink/65">
              Escolha os itens do cardapio para montar o pedido.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="glass-panel flex items-center justify-between gap-3 rounded-2xl px-3.5 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-ink/60">{item.quantity} selecionado(s)</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="glass-chip h-8 w-8 rounded-full text-base font-semibold text-ink"
                    onClick={() => onRemove(item.id)}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    className="glass-button-secondary h-8 w-8 rounded-full text-base font-semibold text-[#a06037]"
                    onClick={() => onAdd(item)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-3">
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
