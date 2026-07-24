-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- This creates all the tables needed for the CMS

-- 1. Restaurant Settings (single row)
CREATE TABLE IF NOT EXISTS restaurant_settings (
  id BIGINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  address TEXT DEFAULT '26 Avenue Roi Baudouin, Gombe, Kinshasa',
  phone TEXT DEFAULT '+243 819 976 959',
  email TEXT DEFAULT 'restogabygabriel@gmail.com',
  hours_fr TEXT DEFAULT 'Lun-Sam : 12h à 23h',
  hours_en TEXT DEFAULT 'Mon-Sat: 12PM to 11PM',
  hours_pt TEXT DEFAULT 'Seg-Sáb: 12h às 23h',
  sunday_fr TEXT DEFAULT 'Dimanche fermé',
  sunday_en TEXT DEFAULT 'Closed on Sundays',
  sunday_pt TEXT DEFAULT 'Fechado aos domingos',
  facebook_url TEXT DEFAULT 'https://www.facebook.com/chezgabykinshasa/',
  instagram_url TEXT DEFAULT 'https://www.instagram.com/restochezgabykinshasa/',
  hero_subtitle_fr TEXT DEFAULT 'Restaurant de Luxe',
  hero_subtitle_en TEXT DEFAULT 'Luxury Restaurant',
  hero_subtitle_pt TEXT DEFAULT 'Restaurante de Luxo',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default row
INSERT INTO restaurant_settings (id)
VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- 2. Menu Categories
CREATE TABLE IF NOT EXISTS menu_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order INTEGER DEFAULT 0,
  name_fr TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_pt TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Menu Items
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES menu_categories(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  name TEXT NOT NULL,
  description_fr TEXT,
  description_en TEXT,
  description_pt TEXT,
  price TEXT,
  image TEXT,
  chef_pick BOOLEAN DEFAULT FALSE,
  wine_pairing TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Hero Slideshow Images
CREATE TABLE IF NOT EXISTS hero_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Gallery Images
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  caption_fr TEXT,
  caption_en TEXT,
  caption_pt TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE restaurant_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Public read access" ON restaurant_settings FOR SELECT USING (true);
CREATE POLICY "Public read access" ON menu_categories FOR SELECT USING (true);
CREATE POLICY "Public read access" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Public read access" ON hero_images FOR SELECT USING (true);
CREATE POLICY "Public read access" ON gallery_images FOR SELECT USING (true);

-- Admin write access (authenticated users)
CREATE POLICY "Admin write access" ON restaurant_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write access" ON menu_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write access" ON menu_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write access" ON hero_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write access" ON gallery_images FOR ALL USING (auth.role() = 'authenticated');