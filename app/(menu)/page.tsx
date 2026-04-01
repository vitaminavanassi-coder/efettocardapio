import { MenuScreen } from "@/components/menu/menu-screen";
import { initialCatalog } from "@/lib/catalog";

export default function MenuPage() {
  const items = initialCatalog.map((item) => ({
    id: item.slug,
    slug: item.slug,
    name: item.name,
    category: item.category,
    description: item.description,
    available: true,
  }));

  const categories = Array.from(new Set(items.map((item) => item.category)));

  return <MenuScreen categories={categories} items={items} />;
}
