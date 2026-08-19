import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, Sliders, Video, Film, Layout, Image, 
  ArrowLeft, Share2, X, ChevronLeft, ChevronRight, 
  Eye, Users, BookOpen, MapPin, Sparkles, Calendar, Check
} from 'lucide-react';
import { 
  PHOTOGRAPHY_STATS, PHOTOGRAPHY_CATEGORIES, 
  CREATIVE_SETUP, PHOTOGRAPHY_TIMELINE 
} from '../lib/photographyData';
import { supabase } from '../lib/supabaseClient';

// Map icon string names to Lucide icons for the Setup section
const SetupIconMapper = ({ name, className }) => {
  switch (name) {
    case 'camera': return <Camera className={className} />;
    case 'sliders': return <Sliders className={className} />;
    case 'video': return <Video className={className} />;
    case 'film': return <Film className={className} />;
    case 'layout': return <Layout className={className} />;
    case 'image': return <Image className={className} />;
    default: return <Sparkles className={className} />;
  }
};

export default function BehindTheLens() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);
  const [copiedId, setCopiedId] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // Before/After Slider Container Ref
  const sliderContainerRef = useRef(null);

  // Fetch photos from database on load
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio_photos')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Map database columns to camelCase expected by component state
        const mapped = (data || []).map(item => ({
          id: item.id,
          title: item.title,
          category: item.category,
          image: item.image,
          location: item.location,
          shotOn: item.shot_on,
          story: item.story,
          editingStyle: item.editing_style,
          aspect: item.aspect
        }));

        setGalleryItems(mapped);
      } catch (err) {
        console.error('Error fetching photos:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  // Filter gallery items
  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());

  // Handle Before/After Dragging
  const handleMove = (clientX) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e) => {
    if (!isDragging && e.buttons !== 1) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 0) return;
    handleMove(e.touches[0].clientX);
  };

  // Lightbox Navigation
  const handlePrevItem = (e) => {
    e.stopPropagation();
    const currentIndex = filteredItems.findIndex(i => i.id === activeLightboxItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveLightboxItem(filteredItems[prevIndex]);
  };

  const handleNextItem = (e) => {
    e.stopPropagation();
    const currentIndex = filteredItems.findIndex(i => i.id === activeLightboxItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveLightboxItem(filteredItems[nextIndex]);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeLightboxItem) return;
      if (e.key === 'ArrowLeft') handlePrevItem(e);
      if (e.key === 'ArrowRight') handleNextItem(e);
      if (e.key === 'Escape') setActiveLightboxItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxItem, filteredItems]);

  // Share link function
  const handleShare = (item) => {
    const shareText = `Check out "${item.title}" by Karthik | Mobile Photographer - shot on ${item.shotOn} in ${item.location}`;
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: shareText,
        url: window.location.href,
      }).catch(err => console.log('Share failed', err));
    } else {
      navigator.clipboard.writeText(`${shareText} (${item.image})`);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  // Smooth scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col relative overflow-hidden select-none">
      {/* Film Grain Effect */}
      <div className="film-grain"></div>

      {/* Cinematic Glowing Backgrounds */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-[40%] right-10 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Cinematic Navigation bar */}
      <nav className="border-b border-white/5 backdrop-blur-md bg-black/60 sticky top-0 z-40 transition duration-300">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 group text-xs font-semibold text-slate-400 hover:text-white transition duration-300"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Portfolio</span>
          </Link>
          <div className="flex items-center gap-4">
            <a
              href="https://kar-thikexe.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-400 hover:text-indigo-300 font-bold bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-sm shadow-indigo-500/5"
            >
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></span>
              <span>Visit Photography Website</span>
              <ArrowLeft size={12} className="rotate-180" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto text-center px-6 pt-16 pb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-6">
            Mobile Visual Storyteller
          </span>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 leading-tight text-white font-display uppercase">
            Karthik | <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Mobile Photographer</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 font-light italic mb-12">
            "Capturing moments differently."
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {PHOTOGRAPHY_STATS.map((stat) => (
            <div key={stat.id} className="glass-panel p-4 rounded-xl text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h3 className="text-2xl font-bold text-white mb-0.5">
                {stat.isString ? stat.value : `${stat.value.toLocaleString()}${stat.suffix}`}
              </h3>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </header>

      {/* Before/After Editing Slider Section */}
      <section className="max-w-4xl mx-auto px-6 py-12 w-full relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-2">Visual Processing</h2>
          <h3 className="text-2xl font-bold text-white">Before / After Slider</h3>
          <p className="text-slate-450 text-xs mt-2 max-w-md mx-auto">
            Drag the slider horizontally to compare the raw unedited mobile capture with the final graded edit.
          </p>
        </div>

        <div 
          ref={sliderContainerRef}
          className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl cursor-ew-resize select-none"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          {/* Unedited (Before) Image - Underneath */}
          <img 
            src="/photography/before_slider.png" 
            className="absolute inset-0 w-full h-full object-cover" 
            alt="Original unedited mobile capture" 
            draggable="false"
          />
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-slate-350 border border-white/10 uppercase tracking-widest z-20">
            RAW (Before)
          </div>
          
          {/* Edited (After) Image - Clipped Overlay */}
          <div 
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
            style={{ width: `${sliderPosition}%` }}
          >
            <img 
              src="/photography/after_slider.png" 
              className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" 
              style={{ 
                width: sliderContainerRef.current ? `${sliderContainerRef.current.getBoundingClientRect().width}px` : '100vw',
                maxWidth: 'none'
              }}
              alt="Cinematic final color graded edit" 
              draggable="false"
            />
            <div className="absolute top-4 right-4 bg-indigo-500/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-indigo-400/25 uppercase tracking-widest z-20">
              GRADED (After)
            </div>
          </div>

          {/* Slider Drag Bar */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-2xl flex items-center justify-center pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="w-8 h-8 rounded-full bg-white text-slate-900 border border-white/20 flex items-center justify-center shadow-2xl pointer-events-auto hover:scale-110 active:scale-95 transition-transform duration-200">
              <Sliders size={14} className="transform rotate-90 stroke-[2.5]" />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Gallery Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 w-full relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-2">Cinematic Gallery</h2>
          <h3 className="text-3xl font-extrabold text-white">Visual Stories</h3>
          <p className="text-slate-400 text-xs mt-2">Filter photographs by categories and click for full screen backstories.</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {PHOTOGRAPHY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 border cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-white text-black border-white shadow-lg'
                  : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid with Columns */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div 
                key={i} 
                className="h-64 sm:h-80 rounded-2xl bg-white/5 border border-white/5 animate-pulse flex flex-col justify-end p-6"
              >
                <div className="h-3 w-1/4 bg-white/10 rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-white/10 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-2xl border border-white/5">
            <Camera className="mx-auto text-slate-500 mb-4 animate-pulse" size={32} />
            <p className="text-slate-450 text-sm">No photos found in this category.</p>
          </div>
        ) : (
          <motion.div 
            layout 
            className="columns-1 sm:columns-2 lg:columns-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  onClick={() => setActiveLightboxItem(item)}
                  className={`break-inside-avoid mb-6 rounded-2xl glass-panel p-2 border border-white/5 hover:border-white/10 overflow-hidden cursor-zoom-in group hover:scale-[1.01] transition-all duration-300`}
                >
                  <div className="relative overflow-hidden rounded-xl bg-slate-950">
                    {/* Subtle hover zoom effect */}
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-auto object-cover rounded-xl group-hover:scale-102 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    
                    {/* Glassmorphic hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <span className="text-[8px] font-bold text-indigo-400 tracking-wider uppercase bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20 w-fit mb-2">
                        {item.category}
                      </span>
                      <h4 className="text-base font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1">
                        <MapPin size={10} className="text-slate-500" />
                        <span>{item.location}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Cinematic Setup Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 w-full relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-2">Hardware & Software</h2>
          <h3 className="text-3xl font-extrabold text-white">My Creative Setup</h3>
          <p className="text-slate-400 text-xs mt-2">The essential tools that enable my visual capture and post-production workflow.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CREATIVE_SETUP.map((tool) => (
            <div 
              key={tool.id}
              className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center mb-4 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 transition-all duration-300">
                <SetupIconMapper name={tool.iconName} size={22} className="stroke-[1.5]" />
              </div>
              
              <h4 className="text-base font-bold text-white mb-0.5">{tool.title}</h4>
              <p className="text-[10px] font-bold text-indigo-400/80 uppercase tracking-wider mb-3">{tool.toolName}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Photography Journey Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 w-full relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-2">Chronicle</h2>
          <h3 className="text-3xl font-extrabold text-white">Photography Journey</h3>
          <p className="text-slate-400 text-xs mt-2">A timeline tracking my creative growth and content milestones.</p>
        </div>

        <div className="relative border-l border-white/10 pl-6 ml-4 space-y-12">
          {PHOTOGRAPHY_TIMELINE.map((step, idx) => (
            <div key={idx} className="relative">
              {/* Dot pointer */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-indigo-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
              </div>
              
              <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
                {step.year}
              </span>
              
              <h4 className="text-lg font-bold text-white mt-3 mb-4">{step.title}</h4>
              
              <ul className="space-y-2">
                {step.milestones.map((milestone, mIdx) => (
                  <li key={mIdx} className="text-slate-400 text-xs flex items-start gap-2 leading-relaxed">
                    <span className="text-indigo-400 select-none font-bold mt-0.5">•</span>
                    <span>{milestone}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Block */}
      <section className="max-w-4xl mx-auto px-6 py-16 w-full text-center relative z-10">
        <div className="glass-panel p-8 md:p-12 rounded-[2rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition duration-500"></div>
          
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 uppercase tracking-wide">
            Explore Full Photography Portfolio
          </h2>
          <p className="text-slate-400 text-xs mb-6">
            kar.thikexe • Visual Storytelling, Mobile Photography & Collaborations
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://kar-thikexe.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black hover:bg-slate-100 font-bold text-xs rounded-full transition shadow-lg cursor-pointer group/btn"
            >
              <span>Visit Photography Website</span>
              <ChevronRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="https://www.instagram.com/nimmanagoti.karthik"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs rounded-full border border-white/10 transition cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </section>

      {/* Cinematic Details Lightbox */}
      <AnimatePresence>
        {activeLightboxItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setActiveLightboxItem(null)}
          >
            {/* Close Button (Top Right) */}
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-6 right-6 p-2.5 text-white/70 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition z-50 border border-white/10 cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Lightbox Inner Container */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="relative w-full max-w-5xl rounded-3xl glass-panel border border-white/10 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation Arrows on Image sides */}
              <button 
                onClick={handlePrevItem}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-black/60 text-slate-300 hover:text-white border border-white/5 transition hover:scale-105 z-20 cursor-pointer"
                title="Previous Shot"
              >
                <ChevronLeft size={20} className="stroke-[2.5]" />
              </button>
              <button 
                onClick={handleNextItem}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-black/60 text-slate-300 hover:text-white border border-white/5 transition hover:scale-105 z-20 cursor-pointer"
                title="Next Shot"
              >
                <ChevronRight size={20} className="stroke-[2.5]" />
              </button>

              {/* Left Column: Blurred background & photo container */}
              <div className="lg:col-span-7 h-64 sm:h-[400px] lg:h-[650px] relative bg-black flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5 select-none">
                {/* Blurred reflection backdrop */}
                <div 
                  className="absolute inset-0 bg-cover bg-center blur-2xl opacity-20 scale-110 pointer-events-none"
                  style={{ backgroundImage: `url(${activeLightboxItem.image})` }}
                ></div>
                
                <img 
                  src={activeLightboxItem.image} 
                  alt={activeLightboxItem.title} 
                  className="relative max-w-full max-h-full object-contain p-2 select-none z-10 rounded-xl"
                  draggable="false"
                />
              </div>

              {/* Right Column: Story & metadata details */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[40vh] lg:max-h-[650px]">
                <div className="space-y-6">
                  {/* Category & Tags header */}
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-indigo-400 tracking-wider uppercase bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                      {activeLightboxItem.category}
                    </span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                      <MapPin size={10} />
                      {activeLightboxItem.location}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    {activeLightboxItem.title}
                  </h3>

                  {/* Shot metadata details */}
                  <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-4">
                    <div>
                      <h5 className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Shot on Mobile</h5>
                      <p className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                        <Camera size={12} className="text-indigo-400" />
                        {activeLightboxItem.shotOn}
                      </p>
                    </div>
                    <div>
                      <h5 className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Color Grading</h5>
                      <p className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                        <Sliders size={12} className="text-purple-400" />
                        Lightroom Preset
                      </p>
                    </div>
                  </div>

                  {/* Story */}
                  <div>
                    <h5 className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <BookOpen size={10} />
                      The Backstory
                    </h5>
                    <p className="text-slate-300 text-xs leading-relaxed italic">
                      "{activeLightboxItem.story}"
                    </p>
                  </div>

                  {/* Editing style */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <h5 className="text-[8px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5">Editing Recipe</h5>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {activeLightboxItem.editingStyle}
                    </p>
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="flex items-center gap-3 pt-6 border-t border-white/5 mt-6">
                  <button
                    onClick={() => handleShare(activeLightboxItem)}
                    className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {copiedId ? (
                      <>
                        <Check size={14} className="text-emerald-400 stroke-[3]" />
                        <span className="text-emerald-400">Copied Recipe!</span>
                      </>
                    ) : (
                      <>
                        <Share2 size={14} />
                        <span>Share Shot</span>
                      </>
                    )}
                  </button>
                  <a
                    href="https://kar-thikexe.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-indigo-650 hover:bg-indigo-550 text-white font-bold text-xs rounded-xl shadow-lg transition cursor-pointer flex items-center gap-1"
                  >
                    <span>View More Work</span>
                    <ChevronRight size={12} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
