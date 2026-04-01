import { render, screen } from "@testing-library/react";

import { InventoryTable } from "@/components/admin/inventory-table";

it("shows low stock badge when quantity is below threshold", () => {
  render(
    <InventoryTable
      items={[
        {
          itemId: "1",
          slug: "agua-de-coco",
          name: "Agua de coco",
          category: "Bebidas",
          quantityCurrent: 3,
          alertThreshold: 5,
          unavailableManual: false,
          isLowStock: true,
        },
      ]}
    />,
  );

  expect(screen.getByText(/estoque baixo/i)).toBeInTheDocument();
});
