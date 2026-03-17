import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BANKS, CATEGORIES } from "@/lib/banks";
import BankCard from "@/components/banks/BankCard";
import AffiliateDisclosure from "@/components/common/AffiliateDisclosure";

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return {};
  return {
    title: `${cat.label} — Best Banks 2026`,
    description: cat.desc,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();

  const banks = BANKS.filter(cat.filter).sort((a, b) => {
    if (a.is_sponsored !== b.is_sponsored) return a.is_sponsored ? -1 : 1;
    return b.rating - a.rating;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 text-center">
        <span className="mb-2 block text-4xl">{cat.icon}</span>
        <h1 className="mb-2 font-display text-3xl font-bold">{cat.label}</h1>
        <p style={{ color: "var(--text-muted)" }}>{cat.desc}</p>
        <p
          className="mt-2 font-mono text-sm"
          style={{ color: "var(--text-subtle)" }}
        >
          {banks.length} banks
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {banks.map((bank) => (
          <BankCard key={bank.id} bank={bank} />
        ))}
      </div>

      <div className="mt-8">
        <AffiliateDisclosure />
      </div>
    </div>
  );
}
