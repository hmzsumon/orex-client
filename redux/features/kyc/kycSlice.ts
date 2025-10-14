/* ────────────────────────────────────────────────────────────────────────────
   kycSlice: local UI progress (persist across reloads)
   - Mirrors your existing shape & behavior
   - Safe for SSR (guards window/localStorage)
   - Exposes actions: setStep, setBasics, setPreview, resetKycLocal
   - Selectors provided for convenience
   ──────────────────────────────────────────────────────────────────────────── */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PreviewKind = "id_front" | "id_back" | "selfie" | "poa";

export type KycLocal = {
  step: number;
  country?: string;
  doc_type?: string;
  previews: Partial<Record<PreviewKind, string>>;
};

const initial: KycLocal = { step: 1, previews: {} };

const KEY = "orex_kyc_local";

/** SSR-safe read */
const load = (): KycLocal => {
  if (typeof window === "undefined") return initial;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as KycLocal) : initial;
  } catch {
    return initial;
  }
};

/** SSR-safe write */
const save = (s: KycLocal) => {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(s));
    } catch {
      // ignore quota/unavailable errors
    }
  }
};

const slice = createSlice({
  name: "kycLocal",
  initialState: load(),
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
      save(state);
    },
    setBasics: (
      state,
      action: PayloadAction<{ country?: string; doc_type?: string }>
    ) => {
      if (action.payload.country !== undefined) {
        state.country = action.payload.country;
      }
      if (action.payload.doc_type !== undefined) {
        state.doc_type = action.payload.doc_type;
      }
      save(state);
    },
    setPreview: (
      state,
      action: PayloadAction<{ kind: PreviewKind; dataUrl: string }>
    ) => {
      state.previews[action.payload.kind] = action.payload.dataUrl;
      save(state);
    },
    resetKycLocal: () => {
      if (typeof window !== "undefined") {
        try {
          window.localStorage.removeItem(KEY);
        } catch {
          // ignore
        }
      }
      return initial;
    },
  },
});

export const { setStep, setBasics, setPreview, resetKycLocal } = slice.actions;
export default slice.reducer;

/* Optional selectors (use if convenient in components) */
export const selectKycStep = (s: any): number => s.kycLocal?.step ?? 1;
export const selectKycBasics = (
  s: any
): { country?: string; doc_type?: string } => ({
  country: s.kycLocal?.country,
  doc_type: s.kycLocal?.doc_type,
});
export const selectKycPreviews = (s: any): KycLocal["previews"] =>
  s.kycLocal?.previews ?? {};
