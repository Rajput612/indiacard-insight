
export interface User {
  id: string;
  email: string;
  name: string;
  ownedCards: string[]; // IDs of owned credit cards
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
