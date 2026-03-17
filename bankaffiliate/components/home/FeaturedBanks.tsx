import { BANKS } from "@/lib/banks";
import BankCard from "../banks/BankCard";

export default function FeaturedBanks() {
  const featured = BANKS.filter((b) => b.is_sponsored)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="mb-2 text-center font-display text-3xl font-bold">
        Featured Banks
      </h2>
      <p
        className="mb-8 text-center text-sm"
        style={{ color: "var(--text-muted)" }}
      >
        Top-rated banks with affiliate programs
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((bank) => (
          <BankCard key={bank.id} bank={bank} />
        ))}
      </div>
    </section>
  );
}
