import Link from "next/link";
import LiveBadge from "../common/LiveBadge";
import { SITE_DATA } from "@/lib/banks";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-20 text-center">
      <div className="gold-glow pointer-events-none absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-6 flex justify-center">
          <LiveBadge />
        </div>
        <h1 className="mb-4">
          <span
            className="font-display text-5xl font-black md:text-7xl"
            style={{ color: "var(--gold)" }}
          >
            World&apos;s {SITE_DATA.totalBanks}+ Banks.
          </span>
          <br />
          <span
            className="font-display text-4xl font-bold md:text-6xl"
            style={{ color: "var(--text-muted)" }}
          >
            One Directory.
          </span>
        </h1>
        <p
          className="mx-auto mb-8 max-w-2xl text-lg"
          style={{ color: "var(--text-muted)" }}
        >
          {SITE_DATA.description}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/banks"
            className="rounded-full px-8 py-3 text-base font-bold text-black transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--gold)" }}
          >
            Explore All Banks &rarr;
          </Link>
          <Link
            href="/compare"
            className="rounded-full border px-8 py-3 text-base font-bold transition-colors hover:bg-gold-dim"
            style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
          >
            Compare Banks
          </Link>
        </div>
      </div>
    </section>
  );
}
