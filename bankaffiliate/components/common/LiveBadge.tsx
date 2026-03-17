"use client";

import { SITE_DATA } from "@/lib/banks";

export default function LiveBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-gold-border bg-gold-dim px-4 py-1.5 text-sm">
      <span className="h-2 w-2 rounded-full bg-gold animate-pulse-gold" />
      <span style={{ color: "var(--gold)" }}>{SITE_DATA.updatedLabel}</span>
    </div>
  );
}
