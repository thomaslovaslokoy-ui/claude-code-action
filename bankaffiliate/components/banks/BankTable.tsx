"use client";

import Link from "next/link";
import type { Bank } from "@/lib/banks";
import SponsoredBadge from "../common/SponsoredBadge";

export default function BankTable({ banks }: { banks: Bank[] }) {
  return (
    <div
      className="overflow-x-auto rounded-xl border"
      style={{ borderColor: "var(--border)" }}
    >
      <table className="w-full text-left text-sm">
        <thead>
          <tr style={{ backgroundColor: "var(--bg-elevated)" }}>
            <th className="px-4 py-3 font-semibold">Bank</th>
            <th className="px-4 py-3 font-semibold">Country</th>
            <th className="px-4 py-3 font-semibold">Type</th>
            <th className="px-4 py-3 font-semibold text-right">Assets</th>
            <th className="px-4 py-3 font-semibold text-right">APY</th>
            <th className="px-4 py-3 font-semibold text-right">Commission</th>
            <th className="px-4 py-3 font-semibold text-right">Rating</th>
          </tr>
        </thead>
        <tbody>
          {banks.map((bank) => (
            <tr
              key={bank.id}
              className="border-t transition-colors hover:bg-bg-elevated"
              style={{ borderColor: "var(--border)" }}
            >
              <td className="px-4 py-3">
                <Link
                  href={`/banks/${bank.slug}`}
                  className="flex items-center gap-2 hover:underline"
                  style={{ color: "var(--gold)" }}
                >
                  <span>{bank.flag}</span>
                  <span className="font-display font-bold">{bank.name}</span>
                  {bank.is_sponsored && <SponsoredBadge />}
                </Link>
              </td>
              <td className="px-4 py-3" style={{ color: "var(--text-muted)" }}>
                {bank.country}
              </td>
              <td
                className="px-4 py-3 capitalize"
                style={{ color: "var(--text-muted)" }}
              >
                {bank.type}
              </td>
              <td className="px-4 py-3 text-right font-mono">
                {bank.totalAssets}
              </td>
              <td className="px-4 py-3 text-right font-mono text-green-400">
                {bank.savingsApy}%
              </td>
              <td
                className="px-4 py-3 text-right font-mono"
                style={{ color: "var(--gold)" }}
              >
                {bank.commission}%
              </td>
              <td
                className="px-4 py-3 text-right font-mono"
                style={{ color: "var(--gold)" }}
              >
                {bank.rating.toFixed(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
