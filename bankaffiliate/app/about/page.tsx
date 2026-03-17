import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About BankAffiliate",
  description:
    "BankAffiliate is a global bank directory operated by NorwegianSpark SA.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-6 font-display text-3xl font-bold">
        About BankAffiliate
      </h1>
      <div className="space-y-4" style={{ color: "var(--text-muted)" }}>
        <p>
          BankAffiliate is a comprehensive global bank directory that helps
          users compare savings rates, commissions, and affiliate programs from
          247+ banks worldwide.
        </p>
        <p>
          Our mission is to provide transparent, independent comparisons of
          financial institutions across all regions and types — from the
          world&apos;s largest commercial banks to innovative digital neobanks.
        </p>
        <p>
          BankAffiliate is operated by{" "}
          <strong className="text-white">NorwegianSpark SA</strong>, a Norwegian
          company (Org. 834 984 172) based in Norway.
        </p>
        <h2 className="pt-4 font-display text-xl font-bold text-white">
          How We Make Money
        </h2>
        <p>
          BankAffiliate earns commissions when users open accounts through our
          affiliate links. Sponsored banks are clearly marked with a gold badge.
          Our ratings and reviews are independent and not influenced by
          sponsorship.
        </p>
        <h2 className="pt-4 font-display text-xl font-bold text-white">
          Contact
        </h2>
        <p>
          Email:{" "}
          <a
            href="mailto:norwegianspark@gmail.com"
            style={{ color: "var(--gold)" }}
          >
            norwegianspark@gmail.com
          </a>
          <br />
          Phone: +47 99 73 74 67
          <br />
          Organization: NorwegianSpark SA (834 984 172)
        </p>
      </div>
    </div>
  );
}
