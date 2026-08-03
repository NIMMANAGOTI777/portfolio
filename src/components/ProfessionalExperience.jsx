import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, Calendar, MapPin, Award, CheckCircle2, 
  ChevronDown, ChevronUp, Search, ExternalLink, Filter, 
  Users, ShieldAlert, Sparkles, FileText, Lightbulb, 
  TrendingUp, Compass, Code2, Camera, Eye, ArrowRight, X 
} from 'lucide-react';

// Animated Number Counter Component
function TimelineStatCounter({ target, label, suffix = '', duration = 1500 }) {
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    
    const targetNum = parseFloat(target);
    let start = 0;
    const frameRate = 1000 / 60; // 60fps
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

  // Format number for readability (e.g. 1665 -> 1,665, 2.5 -> 2.5)
  const isFloat = target.toString().includes('.');
  const formattedCount = isFloat 
    ? count.toFixed(1) 
    : Math.floor(count).toLocaleString();

  return (
    <div ref={ref} className="glass-panel p-4 rounded-xl text-center relative overflow-hidden group border border-white/5 hover:border-indigo-500/20 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <h4 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-1 font-display bg-gradient-to-r from-indigo-300 via-indigo-100 to-purple-300 bg-clip-text text-transparent">
        {formattedCount}{suffix}
      </h4>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
    </div>
  );
}

