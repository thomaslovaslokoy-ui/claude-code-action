"use client";

import { formatDate } from "@/lib/formatters";

interface NorwegianDateProps {
  date: string | Date;
  className?: string;
}

export function NorwegianDate({ date, className }: NorwegianDateProps) {
  return <span className={className}>{formatDate(date)}</span>;
}
