import React, { useState } from 'react';
import { Smile, Frown, Meh } from 'lucide-react';

interface Props {
  onSubmit: (level: number, note: string) => void;
}

export function HappinessForm({ onSubmit }: Props) {
  const [level, setLevel] = useState<number>(3);
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(level, note);
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <label className="block text-lg font-medium text-gray-700">
          How are you feeling today?
        </label>
        <div className="flex justify-center space-x-8">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setLevel(value)}
              className={`p-4 rounded-full transition-all ${
                level === value
                  ? 'bg-blue-100 scale-110'
                  : 'hover:bg-gray-100'
              }`}
            >
              {value <= 2 ? (
                <Frown className="w-8 h-8 text-red-500" />
              ) : value === 3 ? (
                <Meh className="w-8 h-8 text-yellow-500" />
              ) : (
                <Smile className="w-8 h-8 text-green-500" />
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Add a note (optional)
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          placeholder="What made you feel this way today?"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Save Entry
      </button>
    </form>
  );
}