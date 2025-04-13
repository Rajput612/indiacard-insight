// ... (keep all existing types)

// Add new CardPreferences type
export interface CardPreferences {
  compareCards: string[];
  excludeCards: string[];
  ownedCards: string[];
  desiredCardCount: number;
}