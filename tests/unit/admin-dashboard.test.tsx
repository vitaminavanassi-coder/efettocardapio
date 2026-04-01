import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { AdminDashboard } from "@/components/admin/admin-dashboard";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
  }),
}));

it("renders new order and deliver action", () => {
  render(
    <AdminDashboard
      orders={[
        {
          id: "1",
          patientName: "Ana",
          status: "novo",
          createdAt: "2026-04-01T10:00:00Z",
          deliveredAt: null,
          items: [],
        },
      ]}
    />,
  );

  expect(screen.getByText("Ana")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /entregue/i })).toBeInTheDocument();
});
