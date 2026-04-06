import { describe, expect, it } from "vitest";

import { initialCatalog } from "@/lib/catalog";

describe("initialCatalog", () => {
  it("contains Agua com gas and Barra de cereal castanha de caju", () => {
    const names = initialCatalog.map((item) => item.name);
    const slugs = initialCatalog.map((item) => item.slug);

    expect(names).toContain("Agua com gas");
    expect(names).toContain("Barra de cereal castanha de caju");
    expect(slugs).not.toContain("dolce-gusto");
    expect(slugs).not.toContain("chocolate");
    expect(slugs).not.toContain("cereal");
    expect(slugs).not.toContain("leite-creme");
  });
});
