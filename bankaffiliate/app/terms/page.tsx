import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "BankAffiliate terms of service by NorwegianSpark SA.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-6 font-display text-3xl font-bold">Terms of Service</h1>
      <div className="space-y-4 text-sm" style={{ color: "var(--text-muted)" }}>
        <p>Last updated: March 2026</p>
        <p>
          By using BankAffiliate, operated by NorwegianSpark SA (Org. 834 984
          172), you agree to the following terms.
        </p>
        <h2 className="pt-4 font-display text-lg font-bold text-white">
          Service Description
        </h2>
        <p>
          BankAffiliate is a directory and comparison service for global banks.
          We provide information for educational and comparison purposes only.
          We are not a bank and do not provide financial advice.
        </p>
        <h2 className="pt-4 font-display text-lg font-bold text-white">
          Affiliate Disclosure
        </h2>
        <p>
          BankAffiliate contains affiliate links. When you click these links and
          open an account, we may receive a commission. This does not affect the
          information we present or our independent ratings.
        </p>
        <h2 className="pt-4 font-display text-lg font-bold text-white">
          Disclaimer
        </h2>
        <p>
          All bank information, rates, and data are provided &quot;as is&quot;
          and may not be current. Always verify information directly with the
          bank before making financial decisions.
        </p>
        <h2 className="pt-4 font-display text-lg font-bold text-white">
          Contact
        </h2>
        <p>
          NorwegianSpark SA | Org. 834 984 172 |{" "}
          <a
            href="mailto:norwegianspark@gmail.com"
            style={{ color: "var(--gold)" }}
          >
            norwegianspark@gmail.com
          </a>{" "}
          | +47 99 73 74 67
        </p>
      </div>
    </div>
  );
}
