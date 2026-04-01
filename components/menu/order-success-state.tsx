type OrderSuccessStateProps = {
  patientName: string;
};

export function OrderSuccessState({ patientName }: OrderSuccessStateProps) {
  return (
    <section className="glass-panel rounded-[2rem] p-5 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b17044]">
        Pedido realizado com sucesso
      </p>
      <h2 className="mt-2 text-xl font-semibold text-[#2f1e14]">
        {patientName || "Paciente"}, a recepcao ja recebeu o seu pedido.
      </h2>
      <p className="mt-2 text-sm leading-6 text-ink/62">
        Agora e so aguardar. Se quiser pedir outro item, voce pode montar um novo pedido logo abaixo.
      </p>
    </section>
  );
}
