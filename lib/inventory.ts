import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export type InventoryListItem = {
  itemId: string;
  slug: string;
  name: string;
  category: string;
  quantityCurrent: number;
  alertThreshold: number;
  unavailableManual: boolean;
  isLowStock: boolean;
};

export async function listInventoryItems() {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("inventory")
    .select("quantity_current, alert_threshold, unavailable_manual, items!inner(id, slug, name, category)")
    .order("name", { referencedTable: "items", ascending: true });

  if (error) {
    throw new Error(`Failed to list inventory: ${error.message}`);
  }

  return (data ?? []).map((entry) => ({
    itemId: entry.items.id,
    slug: entry.items.slug,
    name: entry.items.name,
    category: entry.items.category,
    quantityCurrent: entry.quantity_current,
    alertThreshold: entry.alert_threshold,
    unavailableManual: entry.unavailable_manual,
    isLowStock:
      entry.unavailable_manual || entry.quantity_current <= entry.alert_threshold,
  })) satisfies InventoryListItem[];
}

export async function updateInventoryItem(
  itemId: string,
  input: {
    quantityCurrent: number;
    alertThreshold: number;
    unavailableManual: boolean;
  },
) {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase
    .from("inventory")
    .update({
      quantity_current: input.quantityCurrent,
      alert_threshold: input.alertThreshold,
      unavailable_manual: input.unavailableManual,
      updated_at: new Date().toISOString(),
    })
    .eq("item_id", itemId);

  if (error) {
    throw new Error(`Failed to update inventory item: ${error.message}`);
  }
}

export async function decrementInventory(
  items: Array<{
    itemId: string;
    quantity: number;
  }>,
) {
  const inventory = await listInventoryItems();

  const updates = items.map((item) => {
    const inventoryItem = inventory.find((entry) => entry.itemId === item.itemId);

    if (!inventoryItem) {
      throw new Error(`Inventory item not found: ${item.itemId}`);
    }

    const quantityCurrent = Math.max(inventoryItem.quantityCurrent - item.quantity, 0);

    return updateInventoryItem(item.itemId, {
      quantityCurrent,
      alertThreshold: inventoryItem.alertThreshold,
      unavailableManual: inventoryItem.unavailableManual,
    });
  });

  await Promise.all(updates);
}
