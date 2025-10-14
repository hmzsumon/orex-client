/* ────────── File: types/kyc/types.ts ────────── */

export type DocType = "passport" | "id_card";

export type KycStatus = "under_review" | "approved" | "rejected" | null;

export type Previews = Partial<{
  id_front: string;
  id_back: string;
  selfie: string;
  poa: string; // proof of address (optional)
}>;

export type Personal = {
  full_name: string;
  dob: string; // MM/DD/YYYY
  country: string;
  city: string;
  address: string;
};
