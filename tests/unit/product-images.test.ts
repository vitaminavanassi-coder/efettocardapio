import { describe, expect, it } from "vitest";

import { getProductImagePath } from "@/lib/product-images";

describe("getProductImagePath", () => {
  it("returns the local product image path for mapped slugs", () => {
    expect(getProductImagePath("agua-com-gas")).toBe("/products/agua-com-gas.webp");
    expect(getProductImagePath("true-blueberry-celestial")).toBe(
      "/products/true-blueberry-celestial.webp",
    );
    expect(getProductImagePath("cappuccino")).toBe("/products/cappuccino.webp");
    expect(getProductImagePath("chocolate-menta")).toBe(
      "/products/chocolate-menta.webp",
    );
  });

  it("returns null for products without a mapped image yet", () => {
    expect(getProductImagePath("dolce-gusto")).toBeNull();
    expect(getProductImagePath("leite-creme")).toBeNull();
  });
});
