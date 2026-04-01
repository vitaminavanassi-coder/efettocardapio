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
    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-3">
      <button
        type="button"
        className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-medium transition ${
          activeCategory === ""
            ? "glass-chip-active text-[#8f4c24]"
            : "glass-chip text-[#5e3b29] hover:-translate-y-px hover:text-[#8f4c24]"
        }`}
        onClick={() => onSelect("")}
      >
        Todos
      </button>

      {categories.map((category) => {
        const active = category === activeCategory;

        return (
          <button
            key={category}
            type="button"
            className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-medium transition ${
              active
                ? "glass-chip-active text-[#8f4c24]"
                : "glass-chip text-[#5e3b29] hover:-translate-y-px hover:text-[#8f4c24]"
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
