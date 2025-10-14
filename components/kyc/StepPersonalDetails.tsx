/* ────────── File: app/kyc/components/StepPersonalDetails.tsx ────────── */
import React, { useState } from "react";

type Personal = {
  full_name: string;
  dob: string; // MM/DD/YYYY
  country: string;
  city: string;
  address: string;
};

export default function StepPersonalDetails({
  initial,
  onSubmit,
  onNext,
}: {
  initial?: Partial<Personal>;
  onSubmit?: (v: Personal) => void;
  onNext?: () => void;
}) {
  const [v, setV] = useState<Personal>({
    full_name: initial?.full_name ?? "",
    dob: initial?.dob ?? "",
    country: initial?.country ?? "Bangladesh",
    city: initial?.city ?? "",
    address: initial?.address ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const FlagBD = () => (
    <svg width="20" height="14" viewBox="0 0 26 18" className="rounded-[2px]">
      <rect width="26" height="18" fill="#006A4E" rx="2" />
      <circle cx="12" cy="9" r="5" fill="#F42A41" />
    </svg>
  );

  const fmtDob = (s: string) => {
    // auto add slashes -> MM/DD/YYYY
    const digits = s.replace(/[^\d]/g, "").slice(0, 8);
    const p1 = digits.slice(0, 2);
    const p2 = digits.slice(2, 4);
    const p3 = digits.slice(4, 8);
    let out = p1;
    if (p2) out += "/" + p2;
    if (p3) out += "/" + p3;
    return out;
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!v.full_name.trim()) e.full_name = "Required";
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(v.dob)) e.dob = "MM/DD/YYYY";
    if (!v.city.trim()) e.city = "Required";
    if (!v.address.trim()) e.address = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    onSubmit?.(v);
    onNext?.();
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto">
      <div className="bg-panel rounded-2xl p-5">
        <h2 className="text-center text-[20px] font-extrabold tracking-wide">
          PERSONAL DETAILS
        </h2>
        <div className="w-12 h-[3px] bg-[var(--accent)] mx-auto mt-2 rounded-full" />

        {/* Full name */}
        <label className="block mt-6 text-xs tracking-wide text-white/80">
          FULL NAME
        </label>
        <input
          value={v.full_name}
          onChange={(e) => setV({ ...v, full_name: e.target.value })}
          placeholder="JONE DOE"
          className="mt-2 w-full h-11 px-4 rounded-xl bg-[#121921] text-white placeholder:text-white/40 ring-1 ring-white/10 focus:outline-none focus:ring-[var(--accent)]"
        />
        {errors.full_name && (
          <p className="text-xs text-red-400 mt-1">{errors.full_name}</p>
        )}

        {/* DOB */}
        <label className="block mt-5 text-xs tracking-wide text-white/80">
          DATE OF BIRTH
        </label>
        <input
          inputMode="numeric"
          value={v.dob}
          onChange={(e) => setV({ ...v, dob: fmtDob(e.target.value) })}
          placeholder="MM/DD / YYYY"
          className="mt-2 w-full h-11 px-4 rounded-xl bg-[#121921] text-white placeholder:text-white/40 ring-1 ring-white/10 focus:outline-none focus:ring-[var(--accent)]"
        />
        {errors.dob && (
          <p className="text-xs text-red-400 mt-1">{errors.dob}</p>
        )}

        {/* Country (locked to Bangladesh for screenshot parity) */}
        <label className="block mt-5 text-xs tracking-wide text-white/80">
          COUNTRY
        </label>
        <div className="mt-2 w-full h-11 px-4 rounded-xl bg-[#121921] text-white ring-1 ring-white/10 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FlagBD />
            {v.country}
          </span>
          <span className="text-white/40 text-lg">▸</span>
        </div>

        {/* City */}
        <label className="block mt-5 text-xs tracking-wide text-white/80">
          CITY
        </label>
        <input
          value={v.city}
          onChange={(e) => setV({ ...v, city: e.target.value })}
          placeholder="Chittagong"
          className="mt-2 w-full h-11 px-4 rounded-xl bg-[#121921] text-white placeholder:text-white/40 ring-1 ring-white/10 focus:outline-none focus:ring-[var(--accent)]"
        />
        {errors.city && (
          <p className="text-xs text-red-400 mt-1">{errors.city}</p>
        )}

        {/* Address */}
        <label className="block mt-5 text-xs tracking-wide text-white/80">
          Address
        </label>
        <textarea
          rows={2}
          value={v.address}
          onChange={(e) => setV({ ...v, address: e.target.value })}
          placeholder="House/Road, Area, Postal code"
          className="mt-2 w-full px-4 py-3 rounded-xl bg-[#121921] text-white placeholder:text-white/40 ring-1 ring-white/10 focus:outline-none focus:ring-[var(--accent)] resize-none"
        />
        {errors.address && (
          <p className="text-xs text-red-400 mt-1">{errors.address}</p>
        )}

        {/* CTA */}
        <button
          type="submit"
          className="w-full h-[54px] rounded-lg btn btn-magenta text-sm font-medium mt-5"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
