import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Users, Play, X, ChevronLeft, ChevronRight, 
  ChevronDown, ChevronUp, ZoomIn, ZoomOut, Sparkles, Lightbulb,
  CheckCircle2, ShieldCheck, Maximize2
} from 'lucide-react';

const MEDIA_ITEMS = [
  {
    type: 'image',
    url: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1789101010/WhatsApp_Image_2026-09-11_at_9.58.10_AM_cwpojm.jpg',
    title: 'Stage Presentation & Pitch',
    caption: 'Presenting ANNADATA POLICY 2047 on stage at the Youth Leadership & Governance Forum 2026'
  },
  {
    type: 'image',
    url: 'https://res.cloudinary.com/do4nuj2kh/image/upload/v1789101131/20260910_182648.jpg_fg4o9x.jpg',
    title: '1st Prize Certificate & Team',
    caption: 'Official 1st Prize Certificate awarded to the team for Annadata Policy 2047'
  },
  {
    type: 'video',
    url: 'https://res.cloudinary.com/do4nuj2kh/video/upload/v1789101423/WhatsApp_Video_2026-09-11_at_9.59.34_AM_ydy3wj.mp4',
    poster: 'https://res.cloudinary.com/do4nuj2kh/video/upload/v1789101423/WhatsApp_Video_2026-09-11_at_9.59.34_AM_ydy3wj.jpg',
    title: 'Stage Pitch & Announcement Video',
    caption: 'Live footage of the presentation and 1st Prize announcement'
  }
];

const TAGS = [
  'Youth Leadership',
  'Governance',
  'Annadata Policy 2047',
  'Agriculture',
  'Policy Innovation',
  'Student Leadership',
  'Social Impact'
];

const TEAM_MEMBERS = [
  'Karthik Nimmanagoti',
  'Murari Muthavarapu',
  'Dheeraj Masetty'
];

const ACKNOWLEDGEMENTS = [
  { name: 'Social Impact Club', role: 'Student Organisation' },
  { name: 'Ponugoti Kruthik Rao', role: 'President, NIAT Social Impact Club' },
  { name: 'ANAND MOKKAPATI', role: 'BOA' }
];

