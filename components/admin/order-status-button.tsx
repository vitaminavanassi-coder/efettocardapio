type OrderStatusButtonProps = {
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
};

export function OrderStatusButton({
  disabled,
  loading,
  onClick,
}: OrderStatusButtonProps) {
  return (
    <button
      type="button"
      className="glass-button-primary flex w-full items-center justify-center rounded-[999px] px-4 py-3.5 text-base font-semibold text-white transition hover:-translate-y-px hover:brightness-[1.04] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45"
      disabled={disabled}
      onClick={onClick}
    >
      {loading ? "Atualizando..." : "Marcar como entregue"}
    </button>
  );
}
