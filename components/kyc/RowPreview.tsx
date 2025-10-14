/* ────────── File: app/kyc/components/RowPreview.tsx ────────── */
import React, { useRef, useState } from "react";

type Props = {
  label: string;
  src?: string;
  onReplace?: (f: File) => void; // optional
};

export default function RowPreview({ label, src, onReplace }: Props) {
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const pick = () => inputRef.current?.click();

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!onReplace) return;
    setBusy(true);
    Promise.resolve(onReplace(f)).finally(() => setBusy(false));
  };

  return (
    <div className="flex items-center justify-between gap-3">
      {/* left: label + thumb */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-[56px] h-[40px] rounded-lg overflow-hidden bg-[#0f141b] ring-1 ring-white/10 shrink-0">
          {src ? (
            <img src={src} alt={label} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full grid place-items-center text-white/40 text-[11px]">
              No img
            </div>
          )}
        </div>
        <div className="truncate">
          <div className="text-sm font-medium truncate">{label}</div>
          <div className="text-xs text-muted truncate">
            {src ? "Preview loaded" : "Not provided"}
          </div>
        </div>
      </div>

      {/* right: action */}
      {onReplace ? (
        <>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={onFile}
            className="hidden"
          />
          <button
            onClick={pick}
            disabled={busy}
            className={`px-3 h-9 rounded-xl text-sm font-medium ${
              busy
                ? "bg-panel text-muted cursor-wait"
                : "bg-[#222a35] text-white/90 hover:bg-[#2a3442]"
            }`}
          >
            {busy ? "Uploading…" : src ? "Replace" : "Upload"}
          </button>
        </>
      ) : (
        <div className="text-xs text-white/50">—</div>
      )}
    </div>
  );
}
