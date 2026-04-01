import { describe, expect, it } from "vitest";

import { formatOrderTime } from "@/lib/format-order-time";

describe("formatOrderTime", () => {
  it("formats timestamps with a fixed Sao Paulo timezone", () => {
    expect(formatOrderTime("2026-04-01T15:04:00.000Z")).toBe("01/04, 12:04");
  });
});