// Experience Data Structure
const EXPERIENCES = [
  {
    id: 'exp-1',
    company: 'Innfill',
    role: 'Head of Community',
    duration: 'July 2026 – Present',
    employmentType: 'Full-time',
    isCurrent: true,
    location: 'Hyderabad, India (Hybrid)',
    logoText: 'IF',
    logoColor: 'from-indigo-600 via-indigo-500 to-purple-600',
    category: ['Community', 'Leadership'],
    icon: 'users',
    responsibilities: [
      'Leading community growth and engagement initiatives at scale',
      'Planning high-impact workshops, networking events, and campus community programs',
      'Building and nurturing relationships with students, creators, ambassadors, and strategic partners',
      'Collaborating closely with marketing, product, and operations teams to align launch objectives',
      'Managing complete online and offline community communication and branding',
      'Tracking community engagement metrics and implementing strategies to improve overall member experience'
    ],
    skills: ['Community Growth', 'Leadership', 'Operations', 'Strategy', 'Communication'],
    metrics: [
      { label: 'Community Status', value: 'Active / Scaling' },
      { label: 'Role Level', value: 'Head' }
    ],
    outcomes: 'Pioneering structural community guidelines and initiating nationwide campus outreach to double the active ambassador base.'
  },
  {
    id: 'exp-2',
    company: 'Innfill',
    role: 'Digital Marketing Intern',
    duration: 'April 2026 – July 2026',
    employmentType: 'Internship',
    location: 'Hyderabad, India',
    logoText: 'IF',
    logoColor: 'from-blue-500 via-sky-400 to-indigo-500',
    category: ['Marketing', 'Content'],
    icon: 'trending-up',
    responsibilities: [
      'Developed and executed growth-focused social media marketing strategies',
      'Planned, scripted, and storyboarded engaging short-form content',
      'Managed content calendars and optimized distribution schedules',
      'Optimized digital social profiles to maximize organic discoverability',
      'Tracked, analyzed, and reported campaign performance metrics',
      'Collaborated with cross-functional creative teams for content production'
    ],
    skills: ['Digital Marketing', 'Content Strategy', 'Brand Growth', 'Analytics'],
    metrics: [
      { label: 'Content Type', value: 'Short-Form' },
      { label: 'Focus', value: 'Organic SMM' }
    ],
    outcomes: 'Improved video engagement metrics and created standard operation procedures for weekly profile audits.'
  },
  {
    id: 'exp-3',
    company: 'NxtWave',
    role: 'Content Strategist Intern',
    duration: 'February 2026 – June 2026',
    employmentType: 'Internship',
    location: 'Remote',
    logoText: 'NW',
    logoColor: 'from-cyan-500 via-blue-500 to-indigo-600',
    category: ['Marketing', 'Content', 'Strategy'],
    icon: 'sparkles',
    isFeatured: true, // featured card
    responsibilities: [
      'Managed and directed overall content strategy for target demographics',
      'Executed highly successful digital marketing campaigns across channels',
      'Collaborated with internal stakeholders to align content with brand objectives',
      'Built structured and automated content creation and approval workflows',
      'Supported user-acquisition initiatives for digital products',
      'Optimized marketing campaigns continuously using data-driven analytics',
      'Contributed significantly to campaigns reaching over 400,000+ people'
    ],
    skills: ['Content Strategy', 'Stakeholder Management', 'Analytics', 'Digital Campaigns'],
    metrics: [
      { label: 'Campaign Reach', value: '400K+' },
      { label: 'Stakeholder Scope', value: 'Cross-functional' }
    ],
    outcomes: 'Successfully executed targeted student campaigns that maximized organic reach and achieved 400K+ impressions.'
  },
  {
    id: 'exp-4',
    company: 'BASE44 Hackathon',
    role: 'Lead Organizer & Web Platform Architect',
    duration: '2026',
    employmentType: 'Organizing Committee',
    location: 'NIAT Campus',
    logoText: 'B44',
    logoColor: 'from-purple-600 via-pink-500 to-rose-600',
    category: ['Development', 'Events', 'Leadership'],
    icon: 'code2',
    isCaseStudy: true, // expandable case study
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
    skills: ['Fullstack Dev', 'System Design', 'Event Operations', 'Database Management'],
    metrics: [
      { label: 'Participants', value: '1665+' }
    ],
    outcomes: 'Maintained 100% platform uptime and checked in all participants smoothly with custom QR codes.'
  },
  {
    id: 'exp-5',
    company: 'HexaVerse',
    role: 'Head of Security & Event Promotions Lead',
    duration: '2025',
    employmentType: 'Leadership',
    location: 'Hyderabad, India',
    logoText: 'HV',
    logoColor: 'from-red-500 via-rose-500 to-amber-500',
    category: ['Events', 'Leadership'],
    icon: 'shield-alert',
    responsibilities: [
      'Formulated comprehensive security plans and entry/exit logistics protocols',
      'Managed crowd flows and entry queues for massive student gatherings',
      'Designed emergency evacuation plans and trained volunteers on rapid response',
      'Led promotional campaigns across campuses to maximize registrations',
      'Managed a dedicated security team and coordinated with local coordinators'
    ],
    skills: ['Security Planning', 'Crowd Management', 'Emergency Planning', 'Promotions', 'Team Leadership'],
    metrics: [
      { label: 'Security Force', value: '10 Members' },
      { label: 'Event Scale', value: 'Large Scale' }
    ],
    outcomes: 'Managed zero security incidents and coordinated smooth entry/exit flows.'
  },
  {
    id: 'exp-6',
    company: 'Teach AI for India',
    role: 'Strategic POC',
    duration: '2025 - 2026',
    employmentType: 'Volunteering',
    location: 'India',
    logoText: 'TAI',
    logoUrl: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1785759871/WhatsApp_Image_2026-08-03_at_5.52.31_PM_r9lnro.jpg',
    logoColor: 'from-emerald-500 via-teal-500 to-cyan-500',
    category: ['Community', 'Leadership'],
    icon: 'compass',
    responsibilities: [
      'Served as the primary strategic point of contact for campus volunteers',
      'Designed and executed school outreach models to introduce basic AI awareness',
      'Organized local community workshops to onboard and train student mentors',
      'Managed digital awareness drives illustrating impact stories and student progress',
      'Created introductory curriculum resources for government school outreach'
    ],
    skills: ['Student Impact', 'Leadership', 'School Outreach', 'Community Building', 'Digital Awareness'],
    metrics: [
      { label: 'Focus Area', value: 'AI Literacy' },
      { label: 'Model', value: 'Student-Led' }
    ],
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
    employmentType: 'Leadership / President',
    location: 'NIAT Campus',
    logoText: 'IC',
    logoColor: 'from-amber-500 via-orange-500 to-rose-500',
    category: ['Leadership', 'Marketing', 'Content', 'Events', 'Photography'],
    icon: 'award',
    isLargestCard: true, // largest card
    badge: '2+ Years Leadership',
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
    skills: ['Public Speaking', 'Event Organizing', 'Media Management', 'Video & Audio Production', 'LinkedIn Growth'],
    metrics: [
      { label: 'Leadership', value: '2+ Years' },
      { label: 'Event Hostings', value: 'Prominent' }
    ],
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
    case 'trending-up': return <TrendingUp className={className} />;
    case 'sparkles': return <Sparkles className={className} />;
    case 'code2': return <Code2 className={className} />;
    case 'shield-alert': return <ShieldAlert className={className} />;
    case 'compass': return <Compass className={className} />;
    case 'award': return <Award className={className} />;
    default: return <Briefcase className={className} />;
  }
};

