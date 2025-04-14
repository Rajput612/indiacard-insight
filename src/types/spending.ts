
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
