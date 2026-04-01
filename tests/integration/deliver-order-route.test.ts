import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/orders", () => ({
  markOrderAsDelivered: vi.fn(),
}));

describe("POST /api/orders/:id/deliver", () => {
  it("returns 200 for valid order id", async () => {
    const { POST } = await import("@/app/api/orders/[id]/deliver/route");

    const response = await POST(
      new Request("http://localhost/api/orders/order-123/deliver", {
        method: "POST",
      }),
      {
        params: Promise.resolve({ id: "order-123" }),
      },
    );

    expect(response.status).toBe(200);
  });
});
