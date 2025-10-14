"use client";

/* ────────── File: app/kyc/KycPage.tsx ────────── */
/* ────────── KYC Stepper Shell (no auto-advance; Continue controls) ────────── */

import { useEffect, useMemo, useState } from "react";

/* ────────── RTK Query hooks ────────── */
import {
  useGetKycSessionQuery,
  useSaveDocTypeMutation,
  useSaveKycSessionMutation,
  useSaveProfileMutation,
  useSubmitKycMutation,
  useUploadKycFileMutation,
} from "@/redux/features/kyc/kycApi";

/* ────────── UI (unchanged) ────────── */
import StepDocSelect from "@/components/kyc/StepDocSelect";
import StepIdUpload from "@/components/kyc/StepIdUpload";
import StepIntro from "@/components/kyc/StepIntro";
import StepPersonalDetails from "@/components/kyc/StepPersonalDetails";
import StepReview from "@/components/kyc/StepReview";
import StepSelfie from "@/components/kyc/StepSelfie";
import StepStatus from "@/components/kyc/StepStatus";
import StepTips from "@/components/kyc/StepTips";
import Theme from "@/theme/Theme";

/* ────────── types & toast ────────── */
import { fetchBaseQueryError } from "@/redux/services/helpers";
import type { DocType, KycStatus, Previews } from "@/types/kyc/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ────────── helpers ────────── */
const S = (v?: string) => v || "";
type Personal = {
  full_name: string;
  dob: string;
  country: string;
  city: string;
  address: string;
};

