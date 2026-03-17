"use client";

import { useCallback, useState } from "react";
import type { AIInsightsResponse } from "@/types";
import type { AffiliateOffer } from "@/types";

export function useAIInsights() {
  const [insights, setInsights] = useState<AIInsightsResponse | null>(null);
  const [affiliateOffers, setAffiliateOffers] = useState<AffiliateOffer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = useCallback(async (month: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ month }),
      });

      if (!res.ok) {
        throw new Error("Kunne ikke hente innsikter");
      }

      const data = await res.json();
      setInsights(data.insights);
      setAffiliateOffers(data.affiliate_offers ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ukjent feil");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { insights, affiliateOffers, isLoading, error, fetchInsights };
}
