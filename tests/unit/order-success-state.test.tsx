import { render, screen } from "@testing-library/react";

import { OrderSuccessState } from "@/components/menu/order-success-state";

it("shows a clear success confirmation message for the patient", () => {
  render(<OrderSuccessState patientName="Ana" />);

  expect(screen.getByText(/pedido realizado com sucesso/i)).toBeInTheDocument();
  expect(screen.getByText(/a recepcao ja recebeu o seu pedido/i)).toBeInTheDocument();
});
