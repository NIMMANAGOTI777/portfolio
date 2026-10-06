import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import ContactModal from './components/ContactModal';
import BehindTheLens from './components/BehindTheLens';
import WhatsAppButton from './components/WhatsAppButton';
import KarthikAIChatbot from './components/KarthikAIChatbot';
import ProfessionalExperience from './components/ProfessionalExperience';
import AchievementsSection from './components/AchievementsSection';
import ProjectCaseStudyModal from './components/ProjectCaseStudyModal';
import { AuthProvider } from './context/AuthContext';
import { PortfolioDataProvider, usePortfolioData } from './context/PortfolioDataContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminProjects from './components/admin/AdminProjects';
import AdminAchievements from './components/admin/AdminAchievements';
import AdminExperience from './components/admin/AdminExperience';
import AdminServices from './components/admin/AdminServices';
import AdminTestimonials from './components/admin/AdminTestimonials';
import AdminCertifications from './components/admin/AdminCertifications';
import AdminSpeaking from './components/admin/AdminSpeaking';
import AdminMediaLibrary from './components/admin/AdminMediaLibrary';
import AdminInquiries from './components/admin/AdminInquiries';
import AdminLeadsWrapper from './components/admin/AdminLeadsWrapper';
import AdminHomepage from './components/admin/AdminHomepage';
import AdminSEO from './components/admin/AdminSEO';
import AdminSocialLinks from './components/admin/AdminSocialLinks';
import AdminSettings from './components/admin/AdminSettings';
import AdminProfile from './components/admin/AdminProfile';
import { 
  STATS, SERVICE_CATEGORIES, WORK_WITH_ME_SERVICES, WHY_WORK_WITH_ME, 
  COLLABORATIONS, PROJECTS, TEACH_AI_DATA, CERTIFICATIONS, 
  TESTIMONIAL, FAQS, CURRENTLY_WORKING_ON 
} from './lib/portfolioData';
import { 
  Mail, ArrowRight, Layers, Award, 
  Users, Calendar, FileText, 
  ChevronDown, ChevronUp, ChevronRight, 
  ArrowUpRight, X, Globe, Palette, TrendingUp, PenTool, Video, Check, CheckCircle2, Menu, Sparkles, ExternalLink, Camera
} from 'lucide-react';

// Roles list for typewriter animation
const ROLES = [
  "Creative Strategist",
  "Community Builder",
  "Web Developer",
  "Event Architect"
];

// Service Icon Mapper Component
function ServiceIcon({ iconName, size = 20 }) {
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
    const duration = 1400; // ms
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
    <div ref={elementRef} className="glass-panel p-5 sm:p-6 rounded-2xl text-center relative overflow-hidden group border border-white/5 hover:border-indigo-500/20 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-1.5 font-display bg-gradient-to-r from-indigo-400 via-white to-purple-300 bg-clip-text text-transparent">
        {count}{suffix}
      </h3>
      <p className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest">{label}</p>
    </div>
  );
}

