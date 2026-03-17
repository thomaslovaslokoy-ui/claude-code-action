"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/useAppStore";

export function TopBar() {
  const { toggleSidebar } = useAppStore();

  return (
    <header className="lg:hidden flex items-center justify-between h-14 px-4 border-b border-border bg-card">
      <h1 className="font-syne font-bold text-lg text-primary">CoinWatch</h1>
      <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Meny">
        <Menu className="h-5 w-5" />
      </Button>
    </header>
  );
}
