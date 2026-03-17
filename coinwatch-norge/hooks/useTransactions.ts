"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Transaction } from "@/types";
import { useAppStore } from "@/stores/useAppStore";

export function useTransactions(month?: string) {
  const { transactions, setTransactions } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setIsLoading(false); return; }

    let query = supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false });

    if (month) {
      const startDate = `${month}-01`;
      const [y, m] = month.split("-").map(Number);
      const endDate = new Date(y, m, 0);
      const endStr = `${y}-${String(m).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`;
      query = query.gte("date", startDate).lte("date", endStr);
    }

    const { data } = await query;
    setTransactions((data as Transaction[]) ?? []);
    setIsLoading(false);
  }, [month, setTransactions]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const addTransaction = async (tx: Omit<Transaction, "id" | "user_id" | "created_at">) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("transactions")
      .insert({ ...tx, user_id: user.id })
      .select()
      .single();

    if (!error && data) {
      await fetchTransactions();
    }
    return { data, error };
  };

  const deleteTransaction = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("transactions").delete().eq("id", id);
    if (!error) await fetchTransactions();
    return { error };
  };

  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    const supabase = createClient();
    const { error } = await supabase.from("transactions").update(updates).eq("id", id);
    if (!error) await fetchTransactions();
    return { error };
  };

  return { transactions, isLoading, fetchTransactions, addTransaction, deleteTransaction, updateTransaction };
}