export default function AnnadataAchievement() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const lightboxVideoRef = useRef(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev === 0 ? MEDIA_ITEMS.length - 1 : prev - 1));
        setIsZoomed(false);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === MEDIA_ITEMS.length - 1 ? 0 : prev + 1));
        setIsZoomed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  // Pause video when navigating away or closing modal
  useEffect(() => {
    if (lightboxIndex !== 2 && lightboxVideoRef.current) {
      lightboxVideoRef.current.pause();
    }
  }, [lightboxIndex]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsZoomed(false);
  };

  const closeLightbox = () => {
    if (lightboxVideoRef.current) {
      lightboxVideoRef.current.pause();
    }
    setIsZoomed(false);
    setLightboxIndex(null);
  };

  const handlePrevMedia = (e) => {
    e.stopPropagation();
    setIsZoomed(false);
    setLightboxIndex((prev) => (prev === 0 ? MEDIA_ITEMS.length - 1 : prev - 1));
  };

  const handleNextMedia = (e) => {
    e.stopPropagation();
    setIsZoomed(false);
    setLightboxIndex((prev) => (prev === MEDIA_ITEMS.length - 1 ? 0 : prev + 1));
  };

  const toggleFullscreen = () => {
    if (!lightboxVideoRef.current) return;
    if (lightboxVideoRef.current.requestFullscreen) {
      lightboxVideoRef.current.requestFullscreen();
    } else if (lightboxVideoRef.current.webkitRequestFullscreen) {
      lightboxVideoRef.current.webkitRequestFullscreen();
    }
  };

  return (
    <div className="w-full mb-8">
      {/* Featured Achievement Card */}
      <motion.div 
        layout
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl overflow-hidden glass-panel border border-amber-500/25 shadow-[0_0_35px_rgba(245,158,11,0.08)] hover:border-amber-500/40 transition-colors duration-300"
      >
        {/* Subtle decorative background gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        {/* Top Gold Accent Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80" />

        {/* Collapsed Achievement Card Header */}
        <div className="p-6 sm:p-8 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            {/* 🏆 1st Prize & Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-base sm:text-lg font-extrabold text-amber-300 flex items-center gap-1.5 drop-shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                🏆 1st Prize
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/35">
                1ST PRIZE
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/15 text-indigo-300 border border-indigo-500/25">
                <Sparkles size={11} className="text-indigo-400" />
                POLICY INNOVATION
              </span>
            </div>

            {/* Team Achievement Pill */}
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              <Users size={13} className="text-indigo-400" />
              <span>Team Achievement</span>
            </div>
          </div>

          {/* Forum / Category */}
          <p className="text-xs sm:text-sm font-semibold text-slate-400 tracking-wider uppercase mb-1">
            Youth Leadership & Governance Forum 2026
          </p>

          {/* Project Title */}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-2 font-display">
            ANNADATA POLICY 2047
          </h3>

          {/* Tagline */}
          <p className="text-sm sm:text-base text-indigo-300/90 font-medium italic mb-6">
            &ldquo;One Farmer, One Resolution&rdquo;
          </p>

          {/* View Achievement Action Button */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-indigo-600/20 to-purple-600/20 hover:from-amber-500/25 hover:via-indigo-600/30 hover:to-purple-600/30 border border-amber-500/30 hover:border-amber-500/50 text-white text-xs sm:text-sm font-bold transition-all duration-300 shadow-md shadow-amber-500/5 hover:scale-[1.02] cursor-pointer"
            >
              <span>{isExpanded ? 'Collapse Achievement' : 'View Achievement'}</span>
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={16} className="text-amber-400" />
              </motion.span>
            </button>

            {!isExpanded && (
              <span className="text-[11px] text-slate-400 hidden sm:inline-block">
                Case Study • Pitch Video • Media Collage
              </span>
            )}
          </div>
        </div>

        {/* Expanded Details Revealed on Click */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="expanded-content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-white/10 bg-slate-950/40 overflow-hidden"
            >
              <div className="p-6 sm:p-8 space-y-8">
                
                {/* 1. KEY METRICS ROW */}
                <div className="grid grid-cols-3 gap-3 sm:gap-6">
                  {/* Metric 1 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05, duration: 0.35 }}
                    className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-amber-500/10 to-amber-500/5 border border-amber-500/25 text-center relative overflow-hidden group hover:border-amber-500/40 transition"
                  >
                    <div className="text-2xl sm:text-4xl font-extrabold text-amber-300 font-display mb-1 flex items-center justify-center gap-1">
                      <span>1st</span>
                    </div>
                    <p className="text-[10px] sm:text-xs font-semibold text-amber-200/70 uppercase tracking-wider">
                      Prize
                    </p>
                  </motion.div>

                  {/* Metric 2 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.35 }}
                    className="p-4 sm:p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center relative overflow-hidden group hover:border-indigo-500/35 transition"
                  >
                    <div className="text-2xl sm:text-4xl font-extrabold text-indigo-300 font-display mb-1">
                      3
                    </div>
                    <p className="text-[10px] sm:text-xs font-semibold text-indigo-200/70 uppercase tracking-wider">
                      Team Members
                    </p>
                  </motion.div>

                  {/* Metric 3 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.35 }}
                    className="p-4 sm:p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center relative overflow-hidden group hover:border-purple-500/35 transition"
                  >
                    <div className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-purple-300 font-display mb-1 tracking-tight truncate">
                      ANNADATA
                    </div>
                    <p className="text-[10px] sm:text-xs font-semibold text-purple-200/70 uppercase tracking-wider">
                      Policy 2047
                    </p>
                  </motion.div>
                </div>

                {/* 2. PROMINENT STATEMENT */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.18, duration: 0.4 }}
                  className="relative p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-600/10 to-purple-600/10 border border-amber-500/30 text-center shadow-lg shadow-amber-500/5"
                >
                  <p className="text-lg sm:text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-indigo-300 font-display leading-snug">
                    &ldquo;From an idea on paper to a policy pitch on stage to 1st Prize.&rdquo;
                  </p>
                </motion.div>

                {/* 3. DESCRIPTION & CORE IDEA & ACHIEVEMENT STORY */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column: Description & Core Idea */}
                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
                        Description
                      </h4>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                        Presented ANNADATA POLICY 2047, &ldquo;One Farmer, One Resolution&rdquo;, a farmer-centric policy proposal focused on improving agricultural grievance coordination and making government services more accessible and accountable for farmers.
                      </p>
                    </div>

                    {/* Core Idea Highlight Box */}
                    <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 relative overflow-hidden">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-300 mt-0.5">
                          <Lightbulb size={18} />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1">
                            Core Idea
                          </h4>
                          <p className="text-white text-xs sm:text-sm font-medium leading-relaxed">
                            &ldquo;A farmer should report the problem once. The system should take responsibility for coordinating the solution.&rdquo;
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Achievement Story & Key Takeaway */}
                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                        Achievement Story
                      </h4>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
                        Our team presented the policy proposal at the Youth Leadership &amp; Governance Forum 2026 and won 1st Prize.
                      </p>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                        The experience focused on understanding real problems, questioning existing systems, discussing practical solutions, and designing a policy around the needs of farmers.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/15">
                      <div className="flex items-center gap-2 mb-1 text-xs font-bold uppercase tracking-wider text-indigo-300">
                        <ShieldCheck size={15} />
                        <span>Key Takeaway</span>
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        Policy innovation is most impactful when it bridges grassroots realities with systemic accountability — transforming fragmented agricultural grievances into a unified, responsive governance model.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4. MEDIA COLLAGE (3 items) */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      Media Collage &amp; Stage Footage
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      Click any item to view full screen
                    </span>
                  </div>

                  {/* Responsive Collage Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
                    
                    {/* Item 1: Large Photo 1 on Left */}
                    <div 
                      onClick={() => openLightbox(0)}
                      className="lg:col-span-7 relative min-h-[320px] sm:min-h-[380px] lg:min-h-[460px] rounded-2xl overflow-hidden bg-slate-950 border border-white/10 hover:border-amber-500/40 transition-all duration-300 group cursor-pointer flex items-center justify-center"
                    >
                      {/* Ambient blur background */}
                      <img 
                        src={MEDIA_ITEMS[0].url} 
                        alt="" 
                        className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 pointer-events-none scale-110" 
                      />
                      {/* Foreground crisp photo - object-contain preserves 100% of stage, faces, & certificates */}
                      <img 
                        src={MEDIA_ITEMS[0].url} 
                        alt={MEDIA_ITEMS[0].title}
                        loading="lazy"
                        decoding="async"
                        className="relative z-10 w-full h-full object-contain p-1 group-hover:scale-[1.02] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity pointer-events-none z-10" />
                      
                      <div className="absolute top-3 left-3 z-20">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white border border-white/10 backdrop-blur-md">
                          Photo 1 • Stage Presentation
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20">
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition">
                            {MEDIA_ITEMS[0].title}
                          </p>
                          <p className="text-[10px] sm:text-[11px] text-slate-300 line-clamp-1">
                            {MEDIA_ITEMS[0].caption}
                          </p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-amber-500 group-hover:text-slate-950 text-white flex items-center justify-center shrink-0 backdrop-blur-md transition">
                          <Maximize2 size={14} />
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Photo 2 on Top, Video Preview Underneath */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                      
                      {/* Item 2: Photo 2 (Top Right) */}
                      <div 
                        onClick={() => openLightbox(1)}
                        className="relative h-48 sm:h-52 lg:h-[222px] rounded-2xl overflow-hidden bg-slate-950 border border-white/10 hover:border-amber-500/40 transition-all duration-300 group cursor-pointer flex items-center justify-center"
                      >
                        {/* Ambient blur background */}
                        <img 
                          src={MEDIA_ITEMS[1].url} 
                          alt="" 
                          className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 pointer-events-none scale-110" 
                        />
                        {/* Foreground crisp photo */}
                        <img 
                          src={MEDIA_ITEMS[1].url} 
                          alt={MEDIA_ITEMS[1].title}
                          loading="lazy"
                          decoding="async"
                          className="relative z-10 w-full h-full object-contain p-1 group-hover:scale-[1.02] transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity pointer-events-none z-10" />
                        
                        <div className="absolute top-3 left-3 z-20">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                            Photo 2 • 1st Prize Certificate
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20">
                          <div>
                            <p className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                              {MEDIA_ITEMS[1].title}
                            </p>
                            <p className="text-[10px] text-slate-300 line-clamp-1">
                              {MEDIA_ITEMS[1].caption}
                            </p>
                          </div>
                          <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-amber-500 group-hover:text-slate-950 text-white flex items-center justify-center shrink-0 backdrop-blur-md transition">
                            <Maximize2 size={12} />
                          </div>
                        </div>
                      </div>

                      {/* Item 3: Video Preview (Bottom Right) */}
                      <div 
                        onClick={() => openLightbox(2)}
                        className="relative h-48 sm:h-52 lg:h-[222px] rounded-2xl overflow-hidden bg-slate-950 border border-white/10 hover:border-amber-500/40 transition-all duration-300 group cursor-pointer flex items-center justify-center"
                      >
                        {/* Ambient blur background */}
                        <img 
                          src={MEDIA_ITEMS[2].poster} 
                          alt="" 
                          className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 pointer-events-none scale-110" 
                        />
                        {/* Foreground poster */}
                        <img 
                          src={MEDIA_ITEMS[2].poster} 
                          alt={MEDIA_ITEMS[2].title}
                          loading="lazy"
                          decoding="async"
                          className="relative z-10 w-full h-full object-contain p-1 group-hover:scale-[1.02] transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors pointer-events-none z-10" />
                        
                        {/* Centered Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-amber-500/90 group-hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-all duration-300">
                            <Play size={22} className="ml-1 fill-current" />
                          </div>
                        </div>

                        <div className="absolute top-3 left-3 z-20">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white border border-white/10 backdrop-blur-md flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            Video Preview
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20">
                          <div>
                            <p className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                              {MEDIA_ITEMS[2].title}
                            </p>
                            <p className="text-[10px] text-slate-300 line-clamp-1">
                              Watch the live stage pitch
                            </p>
                          </div>
                          <span className="text-[10px] font-semibold text-amber-400 px-2 py-0.5 rounded bg-black/50 border border-white/10">
                            Play
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* 5. TEAM MEMBERS & ACKNOWLEDGEMENTS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Team Members */}
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-3 flex items-center gap-1.5">
                      <Users size={14} />
                      Team
                    </h4>
                    <div className="space-y-2.5">
                      {TEAM_MEMBERS.map((memberName, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/50 border border-white/5"
                        >
                          <div className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center text-xs font-bold shrink-0">
                            {memberName.charAt(0)}
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-white">
                            {memberName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Acknowledgements (kept inside expanded details, compact & clean) */}
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-amber-400" />
                      Acknowledgements
                    </h4>
                    <div className="space-y-2.5">
                      {ACKNOWLEDGEMENTS.map((ack, idx) => (
                        <div 
                          key={idx}
                          className="p-2.5 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-between"
                        >
                          <span className="text-xs sm:text-sm font-semibold text-white">
                            {ack.name}
                          </span>
                          <span className="text-[10px] sm:text-[11px] text-slate-400">
                            {ack.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 6. TAGS */}
                <div className="pt-2">
                  <div className="flex flex-wrap gap-2">
                    {TAGS.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="text-[11px] font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1 rounded-lg transition"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 7. Bottom Collapse Button */}
                <div className="pt-4 flex justify-center">
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer"
                  >
                    <ChevronUp size={14} />
                    <span>Collapse Details</span>
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Full-Screen Media Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6"
          >
            {/* Top Control Bar */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl flex items-center justify-between py-2 border-b border-white/10"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                  {lightboxIndex + 1} of {MEDIA_ITEMS.length}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white truncate max-w-xs sm:max-w-md">
                  {MEDIA_ITEMS[lightboxIndex].title}
                </span>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-2">
                {/* Photo Zoom Button */}
                {MEDIA_ITEMS[lightboxIndex].type === 'image' && (
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    title={isZoomed ? "Zoom Out" : "Zoom In"}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition cursor-pointer"
                  >
                    {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
                  </button>
                )}

                {/* Video Fullscreen Button */}
                {MEDIA_ITEMS[lightboxIndex].type === 'video' && (
                  <button
                    onClick={toggleFullscreen}
                    title="Fullscreen"
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition cursor-pointer"
                  >
                    <Maximize2 size={18} />
                  </button>
                )}

                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  title="Close (Esc)"
                  className="p-2 rounded-xl bg-white/10 hover:bg-red-500/80 text-slate-200 hover:text-white transition cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Media Content Area */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-4 overflow-hidden"
            >
              {/* Previous Button */}
              <button
                onClick={handlePrevMedia}
                title="Previous (Left Arrow)"
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-white/10 hover:border-amber-400 transition shadow-lg cursor-pointer"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNextMedia}
                title="Next (Right Arrow)"
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-white/10 hover:border-amber-400 transition shadow-lg cursor-pointer"
              >
                <ChevronRight size={22} />
              </button>

              {/* Media Render */}
              {MEDIA_ITEMS[lightboxIndex].type === 'image' ? (
                <div className={`w-full h-full flex items-center justify-center overflow-auto ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
                  <img
                    src={MEDIA_ITEMS[lightboxIndex].url}
                    alt={MEDIA_ITEMS[lightboxIndex].title}
                    onClick={() => setIsZoomed(!isZoomed)}
                    style={{ transform: isZoomed ? 'scale(1.75)' : 'scale(1)' }}
                    className="max-h-[75vh] max-w-[85vw] object-contain rounded-xl transition-transform duration-300 select-none shadow-2xl"
                  />
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center max-w-3xl">
                  <div className="relative w-full aspect-video sm:aspect-auto max-h-[75vh] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl flex items-center justify-center">
                    <video
                      ref={lightboxVideoRef}
                      src={MEDIA_ITEMS[lightboxIndex].url}
                      poster={MEDIA_ITEMS[lightboxIndex].poster}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full max-h-[75vh] object-contain bg-black"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Caption & Controls */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl text-center py-2"
            >
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {MEDIA_ITEMS[lightboxIndex].caption}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Use <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">→</kbd> to navigate, <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">Esc</kbd> to exit
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
