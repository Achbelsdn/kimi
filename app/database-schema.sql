-- ============================================
-- LA RÉSERVE - Database Schema
-- Supabase PostgreSQL Database
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- Restaurant Information Table
CREATE TABLE IF NOT EXISTS restaurant_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL DEFAULT 'La Réserve',
    description TEXT,
    address VARCHAR(500),
    phone VARCHAR(50),
    email VARCHAR(255),
    google_maps_url TEXT,
    opening_hours JSONB DEFAULT '{
        "monday": {"open": null, "close": null, "closed": true},
        "tuesday": {"open": "14:00", "close": "03:00", "closed": false},
        "wednesday": {"open": "14:00", "close": "03:00", "closed": false},
        "thursday": {"open": "14:00", "close": "03:00", "closed": false},
        "friday": {"open": "14:00", "close": "03:00", "closed": false},
        "saturday": {"open": "14:00", "close": "03:00", "closed": false},
        "sunday": {"open": "14:00", "close": "03:00", "closed": false}
    }'::JSONB,
    social_media JSONB DEFAULT '{
        "facebook": "",
        "instagram": "",
        "twitter": "",
        "whatsapp": ""
    }'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('starters', 'mains', 'desserts', 'drinks', 'wines')),
    image_url TEXT,
    video_url TEXT,
    is_available BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_name VARCHAR(255) NOT NULL,
    author_avatar TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    cuisine_rating INTEGER CHECK (cuisine_rating >= 1 AND cuisine_rating <= 5),
    service_rating INTEGER CHECK (service_rating >= 1 AND service_rating <= 5),
    ambiance_rating INTEGER CHECK (ambiance_rating >= 1 AND ambiance_rating <= 5),
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reservations Table
CREATE TABLE IF NOT EXISTS reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    number_of_guests INTEGER NOT NULL CHECK (number_of_guests > 0),
    special_requests TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    video_url TEXT,
    category VARCHAR(50) NOT NULL CHECK (category IN ('interior', 'food', 'events', 'ambiance')),
    is_featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Users Table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('admin', 'manager')),
    full_name VARCHAR(255),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_menu_items_is_available ON menu_items(is_available);
CREATE INDEX IF NOT EXISTS idx_reviews_is_approved ON reviews(is_approved);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(reservation_date);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_is_featured ON gallery(is_featured);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE restaurant_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Restaurant Info Policies
CREATE POLICY "Allow public read access to restaurant_info"
    ON restaurant_info FOR SELECT
    TO PUBLIC
    USING (true);

CREATE POLICY "Allow admin write access to restaurant_info"
    ON restaurant_info FOR ALL
    TO authenticated
    USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
    WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Menu Items Policies
CREATE POLICY "Allow public read access to menu_items"
    ON menu_items FOR SELECT
    TO PUBLIC
    USING (true);

CREATE POLICY "Allow admin full access to menu_items"
    ON menu_items FOR ALL
    TO authenticated
    USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
    WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Reviews Policies
CREATE POLICY "Allow public read approved reviews"
    ON reviews FOR SELECT
    TO PUBLIC
    USING (is_approved = true);

CREATE POLICY "Allow public to create reviews"
    ON reviews FOR INSERT
    TO PUBLIC
    WITH CHECK (true);

CREATE POLICY "Allow admin full access to reviews"
    ON reviews FOR ALL
    TO authenticated
    USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
    WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Reservations Policies
CREATE POLICY "Allow public to create reservations"
    ON reservations FOR INSERT
    TO PUBLIC
    WITH CHECK (true);

CREATE POLICY "Allow admin full access to reservations"
    ON reservations FOR ALL
    TO authenticated
    USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
    WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Gallery Policies
CREATE POLICY "Allow public read access to gallery"
    ON gallery FOR SELECT
    TO PUBLIC
    USING (true);

CREATE POLICY "Allow admin full access to gallery"
    ON gallery FOR ALL
    TO authenticated
    USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()))
    WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Admin Users Policies
