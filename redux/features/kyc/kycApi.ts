/* ────────────────────────────────────────────────────────────────────────────
   KYC API (RTK Query): session, save, uploads, submit, status
   - Uses FormData for uploads
   - Tag invalidation to refresh status/session across steps
   - All endpoints typed as `any` here to match your current server payloads
   ──────────────────────────────────────────────────────────────────────────── */
import { apiSlice } from "../api/apiSlice";

type UploadKind = "id_front" | "id_back" | "selfie" | "poa";

export const kycApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getKycSession: builder.query<any, void>({
      query: () => ({ url: "/session", method: "GET" }),
      providesTags: ["KYC"],
    }),

    saveKycSession: builder.mutation<
      any,
      { country?: string; doc_type?: string; step?: number }
    >({
      query: (body) => ({ url: "/session", method: "POST", body }),
      invalidatesTags: ["KYC"],
    }),

    /* ────────── Save profile ────────── */
    saveProfile: builder.mutation<
      any,
      {
        full_name: string;
        dob: string;
        address: string;
        city: string;
        country: string;
        step?: number;
      }
    >({
      query: (body) => ({ url: "/profile", method: "POST", body }),
      invalidatesTags: ["KYC"],
    }),

    /* ────────── save doc type ────────── */
    saveDocType: builder.mutation<any, { doc_type: string }>({
      query: (body) => ({ url: "/doctype", method: "POST", body }),
      invalidatesTags: ["KYC"],
    }),

    uploadKycFile: builder.mutation<any, { kind: UploadKind; file: File }>({
      query: ({ kind, file }) => {
        const fd = new FormData();
        // Allow common extensions; backend will compress/optimize before Cloudinary
        fd.append("file", file);
        return {
          url: `/upload/${kind}`,
          method: "POST",
          body: fd,
        };
      },
      invalidatesTags: ["KYC"],
    }),

    submitKyc: builder.mutation<any, void>({
      query: () => ({ url: "/submit", method: "POST" }),
      invalidatesTags: ["KYC"],
    }),

    getKycStatus: builder.query<any, void>({
      query: () => ({ url: "/kyc/status", method: "GET" }),
      providesTags: ["KYC"],
      // Poll while under review (client-side control also possible)
      // keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetKycSessionQuery,
  useSaveKycSessionMutation,
  useSaveProfileMutation,
  useSaveDocTypeMutation,
  useUploadKycFileMutation,
  useSubmitKycMutation,
  useGetKycStatusQuery,
} = kycApi;
