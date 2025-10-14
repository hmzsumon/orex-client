/* ────────── File: app/kyc/components/StepTips.tsx ────────── */
/* ────────── Capture Tips (screenshot-accurate) ────────── */

/* —— Small helpers —— */
const Dot = ({ color = "#22c55e" }: { color?: string }) => (
  <span
    style={{
      display: "inline-block",
      width: 8,
      height: 8,
      borderRadius: 8,
      background: color,
      marginRight: 8,
      translate: "0 -1px",
    }}
  />
);

/* —— ID card illustration (good example) —— */
function GoodIdSVG() {
  return (
    <svg
      viewBox="0 0 360 210"
      width="100%"
      height="100%"
      className="rounded-xl"
    >
      <rect x="0" y="0" width="360" height="210" rx="14" fill="#e9eef4" />
      <rect x="18" y="20" width="80" height="100" rx="8" fill="#cbd5e1" />
      <circle cx="58" cy="65" r="26" fill="#94a3b8" />
      <rect x="118" y="28" width="210" height="16" rx="8" fill="#9db8d1" />
      <rect x="118" y="54" width="180" height="12" rx="6" fill="#b7c8d8" />
      <rect x="118" y="74" width="160" height="12" rx="6" fill="#c7d4e0" />
      <rect x="118" y="94" width="140" height="12" rx="6" fill="#d6dee7" />
      <rect x="18" y="140" width="320" height="40" rx="8" fill="#dfe6ee" />
    </svg>
  );
}

/* —— Bad example thumbnail (variant via label) —— */
function BadThumb({
  label,
}: {
  label: "Cropped" | "Glare" | "Blurry" | "Copy";
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-xl bg-[#121821] border border-white/10 p-3 w-[88px] h-[62px] flex items-center justify-center overflow-hidden">
        {/* generic tiny card with a variant mark */}
        <svg viewBox="0 0 120 80" width="100%" height="100%">
          <rect x="0" y="0" width="120" height="80" rx="8" fill="#1e2632" />
          <rect x="10" y="12" width="36" height="46" rx="6" fill="#2c394b" />
          <rect x="56" y="14" width="54" height="10" rx="5" fill="#42556e" />
          <rect x="56" y="30" width="46" height="8" rx="4" fill="#3a4d65" />
          <rect x="56" y="44" width="38" height="8" rx="4" fill="#33495f" />
          {/* variant marks */}
          {label === "Cropped" && (
            <rect x="-8" y="-8" width="40" height="20" fill="#0b0f14" />
          )}
          {label === "Glare" && (
            <circle cx="96" cy="20" r="12" fill="#ffffff" opacity="0.6" />
          )}
          {label === "Blurry" && (
            <g opacity={0.4}>
              <rect
                x="10"
                y="12"
                width="100"
                height="56"
                rx="8"
                fill="#93a2b2"
              />
            </g>
          )}
          {label === "Copy" && (
            <>
              <rect
                x="8"
                y="10"
                width="104"
                height="60"
                rx="8"
                fill="none"
                stroke="#64748b"
                strokeDasharray="6 6"
              />
              <rect
                x="16"
                y="18"
                width="88"
                height="44"
                rx="6"
                fill="none"
                stroke="#94a3b8"
              />
            </>
          )}
        </svg>
      </div>
      <div className="mt-2 text-[13px] text-[#ef4444] flex items-center gap-1">
        <span className="inline-block w-3 h-3 rounded-full bg-[#ef4444]" />
        {label}
      </div>
    </div>
  );
}

/* —— Face scan illustration —— */
function FaceScanSVG() {
  return (
    <svg
      viewBox="0 0 560 180"
      width="100%"
      height="100%"
      className="rounded-2xl"
    >
      <rect x="0" y="0" width="560" height="180" rx="16" fill="#0f141c" />
      {/* face frame */}
      <rect
        x="60"
        y="28"
        width="120"
        height="120"
        rx="18"
        fill="none"
        stroke="#1ee6c5"
        strokeWidth="4"
      />
      <circle cx="120" cy="84" r="32" fill="#2a3a4f" />
      <rect x="92" y="120" width="56" height="10" rx="5" fill="#243447" />
      {/* id overlay */}
      <g transform="translate(220,62)">
        <rect x="0" y="0" width="200" height="120" rx="12" fill="#e9eef4" />
        <rect x="12" y="14" width="56" height="64" rx="8" fill="#cbd5e1" />
        <rect x="82" y="18" width="100" height="10" rx="5" fill="#9db8d1" />
        <rect x="82" y="36" width="84" height="8" rx="4" fill="#b7c8d8" />
        <rect x="82" y="52" width="72" height="8" rx="4" fill="#c7d4e0" />
      </g>
      {/* green check */}
      <circle cx="190" cy="130" r="16" fill="#22c55e" />
      <path
        d="M182 130 l6 6 12-14"
        stroke="white"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function StepTips({ onNext }: { onNext: () => void }) {
  return (
    <div className="max-w-xl mx-auto">
      {/* Title */}
      <h2 className="text-lg leading-[38px] font-semibold mb-2 text-center">
        Get Ready for ID & Face Scan
      </h2>

      {/* ID Scan card */}
      <div className="mb-8">
        <div className="text-white/90 font-medium mb-1">ID Scan</div>
        <div className="text-muted text-[13px] mb-3">
          Please capture a clear and complete image
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0c1118] p-4">
          <div className="rounded-xl overflow-hidden bg-[#0b0f14] aspect-[360/210] max-h-[220px]">
            <GoodIdSVG />
          </div>

          <div className="text-[14px] text-white/90 flex items-center justify-center mt-3">
            <Dot color="#22c55e" />
            Good Example
          </div>

          {/* bad examples */}
          <div className="mt-4 grid grid-cols-4 gap-3">
            <BadThumb label="Cropped" />
            <BadThumb label="Glare" />
            <BadThumb label="Blurry" />
            <BadThumb label="Copy" />
          </div>
        </div>
      </div>

      {/* Face Scan card */}
      <div className="mb-8">
        <div className="text-white/90 font-medium mb-1">Face Scan</div>
        <div className="text-muted text-[13px] mb-3">
          Make sure your selfie clearly matches your ID photo
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0c1118] p-3">
          <div className="rounded-2xl overflow-hidden">
            <FaceScanSVG />
          </div>
        </div>
      </div>

      {/* Start button (white pill like screenshot) */}
      <button
        onClick={onNext}
        className="w-full h-[56px] rounded-lg bg-white text-black font-medium text-[16px]"
      >
        Start verification
      </button>
    </div>
  );
}
