import { decrementInventory } from "@/lib/inventory";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import type { CreateOrderInput } from "@/lib/validators/order";

export type OrderListItem = {
  id: string;
  patientName: string;
  status: "novo" | "entregue";
  createdAt: string;
  deliveredAt: string | null;
  items: Array<{
    id: string;
    itemId: string;
    itemName: string;
    quantity: number;
  }>;
};

export async function createOrder(input: CreateOrderInput) {
  const supabase = getSupabaseAdminClient();

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      patient_name: input.patientName,
      status: "novo",
    })
    .select("id")
    .single();

  if (orderError || !order) {
    throw new Error(`Failed to create order: ${orderError?.message ?? "unknown error"}`);
  }

  const { data: menuItems, error: itemsError } = await supabase
    .from("items")
    .select("id, name")
    .in(
      "id",
      input.items.map((item) => item.itemId),
    );

  if (itemsError) {
    throw new Error(`Failed to load ordered items: ${itemsError.message}`);
  }

  const snapshotById = new Map(menuItems.map((item) => [item.id, item.name]));
  const orderItems = input.items.map((item) => ({
    order_id: order.id,
    item_id: item.itemId,
    item_name_snapshot: snapshotById.get(item.itemId) ?? "Item indisponivel",
    quantity: item.quantity,
  }));

  const { error: orderItemsError } = await supabase.from("order_items").insert(orderItems);

  if (orderItemsError) {
    throw new Error(`Failed to create order items: ${orderItemsError.message}`);
  }

  await decrementInventory(input.items);

  return order.id;
}

export async function listOrders() {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .select("id, patient_name, status, created_at, delivered_at, order_items(id, item_id, item_name_snapshot, quantity)")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to list orders: ${error.message}`);
  }

  return (data ?? []).map((order) => ({
    id: order.id,
    patientName: order.patient_name,
    status: order.status,
    createdAt: order.created_at,
    deliveredAt: order.delivered_at,
    items: order.order_items.map((item) => ({
      id: item.id,
      itemId: item.item_id,
      itemName: item.item_name_snapshot,
      quantity: item.quantity,
    })),
  })) satisfies OrderListItem[];
}

export async function markOrderAsDelivered(orderId: string) {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase
    .from("orders")
    .update({
      status: "entregue",
      delivered_at: new Date().toISOString(),
    })
    .eq("id", orderId);

  if (error) {
    throw new Error(`Failed to mark order as delivered: ${error.message}`);
  }
}
