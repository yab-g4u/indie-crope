-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'agent' CHECK (role IN ('agent', 'admin', 'researcher')),
  kebele TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create farms table
CREATE TABLE IF NOT EXISTS farms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  qr_code TEXT UNIQUE NOT NULL,
  farmer_name TEXT NOT NULL,
  kebele TEXT NOT NULL,
  plot_area DECIMAL NOT NULL,
  water_source TEXT NOT NULL,
  soil_class TEXT NOT NULL,
  lat DECIMAL NOT NULL,
  lng DECIMAL NOT NULL,
  ndvi_score DECIMAL,
  last_visit TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create verification_records table
CREATE TABLE IF NOT EXISTS verification_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES profiles(id),
  action_type TEXT NOT NULL CHECK (action_type IN ('planting', 'harvest', 'irrigation', 'pest_control')),
  image_url TEXT,
  ai_confidence DECIMAL,
  ai_label TEXT,
  verified BOOLEAN DEFAULT FALSE,
  blockchain_hash TEXT,
  geo_lat DECIMAL,
  geo_lng DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create crop_recommendations table
CREATE TABLE IF NOT EXISTS crop_recommendations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
  crop_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  expected_profit_min INTEGER NOT NULL,
  expected_profit_max INTEGER NOT NULL,
  water_per_kg DECIMAL NOT NULL,
  plant_before DATE NOT NULL,
  ai_confidence DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create calendar_tasks table
CREATE TABLE IF NOT EXISTS calendar_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
  crop_name TEXT NOT NULL,
  task_id TEXT NOT NULL,
  task TEXT NOT NULL,
  date_from DATE NOT NULL,
  date_to DATE NOT NULL,
  rationale TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE crop_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_tasks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Agents can view farms" ON farms FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('agent', 'admin'))
);

CREATE POLICY "Agents can create farms" ON farms FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('agent', 'admin'))
);

CREATE POLICY "Agents can view verification records" ON verification_records FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('agent', 'admin'))
);

CREATE POLICY "Agents can create verification records" ON verification_records FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('agent', 'admin'))
);

-- Insert sample data
INSERT INTO farms (qr_code, farmer_name, kebele, plot_area, water_source, soil_class, lat, lng, ndvi_score) VALUES
('F001', 'Alemayehu Tadesse', 'Debre Zeit', 2.5, 'borehole', 'clay_loam', 8.7500, 38.9800, 0.75),
('F002', 'Meseret Bekele', 'Bishoftu', 1.8, 'river', 'sandy_loam', 8.7520, 38.9820, 0.68),
('F003', 'Hailu Worku', 'Dukem', 3.2, 'rainwater', 'clay', 8.7480, 38.9780, 0.82),
('F004', 'Tigist Alemu', 'Sendafa', 2.1, 'borehole', 'loam', 9.0300, 39.0200, 0.71),
('F005', 'Kebede Mulatu', 'Holeta', 4.0, 'river', 'sandy_clay', 9.0500, 38.5000, 0.79);
