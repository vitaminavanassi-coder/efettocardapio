import { isVisibleMenuSlug } from "@/lib/hidden-menu-slugs";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export type MenuListItem = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  available: boolean;
};

export async function listMenuItems() {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("items")
    .select("id, slug, name, description, category, active, inventory(quantity_current, unavailable_manual)")
    .eq("active", true)
    .order("highlight_order", { ascending: true });

  if (error) {
    throw new Error(`Failed to load menu items: ${error.message}`);
  }

  return (data ?? [])
    .filter((item) => isVisibleMenuSlug(item.slug))
    .map((item) => {
      const inventory = Array.isArray(item.inventory) ? item.inventory[0] : item.inventory;
      const unavailableManual = inventory?.unavailable_manual ?? false;
      const quantityCurrent = inventory?.quantity_current ?? 0;

      return {
        id: item.id,
        slug: item.slug,
        name: item.name,
        category: item.category,
        description: item.description ?? "",
        available: !unavailableManual && quantityCurrent > 0,
      };
    }) satisfies MenuListItem[];
}
