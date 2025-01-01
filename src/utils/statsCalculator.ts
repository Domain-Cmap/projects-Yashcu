import type { HappinessEntry, HappinessStats } from '../types';

export function calculateStreak(entries: HappinessEntry[]): number {
  let streak = 0;
  const today = new Date().toISOString().split('T')[0];
  
  for (let i = 0; i < entries.length; i++) {
    const entryDate = entries[i].date;
    if (entryDate === today) {
      streak++;
      continue;
    }
    
    const prevDate = new Date(today);
    prevDate.setDate(prevDate.getDate() - streak);
    const expectedDate = prevDate.toISOString().split('T')[0];
    
    if (entryDate === expectedDate) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

export function calculateStats(entries: HappinessEntry[]): HappinessStats {
  if (entries.length === 0) {
    return { average: 0, total: 0, highest: 0, streak: 0 };
  }

  const levels = entries.map(e => e.level);
  return {
    average: levels.reduce((a, b) => a + b, 0) / levels.length,
    total: entries.length,
    highest: Math.max(...levels),
    streak: calculateStreak(entries),
  };
}