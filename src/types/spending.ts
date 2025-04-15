// Credit Card types
export interface CreditCard {
  id: string;
  name: string;
  issuer: string;
  annualFee: number;
  joinFee: number;
  interestRate: number;
  minIncome: number;
  creditScore: number;
  benefits: Benefit[];
  categories: Category[];
  imageUrl: string;
  applyUrl: string;
  type?: string;
  network?: string;
  status: 0 | 1 | 2; // 0: inactive, 1: active, 2: discontinued
  statusMessage?: string; // Custom message for status
  discontinuedDate?: string; // Date when card was discontinued
  replacementCardId?: string; // ID of replacement card if discontinued
}

export interface Benefit {
  type: string;
  description: string;
  value: number;
}

export interface Category {
  category: string;
  cashbackRate: number;
}

// Spending tracking types
export type Platform = "app" | "website" | "store" | "other";

export interface SpendingEntry {
  id: string;
  category: "online" | "offline";
  subcategory: string;
  specificCategory?: string;
  brand?: string;
  platform: Platform;
  platformName?: string;
  amount: number;
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "yearly" | "one-time";
}

// Card Preferences type
export interface CardPreferences {
  compareCards: string[];
  excludeCards: string[];
  ownedCards: string[];
  desiredCardCount: number;
}