import { create } from "zustand";
import type { Profile, Transaction } from "@/types";

interface AppState {
  profile: Profile | null;
  transactions: Transaction[];
  isLoading: boolean;
  sidebarOpen: boolean;
  setProfile: (profile: Profile | null) => void;
  setTransactions: (transactions: Transaction[]) => void;
  setIsLoading: (loading: boolean) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  profile: null,
  transactions: [],
  isLoading: false,
  sidebarOpen: false,
  setProfile: (profile) => set({ profile }),
  setTransactions: (transactions) => set({ transactions }),
  setIsLoading: (isLoading) => set({ isLoading }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
}));
