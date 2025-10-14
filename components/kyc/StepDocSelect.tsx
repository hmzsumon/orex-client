/* ────────── File: app/kyc/components/StepDocSelect.tsx ────────── */
/* ────────── Country & Doc Type (screenshot-accurate) ────────── */

export type DocType = "passport" | "id_card";

/* ——— inline icons so no assets needed ——— */
const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M9 6l6 6-6 6"
      stroke="#9aa4b2"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DocIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect
      x="4"
      y="4"
      width="14"
      height="16"
      rx="2.4"
      stroke="#ffffff"
      strokeOpacity=".85"
      strokeWidth="1.6"
    />
    <path
      d="M8 9h6M8 13h8"
      stroke="#ffffff"
      strokeOpacity=".7"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

/* Bangladesh flag (exact look, small rounded) */
const FlagBD = () => (
  <svg
    width="26"
    height="18"
    viewBox="0 0 26 18"
    className="rounded-[3px]"
    aria-hidden
  >
    <rect width="26" height="18" fill="#006A4E" rx="2" />
    <circle cx="12" cy="9" r="5" fill="#F42A41" />
  </svg>
);

export default function StepDocSelect({
  country = "Bangladesh",
  docType,
  onDocType,
  onNext,
}: {
  country?: string;
  docType: DocType;
  onDocType: (v: DocType) => void;
  onNext: () => void;
}) {
  return (
    <div className="max-w-xl mx-auto">
      {/* title like screenshot */}
      <h2 className="text-lg md:text-[32px] leading-snug font-semibold mb-2">
        Select country where your ID document was issued.
      </h2>

      {/* country row */}
      <button
        type="button"
        className="w-full bg-panel rounded-lg px-4 py-3 flex items-center justify-between mb-6"
      >
        <span className="flex items-center gap-3 text-[18px] font-semibold">
          <FlagBD />
          {country}
        </span>
        <ChevronRight />
      </button>

      {/* section title */}
      <div className="text-sm font-semibold mb-2">
        Select your document type
      </div>

      {/* doc type options */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => onDocType("passport")}
          className={`w-full bg-panel rounded-lg px-4 py-3 flex items-center justify-between ${
            docType === "passport" ? "ring-2 ring-accent" : ""
          }`}
        >
          <span className="flex items-center gap-3 font-semibold">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-white/10">
              <DocIcon />
            </span>
            Passport
          </span>
          <ChevronRight />
        </button>

        <button
          type="button"
          onClick={() => onDocType("id_card")}
          className={`w-full bg-panel rounded-lg px-4 py-3 flex items-center justify-between ${
            docType === "id_card" ? "ring-2 ring-accent" : ""
          }`}
        >
          <span className="flex items-center gap-3 font-semibold">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-white/10">
              <DocIcon />
            </span>
            ID card
          </span>
          <ChevronRight />
        </button>
      </div>

      {/* primary cta */}
      <button className="btn btn-magenta w-full mt-8" onClick={onNext}>
        Continue
      </button>
    </div>
  );
}
