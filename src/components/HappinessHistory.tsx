import React from 'react';
import type { HappinessEntry } from '../types';
import { Smile, Frown, Meh } from 'lucide-react';

interface Props {
  entries: HappinessEntry[];
}

export function HappinessHistory({ entries }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">History</h2>
      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-white rounded-lg shadow p-4 flex items-start space-x-4"
          >
            <div className="flex-shrink-0">
              {entry.level <= 2 ? (
                <Frown className="w-6 h-6 text-red-500" />
              ) : entry.level === 3 ? (
                <Meh className="w-6 h-6 text-yellow-500" />
              ) : (
                <Smile className="w-6 h-6 text-green-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {new Date(entry.date).toLocaleDateString()}
              </p>
              {entry.note && (
                <p className="mt-1 text-sm text-gray-500">{entry.note}</p>
              )}
            </div>
            <div className="flex-shrink-0">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Level {entry.level}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}