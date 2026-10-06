import React, { useState, useEffect, useRef } from 'react';
import { 
  X, ChevronLeft, ChevronRight, Calendar, MapPin, 
  Sparkles, CheckCircle2, ArrowRight, Maximize2, 
  Layers, Palette, PenTool, Award, Shield, Eye, ArrowUpRight
} from 'lucide-react';

export default function ProjectCaseStudyModal({ project, isOpen, onClose, initialView = 'study' }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const galleryRef = useRef(null);
  const modalContentRef = useRef(null);

  const cs = project?.caseStudy;
  const gallery = cs?.gallery || [];

  // Scroll to gallery if initialView is 'gallery'
  useEffect(() => {
    if (isOpen && initialView === 'gallery' && galleryRef.current) {
      setTimeout(() => {
        galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 250);
    }
  }, [isOpen, initialView]);

  // Keyboard navigation for lightbox & modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (lightboxIndex !== null) {
        if (e.key === 'Escape') {
          setLightboxIndex(null);
        } else if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
        } else if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, lightboxIndex, gallery.length, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div 
        ref={modalContentRef}
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto glass-panel border border-white/10 rounded-3xl shadow-2xl animate-scale-in my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Bar */}
        <div className="sticky top-0 bg-slate-950/90 backdrop-blur-xl border-b border-white/10 px-5 sm:px-8 py-4 flex items-center justify-between z-30">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="text-[10px] font-extrabold uppercase text-indigo-400 bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-0.5 rounded-full shrink-0">
              {project.eyebrow || 'Featured Project'}
            </span>
            {project.badgeSecondary && (
              <span className="text-[10px] font-extrabold uppercase text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full shrink-0 hidden sm:inline-block">
                {project.badgeSecondary}
              </span>
            )}
            <h2 id="case-study-title" className="text-sm sm:text-base font-bold text-white truncate">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition border border-white/10 shrink-0 cursor-pointer ml-3"
            aria-label="Close case study modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 md:p-10 space-y-12">
          
          {/* HERO SECTION */}
          <section className="space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                  {project.eyebrow || 'FEATURED PROJECT'}
                </span>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  {project.badgeSecondary || 'GOVERNMENT / PUBLIC EVENT'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
                {cs?.title || project.title}
              </h1>
              
              <p className="text-base sm:text-lg font-bold text-indigo-300">
                {cs?.subtitle || project.sub}
              </p>
            </div>

            {/* Hero Introductions */}
            <div className="space-y-3 border-l-2 border-indigo-500/40 pl-4 sm:pl-5 py-1">
              {cs?.heroIntros?.map((intro, idx) => (
                <p key={idx} className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                  "{intro}"
                </p>
              ))}
            </div>

            {/* Event Key Highlights Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                  <Calendar size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Summit Date</span>
                  <p className="text-xs sm:text-sm font-bold text-white mt-0.5">{cs?.date || '3 October 2026'}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Venue</span>
                  <p className="text-xs sm:text-sm font-bold text-white mt-0.5">{cs?.venue || 'Dr. B. R. Ambedkar Kala Vedika, Vijayawada'}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                  <Sparkles size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Summit Theme</span>
                  <p className="text-xs sm:text-sm font-bold text-emerald-200 mt-0.5">{cs?.theme || '“Catalyzing Innovation for Swarna Andhra Vision 2047”'}</p>
                </div>
              </div>
            </div>

            {/* Featured Hero Image */}
            <div 
              onClick={() => setLightboxIndex(0)}
              className="relative w-full h-72 sm:h-96 md:h-[460px] rounded-3xl overflow-hidden border border-white/10 group cursor-pointer bg-slate-900 shadow-2xl"
            >
              <img 
                src={gallery[0]?.url || project.image} 
                alt={gallery[0]?.alt || "PanIIT Andhra Pradesh Summit 2026 featured hero image"}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 group-hover:opacity-90 transition-opacity"></div>
              
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between gap-4">
                <div className="glass-panel px-4 py-2 rounded-xl border border-white/10 max-w-lg">
                  <span className="text-[10px] font-extrabold uppercase text-indigo-300 tracking-wider block">
                    Featured Installation Preview
                  </span>
                  <p className="text-xs text-slate-200 font-medium truncate">
                    {gallery[0]?.caption || 'PanIIT Andhra Pradesh Summit 2026 event design by Karthik Nimmanagoti'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-black/60 backdrop-blur-md text-white border border-white/15 group-hover:bg-indigo-600 transition shrink-0">
                  <Maximize2 size={16} />
                </div>
              </div>
            </div>
          </section>

          {/* COMPACT INFORMATION SECTION / METADATA GRID */}
          <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-white/5 space-y-5">
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <span>Project Information & Specification</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cs?.metadata?.map((meta, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{meta.label}</span>
                  <p className="text-xs sm:text-sm font-semibold text-white leading-snug">{meta.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* MY ROLE & RESPONSIBILITIES */}
          <section className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 inline-block">
                01 — SCOPE & OWNERSHIP
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {cs?.myRole?.heading || 'MY ROLE'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                {cs?.myRole?.content}
              </p>
            </div>

            {/* Responsibilities Clean Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {cs?.myRole?.responsibilities?.map((resp, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-indigo-500/30 transition-all flex items-start gap-2.5 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0 group-hover:scale-125 transition-transform"></span>
                  <span className="text-xs font-medium text-slate-200 leading-snug group-hover:text-white transition-colors">
                    {resp}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* FROM FIGMA TO THE VENUE */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 inline-block">
                02 — DESIGN EXECUTION
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {cs?.figmaToVenue?.heading || 'FROM FIGMA TO THE VENUE'}
              </h3>
              
              <div className="space-y-3">
                {cs?.figmaToVenue?.paragraphs?.map((p, idx) => (
                  <p key={idx} className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div 
              onClick={() => setLightboxIndex(1)}
              className="lg:col-span-5 h-64 sm:h-72 rounded-3xl overflow-hidden border border-white/10 relative group cursor-pointer bg-slate-900 shadow-xl"
            >
              <img 
                src={gallery[1]?.url} 
                alt={gallery[1]?.alt || "Karthik Nimmanagoti event branding work at PanIIT Andhra Pradesh Summit 2026"} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-300 font-medium glass-panel p-2.5 rounded-xl border border-white/10">
                <span className="text-[9px] font-bold text-indigo-300 uppercase block">Venue Implementation</span>
                <p className="truncate text-[11px] text-slate-200">{gallery[1]?.caption}</p>
              </div>
            </div>
          </section>

          {/* A STATE-LEVEL PLATFORM */}
          <section className="p-6 sm:p-8 rounded-3xl glass-panel border border-indigo-500/20 relative overflow-hidden space-y-4">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
            
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 inline-block">
              03 — IMPACT & REACH
            </span>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {cs?.stateLevelPlatform?.heading || 'A STATE-LEVEL PLATFORM'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {cs?.stateLevelPlatform?.paragraphs?.map((p, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {p}
                </div>
              ))}
            </div>
          </section>

          {/* THE EVENT EXPERIENCE & THE PEOPLE BEHIND */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Event Experience */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/40 border border-white/5 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 inline-block mb-3">
                  04 — ON-GROUND
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 font-display">
                  {cs?.eventExperience?.heading || 'THE EVENT EXPERIENCE'}
                </h3>
                <div className="space-y-2.5">
                  {cs?.eventExperience?.paragraphs?.map((p, idx) => (
                    <p key={idx} className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              <div 
                onClick={() => setLightboxIndex(2)}
                className="h-44 rounded-2xl overflow-hidden border border-white/10 relative group cursor-pointer bg-slate-900 mt-4"
              >
                <img 
                  src={gallery[2]?.url} 
                  alt={gallery[2]?.alt} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent"></div>
                <div className="absolute bottom-2 left-3 right-3 text-[10px] text-slate-300 truncate">
                  {gallery[2]?.caption}
                </div>
              </div>
            </div>

            {/* People Behind The Experience */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/40 border border-white/5 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 inline-block mb-3">
                  05 — COMMUNITY
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 font-display">
                  {cs?.peopleBehind?.heading || 'THE PEOPLE BEHIND THE EXPERIENCE'}
                </h3>
                <div className="space-y-2.5">
                  {cs?.peopleBehind?.paragraphs?.map((p, idx) => (
                    <p key={idx} className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              <div 
                onClick={() => setLightboxIndex(4)}
                className="h-44 rounded-2xl overflow-hidden border border-white/10 relative group cursor-pointer bg-slate-900 mt-4"
              >
                <img 
                  src={gallery[4]?.url} 
                  alt={gallery[4]?.alt} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent"></div>
                <div className="absolute bottom-2 left-3 right-3 text-[10px] text-slate-300 truncate">
                  {gallery[4]?.caption}
                </div>
              </div>
            </div>
          </section>

          {/* WHAT I LEARNED (6 Clean Cards) */}
          <section className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 inline-block">
                06 — KEY TAKEAWAYS
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                WHAT I LEARNED
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-light">
                Key principles acquired from designing and deploying large-scale public event brand assets.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cs?.learnings?.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-5 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-indigo-500/30 transition-all space-y-2 group"
                >
                  <span className="text-xs font-black text-indigo-400 font-mono block group-hover:translate-x-1 transition-transform">
                    {item.num}
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-slate-200 leading-relaxed group-hover:text-white transition-colors">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* A MEANINGFUL MILESTONE */}
          <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-br from-indigo-950/30 via-slate-900/60 to-purple-950/30 border border-indigo-500/30 space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 inline-block">
                07 — REFLECTION
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {cs?.milestone?.heading || 'A MEANINGFUL MILESTONE'}
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {cs?.milestone?.paragraphs?.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Three visually prominent final statements */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {cs?.milestone?.prominentStatements?.map((stmt, idx) => (
                <div 
                  key={idx} 
                  className="p-4 sm:p-5 rounded-2xl glass-panel border border-indigo-500/30 text-center flex items-center justify-center bg-indigo-500/5"
                >
                  <p className="text-xs sm:text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-white to-purple-200 font-display">
                    "{stmt}"
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* RECOGNITION */}
          <section className="p-6 sm:p-7 rounded-3xl bg-slate-900/40 border border-white/5 space-y-3">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 inline-block">
              08 — VALIDATION
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
              {cs?.recognition?.heading || 'RECOGNITION'}
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              {cs?.recognition?.paragraphs?.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </section>

          {/* ASYMMETRIC EDITORIAL PHOTO GALLERY COLLAGE */}
          <section ref={galleryRef} className="space-y-6 pt-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 inline-block mb-1">
                  09 — EDITORIAL GALLERY
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  Project Gallery & On-Ground Documentation
                </h3>
                <p className="text-xs text-slate-400 font-light mt-1">
                  Click any photograph to open the high-resolution media viewer.
                </p>
              </div>
              
              <span className="text-xs font-semibold text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                {gallery.length} Verified Photos
              </span>
            </div>

            {/* Asymmetric Collage Grid (1 Large + 2 Medium + 3 Supporting) */}
            <div className="space-y-3.5">
              {/* Row 1: 1 Large Featured (7 cols) + 2 Medium (5 cols stacked) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
                {/* Large Featured Image (Index 0) */}
                {gallery[0] && (
                  <div 
                    onClick={() => setLightboxIndex(0)}
                    className="lg:col-span-7 h-72 sm:h-96 rounded-3xl overflow-hidden border border-white/10 relative group cursor-pointer bg-slate-900 shadow-xl"
                  >
                    <img 
                      src={gallery[0].url} 
                      alt={gallery[0].alt} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute top-3 left-3 bg-indigo-600/90 backdrop-blur-md text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Featured On-Ground View
                    </div>
                    <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                      <p className="text-xs text-white font-medium max-w-md truncate">{gallery[0].caption}</p>
                      <span className="p-2 rounded-lg bg-black/60 text-white text-xs shrink-0 flex items-center gap-1 group-hover:bg-indigo-600 transition">
                        <Maximize2 size={13} />
                      </span>
                    </div>
                  </div>
                )}

                {/* 2 Medium Images (Indices 1 & 2) */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
                  {gallery.slice(1, 3).map((item, relIdx) => {
                    const absIdx = relIdx + 1;
                    return (
                      <div 
                        key={absIdx}
                        onClick={() => setLightboxIndex(absIdx)}
                        className="h-44 sm:h-46 rounded-3xl overflow-hidden border border-white/10 relative group cursor-pointer bg-slate-900 shadow-lg"
                      >
                        <img 
                          src={item.url} 
                          alt={item.alt} 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute bottom-2.5 left-3 right-3 flex justify-between items-center">
                          <p className="text-[11px] text-slate-200 font-medium truncate">{item.caption}</p>
                          <span className="p-1.5 rounded-md bg-black/60 text-white shrink-0 group-hover:bg-indigo-600 transition ml-2">
                            <Maximize2 size={11} />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Row 2: 3 Supporting Images (Indices 3, 4, 5) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {gallery.slice(3, 6).map((item, relIdx) => {
                  const absIdx = relIdx + 3;
                  return (
                    <div 
                      key={absIdx}
                      onClick={() => setLightboxIndex(absIdx)}
                      className="h-48 sm:h-52 rounded-2xl overflow-hidden border border-white/10 relative group cursor-pointer bg-slate-900 shadow-md"
                    >
                      <img 
                        src={item.url} 
                        alt={item.alt} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute bottom-2.5 left-3 right-3 flex justify-between items-center">
                        <p className="text-[11px] text-slate-200 font-medium truncate">{item.caption}</p>
                        <span className="p-1.5 rounded-md bg-black/60 text-white shrink-0 group-hover:bg-indigo-600 transition ml-2">
                          <Maximize2 size={11} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* BOTTOM MODAL ACTIONS */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              <span className="font-bold text-white block">PanIIT Andhra Pradesh Summit 2026</span>
              <span>Impact Designer | Student Organizer</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Close Case Study
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* FULL-SCREEN LIGHTBOX VIEWER */}
      {lightboxIndex !== null && gallery[lightboxIndex] && (
        <div 
          className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Lightbox Controls */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 text-xs text-white/80 font-mono bg-black/50 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            Photo {lightboxIndex + 1} of {gallery.length}
          </div>

          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 text-white/80 hover:text-white rounded-full bg-black/50 hover:bg-black/80 transition border border-white/10 backdrop-blur-md z-50 cursor-pointer"
            aria-label="Close lightbox"
          >
            <X size={22} />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white rounded-full bg-black/50 hover:bg-black/80 transition border border-white/10 backdrop-blur-md z-50 cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white rounded-full bg-black/50 hover:bg-black/80 transition border border-white/10 backdrop-blur-md z-50 cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image & Caption Container */}
          <div 
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={gallery[lightboxIndex].url} 
              alt={gallery[lightboxIndex].alt || "PanIIT Andhra Pradesh Summit photo"}
              className="max-w-full max-h-[72vh] object-contain rounded-2xl border border-white/10 shadow-2xl select-none"
            />
            
            <div className="mt-4 text-center max-w-xl px-4">
              <p className="text-xs sm:text-sm font-semibold text-white">
                {gallery[lightboxIndex].caption}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                PanIIT Andhra Pradesh Summit 2026 • Vijayawada
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
