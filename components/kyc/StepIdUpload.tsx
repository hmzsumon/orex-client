/* ────────── File: app/kyc/components/StepIdUpload.tsx ────────── */
import type { Previews } from "@/types/kyc/types";
import React, { useState } from "react";
import { toast } from "react-toastify";

/* ────────── ID Front & Back (keeps your exact visual design) ────────── */
export default function StepIdUpload({
  previews,
  onPick,
  onNext,
}: {
  previews: Previews;
  onPick: (k: "id_front" | "id_back", f: File) => Promise<void> | void;
  onNext: () => void;
}) {
  const [fOk, setF] = useState(!!previews.id_front);
  const [bOk, setB] = useState(!!previews.id_back);
  const [busy, setBusy] = useState<"front" | "back" | null>(null);

  const validateType = (file: File) => {
    const ok =
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png";
    if (!ok) {
      toast.error("Only JPG, JPEG or PNG allowed");
    }
    return ok;
  };

  const onFile =
    (k: "id_front" | "id_back") =>
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (!f) return;
      if (!validateType(f)) {
        e.currentTarget.value = "";
        return;
      }
      try {
        setBusy(k === "id_front" ? "front" : "back");
        // hand over to parent (it may upload to API)
        await onPick(k, f);
        if (k === "id_front") {
          setF(true);
          toast.success("Front side selected");
        } else {
          setB(true);
          toast.success("Back side selected");
        }
      } catch (err: any) {
        toast.error(err?.message || "Upload failed");
        // reset checkbox flags if parent failed
        if (k === "id_front") setF(!!previews.id_front);
        else setB(!!previews.id_back);
      } finally {
        setBusy(null);
      }
    };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div className="card p-4">
        <div className="mb-3 font-medium">ID Front</div>
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={onFile("id_front")}
          className="block w-full text-sm"
        />
        {busy === "front" && (
          <div className="text-xs text-muted mt-2">Processing…</div>
        )}
        {previews.id_front && (
          <img
            src={previews.id_front}
            className="mt-3 rounded-lg"
            alt="ID Front preview"
          />
        )}
      </div>

      <div className="card p-4">
        <div className="mb-3 font-medium">ID Back</div>
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={onFile("id_back")}
          className="block w-full text-sm"
        />
        {busy === "back" && (
          <div className="text-xs text-muted mt-2">Processing…</div>
        )}
        {previews.id_back && (
          <img
            src={previews.id_back}
            className="mt-3 rounded-lg"
            alt="ID Back preview"
          />
        )}
      </div>

      <button
        disabled={!(fOk && bOk)}
        className={`btn w-full ${
          fOk && bOk ? "btn-magenta" : "bg-panel text-muted cursor-not-allowed"
        }`}
        onClick={() => {
          if (!(fOk && bOk)) {
            toast.info("Please upload both front & back");
            return;
          }
          onNext();
        }}
      >
        Continue
      </button>
    </div>
  );
}
