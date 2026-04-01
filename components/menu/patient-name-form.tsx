type PatientNameFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  submitDisabled?: boolean;
};

export function PatientNameForm({
  value,
  onChange,
  onSubmit,
  submitDisabled = false,
}: PatientNameFormProps) {
  return (
    <section className="space-y-4">
      <label htmlFor="patient-name" className="sr-only">
        Nome do paciente
      </label>
      <input
        id="patient-name"
        name="patientName"
        type="text"
        autoComplete="name"
        value={value}
        placeholder="Nome do paciente"
        className="glass-input w-full rounded-[999px] px-6 py-4 text-lg text-[#5e3b29] outline-none transition placeholder:text-[#8f725f] focus:-translate-y-px focus:ring-2 focus:ring-[rgba(255,170,111,0.28)]"
        onChange={(event) => onChange(event.target.value)}
      />

      {onSubmit ? (
        <button
          type="button"
          className="glass-button-primary flex w-full items-center justify-center rounded-[999px] px-4 py-4 text-xl font-semibold text-white transition hover:-translate-y-px hover:brightness-[1.03] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45"
          disabled={submitDisabled}
          onClick={onSubmit}
        >
          Continuar
        </button>
      ) : null}
    </section>
  );
}
