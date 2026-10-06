import { createClient } from '@supabase/supabase-js';
import { 
  ACHIEVEMENTS as DEFAULT_ACHIEVEMENTS, 
  PROJECTS as DEFAULT_PROJECTS, 
  WORK_WITH_ME_SERVICES as DEFAULT_SERVICES, 
  CERTIFICATIONS as DEFAULT_CERTIFICATIONS, 
  TESTIMONIAL as DEFAULT_TESTIMONIAL, 
  COLLABORATIONS as DEFAULT_COLLABORATIONS,
  STATS as DEFAULT_STATS
} from './portfolioData';
import { GALLERY_ITEMS } from './photographyData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isMock = !supabaseUrl || !supabaseAnonKey;

let supabaseInstance;

if (isMock) {
  if (import.meta.env.DEV) {
    console.log(
      'Supabase credentials not found. Using local mock storage for admin dashboard.'
    );
  }

  // Helper to load or initialize table from localStorage
  const getTableData = (key, defaultInitFn) => {
    try {
      const data = localStorage.getItem(`sb_mock_${key}`);
      if (data) return JSON.parse(data);
      const initial = defaultInitFn ? defaultInitFn() : [];
      localStorage.setItem(`sb_mock_${key}`, JSON.stringify(initial));
      return initial;
    } catch (e) {
      console.error(`Error loading mock data for ${key}:`, e);
      return [];
    }
  };

  const setTableData = (key, data) => {
    try {
      localStorage.setItem(`sb_mock_${key}`, JSON.stringify(data));
    } catch (e) {
      console.error(`Error saving mock data for ${key}:`, e);
    }
  };

  // Initial Achievements with Exact Order Required
  const getInitialAchievements = () => {
    // 1. Annadata, 2. Bappa Reel, 3. Leadership, 4. Best Student, 5. Festive Reel Contest
    const priorityMap = {
      'annadata-policy-2047': 1,
      'bappa-through-your-lens': 2,
      'outstanding-leadership': 3,
      'best-student': 4,
      'reel-contest': 5
    };

    return DEFAULT_ACHIEVEMENTS.map((item) => ({
      id: item.id,
      title: item.title,
      result: item.result || '',
      issuer: item.issuer || '',
      category: 'Awards & Recognition',
      description: item.description || '',
      quote: item.quote || '',
      creator: item.creator || '',
      date: item.date || '2026',
      tags: item.tags || [],
      images: item.images || [],
      video: item.video || '',
      certificate: item.certificate || '',
      linkedin_url: item.linkedin_url || '',
      winner_acknowledgement: item.winnerAcknowledgement || null,
      featured: true,
      published: true,
      display_order: priorityMap[item.id] || 99,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })).sort((a, b) => a.display_order - b.display_order);
  };

  // Initial Projects
  const getInitialProjects = () => {
    return DEFAULT_PROJECTS.map((proj, idx) => ({
      id: proj.id || `proj-${idx + 1}`,
      title: proj.title,
      subtitle: proj.sub || '',
      short_description: proj.desc || '',
      full_description: proj.desc || '',
      category: proj.tag || 'Web & Digital',
      role: proj.sub ? proj.sub.split('|')[0]?.trim() : 'Creator',
      client: proj.tag || 'Client / Community',
      date: proj.caseStudy?.date || '2026',
      location: proj.caseStudy?.metadata?.find(m => m.label === 'Location')?.value || 'Hyderabad / Vijayawada',
      technologies: proj.tech || proj.tags || [],
      project_url: proj.link || '',
      github_url: '',
      cover_image: proj.image || '',
      gallery: proj.caseStudy?.gallery || [],
      case_study: proj.caseStudy || null,
      eyebrow: proj.eyebrow || '',
      badge_secondary: proj.badgeSecondary || '',
      result: proj.result || '',
      action_label: proj.actionLabel || 'VIEW CASE STUDY →',
      secondary_action_label: proj.secondaryActionLabel || '',
      featured: !!proj.featured,
      published: true,
      display_order: idx + 1,
      seo_title: `${proj.title} | Karthik Nimmanagoti`,
      seo_description: proj.desc || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));
  };

  // Initial Experiences
  const getInitialExperiences = () => {
    return [
      {
        id: 'exp-innfill-head',
        company: 'Innfill',
        role: 'Head of Community',
        employment_type: 'Full-time Leadership',
        duration: 'July 2026 – Present',
        year: '2026',
        is_current: true,
        location: 'Hyderabad, India (Hybrid)',
        summary: 'Leading nationwide community expansion, campus ambassador networks, creator summits, and strategic partnerships.',
        full_description: 'Leading nationwide community expansion, campus ambassador networks, creator summits, and strategic partnerships.',
        responsibilities: [
          'Leading community growth, brand engagement, and campus chapter scaling initiatives across universities',
          'Designing and executing high-impact workshops, creator networking sessions, and student community programs',
          'Building and managing strategic relationships with student creators, campus ambassadors, and industry partners',
          'Collaborating closely with product, marketing, and operations teams to align launch roadmaps'
        ],
        skills: ['Community Growth', 'Leadership', 'Campus Partnerships', 'Strategy', 'Brand Operations'],
        outcomes: 'Established standard community governance guidelines and scaled nationwide student outreach to double active ambassador engagement.',
        highlight_tag: 'Community Growth & Leadership',
        key_metric: 'Active / Scaling',
        category: ['Community', 'Leadership', 'Marketing', 'Events'],
        icon: 'users',
        logo_text: 'IF',
        logo_color: 'from-indigo-600 via-indigo-500 to-purple-600',
        gallery: [],
        featured: true,
        published: true,
        display_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'exp-paniit-designer',
        company: 'PanIIT Andhra Pradesh Summit 2026',
        role: 'Impact Designer | Student Organizer',
        employment_type: 'State Summit Project',
        duration: 'October 2026',
        year: '2026',
        is_current: false,
        location: 'Vijayawada, Andhra Pradesh',
        summary: 'Designed on-ground physical signages, pavilion branding, and visual communication assets for a state-level summit.',
        full_description: 'Designed on-ground physical signages, pavilion branding, and visual communication assets for a state-level summit.',
        responsibilities: [
          'Designed physical signages and pavilion branding across Dr. B. R. Ambedkar Kala Vedika',
          'Coordinated visual communication materials for state dignitaries and student delegates',
          'Translated digital Figma designs into printed large-format venue installations'
        ],
        skills: ['Event Design', 'Visual Communication', 'Figma', 'Signage', 'Pavilion Branding'],
        outcomes: 'Delivered complete on-ground visual branding implemented across the official state summit platform.',
        highlight_tag: 'Government & State Event',
        key_metric: 'State Platform',
        category: ['Design', 'Events', 'Visual Branding'],
        icon: 'award',
        logo_text: 'PI',
        logo_color: 'from-amber-500 via-rose-500 to-indigo-600',
        gallery: [],
        featured: true,
        published: true,
        display_order: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'exp-niat-president',
        company: 'Influencers Club NIAT',
        role: 'President',
        employment_type: 'Student Leadership',
        duration: '2024 – 2026',
        year: '2024-2026',
        is_current: false,
        location: 'Hyderabad, India',
        summary: 'Directed student creator community initiatives, content production, guest masterclasses, and college media coverage.',
        full_description: 'Directed student creator community initiatives, content production, guest masterclasses, and college media coverage.',
        responsibilities: [
          'Led a dedicated team of 30+ student creators, designers, and video editors',
          'Organized masterclasses with high-profile industry creators including Ishan Sharma and Madhu Kiran',
          'Received Outstanding Leadership Award for tenure excellence'
        ],
        skills: ['Student Leadership', 'Event Operations', 'Team Management', 'Public Speaking'],
        outcomes: 'Scaled club reach to 2,000+ students and executed 10+ campus events.',
        highlight_tag: 'Presidential Tenure',
        key_metric: '2,000+ Students',
        category: ['Leadership', 'Community', 'Media'],
        icon: 'award',
        logo_text: 'NI',
        logo_color: 'from-purple-600 via-indigo-500 to-blue-500',
        gallery: [],
        featured: true,
        published: true,
        display_order: 3,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  };

  // Initial Freelance Services (Strictly NO AI Automation)
  const getInitialServices = () => {
    return DEFAULT_SERVICES.map((s, idx) => ({
      id: s.id,
      category_id: s.categoryId,
      title: s.title,
      description: s.description,
      icon: s.icon,
      services: s.services || [],
      tech_stack: s.techStack || [],
      starting_price: 'Custom Quote',
      delivery_time: '3–7 days',
      skills: s.services || [],
      color_class: s.colorClass || 'hover:border-indigo-500/50',
      icon_bg_class: s.iconBgClass || 'bg-indigo-100 text-indigo-600',
      featured: true,
      published: true,
      display_order: idx + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));
  };

  // Initial Testimonials
  const getInitialTestimonials = () => {
    return [
      {
        id: 'test-sudheer',
        name: DEFAULT_TESTIMONIAL.name,
        role: DEFAULT_TESTIMONIAL.role,
        organization: 'NIAT / NxtWave',
        testimonial: DEFAULT_TESTIMONIAL.quote,
        image: DEFAULT_TESTIMONIAL.img,
        linkedin_url: DEFAULT_TESTIMONIAL.linkedin,
        featured: true,
        published: true,
        display_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  };

  // Initial Certifications
  const getInitialCertifications = () => {
    return DEFAULT_CERTIFICATIONS.map((cert, idx) => ({
      id: `cert-${idx + 1}`,
      title: cert.title,
      issuer: cert.issuer,
      issue_date: cert.date,
      valid_until: cert.validUntil || '',
      credential_id: cert.code || '',
      credential_url: cert.link || '',
      certificate_image: cert.img,
      description: cert.desc,
      skills: cert.skills || [],
      verified: !!cert.verified,
      featured: idx < 3,
      published: true,
      display_order: idx + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));
  };

  // Initial Speaking Events / Collaborations
  const getInitialSpeakingEvents = () => {
    return DEFAULT_COLLABORATIONS.map((collab, idx) => ({
      id: collab.id,
      title: collab.title,
      topic: collab.tag || 'Keynote Session',
      organization: collab.category || 'Creator Community',
      tag: collab.tag,
      category: collab.category,
      date: collab.date,
      attendees: collab.attendees,
      description: collab.desc,
      roles: collab.roles || [],
      image: collab.img,
      event_url: collab.links?.linkedin || collab.links?.instagram || collab.links?.youtube || '',
      links: collab.links || {},
      featured: true,
      published: true,
      display_order: idx + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));
  };

  // Initial Media Library Items
  const getInitialMedia = () => {
    return [
      {
        id: 'media-1',
        title: 'PanIIT Summit Cover 1',
        url: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1791260290/WhatsApp_Image_2026-10-06_at_9.46.08_AM_pyg8pk.jpg',
        type: 'image',
        format: 'jpg',
        size: '1.2 MB',
        folder: 'projects',
        created_at: new Date().toISOString()
      },
      {
        id: 'media-2',
        title: 'PanIIT Stage Branding',
        url: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1791260288/WhatsApp_Image_2026-10-06_at_9.46.08_AM_2_gnw8o9.jpg',
        type: 'image',
        format: 'jpg',
        size: '980 KB',
        folder: 'projects',
        created_at: new Date().toISOString()
      },
      {
        id: 'media-3',
        title: 'Leadership Award Ceremony',
        url: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1778312568/Screenshot_2026-05-09_131109_h0satx.png',
        type: 'image',
        format: 'png',
        size: '850 KB',
        folder: 'achievements',
        created_at: new Date().toISOString()
      },
      {
        id: 'media-4',
        title: 'HubSpot Social Media Certification',
        url: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1787172644/d600498e876f4d439b1d0c5796700c6c_jpseg4.png',
        type: 'certificate',
        format: 'png',
        size: '620 KB',
        folder: 'certificates',
        created_at: new Date().toISOString()
      },
      {
        id: 'media-5',
        title: 'NIAT Takeover 2026 Summit',
        url: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1784811619/WhatsApp_Image_2026-07-16_at_6.49.39_PM_mozq5a.jpg',
        type: 'image',
        format: 'jpg',
        size: '1.1 MB',
        folder: 'events',
        created_at: new Date().toISOString()
      }
    ];
  };

  // Initial Contact Inquiries
  const getInitialInquiries = () => {
    return [
      {
        id: 'inq-1',
        full_name: 'Rahul Varma',
        email: 'rahul.varma@startupx.in',
        phone: '+91 98765 43210',
        project_type: 'Web Development',
        message: 'Looking for a modern Next.js + Tailwind web application and design system for our fintech platform launch.',
        status: 'New',
        notes: 'Requested a discovery call for next week.',
        created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
        updated_at: new Date(Date.now() - 3600000 * 4).toISOString()
      },
      {
        id: 'inq-2',
        full_name: 'Ananya Sharma',
        email: 'ananya@creatorshub.io',
        phone: '+91 99887 76655',
        project_type: 'Event Management',
        message: 'We are hosting a 500-attendee creator summit in Hyderabad and need help managing stage operations and student outreach.',
        status: 'Contacted',
        notes: 'Sent event pricing and portfolio deck.',
        created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
        updated_at: new Date(Date.now() - 86400000 * 1).toISOString()
      }
    ];
  };

  // Initial Social Links
  const getInitialSocialLinks = () => {
    return [
      { id: 'soc-instagram', platform: 'Instagram', label: 'Instagram', url: 'https://www.instagram.com/nimmanagoti.karthik', icon: 'instagram', enabled: true, display_order: 1 },
      { id: 'soc-linkedin', platform: 'LinkedIn', label: 'LinkedIn', url: 'https://www.linkedin.com/in/karthik-nimmanagoti-52a403324', icon: 'linkedin', enabled: true, display_order: 2 },
      { id: 'soc-github', platform: 'GitHub', label: 'GitHub', url: 'https://github.com/NIMMANAGOTI777', icon: 'github', enabled: true, display_order: 3 },
      { id: 'soc-twitter', platform: 'Twitter / X', label: 'X (Twitter)', url: 'https://x.com/karthikkampu07', icon: 'twitter', enabled: true, display_order: 4 },
      { id: 'soc-portfolio', platform: 'Portfolio / Creator', label: 'Karthik.exe', url: 'https://kar-thikexe.vercel.app/', icon: 'globe', enabled: true, display_order: 5 },
      { id: 'soc-email', platform: 'Email', label: 'Email', url: 'mailto:aktechintelligence@gmail.com', icon: 'mail', enabled: true, display_order: 6 }
    ];
  };

  // Initial Site Settings
  const getInitialSiteSettings = () => {
    return {
      seo: {
        website_title: 'Karthik Nimmanagoti | Creative Strategist, Community Builder & Web Developer',
        meta_description: 'Karthik Nimmanagoti is a Creative Strategist, Community Builder, Web Developer and Event Organizer building digital experiences, communities and impactful projects.',
        keywords: 'Karthik Nimmanagoti, Karthik.exe, kar.thikexe, Portfolio, Creator, Product Manager, Community Builder, Event Organizer, Content Strategist, Impact Designer',
        canonical_url: 'https://karthik-portfolio-rust.vercel.app/',
        og_title: 'Karthik Nimmanagoti | Creative Strategist, Community Builder & Web Developer',
        og_description: 'Creative Strategist, Community Builder, Web Developer and Event Organizer building digital experiences and impactful communities.',
        og_image: 'https://karthik-portfolio-rust.vercel.app/og-image.jpg',
        twitter_title: 'Karthik Nimmanagoti | Creative Strategist, Community Builder & Web Developer',
        twitter_description: 'Creative Strategist, Community Builder, Web Developer and Event Organizer.',
        twitter_image: 'https://karthik-portfolio-rust.vercel.app/og-image.jpg',
        robots_index: true,
        robots_follow: true
      },
      homepage: {
        hero_heading: "Designing Impact. Building Communities. Architecting Web.",
        hero_subheading: "Aspiring Product Manager, Community Architect & Impact Designer crafting meaningful digital experiences and high-growth student movements.",
        profile_image: "https://res.cloudinary.com/do4nuj2kh/image/upload/v1783330744/WhatsApp_Image_2026-07-01_at_7.32.30_PM_vbhtly.jpg",
        stats: DEFAULT_STATS,
        cta_text: "Let's Collaborate",
        contact_email: "aktechintelligence@gmail.com",
        whatsapp_number: "919014603387"
      }
    };
  };

  // Initial Activity Logs
  const getInitialLogs = () => {
    return [
      {
        id: 'log-1',
        action: 'System Initialized',
        entity_type: 'system',
        entity_id: 'init',
        description: 'Admin Dashboard and database synchronization initialized.',
        admin_email: 'admin@karthik.dev',
        created_at: new Date().toISOString()
      },
      {
        id: 'log-2',
        action: 'Loaded Featured Project',
        entity_type: 'project',
        entity_id: 'paniit-summit-2026',
        description: 'Loaded PanIIT Andhra Pradesh Summit 2026 case study.',
        admin_email: 'admin@karthik.dev',
        created_at: new Date(Date.now() - 3600000).toISOString()
      }
    ];
  };

  // Table getters and setters map
  const tableInitializers = {
    projects: getInitialProjects,
    achievements: getInitialAchievements,
    experiences: getInitialExperiences,
    services: getInitialServices,
    testimonials: getInitialTestimonials,
    certifications: getInitialCertifications,
    speaking_events: getInitialSpeakingEvents,
    media_items: getInitialMedia,
    contact_inquiries: getInitialInquiries,
    contact_leads: () => [],
    portfolio_photos: () => GALLERY_ITEMS.map(item => ({
      id: item.id.toString(),
      title: item.title,
      category: item.category,
      image: item.image,
      location: item.location,
      shot_on: item.shotOn,
      story: item.story,
      editing_style: item.editingStyle,
      aspect: item.aspect,
      created_at: new Date().toISOString()
    })),
    social_links: getInitialSocialLinks,
    activity_logs: getInitialLogs
  };

  // Create Mock Supabase Query Builder
  const createQueryBuilder = (tableName) => {
    const initFn = tableInitializers[tableName] || (() => []);
    let currentData = getTableData(tableName, initFn);

    const builder = {
      _data: [...currentData],
      _filters: [],
      _orderCol: null,
      _ascending: true,
      _limitCount: null,
      _singleResult: false,

      select: function (_cols = '*') {
        return this;
      },

      insert: async function (records) {
        try {
          const recArray = Array.isArray(records) ? records : [records];
          const newRecords = recArray.map(r => ({
            id: r.id || `gen-${Math.random().toString(36).substring(2, 9)}`,
            created_at: r.created_at || new Date().toISOString(),
            updated_at: new Date().toISOString(),
            ...r
          }));
          const existing = getTableData(tableName, initFn);
          const updated = [...newRecords, ...existing];
          setTableData(tableName, updated);
          return { data: newRecords, error: null };
        } catch (err) {
          return { data: null, error: err };
        }
      },

      update: function (updates) {
        this._updatePayload = updates;
        return this;
      },

      upsert: async function (records) {
        try {
          const recArray = Array.isArray(records) ? records : [records];
          let existing = getTableData(tableName, initFn);
          
          recArray.forEach(rec => {
            const idx = existing.findIndex(item => item.id === rec.id || (rec.key && item.key === rec.key));
            if (idx >= 0) {
              existing[idx] = { ...existing[idx], ...rec, updated_at: new Date().toISOString() };
            } else {
              existing.unshift({
                id: rec.id || `gen-${Math.random().toString(36).substring(2, 9)}`,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                ...rec
              });
            }
          });

          setTableData(tableName, existing);
          return { data: recArray, error: null };
        } catch (err) {
          return { data: null, error: err };
        }
      },

      delete: function () {
        this._isDelete = true;
        return this;
      },

      eq: function (column, value) {
        if (this._isDelete) {
          try {
            const existing = getTableData(tableName, initFn);
            const filtered = existing.filter(r => r[column] !== value);
            setTableData(tableName, filtered);
            return Promise.resolve({ data: null, error: null });
          } catch (err) {
            return Promise.resolve({ data: null, error: err });
          }
        }

        if (this._updatePayload) {
          try {
            let existing = getTableData(tableName, initFn);
            let updatedItem = null;
            existing = existing.map(r => {
              if (r[column] === value) {
                updatedItem = { ...r, ...this._updatePayload, updated_at: new Date().toISOString() };
                return updatedItem;
              }
              return r;
            });
            setTableData(tableName, existing);
            return Promise.resolve({ data: updatedItem ? [updatedItem] : [], error: null });
          } catch (err) {
            return Promise.resolve({ data: null, error: err });
          }
        }

        this._data = this._data.filter(r => r[column] === value);
        return this;
      },

      order: function (column, { ascending = true } = {}) {
        this._orderCol = column;
        this._ascending = ascending;
        this._data.sort((a, b) => {
          const valA = a[column];
          const valB = b[column];
          if (valA === undefined || valA === null) return 1;
          if (valB === undefined || valB === null) return -1;
          if (typeof valA === 'number' && typeof valB === 'number') {
            return ascending ? valA - valB : valB - valA;
          }
          const strA = String(valA);
          const strB = String(valB);
          return ascending ? strA.localeCompare(strB) : strB.localeCompare(strA);
        });
        return this;
      },

      limit: function (count) {
        this._limitCount = count;
        this._data = this._data.slice(0, count);
        return this;
      },

      single: async function () {
        return { data: this._data[0] || null, error: null };
      },

      then: function (onfulfilled, onrejected) {
        return Promise.resolve({ data: this._data, error: null }).then(onfulfilled, onrejected);
      }
    };

    return builder;
  };

  // Mock Instance Implementation
  supabaseInstance = {
    isMock: true,
    auth: {
      getSession: async () => {
        const session = localStorage.getItem('mock_session');
        return { data: { session: session ? JSON.parse(session) : null } };
      },
      onAuthStateChange: (callback) => {
        const handleStorageChange = () => {
          const session = localStorage.getItem('mock_session');
          callback('SIGNED_IN', session ? JSON.parse(session) : null);
        };
        window.addEventListener('storage', handleStorageChange);
        
        const initialSession = localStorage.getItem('mock_session');
        setTimeout(() => {
          callback('INITIAL_SESSION', initialSession ? JSON.parse(initialSession) : null);
        }, 0);

        return { data: { subscription: { unsubscribe: () => window.removeEventListener('storage', handleStorageChange) } } };
      },
      signInWithPassword: async ({ email, password }) => {
        // Accept admin login
        if (
          (email.trim().toLowerCase() === 'admin@karthik.dev' && password === 'admin123') ||
          (email.trim().toLowerCase() === 'karthik@portfolio.com' && password === 'admin123') ||
          (email.trim().toLowerCase() === 'aktechintelligence@gmail.com' && password === 'admin123')
        ) {
          const mockUser = { 
            id: 'mock-admin-karthik', 
            email: email.trim(), 
            user_metadata: { full_name: 'Karthik Nimmanagoti', role: 'Administrator' } 
          };
          const mockSession = { user: mockUser, access_token: 'mock-access-token-karthik-admin' };
          localStorage.setItem('mock_session', JSON.stringify(mockSession));
          return { data: mockSession, error: null };
        }
        return { data: null, error: new Error('Invalid email or password. Use admin@karthik.dev / admin123') };
      },
      signOut: async () => {
        localStorage.removeItem('mock_session');
        return { error: null };
      },
      resetPasswordForEmail: async (email) => {
        console.log(`Password reset requested for: ${email}`);
        return { data: {}, error: null };
      },
      updateUser: async (attributes) => {
        const session = localStorage.getItem('mock_session');
        if (session) {
          const parsed = JSON.parse(session);
          parsed.user = { ...parsed.user, ...attributes };
          localStorage.setItem('mock_session', JSON.stringify(parsed));
          return { data: { user: parsed.user }, error: null };
        }
        return { data: null, error: new Error('Not logged in') };
      }
    },
    from: (tableName) => {
      // Special handler for site_settings (key-value)
      if (tableName === 'site_settings') {
        const getSettings = () => {
          const raw = localStorage.getItem('sb_mock_site_settings');
          return raw ? JSON.parse(raw) : getInitialSiteSettings();
        };
        const setSettings = (settings) => {
          localStorage.setItem('sb_mock_site_settings', JSON.stringify(settings));
        };

        return {
          select: () => ({
            eq: async (column, value) => {
              const all = getSettings();
              return { data: all[value] ? [{ key: value, value: all[value] }] : [], error: null };
            },
            then: (onfulfilled) => {
              const all = getSettings();
              const formatted = Object.entries(all).map(([k, v]) => ({ key: k, value: v }));
              return Promise.resolve({ data: formatted, error: null }).then(onfulfilled);
            }
          }),
          upsert: async (record) => {
            const all = getSettings();
            all[record.key] = record.value;
            setSettings(all);
            return { data: [record], error: null };
          }
        };
      }

      return createQueryBuilder(tableName);
    }
  };
} else {
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = supabaseInstance;
