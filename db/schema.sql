CREATE TABLE IF NOT EXISTS registrations (
  id SERIAL PRIMARY KEY,
  reg_type TEXT NOT NULL CHECK (reg_type IN ('foundation_school', 'department')),
  department TEXT,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  area TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS giving_records (
  id SERIAL PRIMARY KEY,
  giver_name TEXT NOT NULL,
  phone TEXT,
  fund_type TEXT NOT NULL CHECK (fund_type IN ('tithe', 'offering', 'partnership', 'building_fund', 'other')),
  amount_ugx NUMERIC,
  momo_reference TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('gospel_mission', 'hospital_visit', 'outreach', 'special_event', 'other')),
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  event_date DATE NOT NULL,
  event_time TEXT,
  image_filename TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS page_views (
  id SERIAL PRIMARY KEY,
  path TEXT NOT NULL,
  session_id TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
