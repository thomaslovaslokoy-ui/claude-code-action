"use client";

import Link from "next/link";
import type { Bank } from "@/lib/banks";
import RatingStars from "./RatingStars";
import SponsoredBadge from "../common/SponsoredBadge";

export default function BankCard({ bank }: { bank: Bank }) {
  return (
    <Link href={`/banks/${bank.slug}`}>
      <div
        className="group relative flex h-full flex-col rounded-xl border p-5 transition-all duration-300 hover:-translate-y-1"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--border-hover)";
          e.currentTarget.style.boxShadow = "0 0 20px rgba(245,200,66,0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{bank.flag}</span>
            <div>
              <h3 className="font-display text-lg font-bold">{bank.name}</h3>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {bank.country} &middot;{" "}
                <span className="capitalize">{bank.type}</span>
              </p>
            </div>
          </div>
          {bank.is_sponsored && <SponsoredBadge />}
        </div>

        <div className="mb-3 flex items-center gap-4">
          <div>
            <p className="text-xs" style={{ color: "var(--text-subtle)" }}>
              APY
            </p>
            <p className="font-mono text-lg font-semibold text-green-400">
              {bank.savingsApy}%
            </p>
          </div>
          <div>
            <p className="text-xs" style={{ color: "var(--text-subtle)" }}>
              Commission
            </p>
            <p
              className="font-mono text-lg font-semibold"
              style={{ color: "var(--gold)" }}
            >
              {bank.commission}%
            </p>
          </div>
          <div>
            <p className="text-xs" style={{ color: "var(--text-subtle)" }}>
              Assets
            </p>
            <p
              className="font-mono text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              {bank.totalAssets}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <RatingStars rating={bank.rating} />
        </div>

        <div className="mt-auto">
          <span
            className="inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-bold text-black transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--gold)" }}
          >
            Visit Bank &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
