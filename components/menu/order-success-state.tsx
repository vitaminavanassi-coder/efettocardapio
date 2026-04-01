type OrderSuccessStateProps = {
  patientName: string;
};

export function OrderSuccessState({ patientName }: OrderSuccessStateProps) {
  return (
    <section className="glass-panel rounded-[2rem] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b17044]">
        Pedido enviado
      </p>
      <h2 className="mt-2 text-xl font-semibold text-[#2f1e14]">
        Tudo certo, {patientName || "paciente"}.
      </h2>
      <p className="mt-2 text-sm leading-6 text-ink/62">
        Seu pedido chegou para a recepcao. Se quiser, voce pode montar um novo pedido.
      </p>
    </section>
  );
}
