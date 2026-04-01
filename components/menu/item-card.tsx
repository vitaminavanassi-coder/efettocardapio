import type { MenuItem } from "@/components/menu/menu-screen";

type ItemCardProps = {
  item: MenuItem;
  onAdd?: (item: MenuItem) => void;
};

export function ItemCard({ item, onAdd }: ItemCardProps) {
  return (
    <article className="glass-panel rounded-[1.8rem] p-3.5 transition hover:-translate-y-0.5 hover:shadow-[0_22px_52px_rgba(191,133,84,0.18)]">
      <div className="flex gap-3.5">
        <div className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(255,207,175,0.94),rgba(255,174,120,0.94))] text-center text-[1.75rem] font-semibold uppercase text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_18px_30px_rgba(255,166,107,0.2)]">
          <span className="max-w-10">{item.category.slice(0, 2)}</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[1.45rem] font-semibold leading-tight tracking-[-0.03em] text-[#2f1e14]">
                {item.name}
              </p>
              <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#8a654c]">
                {item.available ? "Disponivel" : "Indisponivel"}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="glass-button-primary mt-3 inline-flex rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:scale-100"
            disabled={!item.available}
            onClick={() => onAdd?.(item)}
          >
            Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}