export default function ProfessionalExperience() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCards, setExpandedCards] = useState({});
  const [lightboxImg, setLightboxImg] = useState(null);

  const filters = ['All', 'Leadership', 'Marketing', 'Community', 'Development', 'Events', 'Content', 'Photography'];

  // Toggle card expansion
  const toggleExpand = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filter and Search logic combined
  const filteredExperiences = useMemo(() => {
    return EXPERIENCES.filter(exp => {
      const matchesFilter = selectedFilter === 'All' || exp.category.includes(selectedFilter);
      
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesFilter;

      const matchesSearch = 
        exp.company.toLowerCase().includes(query) ||
        exp.role.toLowerCase().includes(query) ||
        exp.skills.some(skill => skill.toLowerCase().includes(query)) ||
        (exp.caseStudy && exp.caseStudy.techUsed.some(tech => tech.toLowerCase().includes(query))) ||
        exp.category.some(cat => cat.toLowerCase().includes(query)) ||
        exp.location.toLowerCase().includes(query) ||
        exp.duration.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [selectedFilter, searchQuery]);

  return (
    <section id="experience" className="max-w-6xl mx-auto px-4 py-20 w-full relative z-10">
      {/* Background glow graphics */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold text-indigo-400 uppercase tracking-widest px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full"
        >
          Professional Track
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-4 bg-gradient-to-r from-white via-indigo-150 to-purple-200 bg-clip-text text-transparent"
        >
          Professional Experience
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
        >
          A timeline of community building, engineering custom web platforms, driving marketing metrics, and leading student organizations.
        </motion.p>
      </div>

      {/* 1. Timeline Statistics Counters Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
        <TimelineStatCounter target="2.5" suffix=" Years" label="Experience" />
        <TimelineStatCounter target="10" suffix="+" label="Organizations" />
        <TimelineStatCounter target="25" suffix="+" label="Events Managed" />
        <TimelineStatCounter target="2000" suffix="+" label="Students Impacted" />
        <TimelineStatCounter target="10" suffix="+" label="Leadership Roles" />
      </div>

      {/* 2. Search & Filters Panel */}
      <div className="glass-panel p-6 rounded-2xl border border-white/5 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-20 z-30 shadow-xl backdrop-blur-xl">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search role, skill, company..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl glass-input placeholder-slate-500 font-semibold focus:outline-none"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Scrollable Filters Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-thin scrollbar-thumb-white/5">
          <Filter size={12} className="text-indigo-400 shrink-0 mr-1.5" />
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black tracking-wider uppercase transition border cursor-pointer whitespace-nowrap ${
                selectedFilter === filter 
                  ? 'bg-indigo-650 text-white border-indigo-500' 
                  : 'bg-white/5 text-slate-400 border-white/5 hover:text-white hover:bg-white/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Interactive Vertical Timeline */}
      <div className="relative pl-6 sm:pl-12">
        {/* Growing Timeline Vertical Line */}
        <div className="absolute left-6 sm:left-12 top-2 bottom-2 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-slate-900/10 opacity-70 pointer-events-none"></div>

        <div className="space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredExperiences.length > 0 ? (
              filteredExperiences.map((exp, idx) => {
                const isExpanded = expandedCards[exp.id] || false;
                
                return (
                  <motion.div
                    key={exp.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className={`relative grid grid-cols-1 lg:grid-cols-12 gap-4 items-start group ${
                      exp.isFeatured ? 'lg:col-span-12' : ''
                    }`}
                  >
                    {/* Node Circle on Timeline */}
                    <div className="absolute -left-[27px] sm:-left-[51px] top-4 z-20 flex items-center justify-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border shadow-lg transition-transform duration-300 group-hover:scale-110 ${
                        exp.isCurrent 
                          ? 'bg-indigo-650 border-indigo-400 text-white' 
                          : exp.isFeatured
                          ? 'bg-purple-900/60 border-purple-500/40 text-purple-300'
                          : 'bg-slate-900 border-white/10 text-slate-400'
                      }`}>
                        <ExpIcon name={exp.icon} className="w-3.5 h-3.5" />
                      </div>
                      {/* Current pulse ring */}
                      {exp.isCurrent && (
                        <span className="absolute -inset-1 rounded-full border border-indigo-500/50 animate-ping opacity-40 pointer-events-none"></span>
                      )}
                    </div>

                    {/* Left Column (Metadata/Duration) on desktop */}
                    <div className="lg:col-span-3 lg:pr-6 lg:text-right pt-4 select-none">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
                        {exp.employmentType}
                      </span>
                      <h4 className="text-xs font-black text-indigo-400 mb-2">
                        {exp.duration}
                      </h4>
                      <div className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-450 bg-slate-900/40 px-2 py-0.5 rounded border border-white/5">
                        <MapPin size={10} className="text-slate-500" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Right Column (The Card itself) */}
                    <div className={`lg:col-span-9 glass-panel p-6 sm:p-8 rounded-2xl transition-all duration-300 border flex flex-col justify-between ${
                      exp.isFeatured 
                        ? 'border-indigo-500/30 shadow-[0_0_25px_rgba(99,102,241,0.08)] bg-gradient-to-tr from-slate-950 via-slate-950 to-indigo-950/20' 
                        : 'border-white/5 hover:border-indigo-500/25 hover:shadow-[0_0_20px_rgba(99,102,241,0.05)]'
                    }`}>
                      <div>
                        {/* Card Header */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-white/5">
                          <div className="flex items-center gap-3">
                            {/* Animated Logo Container */}
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${exp.logoColor || ''} flex items-center justify-center text-white font-extrabold text-xs shadow-md select-none overflow-hidden shrink-0`}>
                              {exp.logoUrl ? (
                                <img src={exp.logoUrl} alt={`${exp.company} Logo`} className="w-full h-full object-cover" />
                              ) : (
                                exp.logoText
                              )}
                            </div>
                            <div>
                              <h3 className="text-lg font-black text-white leading-tight flex items-center gap-2">
                                {exp.role}
                                {exp.isCurrent && (
                                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                    Current
                                  </span>
                                )}
                                {exp.badge && (
                                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[9px] font-black text-amber-400 uppercase tracking-wider">
                                    {exp.badge}
                                  </span>
                                )}
                              </h3>
                              <p className="text-xs font-bold text-slate-400 mt-0.5">{exp.company}</p>
                            </div>
                          </div>

                          {/* Quick Stats Highlights */}
                          {exp.metrics && (
                            <div className="flex gap-2">
                              {exp.metrics.map((met, mIdx) => (
                                <div key={mIdx} className="bg-slate-900/60 border border-white/5 px-2.5 py-1 rounded-lg text-center">
                                  <span className="text-[10px] font-extrabold text-indigo-300 block">{met.value}</span>
                                  <span className="text-[7px] font-black uppercase tracking-wider text-slate-500 block leading-none mt-0.5">{met.label}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Expandable Case Study Layout for BASE44 */}
                        {exp.isCaseStudy ? (
                          <div className="mb-4">
                            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/10 mb-4">
                              <span className="text-[9px] font-black uppercase text-indigo-400 tracking-wider bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 mb-2 inline-block">
                                The Challenge / Problem
                              </span>
                              <p className="text-xs text-slate-350 leading-relaxed font-medium">
                                "{exp.caseStudy.problem}"
                              </p>
                            </div>
                            
                            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2.5">
                              Architectural Scope & Ownership
                            </h4>
                            <ul className="space-y-2 mb-4">
                              {exp.caseStudy.responsibilities.map((resp, rIdx) => (
                                <li key={rIdx} className="flex items-start gap-2.5">
                                  <CheckCircle2 size={12} className="text-indigo-400 shrink-0 mt-0.5" />
                                  <span className="text-slate-300 text-xs leading-relaxed font-semibold">{resp}</span>
                                </li>
                              ))}
                            </ul>

                            <div className="flex flex-wrap gap-1.5 items-center mb-4">
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mr-1.5">Stack:</span>
                              {exp.caseStudy.techUsed.map((tech) => (
                                <span key={tech} className="text-[9px] text-slate-300 font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        ) : (
                          /* Standard Responsibilities List */
                          <div className="mb-4">
                            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2.5">
                              Responsibilities & Ownership
                            </h4>
                            {/* Display first 3 by default, and expand for more */}
                            <ul className="space-y-2">
                              {exp.responsibilities.slice(0, isExpanded ? exp.responsibilities.length : 3).map((resp, rIdx) => (
                                <li key={rIdx} className="flex items-start gap-2.5">
                                  <CheckCircle2 size={12} className="text-indigo-400 shrink-0 mt-0.5" />
                                  <span className="text-slate-355 text-xs leading-relaxed font-semibold">{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Interactive Read More Expandable details */}
                        {!exp.isCaseStudy && exp.responsibilities.length > 3 && (
                          <button
                            onClick={() => toggleExpand(exp.id)}
                            className="text-xs text-indigo-400 hover:text-indigo-300 transition font-bold flex items-center gap-1 mb-4 cursor-pointer focus:outline-none"
                          >
                            <span>{isExpanded ? 'Show Less' : `Read More (+${exp.responsibilities.length - 3} Achievements)`}</span>
                            {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                          </button>
                        )}

                        {/* Extra detail outcomes revealed on expand */}
                        {isExpanded && exp.outcomes && (
                          <motion.div 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-xl bg-slate-900/40 border border-white/5 mb-4"
                          >
                            <span className="text-[9px] font-bold uppercase text-emerald-400 tracking-wider block mb-1">Key Outcome</span>
                            <p className="text-xs text-slate-400 leading-relaxed font-medium">{exp.outcomes}</p>
                          </motion.div>
                        )}

                        {/* Image Gallery previews */}
                        {exp.gallery && (
                          <div className="mb-4">
                            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2.5 flex items-center gap-1">
                              <Camera size={10} className="text-slate-500" />
                              <span>Event & Work Gallery</span>
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {exp.gallery.map((imgUrl, imgIdx) => (
                                <div 
                                  key={imgIdx} 
                                  onClick={() => setLightboxImg(imgUrl)}
                                  className="h-16 sm:h-20 rounded-xl overflow-hidden border border-white/10 relative group/img cursor-pointer"
                                >
                                  <img 
                                    src={imgUrl} 
                                    alt={`Work gallery ${imgIdx + 1}`}
                                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300 grayscale group-hover/img:grayscale-0"
                                    loading="lazy"
                                  />
                                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                    <Eye size={12} className="text-white" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Card Footer: Skills Chips */}
                      <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5 items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {exp.skills.map((skill) => (
                            <span 
                              key={skill} 
                              className="text-[9px] font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md hover:bg-indigo-500/20 transition duration-200 cursor-default select-none"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        {exp.isCaseStudy && (
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1 shrink-0 mt-2 sm:mt-0">
                            Case Study Ready <Sparkles size={8} className="text-indigo-400" />
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-slate-900/10 border border-dashed border-white/5 rounded-2xl"
              >
                <Lightbulb className="mx-auto text-slate-500 mb-3" size={24} />
                <p className="text-slate-400 text-xs font-semibold">No experiences match your filter or search query.</p>
                <button 
                  onClick={() => { setSelectedFilter('All'); setSearchQuery(''); }}
                  className="mt-4 px-4 py-2 bg-indigo-650 hover:bg-indigo-550 border border-indigo-500/20 font-bold text-white text-xs rounded-xl transition cursor-pointer"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 4. Lightbox Modal for Photo Gallery */}
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
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full bg-white/5 border border-white/10 cursor-pointer"
            >
              <X size={20} />
            </button>
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent close on card click
            >
              <img 
                src={lightboxImg} 
                alt="Enlarged view" 
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
