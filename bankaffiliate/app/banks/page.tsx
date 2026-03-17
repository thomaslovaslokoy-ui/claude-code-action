"use client";

import { useState, useMemo } from "react";
import { Search, LayoutGrid, List } from "lucide-react";
import { BANKS, REGIONS, TYPES } from "@/lib/banks";
import BankCard from "@/components/banks/BankCard";
import BankTable from "@/components/banks/BankTable";
import AffiliateDisclosure from "@/components/common/AffiliateDisclosure";

type SortKey = "assets" | "apy" | "commission" | "rating";

export default function BanksPage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState<SortKey>("assets");
  const [view, setView] = useState<"card" | "table">("card");

  const filtered = useMemo(() => {
    let banks = BANKS.filter(
      (b) =>
        b.name.toLowerCase().includes(search.toLowerCase()) &&
        (region === "all" || b.region === region) &&
        (type === "all" || b.type === type),
    );

    const sortFn: Record<
      SortKey,
      (a: (typeof BANKS)[0], b: (typeof BANKS)[0]) => number
    > = {
      assets: (a, b) => b.totalAssetsB - a.totalAssetsB,
      apy: (a, b) => b.savingsApy - a.savingsApy,
      commission: (a, b) => b.commission - a.commission,
      rating: (a, b) => b.rating - a.rating,
    };

    banks.sort((a, b) => {
      if (a.is_sponsored !== b.is_sponsored) return a.is_sponsored ? -1 : 1;
      return sortFn[sort](a, b);
    });

    return banks;
  }, [search, region, type, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 font-display text-3xl font-bold">All Banks</h1>
      <p className="mb-6 text-sm" style={{ color: "var(--text-muted)" }}>
        Showing {filtered.length} banks
      </p>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1" style={{ minWidth: "200px" }}>
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text-subtle)" }}
          />
          <input
            type="text"
            placeholder="Search banks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border py-2 pl-9 pr-3 text-sm"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          />
        </div>

        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        >
          <option value="all">All Regions</option>
          {REGIONS.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.label}
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        >
          <option value="all">All Types</option>
          {TYPES.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.label}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-lg border px-3 py-2 text-sm"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        >
          <option value="assets">Sort by Assets</option>
          <option value="apy">Sort by APY</option>
          <option value="commission">Sort by Commission</option>
          <option value="rating">Sort by Rating</option>
        </select>

        <div
          className="flex rounded-lg border"
          style={{ borderColor: "var(--border)" }}
        >
          <button
            onClick={() => setView("card")}
            className={`p-2 ${view === "card" ? "bg-bg-elevated" : ""}`}
            style={{
              color: view === "card" ? "var(--gold)" : "var(--text-muted)",
            }}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setView("table")}
            className={`p-2 ${view === "table" ? "bg-bg-elevated" : ""}`}
            style={{
              color: view === "table" ? "var(--gold)" : "var(--text-muted)",
            }}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Results */}
      {view === "card" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((bank) => (
            <BankCard key={bank.id} bank={bank} />
          ))}
        </div>
      ) : (
        <BankTable banks={filtered} />
      )}

      <div className="mt-8">
        <AffiliateDisclosure />
      </div>
    </div>
  );
}
