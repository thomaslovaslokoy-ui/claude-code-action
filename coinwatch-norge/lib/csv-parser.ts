import type { BankFormat, CategoryKey, ParsedTransaction } from "@/types";

const AUTO_CATEGORY_RULES: { keywords: string[]; category: CategoryKey; type?: "income" | "expense" }[] = [
  { keywords: ["rema", "kiwi", "coop", "spar", "meny", "ica", "bunnpris"], category: "mat_dagligvarer" },
  { keywords: ["circle k", "uno-x", "best", "shell", "neste", "drivstoff", "bompeng"], category: "transport" },
  { keywords: ["netflix", "spotify", "hbo", "viaplay", "disney", "apple", "google play"], category: "abonnementer" },
  { keywords: ["telenor", "telia", "ice ", "chess", "release"], category: "abonnementer" },
  { keywords: ["mcdonalds", "burger", "pizza", "sushi", "kebab", "restaurant", "cafe", "kafe"], category: "restaurant" },
  { keywords: ["apotek", "vitusapotek", "boots apotek", "lege", "tannlege", "fysio"], category: "helse" },
  { keywords: ["h&m", "zara", "cubus", "lindex", "weekday", "jack & jones", "only"], category: "kl\u00E6r" },
  { keywords: ["sas", "norwegian air", "wider\u00F8e", "ryanair", "hotel", "airbnb", "booking.com"], category: "reise" },
  { keywords: ["husleie", "felleskost", "strom", "str\u00F8m", "fjordkraft", "hafslund"], category: "bolig" },
  { keywords: ["l\u00F8nn", "l\u00F8nning", "salary", "utbetaling"], category: "sparing", type: "income" },
];

function autoCategorizeTx(description: string): { category: CategoryKey; type?: "income" | "expense" } {
  const lower = description.toLowerCase();
  for (const rule of AUTO_CATEGORY_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return { category: rule.category, type: rule.type };
    }
  }
  return { category: "annet" };
}

function parseNorwegianNumber(value: string): number {
  const cleaned = value.replace(/\s/g, "").replace(",", ".");
  return parseFloat(cleaned) || 0;
}

function parseNorwegianDate(dateStr: string): string {
  const parts = dateStr.trim().split(".");
  if (parts.length === 3) {
    const [day, month, year] = parts;
    const fullYear = year.length === 2 ? `20${year}` : year;
    return `${fullYear}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  return dateStr;
}

export function detectBankFormat(content: string): BankFormat {
  const firstLine = content.split("\n")[0] ?? "";

  if (firstLine.includes("Dato") && firstLine.includes("Ut fra konto") && firstLine.includes("Inn p\u00E5 konto")) {
    return "dnb";
  }
  if (firstLine.includes("Avsender") && firstLine.includes("Mottaker") && firstLine.includes("Valuta")) {
    return "nordea";
  }
  if (firstLine.includes("Tekst") && firstLine.includes("Rentedato") && firstLine.includes(",")) {
    return "sparebank1";
  }
  if (firstLine.includes(";") && firstLine.includes("Dato")) {
    return "handelsbanken";
  }
  return "annen";
}

function parseDNB(lines: string[]): ParsedTransaction[] {
  return lines.slice(1).filter(Boolean).map((line) => {
    const [dato, beskrivelse, _rentedato, utFraKonto, innPaaKonto] = line.split(";");
    const outAmount = parseNorwegianNumber(utFraKonto ?? "0");
    const inAmount = parseNorwegianNumber(innPaaKonto ?? "0");
    const amount = inAmount > 0 ? inAmount : Math.abs(outAmount);
    const type = inAmount > 0 ? "income" as const : "expense" as const;
    const { category, type: autoType } = autoCategorizeTx(beskrivelse ?? "");

    return {
      date: parseNorwegianDate(dato ?? ""),
      description: (beskrivelse ?? "").trim(),
      amount: Math.round(amount * 100) / 100,
      type: autoType ?? type,
      category,
      bank_reference: (beskrivelse ?? "").trim(),
    };
  });
}

function parseNordea(lines: string[]): ParsedTransaction[] {
  return lines.slice(1).filter(Boolean).map((line) => {
    const [dato, _avsender, mottaker, belop] = line.split(";");
    const amount = parseNorwegianNumber(belop ?? "0");
    const isIncome = amount > 0;
    const { category, type: autoType } = autoCategorizeTx(mottaker ?? "");

    return {
      date: parseNorwegianDate(dato ?? ""),
      description: (mottaker ?? "").trim(),
      amount: Math.round(Math.abs(amount) * 100) / 100,
      type: autoType ?? (isIncome ? "income" : "expense"),
      category,
      bank_reference: (mottaker ?? "").trim(),
    };
  });
}

function parseSpareBank1(lines: string[]): ParsedTransaction[] {
  return lines.slice(1).filter(Boolean).map((line) => {
    const [dato, tekst, _rentedato, ut, inn] = line.split(",");
    const outAmount = parseNorwegianNumber(ut ?? "0");
    const inAmount = parseNorwegianNumber(inn ?? "0");
    const amount = inAmount > 0 ? inAmount : Math.abs(outAmount);
    const type = inAmount > 0 ? "income" as const : "expense" as const;
    const { category, type: autoType } = autoCategorizeTx(tekst ?? "");

    return {
      date: parseNorwegianDate(dato ?? ""),
      description: (tekst ?? "").trim(),
      amount: Math.round(amount * 100) / 100,
      type: autoType ?? type,
      category,
      bank_reference: (tekst ?? "").trim(),
    };
  });
}

function parseGeneric(lines: string[], separator: string): ParsedTransaction[] {
  return lines.slice(1).filter(Boolean).map((line) => {
    const parts = line.split(separator);
    const dato = parts[0] ?? "";
    const beskrivelse = parts[1] ?? "";
    const amount = parseNorwegianNumber(parts[3] ?? parts[2] ?? "0");
    const isIncome = amount > 0;
    const { category, type: autoType } = autoCategorizeTx(beskrivelse);

    return {
      date: parseNorwegianDate(dato),
      description: beskrivelse.trim(),
      amount: Math.round(Math.abs(amount) * 100) / 100,
      type: autoType ?? (isIncome ? "income" : "expense"),
      category,
      bank_reference: beskrivelse.trim(),
    };
  });
}

export function parseCSV(content: string, format: BankFormat): ParsedTransaction[] {
  const lines = content.trim().split("\n").filter((l) => l.trim());

  switch (format) {
    case "dnb":
      return parseDNB(lines);
    case "nordea":
      return parseNordea(lines);
    case "sparebank1":
      return parseSpareBank1(lines);
    case "handelsbanken":
      return parseGeneric(lines, ";");
    case "annen":
      return parseGeneric(lines, content.includes(";") ? ";" : ",");
  }
}
