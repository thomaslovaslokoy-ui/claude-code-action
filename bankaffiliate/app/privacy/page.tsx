import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "BankAffiliate privacy policy by NorwegianSpark SA.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-6 font-display text-3xl font-bold">Privacy Policy</h1>
      <div className="space-y-4 text-sm" style={{ color: "var(--text-muted)" }}>
        <p>Last updated: March 2026</p>
        <p>
          BankAffiliate (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;),
          operated by NorwegianSpark SA (Org. 834 984 172), is committed to
          protecting your privacy.
        </p>
        <h2 className="pt-4 font-display text-lg font-bold text-white">
          Information We Collect
        </h2>
        <p>
          We collect standard web analytics data (page views, browser type,
          referral source) to improve our service. We do not collect personal
          information unless you voluntarily submit it via our contact forms.
        </p>
        <h2 className="pt-4 font-display text-lg font-bold text-white">
          Affiliate Links
        </h2>
        <p>
          When you click affiliate links on our site, you may be redirected to
          third-party bank websites. These websites have their own privacy
          policies. We earn a commission on successful account openings.
        </p>
        <h2 className="pt-4 font-display text-lg font-bold text-white">
          Cookies
        </h2>
        <p>
          We use essential cookies for site functionality and analytics cookies
          to understand how visitors interact with our site.
        </p>
        <h2 className="pt-4 font-display text-lg font-bold text-white">
          Contact
        </h2>
        <p>
          For privacy-related inquiries, contact us at{" "}
          <a
            href="mailto:norwegianspark@gmail.com"
            style={{ color: "var(--gold)" }}
          >
            norwegianspark@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
