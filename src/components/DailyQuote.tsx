import React, { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { DailyQuote } from '../types';

export function DailyQuote() {
  const [quote, setQuote] = useState<DailyQuote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDailyQuote();
  }, []);

  async function loadDailyQuote() {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('daily_quotes')
        .select('*')
        .eq('date', today)
        .single();

      if (error) throw error;
      setQuote(data);
    } catch (error) {
      console.error('Error loading daily quote:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="animate-pulse h-24 bg-gray-100 rounded-lg"></div>;
  }

  if (!quote) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 shadow-sm">
      <div className="flex items-start space-x-4">
        <Quote className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" />
        <div>
          <p className="text-lg text-gray-800 font-medium italic mb-2">
            "{quote.text}"
          </p>
          <p className="text-sm text-gray-600">
            — {quote.author}
          </p>
        </div>
      </div>
    </div>
  );
}