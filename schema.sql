-- Create tables for Ayurvedic E-commerce Application

-- Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  compare_at_price DECIMAL(10, 2),
  image_url TEXT,
  category_id UUID REFERENCES categories(id),
  is_featured BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  popularity INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_info JSONB NOT NULL,
  items JSONB NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  payment_id VARCHAR(255),
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Messages Table
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter Subscribers Table
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sample Data: Categories
INSERT INTO categories (name, slug, description) VALUES
('Herbs & Supplements', 'herbs', 'Traditional herbs and supplements for daily wellness'),
('Essential Oils', 'oils', 'Pure essential oils for aromatherapy and healing'),
('Skincare', 'skincare', 'Natural skincare products for radiant skin'),
('Wellness Products', 'wellness', 'Products for overall health and wellbeing');

-- Sample Data: Products
INSERT INTO products (name, slug, description, price, category_id, is_featured) VALUES
('Ashwagandha Root Powder', 'ashwagandha-root-powder', 'Organic Ashwagandha root powder for stress relief and immune support.', 499, (SELECT id FROM categories WHERE slug = 'herbs'), true),
('Turmeric Curcumin Capsules', 'turmeric-curcumin-capsules', 'High-potency turmeric capsules with enhanced absorption for joint health.', 599, (SELECT id FROM categories WHERE slug = 'herbs'), true),
('Lavender Essential Oil', 'lavender-essential-oil', 'Pure lavender essential oil for relaxation and better sleep.', 799, (SELECT id FROM categories WHERE slug = 'oils'), true),
('Neem Face Wash', 'neem-face-wash', 'Gentle neem face wash for clear and healthy skin.', 349, (SELECT id FROM categories WHERE slug = 'skincare'), true),
('Aloe Vera Gel', 'aloe-vera-gel', '100% pure aloe vera gel for skin soothing and hydration.', 299, (SELECT id FROM categories WHERE slug = 'skincare'), false),
('Brahmi Hair Oil', 'brahmi-hair-oil', 'Traditional Brahmi oil for hair growth and scalp health.', 449, (SELECT id FROM categories WHERE slug = 'oils'), false),
('Triphala Powder', 'triphala-powder', 'Organic Triphala powder for digestive health and detoxification.', 399, (SELECT id FROM categories WHERE slug = 'herbs'), false),
('Copper Water Bottle', 'copper-water-bottle', 'Authentic copper water bottle for ayurvedic health benefits.', 899, (SELECT id FROM categories WHERE slug = 'wellness'), false);
