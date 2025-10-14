"use client";
/* ────────── status ────────── */
import { useGetKycStatusQuery } from "@/redux/features/kyc/kycApi";

export default function Status() {
  const { data } = useGetKycStatusQuery();
  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: "var(--card)", border: `1px solid var(--stroke)` }}
    >
      <h1 className="text-2xl font-semibold mb-1">Verification status</h1>
      <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
        Your documents are being reviewed. This usually takes a few minutes.
      </p>
      <div className="text-lg">
        Current status:{" "}
        <span style={{ color: "var(--cyan)" }}>
          {data?.status || "in_progress"}
        </span>
      </div>
    </div>
  );
}
