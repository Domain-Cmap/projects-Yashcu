export interface HappinessEntry {
  id: string;
  date: string;
  level: number;
  note: string;
}

export interface HappinessStats {
  average: number;
  total: number;
  highest: number;
  streak: number;
}