type CategoryTabsProps = {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
};

export function CategoryTabs({
  categories,
  activeCategory,
  onSelect,
}: CategoryTabsProps) {
  return (
    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
      {categories.map((category) => {
        const active = category === activeCategory;

        return (
          <button
            key={category}
            type="button"
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
              active
                ? "bg-ink text-white shadow-soft"
                : "bg-white text-ink shadow-sm ring-1 ring-black/5"
            }`}
            onClick={() => onSelect(category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
