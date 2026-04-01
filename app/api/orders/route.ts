import { NextResponse } from "next/server";

import { submitOrder } from "@/app/actions/create-order";
import { createOrderInputSchema } from "@/lib/validators/order";

export async function POST(request: Request) {
  const payload = await request.json();
  const parsedInput = createOrderInputSchema.safeParse(payload);

  if (!parsedInput.success) {
    return NextResponse.json(
      {
        error: "Invalid order payload",
        issues: parsedInput.error.flatten(),
      },
      { status: 400 },
    );
  }

  try {
    const result = await submitOrder(parsedInput.data);

    return NextResponse.json(
      {
        ok: true,
        orderId: result.orderId,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unexpected error",
      },
      { status: 500 },
    );
  }
}
