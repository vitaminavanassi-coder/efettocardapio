"use server";

import { createOrder } from "@/lib/orders";
import {
  createOrderInputSchema,
  type CreateOrderInput,
} from "@/lib/validators/order";

export async function submitOrder(input: CreateOrderInput) {
  const parsedInput = createOrderInputSchema.parse(input);
  const orderId = await createOrder(parsedInput);

  return { orderId };
}
