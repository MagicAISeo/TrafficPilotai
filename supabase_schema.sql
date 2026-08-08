-- ========================================================
-- TrafficPilot AI - Supabase Database Schema
-- Project ID: skvgazailxpzbrsfzqqz
-- Copy & Run this code in your Supabase SQL Editor
-- ========================================================

-- 1. Create Campaigns Table
CREATE TABLE IF NOT EXISTS public.campaigns (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  website_url TEXT NOT NULL,
  type TEXT DEFAULT 'website_qa',
  status TEXT DEFAULT 'draft',
  sessions_completed BIGINT DEFAULT 0,
  total_sessions_target BIGINT DEFAULT 1000,
  duration_minutes INT DEFAULT 60,
  concurrency_limit INT DEFAULT 10,
  target_pages TEXT[] DEFAULT ARRAY[]::TEXT[],
  geo_locations TEXT[] DEFAULT ARRAY['US']::TEXT[],
  device_profile JSONB DEFAULT '{"desktopPercent": 70, "mobilePercent": 30, "tabletPercent": 0}'::jsonb,
  browser_profile JSONB DEFAULT '{"chromePercent": 70, "firefoxPercent": 15, "safariPercent": 10, "edgePercent": 5}'::jsonb,
  session_behavior JSONB DEFAULT '{}'::jsonb,
  utm_params JSONB DEFAULT '{"utm_source": "trafficpilot_ai", "utm_medium": "cpc", "utm_campaign": "promo"}'::jsonb,
  avg_response_time_ms INT DEFAULT 195,
  error_rate_percent NUMERIC(5,2) DEFAULT 0.00,
  bounce_rate_percent NUMERIC(5,2) DEFAULT 20.00,
  avg_session_duration_sec INT DEFAULT 120,
  notes TEXT DEFAULT '',
  is_simulated BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Website Monitors Table
CREATE TABLE IF NOT EXISTS public.website_monitors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  check_interval_minutes INT DEFAULT 5,
  status TEXT DEFAULT 'up',
  response_time_ms INT DEFAULT 185,
  http_status INT DEFAULT 200,
  last_checked_at TEXT DEFAULT 'Just now',
  ssl_status TEXT DEFAULT 'valid',
  ssl_expires_days INT DEFAULT 120,
  uptime_percent_24h NUMERIC(5,2) DEFAULT 100.00,
  history JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Referral Links Table
CREATE TABLE IF NOT EXISTS public.referral_links (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  target_url TEXT NOT NULL,
  clicks_count BIGINT DEFAULT 0,
  unique_sessions_count BIGINT DEFAULT 0,
  utm_params JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Live Logs Table
CREATE TABLE IF NOT EXISTS public.live_logs (
  id TEXT PRIMARY KEY,
  timestamp TEXT NOT NULL,
  level TEXT DEFAULT 'INFO',
  message TEXT NOT NULL,
  campaign_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- Enable Row Level Security (RLS) & Public Access Policies
-- ========================================================

ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_monitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_logs ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read & write for public app usage
CREATE POLICY "Public full access on campaigns" ON public.campaigns FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access on website_monitors" ON public.website_monitors FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access on referral_links" ON public.referral_links FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access on live_logs" ON public.live_logs FOR ALL USING (true) WITH CHECK (true);
