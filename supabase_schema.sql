-- ==============================================================================
-- KARTHIK NIMMANAGOTI PORTFOLIO & ADMIN DASHBOARD DATABASE SCHEMA
-- PostgreSQL / Supabase Schema with Row-Level Security (RLS)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. TABLES DEFINITIONS
-- ==============================================================================

-- Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    short_description TEXT NOT NULL,
    full_description TEXT,
    category TEXT DEFAULT 'Web & Digital',
    role TEXT,
    client TEXT,
    date TEXT,
    location TEXT,
    technologies JSONB DEFAULT '[]'::jsonb,
    project_url TEXT,
    github_url TEXT,
    cover_image TEXT,
    gallery JSONB DEFAULT '[]'::jsonb,
    case_study JSONB DEFAULT '{}'::jsonb,
    eyebrow TEXT,
    badge_secondary TEXT,
    result TEXT,
    action_label TEXT DEFAULT 'VIEW PROJECT →',
    secondary_action_label TEXT,
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Achievements Table
CREATE TABLE IF NOT EXISTS public.achievements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    result TEXT,
    issuer TEXT NOT NULL,
    category TEXT DEFAULT 'Awards & Recognition',
    description TEXT NOT NULL,
    quote TEXT,
    creator TEXT,
    date TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    images JSONB DEFAULT '[]'::jsonb,
    video TEXT,
    certificate TEXT,
    linkedin_url TEXT,
    winner_acknowledgement JSONB,
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Experiences Table
CREATE TABLE IF NOT EXISTS public.experiences (
    id TEXT PRIMARY KEY,
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    employment_type TEXT DEFAULT 'Full-time Leadership',
    duration TEXT NOT NULL,
    year TEXT,
    start_date TEXT,
    end_date TEXT,
    is_current BOOLEAN DEFAULT false,
    location TEXT,
    summary TEXT NOT NULL,
    full_description TEXT,
    responsibilities JSONB DEFAULT '[]'::jsonb,
    skills JSONB DEFAULT '[]'::jsonb,
    outcomes TEXT,
    highlight_tag TEXT,
    key_metric TEXT,
    category JSONB DEFAULT '["Leadership"]'::jsonb,
    icon TEXT DEFAULT 'briefcase',
    logo_text TEXT,
    logo_color TEXT,
    gallery JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Freelance Services Table (Excluding AI Automation)
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    category_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT DEFAULT 'sparkles',
    services JSONB DEFAULT '[]'::jsonb,
    tech_stack JSONB DEFAULT '[]'::jsonb,
    starting_price TEXT,
    delivery_time TEXT,
    skills JSONB DEFAULT '[]'::jsonb,
    color_class TEXT,
    icon_bg_class TEXT,
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    organization TEXT,
    testimonial TEXT NOT NULL,
    image TEXT,
    linkedin_url TEXT,
    featured BOOLEAN DEFAULT true,
    published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Certifications Table
CREATE TABLE IF NOT EXISTS public.certifications (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date TEXT,
    valid_until TEXT,
    credential_id TEXT,
    credential_url TEXT,
    certificate_image TEXT,
    description TEXT,
    skills JSONB DEFAULT '[]'::jsonb,
    verified BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Speaking Events & Collaborations Table
CREATE TABLE IF NOT EXISTS public.speaking_events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    topic TEXT,
    organization TEXT,
    tag TEXT,
    category TEXT,
    date TEXT,
    attendees TEXT,
    description TEXT NOT NULL,
    roles JSONB DEFAULT '[]'::jsonb,
    image TEXT,
    event_url TEXT,
    links JSONB DEFAULT '{}'::jsonb,
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Media Library Items Table
CREATE TABLE IF NOT EXISTS public.media_items (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'image', -- image, video, certificate, other
    format TEXT,
    size TEXT,
    folder TEXT DEFAULT 'general',
    thumbnail_url TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Contact Inquiries Table
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    project_type TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'New', -- New, Contacted, In Progress, Completed, Archived
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Existing Contact Leads Table (Preserved)
CREATE TABLE IF NOT EXISTS public.contact_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    purpose TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'New',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Existing Portfolio Photos Table (Preserved)
CREATE TABLE IF NOT EXISTS public.portfolio_photos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    location TEXT NOT NULL,
    shot_on TEXT NOT NULL,
    story TEXT NOT NULL,
    editing_style TEXT NOT NULL,
    aspect TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Site Settings Table (Key-Value)
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Social Links Table
CREATE TABLE IF NOT EXISTS public.social_links (
    id TEXT PRIMARY KEY,
    platform TEXT NOT NULL,
    label TEXT NOT NULL,
    url TEXT NOT NULL,
    icon TEXT NOT NULL,
    enabled BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Admin Profiles Table
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT DEFAULT 'Karthik Nimmanagoti',
    email TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    role TEXT DEFAULT 'Administrator',
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Activity Logs Table
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    description TEXT NOT NULL,
    admin_email TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.speaking_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- Public Read Policies (Only published content is readable by public)
-- ------------------------------------------------------------------------------
CREATE POLICY "Public can view published projects" ON public.projects
    FOR SELECT USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Public can view published achievements" ON public.achievements
    FOR SELECT USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Public can view published experiences" ON public.experiences
    FOR SELECT USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Public can view published services" ON public.services
    FOR SELECT USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Public can view published testimonials" ON public.testimonials
    FOR SELECT USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Public can view published certifications" ON public.certifications
    FOR SELECT USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Public can view published speaking_events" ON public.speaking_events
    FOR SELECT USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Public can view portfolio_photos" ON public.portfolio_photos
    FOR SELECT USING (true);

CREATE POLICY "Public can view site_settings" ON public.site_settings
    FOR SELECT USING (true);

CREATE POLICY "Public can view enabled social_links" ON public.social_links
    FOR SELECT USING (enabled = true OR auth.role() = 'authenticated');

CREATE POLICY "Public can view media_items" ON public.media_items
    FOR SELECT USING (true);

-- ------------------------------------------------------------------------------
-- Public Insert Policies (Contact forms)
-- ------------------------------------------------------------------------------
CREATE POLICY "Public can submit contact inquiries" ON public.contact_inquiries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can submit contact leads" ON public.contact_leads
    FOR INSERT WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- Authenticated (Admin) Full Access Policies
-- ------------------------------------------------------------------------------
CREATE POLICY "Admin full access projects" ON public.projects
    FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access achievements" ON public.achievements
    FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access experiences" ON public.experiences
    FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access services" ON public.services
    FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access testimonials" ON public.testimonials
    FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access certifications" ON public.certifications
    FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access speaking_events" ON public.speaking_events
    FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access media_items" ON public.media_items
    FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access contact_inquiries" ON public.contact_inquiries
    FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access contact_leads" ON public.contact_leads
    FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access portfolio_photos" ON public.portfolio_photos
    FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access site_settings" ON public.site_settings
    FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access social_links" ON public.social_links
    FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access admin_profiles" ON public.admin_profiles
    FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access activity_logs" ON public.activity_logs
    FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- ==============================================================================
-- 4. PERFORMANCE INDEXES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_projects_order ON public.projects(display_order, published);
CREATE INDEX IF NOT EXISTS idx_achievements_order ON public.achievements(display_order, published);
CREATE INDEX IF NOT EXISTS idx_experiences_order ON public.experiences(display_order, published);
CREATE INDEX IF NOT EXISTS idx_services_order ON public.services(display_order, published);
CREATE INDEX IF NOT EXISTS idx_certifications_order ON public.certifications(display_order, published);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.contact_inquiries(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created ON public.activity_logs(created_at DESC);
