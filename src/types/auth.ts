
export interface AuthUser {
  id: string;
  email: string;
  created_at: string;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  excluded_banks: string[];
  included_banks: string[];
  updated_at: string;
}

export interface UserCard {
  id: string;
  user_id: string;
  card_id: string;
  added_at: string;
}
