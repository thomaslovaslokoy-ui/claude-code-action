"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Budget } from "@/types";

export function useBudgets(month: string) {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBudgets = useCallback(async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setIsLoading(false); return; }

    const { data } = await supabase
      .from("budgets")
      .select("*")
      .eq("user_id", user.id)
      .eq("month", month);

    setBudgets((data as Budget[]) ?? []);
    setIsLoading(false);
  }, [month]);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const upsertBudget = async (category: string, amountNok: number) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("budgets")
      .upsert(
        { user_id: user.id, category, amount_nok: amountNok, month },
        { onConflict: "user_id,category,month" }
      )
      .select()
      .single();

    if (!error) await fetchBudgets();
    return { data, error };
  };

  return { budgets, isLoading, fetchBudgets, upsertBudget };
}
