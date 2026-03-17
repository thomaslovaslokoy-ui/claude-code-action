export default function SponsoredBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full bg-gold-dim px-3 py-0.5 text-xs font-semibold"
      style={{ color: "var(--gold)", border: "1px solid var(--gold-border)" }}
    >
      &#11088; Sponsored
    </span>
  );
}
