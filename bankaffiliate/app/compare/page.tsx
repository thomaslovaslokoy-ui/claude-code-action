"use client";

import { useState } from "react";
import { BANKS } from "@/lib/banks";
import RatingStars from "@/components/banks/RatingStars";

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>([]);

  const banks = selected
    .map((slug) => BANKS.find((b) => b.slug === slug))
    .filter(Boolean);

  const addBank = (slug: string) => {
    if (slug && selected.length < 3 && !selected.includes(slug)) {
      setSelected([...selected, slug]);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-2 font-display text-3xl font-bold">Compare Banks</h1>
      <p className="mb-6 text-sm" style={{ color: "var(--text-muted)" }}>
        Select up to 3 banks to compare side-by-side
      </p>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <select
          onChange={(e) => {
            addBank(e.target.value);
            e.target.value = "";
          }}
          className="rounded-lg border px-3 py-2 text-sm"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
          defaultValue=""
        >
          <option value="" disabled>
            Add a bank...
          </option>
          {BANKS.filter((b) => !selected.includes(b.slug)).map((b) => (
            <option key={b.slug} value={b.slug}>
              {b.flag} {b.name}
            </option>
          ))}
        </select>
        {selected.length > 0 && (
          <button
            onClick={() => setSelected([])}
            className="rounded-lg border px-3 py-2 text-sm"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-muted)",
            }}
          >
            Clear
          </button>
        )}
      </div>

      {banks.length > 0 && (
        <div
          className="overflow-x-auto rounded-xl border"
          style={{ borderColor: "var(--border)" }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "var(--bg-elevated)" }}>
                <th className="px-4 py-3 text-left font-semibold">Metric</th>
                {banks.map((bank) => (
                  <th key={bank!.id} className="px-4 py-3 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-2xl">{bank!.flag}</span>
                      <span className="font-display font-bold">
                        {bank!.name}
                      </span>
                      <button
                        onClick={() =>
                          setSelected(selected.filter((s) => s !== bank!.slug))
                        }
                        className="text-xs"
                        style={{ color: "var(--text-subtle)" }}
                      >
                        Remove
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  label: "Total Assets",
                  render: (b: (typeof BANKS)[0]) => b.totalAssets,
                },
                {
                  label: "Savings APY",
                  render: (b: (typeof BANKS)[0]) => (
                    <span className="text-green-400">{b.savingsApy}%</span>
                  ),
                },
                {
                  label: "Commission",
                  render: (b: (typeof BANKS)[0]) => (
                    <span style={{ color: "var(--gold)" }}>
                      {b.commission}%
                    </span>
                  ),
                },
                {
                  label: "Min Deposit",
                  render: (b: (typeof BANKS)[0]) =>
                    b.minDeposit === 0
                      ? "$0"
                      : `$${b.minDeposit.toLocaleString()}`,
                },
                {
                  label: "Founded",
                  render: (b: (typeof BANKS)[0]) => String(b.founded),
                },
                {
                  label: "FDIC Insured",
                  render: (b: (typeof BANKS)[0]) =>
                    b.fdicInsured ? "Yes" : "No",
                },
                {
                  label: "Rating",
                  render: (b: (typeof BANKS)[0]) => (
                    <RatingStars rating={b.rating} />
                  ),
                },
                {
                  label: "Pros",
                  render: (b: (typeof BANKS)[0]) => (
                    <ul className="list-disc pl-4 text-left text-xs">
                      {b.pros.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  ),
                },
                {
                  label: "Cons",
                  render: (b: (typeof BANKS)[0]) => (
                    <ul className="list-disc pl-4 text-left text-xs">
                      {b.cons.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  ),
                },
              ].map((row) => (
                <tr
                  key={row.label}
                  className="border-t"
                  style={{ borderColor: "var(--border)" }}
                >
                  <td
                    className="px-4 py-3 font-semibold"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {row.label}
                  </td>
                  {banks.map((bank) => (
                    <td
                      key={bank!.id}
                      className="px-4 py-3 text-center font-mono"
                    >
                      {row.render(bank!)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {banks.length === 0 && (
        <div
          className="rounded-xl border p-12 text-center"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          <p style={{ color: "var(--text-muted)" }}>
            Select banks above to start comparing
          </p>
        </div>
      )}
    </div>
  );
}
