// Database types
export interface HappinessEntry {
  id: string;
  created_at: string;
  level: number;
  note: string;
  user_id: string;
}

// Stats types
export interface HappinessStats {
  average: number;
  total: number;
  highest: number;
  streak: number;
}

// Quote types
export interface DailyQuote {
  id: string;
  date: string;
  text: string;
  author: string;
  created_at: string;
}