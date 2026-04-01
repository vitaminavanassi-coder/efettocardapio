type OrderSubmitButtonProps = {
  disabled: boolean;
  loading?: boolean;
  onClick?: () => void;
};

export function OrderSubmitButton({
  disabled,
  loading = false,
  onClick,
}: OrderSubmitButtonProps) {
  return (
    <button
      type="button"
      className="glass-button-primary flex w-full items-center justify-center rounded-[999px] px-4 py-3.5 text-base font-semibold text-white transition hover:-translate-y-px hover:brightness-[1.04] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45"
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? "Enviando pedido..." : "Enviar pedido"}
    </button>
  );
}
