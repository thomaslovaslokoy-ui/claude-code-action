"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BANKS, CATEGORIES } from "@/lib/banks";

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="mb-8 text-center font-display text-3xl font-bold">
        Browse by Category
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((cat) => {
          const count = BANKS.filter(cat.filter).length;
          return (
            <Link key={cat.slug} href={`/category/${cat.slug}`}>
              <div
                className="group flex h-full flex-col rounded-xl border p-5 transition-all hover:-translate-y-0.5"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border)",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.borderColor = "var(--border-hover)";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                <span className="mb-2 text-2xl">{cat.icon}</span>
                <h3 className="mb-1 font-display text-lg font-bold">
                  {cat.label}
                </h3>
                <p
                  className="mb-3 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  {cat.desc}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    {count} banks
                  </span>
                  <ArrowRight size={16} style={{ color: "var(--gold)" }} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
