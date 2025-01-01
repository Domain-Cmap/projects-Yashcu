import React from 'react';
import { Trophy, TrendingUp, BarChart2 } from 'lucide-react';
import type { HappinessStats } from '../types';

interface Props {
  stats: HappinessStats;
}

export function HappinessStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Average Mood</p>
            <p className="text-2xl font-semibold text-gray-900">
              {stats.average.toFixed(1)}
            </p>
          </div>
          <BarChart2 className="w-8 h-8 text-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Current Streak</p>
            <p className="text-2xl font-semibold text-gray-900">
              {stats.streak} days
            </p>
          </div>
          <TrendingUp className="w-8 h-8 text-green-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Best Day</p>
            <p className="text-2xl font-semibold text-gray-900">
              Level {stats.highest}
            </p>
          </div>
          <Trophy className="w-8 h-8 text-yellow-500" />
        </div>
      </div>
    </div>
  );
}