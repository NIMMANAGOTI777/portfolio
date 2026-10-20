-- ==============================================================================
-- KARTHIK NIMMANAGOTI PORTFOLIO & ADMIN DASHBOARD DATABASE SCHEMA
-- PostgreSQL / Supabase Schema with Row-Level Security (RLS) & Role Authorization
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. TABLES DEFINITIONS
-- ==============================================================================

-- Admin Profiles Table (Role-based access control)
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT DEFAULT 'Karthik Nimmanagoti',
    email TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    role TEXT DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'viewer')),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

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
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    detailed_description TEXT,
    icon TEXT DEFAULT 'sparkles',
    icon_bg_class TEXT DEFAULT 'bg-indigo-500/10 text-indigo-400',
    services JSONB DEFAULT '[]'::jsonb,
    skills JSONB DEFAULT '[]'::jsonb,
    tech_stack JSONB DEFAULT '[]'::jsonb,
    starting_price TEXT,
    delivery_time TEXT,
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
    company TEXT,
    testimonial TEXT NOT NULL,
    quote TEXT,
    avatar_url TEXT,
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
    issue_date TEXT NOT NULL,
    date TEXT,
    credential_id TEXT,
    credential_url TEXT,
    certificate_image TEXT,
    certificate_pdf TEXT,
    description TEXT,
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Speaking & Events Table
CREATE TABLE IF NOT EXISTS public.speaking_events (
    id TEXT PRIMARY KEY,
    event_name TEXT NOT NULL,
    title TEXT,
    topic TEXT,
    organization TEXT,
    date TEXT NOT NULL,
    location TEXT,
    description TEXT NOT NULL,
    image_url TEXT,
    recording_url TEXT,
    category TEXT DEFAULT 'Keynote',
    audience_size TEXT,
    key_topics JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Media Items Library Table
CREATE TABLE IF NOT EXISTS public.media_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('image', 'video', 'certificate', 'document', 'other')),
    category TEXT DEFAULT 'general',
    size_bytes BIGINT,
    dimensions TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Photography gallery items
CREATE TABLE IF NOT EXISTS public.portfolio_photos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Streets',
    image TEXT NOT NULL,
    location TEXT,
    shot_on TEXT,
    story TEXT NOT NULL,
    editing_style TEXT,
    aspect TEXT DEFAULT 'aspect-[3/4]',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Contact Inquiries Table (Private Admin Only)
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    project_type TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'In Progress', 'Completed', 'Archived')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Contact Leads Table (Private Admin Only)
CREATE TABLE IF NOT EXISTS public.contact_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    company VARCHAR(100),
    purpose VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Social Links Table
CREATE TABLE IF NOT EXISTS public.social_links (
    id TEXT PRIMARY KEY,
    platform TEXT NOT NULL,
    url TEXT NOT NULL,
    username TEXT,
    enabled BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
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
-- 3. HELPER FUNCTIONS FOR AUTHORIZATION
-- ==============================================================================

-- Check if authenticated user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.admin_profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
$$;

-- Auto create profile on auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.admin_profiles (id, email, full_name, role)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', 'Karthik Nimmanagoti'), 'viewer')
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$;

-- Trigger to create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
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
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_photos ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- Public Read Policies (Only published content is readable by public)
-- ------------------------------------------------------------------------------
CREATE POLICY "Public can view published projects" ON public.projects
    FOR SELECT USING (published = true OR public.is_admin());

CREATE POLICY "Public can view published achievements" ON public.achievements
    FOR SELECT USING (published = true OR public.is_admin());

CREATE POLICY "Public can view published experiences" ON public.experiences
    FOR SELECT USING (published = true OR public.is_admin());

CREATE POLICY "Public can view published services" ON public.services
    FOR SELECT USING (published = true OR public.is_admin());

CREATE POLICY "Public can view published testimonials" ON public.testimonials
    FOR SELECT USING (published = true OR public.is_admin());

CREATE POLICY "Public can view published certifications" ON public.certifications
    FOR SELECT USING (published = true OR public.is_admin());

CREATE POLICY "Public can view published speaking_events" ON public.speaking_events
    FOR SELECT USING (published = true OR public.is_admin());

CREATE POLICY "Public can view site_settings" ON public.site_settings
    FOR SELECT USING (true);

CREATE POLICY "Public can view enabled social_links" ON public.social_links
    FOR SELECT USING (enabled = true OR public.is_admin());

CREATE POLICY "Public can view media_items" ON public.media_items
    FOR SELECT USING (true);

CREATE POLICY "Public can view portfolio photos" ON public.portfolio_photos
    FOR SELECT USING (true);

-- ------------------------------------------------------------------------------
-- Public Insert Policies (Contact forms only - with strict column validation)
-- ------------------------------------------------------------------------------
CREATE POLICY "Public can submit contact inquiries" ON public.contact_inquiries
    FOR INSERT WITH CHECK (
        length(full_name) > 0 AND length(full_name) <= 100 AND
        length(email) > 0 AND length(email) <= 255 AND
        length(message) > 0 AND length(message) <= 5000
    );

CREATE POLICY "Public can submit contact leads" ON public.contact_leads
    FOR INSERT WITH CHECK (
        length(full_name) > 0 AND length(full_name) <= 100 AND
        length(email) > 0 AND length(email) <= 255 AND
        length(message) > 0 AND length(message) <= 5000
    );

-- ------------------------------------------------------------------------------
-- Admin Authorized Access Policies (Full write/read access for verified admins)
-- ------------------------------------------------------------------------------
CREATE POLICY "Admin full access projects" ON public.projects
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Admin full access achievements" ON public.achievements
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Admin full access experiences" ON public.experiences
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Admin full access services" ON public.services
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Admin full access testimonials" ON public.testimonials
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Admin full access certifications" ON public.certifications
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Admin full access speaking_events" ON public.speaking_events
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Admin full access media_items" ON public.media_items
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Admin full access contact_inquiries" ON public.contact_inquiries
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Admin full access contact_leads" ON public.contact_leads
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Admin full access site_settings" ON public.site_settings
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Admin full access social_links" ON public.social_links
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Admin full access admin_profiles" ON public.admin_profiles
    FOR ALL USING (auth.uid() = id OR public.is_admin()) WITH CHECK (auth.uid() = id OR public.is_admin());

CREATE POLICY "Admin full access activity_logs" ON public.activity_logs
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Admin full access portfolio_photos" ON public.portfolio_photos
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ==============================================================================
-- 5. PERFORMANCE & SECURITY INDEXES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_projects_order ON public.projects(display_order, published);
CREATE INDEX IF NOT EXISTS idx_achievements_order ON public.achievements(display_order, published);
CREATE INDEX IF NOT EXISTS idx_experiences_order ON public.experiences(display_order, published);
CREATE INDEX IF NOT EXISTS idx_services_order ON public.services(display_order, published);
CREATE INDEX IF NOT EXISTS idx_certifications_order ON public.certifications(display_order, published);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.contact_inquiries(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created ON public.activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_profiles_role ON public.admin_profiles(id, role);
CREATE INDEX IF NOT EXISTS idx_portfolio_photos_created ON public.portfolio_photos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_portfolio_photos_category ON public.portfolio_photos(category);
