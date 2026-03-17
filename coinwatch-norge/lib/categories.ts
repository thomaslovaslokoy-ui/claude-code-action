import type { Category, CategoryKey } from "@/types";

export const CATEGORIES: readonly Category[] = [
  { key: "mat_dagligvarer", label: "Mat & Dagligvarer", icon: "\u{1F6D2}", color: "#22c55e" },
  { key: "transport", label: "Transport", icon: "\u{1F697}", color: "#3b82f6" },
  { key: "bolig", label: "Bolig & Utilities", icon: "\u{1F3E0}", color: "#f59e0b" },
  { key: "helse", label: "Helse", icon: "\u{1F48A}", color: "#ef4444" },
  { key: "restaurant", label: "Restaurant & Kafe", icon: "\u{1F37D}\uFE0F", color: "#8b5cf6" },
  { key: "kl\u00E6r", label: "Kl\u00E6r & Shopping", icon: "\u{1F457}", color: "#ec4899" },
  { key: "underholdning", label: "Underholdning", icon: "\u{1F3AC}", color: "#06b6d4" },
  { key: "abonnementer", label: "Abonnementer", icon: "\u{1F4F1}", color: "#84cc16" },
  { key: "reise", label: "Reise & Ferie", icon: "\u2708\uFE0F", color: "#f97316" },
  { key: "sparing", label: "Sparing & Investering", icon: "\u{1F4B0}", color: "#10b981" },
  { key: "utdanning", label: "Utdanning", icon: "\u{1F4DA}", color: "#6366f1" },
  { key: "annet", label: "Annet", icon: "\u{1F4E6}", color: "#78716c" },
] as const;

export const SSB_AVERAGES_NOK: Partial<Record<CategoryKey, number>> = {
  mat_dagligvarer: 5800,
  transport: 3200,
  bolig: 12000,
  helse: 800,
  restaurant: 1500,
  "kl\u00E6r": 900,
  underholdning: 600,
  abonnementer: 850,
  reise: 1200,
};

export function getCategoryByKey(key: CategoryKey): Category | undefined {
  return CATEGORIES.find((c) => c.key === key);
}
