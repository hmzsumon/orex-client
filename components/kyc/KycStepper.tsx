/* ──────────────────────────────────────────────────────────────────────────── */
/* ──  KYC Stepper (১..৪)  ─────────────────────────────────────────────────── */
/* ──────────────────────────────────────────────────────────────────────────── */
export function KycStepper({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          className="h-2 flex-1 rounded"
          style={{ background: n <= step ? "var(--cyan)" : "var(--stroke)" }}
        />
      ))}
    </div>
  );
}
