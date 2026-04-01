import { NextResponse } from "next/server";
import { z } from "zod";

import { updateInventoryItem } from "@/lib/inventory";

const updateInventorySchema = z.object({
  quantityCurrent: z.number().int().min(0),
  alertThreshold: z.number().int().min(0),
  unavailableManual: z.boolean(),
});

type RouteContext = {
  params: Promise<{
    itemId: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const { itemId } = await context.params;
  const payload = await request.json();
  const parsedInput = updateInventorySchema.safeParse(payload);

  if (!itemId) {
    return NextResponse.json({ error: "Missing item id" }, { status: 400 });
  }

  if (!parsedInput.success) {
    return NextResponse.json(
      { error: "Invalid inventory payload", issues: parsedInput.error.flatten() },
      { status: 400 },
    );
  }

  try {
    await updateInventoryItem(itemId, parsedInput.data);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unexpected error",
      },
      { status: 500 },
    );
  }
}
