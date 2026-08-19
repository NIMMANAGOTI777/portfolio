import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, Calendar, MapPin, Award, CheckCircle2, 
  ChevronDown, ChevronUp, Search, Filter, 
  Users, ShieldAlert, Sparkles, Code2, Camera, 
  Eye, ArrowRight, X, Flame, Layers, Check, Globe
} from 'lucide-react';

// 1. Animated Number Counter Component
function TimelineStatCounter({ target, label, suffix = '', duration = 1400 }) {
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
      { threshold: 0.15 }
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
      className="glass-panel p-4 sm:p-5 rounded-2xl text-center relative overflow-hidden group border border-white/5 hover:border-indigo-500/25 transition-all duration-300 shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-0.5"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      <h4 className="text-2xl sm:text-3xl font-extrabold text-white mb-1 font-display bg-gradient-to-r from-indigo-300 via-white to-purple-300 bg-clip-text text-transparent">
        {formattedCount}{suffix}
      </h4>
      <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
    </div>
  );
}

// 2. Comprehensive Professional Experience Dataset
const EXPERIENCES = [
  {
    id: 'exp-1',
    company: 'Innfill',
    role: 'Head of Community',
    duration: 'July 2026 – Present',
    year: '2026',
    employmentType: 'Full-time',
    isCurrent: true,
    isFeatured: true,
    featuredBadge: 'Current Role',
    location: 'Hyderabad, India (Hybrid)',
    logoText: 'IF',
    logoColor: 'from-indigo-600 via-indigo-500 to-purple-600',
    category: ['Community', 'Leadership', 'Events', 'Marketing'],
    icon: 'users',
    summary: 'Leading community growth, strategic campus initiatives, ambassador programs, and high-impact partnerships.',
    metrics: [
      { label: 'Role Level', value: 'Head of Community' },
      { label: 'Community Status', value: 'Active / Scaling' }
    ],
    responsibilities: [
      'Leading community growth and engagement initiatives at scale',
      'Planning high-impact workshops, networking events, and campus community programs',
      'Building and nurturing relationships with students, creators, ambassadors, and strategic partners',
      'Collaborating closely with marketing, product, and operations teams to align launch objectives',
      'Managing complete online and offline community communication and branding',
      'Tracking community engagement metrics and implementing strategies to improve overall member experience'
    ],
    skills: ['Community Growth', 'Leadership', 'Operations', 'Strategy', 'Communication', 'Partnerships'],
    outcomes: 'Pioneering structural community guidelines and initiating nationwide campus outreach to double the active ambassador base.'
  },
  {
    id: 'exp-2',
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
    summary: 'Engineered growth-focused social strategies, scripted short-form videos, and optimized organic discovery.',
    metrics: [
      { label: 'Content Focus', value: 'Short-Form Video' },
      { label: 'Channel', value: 'Organic SMM' }
    ],
    responsibilities: [
      'Developed and executed growth-focused social media marketing strategies',
      'Planned, scripted, and storyboarded engaging short-form content',
      'Managed content calendars and optimized distribution schedules',
      'Optimized digital social profiles to maximize organic discoverability',
      'Tracked, analyzed, and reported campaign performance metrics',
      'Collaborated with cross-functional creative teams for content production'
    ],
    skills: ['Digital Marketing', 'Content Strategy', 'Brand Growth', 'Analytics', 'Social Media'],
    outcomes: 'Improved video engagement metrics and created standard operation procedures for weekly profile audits.'
  },
  {
    id: 'exp-3',
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
    category: ['Marketing', 'Content', 'Strategy'],
    icon: 'sparkles',
    summary: 'Directed audience-focused digital campaigns reaching 400K+ people and automated content production pipelines.',
    metrics: [
      { label: 'Campaign Reach', value: '400K+' },
      { label: 'Scope', value: 'Cross-functional' }
    ],
    responsibilities: [
      'Managed and directed overall content strategy for target demographics',
      'Executed highly successful digital marketing campaigns across channels',
      'Collaborated with internal stakeholders to align content with brand objectives',
      'Built structured and automated content creation and approval workflows',
      'Supported user-acquisition initiatives for digital products',
      'Optimized marketing campaigns continuously using data-driven analytics',
      'Contributed significantly to campaigns reaching over 400,000+ people'
    ],
    skills: ['Content Strategy', 'Stakeholder Management', 'Analytics', 'Digital Campaigns', 'Automation'],
    outcomes: 'Successfully executed targeted student campaigns that maximized organic reach and achieved 400K+ impressions.'
  },
  {
    id: 'exp-4',
    company: 'BASE44 Hackathon',
    role: 'Lead Organizer & Web Platform Architect',
    duration: '2026',
    year: '2026',
    employmentType: 'Organizing Committee / Tech Lead',
    isFeatured: true,
    featuredBadge: 'Technical + Operations',
    location: 'NIAT Campus',
    logoText: 'B44',
    logoColor: 'from-purple-600 via-pink-500 to-rose-600',
    category: ['Development', 'Events', 'Leadership'],
    icon: 'code2',
    isCaseStudy: true,
    summary: 'Architected high-concurrency event portal and on-ground QR verification platform serving 1,665+ participants with 100% uptime.',
    metrics: [
      { label: 'Participants', value: '1,665+' },
      { label: 'Platform Uptime', value: '100%' }
    ],
    caseStudy: {
      problem: 'Building a highly scalable, high-performance web platform to handle thousands of registrations, secure user authentication, real-time notifications, and instant participant check-ins during on-ground peak traffic without database lockups.',
      responsibilities: [
        'Website Development: Architected the official landing page and portal using React and Tailwind CSS.',
        'Registration System: Designed backend logic and Supabase integration to handle high-concurrency requests.',
        'Participant Check-in: Built a custom QR-scanner admin dashboard for lightning-fast verification on-ground.',
        'Operations: Supervised overall infrastructure, API rates, and live queries during the hackathon.'
      ],
      techUsed: ['React', 'Supabase', 'Tailwind CSS', 'Vite', 'Framer Motion']
    },
    skills: ['Fullstack Dev', 'System Design', 'Event Operations', 'Database Management', 'QR Verification'],
    outcomes: 'Maintained 100% platform uptime and checked in all 1,665+ participants smoothly with custom QR codes.'
  },
  {
    id: 'exp-5',
    company: 'HexaVerse',
    role: 'Head of Security & Event Promotions Lead',
    duration: '2025',
    year: '2025',
    employmentType: 'Leadership',
    location: 'Hyderabad, India',
    logoText: 'HV',
    logoColor: 'from-red-500 via-rose-500 to-amber-500',
    category: ['Events', 'Leadership', 'Marketing'],
    icon: 'shield-alert',
    summary: 'Designed comprehensive event security protocols, led a 10-member security force, and drove campus promotional campaigns.',
    metrics: [
      { label: 'Security Force', value: '10 Members' },
      { label: 'Event Scale', value: 'Large Scale' }
    ],
    responsibilities: [
      'Formulated comprehensive security plans and entry/exit logistics protocols',
      'Managed crowd flows and entry queues for massive student gatherings',
      'Designed emergency evacuation plans and trained volunteers on rapid response',
      'Led promotional campaigns across campuses to maximize registrations',
      'Managed a dedicated security team and coordinated with local coordinators'
    ],
    skills: ['Security Planning', 'Crowd Management', 'Emergency Planning', 'Promotions', 'Team Leadership'],
    outcomes: 'Managed zero security incidents and coordinated smooth entry/exit flows for all attendees.'
  },
  {
    id: 'exp-6',
    company: 'Teach AI for India',
    role: 'Strategic POC',
    duration: '2025 – 2026',
    year: '2025 – 2026',
    employmentType: 'Volunteering',
    location: 'India',
    logoText: 'TAI',
    logoUrl: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1785759871/WhatsApp_Image_2026-08-03_at_5.52.31_PM_r9lnro.jpg',
    logoColor: 'from-emerald-500 via-teal-500 to-cyan-500',
    category: ['Community', 'Leadership', 'Content'],
    icon: 'globe',
    summary: 'Pioneered student-led AI literacy models, designed school curricula, and established digital impact documentation.',
    metrics: [
      { label: 'Focus Area', value: 'AI Literacy' },
      { label: 'Model', value: 'Student-Led' }
    ],
    responsibilities: [
      'Served as the primary strategic point of contact for campus volunteers',
      'Designed and executed school outreach models to introduce basic AI awareness',
      'Organized local community workshops to onboard and train student mentors',
      'Managed digital awareness drives illustrating impact stories and student progress',
      'Created introductory curriculum resources for government school outreach'
    ],
    skills: ['Student Impact', 'Leadership', 'School Outreach', 'Community Building', 'Digital Awareness'],
    gallery: [
      'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774507254/4_uffbub.jpg',
      'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774507254/2_vb5mqh.jpg',
      'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774507254/5_ywm5ps.jpg',
      'https://res.cloudinary.com/do4nuj2kh/image/upload/v1774507254/1_nft1oe.jpg'
    ],
    outcomes: 'Sensitized local schools on AI tools, fostering a student-led mentorship culture.'
  },
  {
    id: 'exp-7',
    company: 'Influencer Club NIAT',
    role: 'President',
    duration: '2024 – Present',
    year: '2024 – Present',
    employmentType: 'Leadership / President',
    isFeatured: true,
    featuredBadge: '2+ Years Leadership',
    location: 'NIAT Campus',
    logoText: 'IC',
    logoColor: 'from-amber-500 via-orange-500 to-rose-500',
    category: ['Leadership', 'Marketing', 'Content', 'Events', 'Photography'],
    icon: 'award',
    summary: 'Directed student club operations, hosted prominent creator summits (Ishan Sharma, Madhu Kiran), and led media teams.',
    metrics: [
      { label: 'Leadership', value: '2+ Years' },
      { label: 'Speaker Summits', value: 'Prominent' }
    ],
    responsibilities: [
      'Hosted elite guest speakers and top creators (e.g. Ishan Sharma, Madhu Kiran)',
      'Organized large-scale creative workshops and personal branding masterclasses',
      'Led the multi-department media, content, and photography teams',
      'Designed high-engagement content strategy and weekly social calendars',
      'Formulated departmental community initiatives to align creative output',
      'Supervised complete photography, videography, and post-production operations',
      'Conducted live LinkedIn growth, resume writing, and build-in-public workshops',
      'Organized and hosted educational podcasts spotlighting AgriTech and startup founders'
    ],
    skills: ['Public Speaking', 'Event Organizing', 'Media Management', 'Video Production', 'LinkedIn Growth'],
    gallery: [
      'https://res.cloudinary.com/do4nuj2kh/image/upload/v1763179044/WhatsApp_Image_2025-11-15_at_9.22.34_AM_vm6hrl.jpg',
      'https://res.cloudinary.com/do4nuj2kh/image/upload/v1763179680/WhatsApp_Image_2025-11-15_at_9.29.46_AM_ornq12.jpg',
      'https://res.cloudinary.com/do4nuj2kh/image/upload/v1763179044/WhatsApp_Image_2025-11-15_at_9.24.22_AM_njlqzg.jpg',
      'https://res.cloudinary.com/do4nuj2kh/image/upload/v1763179044/WhatsApp_Image_2025-11-15_at_9.21.22_AM_zywwfg.jpg'
    ],
    outcomes: 'Grew club registrations, hosted prominent creators, and trained hundreds of students on building their digital profiles.'
  }
];

