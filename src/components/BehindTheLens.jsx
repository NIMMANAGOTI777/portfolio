import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, Sliders, Video, Film, Layout, Image, 
  ArrowLeft, Share2, X, ChevronLeft, ChevronRight, 
  BookOpen, MapPin, Sparkles, Check
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

  // Set page title for route
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Behind the Lens | Photography & Visual Storytelling - Karthik Nimmanagoti";
    window.scrollTo(0, 0);
    return () => {
      document.title = originalTitle;
    };
  }, []);

  // Fetch photos from database on load
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio_photos')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

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

  return (
    <div className="min-h-screen bg-[#090909] text-white flex flex-col relative overflow-hidden select-none">
      {/* Cinematic Glowing Backgrounds */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#FF5A1F]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-[40%] right-10 w-[600px] h-[600px] bg-[#D9361E]/5 rounded-full blur-[180px] pointer-events-none"></div>

      {/* Cinematic Navigation bar */}
      <nav className="border-b border-white/10 backdrop-blur-md bg-[#090909]/80 sticky top-0 z-40 transition duration-300">
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
              className="text-xs text-[#FFA87D] hover:text-white font-bold bg-[#FF5A1F]/10 border border-[#FF5A1F]/25 px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-sm"
            >
              <span className="w-1.5 h-1.5 bg-[#FF5A1F] rounded-full animate-pulse"></span>
              <span>Visit Photography Website</span>
              <ArrowLeft size={12} className="rotate-180" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto text-center px-6 pt-16 pb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-[#FF5A1F]/15 border border-[#FF5A1F]/30 text-[#FFA87D] text-[10px] font-bold uppercase tracking-wider mb-6">
            Mobile Visual Storyteller
          </span>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 leading-tight text-white font-display uppercase">
            Karthik | <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFA87D] to-[#FF5A1F]">Mobile Photographer</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 font-light italic mb-12">
            "Capturing moments differently."
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-5 gap-3.5 max-w-4xl mx-auto pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {PHOTOGRAPHY_STATS.map((stat) => (
            <div key={stat.id} className="p-4 rounded-2xl bg-[#171717] border border-white/5 text-center relative overflow-hidden group shadow-md">
              <h3 className="text-2xl font-bold text-white mb-0.5 font-display">
                {stat.isString ? stat.value : `${stat.value.toLocaleString()}${stat.suffix}`}
              </h3>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </header>

      {/* Before/After Editing Slider Section */}
      <section className="max-w-4xl mx-auto px-6 py-12 w-full relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-xs font-bold text-[#FF7A18] tracking-widest uppercase mb-2">Visual Processing</h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Before / After Slider</h3>
          <p className="text-slate-400 text-xs mt-2 max-w-md mx-auto font-light">
            Drag the slider horizontally to compare the raw unedited mobile capture with the final graded edit.
          </p>
        </div>

        <div 
          ref={sliderContainerRef}
          className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-3xl overflow-hidden bg-[#171717] border border-white/10 shadow-2xl cursor-ew-resize select-none"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          {/* Unedited (Before) Image */}
          <img 
            src="/photography/before_slider.png" 
            className="absolute inset-0 w-full h-full object-cover" 
            alt="Original unedited mobile capture" 
            draggable="false"
          />
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-slate-300 border border-white/10 uppercase tracking-widest z-20">
            RAW (Before)
          </div>
          
          {/* Edited (After) Image */}
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
            <div className="absolute top-4 right-4 bg-[#FF5A1F] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest z-20 shadow-md">
              GRADED (After)
            </div>
          </div>

          {/* Slider Drag Bar */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-2xl flex items-center justify-center pointer-events-none"
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
          <h2 className="text-xs font-bold text-[#FF7A18] tracking-widest uppercase mb-2">Cinematic Gallery</h2>
          <h3 className="text-3xl font-extrabold text-white font-display">Visual Stories</h3>
          <p className="text-slate-400 text-xs mt-2 font-light">Filter photographs by categories and click for full screen backstories.</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {PHOTOGRAPHY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 border cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] text-white border-transparent shadow-lg shadow-[#FF5A1F]/20'
                  : 'bg-[#171717] text-slate-400 border-white/10 hover:bg-[#222222] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div 
                key={i} 
                className="h-64 sm:h-80 rounded-2xl bg-[#171717] border border-white/5 animate-pulse flex flex-col justify-end p-6"
              >
                <div className="h-3 w-1/4 bg-white/10 rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-white/10 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl bg-[#171717] border border-white/10">
            <Camera className="mx-auto text-slate-500 mb-4 animate-pulse" size={32} />
            <p className="text-slate-400 text-sm">No photos found in this category.</p>
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
                  transition={{ duration: 0.35 }}
                  key={item.id}
                  onClick={() => setActiveLightboxItem(item)}
                  className="break-inside-avoid mb-6 rounded-3xl bg-[#171717] p-2 border border-white/10 hover:border-[#FF5A1F]/40 overflow-hidden cursor-zoom-in group hover:scale-[1.01] transition-all duration-300 shadow-md"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-black">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-auto object-cover rounded-2xl group-hover:scale-102 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <span className="text-[8px] font-bold text-[#FFA87D] tracking-wider uppercase bg-[#FF5A1F]/20 px-2 py-0.5 rounded-full border border-[#FF5A1F]/30 w-fit mb-2">
                        {item.category}
                      </span>
                      <h4 className="text-base font-bold text-white mb-1 font-display">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1 font-light">
                        <MapPin size={10} className="text-[#FF5A1F]" />
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
          <h2 className="text-xs font-bold text-[#FF7A18] tracking-widest uppercase mb-2">Hardware & Software</h2>
          <h3 className="text-3xl font-extrabold text-white font-display">My Creative Setup</h3>
          <p className="text-slate-400 text-xs mt-2 font-light">The essential tools that enable my visual capture and post-production workflow.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CREATIVE_SETUP.map((tool) => (
            <div 
              key={tool.id}
              className="p-6 rounded-3xl bg-[#171717] border border-white/10 hover:border-[#FF5A1F]/40 transition-all duration-300 relative overflow-hidden group shadow-md"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#222222] border border-white/10 flex items-center justify-center mb-4 text-[#FF7A18] group-hover:scale-110 group-hover:bg-[#FF5A1F]/15 group-hover:text-[#FFA87D] transition-all duration-300">
                <SetupIconMapper name={tool.iconName} className="w-5 h-5 stroke-[1.8]" />
              </div>
              
              <h4 className="text-base font-bold text-white mb-0.5 font-display">{tool.title}</h4>
              <p className="text-[10px] font-bold text-[#FF7A18] uppercase tracking-wider mb-3">{tool.toolName}</p>
              <p className="text-slate-400 text-xs leading-relaxed font-light">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Photography Journey Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 w-full relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold text-[#FF7A18] tracking-widest uppercase mb-2">Chronicle</h2>
          <h3 className="text-3xl font-extrabold text-white font-display">Photography Journey</h3>
          <p className="text-slate-400 text-xs mt-2 font-light">A timeline tracking my creative growth and content milestones.</p>
        </div>

        <div className="relative border-l border-white/10 pl-6 ml-4 space-y-12">
          {PHOTOGRAPHY_TIMELINE.map((step, idx) => (
            <div key={idx} className="relative">
              {/* Dot pointer */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-[#FF5A1F] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]"></div>
              </div>
              
              <span className="text-xs font-bold text-[#FFA87D] bg-[#FF5A1F]/15 border border-[#FF5A1F]/30 px-3 py-1 rounded-full">
                {step.year}
              </span>
              
              <h4 className="text-lg font-bold text-white mt-3 mb-4 font-display">{step.title}</h4>
              
              <ul className="space-y-2">
                {step.milestones.map((milestone, mIdx) => (
                  <li key={mIdx} className="text-slate-300 text-xs flex items-start gap-2 leading-relaxed font-light">
                    <span className="text-[#FF5A1F] select-none font-bold mt-0.5">•</span>
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
        <div className="p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-b from-[#1C1412] via-[#171717] to-[#121212] border border-[#FF5A1F]/30 relative overflow-hidden shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 uppercase tracking-wide font-display">
            Explore Full Photography Portfolio
          </h2>
          <p className="text-slate-300 text-xs mb-6 font-light">
            kar.thikexe • Visual Storytelling, Mobile Photography & Collaborations
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://kar-thikexe.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] hover:from-[#FF7A18] hover:to-[#D9361E] text-white font-bold text-xs rounded-xl transition shadow-lg shadow-[#FF5A1F]/25 cursor-pointer group/btn"
            >
              <span>Visit Photography Website</span>
              <ChevronRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="https://www.instagram.com/nimmanagoti.karthik"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#252525] hover:bg-[#303030] text-white font-bold text-xs rounded-xl border border-white/10 transition cursor-pointer"
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
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-6 right-6 p-2.5 text-white/70 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition z-50 border border-white/10 cursor-pointer"
            >
              <X size={20} />
            </button>

            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="relative w-full max-w-5xl rounded-3xl bg-[#171717] border border-white/10 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
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

              <div className="lg:col-span-7 h-64 sm:h-[400px] lg:h-[650px] relative bg-black flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5 select-none">
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

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[40vh] lg:max-h-[650px] bg-[#111111]">
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-[#FFA87D] tracking-wider uppercase bg-[#FF5A1F]/20 px-2.5 py-0.5 rounded-full border border-[#FF5A1F]/30">
                      {activeLightboxItem.category}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <MapPin size={10} className="text-[#FF5A1F]" />
                      {activeLightboxItem.location}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                    {activeLightboxItem.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-4">
                    <div>
                      <h5 className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Shot on Mobile</h5>
                      <p className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                        <Camera size={12} className="text-[#FF7A18]" />
                        {activeLightboxItem.shotOn}
                      </p>
                    </div>
                    <div>
                      <h5 className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Color Grading</h5>
                      <p className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                        <Sliders size={12} className="text-[#FFA87D]" />
                        Lightroom Preset
                      </p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <BookOpen size={10} className="text-[#FF5A1F]" />
                      The Backstory
                    </h5>
                    <p className="text-slate-300 text-xs leading-relaxed italic font-light">
                      "{activeLightboxItem.story}"
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#171717] border border-white/5">
                    <h5 className="text-[8px] font-bold text-[#FFA87D] uppercase tracking-widest mb-1.5">Editing Recipe</h5>
                    <p className="text-slate-400 text-[11px] leading-relaxed font-light">
                      {activeLightboxItem.editingStyle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-6 border-t border-white/5 mt-6">
                  <button
                    onClick={() => handleShare(activeLightboxItem)}
                    className="flex-1 py-2.5 bg-[#252525] hover:bg-[#303030] border border-white/10 text-slate-200 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
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
                    className="px-5 py-2.5 bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] hover:from-[#FF7A18] hover:to-[#D9361E] text-white font-bold text-xs rounded-xl shadow-lg shadow-[#FF5A1F]/20 transition cursor-pointer flex items-center gap-1"
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
