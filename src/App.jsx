import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ContactModal from './components/ContactModal';
import WhatsAppButton from './components/WhatsAppButton';
import KarthikAIChatbot from './components/KarthikAIChatbot';
import ProfessionalExperience from './components/ProfessionalExperience';
import AchievementsSection from './components/AchievementsSection';
import ProjectCaseStudyModal from './components/ProjectCaseStudyModal';
import { AuthProvider } from './context/AuthContext';
import { PortfolioDataProvider, usePortfolioData } from './context/PortfolioDataContext';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy-loaded routes for code-splitting and rapid initial load
const BehindTheLens = lazy(() => import('./components/BehindTheLens'));
const AdminLogin = lazy(() => import('./components/AdminLogin'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const AdminProjects = lazy(() => import('./components/admin/AdminProjects'));
const AdminAchievements = lazy(() => import('./components/admin/AdminAchievements'));
const AdminExperience = lazy(() => import('./components/admin/AdminExperience'));
const AdminServices = lazy(() => import('./components/admin/AdminServices'));
const AdminTestimonials = lazy(() => import('./components/admin/AdminTestimonials'));
const AdminCertifications = lazy(() => import('./components/admin/AdminCertifications'));
const AdminSpeaking = lazy(() => import('./components/admin/AdminSpeaking'));
const AdminMediaLibrary = lazy(() => import('./components/admin/AdminMediaLibrary'));
const AdminInquiries = lazy(() => import('./components/admin/AdminInquiries'));
const AdminLeadsWrapper = lazy(() => import('./components/admin/AdminLeadsWrapper'));
const AdminHomepage = lazy(() => import('./components/admin/AdminHomepage'));
const AdminSEO = lazy(() => import('./components/admin/AdminSEO'));
const AdminSocialLinks = lazy(() => import('./components/admin/AdminSocialLinks'));
const AdminSettings = lazy(() => import('./components/admin/AdminSettings'));
const AdminProfile = lazy(() => import('./components/admin/AdminProfile'));
import { 
  STATS, SERVICE_CATEGORIES, WORK_WITH_ME_SERVICES, WHY_WORK_WITH_ME, 
  COLLABORATIONS, PROJECTS, TEACH_AI_DATA, CERTIFICATIONS, 
  TESTIMONIAL, FAQS, CURRENTLY_WORKING_ON 
} from './lib/portfolioData';
import { 
  Mail, ArrowRight, Layers, Award, 
  Users, Calendar, FileText, 
  ChevronDown, ChevronUp, ChevronRight, 
  ArrowUpRight, X, Globe, Palette, TrendingUp, PenTool, Video, Check, Menu, Sparkles, Camera, ShieldCheck
} from 'lucide-react';

// Verified Roles list for Typewriter
const ROLES = [
  "Community Builder",
  "Creative Strategist",
  "Web Developer",
  "Event Architect"
];

// Verified Trust Organizations & Collaborators for Credibility Strip
const CREDIBILITY_PARTNERS = [
  { name: 'PanIIT Andhra Pradesh', label: 'Summit 2026' },
  { name: 'NxtWave (NIAT)', label: 'Ecosystem' },
  { name: 'Innfill', label: 'Community' },
  { name: 'BASE44', label: 'Hackathon' },
  { name: 'Teach AI for India', label: 'Social Impact' },
  { name: 'Youth Governance Forum', label: 'Policy 2047' },
  { name: 'Sid\'s Farm', label: 'AgriTech Podcast' },
  { name: 'Dr. B.R. Ambedkar Kala Vedika', label: 'Venue' },
];

// Service Icon Mapper Component
function ServiceIcon({ iconName, size = 18 }) {
  switch (iconName) {
    case 'globe': return <Globe size={size} />;
    case 'palette': return <Palette size={size} />;
    case 'calendar': return <Calendar size={size} />;
    case 'trending-up': return <TrendingUp size={size} />;
    case 'pen-tool': return <PenTool size={size} />;
    case 'award': return <Award size={size} />;
    case 'video': return <Video size={size} />;
    case 'layers': return <Layers size={size} />;
    default: return <Sparkles size={size} />;
  }
}

// 1. Animated Number Counter Component
function AnimatedCounter({ target, label, suffix }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
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

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    
    let start = 0;
    const duration = 1200;
    const frameRate = 1000 / 60;
    const totalFrames = duration / frameRate;
    const increment = target / totalFrames;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [hasStarted, target]);

  return (
    <div 
      ref={elementRef} 
      className="p-6 sm:p-7 rounded-3xl bg-[#171717] border border-white/10 hover:border-[#FF5A1F]/40 transition-all duration-300 relative overflow-hidden group shadow-lg"
    >
      <div className="absolute top-0 right-0 w-28 h-28 bg-[#FF5A1F]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#FF5A1F]/10 transition-colors"></div>
      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-1.5 font-display tracking-tight">
        <span className="text-white">{count}</span>
        <span className="text-[#FF5A1F]">{suffix}</span>
      </h3>
      <p className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
    </div>
  );
}

// 2. FAQ Accordion Item Component
function FAQItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl bg-[#171717] overflow-hidden border border-white/10 hover:border-white/20 transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 sm:px-6 py-4 sm:py-5 flex justify-between items-center text-left focus:outline-none transition cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="font-bold text-slate-200 text-sm sm:text-base">{faq.question}</span>
        <ChevronDown 
          size={18} 
          className={`text-slate-400 transition-transform duration-300 shrink-0 ml-3 ${isOpen ? 'transform rotate-180 text-[#FF5A1F]' : ''}`} 
        />
      </button>
      <div 
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{ maxHeight: isOpen ? '260px' : '0px' }}
      >
        <div className="px-5 sm:px-6 pb-5 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-3.5 bg-[#121212]/50 font-light">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

// 3. Home View Component
function Home() {
  const { 
    publicProjects, 
    publicSpeakingEvents, 
    publicCertifications, 
    publicTestimonials,
  } = usePortfolioData();

  const displayedProjects = publicProjects?.length > 0 ? publicProjects : PROJECTS;
  const displayedCollaborations = publicSpeakingEvents?.length > 0 ? publicSpeakingEvents : COLLABORATIONS;
  const displayedCertifications = publicCertifications?.length > 0 ? publicCertifications : CERTIFICATIONS;
  const displayedTestimonial = publicTestimonials?.[0] || TESTIMONIAL;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState('Hire Me');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [teachAIExpanded, setTeachAIExpanded] = useState(false);

  // Typewriter Effect
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Detail Modal Event Selection
  const [selectedCollab, setSelectedCollab] = useState(null);

  // Featured Project Case Study Modal
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [caseStudyInitialView, setCaseStudyInitialView] = useState('study');

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setSelectedCert(null);
        setLightboxImage(null);
        setSelectedCollab(null);
        setSelectedCaseStudy(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    let timer;
    const currentRole = ROLES[roleIndex];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(prev => prev.substring(0, prev.length - 1));
      }, 45);
    } else {
      timer = setTimeout(() => {
        setCurrentText(prev => currentRole.substring(0, prev.length + 1));
      }, 75);
    }
    
    if (!isDeleting && currentText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 2100);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setRoleIndex(prev => (prev + 1) % ROLES.length);
    }
    
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  // Currently Working On Typewriter
  const [workingIndex, setWorkingIndex] = useState(0);
  const [workingText, setWorkingText] = useState("");
  const [workingDeleting, setWorkingDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentFocus = CURRENTLY_WORKING_ON[workingIndex];
    
    if (workingDeleting) {
      timer = setTimeout(() => {
        setWorkingText(prev => prev.substring(0, prev.length - 1));
      }, 35);
    } else {
      timer = setTimeout(() => {
        setWorkingText(prev => currentFocus.substring(0, prev.length + 1));
      }, 65);
    }
    
    if (!workingDeleting && workingText === currentFocus) {
      timer = setTimeout(() => setWorkingDeleting(true), 2300);
    } else if (workingDeleting && workingText === "") {
      setWorkingDeleting(false);
      setWorkingIndex(prev => (prev + 1) % CURRENTLY_WORKING_ON.length);
    }
    
    return () => clearTimeout(timer);
  }, [workingText, workingDeleting, workingIndex]);

  const openContactWithPurpose = (purpose) => {
    setSelectedPurpose(purpose);
    setModalOpen(true);
  };

  const toggleCategory = (catId) => {
    setExpandedCategory(prev => (prev === catId ? null : catId));
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white flex flex-col relative selection:bg-[#FF5A1F] selection:text-white">
      
      {/* Background ambient warm glows */}
      <div className="glow-orange top-0 left-1/4 pointer-events-none opacity-40"></div>
      <div className="glow-red top-[40%] right-10 pointer-events-none opacity-30"></div>
      <div className="glow-orange bottom-40 left-10 pointer-events-none opacity-30"></div>

      {/* Floating Navigation Header */}
      <header className="sticky top-0 z-40 w-full pt-3 px-3 sm:px-6">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 rounded-2xl bg-[#171717]/85 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#about" className="flex items-center gap-2 group">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] group-hover:scale-125 transition-transform duration-300"></span>
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-white font-display">
              Karthik Nimmanagoti
            </span>
          </a>
          
          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="#about" className="text-xs text-slate-300 hover:text-white transition font-medium">About</a>
            <a href="#work-with-me" className="text-xs text-slate-300 hover:text-white transition font-medium">Services</a>
            <a href="#experience" className="text-xs text-slate-300 hover:text-white transition font-medium">Experience</a>
            <a href="#achievements" className="text-xs text-slate-300 hover:text-white transition font-medium">Achievements</a>
            <a href="#projects" className="text-xs text-slate-300 hover:text-white transition font-medium">Projects</a>
            <a href="#collaborations" className="text-xs text-slate-300 hover:text-white transition font-medium">Collaborations</a>
            
            <a 
              href="https://kar-thikexe.vercel.app/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#FFA87D] hover:text-white font-bold bg-[#FF5A1F]/10 border border-[#FF5A1F]/25 px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-sm"
              title="Karthik.exe Photography Portfolio"
            >
              <Camera size={13} className="text-[#FF5A1F]" />
              <span>Behind the Lens</span>
            </a>
            
            <button
              onClick={() => openContactWithPurpose('Hire Me')}
              className="px-4 py-2 text-xs bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] hover:from-[#FF7A18] hover:to-[#D9361E] font-bold text-white rounded-xl shadow-md shadow-[#FF5A1F]/20 transition cursor-pointer ml-1"
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white p-1.5 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 max-w-6xl mx-auto p-4 bg-[#171717] border border-white/10 rounded-2xl flex flex-col gap-3 shadow-2xl backdrop-blur-xl animate-scale-in">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-xs text-slate-200 hover:text-white transition font-semibold py-1">About</a>
            <a href="#work-with-me" onClick={() => setMobileMenuOpen(false)} className="text-xs text-slate-200 hover:text-white transition font-semibold py-1">Services</a>
            <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="text-xs text-slate-200 hover:text-white transition font-semibold py-1">Experience</a>
            <a href="#achievements" onClick={() => setMobileMenuOpen(false)} className="text-xs text-slate-200 hover:text-white transition font-semibold py-1">Achievements</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-xs text-slate-200 hover:text-white transition font-semibold py-1">Projects</a>
            <a href="#collaborations" onClick={() => setMobileMenuOpen(false)} className="text-xs text-slate-200 hover:text-white transition font-semibold py-1">Collaborations</a>
            <a 
              href="https://kar-thikexe.vercel.app/" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-[#FFA87D] font-bold transition flex items-center gap-2 py-1"
            >
              <Camera size={14} className="text-[#FF5A1F]" />
              <span>Behind the Lens (Photography)</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openContactWithPurpose('Hire Me');
              }}
              className="mt-1 w-full py-2.5 text-xs bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] font-bold text-white rounded-xl shadow-md transition cursor-pointer text-center"
            >
              Let's Talk
            </button>
          </div>
        )}
      </header>

      {/* Hero Section — Inspired by FolioBlox Creative Director Reference */}
      <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-14 w-full relative z-10">
        
        {/* Large Rounded Container with Warm Radial Backdrop */}
        <div className="relative rounded-[2.5rem] bg-gradient-to-b from-[#1C1412] via-[#141414] to-[#111111] border border-white/10 p-6 sm:p-10 md:p-14 overflow-hidden shadow-2xl">
          
          {/* Internal Radiant Gradient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-gradient-to-b from-[#FF5A1F]/20 via-[#D9361E]/10 to-transparent blur-3xl pointer-events-none rounded-full -mt-20"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            
            {/* Top Eyebrow Tag */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FF5A1F]/15 border border-[#FF5A1F]/30 text-[#FFA87D] text-[11px] font-black uppercase tracking-widest">
                <Sparkles size={11} className="text-[#FF5A1F]" />
                <span>PORTFOLIO 2026</span>
              </span>
              <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[11px] font-bold uppercase tracking-wider">
                HYDERABAD, INDIA
              </span>
            </div>

            {/* Main Editorial Display Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 leading-[1.05] text-white font-display">
              KARTHIK <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFA87D] to-[#FF5A1F]">
                NIMMANAGOTI
              </span>
            </h1>

            {/* Typewriter Positioning Strip */}
            <div className="h-[36px] mb-4 flex justify-center items-center">
              <p className="text-base sm:text-xl md:text-2xl text-slate-300 font-light">
                <span className="font-semibold text-white tracking-wide">
                  {currentText}
                </span>
                <span className="cursor-blink ml-1"></span>
              </p>
            </div>

            {/* Supporting Mission Statement */}
            <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-7 font-light">
              "I build communities, digital experiences, events, and content that turn ideas into impact."
            </p>

            {/* Live Status Radar Indicator */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#171717] border border-white/10 text-xs text-slate-300 shadow-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5A1F] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF7A18]"></span>
                </span>
                <span className="font-extrabold text-slate-400 uppercase tracking-widest text-[9px] border-r border-white/10 pr-2.5">
                  CURRENTLY
                </span>
                <span className="font-bold text-[#FFA87D]">
                  {workingText}
                </span>
              </div>
            </div>

            {/* Editorial Portrait Frame */}
            <div className="mb-8 relative inline-block group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5A1F] to-[#D9361E] rounded-full blur-2xl opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-full p-2 bg-[#171717] border border-white/15 shadow-2xl overflow-hidden group-hover:border-[#FF5A1F]/50 transition-colors duration-300">
                <img 
                  src="https://res.cloudinary.com/do4nuj2kh/image/upload/v1783330744/WhatsApp_Image_2026-07-01_at_7.32.30_PM_vbhtly.jpg"
                  alt="Karthik Nimmanagoti" 
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
              </div>
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <button
                onClick={() => openContactWithPurpose('Hire Me')}
                className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] hover:from-[#FF7A18] hover:to-[#D9361E] text-white text-xs sm:text-sm font-bold rounded-xl transition shadow-lg shadow-[#FF5A1F]/25 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Let's Connect</span>
                <ArrowRight size={14} />
              </button>
              
              <a
                href="https://docs.google.com/document/d/1-krzGfTO1S0r_-o3d9VJGWPw3uuskL9JtvvCC1dPCek/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-[#171717] hover:bg-[#202020] border border-white/10 text-slate-200 text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer"
              >
                <FileText size={14} className="text-[#FF7A18]" />
                <span>View Resume</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Trust & Credibility Strip Beneath Hero */}
      <section className="w-full border-y border-white/10 bg-[#111111]/70 py-6 relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-3 flex items-center justify-between">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-[#FF5A1F]" />
            <span>Verified Organizations, Summits & Platforms</span>
          </span>
          <span className="text-[10px] font-medium text-slate-500 hidden sm:inline-block">
            Documented Experience
          </span>
        </div>

        {/* Marquee Row */}
        <div className="overflow-hidden no-scrollbar w-full py-1">
          <div className="animate-marquee flex items-center gap-6 sm:gap-10">
            {[...CREDIBILITY_PARTNERS, ...CREDIBILITY_PARTNERS].map((partner, pIdx) => (
              <div 
                key={pIdx} 
                className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#171717] border border-white/5 shrink-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]"></span>
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                  {partner.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono bg-white/5 px-2 py-0.5 rounded">
                  {partner.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial About Section (2-Column Presentation) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <span className="text-[11px] font-bold text-[#FF7A18] uppercase tracking-widest px-3 py-1 bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 rounded-full inline-block">
              01 — ABOUT ME
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] font-display">
              Bridging Technology, Community, and Design to Deliver Real Impact.
            </h2>
            
            <div className="space-y-4 text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
              <p>
                I am a student leader, web developer, and creative strategist who thrives at the intersection of product architecture, community building, and event operations.
              </p>
              <p>
                My journey spans serving as President of the Influencers Club at NIAT, organizing and securing flagship campus summits, designing physical and digital visual communications for the state-level PanIIT Andhra Pradesh Summit 2026, and architecting platform infrastructure for 1,665+ hackathon participants with 100% uptime.
              </p>
              <p>
                Through initiatives like Teach AI for India, I lead grassroots workshops bringing technology exposure to government school students — because real leadership means opening doors for others.
              </p>
            </div>

            {/* Quick Core Strengths Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
              {[
                'Fullstack Web Architecture',
                'Community Building & Scaling',
                'Event Operations & Security',
                'Visual Branding & Figma',
                'Social Media & Storytelling',
                'Technical Mentorship'
              ].map((strength, sIdx) => (
                <div key={sIdx} className="p-3 rounded-xl bg-[#171717] border border-white/5 flex items-center gap-2">
                  <Check size={13} className="text-[#FF5A1F] shrink-0" />
                  <span className="text-[11px] text-slate-200 font-medium leading-snug">{strength}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Professional Summary Card & Values */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#171717] border border-white/10 space-y-5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#FF5A1F]/10 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10"></div>
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-[10px] font-extrabold uppercase text-[#FF7A18] tracking-wider">Professional Profile</span>
                <span className="text-[10px] font-bold text-slate-400">NIAT / NxtWave</span>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white font-display">
                  Execution-First Mindset
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  "Whether building a web application, executing an on-ground event with hundreds of attendees, or designing large-format venue graphics, I manage every phase from concept to delivery."
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <div className="flex justify-between text-xs py-1">
                  <span className="text-slate-400">Current Role</span>
                  <span className="text-white font-semibold">Head of Community, Innfill</span>
                </div>
                <div className="flex justify-between text-xs py-1">
                  <span className="text-slate-400">Location</span>
                  <span className="text-white font-semibold">Hyderabad, India</span>
                </div>
                <div className="flex justify-between text-xs py-1">
                  <span className="text-slate-400">Primary Focus</span>
                  <span className="text-[#FF7A18] font-semibold">Community, Web & Events</span>
                </div>
              </div>

              <button
                onClick={() => openContactWithPurpose('Hire Me')}
                className="w-full py-3 bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] hover:from-[#FF7A18] hover:to-[#D9361E] text-white text-xs font-bold rounded-xl transition shadow-md shadow-[#FF5A1F]/20 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                <span>Connect with Karthik</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Impact Statistics Row */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {STATS.map(stat => (
            <AnimatedCounter 
              key={stat.id} 
              target={stat.target} 
              label={stat.label} 
              suffix={stat.suffix} 
            />
          ))}
        </div>
      </section>

      {/* 01 — WORK WITH ME (Categorized Services) */}
      <section id="work-with-me" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full relative z-10">
        <div className="text-center mb-14">
          <span className="text-[11px] font-bold text-[#FF7A18] uppercase tracking-widest px-3 py-1 bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 rounded-full inline-block mb-3">
            01 — SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
            Work With Me
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mt-2.5 font-light">
            I help startups, creators, businesses, and student communities build impactful digital products, brand growth, and events.
          </p>
        </div>

        {/* 3 Core Service Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {SERVICE_CATEGORIES.map((category) => {
            const isCategoryExpanded = expandedCategory === category.id;
            const categoryServices = WORK_WITH_ME_SERVICES.filter(s => category.serviceIds.includes(s.id));

            return (
              <div 
                key={category.id} 
                className={`rounded-3xl p-6 sm:p-7 transition-all duration-300 border flex flex-col justify-between relative overflow-hidden ${
                  isCategoryExpanded ? 'bg-[#1C1C1C] border-[#FF5A1F]/40 shadow-xl' : 'bg-[#171717] border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-extrabold text-[#FF7A18] uppercase tracking-widest bg-[#FF5A1F]/15 px-2.5 py-0.5 rounded-full border border-[#FF5A1F]/30">
                      CATEGORY {category.categoryNum}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{categoryServices.length} Services</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-white mb-1.5 font-display">{category.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-5 font-light">{category.description}</p>

                  {/* Included Services Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {category.servicesIncluded.map((sName) => (
                      <span key={sName} className="text-[10px] font-medium text-slate-300 bg-[#222222] border border-white/5 px-2.5 py-1 rounded-lg">
                        {sName}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Explore / View Services Trigger */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  aria-expanded={isCategoryExpanded}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#222222] hover:bg-[#2A2A2A] border border-white/10 text-xs font-bold text-slate-200 hover:text-white transition flex items-center justify-between cursor-pointer"
                >
                  <span>{isCategoryExpanded ? 'Collapse Services' : 'Explore Services'}</span>
                  {isCategoryExpanded ? <ChevronUp size={14} className="text-[#FF5A1F]" /> : <ChevronDown size={14} className="text-[#FF5A1F]" />}
                </button>

                {/* Expanded Individual Services Modal / Drawer */}
                {isCategoryExpanded && (
                  <div className="pt-6 mt-4 border-t border-white/10 space-y-4">
                    {categoryServices.map((srv) => (
                      <div key={srv.id} className="p-4 rounded-2xl bg-[#111111] border border-white/5">
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className="w-7 h-7 rounded-lg bg-[#FF5A1F]/15 text-[#FF7A18] flex items-center justify-center shrink-0">
                            <ServiceIcon iconName={srv.icon} size={15} />
                          </div>
                          <h4 className="text-xs font-bold text-white">{srv.title}</h4>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed mb-3">{srv.description}</p>

                        <div className="space-y-1 mb-3">
                          {srv.services.map((item, idx) => (
                            <div key={idx} className="text-[10px] text-slate-300 flex items-start gap-1.5">
                              <span className="text-[#FF5A1F] select-none">•</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        {srv.techStack && (
                          <div className="flex flex-wrap gap-1 mb-3 pt-2 border-t border-white/5">
                            {srv.techStack.map(t => (
                              <span key={t} className="text-[9px] text-[#FFA87D] bg-[#FF5A1F]/10 px-2 py-0.5 rounded border border-[#FF5A1F]/20 font-medium">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        {srv.id === 'photography' ? (
                          <a
                            href="https://kar-thikexe.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-1.5 bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] text-white text-[10px] font-bold rounded-lg transition flex items-center justify-center gap-1 shadow-sm"
                          >
                            <span>View Photography Portfolio</span>
                            <ArrowUpRight size={11} />
                          </a>
                        ) : (
                          <button
                            onClick={() => openContactWithPurpose(srv.title)}
                            className="w-full py-1.5 bg-[#252525] hover:bg-[#303030] border border-white/10 text-white text-[10px] font-bold rounded-lg transition flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <span>Inquire for {srv.title}</span>
                            <ArrowRight size={11} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 02 — WHY WORK WITH ME (Compact Feature Row) */}
        <div className="p-6 sm:p-9 rounded-3xl bg-[#171717] border border-white/10 relative overflow-hidden shadow-xl">
          <div className="max-w-3xl mb-6">
            <span className="text-[10px] font-bold text-[#FF7A18] uppercase tracking-widest bg-[#FF5A1F]/10 px-2.5 py-0.5 rounded-full border border-[#FF5A1F]/20 inline-block mb-2">
              VALUE PROPOSITION
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
              Why Work With Me?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-1 font-light">
              "I combine design, development, content, community, and event leadership to take ideas from planning to execution."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {WHY_WORK_WITH_ME.map((strength, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#111111] border border-white/5 flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                  <Check size={12} className="stroke-[3]" />
                </div>
                <p className="text-slate-300 text-xs font-medium leading-snug">
                  {strength}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — PROFESSIONAL EXPERIENCE */}
      <ProfessionalExperience />

      {/* 04 — COLLEGE ACHIEVEMENTS */}
      <section id="achievements" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[11px] font-bold text-[#FF7A18] uppercase tracking-widest px-3 py-1 bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 rounded-full inline-block mb-3">
            04 — RECOGNITION
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
            College Achievements
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mt-2.5 font-light">
            Milestones, presidential honors, governance policy wins, and creative recognitions.
          </p>
        </div>

        <AchievementsSection />
      </section>

      {/* 05 — SELECTED WORK / TECHNICAL SHOWCASES */}
      <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full relative z-10">
        <div className="text-center mb-14">
          <span className="text-[11px] font-bold text-[#FF7A18] uppercase tracking-widest px-3 py-1 bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 rounded-full inline-block mb-3">
            05 — SELECTED WORK
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
            Technical Showcases & Freelance Work
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mt-2.5 font-light">
            Government event visual identities, production platforms, and scalable digital systems built for real impact.
          </p>
        </div>

        {/* Featured Project Showcase Card (PanIIT Andhra Pradesh Summit 2026) */}
        {displayedProjects.filter(p => p.featured).map((proj, fIdx) => (
          <div 
            key={`featured-${fIdx}`}
            className="p-6 sm:p-9 md:p-10 rounded-[2.5rem] bg-[#171717] border border-[#FF5A1F]/30 hover:border-[#FF5A1F]/50 transition-all duration-500 shadow-2xl relative overflow-hidden group mb-10"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5A1F]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Details Column */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF7A18] bg-[#FF5A1F]/15 border border-[#FF5A1F]/30 px-3 py-1 rounded-full">
                      {proj.eyebrow || 'FEATURED PROJECT'}
                    </span>
                    {proj.badgeSecondary && (
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full">
                        {proj.badgeSecondary}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white group-hover:text-[#FFA87D] transition-colors mb-1.5 font-display">
                    {proj.title}
                  </h3>
                  <p className="text-[#FF7A18] text-xs sm:text-sm font-semibold mb-3">
                    {proj.sub}
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5 font-light">
                    {proj.desc}
                  </p>

                  {/* Tags Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {proj.tags?.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] sm:text-[11px] text-slate-200 font-medium bg-[#222222] border border-white/10 px-2.5 py-1 rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Result & Impact Callout */}
                  <div className="p-4 rounded-2xl bg-[#111111] border border-white/5 mb-6 flex items-start gap-2.5">
                    <Check size={14} className="text-emerald-400 stroke-[3] mt-0.5 shrink-0" />
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">
                      <span className="text-slate-400 font-bold uppercase text-[9px] block">Result & Execution</span>
                      {proj.result}
                    </p>
                  </div>
                </div>

                {/* Primary & Secondary Action CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button 
                    onClick={() => {
                      setSelectedCaseStudy(proj);
                      setCaseStudyInitialView('study');
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] hover:from-[#FF7A18] hover:to-[#D9361E] text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg shadow-[#FF5A1F]/20 cursor-pointer"
                  >
                    <span>{proj.actionLabel || 'VIEW CASE STUDY →'}</span>
                  </button>

                  <button 
                    onClick={() => {
                      setSelectedCaseStudy(proj);
                      setCaseStudyInitialView('gallery');
                    }}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#252525] hover:bg-[#303030] border border-white/10 text-slate-200 hover:text-white font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer"
                  >
                    <span>{proj.secondaryActionLabel || 'VIEW GALLERY →'}</span>
                  </button>
                </div>
              </div>

              {/* Right Preview Image Column */}
              <div 
                onClick={() => {
                  setSelectedCaseStudy(proj);
                  setCaseStudyInitialView('study');
                }}
                className="lg:col-span-5 h-72 sm:h-88 rounded-3xl overflow-hidden border border-white/10 relative group/img cursor-pointer bg-[#111111] shadow-2xl"
              >
                <img 
                  src={proj.image} 
                  alt={`${proj.title} preview`} 
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-[#171717]/90 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-bold text-slate-200 truncate">On-Ground Event Documentation</span>
                  <span className="text-[10px] font-bold text-[#FF7A18] flex items-center gap-1 shrink-0">
                    <span>Explore Case Study</span>
                    <ArrowUpRight size={11} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Regular Projects 2-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {displayedProjects.filter(p => !p.featured).map((proj, idx) => (
            <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-[#171717] border border-white/10 hover:border-[#FF5A1F]/40 transition-all duration-300 flex flex-col justify-between group shadow-lg">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[9px] font-extrabold uppercase text-[#FF7A18] tracking-wider bg-[#FF5A1F]/15 px-2.5 py-0.5 rounded-full border border-[#FF5A1F]/30">
                    {proj.tag}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#FFA87D] transition-colors mb-1 font-display">
                  {proj.title}
                </h3>
                <p className="text-slate-400 text-xs font-semibold mb-3">{proj.sub}</p>
                <p className="text-slate-300 text-xs leading-relaxed mb-4 font-light">{proj.desc}</p>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {(proj.tech || proj.technologies || proj.tags || []).map((t, tIdx) => (
                    <span key={tIdx} className="text-[10px] text-slate-300 font-medium bg-[#222222] border border-white/5 px-2.5 py-0.5 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Impact / Result Callout */}
                <div className="p-3.5 rounded-xl bg-[#111111] border border-white/5 mb-5 flex items-start gap-2">
                  <Check size={13} className="text-emerald-400 stroke-[3] mt-0.5 shrink-0" />
                  <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                    <span className="text-slate-400 font-bold uppercase text-[9px] block">Result & Impact</span>
                    {proj.result}
                  </p>
                </div>
              </div>

              <a 
                href={proj.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 bg-[#252525] hover:bg-[#303030] border border-white/10 hover:border-[#FF5A1F]/40 text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                <span>{proj.actionLabel || 'View Project'}</span>
                <ArrowUpRight size={13} className="text-[#FF5A1F]" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 06 — COLLABORATIONS (People, Events & Conversations) */}
      <section id="collaborations" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full relative z-10">
        <div className="text-center mb-14">
          <span className="text-[11px] font-bold text-[#FF7A18] uppercase tracking-widest px-3 py-1 bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 rounded-full inline-block mb-3">
            06 — COLLABORATIONS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
            People, Events & Conversations
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mt-2.5 font-light">
            People I've hosted, collaborated with, and experiences I've helped bring to life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedCollaborations.map((collab) => (
            <div 
              key={collab.id} 
              onClick={() => setSelectedCollab(collab)}
              className="p-0 rounded-3xl overflow-hidden bg-[#171717] hover:border-[#FF5A1F]/40 transition-all duration-300 border border-white/10 cursor-pointer group flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="h-48 overflow-hidden relative bg-[#111111]">
                  <img 
                    src={collab.img} 
                    alt={collab.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent"></div>
                  <span className="absolute top-3 left-3 bg-[#FF5A1F] text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {collab.category || collab.tag}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FFA87D] transition-colors">
                    {collab.title}
                  </h3>
                  <p className="text-slate-400 text-[11px] font-mono mb-2">{collab.date}</p>
                  <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed font-light">{collab.desc}</p>
                </div>
              </div>
              
              <div className="px-5 pb-5 pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-slate-400">{collab.attendees}</span>
                <span className="text-xs text-[#FF7A18] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>View Details</span>
                  <ArrowUpRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 07 — TEACH AI FOR INDIA (Impact Case Study) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full relative z-10">
        <div className="p-6 sm:p-10 rounded-[2.5rem] bg-[#171717] border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="text-[10px] font-extrabold uppercase text-[#FF7A18] tracking-wider bg-[#FF5A1F]/15 px-3 py-1 rounded-full border border-[#FF5A1F]/30">
              07 — SOCIAL IMPACT
            </span>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Grassroots Movement
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 font-display">
            Teach AI for India
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed mb-6 font-light">
            "{TEACH_AI_DATA.headline}"
          </p>

          {/* Impact Stats Row */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
            {TEACH_AI_DATA.metrics.map((m, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-[#111111] border border-white/5 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  {m.value}
                </div>
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Two-Column Structure: Responsibilities vs Impact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#111111] border border-white/5 space-y-3">
              <h4 className="text-xs font-bold text-[#FFA87D] uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]"></span>
                <span>My Role & What I Own (Strategic POC)</span>
              </h4>
              <ul className="space-y-2">
                {TEACH_AI_DATA.ownership.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                    <span className="text-[#FF5A1F] select-none">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#111111] border border-white/5 space-y-3">
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>The Community Impact</span>
              </h4>
              <ul className="space-y-2">
                {TEACH_AI_DATA.impact.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                    <span className="text-emerald-400 select-none">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Gallery Thumbnails */}
          <div className="mb-6">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Camera size={12} className="text-[#FF5A1F]" />
              <span>School Outreach Moments ({TEACH_AI_DATA.images.length} Photos)</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {TEACH_AI_DATA.images.map((imgUrl, imgIdx) => (
                <div 
                  key={imgIdx} 
                  onClick={() => setLightboxImage(imgUrl)}
                  className="h-24 sm:h-28 rounded-2xl overflow-hidden border border-white/10 relative group/img cursor-pointer bg-[#111111]"
                >
                  <img 
                    src={imgUrl} 
                    alt={`Teach AI for India moment ${imgIdx + 1}`}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Expandable Full Story */}
          <div className="pt-2 flex justify-between items-center">
            <button
              onClick={() => setTeachAIExpanded(!teachAIExpanded)}
              className="text-xs font-bold text-[#FF7A18] hover:text-[#FFA87D] transition flex items-center gap-1 cursor-pointer"
            >
              <span>{teachAIExpanded ? 'Hide Detailed Story' : 'Read the Full Story →'}</span>
              {teachAIExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
          </div>

          {teachAIExpanded && (
            <div className="mt-6 pt-5 border-t border-white/10 space-y-4 text-left">
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {TEACH_AI_DATA.fullStory.description}
              </p>
              <p className="text-xs text-slate-400 italic border-l-2 border-[#FF5A1F] pl-3">
                "{TEACH_AI_DATA.fullStory.reflection}"
              </p>
              <div className="p-3.5 rounded-xl bg-[#111111] border border-white/10 text-[11px] text-slate-400 leading-relaxed">
                <span className="font-bold text-[#FFA87D] uppercase text-[9px] block mb-0.5">Acknowledgements</span>
                {TEACH_AI_DATA.fullStory.thanks}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 08 — BEHIND THE LENS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full relative z-10">
        <div className="p-6 sm:p-10 md:p-12 rounded-[2.5rem] bg-[#171717] border border-white/10 relative overflow-hidden group shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] font-extrabold uppercase text-[#FF7A18] tracking-wider bg-[#FF5A1F]/15 px-3 py-1 rounded-full border border-[#FF5A1F]/30 inline-block">
                08 — VISUAL ARTS
              </span>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight font-display">
                Behind the Lens
              </h2>
              
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                "A visual side of my work — photography, storytelling and moments captured through my lens."
              </p>
              
              <div className="pt-2">
                <a
                  href="https://kar-thikexe.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] hover:from-[#FF7A18] hover:to-[#D9361E] text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg shadow-[#FF5A1F]/20 cursor-pointer"
                >
                  <span>Enter Cinematic Gallery</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
            
            {/* Right Graphic Preview */}
            <div className="lg:col-span-6 grid grid-cols-3 gap-2.5">
              <div className="space-y-2.5">
                <div className="h-28 sm:h-32 rounded-2xl overflow-hidden border border-white/10 relative group/img bg-[#111111]">
                  <img src="https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=300" className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition duration-500" alt="Night city lights" loading="lazy" />
                </div>
                <div className="h-20 sm:h-24 rounded-2xl overflow-hidden border border-white/10 relative group/img bg-[#111111]">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300" className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition duration-500" alt="Portrait photography" loading="lazy" />
                </div>
              </div>
              <div className="space-y-2.5 pt-4">
                <div className="h-20 sm:h-24 rounded-2xl overflow-hidden border border-white/10 relative group/img bg-[#111111]">
                  <img src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=300" className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition duration-500" alt="Landscape photography" loading="lazy" />
                </div>
                <div className="h-28 sm:h-32 rounded-2xl overflow-hidden border border-white/10 relative group/img bg-[#111111]">
                  <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=300" className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition duration-500" alt="Event coverage" loading="lazy" />
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="h-28 sm:h-32 rounded-2xl overflow-hidden border border-white/10 relative group/img bg-[#111111]">
                  <img src="/photography/after_slider.png" className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition duration-500" alt="Color grading" loading="lazy" />
                </div>
                <div className="h-20 sm:h-24 rounded-2xl overflow-hidden border border-white/10 relative group/img bg-[#111111]">
                  <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300" className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition duration-500" alt="Camera equipment" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 09 — MENTORS & TRUST */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 w-full relative z-10">
        <div className="text-center mb-8">
          <span className="text-[10px] font-bold text-[#FF7A18] uppercase tracking-widest bg-[#FF5A1F]/10 px-2.5 py-0.5 rounded-full border border-[#FF5A1F]/20 inline-block mb-2">
            09 — TRUST
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Mentors & Trust
          </h2>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-[#171717] border border-white/10 shadow-xl relative overflow-hidden">
          <p className="text-slate-300 text-xs sm:text-sm italic leading-relaxed mb-6 font-normal">
            {displayedTestimonial.quote || displayedTestimonial.testimonial}
          </p>
          
          <div className="flex items-center gap-3.5 border-t border-white/5 pt-4">
            <img 
              src={displayedTestimonial.img || displayedTestimonial.image} 
              alt={displayedTestimonial.name} 
              className="w-12 h-12 rounded-full object-cover border border-white/10 shrink-0"
              loading="lazy"
            />
            <div>
              <h4 className="font-bold text-white flex items-center gap-1.5 text-sm">
                <span>{displayedTestimonial.name}</span>
                {(displayedTestimonial.linkedin || displayedTestimonial.linkedin_url) && (
                  <a 
                    href={displayedTestimonial.linkedin || displayedTestimonial.linkedin_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#FF7A18] hover:text-[#FFA87D] transition"
                    title="LinkedIn Profile"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                )}
              </h4>
              <p className="text-slate-400 text-[10px] uppercase font-bold">{displayedTestimonial.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10 — LICENSES & CERTIFICATIONS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 w-full relative z-10">
        <div className="text-center mb-10">
          <span className="text-[10px] font-bold text-[#FF7A18] uppercase tracking-widest bg-[#FF5A1F]/10 px-2.5 py-0.5 rounded-full border border-[#FF5A1F]/20 inline-block mb-2">
            10 — CREDENTIALS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Licenses & Certifications
          </h2>
          <p className="text-slate-400 text-xs mt-1 font-light">Verified industry credentials validating marketing and technical skills.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedCertifications.map((cert, idx) => {
            const certImg = cert.certificate_image || cert.img;
            const certDesc = cert.description || cert.desc;
            const certDate = cert.issue_date || cert.date;
            const isModal = (cert.link === '#' || cert.credential_url === '#' || !cert.link || cert.link === certImg);
            const certLink = cert.credential_url || cert.link || '#';
            const normalizedCert = { ...cert, img: certImg, desc: certDesc, date: certDate };

            return (
              <div 
                key={idx} 
                onClick={() => isModal ? setSelectedCert(normalizedCert) : window.open(certLink, '_blank')}
                className="p-5 rounded-2xl bg-[#171717] hover:border-[#FF5A1F]/40 transition group cursor-pointer flex flex-col justify-between border border-white/10 shadow-md"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { 
                  if (e.key === 'Enter') {
                    if (isModal) {
                      setSelectedCert(normalizedCert);
                    } else {
                      window.open(certLink, '_blank');
                    }
                  } 
                }}
                aria-label={`View ${cert.title} certificate`}
              >
                <div>
                  <div className="flex justify-between items-start mb-1.5 gap-2">
                    <h3 className="font-bold text-white text-xs leading-snug group-hover:text-[#FFA87D] transition">
                      {cert.title}
                    </h3>
                    <span className="text-[9px] font-bold bg-[#222222] border border-white/10 px-2 py-0.5 rounded text-slate-300 shrink-0">
                      {certDate}
                    </span>
                  </div>
                  <p className="text-[#FF7A18] font-semibold text-[10px] mb-2">{cert.issuer}</p>
                  <p className="text-slate-400 text-[11px] leading-relaxed line-clamp-2 font-light">{certDesc}</p>
                </div>
                
                <div className="mt-4 pt-2.5 border-t border-white/5 flex justify-end">
                  <span className="text-[10px] font-bold text-[#FF7A18] group-hover:text-[#FFA87D] transition flex items-center gap-1">
                    <span>View Certificate</span>
                    <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 11 — FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 w-full relative z-10">
        <div className="text-center mb-10">
          <span className="text-[10px] font-bold text-[#FF7A18] uppercase tracking-widest bg-[#FF5A1F]/10 px-2.5 py-0.5 rounded-full border border-[#FF5A1F]/20 inline-block mb-2">
            11 — FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => (
            <FAQItem key={idx} faq={faq} />
          ))}
        </div>
      </section>

      {/* 12 — FINAL CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20 w-full text-center relative z-10">
        <div className="p-8 sm:p-14 rounded-[2.5rem] bg-gradient-to-b from-[#1C1412] via-[#171717] to-[#121212] border border-[#FF5A1F]/30 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-b from-[#FF5A1F]/10 to-transparent pointer-events-none"></div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 font-display">
            Ready to Create Impact?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto mb-7 leading-relaxed font-light">
            Whether you're building a digital product, growing a community, launching an event, or strengthening your brand — let's build it together.
          </p>
          <button
            onClick={() => openContactWithPurpose('Project Inquiry')}
            className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] hover:from-[#FF7A18] hover:to-[#D9361E] text-white font-extrabold text-xs sm:text-sm rounded-xl transition shadow-xl shadow-[#FF5A1F]/25 cursor-pointer mx-auto"
          >
            <span>LET'S BUILD SOMETHING</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-center text-xs text-slate-400 bg-[#0C0C0C] relative z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="font-extrabold text-white font-display text-sm block">Karthik Nimmanagoti</span>
            <span className="text-[10px] text-slate-500 font-light">Creative Strategist, Community Builder & Web Developer</span>
          </div>

          <div className="flex justify-center gap-4 items-center">
            <a href="mailto:aktechintelligence@gmail.com" className="p-2 rounded-xl bg-[#171717] border border-white/5 text-slate-400 hover:text-white transition" title="Email" aria-label="Email Karthik Nimmanagoti"><Mail size={16} /></a>
            <a href="https://www.linkedin.com/in/karthik-nimmanagoti-52a403324" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-[#171717] border border-white/5 text-slate-400 hover:text-white transition" title="LinkedIn" aria-label="Karthik Nimmanagoti on LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://github.com/NIMMANAGOTI777" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-[#171717] border border-white/5 text-slate-400 hover:text-white transition" title="GitHub" aria-label="Karthik Nimmanagoti on GitHub">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://x.com/karthikkampu07" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-[#171717] border border-white/5 text-slate-400 hover:text-white transition" title="Twitter / X" aria-label="Karthik Nimmanagoti on X (Twitter)">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.instagram.com/nimmanagoti.karthik" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-[#171717] border border-white/5 text-slate-400 hover:text-white transition" title="Instagram" aria-label="Karthik Nimmanagoti on Instagram">
              <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>

          <p className="text-[11px] text-slate-500">
            © 2026 Karthik Nimmanagoti. All rights reserved.
          </p>
        </div>
      </footer>

      {/* COLLABORATIONS DETAIL MODAL */}
      {selectedCollab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#171717] animate-scale-in my-8 overflow-hidden border border-white/10 shadow-2xl text-left">
            <button
              onClick={() => setSelectedCollab(null)}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-full bg-black/50 hover:bg-black/70 transition backdrop-blur-sm z-10 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="h-56 overflow-hidden relative">
              <img 
                src={selectedCollab.img} 
                alt={selectedCollab.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/40 to-transparent"></div>
              <div className="absolute bottom-4 left-5">
                <span className="px-2.5 py-0.5 bg-[#FF5A1F] text-white text-[9px] font-black uppercase rounded-full tracking-wider mb-1.5 inline-block">
                  {selectedCollab.category || selectedCollab.tag}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                  {selectedCollab.title}
                </h3>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap gap-4 text-xs text-slate-400 border-b border-white/5 pb-3 font-medium">
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-[#FF5A1F]" />
                  <span>{selectedCollab.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={13} className="text-[#FF7A18]" />
                  <span>{selectedCollab.attendees}</span>
                </div>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                {selectedCollab.desc}
              </p>

              {selectedCollab.roles && (
                <div className="space-y-1.5 p-3.5 rounded-xl bg-[#111111] border border-white/5">
                  <span className="text-[9px] font-bold text-[#FF7A18] uppercase tracking-wider block mb-1">Key Ownership</span>
                  {selectedCollab.roles.map((r, idx) => (
                    <div key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                      <span className="text-[#FF5A1F] select-none">•</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <div className="flex gap-2">
                  {selectedCollab.links?.linkedin && (
                    <a href={selectedCollab.links.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-[#222222] border border-white/10 hover:border-[#FF5A1F]/40 flex items-center justify-center text-slate-400 hover:text-white transition" title="LinkedIn">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                  )}
                  {selectedCollab.links?.instagram && (
                    <a href={selectedCollab.links.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-[#222222] border border-white/10 hover:border-[#FF5A1F]/40 flex items-center justify-center text-slate-400 hover:text-white transition" title="Instagram">
                      <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    </a>
                  )}
                  {selectedCollab.links?.youtube && (
                    <a href={selectedCollab.links.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-[#222222] border border-white/10 hover:border-[#FF5A1F]/40 flex items-center justify-center text-slate-400 hover:text-white transition" title="YouTube">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163c-.272-1.016-1.071-1.815-2.087-2.087C19.565 3.54 12 3.54 12 3.54s-7.565 0-9.411.536C1.573 4.348.774 5.147.502 6.163 0 8.01 0 12 0 12s0 3.99.502 5.837c.272 1.016 1.071 1.815 2.087 2.087C4.435 20.46 12 20.46 12 20.46s7.565 0 9.411-.536c1.016-.272 1.815-1.071 2.087-2.087.502-1.847.502-5.837.502-5.837s0-3.99-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => {
                    setSelectedCollab(null);
                    openContactWithPurpose('Event Collaboration');
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] hover:from-[#FF7A18] hover:to-[#D9361E] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
                >
                  Propose Collaboration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chatbot Assistant Widget */}
      <KarthikAIChatbot 
        onTriggerContact={openContactWithPurpose}
        onTriggerResume={() => window.open("https://docs.google.com/document/d/1-krzGfTO1S0r_-o3d9VJGWPw3uuskL9JtvvCC1dPCek/edit?usp=sharing", "_blank")}
      />

      {/* Floating WhatsApp Widget (Bottom-Left) */}
      <WhatsAppButton />

      {/* Connection Modal Form */}
      <ContactModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        initialPurpose={selectedPurpose}
      />

      {/* Certificate Modal */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-[#171717] border border-white/10 rounded-3xl shadow-2xl animate-scale-in text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#171717]/95 backdrop-blur border-b border-white/10 p-4 sm:p-5 flex justify-between items-center z-10">
              <div>
                <h3 className="text-base font-bold text-white leading-tight font-display">{selectedCert.title}</h3>
                <p className="text-[#FF7A18] text-xs font-semibold">{selectedCert.issuer}</p>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition border border-white/5 cursor-pointer"
                aria-label="Close certificate viewer"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="p-5 sm:p-6 flex flex-col items-center">
              <div className="w-full max-w-xl mb-5 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black p-2">
                <img
                  src={selectedCert.img || selectedCert.certificate_image}
                  alt={`${selectedCert.issuer} ${selectedCert.title} certificate`} 
                  className="w-full h-auto max-h-[55vh] object-contain rounded-xl select-none"
                />
              </div>
              
              <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <div className="p-3.5 rounded-xl bg-[#111111] border border-white/5">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Issue Year</p>
                  <p className="text-slate-200 text-xs font-semibold">{selectedCert.date}</p>
                </div>
                
                {selectedCert.code && (
                  <div className="p-3.5 rounded-xl bg-[#111111] border border-white/5">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Credential ID</p>
                    <p className="text-slate-300 text-xs font-mono break-all">{selectedCert.code}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-5 right-5 p-2 text-white/80 hover:text-white rounded-full bg-black/60 hover:bg-black/90 transition z-50 border border-white/10 cursor-pointer"
            aria-label="Close image preview"
          >
            <X size={20} />
          </button>
          
          <div 
            className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl border border-white/10 shadow-2xl flex items-center justify-center animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={lightboxImage} 
              alt="Enlarged moment" 
              className="max-w-full max-h-[80vh] object-contain rounded-2xl select-none"
            />
          </div>
        </div>
      )}

      {/* Featured Case Study Modal */}
      <ProjectCaseStudyModal 
        project={selectedCaseStudy} 
        isOpen={!!selectedCaseStudy} 
        onClose={() => setSelectedCaseStudy(null)} 
        initialView={caseStudyInitialView}
      />
    </div>
  );
}

function NotFound() {
  useEffect(() => {
    document.title = "404 - Page Not Found | Karthik Nimmanagoti";
  }, []);

  return (
    <div className="min-h-screen bg-[#090909] text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="glow-orange top-1/4 left-1/4"></div>
      
      <div className="relative z-10 max-w-md mx-auto p-8 sm:p-10 rounded-3xl bg-[#171717] border border-white/10 shadow-2xl">
        <span className="inline-block px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-4">
          Error 404
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 font-display">Page Not Found</h1>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed font-light">
          The page you are looking for doesn't exist or has moved.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] hover:from-[#FF7A18] hover:to-[#D9361E] text-white font-bold text-sm rounded-xl transition shadow-lg shadow-[#FF5A1F]/20 cursor-pointer"
        >
          <span>Return to Homepage</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#090909] text-white flex flex-col items-center justify-center p-6">
      <div className="w-10 h-10 border-2 border-white/10 border-t-[#FF5A1F] rounded-full animate-spin"></div>
      <p className="mt-4 text-xs font-mono uppercase tracking-widest text-slate-400">Loading...</p>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <PortfolioDataProvider>
        <Router>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Portfolio Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/behind-the-lens" element={<BehindTheLens />} />

              {/* Admin Authentication */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin App Shell & Subroutes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="achievements" element={<AdminAchievements />} />
                <Route path="experience" element={<AdminExperience />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="testimonials" element={<AdminTestimonials />} />
                <Route path="certifications" element={<AdminCertifications />} />
                <Route path="speaking" element={<AdminSpeaking />} />
                <Route path="media" element={<AdminMediaLibrary />} />
                <Route path="inquiries" element={<AdminInquiries />} />
                <Route path="leads" element={<AdminLeadsWrapper />} />
                <Route path="homepage" element={<AdminHomepage />} />
                <Route path="seo" element={<AdminSEO />} />
                <Route path="social" element={<AdminSocialLinks />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="profile" element={<AdminProfile />} />
              </Route>

              {/* 404 Catch-All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </PortfolioDataProvider>
    </AuthProvider>
  );
}

export default App;
