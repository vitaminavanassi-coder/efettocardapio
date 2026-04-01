type OrderSuccessStateProps = {
  patientName: string;
};

export function OrderSuccessState({ patientName }: OrderSuccessStateProps) {
  return (
    <section className="rounded-[1.75rem] bg-[linear-gradient(135deg,#d9f2e8,#ffffff)] p-4 shadow-soft ring-1 ring-teal/10">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal">
        Pedido enviado
      </p>
      <h2 className="mt-2 text-xl font-semibold text-ink">
        Tudo certo, {patientName || "paciente"}.
      </h2>
      <p className="mt-2 text-sm leading-6 text-ink/70">
        Seu pedido chegou para a recepcao. Se quiser, voce pode montar um novo pedido.
      </p>
    </section>
  );
}
