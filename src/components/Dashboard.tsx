import React, { useState, useEffect } from 'react';
import { Heart, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { HappinessEntry } from '../types';
import { HappinessForm } from './HappinessForm';
import { HappinessStats } from './HappinessStats';
import { HappinessHistory } from './HappinessHistory';
import { DailyQuote } from './DailyQuote';
import { calculateStats } from '../utils/statsCalculator';
import { supabase } from '../lib/supabase';

export function Dashboard() {
  const [entries, setEntries] = useState<HappinessEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadEntries();
  }, []);

  async function loadEntries() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('happiness_entries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error loading entries:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (level: number, note: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase.from('happiness_entries').insert([
        {
          level,
          note,
          user_id: user.id,
        },
      ]);

      if (error) throw error;
      loadEntries();
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-red-500" />
              <h1 className="text-3xl font-bold text-gray-900">Happiness Tracker</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>

          <div className="mb-8">
            <DailyQuote />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <HappinessForm onSubmit={handleSubmit} />
              <HappinessStats stats={calculateStats(entries)} />
            </div>
            
            <div className="space-y-8">
              <HappinessHistory entries={entries} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}