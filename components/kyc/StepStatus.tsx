/* ────────── File: app/kyc/components/StepStatus.tsx ────────── */

import { KycStatus } from "@/types/kyc/types";

/* ────────── Status View ────────── */
export default function StepStatus({ status }: { status: KycStatus }) {
  if (status === "approved")
    return (
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-lg font-bold text-accent mb-3">KYC Approved 🎉</h2>
        <p className="text-muted">You can now access all features.</p>
      </div>
    );
  if (status === "rejected")
    return (
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-danger mb-3">KYC Rejected</h2>
        <p className="text-muted">Please re‑submit with clear photos.</p>
      </div>
    );
  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Verification status</h2>
      <div className="card p-4 mb-3 flex items-center justify-between">
        <span>Profile details</span>
        <span className="text-muted">Under review</span>
      </div>
      <div className="card p-4 mb-3 flex items-center justify-between">
        <span>Identity document</span>
        <span className="text-muted">Under review</span>
      </div>
      <div className="card p-4 flex items-center justify-between">
        <span>Selfie</span>
        <span className="text-muted">Under review</span>
      </div>
      <p className="text-muted mt-6">
        Your documents are being reviewed. This usually takes 24 hours.
      </p>
    </div>
  );
}
