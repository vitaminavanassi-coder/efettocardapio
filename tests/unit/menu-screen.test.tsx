import { render, screen } from "@testing-library/react";

import { MenuScreen } from "@/components/menu/menu-screen";

it("renders patient name field and menu item cards", () => {
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

  expect(screen.getByLabelText(/nome do paciente/i)).toBeInTheDocument();
  expect(screen.getByText("Agua sem gas")).toBeInTheDocument();
});
