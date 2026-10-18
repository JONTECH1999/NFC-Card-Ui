-- Migration: Add custom_links JSON column to profiles table
-- Enables users to configure custom social media / media buttons (TikTok, secondary FB page, Instagram, WhatsApp, etc.)

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS custom_links jsonb DEFAULT '[]'::jsonb;

COMMENT ON COLUMN profiles.custom_links IS 'Array of custom action/social links: [{ id, label, url, icon }]';
