/* ────────── File: app/kyc/components/StepReview.tsx ────────── */
import { Previews } from "@/types/kyc/types";
import { useState } from "react";
import { toast } from "react-toastify";
import RowPreview from "./RowPreview";

/* লোকাল টাইপ—আপনার প্রোজেক্টে আলাদা টাইপ থাকলে সেটি import করুন */
type Personal = {
  full_name: string;
  dob: string; // MM/DD/YYYY
  country: string;
  city: string;
  address: string;
};

/* ────────── Review & Submit ────────── */
export default function StepReview({
  previews,
  personal,
  onBack,
  onSubmit,
}: {
  previews: Previews;
  personal: Personal;
  onBack: () => void;
  onSubmit: () => Promise<void> | void; // async OK
}) {
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);

  const InfoRow = ({ label, value }: { label: string; value?: string }) => (
    <div className="flex items-start justify-between gap-3 py-1">
      <span className="text-white/60 text-xs">{label}</span>
      <span className="text-sm text-white text-right">{value || "—"}</span>
    </div>
  );

  const handleSubmit = async () => {
    if (!confirm) {
      toast.info("Please confirm that your information is accurate.");
      return;
    }
    // quick completeness check (front-end only)
    if (!previews.id_front || !previews.id_back || !previews.selfie) {
      toast.error("Please upload ID front, ID back and a selfie.");
      return;
    }
    setBusy(true);
    try {
      await onSubmit();
      toast.success("Submitted for review");
    } catch (e: any) {
      toast.error(e?.message || "Submit failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Preview & Submit</h2>

      {/* Personal details summary */}
      <div className="card p-4 mb-4">
        <div className="font-medium mb-2">Personal details</div>
        <InfoRow label="Full name" value={personal.full_name} />
        <InfoRow label="Date of birth" value={personal.dob} />
        <InfoRow label="Country" value={personal.country} />
        <InfoRow label="City" value={personal.city} />
        <InfoRow label="Address" value={personal.address} />
      </div>

      {/* Document & selfie previews */}
      <div className="card p-4 space-y-3">
        <RowPreview label="ID Front" src={previews.id_front} />
        <RowPreview label="ID Back" src={previews.id_back} />
        <RowPreview label="Selfie" src={previews.selfie} />

        <label className="flex items-center gap-3 mt-2">
          <input
            type="checkbox"
            className="scale-125 accent-[var(--accent)]"
            checked={confirm}
            onChange={(e) => setConfirm(e.target.checked)}
          />
          <span className="text-xs">
            I confirm the information provided is accurate.
          </span>
        </label>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          className="btn bg-panel text-white grow"
          onClick={() => {
            if (busy) return;
            onBack();
          }}
        >
          Back
        </button>
        <button
          disabled={!confirm || busy}
          className={`btn grow ${
            confirm ? "btn-magenta" : "bg-panel text-muted cursor-not-allowed"
          } ${busy ? "opacity-70" : ""}`}
          onClick={handleSubmit}
        >
          {busy ? "Submitting…" : "Submit"}
        </button>
      </div>
    </div>
  );
}
