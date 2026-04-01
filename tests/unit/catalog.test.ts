import { describe, expect, it } from "vitest";

import { initialCatalog } from "@/lib/catalog";

describe("initialCatalog", () => {
  it("contains Agua com gas and Barra de cereal castanha de caju", () => {
    const names = initialCatalog.map((item) => item.name);

    expect(names).toContain("Agua com gas");
    expect(names).toContain("Barra de cereal castanha de caju");
  });
});
