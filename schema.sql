-- Chanly Database Schema
-- PostgreSQL Database Structure for WhatsApp Channels Platform

-- Users Table (RBAC System)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('owner', 'admin', 'assistant')),
    phone_number VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ar VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description_ar TEXT,
    description_en TEXT,
    icon VARCHAR(50),
    color VARCHAR(7), -- Hex color
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Channels Table
CREATE TABLE channels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    whatsapp_link VARCHAR(255) UNIQUE NOT NULL,
    invite_code VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    avatar_url VARCHAR(500),
    banner_url VARCHAR(500),
    category_id UUID REFERENCES categories(id),
    tags TEXT[], -- Array of tags
    member_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    last_checked TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    health_status VARCHAR(20) DEFAULT 'healthy' CHECK (health_status IN ('healthy', 'broken', 'checking')),
    admin_notes TEXT,
    created_by UUID REFERENCES users(id),
    claimed_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Channel Metadata (For WhatsApp Scraping)
CREATE TABLE channel_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
    raw_data JSONB,
    scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics Table
CREATE TABLE analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
    user_session VARCHAR(255), -- Anonymous session ID
    event_type VARCHAR(50) NOT NULL, -- 'view', 'click', 'share'
    ip_address INET,
    user_agent TEXT,
    referrer_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Channel Claims Table
CREATE TABLE channel_claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
    claimant_id UUID REFERENCES users(id),
    verification_code VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected', 'expired')),
    expires_at TIMESTAMP NOT NULL,
    verified_at TIMESTAMP,
    admin_reviewed_by UUID REFERENCES users(id),
    admin_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Logs Table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50), -- 'channel', 'user', 'category'
    resource_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Sessions (For Analytics)
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(255) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id),
    ip_address INET,
    user_agent TEXT,
    first_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    page_views INTEGER DEFAULT 0
);

-- Newsletter Subscribers
CREATE TABLE newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    preferences JSONB, -- Categories of interest
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP
);

-- Contact Messages
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
    replied_by UUID REFERENCES users(id),
    replied_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for Performance
CREATE INDEX idx_channels_category ON channels(category_id);
CREATE INDEX idx_channels_is_active ON channels(is_active);
CREATE INDEX idx_channels_health_status ON channels(health_status);
CREATE INDEX idx_channels_created_at ON channels(created_at DESC);
CREATE INDEX idx_analytics_channel ON analytics(channel_id);
CREATE INDEX idx_analytics_session ON analytics(user_session);
CREATE INDEX idx_analytics_created_at ON analytics(created_at);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_channel_claims_channel ON channel_claims(channel_id);
CREATE INDEX idx_channel_claims_status ON channel_claims(status);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- Insert Default Categories
INSERT INTO categories (name_ar, name_en, slug, description_ar, description_en, icon, color) VALUES
('وظائف', 'Jobs', 'jobs', 'قنوات الوظائف والتوظيف', 'Job and recruitment channels', 'briefcase', '#10B981'),
('عملات رقمية', 'Cryptocurrency', 'cryptocurrency', 'قنوات العملات الرقمية والتداول', 'Cryptocurrency and trading channels', 'bitcoin', '#F59E0B'),
('رياضة', 'Sports', 'sports', 'قنوات الرياضة والأخبار الرياضية', 'Sports and sports news channels', 'trophy', '#EF4444'),
('تعليم', 'Education', 'education', 'قنوات تعليمية ودورات', 'Educational channels and courses', 'graduation-cap', '#3B82F6'),
('تقنية', 'Technology', 'technology', 'قنوات التقنية والبرمجة', 'Technology and programming channels', 'laptop', '#8B5CF6'),
('صحة', 'Health', 'health', 'قنوات الصحة والطب', 'Health and medical channels', 'heart', '#EC4899'),
('أعمال', 'Business', 'business', 'قنوات ريادة الأعمال والتجارة', 'Entrepreneurship and business channels', 'chart-line', '#6366F1'),
('فنون', 'Arts', 'arts', 'قنوات الفنون والإبداع', 'Arts and creative channels', 'palette', '#F97316'),
('سفر', 'Travel', 'travel', 'قنوات السفر والسياحة', 'Travel and tourism channels', 'plane', '#06B6D4'),
('موسيقى', 'Music', 'music', 'قنوات الموسيقى والصوتيات', 'Music and audio channels', 'music', '#84CC16');

-- Insert Default Owner User (Password: Admin123!)
INSERT INTO users (email, password_hash, full_name, role) VALUES
('admin@chanly.com', '$2b$10$rOvFTJg6/8SH5K4K5JJmDu3.xW8nMQ1sfOllp86xTYwZ7YHyWLOmWm', 'System Administrator', 'owner');

-- Create Updated At Trigger Function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply Updated At Trigger to Tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_channels_updated_at BEFORE UPDATE ON channels
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();