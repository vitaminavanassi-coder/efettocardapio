import { z } from "zod";

export const createOrderItemSchema = z.object({
  itemId: z.uuid(),
  quantity: z.number().int().min(1).max(20),
});

export const createOrderInputSchema = z.object({
  patientName: z.string().trim().min(2).max(80),
  items: z.array(createOrderItemSchema).min(1),
});

export type CreateOrderInput = z.infer<typeof createOrderInputSchema>;
