import type { AffiliateOffer, CategoryKey } from "@/types";
import { SSB_AVERAGES_NOK } from "./categories";

export const AFFILIATE_OFFERS: AffiliateOffer[] = [
  {
    trigger_category: "abonnementer",
    trigger_condition: "spending > SSB_AVERAGE * 1.2",
    title: "Spar p\u00E5 mobilabonnementet ditt",
    description: "Sammenlign mobilabonnementer og finn det billigste for deg.",
    cta: "Sammenlign n\u00E5",
    url: "https://mobiltopp.no",
    brand: "MobilTopp",
    logo_emoji: "\u{1F4F1}",
  },
  {
    trigger_category: "bolig",
    trigger_condition: "spending > SSB_AVERAGE * 1.1",
    title: "Finn billigste str\u00F8mleverand\u00F8r",
    description: "Norske str\u00F8mleverand\u00F8rer sammenlignet. Bytt og spar.",
    cta: "Se str\u00F8mpriser",
    url: "https://str\u00F8mtopp.no",
    brand: "Str\u00F8mTopp",
    logo_emoji: "\u26A1",
  },
  {
    trigger_category: "bolig",
    trigger_condition: "has_broadband_expense",
    title: "Bedre bredb\u00E5nd til lavere pris?",
    description: "Sammenlign bredb\u00E5ndsavtaler i ditt omr\u00E5de.",
    cta: "Finn beste bredb\u00E5nd",
    url: "https://bredband.no",
    brand: "Bredb\u00E5ndTopp",
    logo_emoji: "\u{1F310}",
  },
  {
    trigger_category: "transport",
    trigger_condition: "spending > SSB_AVERAGE * 1.3",
    title: "Spar p\u00E5 bilforsikringen",
    description: "Sammenlign bilforsikringer fra alle norske selskaper.",
    cta: "Sammenlign forsikring",
    url: "https://forsikringtopp.no",
    brand: "ForsikringTopp",
    logo_emoji: "\u{1F697}",
  },
  {
    trigger_category: "annet",
    trigger_condition: "has_loan_payment",
    title: "Refinansier l\u00E5net ditt",
    description: "Finn laveste rente p\u00E5 forbruksl\u00E5n og refinansiering.",
    cta: "Sammenlign l\u00E5n",
    url: "https://l\u00E5ntopp.no",
    brand: "L\u00E5nTopp",
    logo_emoji: "\u{1F4B3}",
  },
];

export function getRelevantOffers(
  spendingByCategory: Partial<Record<CategoryKey, number>>
): AffiliateOffer[] {
  const offers: AffiliateOffer[] = [];

  for (const offer of AFFILIATE_OFFERS) {
    const spending = spendingByCategory[offer.trigger_category] ?? 0;
    const ssbAvg = SSB_AVERAGES_NOK[offer.trigger_category] ?? 0;

    if (offer.trigger_condition.includes("SSB_AVERAGE")) {
      const multiplierMatch = offer.trigger_condition.match(/\* ([\d.]+)/);
      const multiplier = multiplierMatch ? parseFloat(multiplierMatch[1]) : 1;
      if (spending > ssbAvg * multiplier) {
        offers.push(offer);
      }
    } else if (spending > 0) {
      offers.push(offer);
    }
  }

  return offers.slice(0, 2);
}
