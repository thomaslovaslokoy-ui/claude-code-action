"use client";

import { formatNOK } from "@/lib/formatters";

interface NOKAmountProps {
  value: number;
  className?: string;
}

export function NOKAmount({ value, className }: NOKAmountProps) {
  return (
    <span className={`font-syne font-tabular ${className ?? ""}`}>
      {formatNOK(value)}
    </span>
  );
}
