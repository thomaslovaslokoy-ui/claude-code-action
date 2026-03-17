export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  plan: "free" | "pro";
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  description: string;
  amount: number;
  category: CategoryKey;
  type: "income" | "expense";
  date: string;
  bank_reference: string | null;
  notes: string | null;
  created_at: string;
}

export interface Budget {
  id: string;
  user_id: string;
  category: CategoryKey;
  amount_nok: number;
  month: string;
  created_at: string;
}

export interface AIInsight {
  type: "saving_opportunity" | "overspending" | "positive" | "tip";
  title: string;
  body: string;
  category: CategoryKey | null;
  potential_saving_nok: number | null;
}

export interface AIInsightsResponse {
  insights: AIInsight[];
  monthly_score: number;
  summary: string;
}

export interface AIInsightsRecord {
  id: string;
  user_id: string;
  month: string;
  insights_json: AIInsightsResponse;
  created_at: string;
}

export type CategoryKey =
  | "mat_dagligvarer"
  | "transport"
  | "bolig"
  | "helse"
  | "restaurant"
  | "klær"
  | "underholdning"
  | "abonnementer"
  | "reise"
  | "sparing"
  | "utdanning"
  | "annet";

export interface Category {
  key: CategoryKey;
  label: string;
  icon: string;
  color: string;
}

export interface AffiliateOffer {
  trigger_category: CategoryKey;
  trigger_condition: string;
  title: string;
  description: string;
  cta: string;
  url: string;
  brand: string;
  logo_emoji: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export type BankFormat = "dnb" | "nordea" | "sparebank1" | "handelsbanken" | "annen";

export interface ParsedTransaction {
  date: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: CategoryKey;
  bank_reference: string;
}