CREATE POLICY "Allow admin to read admin_users"
    ON admin_users FOR SELECT
    TO authenticated
    USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- ============================================
-- TRIGGERS
-- ============================================

-- Update timestamps trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update triggers
CREATE TRIGGER update_restaurant_info_updated_at
    BEFORE UPDATE ON restaurant_info
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
    BEFORE UPDATE ON menu_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at
    BEFORE UPDATE ON reservations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- STORAGE BUCKETS
-- ============================================

-- Create storage buckets for media files
INSERT INTO storage.buckets (id, name, public) VALUES
    ('menu-images', 'menu-images', true),
    ('menu-videos', 'menu-videos', true),
    ('gallery-images', 'gallery-images', true),
    ('gallery-videos', 'gallery-videos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for menu-images
CREATE POLICY "Allow public read access to menu-images"
    ON storage.objects FOR SELECT
    TO PUBLIC
    USING (bucket_id = 'menu-images');

CREATE POLICY "Allow admin upload to menu-images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'menu-images' AND EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Allow admin delete from menu-images"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'menu-images' AND EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Storage policies for menu-videos
CREATE POLICY "Allow public read access to menu-videos"
    ON storage.objects FOR SELECT
    TO PUBLIC
    USING (bucket_id = 'menu-videos');

CREATE POLICY "Allow admin upload to menu-videos"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'menu-videos' AND EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Allow admin delete from menu-videos"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'menu-videos' AND EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Storage policies for gallery-images
CREATE POLICY "Allow public read access to gallery-images"
    ON storage.objects FOR SELECT
    TO PUBLIC
    USING (bucket_id = 'gallery-images');

CREATE POLICY "Allow admin upload to gallery-images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'gallery-images' AND EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Allow admin delete from gallery-images"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'gallery-images' AND EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Storage policies for gallery-videos
CREATE POLICY "Allow public read access to gallery-videos"
    ON storage.objects FOR SELECT
    TO PUBLIC
    USING (bucket_id = 'gallery-videos');

CREATE POLICY "Allow admin upload to gallery-videos"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'gallery-videos' AND EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Allow admin delete from gallery-videos"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'gallery-videos' AND EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- ============================================
-- SEED DATA
-- ============================================

-- Insert default restaurant info
INSERT INTO restaurant_info (id, name, description, address, phone, email, google_maps_url)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'La Réserve',
    'Une expérience culinaire africaine d\'exception dans un cadre élégant et raffiné.',
    '9C77+47F, Cotonou, Bénin',
    '91 11 71 71',
    'contact@lareserve.bj',
    'https://maps.app.goo.gl/hDddYVyKbs7ATkWW8'
)
ON CONFLICT (id) DO NOTHING;

-- Insert sample menu items
INSERT INTO menu_items (name, description, price, category, is_available, sort_order) VALUES
    ('Brochette de Gésiers', 'Brochette de gésiers marinés et grillés aux épices africaines', 4500, 'starters', true, 1),
    ('Sauté de Fromage Warangachi', 'Fromage local warangachi sauté aux fines herbes et épices', 5500, 'starters', true, 2),
    ('Viande Mouton Fris', 'Viande de mouton frite accompagnée de riz et sauce aux légumes frais', 8500, 'mains', true, 3),
    ('Poulet DG', 'Poulet frit servi avec des bananes plantains et légumes sautés', 9500, 'mains', true, 4),
    ('Dégue', 'Dessert traditionnel à base de couscous de mil et lait caillé', 3500, 'desserts', true, 5),
    ('Jus de Bissap', 'Jus frais de fleurs d\'hibiscus, rafraîchissant et vitaminé', 2000, 'drinks', true, 6),
    ('Vin Blanc - Château', 'Sélection de vin blanc sec, parfait avec les fruits de mer', 15000, 'wines', true, 7),
    ('Plessis-Duval Saumur', 'Vin rouge d\'exception, millésime 2022', 25000, 'wines', true, 8)
ON CONFLICT DO NOTHING;

