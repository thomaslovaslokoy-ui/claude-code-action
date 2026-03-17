import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertise with BankAffiliate",
  description:
    "Reach 50,000+ monthly finance professionals with sponsored listings on BankAffiliate.",
};

const tiers = [
  {
    name: "Featured Listing",
    price: "$299/mo",
    features: [
      "Gold sponsored badge",
      "Top placement in directory",
      "Affiliate tracking link",
      "Monthly performance report",
    ],
  },
  {
    name: "Category Sponsor",
    price: "$799/mo",
    features: [
      "Everything in Featured",
      "Category header banner",
      "Priority in category pages",
      "Custom landing page link",
    ],
    popular: true,
  },
  {
    name: "Homepage Feature",
    price: "$1,499/mo",
    features: [
      "Everything in Category",
      "Hero section placement",
      "Marquee ticker inclusion",
      "Dedicated review page",
      "Social media promotion",
    ],
  },
];

export default function AdvertisePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-display text-4xl font-bold">
          Reach 50,000+ Monthly Finance Professionals
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Get your bank in front of the right audience with sponsored listings
          on BankAffiliate.
        </p>
      </div>

      <div className="mb-12 grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="relative flex flex-col rounded-xl border p-6"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: tier.popular ? "var(--gold)" : "var(--border)",
            }}
          >
            {tier.popular && (
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-bold text-black"
                style={{ backgroundColor: "var(--gold)" }}
              >
                Most Popular
              </span>
            )}
            <h3 className="mb-1 font-display text-xl font-bold">{tier.name}</h3>
            <p
              className="mb-4 font-mono text-3xl font-bold"
              style={{ color: "var(--gold)" }}
            >
              {tier.price}
            </p>
            <ul className="mb-6 flex-1 space-y-2">
              {tier.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span style={{ color: "var(--gold)" }}>&#10003;</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="mailto:norwegianspark@gmail.com?subject=BankAffiliate Sponsorship"
              className="block rounded-full py-2 text-center text-sm font-bold text-black"
              style={{ backgroundColor: "var(--gold)" }}
            >
              Get Started
            </a>
          </div>
        ))}
      </div>

      <div
        className="rounded-xl border p-8 text-center"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
        }}
      >
        <h2 className="mb-2 font-display text-xl font-bold">
          Ready to advertise?
        </h2>
        <p className="mb-4 text-sm" style={{ color: "var(--text-muted)" }}>
          Contact us to discuss sponsorship options.
        </p>
        <a
          href="mailto:norwegianspark@gmail.com?subject=BankAffiliate Sponsorship"
          className="inline-block rounded-full px-8 py-3 font-bold text-black"
          style={{ backgroundColor: "var(--gold)" }}
        >
          norwegianspark@gmail.com
        </a>
        <p className="mt-4 text-xs" style={{ color: "var(--text-subtle)" }}>
          BankAffiliate contains affiliate links. Sponsored listings are clearly
          marked. All ratings are independent.
        </p>
      </div>
    </div>
  );
}
