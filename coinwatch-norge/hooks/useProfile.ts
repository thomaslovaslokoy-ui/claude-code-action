"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types";
import { useAppStore } from "@/stores/useAppStore";

export function useProfile() {
  const { profile, setProfile } = useAppStore();

  useEffect(() => {
    async function fetchProfile() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) setProfile(data as Profile);
    }
    fetchProfile();
  }, [setProfile]);

  return { profile };
}
