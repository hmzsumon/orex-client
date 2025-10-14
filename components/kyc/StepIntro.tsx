/* ────────── File: app/kyc/components/StepIntro.tsx ────────── */
/* ────────── Intro Screen ────────── */

/* lightweight inline icon so the file is fully self-contained */
function ListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="6" width="3" height="3" rx=".6" fill="#fbbf24" />
      <rect x="4" y="11" width="3" height="3" rx=".6" fill="#94a3b8" />
      <rect x="4" y="16" width="3" height="3" rx=".6" fill="#94a3b8" />
      <rect
        x="9"
        y="6"
        width="11"
        height="3"
        rx=".8"
        fill="#f8fafc"
        opacity=".8"
      />
      <rect
        x="9"
        y="11"
        width="11"
        height="3"
        rx=".8"
        fill="#f8fafc"
        opacity=".5"
      />
      <rect
        x="9"
        y="16"
        width="11"
        height="3"
        rx=".8"
        fill="#f8fafc"
        opacity=".5"
      />
    </svg>
  );
}

export default function StepIntro({ onNext }: { onNext: () => void }) {
  return (
    <div className="max-w-xl mx-auto">
      {/* Title exactly like screenshot: two lines, big */}
      <h1 className="text-lg leading-tight font-extrabold mb-1">
        Complete your verification
      </h1>
      <p className="text-muted text-xs mb-6">
        The process usually takes 1–5 minutes, but may occasionally take longer.
      </p>

      {/* Three rows */}
      <div className="space-y-3">
        {/* Profile details — amber panel with submitted */}
        <div
          className="rounded-[14px] px-4 py-3 flex items-center justify-between"
          style={{ background: "#2b2416" }}
        >
          <div className="flex items-center gap-3">
            <span
              className="inline-flex h-6 w-6 items-center justify-center rounded-md"
              style={{ background: "rgba(251,191,36,.15)" }}
            >
              <ListIcon />
            </span>
            <span className="font-semibold">Profile details</span>
          </div>
          <span className="text-xs font-medium" style={{ color: "#f1b341" }}>
            Submitted
          </span>
        </div>

        {/* Identity document */}
        <div className="bg-panel rounded-[14px] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/10">
              <ListIcon />
            </span>
            <div>
              <div className="font-semibold text-[16px]">Identity document</div>
              <div className="text-sm text-muted">Take a photo of your ID</div>
            </div>
          </div>
        </div>

        {/* Selfie */}
        <div className="bg-panel rounded-[14px] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/10">
              <ListIcon />
            </span>
            <div>
              <div className="font-semibold text-[16px]">Selfie</div>
              <div className="text-sm text-muted">Take a selfie</div>
            </div>
          </div>
        </div>
      </div>

      {/* Consent line */}
      <p className="mt-4 text-[13px] leading-5 text-muted">
        By tapping Continue, you consent to processing your personal data
        according to our{" "}
        <a className="underline text-[#58a6ff] hover:opacity-90" href="#">
          Consent to Personal data processing document
        </a>
      </p>

      {/* Speed-up panel with lightning + checkbox (blue border) */}
      <div
        className="mt-5 rounded-lg p-4 bg-[#0d1320]"
        style={{ border: "1.5px solid #2563eb" }}
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5" aria-hidden>
            ⚡
          </span>
          <div className="flex-1">
            <div className="font-semibold text-lg">
              Speed up your verification with Sumsub ID
            </div>
            <p className="text-xs text-muted mt-1">
              Sumsub ID allows you to re-use your securely stored data to speed
              up the verification process
            </p>
          </div>
        </div>
      </div>

      {/* Continue CTA */}
      <button
        className="w-full h-[54px] rounded-lg btn btn-magenta text-sm font-medium mt-5"
        onClick={onNext}
      >
        Continue
      </button>
    </div>
  );
}
