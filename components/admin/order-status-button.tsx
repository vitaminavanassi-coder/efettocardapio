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
      className="flex w-full items-center justify-center rounded-[1.4rem] bg-[linear-gradient(135deg,#2E8C84,#78c2a8)] px-4 py-3.5 text-base font-semibold text-white shadow-soft transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-45"
      disabled={disabled}
      onClick={onClick}
    >
      {loading ? "Atualizando..." : "Marcar como entregue"}
    </button>
  );
}
