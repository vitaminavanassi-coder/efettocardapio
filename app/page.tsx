const highlights = [
  {
    title: "Pedido em poucos toques",
    description: "O paciente abre o QR Code, informa o nome e pede pelo celular.",
  },
  {
    title: "Recepção em tempo real",
    description: "Os pedidos entram no admin com destaque visual e aviso sonoro.",
  },
  {
    title: "Mini estoque simples",
    description: "Controle rápido de quantidade e alerta quando o item estiver acabando.",
  },
];

const categories = [
  "Águas",
  "Sucos",
  "Cafés",
  "Chocolates",
  "Chás",
  "Snacks",
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(232,122,93,0.18),_transparent_28%),linear-gradient(180deg,#fffdf8_0%,#f5efe4_100%)] text-ink">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between rounded-full border border-black/5 bg-white/75 px-4 py-3 shadow-soft backdrop-blur">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal">
              Clínica Efetto
            </p>
            <h1 className="text-lg font-semibold">Cardápio digital</h1>
          </div>
          <div className="rounded-full bg-sand px-3 py-1 text-sm font-medium text-ink">
            QR Code
          </div>
        </div>

        <div className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-coral/20 bg-white px-4 py-2 text-sm font-medium text-coral shadow-sm">
              Pedido mobile-first para clínica
            </div>

            <div className="space-y-4">
              <h2 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Um cardápio visual, rápido e elegante para o paciente pedir pelo celular.
              </h2>
              <p className="max-w-xl text-base leading-7 text-ink/75 sm:text-lg">
                O cliente lê o QR Code, informa o nome e faz o pedido. Na recepção, tudo
                aparece em tempo real no painel <span className="font-semibold">/admin</span>,
                com alerta visual e sonoro.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-black/5 bg-white px-4 py-2 text-sm font-medium shadow-sm"
                >
                  {category}
                </span>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-black/5 bg-white/90 p-5 shadow-soft"
                >
                  <div className="mb-4 h-12 w-12 rounded-2xl bg-[linear-gradient(135deg,#E87A5D,#CBA14A)]" />
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/70">{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 -z-10 translate-x-6 translate-y-6 rounded-[2rem] bg-[#c6e3dc]" />
            <div className="rounded-[2rem] border border-black/5 bg-white p-4 shadow-[0_40px_90px_rgba(16,33,51,0.15)]">
              <div className="rounded-[1.5rem] bg-[linear-gradient(180deg,#102133,#203a53)] p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                  Pronto para servir
                </p>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold">Selecione seu pedido</h3>
                    <p className="mt-1 text-sm text-white/75">
                      Nome do paciente, itens e envio imediato.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-3 py-2 text-sm font-semibold">
                    Novo
                  </div>
                </div>
              </div>

              <div className="space-y-3 p-4">
                {[
                  "Água com gás",
                  "Cappuccino",
                  "Chocolate quente",
                  "Barra de cereal",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-black/5 bg-sand px-4 py-3"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg">
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{item}</p>
                      <p className="text-sm text-ink/60">Imagem ilustrada do produto</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-teal/15" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
