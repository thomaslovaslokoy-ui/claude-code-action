import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 32 32">
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
                className="font-display font-bold"
                style={{ color: "var(--gold)" }}
              >
                BankAffiliate
              </span>
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              World&apos;s 247+ Banks. One Directory.
            </p>
            <p className="mt-2 text-xs" style={{ color: "var(--text-subtle)" }}>
              NorwegianSpark SA
              <br />
              Org. 834 984 172
              <br />
              norwegianspark@gmail.com
              <br />
              +47 99 73 74 67
            </p>
          </div>

          {/* Directory */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Directory</h4>
            <div className="flex flex-col gap-2">
              <Link
                href="/banks"
                className="text-sm hover:text-gold"
                style={{ color: "var(--text-muted)" }}
              >
                Banks
              </Link>
              <Link
                href="/category/highest-commission"
                className="text-sm hover:text-gold"
                style={{ color: "var(--text-muted)" }}
              >
                Categories
              </Link>
              <Link
                href="/compare"
                className="text-sm hover:text-gold"
                style={{ color: "var(--text-muted)" }}
              >
                Compare
              </Link>
              <Link
                href="/quiz"
                className="text-sm hover:text-gold"
                style={{ color: "var(--text-muted)" }}
              >
                Quiz
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Company</h4>
            <div className="flex flex-col gap-2">
              <Link
                href="/about"
                className="text-sm hover:text-gold"
                style={{ color: "var(--text-muted)" }}
              >
                About
              </Link>
              <Link
                href="/advertise"
                className="text-sm hover:text-gold"
                style={{ color: "var(--text-muted)" }}
              >
                Advertise
              </Link>
              <Link
                href="/privacy"
                className="text-sm hover:text-gold"
                style={{ color: "var(--text-muted)" }}
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm hover:text-gold"
                style={{ color: "var(--text-muted)" }}
              >
                Terms
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Legal</h4>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--text-subtle)" }}
            >
              BankAffiliate contains affiliate links. We may earn a commission
              when you open an account through our links. This does not affect
              our ratings. NorwegianSpark SA | Org. 834 984 172 |
              norwegianspark@gmail.com | +47 99 73 74 67
            </p>
          </div>
        </div>

        <div
          className="mt-8 border-t pt-6 text-center text-xs"
          style={{ borderColor: "var(--border)", color: "var(--text-subtle)" }}
        >
          &copy; 2026 BankAffiliate &middot; NorwegianSpark SA &middot; Org no:
          834 984 172
        </div>
      </div>
    </footer>
  );
}
