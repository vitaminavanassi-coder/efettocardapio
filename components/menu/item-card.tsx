import type { MenuItem } from "@/components/menu/menu-screen";

type ItemCardProps = {
  item: MenuItem;
  onAdd?: (item: MenuItem) => void;
};

export function ItemCard({ item, onAdd }: ItemCardProps) {
  return (
    <article className="rounded-[1.75rem] bg-white p-4 shadow-soft ring-1 ring-black/5">
      <div className="flex gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.5rem] bg-[linear-gradient(135deg,#E87A5D,#F1D5B5)] text-center text-xs font-semibold uppercase tracking-[0.2em] text-white">
          <span className="max-w-10">{item.category.slice(0, 2)}</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-semibold leading-tight">{item.name}</p>
              <p className="mt-2 text-sm leading-6 text-ink/65">{item.description}</p>
            </div>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                item.available
                  ? "bg-teal/10 text-teal"
                  : "bg-coral/10 text-coral"
              }`}
            >
              {item.available ? "Disponivel" : "Indisponivel"}
            </span>
          </div>

          <button
            type="button"
            className="mt-4 inline-flex rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:bg-ink/20"
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
