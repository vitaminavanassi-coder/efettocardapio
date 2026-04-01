import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, vi } from "vitest";

import { MenuScreen } from "@/components/menu/menu-screen";

afterEach(() => {
  vi.unstubAllGlobals();
});

it("shows a dedicated entry screen before opening the menu", async () => {
  const user = userEvent.setup();

  render(
    <MenuScreen
      categories={["Bebidas", "Cafes"]}
      items={[
        {
          id: "1",
          slug: "agua-sem-gas",
          name: "Agua sem gas",
          category: "Bebidas",
          description: "Agua gelada",
          available: true,
        },
        {
          id: "2",
          slug: "cappuccino",
          name: "Cappuccino",
          category: "Cafes",
          description: "Cafe cremoso",
          available: true,
        },
      ]}
    />,
  );

  expect(screen.getByLabelText(/nome do paciente/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /continuar/i })).toBeDisabled();
  expect(screen.queryByText("Agua sem gas")).not.toBeInTheDocument();
  expect(screen.queryByText("Cappuccino")).not.toBeInTheDocument();

  await user.type(screen.getByLabelText(/nome do paciente/i), "Ana");
  expect(screen.getByRole("button", { name: /continuar/i })).toBeEnabled();

  await user.click(screen.getByRole("button", { name: /continuar/i }));

  expect(screen.getByText("Agua sem gas")).toBeInTheDocument();
  expect(screen.getByText("Cappuccino")).toBeInTheDocument();
  expect(screen.queryByText("Agua gelada")).not.toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Cafes" }));

  expect(screen.queryByText("Agua sem gas")).not.toBeInTheDocument();
  expect(screen.getByText("Cappuccino")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /todos/i }));

  expect(screen.getByText("Agua sem gas")).toBeInTheDocument();
  expect(screen.getByText("Cappuccino")).toBeInTheDocument();
});

it("replaces the menu with a final success screen after submitting the order", async () => {
  const user = userEvent.setup();
  const fetchMock = vi.fn().mockResolvedValue({ ok: true });

  vi.stubGlobal("fetch", fetchMock);

  render(
    <MenuScreen
      categories={["Bebidas"]}
      items={[
        {
          id: "1",
          slug: "agua-sem-gas",
          name: "Agua sem gas",
          category: "Bebidas",
          description: "Agua gelada",
          available: true,
        },
      ]}
    />,
  );

  await user.type(screen.getByLabelText(/nome do paciente/i), "Ana");
  await user.click(screen.getByRole("button", { name: /continuar/i }));
  await user.click(screen.getByRole("button", { name: /adicionar/i }));
  await user.click(screen.getByRole("button", { name: /enviar pedido/i }));

  expect(fetchMock).toHaveBeenCalled();
  expect(screen.getByText(/pedido realizado com sucesso/i)).toBeInTheDocument();
  expect(screen.queryByText("Agua sem gas")).not.toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /enviar pedido/i })).not.toBeInTheDocument();
  expect(screen.getByAltText(/efetto/i)).toBeInTheDocument();
});
