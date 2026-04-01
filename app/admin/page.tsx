import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { listOrders, type OrderListItem } from "@/lib/orders";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  let orders: OrderListItem[] = [];

  try {
    orders = await listOrders();
  } catch {
    orders = [];
  }

  return <AdminDashboard orders={orders} />;
}
