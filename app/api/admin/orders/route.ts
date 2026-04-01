import { NextResponse } from "next/server";

import { listOrders } from "@/lib/orders";

export async function GET() {
  try {
    const orders = await listOrders();
    return NextResponse.json({ orders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Nao foi possivel listar os pedidos." }, { status: 500 });
  }
}
