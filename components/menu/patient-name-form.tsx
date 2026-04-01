type PatientNameFormProps = {
  value: string;
  onChange: (value: string) => void;
};

export function PatientNameForm({ value, onChange }: PatientNameFormProps) {
  return (
    <section className="rounded-[1.75rem] bg-white p-4 shadow-soft ring-1 ring-black/5">
      <label
        htmlFor="patient-name"
        className="text-sm font-semibold uppercase tracking-[0.2em] text-ink/65"
      >
        Nome do paciente
      </label>
      <input
        id="patient-name"
        name="patientName"
        type="text"
        autoComplete="name"
        value={value}
        placeholder="Digite seu nome para enviar o pedido"
        className="mt-3 w-full rounded-2xl border-0 bg-sand px-4 py-3 text-base text-ink outline-none ring-1 ring-transparent transition focus:ring-coral"
        onChange={(event) => onChange(event.target.value)}
      />
    </section>
  );
}
