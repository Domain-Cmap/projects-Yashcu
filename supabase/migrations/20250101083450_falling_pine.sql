/*
  # Create daily quotes table

  1. New Tables
    - `daily_quotes`
      - `id` (uuid, primary key)
      - `date` (date, unique)
      - `text` (text)
      - `author` (text)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `daily_quotes` table
    - Add policy for authenticated users to read quotes
*/

CREATE TABLE IF NOT EXISTS daily_quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date UNIQUE NOT NULL,
  text text NOT NULL,
  author text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE daily_quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read quotes"
  ON daily_quotes
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert some initial quotes
INSERT INTO daily_quotes (date, text, author) VALUES
  (CURRENT_DATE, 'The only way to do great work is to love what you do.', 'Steve Jobs'),
  (CURRENT_DATE + INTERVAL '1 day', 'Happiness is not something ready made. It comes from your own actions.', 'Dalai Lama'),
  (CURRENT_DATE + INTERVAL '2 days', 'The purpose of our lives is to be happy.', 'Dalai Lama'),
  (CURRENT_DATE + INTERVAL '3 days', 'Success is not the key to happiness. Happiness is the key to success.', 'Albert Schweitzer'),
  (CURRENT_DATE + INTERVAL '4 days', 'The most important thing is to enjoy your life - to be happy - it is all that matters.', 'Audrey Hepburn');

CREATE INDEX idx_daily_quotes_date ON daily_quotes(date);