// 2. FAQ Accordion Item Component
function FAQItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-white/5 transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 sm:px-6 py-4 sm:py-5 flex justify-between items-center text-left focus:outline-none bg-slate-900/20 hover:bg-slate-900/40 transition cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-slate-200 text-sm sm:text-base">{faq.question}</span>
        <ChevronDown 
          size={18} 
          className={`text-slate-400 transition-transform duration-300 shrink-0 ml-3 ${isOpen ? 'transform rotate-180 text-indigo-400' : ''}`} 
        />
      </button>
      <div 
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{ maxHeight: isOpen ? '240px' : '0px' }}
      >
        <div className="px-5 sm:px-6 pb-5 text-slate-350 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-3 bg-slate-950/30">
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
    publicServices, 
    publicSpeakingEvents, 
    publicCertifications, 
    publicTestimonials,
    siteSettings 
  } = usePortfolioData();

  const displayedProjects = publicProjects?.length > 0 ? publicProjects : PROJECTS;
  const displayedServices = publicServices?.length > 0 ? publicServices : WORK_WITH_ME_SERVICES;
  const displayedCollaborations = publicSpeakingEvents?.length > 0 ? publicSpeakingEvents : COLLABORATIONS;
  const displayedCertifications = publicCertifications?.length > 0 ? publicCertifications : CERTIFICATIONS;
  const displayedTestimonial = publicTestimonials?.[0] || TESTIMONIAL;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState('Hire Me');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null); // Accordion category expansion for Work With Me
  const [teachAIExpanded, setTeachAIExpanded] = useState(false); // Read full story toggle

  // Typewriter Effect
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Resume Sidebar Toggle
  const [resumeOpen, setResumeOpen] = useState(false);

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
        setResumeOpen(false);
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
      }, 50);
    } else {
      timer = setTimeout(() => {
        setCurrentText(prev => currentRole.substring(0, prev.length + 1));
      }, 85);
    }
    
    if (!isDeleting && currentText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 2200);
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
      }, 40);
    } else {
      timer = setTimeout(() => {
        setWorkingText(prev => currentFocus.substring(0, prev.length + 1));
      }, 70);
    }
    
    if (!workingDeleting && workingText === currentFocus) {
      timer = setTimeout(() => setWorkingDeleting(true), 2400);
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative selection:bg-indigo-500 selection:text-white">
      
      {/* Background ambient glows */}
      <div className="glow-indigo -top-20 -left-20 pointer-events-none"></div>
      <div className="glow-purple top-[35%] right-10 pointer-events-none"></div>
      <div className="glow-indigo bottom-20 left-10 pointer-events-none"></div>

      {/* Navigation Header */}
      <nav className="border-b border-white/5 backdrop-blur-md bg-slate-950/75 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <a href="#about" className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
              Karthik Nimmanagoti
            </a>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="#about" className="text-xs text-slate-400 hover:text-white transition font-medium">About</a>
            <a href="#work-with-me" className="text-xs text-slate-400 hover:text-white transition font-medium">Services</a>
            <a href="#experience" className="text-xs text-slate-400 hover:text-white transition font-medium">Experience</a>
            <a href="#achievements" className="text-xs text-slate-400 hover:text-white transition font-medium">Achievements</a>
            <a href="#projects" className="text-xs text-slate-400 hover:text-white transition font-medium">Projects</a>
            <a href="#collaborations" className="text-xs text-slate-400 hover:text-white transition font-medium">Collaborations</a>
            <a 
              href="https://kar-thikexe.vercel.app/" 
              className="text-xs text-indigo-400 hover:text-indigo-300 font-bold bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-sm shadow-indigo-500/5"
            >
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></span>
              Behind the Lens
            </a>
            
            <button
              onClick={() => openContactWithPurpose('Hire Me')}
              className="px-4 py-2 text-xs bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/30 font-bold text-white rounded-xl shadow-md shadow-indigo-500/20 transition cursor-pointer ml-2"
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white focus:outline-none p-1"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 py-4 bg-slate-950/98 border-b border-white/5 absolute w-full left-0 top-full flex flex-col gap-3.5 shadow-2xl backdrop-blur-xl">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-xs text-slate-300 hover:text-white transition font-semibold py-1">About</a>
            <a href="#work-with-me" onClick={() => setMobileMenuOpen(false)} className="text-xs text-slate-300 hover:text-white transition font-semibold py-1">Services</a>
            <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="text-xs text-slate-300 hover:text-white transition font-semibold py-1">Experience</a>
            <a href="#achievements" onClick={() => setMobileMenuOpen(false)} className="text-xs text-slate-300 hover:text-white transition font-semibold py-1">Achievements</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-xs text-slate-300 hover:text-white transition font-semibold py-1">Projects</a>
            <a href="#collaborations" onClick={() => setMobileMenuOpen(false)} className="text-xs text-slate-300 hover:text-white transition font-semibold py-1">Collaborations</a>
            <a 
              href="https://kar-thikexe.vercel.app/" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-indigo-400 font-bold transition flex items-center gap-2 py-1"
            >
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></span>
              Behind the Lens
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openContactWithPurpose('Hire Me');
              }}
              className="mt-1 w-full py-2.5 text-xs bg-indigo-600 hover:bg-indigo-500 font-bold text-white rounded-xl shadow-md transition cursor-pointer text-center"
            >
              Let's Talk
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header id="about" className="max-w-4xl mx-auto text-center px-4 sm:px-6 pt-16 pb-12 relative z-10">
        <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-bold uppercase tracking-widest mb-6">
          PORTFOLIO 2026
        </span>
        
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-3 leading-tight text-white font-display">
          KARTHIK <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            NIMMANAGOTI
          </span>
        </h1>

        {/* Strong Positioning Typewriter */}
        <div className="h-[36px] mb-4 flex justify-center items-center">
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-light">
            <span className="font-semibold text-white">
              {currentText}
            </span>
            <span className="cursor-blink ml-0.5"></span>
          </p>
        </div>

        {/* Supporting statement */}
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mb-6 font-light">
          "I build communities, digital experiences, events, and content that turn ideas into impact."
        </p>

        {/* Live Status Indicator */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/70 border border-white/5 backdrop-blur-md text-[10px] text-slate-300 select-none shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-slate-400 uppercase tracking-widest text-[8px] mr-1 border-r border-white/10 pr-2">Currently Working On</span>
            <span className="font-bold text-indigo-400 tracking-wide">
              {workingText}
            </span>
          </div>
        </div>

        {/* 3D Profile Frame */}
        <div className="mb-8 relative inline-block group">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-20 group-hover:opacity-35 transition duration-500"></div>
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full p-2 bg-white/5 border border-white/10 shadow-2xl overflow-hidden">
            <img 
              src="https://res.cloudinary.com/do4nuj2kh/image/upload/v1783330744/WhatsApp_Image_2026-07-01_at_7.32.30_PM_vbhtly.jpg"
              alt="Karthik Nimmanagoti" 
              className="w-full h-full object-cover rounded-full"
              loading="eager"
            />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://docs.google.com/document/d/1-krzGfTO1S0r_-o3d9VJGWPw3uuskL9JtvvCC1dPCek/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            <FileText size={13} />
            <span>View Resume</span>
          </a>
          <button
            onClick={() => openContactWithPurpose('Hire Me')}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition shadow-md shadow-indigo-500/20 cursor-pointer"
          >
            <span>Let's Connect</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </header>

      {/* Impact Statistics Row */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-6 w-full relative z-10">
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

      {/* 01 — WORK WITH ME (Categorized & Streamlined) */}
      <section id="work-with-me" className="max-w-5xl mx-auto px-4 sm:px-6 py-20 w-full relative z-10">
        <div className="text-center mb-12">
          <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full inline-block mb-3">
            01 — SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
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
                className={`glass-panel rounded-3xl p-6 transition-all duration-300 border flex flex-col justify-between relative overflow-hidden ${category.border} ${
                  isCategoryExpanded ? 'bg-slate-900/90 shadow-xl shadow-indigo-500/5' : 'bg-slate-950/60 hover:bg-slate-900/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                      CATEGORY {category.categoryNum}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">{categoryServices.length} Services</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-white mb-1.5 font-display">{category.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{category.description}</p>

                  {/* Included Services Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {category.servicesIncluded.map((sName) => (
                      <span key={sName} className="text-[10px] font-medium text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                        {sName}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Explore / View Services Trigger */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  aria-expanded={isCategoryExpanded}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/30 text-xs font-bold text-slate-200 hover:text-white transition flex items-center justify-between cursor-pointer"
                >
                  <span>{isCategoryExpanded ? 'Collapse Services' : 'Explore Services'}</span>
                  {isCategoryExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} className="text-indigo-400" />}
                </button>

                {/* Expanded Individual Services Modal / Drawer */}
                {isCategoryExpanded && (
                  <div className="pt-6 mt-4 border-t border-white/10 space-y-5">
                    {categoryServices.map((srv) => (
                      <div key={srv.id} className="p-4 rounded-2xl bg-slate-900/80 border border-white/5">
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${srv.iconBgClass}`}>
                            <ServiceIcon iconName={srv.icon} size={15} />
                          </div>
                          <h4 className="text-xs font-bold text-white">{srv.title}</h4>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed mb-3">{srv.description}</p>

                        <div className="space-y-1 mb-3">
                          {srv.services.map((item, idx) => (
                            <div key={idx} className="text-[10px] text-slate-300 flex items-start gap-1.5">
                              <span className="text-indigo-400 select-none">•</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        {srv.techStack && (
                          <div className="flex flex-wrap gap-1 mb-3 pt-2 border-t border-white/5">
                            {srv.techStack.map(t => (
                              <span key={t} className="text-[9px] text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 font-medium">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        {srv.id === 'photography' ? (
                          <a
                            href="https://kar-thikexe.vercel.app/"
                            className="w-full py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 hover:text-white text-[10px] font-bold rounded-lg transition flex items-center justify-center gap-1"
                          >
                            <span>View Photography Work</span>
                            <ArrowUpRight size={11} />
                          </a>
                        ) : (
                          <button
                            onClick={() => openContactWithPurpose(srv.title)}
                            className="w-full py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 hover:text-white text-[10px] font-bold rounded-lg transition flex items-center justify-center gap-1 cursor-pointer"
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
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 relative overflow-hidden">
          <div className="max-w-3xl mb-6">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
              02 — VALUE PROPOSITION
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-2 mb-2 font-display">
              Why Work With Me?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
              "I combine design, development, content, community, and event leadership to take ideas from planning to execution."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {WHY_WORK_WITH_ME.map((strength, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-900/40 border border-white/5 flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
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

      {/* 03 — PROFESSIONAL EXPERIENCE (Clean Career Timeline) */}
      <ProfessionalExperience />

      {/* 04 — COLLEGE ACHIEVEMENTS */}
      <section id="achievements" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 w-full relative z-10">
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full inline-block mb-2.5">
            04 — RECOGNITION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
            College Achievements
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mt-2 font-light">
            Milestones, presidential honors, governance policy wins, and creative recognitions.
          </p>
        </div>

        {/* Master Case Study Achievement Cards */}
        <AchievementsSection />
      </section>

      {/* 05 — SELECTED WORK / TECHNICAL SHOWCASES */}
      <section id="projects" className="max-w-5xl mx-auto px-4 sm:px-6 py-20 w-full relative z-10">
        <div className="text-center mb-12">
          <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full inline-block mb-3">
            05 — SELECTED WORK
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
            Technical Showcases & Freelance Work
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mt-2.5 font-light">
            Government event visual identities, production platforms, and scalable digital systems built for real impact.
          </p>
        </div>

        {/* Featured Project Showcase Card */}
        {displayedProjects.filter(p => p.featured).map((proj, fIdx) => (
          <div 
            key={`featured-${fIdx}`}
            className="glass-panel p-6 sm:p-8 md:p-9 rounded-[2rem] border border-indigo-500/25 hover:border-indigo-500/40 transition-all duration-500 shadow-2xl relative overflow-hidden group mb-8"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
              {/* Left Details Column */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-300 bg-indigo-500/15 border border-indigo-500/30 px-3 py-1 rounded-full">
                      {proj.eyebrow || 'FEATURED PROJECT'}
                    </span>
                    {proj.badgeSecondary && (
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full">
                        {proj.badgeSecondary}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-indigo-200 transition-colors mb-1 font-display">
                    {proj.title}
                  </h3>
                  <p className="text-indigo-300 text-xs sm:text-sm font-semibold mb-3">
                    {proj.sub}
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5 font-light">
                    {proj.desc}
                  </p>

                  {/* Tags Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {proj.tags?.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] sm:text-[11px] text-slate-200 font-medium bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Result & Impact Callout */}
                  <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 mb-6 flex items-start gap-2.5">
                    <Check size={14} className="text-emerald-400 stroke-[3] mt-0.5 shrink-0" />
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">
                      <span className="text-slate-500 font-bold uppercase text-[9px] block">Result & Execution</span>
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
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg shadow-indigo-500/25 cursor-pointer"
                  >
                    <span>{proj.actionLabel || 'VIEW CASE STUDY →'}</span>
                  </button>

                  <button 
                    onClick={() => {
                      setSelectedCaseStudy(proj);
                      setCaseStudyInitialView('gallery');
                    }}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/30 text-slate-300 hover:text-white font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer"
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
                className="lg:col-span-5 h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 relative group/img cursor-pointer bg-slate-900 shadow-xl"
              >
                <img 
                  src={proj.image} 
                  alt={`${proj.title} preview`} 
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between glass-panel p-2.5 rounded-xl border border-white/10">
                  <span className="text-[10px] font-bold text-slate-200 truncate">On-Ground Event Documentation</span>
                  <span className="text-[10px] font-bold text-indigo-400 flex items-center gap-1 shrink-0">
                    <span>Explore</span>
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
            <div key={idx} className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[9px] font-extrabold uppercase text-indigo-400 tracking-wider bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                    {proj.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors mb-1">{proj.title}</h3>
                <p className="text-slate-400 text-[11px] font-semibold mb-3">{proj.sub}</p>
                <p className="text-slate-350 text-xs leading-relaxed mb-4">{proj.desc}</p>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.tech.map((t, tIdx) => (
                    <span key={tIdx} className="text-[10px] text-slate-300 font-medium bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Impact / Result Callout */}
                <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 mb-5 flex items-start gap-2">
                  <Check size={13} className="text-emerald-400 stroke-[3] mt-0.5 shrink-0" />
                  <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                    <span className="text-slate-500 font-bold uppercase text-[9px] block">Result & Impact</span>
                    {proj.result}
                  </p>
                </div>
              </div>

              <a 
                href={proj.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 bg-indigo-600/15 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 hover:text-white text-xs font-bold rounded-xl transition"
              >
                <span>{proj.actionLabel || 'View Project'}</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 06 — PEOPLE, EVENTS & CONVERSATIONS (Consolidated & Clean) */}
      <section id="collaborations" className="max-w-5xl mx-auto px-4 sm:px-6 py-20 w-full relative z-10">
        <div className="text-center mb-12">
          <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full inline-block mb-3">
            06 — COLLABORATIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
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
              className="glass-panel rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 border border-white/5 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative bg-slate-900">
                  <img 
                    src={collab.img} 
                    alt={collab.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  <span className="absolute top-3 left-3 bg-indigo-650/90 backdrop-blur-md text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {collab.category || collab.tag}
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {collab.title}
                  </h3>
                  <p className="text-slate-500 text-[10px] font-semibold mb-2">{collab.date}</p>
                  <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">{collab.desc}</p>
                </div>
              </div>
              <div className="px-4 sm:px-5 pb-4 pt-1 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-slate-500">{collab.attendees}</span>
                <span className="text-xs text-indigo-400 font-bold group-hover:underline flex items-center gap-1">
                  <span>View Details</span>
                  <ArrowUpRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 07 — TEACH AI FOR INDIA (Impact Case Study) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20 w-full relative z-10">
        <div className="glass-panel p-6 sm:p-9 rounded-3xl border border-white/5 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="text-[10px] font-extrabold uppercase text-indigo-400 tracking-wider bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
              07 — SOCIAL IMPACT
            </span>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Grassroots Movement
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 font-display">
            Teach AI for India
          </h2>
          <p className="text-slate-350 text-xs sm:text-sm max-w-2xl leading-relaxed mb-6 font-light">
            "{TEACH_AI_DATA.headline}"
          </p>

          {/* Impact Stats Row */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
            {TEACH_AI_DATA.metrics.map((m, idx) => (
              <div key={idx} className="p-3 sm:p-4 rounded-2xl bg-slate-900/50 border border-white/5 text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-white bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent font-display">
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
            <div className="p-5 rounded-2xl bg-slate-900/30 border border-white/5">
              <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                <span>My Role & What I Own (Strategic POC)</span>
              </h4>
              <ul className="space-y-2">
                {TEACH_AI_DATA.ownership.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                    <span className="text-indigo-400 select-none">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/30 border border-white/5">
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
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
              <Camera size={12} className="text-indigo-400" />
              <span>School Outreach Moments ({TEACH_AI_DATA.images.length} Photos)</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {TEACH_AI_DATA.images.map((imgUrl, imgIdx) => (
                <div 
                  key={imgIdx} 
                  onClick={() => setLightboxImage(imgUrl)}
                  className="h-20 sm:h-24 rounded-2xl overflow-hidden border border-white/10 relative group/img cursor-pointer bg-slate-900"
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
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1 cursor-pointer"
            >
              <span>{teachAIExpanded ? 'Hide Detailed Story' : 'Read the Full Story →'}</span>
              {teachAIExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
          </div>

          {teachAIExpanded && (
            <div className="mt-6 pt-5 border-t border-white/10 space-y-4 text-left">
              <p className="text-xs text-slate-300 leading-relaxed">
                {TEACH_AI_DATA.fullStory.description}
              </p>
              <p className="text-xs text-slate-400 italic border-l-2 border-indigo-500/40 pl-3">
                "{TEACH_AI_DATA.fullStory.reflection}"
              </p>
              <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-[11px] text-slate-400 leading-relaxed">
                <span className="font-bold text-indigo-300 uppercase text-[9px] block mb-0.5">Acknowledgements</span>
                {TEACH_AI_DATA.fullStory.thanks}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 08 — BEHIND THE LENS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20 w-full relative z-10">
        <div className="glass-panel p-6 sm:p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-purple-500/5 opacity-100 transition duration-500 pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] font-extrabold uppercase text-indigo-400 tracking-wider bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 inline-block">
                08 — VISUAL ARTS
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight font-display">
                Behind the Lens
              </h2>
              
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                "A visual side of my work — photography, storytelling and moments captured through my lens."
              </p>
              
              <div className="pt-2">
                <a
                  href="https://kar-thikexe.vercel.app/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs rounded-full transition shadow-lg cursor-pointer"
                >
                  <span>Enter Cinematic Gallery</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
            
            {/* Right Graphic Preview */}
            <div className="lg:col-span-6 grid grid-cols-3 gap-2.5">
              <div className="space-y-2.5">
                <div className="h-28 sm:h-32 rounded-2xl overflow-hidden border border-white/10 relative group/img bg-slate-900">
                  <img src="https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=300" className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition duration-500" alt="Night city lights" loading="lazy" />
                </div>
                <div className="h-20 sm:h-24 rounded-2xl overflow-hidden border border-white/10 relative group/img bg-slate-900">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300" className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition duration-500" alt="Portrait photography" loading="lazy" />
                </div>
              </div>
              <div className="space-y-2.5 pt-4">
                <div className="h-20 sm:h-24 rounded-2xl overflow-hidden border border-white/10 relative group/img bg-slate-900">
                  <img src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=300" className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition duration-500" alt="Landscape photography" loading="lazy" />
                </div>
                <div className="h-28 sm:h-32 rounded-2xl overflow-hidden border border-white/10 relative group/img bg-slate-900">
                  <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=300" className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition duration-500" alt="Event coverage" loading="lazy" />
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="h-28 sm:h-32 rounded-2xl overflow-hidden border border-white/10 relative group/img bg-slate-900">
                  <img src="/photography/after_slider.png" className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition duration-500" alt="Color grading" loading="lazy" />
                </div>
                <div className="h-20 sm:h-24 rounded-2xl overflow-hidden border border-white/10 relative group/img bg-slate-900">
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
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 inline-block mb-2">
            09 — TRUST
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Mentors & Trust
          </h2>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden border border-white/5">
          <p className="text-slate-300 text-xs sm:text-sm italic leading-relaxed mb-6 font-normal">
            {displayedTestimonial.quote || displayedTestimonial.testimonial}
          </p>
          
          <div className="flex items-center gap-3.5 border-t border-white/5 pt-4">
            <img 
              src={displayedTestimonial.img || displayedTestimonial.image} 
              alt={displayedTestimonial.name} 
              className="w-11 h-11 rounded-full object-cover border border-white/10 shrink-0"
              loading="lazy"
            />
            <div>
              <h4 className="font-bold text-white flex items-center gap-1.5 text-sm">
                <span>{displayedTestimonial.name}</span>
                {displayedTestimonial.linkedin || displayedTestimonial.linkedin_url ? (
                  <a 
                    href={displayedTestimonial.linkedin || displayedTestimonial.linkedin_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 transition"
                    title="LinkedIn Profile"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                ) : null}
              </h4>
              <p className="text-slate-500 text-[10px] uppercase font-bold">{displayedTestimonial.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10 — LICENSES & CERTIFICATIONS (Compact Footer Credentials) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 w-full relative z-10">
        <div className="text-center mb-10">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 inline-block mb-2">
            10 — CREDENTIALS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Licenses & Certifications
          </h2>
          <p className="text-slate-400 text-xs mt-1">Verified industry certifications validating marketing and technical skills.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedCertifications.map((cert, idx) => {
            const isModal = (cert.link === '#' || cert.credential_url === '#');
            const certLink = cert.credential_url || cert.link || '#';
            const certImg = cert.certificate_image || cert.img;
            return (
              <div 
                key={idx} 
                onClick={() => isModal ? setSelectedCert(cert) : window.open(certLink, '_blank')}
                className="glass-panel p-4 rounded-2xl hover:border-indigo-500/30 transition group cursor-pointer flex flex-col justify-between border border-white/5"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if(e.key === 'Enter') isModal ? setSelectedCert(cert) : window.open(certLink, '_blank'); }}
                aria-label={`View ${cert.title} certificate`}
              >
                <div>
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <h3 className="font-bold text-white text-xs leading-snug group-hover:text-indigo-300 transition">
                      {cert.title}
                    </h3>
                    <span className="text-[9px] font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded shrink-0">
                      {cert.date}
                    </span>
                  </div>
                  <p className="text-indigo-400 font-semibold text-[10px] mb-1.5">{cert.issuer}</p>
                  <p className="text-slate-400 text-[11px] leading-relaxed line-clamp-2">{cert.desc}</p>
                </div>
                
                <div className="mt-3 pt-2 border-t border-white/5 flex justify-end">
                  <span className="text-[10px] font-semibold text-indigo-400 group-hover:text-indigo-300 transition flex items-center gap-1">
                    View Certificate <ChevronRight size={12} />
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
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 inline-block mb-2">
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

      {/* 13 — FINAL CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 w-full text-center relative z-10">
        <div className="glass-panel p-8 sm:p-12 rounded-[2.5rem] relative overflow-hidden group border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-100 transition duration-500 pointer-events-none"></div>
          
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3 font-display">
            Ready to Create Impact?
          </h2>
          <p className="text-slate-350 text-xs sm:text-sm max-w-lg mx-auto mb-6 leading-relaxed font-light">
            Whether you're building a digital product, growing a community, launching an event, or strengthening your brand — let's build it.
          </p>
          <button
            onClick={() => openContactWithPurpose('Project Inquiry')}
            className="flex items-center gap-2 px-8 py-3 bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-xs sm:text-sm rounded-full transition shadow-lg cursor-pointer mx-auto"
          >
            <span>LET'S BUILD SOMETHING</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-[10px] text-slate-500 relative z-10">
        <div className="flex justify-center gap-5 mb-4 items-center">
          <a href="mailto:aktechintelligence@gmail.com" className="text-slate-500 hover:text-rose-450 transition" title="Email" aria-label="Email Karthik Nimmanagoti"><Mail size={16} /></a>
          <a href="https://www.linkedin.com/in/karthik-nimmanagoti-52a403324" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-indigo-400 transition" title="LinkedIn" aria-label="Karthik Nimmanagoti on LinkedIn">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="https://www.instagram.com/nimmanagoti.karthik" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-pink-400 transition" title="Instagram" aria-label="Karthik Nimmanagoti on Instagram">
            <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://x.com/karthikkampu07" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition" title="Twitter / X" aria-label="Karthik Nimmanagoti on X (Twitter)">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://github.com/NIMMANAGOTI777" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-350 transition" title="GitHub" aria-label="Karthik Nimmanagoti on GitHub">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
        <p>© 2026 Karthik Nimmanagoti. All rights reserved.</p>
        <p className="mt-1">Designed with React + Supabase + EmailJS.</p>
      </footer>

      {/* COLLABORATIONS DETAIL MODAL */}
      {selectedCollab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-2xl glass-panel animate-scale-in my-8 overflow-hidden border border-white/10 shadow-2xl">
            <button
              onClick={() => setSelectedCollab(null)}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-full bg-black/40 hover:bg-black/60 transition backdrop-blur-sm z-10 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="h-56 overflow-hidden relative">
              <img 
                src={selectedCollab.img} 
                alt={selectedCollab.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
              <div className="absolute bottom-4 left-5">
                <span className="px-2.5 py-0.5 bg-indigo-650 text-white text-[9px] font-black uppercase rounded-full tracking-wider mb-1.5 inline-block">
                  {collabTag(selectedCollab)}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  {selectedCollab.title}
                </h3>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap gap-4 text-xs text-slate-400 border-b border-white/5 pb-3 mb-4 font-medium">
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-indigo-400" />
                  <span>{selectedCollab.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={13} className="text-purple-400" />
                  <span>{selectedCollab.attendees}</span>
                </div>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
                {selectedCollab.desc}
              </p>

              {selectedCollab.roles && (
                <div className="mb-5 space-y-1.5 p-3 rounded-xl bg-slate-900/50 border border-white/5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Key Ownership</span>
                  {selectedCollab.roles.map((r, idx) => (
                    <div key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                      <span className="text-indigo-400 select-none">•</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <div className="flex gap-2">
                  {selectedCollab.links?.linkedin && (
                    <a href={selectedCollab.links.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 hover:border-indigo-500/30 flex items-center justify-center text-slate-400 hover:text-indigo-400 transition" title="LinkedIn">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                  )}
                  {selectedCollab.links?.instagram && (
                    <a href={selectedCollab.links.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 hover:border-pink-500/30 flex items-center justify-center text-slate-400 hover:text-pink-400 transition" title="Instagram">
                      <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    </a>
                  )}
                  {selectedCollab.links?.youtube && (
                    <a href={selectedCollab.links.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 hover:border-red-500/30 flex items-center justify-center text-slate-400 hover:text-red-500 transition" title="YouTube">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163c-.272-1.016-1.071-1.815-2.087-2.087C19.565 3.54 12 3.54 12 3.54s-7.565 0-9.411.536C1.573 4.348.774 5.147.502 6.163 0 8.01 0 12 0 12s0 3.99.502 5.837c.272 1.016 1.071 1.815 2.087 2.087C4.435 20.46 12 20.46 12 20.46s7.565 0 9.411-.536c1.016-.272 1.815-1.071 2.087-2.087.502-1.847.502-5.837.502-5.837s0-3.99-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => {
                    setSelectedCollab(null);
                    openContactWithPurpose('Event Collaboration');
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg transition cursor-pointer"
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
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto glass-panel border border-white/10 rounded-2xl shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-slate-900/90 backdrop-blur border-b border-white/5 p-4 flex justify-between items-center z-10">
              <div>
                <h3 className="text-base font-bold text-white leading-tight">{selectedCert.title}</h3>
                <p className="text-indigo-400 text-xs font-semibold">{selectedCert.issuer}</p>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-1.5 text-white/70 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition border border-white/5"
                aria-label="Close certificate viewer"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="p-5 sm:p-6 flex flex-col items-center">
              <div className="w-full max-w-xl mb-6 rounded-xl overflow-hidden border border-white/5 shadow-2xl bg-black/50 p-2">
                <img 
                  src={selectedCert.img} 
                  alt={`${selectedCert.issuer} ${selectedCert.title} certificate`} 
                  className="w-full h-auto max-h-[55vh] object-contain rounded-lg select-none"
                />
              </div>
              
              <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <div className="glass-panel p-3.5 rounded-xl border border-white/5">
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">Issue Year</p>
                  <p className="text-slate-200 text-xs font-semibold">{selectedCert.date}</p>
                </div>
                
                {selectedCert.code && (
                  <div className="glass-panel p-3.5 rounded-xl border border-white/5">
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">Credential ID</p>
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white rounded-full bg-slate-900/50 hover:bg-slate-900/80 transition z-50 border border-white/10"
            aria-label="Close image preview"
          >
            <X size={20} />
          </button>
          
          <div 
            className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={lightboxImage} 
              alt="Enlarged moment" 
              className="max-w-full max-h-[80vh] object-contain rounded-xl select-none"
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

// Helper for collab tag
function collabTag(c) {
  return c.category || c.tag;
}

function NotFound() {
  useEffect(() => {
    document.title = "404 - Page Not Found | Karthik Nimmanagoti";
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="glow-indigo top-1/4 left-1/4"></div>
      <div className="glow-purple bottom-1/4 right-1/4"></div>
      
      <div className="relative z-10 max-w-md mx-auto glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
        <span className="inline-block px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-4">
          Error 404
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 font-display">Page Not Found</h1>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed font-light">
          The page you are looking for doesn't exist or has moved.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-indigo-500/25"
        >
          <span>Return to Homepage</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <PortfolioDataProvider>
        <Router>
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
                <ProtectedRoute>
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
        </Router>
      </PortfolioDataProvider>
    </AuthProvider>
  );
}

export default App;