// Map string icon names to Lucide elements
const ExpIcon = ({ name, className }) => {
  switch (name) {
    case 'users': return <Users className={className} />;
    case 'flame': return <Flame className={className} />;
    case 'sparkles': return <Sparkles className={className} />;
    case 'code2': return <Code2 className={className} />;
    case 'shield-alert': return <ShieldAlert className={className} />;
    case 'globe': return <Globe className={className} />;
    case 'award': return <Award className={className} />;
    default: return <Briefcase className={className} />;
  }
};

// 3. Career Stages Timeline Progression Data
const PROGRESSION_STAGES = [
  { year: '2024', label: 'Student Leadership', desc: 'President at NIAT & Creator Summits' },
  { year: '2025', label: 'Event Operations', desc: 'Security Architecture & HexaVerse' },
  { year: '2025–26', label: 'AI Literacy', desc: 'Teach AI for India Movement' },
  { year: '2026', label: 'Web Development', desc: 'BASE44 Hackathon Fullstack Portal' },
  { year: '2026', label: 'Content Strategy', desc: 'NxtWave 400K+ Reach Campaigns' },
  { year: '2026', label: 'Community Leadership', desc: 'Head of Community at Innfill' }
];

export default function ProfessionalExperience() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null); // Single card expansion
  const [lightboxImg, setLightboxImg] = useState(null);

  const filters = ['All', 'Leadership', 'Marketing', 'Community', 'Development', 'Events', 'Content', 'Photography'];

  // Toggle single card expansion
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

  // Filter and Search logic
  const filteredExperiences = useMemo(() => {
    return EXPERIENCES.filter(exp => {
      const matchesFilter = selectedFilter === 'All' || exp.category.includes(selectedFilter);
      
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesFilter;

      const matchesSearch = 
        exp.company.toLowerCase().includes(query) ||
        exp.role.toLowerCase().includes(query) ||
        exp.summary.toLowerCase().includes(query) ||
        exp.skills.some(skill => skill.toLowerCase().includes(query)) ||
        (exp.caseStudy && exp.caseStudy.techUsed.some(tech => tech.toLowerCase().includes(query))) ||
        exp.category.some(cat => cat.toLowerCase().includes(query)) ||
        exp.location.toLowerCase().includes(query) ||
        exp.duration.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [selectedFilter, searchQuery]);

  return (
    <section id="experience" className="max-w-6xl mx-auto px-4 py-20 w-full relative z-10 select-none">
      
      {/* Soft Background ambient glows */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold text-indigo-400 uppercase tracking-widest px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full inline-block shadow-sm shadow-indigo-500/10"
        >
          Career Track
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-4 font-display bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent"
        >
          Professional Experience
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light"
        >
          An interactive roadmap of community leadership, software engineering, high-growth marketing, and operational execution.
        </motion.p>
      </div>

      {/* 1. Compact Metrics Strip (Animated Counters) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-14"
      >
        <TimelineStatCounter target="2.5" suffix="+" label="Years Experience" />
        <TimelineStatCounter target="10" suffix="+" label="Organizations" />
        <TimelineStatCounter target="25" suffix="+" label="Events Managed" />
        <TimelineStatCounter target="2000" suffix="+" label="Students Impacted" />
        <TimelineStatCounter target="10" suffix="+" label="Leadership Roles" />
      </motion.div>

      {/* 2. Visual Career Progression Flow Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/5 mb-12 relative overflow-hidden"
      >
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Layers className="text-indigo-400" size={16} />
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Career Progression Flow</h3>
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">2024 &rarr; 2026</span>
        </div>

        {/* Progression Step Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {PROGRESSION_STAGES.map((stage, idx) => (
            <div 
              key={idx} 
              className="p-3 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-indigo-500/25 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-extrabold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                  {stage.year}
                </span>
                <span className="text-[9px] font-bold text-slate-600 group-hover:text-slate-400 transition">0{idx + 1}</span>
              </div>
              <h4 className="text-xs font-bold text-white leading-snug group-hover:text-indigo-300 transition">{stage.label}</h4>
              <p className="text-[9px] text-slate-400 leading-tight mt-1 line-clamp-1">{stage.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 3. Search & Pill Filters Strip */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/5 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-20 z-30 shadow-2xl backdrop-blur-xl">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input 
            type="text" 
            placeholder="Search role, skill, company..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs rounded-xl glass-input placeholder-slate-500 font-medium focus:outline-none text-white"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition p-0.5"
              aria-label="Clear search"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Scrollable Filters Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <Filter size={13} className="text-indigo-400 shrink-0 mr-1" />
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wide transition-all duration-200 border cursor-pointer whitespace-nowrap ${
                selectedFilter === filter 
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-500/20 scale-105' 
                  : 'bg-white/5 text-slate-400 border-white/5 hover:text-white hover:bg-white/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Premium Vertical Timeline Container */}
      <div className="relative pl-6 sm:pl-10 md:pl-14">
        
        {/* Glowing Continuous Timeline Line */}
        <div className="absolute left-6 sm:left-10 md:left-14 top-4 bottom-4 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-slate-900 opacity-60 pointer-events-none"></div>

        <div className="space-y-8 sm:space-y-10">
          <AnimatePresence mode="popLayout">
            {filteredExperiences.length > 0 ? (
              filteredExperiences.map((exp) => {
                const isExpanded = expandedId === exp.id;
                
                return (
                  <motion.div
                    key={exp.id}
                    layout
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="relative grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start group"
                  >
                    {/* Animated Timeline Node */}
                    <div className="absolute -left-[29px] sm:-left-[45px] md:-left-[61px] top-6 z-20 flex items-center justify-center">
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border shadow-xl transition-all duration-300 group-hover:scale-110 ${
                        exp.isCurrent 
                          ? 'bg-indigo-600 border-indigo-400 text-white shadow-indigo-500/30' 
                          : exp.isFeatured
                          ? 'bg-purple-950 border-purple-500/40 text-purple-300 shadow-purple-500/20'
                          : 'bg-slate-950 border-white/15 text-slate-400'
                      }`}>
                        <ExpIcon name={exp.icon} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      {/* Live current pulse */}
                      {exp.isCurrent && (
                        <span className="absolute -inset-1 rounded-full border border-indigo-400/60 animate-ping opacity-40 pointer-events-none"></span>
                      )}
                    </div>

                    {/* Left Column (Metadata/Year/Duration) - Desktop */}
                    <div className="lg:col-span-3 lg:text-right pt-5 select-none hidden lg:block pr-2">
                      <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 inline-block mb-1.5">
                        {exp.year}
                      </span>
                      <h4 className="text-xs font-bold text-slate-200 mb-1">
                        {exp.duration}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-semibold mb-2">
                        {exp.employmentType}
                      </p>
                      {exp.location && (
                        <div className="inline-flex items-center gap-1 text-[10px] text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded border border-white/5">
                          <MapPin size={10} className="text-indigo-400" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Clean, Interactive Experience Card */}
                    <div className={`lg:col-span-9 glass-panel rounded-3xl p-6 sm:p-7 transition-all duration-300 border flex flex-col justify-between relative overflow-hidden ${
                      exp.isFeatured
                        ? 'border-indigo-500/25 shadow-[0_0_30px_rgba(99,102,241,0.06)] bg-gradient-to-tr from-slate-950 via-slate-950 to-indigo-950/20 hover:border-indigo-500/40'
                        : 'border-white/5 hover:border-white/15 hover:shadow-[0_0_25px_rgba(255,255,255,0.02)]'
                    }`}>
                      
                      {/* Top Header Row */}
                      <div>
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          
                          {/* Company Avatar & Role Header */}
                          <div className="flex items-center gap-3.5">
                            <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${exp.logoColor || 'from-indigo-600 to-purple-600'} flex items-center justify-center text-white font-extrabold text-xs shadow-md select-none overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                              {exp.logoUrl ? (
                                <img src={exp.logoUrl} alt={`${exp.company} Logo`} className="w-full h-full object-cover" />
                              ) : (
                                exp.logoText
                              )}
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{exp.company}</span>
                                {exp.isCurrent && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                    Current
                                  </span>
                                )}
                                {exp.featuredBadge && !exp.isCurrent && (
                                  <span className="inline-block px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[9px] font-bold text-purple-300">
                                    {exp.featuredBadge}
                                  </span>
                                )}
                              </div>
                              <h3 className="text-base sm:text-lg font-extrabold text-white leading-snug mt-0.5 group-hover:text-indigo-200 transition-colors">
                                {exp.role}
                              </h3>
                            </div>
                          </div>

                          {/* Mobile Duration & Year Badges */}
                          <div className="lg:hidden text-right">
                            <span className="text-[9px] font-extrabold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 block mb-0.5">
                              {exp.duration}
                            </span>
                            <span className="text-[9px] text-slate-400 font-semibold">{exp.location}</span>
                          </div>
                        </div>

                        {/* One-Line Concise Summary */}
                        <p className="text-xs text-slate-350 leading-relaxed mb-4 font-normal">
                          {exp.summary}
                        </p>

                        {/* Impact Metrics Badges & 3 Core Skills */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5 mb-4">
                          
                          {/* Metrics Chips */}
                          <div className="flex flex-wrap gap-2">
                            {exp.metrics.map((met, mIdx) => (
                              <div key={mIdx} className="bg-slate-900/70 border border-white/5 px-2.5 py-1 rounded-xl flex items-center gap-1.5">
                                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">{met.label}:</span>
                                <span className="text-[10px] font-bold text-indigo-300">{met.value}</span>
                              </div>
                            ))}
                          </div>

                          {/* 3 Key Skills Tags */}
                          <div className="flex flex-wrap gap-1.5">
                            {exp.skills.slice(0, 3).map((skill) => (
                              <span 
                                key={skill} 
                                className="text-[9px] font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 px-2 py-0.5 rounded-lg transition-colors cursor-default"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* View Experience Action Trigger */}
                      <div>
                        <button
                          onClick={() => handleToggleExpand(exp.id)}
                          aria-expanded={isExpanded}
                          className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-indigo-650/15 border border-white/5 hover:border-indigo-500/30 text-xs font-bold text-slate-200 hover:text-white transition-all flex items-center justify-between cursor-pointer group/btn"
                        >
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                            <span>{isExpanded ? 'Collapse Details' : 'View Experience & Details'}</span>
                          </span>
                          <div className="flex items-center gap-1 text-indigo-400 group-hover/btn:translate-x-0.5 transition-transform">
                            <span className="text-[10px] font-bold uppercase">{isExpanded ? 'Close' : 'Expand'}</span>
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </div>
                        </button>
                      </div>

                      {/* Accordion Expanded Drawer */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="pt-6 mt-4 border-t border-white/10 space-y-6">
                              
                              {/* Case Study Problem & Tech Stack (for BASE44) */}
                              {exp.isCaseStudy && (
                                <div className="space-y-4">
                                  <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20">
                                    <span className="text-[9px] font-black uppercase text-indigo-400 tracking-wider bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 mb-2 inline-block">
                                      Architectural Challenge
                                    </span>
                                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                                      "{exp.caseStudy.problem}"
                                    </p>
                                  </div>

                                  <div>
                                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                                      Platform Architecture & Tech Stack
                                    </h4>
                                    <div className="flex flex-wrap gap-1.5">
                                      {exp.caseStudy.techUsed.map((tech) => (
                                        <span key={tech} className="text-[10px] text-indigo-200 font-bold bg-indigo-500/15 border border-indigo-500/25 px-2.5 py-1 rounded-lg">
                                          {tech}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Responsibilities & Key Ownership */}
                              <div>
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                  <CheckCircle2 size={12} className="text-indigo-400" />
                                  <span>Core Responsibilities & Execution</span>
                                </h4>
                                <ul className="space-y-2.5">
                                  {(exp.isCaseStudy ? exp.caseStudy.responsibilities : exp.responsibilities).map((resp, rIdx) => (
                                    <li key={rIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                                      <span>{resp}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Key Impact & Outcomes Callout */}
                              {exp.outcomes && (
                                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                                  <span className="text-[9px] font-bold uppercase text-emerald-400 tracking-wider block mb-1 flex items-center gap-1">
                                    <Check size={12} className="stroke-[3]" />
                                    <span>Key Outcome & Impact</span>
                                  </span>
                                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                                    {exp.outcomes}
                                  </p>
                                </div>
                              )}

                              {/* All Relevant Skills */}
                              <div>
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">
                                  Skills & Competencies
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                  {exp.skills.map((skill) => (
                                    <span 
                                      key={skill} 
                                      className="text-[10px] font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-lg"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Event & Work Gallery with Max 3 Preview Thumbnails */}
                              {exp.gallery && (
                                <div>
                                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                    <Camera size={12} className="text-indigo-400" />
                                    <span>Event & Work Gallery ({exp.gallery.length} Photos)</span>
                                  </h4>
                                  <div className="grid grid-cols-3 gap-2.5">
                                    {exp.gallery.slice(0, 3).map((imgUrl, imgIdx) => {
                                      const isLastAndMore = imgIdx === 2 && exp.gallery.length > 3;
                                      const extraCount = exp.gallery.length - 3;

                                      return (
                                        <div 
                                          key={imgIdx} 
                                          onClick={() => setLightboxImg(imgUrl)}
                                          className="h-20 sm:h-24 rounded-2xl overflow-hidden border border-white/10 relative group/img cursor-pointer bg-slate-900"
                                        >
                                          <img 
                                            src={imgUrl} 
                                            alt={`${exp.company} moment ${imgIdx + 1}`}
                                            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                          />
                                          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                            <Eye size={14} className="text-white" />
                                          </div>
                                          {isLastAndMore && (
                                            <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px] flex items-center justify-center text-white font-extrabold text-xs">
                                              +{extraCount} more
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                              {/* Collapse Button inside expanded state */}
                              <div className="pt-2 flex justify-end">
                                <button
                                  onClick={() => setExpandedId(null)}
                                  className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-[10px] font-bold uppercase tracking-wider transition border border-white/5 cursor-pointer"
                                >
                                  Collapse
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
              /* Empty Filter State */
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-slate-900/20 border border-dashed border-white/5 rounded-3xl"
              >
                <Briefcase className="mx-auto text-slate-500 mb-3 animate-pulse" size={28} />
                <p className="text-slate-300 text-sm font-bold mb-1">No experiences match your criteria</p>
                <p className="text-slate-500 text-xs mb-4">Try selecting a different filter category or clearing search</p>
                <button 
                  onClick={() => { setSelectedFilter('All'); setSearchQuery(''); }}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition cursor-pointer"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 5. Lightbox Modal for Photo Gallery */}
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
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-2.5 rounded-full bg-white/5 border border-white/10 cursor-pointer transition"
              aria-label="Close image preview"
            >
              <X size={20} />
            </button>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={lightboxImg} 
                alt="Enlarged experience preview" 
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl select-none"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
