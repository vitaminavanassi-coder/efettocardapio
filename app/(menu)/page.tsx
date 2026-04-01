import { MenuScreen } from "@/components/menu/menu-screen";
import { initialCatalog } from "@/lib/catalog";
import { listMenuItems } from "@/lib/menu";

export const dynamic = "force-dynamic";

export default function MenuPage() {
  return <MenuPageContent />;
}

async function MenuPageContent() {
  let items;
  let submissionEnabled = true;

  try {
    items = await listMenuItems();
  } catch {
    submissionEnabled = false;
    items = initialCatalog.map((item) => ({
      id: item.slug,
      slug: item.slug,
      name: item.name,
      category: item.category,
      description: item.description,
      available: true,
    }));
  }

  const categories = Array.from(new Set(items.map((item) => item.category)));

  return (
    <MenuScreen
      categories={categories}
      items={items}
      submissionEnabled={submissionEnabled}
    />
  );
}
