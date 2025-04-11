
// Main spending categories
export type SpendingCategory = 'online' | 'offline';

// Online subcategories
export type OnlineSubcategory = 'electronics' | 'fashion' | 'groceries' | 'homeGoods' | 'travel' | 'entertainment' | 'other';

// Offline subcategories
export type OfflineSubcategory = 'foodAndBeverages' | 'transport' | 'housingAndUtilities' | 'healthcare' | 'education' | 'entertainment' | 'other';

// Electronics subcategories
export type ElectronicsCategory = 'smartphones' | 'laptops' | 'accessories' | 'other';

// Fashion subcategories
export type FashionCategory = 'clothing' | 'footwear' | 'accessories' | 'other';

// Food subcategories
export type FoodCategory = 'groceries' | 'diningOut' | 'foodDelivery' | 'other';

// Common brands by category
export type Brand = {
  id: string;
  name: string;
  category: string;
};

// Platform types
export type Platform = 'app' | 'website' | 'store' | 'other';

// Spending entry
export type SpendingEntry = {
  id: string;
  category: SpendingCategory;
  subcategory: OnlineSubcategory | OfflineSubcategory;
  specificCategory?: string;
  brand?: string;
  platform?: Platform;
  platformName?: string;
  amount: number;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'one-time';
};

// User spending profile
export type SpendingProfile = {
  entries: SpendingEntry[];
  totalMonthlySpending: number;
  onlinePercentage: number;
  offlinePercentage: number;
  topCategories: { category: string; percentage: number }[];
};

// Credit card benefit types
export type BenefitType = 
  | 'cashback' 
  | 'rewardPoints' 
  | 'milesEarning' 
  | 'shoppingDiscount' 
  | 'fuelSurcharge' 
  | 'diningOffer' 
  | 'travelInsurance' 
  | 'airportLounge' 
  | 'movieDiscount' 
  | 'noForeignFee';

// Credit card type
export type CreditCard = {
  id: string;
  name: string;
  issuer: string;
  annualFee: number;
  joinFee: number;
  interestRate: number;
  minIncome: number;
  creditScore: number;
  benefits: {
    type: BenefitType;
    description: string;
    value: number; // Percentage or fixed value
  }[];
  categories: {
    category: string;
    cashbackRate: number;
  }[];
  imageUrl: string;
  applyUrl: string;
};
