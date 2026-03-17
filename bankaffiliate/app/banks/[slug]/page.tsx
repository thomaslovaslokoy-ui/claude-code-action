import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { BANKS } from "@/lib/banks";
import RatingStars from "@/components/banks/RatingStars";
import BankCard from "@/components/banks/BankCard";
import SponsoredBadge from "@/components/common/SponsoredBadge";
import AffiliateDisclosure from "@/components/common/AffiliateDisclosure";

export async function generateStaticParams() {
  return BANKS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bank = BANKS.find((b) => b.slug === slug);
  if (!bank) return {};
  return {
    title: `${bank.name} Review 2026 — Rates, Fees & Affiliate Program`,
    description: `${bank.description} Savings APY: ${bank.savingsApy}%. Commission: ${bank.commission}%.`,
  };
}

export default async function BankDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bank = BANKS.find((b) => b.slug === slug);
  if (!bank) notFound();

  const related = BANKS.filter(
    (b) => b.region === bank.region && b.id !== bank.id,
  ).slice(0, 3);

  const breakdownItems = [
    { label: "App", value: bank.ratingBreakdown.app },
    { label: "Fees", value: bank.ratingBreakdown.fees },
    { label: "Support", value: bank.ratingBreakdown.support },
    { label: "Security", value: bank.ratingBreakdown.security },
    { label: "Products", value: bank.ratingBreakdown.products },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <span className="text-4xl">{bank.flag}</span>
          <h1 className="font-display text-3xl font-bold">{bank.name}</h1>
          {bank.is_sponsored && <SponsoredBadge />}
        </div>
        <p style={{ color: "var(--text-muted)" }}>
          {bank.country} &middot;{" "}
          <span className="capitalize">{bank.type}</span> &middot; Founded{" "}
          {bank.founded}
        </p>
      </div>

      {/* Key Metrics */}
      <div
        className="mb-8 grid grid-cols-2 gap-4 rounded-xl border p-6 md:grid-cols-5"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
        }}
      >
        {[
          { label: "APY", value: `${bank.savingsApy}%`, color: "var(--green)" },
          {
            label: "Commission",
            value: `${bank.commission}%`,
            color: "var(--gold)",
          },
          {
            label: "Min Deposit",
            value:
              bank.minDeposit === 0
                ? "$0"
                : `$${bank.minDeposit.toLocaleString()}`,
            color: "var(--text)",
          },
          { label: "SWIFT", value: bank.swiftCode, color: "var(--text)" },
          {
            label: "Total Assets",
            value: bank.totalAssets,
            color: "var(--text)",
          },
        ].map((m) => (
          <div key={m.label} className="text-center">
            <p
              className="text-xs uppercase"
              style={{ color: "var(--text-subtle)" }}
            >
              {m.label}
            </p>
            <p
              className="font-mono text-lg font-bold"
              style={{ color: m.color }}
            >
              {m.value}
            </p>
          </div>
        ))}
      </div>

      {/* Rating Breakdown */}
      <div
        className="mb-8 rounded-xl border p-6"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
        }}
      >
        <h2 className="mb-4 font-display text-xl font-bold">
          Rating Breakdown
        </h2>
        <div className="mb-4">
          <RatingStars rating={bank.rating} />
        </div>
        <div className="space-y-3">
          {breakdownItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span
                className="w-20 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                {item.label}
              </span>
              <div
                className="h-2 flex-1 rounded-full"
                style={{ backgroundColor: "var(--bg-elevated)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(item.value / 5) * 100}%`,
                    backgroundColor: "var(--gold)",
                  }}
                />
              </div>
              <span className="w-8 text-right font-mono text-sm">
                {item.value}/5
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <div
          className="rounded-xl border p-6"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          <h3 className="mb-3 font-display text-lg font-bold text-green-400">
            Pros
          </h3>
          <ul className="space-y-2">
            {bank.pros.map((pro) => (
              <li key={pro} className="flex items-start gap-2 text-sm">
                <span className="text-green-400">&#10003;</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="rounded-xl border p-6"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          <h3 className="mb-3 font-display text-lg font-bold text-red-400">
            Cons
          </h3>
          <ul className="space-y-2">
            {bank.cons.map((con) => (
              <li key={con} className="flex items-start gap-2 text-sm">
                <span className="text-red-400">&#10007;</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="mb-3 font-display text-xl font-bold">
          About {bank.name}
        </h2>
        <p style={{ color: "var(--text-muted)" }}>{bank.description}</p>
      </div>

      {/* Tags */}
      <div className="mb-8 flex flex-wrap gap-2">
        {bank.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              backgroundColor: "var(--gold-dim)",
              color: "var(--gold)",
              border: "1px solid var(--gold-border)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="mb-4 text-center">
        <Link
          href={bank.affiliateUrl}
          className="inline-block rounded-full px-10 py-4 text-lg font-bold text-black transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--gold)" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Account at {bank.name} &rarr;
        </Link>
      </div>

      <div className="mb-12">
        <AffiliateDisclosure />
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h2 className="mb-4 font-display text-xl font-bold">Related Banks</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((b) => (
              <BankCard key={b.id} bank={b} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
