
export interface CreditCard {
  id: string;
  name: string;
  issuer: string;
  categories: string[];
  cashbackRate: number;
  annualFee: number;
  highlight?: string;  // Optional highlight field
  recommendedFor?: string;
  requiredIncome?: number;
  rewards: {
    cashback: {
      categories: { category: string; rate: number }[];
      globalRate: number;
    };
  };
}
