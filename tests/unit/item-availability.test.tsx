import { render, screen } from "@testing-library/react";

import { ItemCard } from "@/components/menu/item-card";

it("disables add button when item is unavailable", () => {
  render(
    <ItemCard
      item={{
        id: "1",
        slug: "chocolate-quente",
        name: "Chocolate quente",
        category: "Cafes",
        description: "Bebida cremosa",
        available: false,
      }}
    />,
  );

  expect(screen.getByRole("button", { name: /adicionar/i })).toBeDisabled();
  expect(screen.queryByText("Bebida cremosa")).not.toBeInTheDocument();
});
