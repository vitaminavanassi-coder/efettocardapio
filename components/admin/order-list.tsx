import { OrderCard } from "@/components/admin/order-card";
import type { OrderListItem } from "@/lib/orders";

type OrderListProps = {
  orders: OrderListItem[];
  emptyTitle?: string;
  emptyDescription?: string;
  onDelivered?: (orderId: string) => void;
};

export function OrderList({
  orders,
  emptyTitle = "Sem pedidos no momento",
  emptyDescription = "Quando um paciente fizer um pedido pelo QR Code, ele aparecera aqui com destaque visual e pronto para ser marcado como entregue.",
  onDelivered,
}: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-black/5">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal">
          {emptyTitle}
        </p>
        <p className="mt-3 max-w-xl text-sm leading-6 text-ink/65">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} onDelivered={onDelivered} />
      ))}
    </div>
  );
}
