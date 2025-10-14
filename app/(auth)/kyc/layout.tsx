/* ──────────────────────────────────────────────────────────────────────────── */
/* ──  KYC Layout (dark + neon accent)  ────────────────────────────────────── */
/* ──────────────────────────────────────────────────────────────────────────── */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen px-3 md:px-8 py-6"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <div className="max-w-3xl mx-auto">{children}</div>
    </div>
  );
}
