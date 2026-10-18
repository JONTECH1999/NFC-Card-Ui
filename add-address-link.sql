-- Run this in Supabase SQL Editor:
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address_link text DEFAULT '';
