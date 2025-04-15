export interface User {
  id: string;
  email: string;
  name: string;
  ownedCards: string[]; // IDs of owned credit cards
  annualIncome?: number;
  occupation?: string;
  employmentType?: "salaried" | "self-employed" | "business" | "other";
  cibilScore?: number;
  lastCibilCheck?: string; // ISO date string
  city?: string;
  age?: number;
  existingEMIs?: number;
  preferredCategories?: string[];
  pan?: string;
  cibilEmail?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}