-- Insert sample gallery items
INSERT INTO gallery (title, description, category, is_featured, sort_order) VALUES
    ('Ambiance Intérieure', 'Notre salle principale élégante et chaleureuse', 'interior', true, 1),
    ('Brochette de Gésiers', 'Notre spécialité maison', 'food', false, 2),
    ('Cave à Vin', 'Notre sélection de vins d\'exception', 'interior', true, 3),
    ('Viande Mouton Fris', 'Un plat traditionnel revisité', 'food', false, 4)
ON CONFLICT DO NOTHING;

-- Insert sample reviews
INSERT INTO reviews (author_name, rating, comment, is_approved, created_at) VALUES
    ('Ampah Johnson', 4, 'Satisfait à chaque passage! Lieu discret réservant de belles surprises au bar comme en cuisine! Top!', true, NOW() - INTERVAL '4 years'),
    ('Laura M', 4, 'Belle cave et service de qualité. J\'y retournerai avec plaisir!', true, NOW() - INTERVAL '2 years'),
    ('SOHOUDJI Cégnannou', 4, 'Calme et discret. Très bon lieu de détente', true, NOW() - INTERVAL '5 years'),
    ('Fresnel Houenaze', 5, 'cool', true, NOW() - INTERVAL '5 years')
ON CONFLICT DO NOTHING;

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to get menu items by category
CREATE OR REPLACE FUNCTION get_menu_items_by_category(p_category VARCHAR)
RETURNS TABLE (
    id UUID,
    name VARCHAR,
    description TEXT,
    price INTEGER,
    category VARCHAR,
    image_url TEXT,
    video_url TEXT,
    is_available BOOLEAN
) AS $$
BEGIN
    IF p_category IS NULL OR p_category = '' THEN
        RETURN QUERY SELECT * FROM menu_items WHERE is_available = true ORDER BY sort_order, created_at DESC;
    ELSE
        RETURN QUERY SELECT * FROM menu_items WHERE category = p_category AND is_available = true ORDER BY sort_order, created_at DESC;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to get featured gallery items
CREATE OR REPLACE FUNCTION get_featured_gallery()
RETURNS TABLE (
    id UUID,
    title VARCHAR,
    description TEXT,
    image_url TEXT,
    video_url TEXT,
    category VARCHAR,
    is_featured BOOLEAN
) AS $$
BEGIN
    RETURN QUERY SELECT * FROM gallery WHERE is_featured = true ORDER BY sort_order, created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to get pending reviews count
CREATE OR REPLACE FUNCTION get_pending_reviews_count()
RETURNS INTEGER AS $$
BEGIN
    RETURN (SELECT COUNT(*) FROM reviews WHERE is_approved = false);
END;
$$ LANGUAGE plpgsql;

-- Function to get today's reservations
CREATE OR REPLACE FUNCTION get_today_reservations()
RETURNS TABLE (
    id UUID,
    customer_name VARCHAR,
    customer_email VARCHAR,
    customer_phone VARCHAR,
    reservation_date DATE,
    reservation_time TIME,
    number_of_guests INTEGER,
    special_requests TEXT,
    status VARCHAR
) AS $$
BEGIN
    RETURN QUERY 
    SELECT * FROM reservations 
    WHERE reservation_date = CURRENT_DATE 
    ORDER BY reservation_time;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- VIEWS
-- ============================================

-- View for dashboard statistics
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT
    (SELECT COUNT(*) FROM reservations WHERE DATE_TRUNC('month', created_at) = DATE_TRUNC('month', NOW())) as reservations_this_month,
    (SELECT COUNT(*) FROM reviews WHERE is_approved = false) as pending_reviews,
    (SELECT COUNT(*) FROM menu_items WHERE is_available = true) as available_menu_items,
    (SELECT COUNT(*) FROM reservations WHERE status = 'pending') as pending_reservations;

-- ============================================
-- COMPLETION
-- ============================================

SELECT 'Database schema created successfully!' as status;