export default function KycPage() {
  /* ────────── NEW: user must click Continue to leave Intro ────────── */
  const [introAck, setIntroAck] = useState(false);
  const [doc_type, setDoc_type] = useState("id_card");

  /* ────────── Load server session ────────── */
  const {
    data: sessionResp,
    isFetching: getting,
    isError: getErr,
    error: getError,
    refetch,
  } = useGetKycSessionQuery();

  const [saveSession, { isLoading: saving }] = useSaveKycSessionMutation();
  const [saveProfile, { isLoading: savingProfile }] = useSaveProfileMutation();
  const [saveDocType, { isLoading: savingDocTypes }] = useSaveDocTypeMutation();
  const [uploadFile, { isLoading: uploading }] = useUploadKycFileMutation();
  const [submitKyc, { isLoading: submitting }] = useSubmitKycMutation();

  const session = sessionResp?.session;
  const serverStep = session?.step ?? 1;
  const serverStatus: KycStatus | undefined = session?.status;

  /* ────────── Decide which step to show
     - If introAck=false → ALWAYS show Intro (1)
     - Else if status under_review/approved → 8
     - Else → server step clamped 1..8
  ────────── */
  const step = useMemo(() => {
    if (!introAck) return 1; // lock on Intro until user clicks Continue
    if (serverStatus === "under_review" || serverStatus === "approved")
      return 8;
    return Math.min(Math.max(serverStep, 1), 8);
  }, [introAck, serverStatus, serverStep]);

  /* ────────── Error toast ────────── */
  useEffect(() => {
    if (getErr) {
      const e = getError as fetchBaseQueryError;
      toast.error(e?.data?.message || "Failed to load KYC session");
    }
  }, [getErr, getError]);

  /* ────────── Actions ────────── */
  const go = async (
    nextStep: number,
    body?: { country?: string; doc_type?: string }
  ) => {
    try {
      await saveSession({ ...(body || {}), step: nextStep }).unwrap();
      toast.success("Progress saved");
      await refetch();
    } catch (e) {
      const err = e as fetchBaseQueryError;
      toast.error(err?.data?.message || "Could not save progress");
    }
  };

  const onPersonalSubmit = async (v: Personal) => {
    try {
      await saveProfile(v).unwrap();
      // await saveSession({ step: 3, country: v.country }).unwrap();
      toast.success("Personal details saved");
      await refetch();
    } catch (e) {
      const err = e as fetchBaseQueryError;
      toast.error(err?.data?.message || "Could not save personal details");
    }
  };

  /* ────────── on save doctype ────────── */
  const onDocTypeSubmit = async (v: any) => {
    try {
      await saveDocType(v).unwrap();
      toast.success("Document type saved");
      await refetch();
    } catch (e) {
      const err = e as fetchBaseQueryError;
      toast.error(err?.data?.message || "Could not save document type");
    }
  };

  const upload = async (kind: keyof Previews, file: File) => {
    try {
      await uploadFile({ kind: kind as any, file }).unwrap();
      toast.success("Uploaded");
      await refetch();
    } catch (e) {
      const err = e as fetchBaseQueryError;
      toast.error(err?.data?.message || "Upload failed");
    }
  };

  const doSubmit = async () => {
    try {
      await submitKyc().unwrap();
      toast.info("Submitted for review");
      await refetch();
    } catch (e) {
      const err = e as fetchBaseQueryError;
      toast.error(err?.data?.message || "Submit failed");
    }
  };

  /* ────────── Derived props from server ────────── */
  const personal: Personal = {
    full_name: S(session?.profile?.full_name),
    dob: S(session?.profile?.dob),
    country: S(session?.profile?.country) || "Bangladesh",
    city: S(session?.profile?.city),
    address: S(session?.profile?.address),
  };
  const previews: Previews = {
    id_front: S(session?.document?.front_url),
    id_back: S(session?.document?.back_url),
    selfie: S(session?.selfie?.url),
  };
  const docType: DocType =
    (session?.document?.type as DocType) ||
    (session?.doc_type as DocType) ||
    "id_card";

  /* ────────── Banners ────────── */
  const Banner = ({ text }: { text: string }) => (
    <div className="max-w-xl mx-auto px-4">
      <div className="bg-panel rounded-2xl py-3 px-4 text-sm text-muted mt-3">
        {text}
      </div>
    </div>
  );

  /* ────────── Render ────────── */
  return (
    <div className="min-h-[100svh] w-full bg-bg text-white overflow-x-hidden">
      <Theme />
      <ToastContainer position="top-center" theme="dark" />

      {getting && <Banner text="Loading your KYC session…" />}
      {saving && <Banner text="Saving…" />}
      {savingProfile && <Banner text="Saving profile…" />}
      {uploading && <Banner text="Uploading…" />}
      {submitting && <Banner text="Submitting…" />}

      <div className="max-w-xl mx-auto px-4 pt-6 pb-[calc(16px+env(safe-area-inset-bottom))]">
        {/* ────────── 1. Intro (always first; no auto-advance) ────────── */}
        {step === 1 && (
          <StepIntro
            onNext={async () => {
              setIntroAck(true);
              if ((session?.step ?? 1) < 2) {
                await go(2);
              }
            }}
          />
        )}

        {/* ────────── 2. Personal Details ────────── */}
        {step === 2 && (
          <StepPersonalDetails
            initial={personal}
            onSubmit={onPersonalSubmit}
            onNext={() => go(3)}
          />
        )}

        {/* ────────── 3. Tips ────────── */}
        {step === 3 && <StepTips onNext={() => go(4)} />}

        {/* ────────── 4. Country + Doc Type ────────── */}
        {step === 4 && (
          <StepDocSelect
            country={personal.country || "Bangladesh"}
            docType={doc_type as DocType}
            onDocType={(t) => setDoc_type(t)}
            onNext={() =>
              onDocTypeSubmit({
                type: doc_type,
                step: 5,
                country: personal.country || "Bangladesh",
              })
            }
          />
        )}

        {/* ────────── 5. ID Upload ────────── */}
        {step === 5 && (
          <StepIdUpload
            previews={previews}
            onPick={(k, f) => upload(k, f)}
            onNext={() => go(6)}
          />
        )}

        {/* ────────── 6. Selfie ────────── */}
        {step === 6 && (
          <StepSelfie
            preview={previews.selfie}
            onPick={(f) => upload("selfie", f)}
            onNext={() => go(7)}
          />
        )}

        {/* ────────── 7. Review & Submit ────────── */}
        {step === 7 && (
          <StepReview
            previews={previews}
            personal={personal}
            onBack={() => go(6)}
            onSubmit={doSubmit}
          />
        )}

        {/* ────────── 8. Status ────────── */}
        {step === 8 && <StepStatus status={serverStatus || "under_review"} />}
      </div>
    </div>
  );
}
