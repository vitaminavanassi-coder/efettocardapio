import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

import { AdminDashboard } from "@/components/admin/admin-dashboard";

vi.mock("@/hooks/use-orders-realtime", () => ({
  useOrdersRealtime: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
  }),
}));

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("Notification", {
    permission: "default",
    requestPermission: vi.fn().mockResolvedValue("granted"),
  });
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

it("renders new orders, history and alerts action", () => {
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
        {
          id: "2",
          patientName: "Bruna",
          status: "entregue",
          createdAt: "2026-04-01T09:30:00Z",
          deliveredAt: "2026-04-01T10:00:00Z",
          items: [],
        },
      ]}
    />,
  );

  expect(screen.getByText("Ana")).toBeInTheDocument();
  expect(screen.getByText("Bruna")).toBeInTheDocument();
  expect(screen.getByText(/pedidos novos/i)).toBeInTheDocument();
  expect(screen.getByText(/^historico$/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /ativar alertas/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /entregue/i })).toBeInTheDocument();
});

it("polls the admin orders feed and shows new orders without reloading the page", async () => {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      orders: [
        {
          id: "3",
          patientName: "Carla",
          status: "novo",
          createdAt: "2026-04-01T10:05:00Z",
          deliveredAt: null,
          items: [],
        },
      ],
    }),
  });

  vi.stubGlobal("fetch", fetchMock);

  render(<AdminDashboard orders={[]} />);

  await act(async () => {
    await vi.advanceTimersByTimeAsync(1200);
    await Promise.resolve();
    await Promise.resolve();
  });

  expect(fetchMock).toHaveBeenCalledWith("/api/admin/orders", { cache: "no-store" });
  expect(screen.getByText("Carla")).toBeInTheDocument();
});
