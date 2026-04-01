import { describe, expect, it } from "vitest";

import { POST } from "@/app/api/orders/route";

describe("POST /api/orders", () => {
  it("returns 400 when patient name is missing", async () => {
    const response = await POST(
      new Request("http://localhost/api/orders", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          patientName: "",
          items: [],
        }),
      }),
    );

    expect(response.status).toBe(400);
  });
});
