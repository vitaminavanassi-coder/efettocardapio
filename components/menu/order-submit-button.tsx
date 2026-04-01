type OrderSubmitButtonProps = {
  disabled: boolean;
};

export function OrderSubmitButton({ disabled }: OrderSubmitButtonProps) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center rounded-[1.4rem] bg-[linear-gradient(135deg,#E87A5D,#CBA14A)] px-4 py-3.5 text-base font-semibold text-white shadow-soft transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-45"
      disabled={disabled}
    >
      Enviar pedido
    </button>
  );
}
