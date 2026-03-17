"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { CATEGORIES } from "@/lib/banks";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 transition-all"
      style={{
        backgroundColor: "var(--bg)",
        borderBottom: scrolled
          ? "1px solid var(--gold-border)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="6" fill="#04040A" />
            <rect
              x="4"
              y="10"
              width="24"
              height="16"
              rx="3"
              fill="none"
              stroke="#F5C842"
              strokeWidth="1.5"
            />
            <rect x="4" y="14" width="24" height="3" fill="#F5C842" />
            <rect
              x="7"
              y="20"
              width="6"
              height="2"
              rx="1"
              fill="#F5C842"
              opacity="0.6"
            />
          </svg>
          <span
            className="font-display text-xl font-bold"
            style={{ color: "var(--gold)" }}
          >
            BankAffiliate
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/banks"
            className="text-sm transition-colors hover:text-gold"
            style={{ color: "var(--text-muted)" }}
          >
            Banks
          </Link>
          <div className="relative">
            <button
              onClick={() => setCatOpen(!catOpen)}
              className="flex items-center gap-1 text-sm transition-colors hover:text-gold"
              style={{ color: "var(--text-muted)" }}
            >
              Categories <ChevronDown size={14} />
            </button>
            {catOpen && (
              <div
                className="absolute left-0 top-full mt-2 w-56 rounded-lg border p-2 shadow-xl"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border)",
                }}
              >
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-bg-elevated"
                    onClick={() => setCatOpen(false)}
                  >
                    <span>{cat.icon}</span> {cat.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/compare"
            className="text-sm transition-colors hover:text-gold"
            style={{ color: "var(--text-muted)" }}
          >
            Compare
          </Link>
          <Link
            href="/quiz"
            className="text-sm transition-colors hover:text-gold"
            style={{ color: "var(--text-muted)" }}
          >
            Quiz
          </Link>
          <Link
            href="/advertise"
            className="text-sm transition-colors hover:text-gold"
            style={{ color: "var(--text-muted)" }}
          >
            Advertise
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: "var(--text)" }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="border-t px-4 py-4 md:hidden"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex flex-col gap-3">
            <Link
              href="/banks"
              className="text-sm"
              onClick={() => setMobileOpen(false)}
            >
              Banks
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="flex items-center gap-2 pl-4 text-sm"
                style={{ color: "var(--text-muted)" }}
                onClick={() => setMobileOpen(false)}
              >
                <span>{cat.icon}</span> {cat.label}
              </Link>
            ))}
            <Link
              href="/compare"
              className="text-sm"
              onClick={() => setMobileOpen(false)}
            >
              Compare
            </Link>
            <Link
              href="/quiz"
              className="text-sm"
              onClick={() => setMobileOpen(false)}
            >
              Quiz
            </Link>
            <Link
              href="/advertise"
              className="text-sm"
              onClick={() => setMobileOpen(false)}
            >
              Advertise
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
