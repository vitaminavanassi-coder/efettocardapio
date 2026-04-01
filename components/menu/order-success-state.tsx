type OrderSuccessStateProps = {
  patientName: string;
};

export function OrderSuccessState({ patientName }: OrderSuccessStateProps) {
  return (
    <main
      className="flex min-h-screen items-center justify-center px-5 text-ink"
      style={{
        background:
          "radial-gradient(circle at top, rgba(255,230,210,0.28), transparent 28%), linear-gradient(180deg, #fff8f2 0%, #f7efe5 100%)",
      }}
    >
      <section className="glass-shell w-full max-w-sm rounded-[2.6rem] p-6 text-center shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b17044]">
          Pedido realizado com sucesso
        </p>
        <h2 className="mt-2 text-xl font-semibold text-[#2f1e14]">
          {patientName || "Paciente"}, a recepcao ja recebeu o seu pedido.
        </h2>
        <p className="mt-2 text-sm leading-6 text-ink/62">
          Agora e so aguardar o atendimento.
        </p>
        <p className="mt-5 text-sm font-medium text-[#8a654c]">
          Para fazer outro pedido, abra o cardapio novamente.
        </p>
      </section>
    </main>
  );
}
