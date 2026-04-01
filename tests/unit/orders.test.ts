import { describe, expect, it } from "vitest";

import { createOrderInputSchema } from "@/lib/validators/order";

describe("createOrderInputSchema", () => {
  it("rejects payload without patient name", () => {
    const result = createOrderInputSchema.safeParse({
      patientName: "",
      items: [],
    });

    expect(result.success).toBe(false);
  });
});
