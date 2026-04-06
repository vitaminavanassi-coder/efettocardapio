import { describe, expect, it } from "vitest";

import { getMenuDisplayName } from "@/lib/menu-display-names";

describe("getMenuDisplayName", () => {
  it("renames the Celestial tea labels", () => {
    expect(getMenuDisplayName("peppermint-celestial", "Peppermint - marca Celestial")).toBe(
      "Cha Peppermint",
    );
    expect(
      getMenuDisplayName(
        "true-blueberry-celestial",
        "True blueberry - marca Celestial",
      ),
    ).toBe("Cha True Blueberry");
  });

  it("keeps the original name for the other items", () => {
    expect(getMenuDisplayName("agua-com-gas", "Agua com gas")).toBe("Agua com gas");
  });
});
