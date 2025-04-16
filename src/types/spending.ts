
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
  defaultRate?: number;
  defaultRewardType?: "cashback" | "points";
  pointValue?: number;
  benefits: Benefit[];
  categories: Category[];
  rules?: RewardRule[];
  milestone?: Milestone;
  imageUrl: string;
  applyUrl: string;
  type?: string;
  network?: string;
  status: 0 | 1 | 2;
  statusMessage?: string;
  discontinuedDate?: string;
  replacementCardId?: string;
}

export interface RewardRule {
  category?: string;
  subcategory?: string;
  brand?: string;
  platform?: string;
  payment_app?: string;
  channel?: "online" | "offline";
  rate: number;
  rewardType: "cashback" | "points";
  cap?: number;
  categoryCap?: number;
}

export interface Milestone {
  threshold: number;
  bonus: number;
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
  id?: string;
  amount: number;
  category: string;
  subcategory?: string;
  specificCategory?: string; // Added this property
  brand?: string;
  platform?: Platform;
  platformName?: string; // Added this property
  channel?: "online" | "offline";
  payment_app?: string;
  store_name?: string;
  purpose?: "personal" | "business";
  frequency?: "daily" | "weekly" | "monthly" | "quarterly" | "yearly" | "one-time";
}

// Card Preferences type
export interface CardPreferences {
  compareCards: string[];
  excludeCards: string[];
  ownedCards: string[];
  desiredCardCount: number;
}

export interface CardRecommendationResult {
  group: string[];
  totalGroupCashback: number;
  totalGroupPoints: number;
  breakdown: {
    card: string;
    cashback: number;
    rewardPoints: number;
  }[];
}
