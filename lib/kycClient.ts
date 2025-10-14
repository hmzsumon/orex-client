/**
 * app/kyc/lib/kycClient.ts
 * Tiny client helpers to call backend KYC APIs from the frontend
 */

export type KycSession = {
  step: number;
  status: "draft" | "under_review" | "approved" | "rejected";
  profile?: {
    full_name?: string;
    dob?: string;
    address?: string;
    city?: string;
    country?: string;
  };
  document?: {
    country?: string;
    type?: "passport" | "id_card" | "driver_license";
    id_number?: string;
    front_url?: string;
    back_url?: string;
  };
  selfie?: {
    url?: string;
  };
};

const BASE = process.env.NEXT_PUBLIC_API_URL || "/api/kyc";

/* attach auth headers as needed */
function headers(extra?: HeadersInit): HeadersInit {
  return {
    "Content-Type": "application/json",
    ...(extra || {}),
  };
}

export async function getSession() {
  const res = await fetch(`${BASE}/session`, { headers: headers() });
  if (!res.ok) throw new Error("Failed to load KYC session");
  const json = await res.json();
  return json.session as KycSession;
}

export async function saveProfile(data: {
  full_name: string;
  dob: string;
  address: string;
  city: string;
  country: string;
}) {
  const res = await fetch(`${BASE}/profile`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to save profile");
  return (await res.json()).session as KycSession;
}

export async function saveDocType(data: {
  country: string;
  type: "passport" | "id_card" | "driver_license";
  id_number?: string;
}) {
  const res = await fetch(`${BASE}/doctype`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to save document selection");
  return (await res.json()).session as KycSession;
}

export async function uploadFile(
  kind: "id_front" | "id_back" | "selfie",
  file: File
) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${BASE}/upload/${kind}`, {
    method: "POST",
    body: fd,
  });
  if (!res.ok) throw new Error("Failed to upload file");
  return (await res.json()).session as KycSession;
}

export async function submitKyc() {
  const res = await fetch(`${BASE}/submit`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to submit KYC");
  return (await res.json()).session as KycSession;
}

export async function getStatus() {
  const res = await fetch(`${BASE}/status`);
  if (!res.ok) throw new Error("Failed to fetch status");
  return (await res.json()).session as KycSession;
}
