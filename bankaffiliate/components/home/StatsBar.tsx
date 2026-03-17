import { BANKS, SITE_DATA } from "@/lib/banks";

export default function StatsBar() {
  const sponsored = BANKS.filter((b) => b.is_sponsored);

  return (
    <section>
      {/* Stats */}
      <div
        className="border-y"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--bg-card)",
        }}
      >
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 px-4 py-6 md:gap-16">
          {[
            { label: "Banks", value: `${SITE_DATA.totalBanks}+` },
            { label: "Countries", value: `${SITE_DATA.totalCountries}+` },
            { label: "Categories", value: "8" },
            { label: "Live Rates", value: "Yes" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="font-mono text-2xl font-bold"
                style={{ color: "var(--gold)" }}
              >
                {stat.value}
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div
        className="overflow-hidden border-b"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--bg-elevated)",
        }}
      >
        <div className="animate-marquee flex whitespace-nowrap py-2">
          {[...sponsored, ...sponsored].map((bank, i) => (
            <span
              key={`${bank.id}-${i}`}
              className="mx-6 text-sm"
              style={{ color: "var(--text-subtle)" }}
            >
              {bank.flag} {bank.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
