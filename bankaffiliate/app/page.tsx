import Link from "next/link";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedBanks from "@/components/home/FeaturedBanks";
import AffiliateDisclosure from "@/components/common/AffiliateDisclosure";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturedBanks />
      <CategoryGrid />

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div
          className="rounded-2xl border p-12 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(245,200,66,0.1) 0%, var(--bg-card) 100%)",
            borderColor: "var(--gold-border)",
          }}
        >
          <h2 className="mb-4 font-display text-3xl font-bold">
            Start earning with BankAffiliate
          </h2>
          <p className="mb-6" style={{ color: "var(--text-muted)" }}>
            Join our affiliate network and earn commissions from the
            world&apos;s leading banks.
          </p>
          <Link
            href="/advertise"
            className="inline-block rounded-full px-8 py-3 font-bold text-black transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--gold)" }}
          >
            Get Started &rarr;
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-8">
        <AffiliateDisclosure />
      </div>
    </>
  );
}
