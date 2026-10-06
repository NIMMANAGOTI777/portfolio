import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { 
  Briefcase, Calendar, MapPin, Award, CheckCircle2, 
  ChevronDown, ChevronUp, Users, ShieldAlert, 
  Sparkles, Code2, Camera, Eye, ArrowRight, 
  Flame, Layers, Check, Globe, Megaphone, Mic, Cpu, Radio, X
} from 'lucide-react';

// 1. Lightweight Animated Stat Counter Component
function TimelineStatCounter({ target, label, suffix = '', duration = 1200 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    
    const targetNum = parseFloat(target);
    let start = 0;
    const frameRate = 1000 / 60;
    const totalFrames = duration / frameRate;
    const increment = targetNum / totalFrames;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNum) {
        setCount(targetNum);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  const isFloat = target.toString().includes('.');
  const formattedCount = isFloat 
    ? count.toFixed(1) 
    : Math.floor(count).toLocaleString();

  return (
    <div 
      ref={ref} 
      className="glass-panel py-3.5 px-4 rounded-2xl text-center relative overflow-hidden group border border-white/5 hover:border-indigo-500/20 transition-all duration-300 shadow-sm"
    >
      <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-display bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
        {formattedCount}{suffix}
      </div>
      <p className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">{label}</p>
    </div>
  );
}

// 2. Comprehensive, Authenticated Professional Experience Dataset
const EXPERIENCES = [
  {
    id: 'exp-innfill-head',
    company: 'Innfill',
    role: 'Head of Community',
    duration: 'July 2026 – Present',
    year: '2026',
    employmentType: 'Full-time Leadership',
    isCurrent: true,
    isFeatured: true,
    featuredBadge: 'Current Role',
    location: 'Hyderabad, India (Hybrid)',
    logoText: 'IF',
    logoColor: 'from-indigo-600 via-indigo-500 to-purple-600',
    category: ['Community', 'Leadership', 'Marketing', 'Events'],
    icon: 'users',
    summary: 'Leading nationwide community expansion, campus ambassador networks, creator summits, and strategic partnerships.',
    highlightTag: 'Community Growth & Leadership',
    keyMetric: 'Active / Scaling',
    responsibilities: [
      'Leading community growth, brand engagement, and campus chapter scaling initiatives across universities',
      'Designing and executing high-impact workshops, creator networking sessions, and student community programs',
      'Building and managing strategic relationships with student creators, campus ambassadors, and industry partners',
      'Collaborating closely with product, marketing, and operations teams to align launch roadmaps',
      'Overseeing digital community channels, tone of voice, and brand communication workflows',
      'Tracking community retention, weekly engagement metrics, and optimizing member onboarding'
    ],
    skills: ['Community Growth', 'Leadership', 'Campus Partnerships', 'Strategy', 'Brand Operations'],
    outcomes: 'Established standard community governance guidelines and scaled nationwide student outreach to double active ambassador engagement.'
  },
  {
    id: 'exp-innfill-intern',
    company: 'Innfill',
    role: 'Digital Marketing Intern',
    duration: 'April 2026 – July 2026',
    year: '2026',
    employmentType: 'Internship',
    location: 'Hyderabad, India',
    logoText: 'IF',
    logoColor: 'from-blue-500 via-sky-400 to-indigo-500',
    category: ['Marketing', 'Content'],
    icon: 'flame',
    summary: 'Engineered growth-focused social strategies, scripted short-form video content, and optimized organic discovery.',
    highlightTag: 'Organic SMM & Video Scripting',
    keyMetric: 'Organic SMM',
    responsibilities: [
      'Developed and executed data-backed social media growth strategies across digital channels',
      'Scripted, storyboarded, and scheduled engaging short-form video content for student audiences',
      'Managed dynamic content calendars and coordinated production with creative teams',
      'Audited digital profiles to maximize organic discoverability and search performance',
      'Analyzed campaign engagement metrics to iterate weekly content performance'
    ],
    skills: ['Digital Marketing', 'Content Strategy', 'Social Media', 'Video Scripting', 'Analytics'],
    outcomes: 'Accelerated video reach and engagement while establishing standard operating procedures for weekly profile audits.'
  },
  {
    id: 'exp-nxtwave-intern',
    company: 'NxtWave',
    role: 'Content Strategist Intern',
    duration: 'February 2026 – June 2026',
    year: '2026',
    employmentType: 'Internship',
    isFeatured: true,
    featuredBadge: '400K+ Reach',
    location: 'Remote',
    logoText: 'NW',
    logoColor: 'from-cyan-500 via-blue-500 to-indigo-600',
    category: ['Content', 'Marketing', 'Leadership'],
    icon: 'sparkles',
    summary: 'Directed audience-focused digital campaigns reaching 400K+ people and engineered automated content production pipelines.',
    highlightTag: '400K+ Audience Reach',
    keyMetric: '400K+ Reach',
    responsibilities: [
      'Directed multi-channel content strategy targeting student, developer, and creator demographics',
      'Planned and executed digital campaigns that generated over 400,000+ organic impressions',
      'Engineered structured and automated content creation, review, and publishing pipelines',
      'Collaborated with internal leadership to align digital storytelling with core acquisition objectives',
      'Utilized data-driven feedback loops to optimize campaign retention and engagement rates'
    ],
    skills: ['Content Strategy', 'Campaign Architecture', 'Automation', 'Brand Growth', 'Stakeholder Management'],
    outcomes: 'Delivered campaigns reaching 400K+ impressions with a 35% reduction in production turnaround via automated pipelines.'
  },
  {
    id: 'exp-base44-hackathon',
    company: 'BASE44 Hackathon',
    role: 'Lead Organizer & Web Platform Architect',
    duration: '2025 – 2026',
    year: '2025–26',
    employmentType: 'Organizing Committee / Tech Lead',
    isFeatured: true,
    featuredBadge: '1,665+ Participants',
    location: 'NIAT Campus',
    logoText: 'B44',
    logoColor: 'from-purple-600 via-pink-500 to-rose-600',
    category: ['Development', 'Events', 'Leadership'],
    icon: 'code2',
    isCaseStudy: true,
    summary: 'Architected high-concurrency event portal and on-ground QR verification platform serving 1,665+ participants with 100% uptime.',
    highlightTag: '1,665+ Hackers • 100% Uptime',
    keyMetric: '1,665+ Participants',
    caseStudy: {
      problem: 'Developing a resilient, high-concurrency web platform to process thousands of student registrations, real-time notifications, team formations, and instant on-ground participant check-in during peak venue rush without database latency or crashes.',
      responsibilities: [
        'Web Platform Architecture: Engineered the official responsive portal (base44.niat.tech) using React and Tailwind CSS.',
        'Registration & Database Engine: Built robust Supabase schemas and API queries to handle high concurrency seamlessly.',
        'On-Ground QR Verification: Developed an administrative scanner dashboard for instantaneous participant verification.',
        'Technical & Live Operations: Supervised server uptime, database queries, and on-ground check-in desks during peak traffic.'
      ],
      techUsed: ['React', 'Supabase', 'Tailwind CSS', 'Vite', 'Framer Motion', 'REST APIs']
    },
    skills: ['Fullstack Dev', 'System Architecture', 'Supabase', 'Event Operations', 'QR Check-in'],
    outcomes: 'Maintained 100% platform uptime throughout the hackathon and verified all 1,665+ participants smoothly with custom QR codes.'
  },
  {
    id: 'exp-hexaverse',
    company: 'HexaVerse 2025',
    role: 'Head of Security & Event Promotions Lead',
    duration: '2025',
    year: '2025',
    employmentType: 'Leadership',
    location: 'Hyderabad, India',
    logoText: 'HV',
    logoColor: 'from-red-500 via-rose-500 to-amber-500',
    category: ['Events', 'Leadership', 'Marketing'],
    icon: 'shield-alert',
    summary: 'Designed event security protocols, commanded a 10-member security crew, and drove campus promotional campaigns.',
    highlightTag: '10-Member Force • Zero Incidents',
    keyMetric: '10-Member Team',
    responsibilities: [
      'Formulated end-to-end security blueprints, perimeter barriers, and entry/exit crowd flow protocols',
      'Commanded a 10-member volunteer security squad with active walkie-talkie communication grids',
      'Designed emergency safety guidelines, rapid response checklists, and VIP escort pathways',
      'Led campus-wide promotional drives and student outreach activations to drive massive registrations',
      'Coordinated real-time attendee crowd management during high-density keynote sessions'
    ],
    skills: ['Security Planning', 'Crowd Management', 'Promotions', 'Emergency Protocols', 'Team Leadership'],
    outcomes: 'Recorded zero safety incidents across large attendance volumes and ensured seamless crowd circulation.'
  },
  {
    id: 'exp-niat-takeover',
    company: 'NIAT Takeover',
    role: 'Head Student Organizer',
    duration: '2026',
    year: '2026',
    employmentType: 'Leadership / Operations',
    location: 'NIAT Campus',
    logoText: 'TO',
    logoColor: 'from-violet-600 via-indigo-600 to-blue-600',
    category: ['Events', 'Leadership', 'Community'],
    icon: 'briefcase',
    summary: 'Orchestrated 3 days of 5 major flagship events including Takeover Hackathon, DJ Night, BRAVE, and GRIT Awards.',
    highlightTag: '5 Major Flagship Events',
    keyMetric: '3 Days • 5 Events',
    responsibilities: [
      'Led Guest Hospitality, coordinating VIP speakers, jury members, mentors, and dignitaries across 3 days',
      'Orchestrated multi-event schedules across Takeover Hackathon, Takeover DJ Night, BRAVE, Makers Conclave, and GRIT Awards',
      'Directed live social media videography and dynamic storytelling to document the festival atmosphere',
      'Managed rapid crisis resolution, stage synchronizations, and volunteer deployments under intense pressure'
    ],
    skills: ['Event Architecture', 'Guest Hospitality', 'Crisis Management', 'Stage Operations', 'Media Production'],
    outcomes: 'Coordinated five concurrent major events seamlessly with exceptional feedback from NIAT leadership and attendees.'
  },
  {
    id: 'exp-starlit-25',
    company: 'NxtWave / NIAT',
    role: 'Event Organizer & Senior Coordinator — Starlit’25',
    duration: '2025',
    year: '2025',
    employmentType: 'Organizing Committee',
    location: 'NIAT Campus',
    logoText: 'S25',
    logoColor: 'from-amber-500 via-yellow-500 to-orange-500',
    category: ['Events', 'Leadership', 'Community'],
    icon: 'award',
    summary: 'Coordinated flagship annual festival operations, VIP hospitality, stage timelines, and volunteer divisions.',
    highlightTag: 'Annual Flagship Festival',
    keyMetric: 'Campus Fest',
    responsibilities: [
      'Coordinated multi-tier volunteer departments across stage setups, sound checks, and hall logistics',
      'Managed VIP guest schedules, keynote speaker hospitality, and smooth green-room transitions',
      'Enforced backstage access control, safety cordons, and audience movement between parallel tracks',
      'Handled rapid troubleshooting for stage audio-visuals and live announcements'
    ],
    skills: ['Fest Operations', 'VIP Hospitality', 'Volunteer Supervision', 'Stage Timeline Management'],
    outcomes: 'Executed high-precision stage and hospitality operations for NIAT’s premier cultural and technology festival.'
  },
  {
    id: 'exp-starlit-24',
    company: 'Starlit’24',
    role: 'Security Team Lead',
    duration: '2024',
    year: '2024',
    employmentType: 'Event Security Lead',
    location: 'NIAT Campus',
    logoText: 'S24',
    logoColor: 'from-slate-600 via-slate-700 to-slate-800',
    category: ['Events', 'Leadership'],
    icon: 'shield-alert',
    summary: 'Formulated entry checkpoints, crowd flow barriers, and perimeter safety protocols for 1,000+ attendees.',
    highlightTag: '1,000+ Attendees Secured',
    keyMetric: '1,000+ Attendees',
    responsibilities: [
      'Engineered perimeter barricades, gate entry verification lanes, and emergency egress corridors',
      'Supervised security volunteer shifts and communication networks during high-volume entries',
      'Resolved on-ground disputes, managed pass verifications, and prevented unauthorized venue entry'
    ],
    skills: ['Crowd Safety', 'Gate Logistics', 'Incident Management', 'Perimeter Control'],
    outcomes: 'Delivered an incident-free event experience for over 1,000 student attendees with structured queue management.'
  },
  {
    id: 'exp-naitra',
    company: 'NAITRA 2.0',
    role: 'Head of Security & Social Media Manager',
    duration: '2024',
    year: '2024',
    employmentType: 'Dual Lead Role',
    location: 'NIAT Campus',
    logoText: 'N2',
    logoColor: 'from-teal-500 via-emerald-500 to-cyan-500',
    category: ['Events', 'Marketing', 'Content'],
    icon: 'camera',
    summary: 'Bridged on-ground event security architecture with high-engagement live social media broadcasting.',
    highlightTag: 'Security & Live Media Coverage',
    keyMetric: 'Dual-Lead Role',
    responsibilities: [
      'Commanded physical venue security protocols, crowd barricades, and stage protection cordons',
      'Directed real-time social media publishing, capturing high-energy reels, photos, and live story updates',
      'Managed volunteer teams across both physical safety checkpoints and digital media recording points'
    ],
    skills: ['Event Security', 'Live SMM', 'Event Photography', 'Visual Documentation'],
    outcomes: 'Combined zero security incidents with a record spike in real-time festival social media impressions.'
  },
  {
    id: 'exp-teach-ai',
    company: 'Teach AI for India',
    role: 'Strategic POC',
    duration: '2025 – 2026',
    year: '2025–26',
    employmentType: 'Social Impact Initiative',
    location: 'India',
    logoText: 'TAI',
    logoUrl: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1785759871/WhatsApp_Image_2026-08-03_at_5.52.31_PM_r9lnro.jpg',
    logoColor: 'from-emerald-500 via-teal-500 to-cyan-500',
    category: ['Community', 'Leadership', 'Content'],
    icon: 'globe',
    summary: 'Pioneered student-led AI literacy initiative delivering digital tools awareness to government school students.',
    highlightTag: 'Government School AI Literacy',
    keyMetric: 'AI Literacy',
    responsibilities: [
      'Served as strategic POC coordinating campus volunteer teams for grassroots school outreach visits',
      'Formulated interactive curriculum modules teaching foundational AI concepts, digital safety, and coding awareness',
      'Documented digital impact stories and student growth to build transparent proof of work on LinkedIn',
      'Mentored collegiate tech trainers to deliver highly accessible, practical hands-on classroom sessions'
    ],
    skills: ['Social Impact', 'Curriculum Design', 'Public Speaking', 'Community Outreach', 'Mentorship'],
    gallery: [
      'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774507254/4_uffbub.jpg',
      'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774507254/2_vb5mqh.jpg',
      'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774507254/5_ywm5ps.jpg',
      'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774507254/1_nft1oe.jpg'
    ],
    outcomes: 'Introduced hundreds of underprivileged students to practical AI tools, empowering them with future-ready skills.'
  },
  {
    id: 'exp-influencer-club',
    company: 'Influencer Club NIAT',
    role: 'President',
    duration: '2024 – Present',
    year: '2024–Present',
    employmentType: 'Elected Leadership',
    isFeatured: true,
    featuredBadge: '2+ Years Leadership',
    location: 'NIAT Campus',
    logoText: 'IC',
    logoColor: 'from-amber-500 via-orange-500 to-rose-500',
    category: ['Leadership', 'Community', 'Content', 'Events'],
    icon: 'award',
    summary: 'Directed student club operations for 2+ years, hosting national creator summits and personal branding masterclasses.',
    highlightTag: '500+ Members • Creator Summits',
    keyMetric: '2+ Years Presidency',
    responsibilities: [
      'Directed executive board operations, event budgeting, and weekly digital growth masterclasses',
      'Curated and hosted keynote creator sessions with top industry figures (Ishan Sharma, Madhu Kiran, Tharun Naik)',
      'Led the multi-department media, photography, videography, and post-production crews',
      'Organized live LinkedIn branding workshops, resume reviews, and building-in-public sessions for students',
      'Produced podcasts highlighting entrepreneurship, startup journeys, and technological innovation'
    ],
    skills: ['Executive Leadership', 'Creator Summits', 'Public Speaking', 'Media Direction', 'LinkedIn Growth'],
    gallery: [
      'https://res.cloudinary.com/do4nuj2kh/image/upload/v1763179044/WhatsApp_Image_2025-11-15_at_9.22.34_AM_vm6hrl.jpg',
      'https://res.cloudinary.com/do4nuj2kh/image/upload/v1763179680/WhatsApp_Image_2025-11-15_at_9.29.46_AM_ornq12.jpg',
      'https://res.cloudinary.com/do4nuj2kh/image/upload/v1763179044/WhatsApp_Image_2025-11-15_at_9.24.22_AM_njlqzg.jpg',
      'https://res.cloudinary.com/do4nuj2kh/image/upload/v1763179044/WhatsApp_Image_2025-11-15_at_9.21.22_AM_zywwfg.jpg'
    ],
    outcomes: 'Grew club membership to 500+ active students, hosted top creators, and was honored with the Outstanding Leadership Award.'
  },
  {
    id: 'exp-blend-ai',
    company: 'Blend AI for Good Hackathon 2025',
    role: 'Event Organizer',
    duration: '2025',
    year: '2025',
    employmentType: 'Hackathon Organizing Committee',
    location: 'NIAT Campus',
    logoText: 'BAI',
    logoColor: 'from-blue-600 via-indigo-600 to-cyan-500',
    category: ['Events', 'Development', 'Community'],
    icon: 'code2',
    summary: 'Organized AI-focused hackathon fostering student AI solutions for social impact and sustainable development.',
    highlightTag: 'AI for Social Good Hackathon',
    keyMetric: 'AI Hackathon',
    responsibilities: [
      'Structured hackathon challenge tracks addressing real-world social and environmental problems with AI',
      'Managed mentor office hours, judging criteria sheets, and live demo staging',
      'Coordinated technical setup, API token distribution, and team troubleshooting during sprint hours'
    ],
    skills: ['Hackathon Management', 'AI Tools', 'Technical Mentorship', 'Jury Coordination'],
    outcomes: 'Guided 30+ innovative student AI projects to final prototype stage with seamless judging operations.'
  },
  {
    id: 'exp-bhoomi-netra',
    company: 'Bhoomi Netra',
    role: 'Hackathon Organizer & Media Head',
    duration: '2024',
    year: '2024',
    employmentType: 'Organizing Lead',
    location: 'NIAT Campus',
    logoText: 'BN',
    logoColor: 'from-emerald-600 via-green-500 to-lime-600',
    category: ['Events', 'Content', 'Marketing'],
    icon: 'camera',
    summary: 'Spearheaded media branding and operational management for agricultural innovation hackathon.',
    highlightTag: 'AgriTech Hackathon & Media',
    keyMetric: 'AgriTech Event',
    responsibilities: [
      'Led full-scale creative and media branding, designing promo assets, banners, and video teasers',
      'Managed participant registrations, table allocations, and on-ground scheduling',
      'Conducted live media documentation and live broadcasted team pitch presentations'
    ],
    skills: ['Media Direction', 'AgriTech Hackathons', 'Visual Storytelling', 'On-ground Coordination'],
    outcomes: 'Drove record participation for AgriTech problem tracks with comprehensive digital media coverage.'
  },
  {
    id: 'exp-iot-workshop',
    company: 'IoT & Hardware Summit',
    role: 'IoT Workshop Organizer & Media Lead',
    duration: '2024',
    year: '2024',
    employmentType: 'Workshop Organizer',
    location: 'NIAT Campus',
    logoText: 'IOT',
    logoColor: 'from-indigo-600 via-blue-600 to-teal-500',
    category: ['Events', 'Development', 'Content'],
    icon: 'cpu',
    summary: 'Conducted hands-on embedded systems workshop and managed full-scale media documentation.',
    highlightTag: '100+ Hardware Makers',
    keyMetric: 'Hardware Workshop',
    responsibilities: [
      'Coordinated microcontroller and sensor hardware kit distribution for over 100 student makers',
      'Assisted technical instructors during hands-on coding and circuit assembly debugging',
      'Produced cinematic recap videos and technical documentation of student embedded projects'
    ],
    skills: ['Hardware Logistics', 'IoT Workshops', 'Technical Media', 'Mentorship Support'],
    outcomes: 'Enabled 100+ students to successfully build their first working embedded sensor prototypes.'
  },
  {
    id: 'exp-agritech-podcast',
    company: 'AgriTech & Entrepreneurship Podcast',
    role: 'Podcast Organizer & Host',
    duration: '2024',
    year: '2024',
    employmentType: 'Creator / Host',
    location: 'Hyderabad, India',
    logoText: 'POD',
    logoColor: 'from-amber-600 via-orange-600 to-red-600',
    category: ['Content', 'Community', 'Marketing'],
    icon: 'mic',
    summary: 'Produced and hosted in-depth podcast with Kishore Indukuri (CEO of Sid\'s Farm) on AgriTech startup scaling.',
    highlightTag: 'Founder Spotlight Podcast',
    keyMetric: 'Founder Podcast',
    responsibilities: [
      'Formulated in-depth conversational outline on dairy tech, supply chain scaling, and bootstrapped growth',
      'Hosted live discussion spotlighting actionable startup lessons for student entrepreneurs',
      'Engineered audio-visual post-production and published high-engagement micro-clips across social platforms'
    ],
    skills: ['Podcast Hosting', 'Founder Interviewing', 'Audio/Video Editing', 'Content Distribution'],
    outcomes: 'Generated high student engagement and positive reception from Hyderabad startup ecosystem leaders.'
  },
  {
    id: 'exp-industry-expert',
    company: 'Industry Expert Series',
    role: 'Series Curator & Host — Featuring Meera Kannan',
    duration: '2024',
    year: '2024',
    employmentType: 'Curator & Host',
    location: 'NIAT Campus',
    logoText: 'IX',
    logoColor: 'from-pink-600 via-purple-600 to-indigo-600',
    category: ['Community', 'Leadership', 'Content'],
    icon: 'radio',
    summary: 'Curated interactive fireside masterclass with industry leader Meera Kannan on professional career growth.',
    highlightTag: 'Executive Leadership Fireside',
    keyMetric: 'Executive Session',
    responsibilities: [
      'Spearheaded guest speaker outreach, briefing, and thematic agenda alignment',
      'Moderated interactive Q&A session bridging corporate leadership insights with student ambitions',
      'Documented core takeaways into actionable career frameworks shared across the campus community'
    ],
    skills: ['Executive Moderation', 'Speaker Hospitality', 'Agenda Curation', 'Audience Engagement'],
    outcomes: 'Connected 200+ aspiring student technologists directly with high-level corporate leadership insights.'
  }
];

// Helper to render relevant Lucide icons safely
const ExpIcon = ({ name, className }) => {
  switch (name) {
    case 'users': return <Users className={className} />;
    case 'flame': return <Flame className={className} />;
    case 'sparkles': return <Sparkles className={className} />;
    case 'code2': return <Code2 className={className} />;
    case 'shield-alert': return <ShieldAlert className={className} />;
    case 'globe': return <Globe className={className} />;
    case 'award': return <Award className={className} />;
    case 'camera': return <Camera className={className} />;
    case 'cpu': return <Cpu className={className} />;
    case 'mic': return <Mic className={className} />;
    case 'radio': return <Radio className={className} />;
    case 'megaphone': return <Megaphone className={className} />;
    default: return <Briefcase className={className} />;
  }
};

export default function ProfessionalExperience() {
  const { publicExperiences } = usePortfolioData();
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [expandedId, setExpandedId] = useState(null); // Single expansion accordion
  const [lightboxImg, setLightboxImg] = useState(null);

  // Active experiences from database/mock or fallback to rich static data
  const activeExperiences = useMemo(() => {
    if (publicExperiences && publicExperiences.length > 0) {
      return publicExperiences.map(item => {
        const existing = EXPERIENCES.find(e => e.id === item.id);
        if (existing) {
          return {
            ...existing,
            role: item.role || existing.role,
            company: item.company || existing.company,
            duration: item.duration || existing.duration,
            summary: item.summary || existing.summary,
            responsibilities: item.responsibilities || existing.responsibilities,
            skills: item.skills || existing.skills,
            outcomes: item.outcomes || existing.outcomes,
            location: item.location || existing.location
          };
        }
        return {
          id: item.id,
          company: item.company,
          role: item.role,
          duration: item.duration || '2026',
          year: item.year || '2026',
          employmentType: item.employment_type || 'Professional',
          isCurrent: !!item.is_current,
          isFeatured: !!item.featured,
          featuredBadge: item.is_current ? 'Current Role' : '',
          location: item.location || 'India',
          logoText: item.logo_text || item.company.substring(0, 2).toUpperCase(),
          logoColor: item.logo_color || 'from-indigo-600 to-purple-600',
          category: Array.isArray(item.category) ? item.category : ['Leadership'],
          icon: item.icon || 'briefcase',
          summary: item.summary,
          highlightTag: item.highlight_tag || item.role,
          keyMetric: item.key_metric || 'Active',
          responsibilities: item.responsibilities || [],
          skills: item.skills || [],
          outcomes: item.outcomes || ''
        };
      });
    }
    return EXPERIENCES;
  }, [publicExperiences]);

  // Exact minimal category filters as required
  const filterCategories = [
    'ALL',
    'LEADERSHIP',
    'COMMUNITY',
    'CONTENT',
    'EVENTS',
    'DEVELOPMENT',
    'MARKETING'
  ];

  // Toggle single card expansion: opening one automatically closes any other open card
  const handleToggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxImg(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter experiences by category
  const filteredExperiences = useMemo(() => {
    if (selectedFilter === 'ALL') return activeExperiences;
    return activeExperiences.filter(exp => 
      Array.isArray(exp.category) && exp.category.some(cat => cat.toUpperCase() === selectedFilter)
    );
  }, [selectedFilter, activeExperiences]);

  return (
    <section id="experience" className="max-w-5xl mx-auto px-4 sm:px-6 py-20 w-full relative z-10">
      
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/3 -left-28 w-72 h-72 bg-indigo-500/8 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 -right-28 w-72 h-72 bg-purple-500/8 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Section Header */}
      <div className="text-center mb-10">
        <motion.span 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full inline-block mb-3"
        >
          Career Journey
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent"
        >
          Professional Experience
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mt-2.5 font-light"
        >
          An interactive timeline of leadership roles, digital infrastructure, growth marketing, and community impact.
        </motion.p>
      </div>

      {/* Compact Impact Strip (Horizontal Summary) */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5 mb-10"
      >
        <TimelineStatCounter target="2.5" suffix="+" label="Years Experience" />
        <TimelineStatCounter target="10" suffix="+" label="Organizations" />
        <TimelineStatCounter target="25" suffix="+" label="Events Managed" />
        <TimelineStatCounter target="2000" suffix="+" label="Students Impacted" />
        <TimelineStatCounter target="10" suffix="+" label="Leadership Roles" />
      </motion.div>

      {/* Experience Category Filter Pills */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25 }}
        className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mb-12"
      >
        {filterCategories.map((cat) => {
          const isActive = selectedFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider transition-all duration-200 cursor-pointer border ${
                isActive 
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-sm shadow-indigo-500/25 scale-[1.02]' 
                  : 'bg-slate-900/50 text-slate-400 border-white/5 hover:text-white hover:bg-slate-800/60 hover:border-white/10'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </motion.div>

      {/* Clean Vertical Timeline Container */}
      <div className="relative pl-6 sm:pl-10 md:pl-14">
        
        {/* Subtle, Minimal Vertical Line */}
        <div className="absolute left-[11px] sm:left-[19px] md:left-[27px] top-3 bottom-6 w-[2px] bg-gradient-to-b from-indigo-500/40 via-purple-500/20 to-slate-800/10 pointer-events-none"></div>

        <div className="space-y-4 sm:space-y-5">
          <AnimatePresence mode="popLayout">
            {filteredExperiences.length > 0 ? (
              filteredExperiences.map((exp) => {
                const isExpanded = expandedId === exp.id;
                
                return (
                  <motion.div
                    key={exp.id}
                    layout="position"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="relative group"
                  >
                    {/* Small Timeline Node */}
                    <div className="absolute -left-[29px] sm:-left-[45px] md:-left-[61px] top-4 z-20 flex items-center justify-center">
                      <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        exp.isCurrent 
                          ? 'bg-indigo-600 border-indigo-300 text-white shadow-md shadow-indigo-500/30' 
                          : exp.isFeatured
                          ? 'bg-purple-950 border-purple-500/40 text-purple-300'
                          : 'bg-slate-950 border-white/15 text-slate-400'
                      }`}>
                        <ExpIcon name={exp.icon} className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                      {/* Live subtle pulse on current role */}
                      {exp.isCurrent && (
                        <span className="absolute -inset-1 rounded-full border border-indigo-400/50 animate-ping opacity-35 pointer-events-none"></span>
                      )}
                    </div>

                    {/* Collapsed Experience Card Structure */}
                    <div className={`rounded-2xl sm:rounded-3xl p-4 sm:p-5 transition-all duration-300 border ${
                      exp.isFeatured
                        ? 'bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-indigo-950/25 border-indigo-500/25 hover:border-indigo-500/40 shadow-sm'
                        : 'bg-slate-950/60 border-white/5 hover:border-white/15 hover:bg-slate-900/50'
                    }`}>
                      
                      {/* Main Collapsed Header Grid */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
                        
                        {/* Left Info: Avatar + Details */}
                        <div className="flex items-start sm:items-center gap-3.5">
                          {/* Compact Typographic / Image Avatar */}
                          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr ${exp.logoColor || 'from-indigo-600 to-purple-600'} flex items-center justify-center text-white font-extrabold text-[11px] shadow-sm select-none overflow-hidden shrink-0`}>
                            {exp.logoUrl ? (
                              <img src={exp.logoUrl} alt={`${exp.company} Logo`} className="w-full h-full object-cover" />
                            ) : (
                              exp.logoText
                            )}
                          </div>

                          {/* Role & Org */}
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-0.5">
                              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{exp.company}</span>
                              {exp.isCurrent && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400">
                                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></span>
                                  Current
                                </span>
                              )}
                              {exp.featuredBadge && !exp.isCurrent && (
                                <span className="inline-block px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[9px] font-bold text-purple-300">
                                  {exp.featuredBadge}
                                </span>
                              )}
                            </div>
                            <h3 className="text-sm sm:text-base font-bold text-white leading-snug group-hover:text-indigo-200 transition-colors">
                              {exp.role}
                            </h3>
                          </div>
                        </div>

                        {/* Right Details: Date & Metrics & Expand Action */}
                        <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                          
                          {/* Period & Key Tag */}
                          <div className="flex items-center gap-2 text-right">
                            <span className="text-[10px] font-semibold text-slate-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                              {exp.duration}
                            </span>
                            <span className="text-[10px] font-bold text-indigo-300/90 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/15 hidden sm:inline-block">
                              {exp.keyMetric}
                            </span>
                          </div>

                          {/* Expand Button */}
                          <button
                            onClick={() => handleToggleExpand(exp.id)}
                            aria-expanded={isExpanded}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                              isExpanded 
                                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30' 
                                : 'bg-white/5 hover:bg-indigo-600/20 text-slate-300 hover:text-white border border-white/10 hover:border-indigo-500/30'
                            }`}
                          >
                            <span>{isExpanded ? 'Hide Details' : 'View Experience'}</span>
                            {isExpanded ? (
                              <ChevronUp size={13} className="text-white" />
                            ) : (
                              <ArrowRight size={13} className="text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* One-Line Concise Summary in Initial View */}
                      <p className="text-xs text-slate-400 leading-relaxed mt-2.5 pl-0 sm:pl-[52px]">
                        {exp.summary}
                      </p>

                      {/* Smooth Accordion Expanded State */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="pt-5 mt-4 border-t border-white/10 space-y-5 text-left">
                              
                              {/* Case Study Challenge (if applicable) */}
                              {exp.isCaseStudy && (
                                <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/20">
                                  <span className="text-[9px] font-extrabold uppercase text-indigo-400 tracking-wider mb-1 block">
                                    Architectural Challenge
                                  </span>
                                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                                    "{exp.caseStudy.problem}"
                                  </p>
                                </div>
                              )}

                              {/* What I Did / Key Responsibilities */}
                              <div>
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                  <CheckCircle2 size={12} className="text-indigo-400" />
                                  <span>What I Did & Responsibilities</span>
                                </h4>
                                <ul className="space-y-1.5">
                                  {((exp.isCaseStudy ? exp.caseStudy?.responsibilities : exp.responsibilities) || []).map((resp, rIdx) => (
                                    <li key={rIdx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                                      <span>{resp}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Key Impact & Outcomes Callout */}
                              {exp.outcomes && (
                                <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-2">
                                  <Check size={14} className="text-emerald-400 stroke-[3] mt-0.5 shrink-0" />
                                  <div>
                                    <span className="text-[9px] font-bold uppercase text-emerald-400 tracking-wider block mb-0.5">
                                      Impact & Key Outcome
                                    </span>
                                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                                      {exp.outcomes}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {/* Relevant Skills */}
                              <div>
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                                  Relevant Skills
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                  {((exp.isCaseStudy ? exp.caseStudy?.techUsed : exp.skills) || []).map((skill) => (
                                    <span 
                                      key={skill} 
                                      className="text-[10px] font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Work & Event Gallery Thumbnails (if available) */}
                              {Array.isArray(exp.gallery) && exp.gallery.length > 0 && (
                                <div>
                                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                    <Camera size={12} className="text-indigo-400" />
                                    <span>Work Moments ({exp.gallery.length} Photos)</span>
                                  </h4>
                                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                    {exp.gallery.slice(0, 3).map((imgUrl, imgIdx) => {
                                      const isLastAndMore = imgIdx === 2 && exp.gallery.length > 3;
                                      const extraCount = exp.gallery.length - 3;

                                      return (
                                        <div 
                                          key={imgIdx} 
                                          onClick={() => setLightboxImg(imgUrl)}
                                          className="h-16 sm:h-20 rounded-xl overflow-hidden border border-white/10 relative group/img cursor-pointer bg-slate-900"
                                        >
                                          <img 
                                            src={imgUrl} 
                                            alt={`${exp.company} photo ${imgIdx + 1}`}
                                            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                          />
                                          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                            <Eye size={12} className="text-white" />
                                          </div>
                                          {isLastAndMore && (
                                            <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px] flex items-center justify-center text-white font-extrabold text-[11px]">
                                              +{extraCount} more
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                              {/* Quick Close Trigger at bottom */}
                              <div className="pt-2 flex justify-end">
                                <button
                                  onClick={() => setExpandedId(null)}
                                  className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-[10px] font-bold uppercase tracking-wider transition border border-white/5 cursor-pointer"
                                >
                                  Close
                                </button>
                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  </motion.div>
                );
              })
            ) : (
              /* Empty state if filter has no items */
              <div className="text-center py-12 bg-slate-900/30 border border-dashed border-white/5 rounded-2xl">
                <Briefcase className="mx-auto text-slate-500 mb-2" size={24} />
                <p className="text-slate-300 text-xs font-bold mb-1">No experiences found in this category</p>
                <button 
                  onClick={() => setSelectedFilter('ALL')}
                  className="mt-2 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] rounded-lg transition cursor-pointer"
                >
                  View All
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal for Photo Gallery */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 cursor-zoom-out"
            onClick={() => setLightboxImg(null)}
          >
            <button 
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-full bg-white/5 border border-white/10 cursor-pointer transition"
              aria-label="Close image preview"
            >
              <X size={18} />
            </button>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-3xl max-h-[85vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={lightboxImg} 
                alt="Enlarged experience moment" 
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl select-none"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
