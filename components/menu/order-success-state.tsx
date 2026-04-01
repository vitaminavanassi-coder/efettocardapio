import { BrandLogo } from "@/components/brand/brand-logo";

type OrderSuccessStateProps = {
  patientName: string;
};

export function OrderSuccessState({ patientName }: OrderSuccessStateProps) {
  return (
    <main
      className="flex min-h-screen items-center justify-center px-5 text-ink"
      style={{
        background:
          "radial-gradient(circle at top, rgba(255,230,210,0.24), transparent 28%), linear-gradient(180deg, #ffbf8a 0%, #f79a5d 48%, #ea7931 100%)",
      }}
    >
      <section className="glass-panel w-full max-w-sm rounded-[2.6rem] p-6 text-center shadow-soft">
        <div className="flex justify-center">
          <BrandLogo priority className="h-auto w-[13.5rem]" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b17044]">
          Pedido realizado com sucesso
        </p>
        <h2 className="mt-2 text-xl font-semibold text-[#2f1e14]">
          {patientName || "Paciente"}, a recepcao ja recebeu o seu pedido.
        </h2>
      </section>
    </main>
  );
}
