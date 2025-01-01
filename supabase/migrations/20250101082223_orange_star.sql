/*
  # Create happiness entries table

  1. New Tables
    - `happiness_entries`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `level` (integer)
      - `note` (text)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `happiness_entries` table
    - Add policies for users to manage their own entries
*/

CREATE TABLE happiness_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  level integer NOT NULL CHECK (level >= 1 AND level <= 5),
  note text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE happiness_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own entries"
  ON happiness_entries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own entries"
  ON happiness_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_happiness_entries_user_id ON happiness_entries(user_id);
CREATE INDEX idx_happiness_entries_created_at ON happiness_entries(created_at);