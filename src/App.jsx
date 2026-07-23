import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactModal from './components/ContactModal';
import WhatsAppButton from './components/WhatsAppButton';
import KarthikAIChatbot from './components/KarthikAIChatbot';
import { 
  STATS, SERVICES, ACHIEVEMENTS, COLLABORATIONS, PROJECTS, 
  GALLERY, CERTIFICATIONS, TESTIMONIAL, FAQS, FEATURED_EVENTS,
  SKILLS_DATA, CURRENTLY_WORKING_ON 
} from './lib/portfolioData';
import { 
  Mail, ArrowRight, Layers, Award, 
  Users, Calendar, FileText, 
  ChevronDown, ChevronLeft, ChevronRight, Download, 
  ArrowUpRight, X
} from 'lucide-react';

// Typewriter Roles List
const ROLES = ["Student Leader", "Event Manager", "Creative Strategist", "Community Builder"];

// 1. Stats Counter Component
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
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    
    let start = 0;
    const duration = 1500; // ms
    const frameRate = 1000 / 60; // 60fps
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
    <div ref={elementRef} className="glass-panel p-6 rounded-2xl glass-panel-hover text-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-2 font-display bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
        {count}{suffix}
      </h3>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{label}</p>
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
        className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none bg-slate-900/10 hover:bg-slate-900/30 transition cursor-pointer"
      >
        <span className="font-semibold text-slate-200 text-sm md:text-base">{faq.question}</span>
        <ChevronDown 
          size={18} 
          className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-indigo-400' : ''}`} 
        />
      </button>
      <div 
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{ maxHeight: isOpen ? '200px' : '0px' }}
      >
        <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-3 bg-slate-950/20">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

// 2.5. AchievementCard Component (with Image Slider)
function AchievementCard({ achievement }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = achievement.images || [];

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between relative overflow-hidden group">
      <div>
        {/* Image Slider / Carousel */}
        <div className="relative h-48 rounded-xl overflow-hidden mb-6 bg-slate-900 border border-white/5 flex items-center justify-center">
          {images.length > 0 ? (
            <>
              {/* Fallback pattern or actual image */}
              <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                <img 
                  src={images[currentSlide].path} 
                  alt={images[currentSlide].label}
                  className="w-full h-full object-cover select-none transition-opacity duration-300"
                  onError={(e) => {
                    // Hide the broken image and show the fallback gradient card
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'flex';
                    }
                  }}
                />
                
                {/* Fallback Glassmorphic Card (hidden by default, shown if image fails to load) */}
                <div 
                  className="absolute inset-0 w-full h-full hidden flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-indigo-950/80 to-purple-950/80 backdrop-blur-sm"
                >
                  <Award size={32} className="text-indigo-400 mb-2 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg">
                    {images[currentSlide].label}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-2">Award Image Asset Placeholder</span>
                </div>
              </div>

              {/* Slider Controls */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-black/40 text-slate-400 hover:text-white hover:bg-black/60 transition cursor-pointer z-10"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-black/40 text-slate-400 hover:text-white hover:bg-black/60 transition cursor-pointer z-10"
                  >
                    <ChevronRight size={16} />
                  </button>

                  {/* Dot Indicators */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/30 px-2.5 py-1 rounded-full">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentSlide(idx);
                        }}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          currentSlide === idx ? 'bg-indigo-400 w-3' : 'bg-slate-500'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <Award size={36} className="text-indigo-400 mb-2" />
              <span className="text-sm font-bold text-white">{achievement.title}</span>
            </div>
          )}
        </div>

        {/* Issuer and Title */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-bold text-indigo-400 tracking-wider uppercase bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
            {achievement.issuer}
          </span>
        </div>
        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-indigo-300 transition duration-200">
          {achievement.title}
        </h3>
        
        {/* Description */}
        <p className="text-slate-400 text-xs leading-relaxed mb-4">
          {achievement.description}
        </p>

        {/* Quote Block */}
        {achievement.quote && (
          <div className="relative p-3.5 rounded-xl bg-slate-905/30 border border-white/5 mb-4 text-slate-300 text-xs italic leading-relaxed">
            <span className="absolute -top-1.5 left-2 text-indigo-500/40 text-2xl font-serif">“</span>
            <p className="pl-2">{achievement.quote}</p>
          </div>
        )}
      </div>

      {/* Hash Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-white/5">
        {achievement.tags.map((tag, tIdx) => (
          <span key={tIdx} className="text-[10px] text-slate-500 font-medium">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// 2.75. FeaturedEvent Component (For Moments in Action)
function FeaturedEvent({ event, onImageClick }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const images = event.images || [];

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 relative overflow-hidden group mb-12">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-100 transition duration-500"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Image Carousel */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="relative h-64 sm:h-80 lg:h-full min-h-[280px] rounded-2xl overflow-hidden bg-slate-900 border border-white/5 flex items-center justify-center shadow-inner group/carousel">
            {/* Blurred background reflection */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center blur-md opacity-30 select-none scale-105"
              style={{ backgroundImage: `url(${images[activeSlide]})` }}
            ></div>
            
            <img 
              src={images[activeSlide]} 
              alt={`Event moment ${activeSlide + 1}`}
              onClick={() => onImageClick && onImageClick(images[activeSlide])}
              className="relative w-full h-full object-contain select-none transition-all duration-500 transform scale-100 hover:scale-102 z-10 cursor-zoom-in"
            />
            
            {images.length > 1 && (
              <>
                <button 
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-950/90 transition cursor-pointer z-10 border border-white/5 opacity-0 group-hover/carousel:opacity-100"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-950/90 transition cursor-pointer z-10 border border-white/5 opacity-0 group-hover/carousel:opacity-100"
                >
                  <ChevronRight size={18} />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSlide(idx);
                      }}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        activeSlide === idx ? 'bg-indigo-400 w-3.5' : 'bg-slate-600 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Story Content */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold text-indigo-400 tracking-wider uppercase bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                {event.category || "Featured Experience"}
              </span>
              <span className="text-[10px] font-medium text-slate-500">
                {event.date || "July 2026"}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight mb-2 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
              {event.title}
            </h3>
            
            <p className="text-xs font-semibold text-slate-400 mb-4 tracking-wide uppercase">
              {event.subtitle}
            </p>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {event.description}
            </p>

            {event.customSections ? (
              <div className="space-y-4 mb-6">
                {event.customSections.map((sec, sIdx) => (
                  <div key={sIdx} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition duration-300">
                    <h4 className="text-xs font-bold text-indigo-300 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                      {sec.title}
                    </h4>
                    {Array.isArray(sec.content) ? (
                      <ul className="space-y-1.5">
                        {sec.content.map((item, iIdx) => (
                          <li key={iIdx} className="text-slate-400 text-[11px] leading-relaxed flex items-start gap-1.5">
                            <span className="text-indigo-400/70 select-none mt-0.5">•</span>
                            <span className="text-slate-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        {sec.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {event.roles.map((role, rIdx) => (
                  <div key={rIdx} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition duration-300">
                    <h4 className="text-xs font-bold text-indigo-300 mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                      {role.title}
                    </h4>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {role.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {event.reflection && (
              <p className="text-slate-300 text-xs italic leading-relaxed border-l-2 border-indigo-500/40 pl-3 mb-6">
                "{event.reflection}"
              </p>
            )}

            {event.thanks && (
              <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/10">
                <h5 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5">Acknowledgements & Trust</h5>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {event.thanks}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
            {event.tags.map((tag, tIdx) => (
              <span key={tIdx} className="text-[10px] text-slate-500 font-medium hover:text-indigo-400 transition cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

// 2.8. Skills Radar Chart Component
function SkillsRadar({ skills }) {
  const cx = 160;
  const cy = 160;
  const radius = 110;
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const totalSkills = skills.length;

  const getCoordinates = (index, level = 1.0) => {
    const angle = (2 * Math.PI * index) / totalSkills - Math.PI / 2;
    const r = radius * level;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      angle
    };
  };

  const gridPolygons = levels.map((level) => {
    const points = Array.from({ length: totalSkills }, (_, i) => {
      const { x, y } = getCoordinates(i, level);
      return `${x},${y}`;
    }).join(' ');
    return points;
  });

  const axesLines = Array.from({ length: totalSkills }, (_, i) => {
    const { x, y } = getCoordinates(i, 1.0);
    return { x1: cx, y1: cy, x2: x, y2: y };
  });

  const radarPoints = skills.map((skill, i) => {
    const { x, y } = getCoordinates(i, skill.value / 100);
    return `${x},${y}`;
  }).join(' ');

  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <div className="relative w-full max-w-[360px] mx-auto flex flex-col items-center select-none">
      <svg viewBox="0 0 320 320" className="w-full h-auto overflow-visible">
        <defs>
          <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(99, 102, 241, 0.1)" />
            <stop offset="85%" stopColor="rgba(99, 102, 241, 0.2)" />
            <stop offset="100%" stopColor="rgba(147, 51, 234, 0.35)" />
          </radialGradient>
          
          <linearGradient id="radarStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>

          <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {gridPolygons.map((points, index) => (
          <polygon
            key={index}
            points={points}
            fill="none"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="1"
            strokeDasharray={index === levels.length - 1 ? "none" : "2,2"}
          />
        ))}

        {axesLines.map((axis, index) => (
          <line
            key={index}
            x1={axis.x1}
            y1={axis.y1}
            x2={axis.x2}
            y2={axis.y2}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
          />
        ))}

        {[25, 50, 75, 100].map((val) => {
          const { x, y } = getCoordinates(0, val / 100);
          return (
            <text
              key={val}
              x={cx - 5}
              y={y + 10}
              className="text-[7px] fill-slate-600 font-semibold text-right select-none pointer-events-none"
              textAnchor="end"
            >
              {val}%
            </text>
          );
        })}

        <polygon
          points={radarPoints}
          fill="url(#radarFill)"
          stroke="url(#radarStrokeGrad)"
          strokeWidth="2.5"
          filter="url(#radarGlow)"
          className="transition-all duration-300"
        />

        {skills.map((skill, i) => {
          const { x, y } = getCoordinates(i, skill.value / 100);
          const isHovered = hoveredSkill?.name === skill.name;
          return (
            <g 
              key={i}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="cursor-pointer"
            >
              <circle
                cx={x}
                cy={y}
                r={isHovered ? 6 : 4}
                className="fill-indigo-400 stroke-indigo-100 stroke-1 transition-all duration-200"
                style={{ filter: isHovered ? 'drop-shadow(0 0 4px #818cf8)' : 'none' }}
              />
            </g>
          );
        })}

        {skills.map((skill, i) => {
          const { x, y, angle } = getCoordinates(i, 1.14);
          const textAnchor = Math.cos(angle) > 0.15 ? 'start' : Math.cos(angle) < -0.15 ? 'end' : 'middle';
          const dy = Math.sin(angle) > 0.5 ? '0.6em' : Math.sin(angle) < -0.5 ? '-0.2em' : '0.3em';
          const isHovered = hoveredSkill?.name === skill.name;
          return (
            <text
              key={i}
              x={x}
              y={y}
              dy={dy}
              textAnchor={textAnchor}
              className={`text-[9px] font-bold tracking-wider uppercase transition-colors duration-200 select-none cursor-pointer ${
                isHovered ? 'fill-indigo-400 font-extrabold' : 'fill-slate-400 hover:fill-slate-200'
              }`}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {skill.name}
            </text>
          );
        })}
      </svg>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-20 h-20 rounded-full bg-slate-950/80 border border-white/5 backdrop-blur-sm flex flex-col items-center justify-center shadow-lg transition-all duration-300">
          {hoveredSkill ? (
            <>
              <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">
                {hoveredSkill.name.substring(0, 8)}
              </span>
              <span className="text-base font-extrabold text-white leading-none">
                {hoveredSkill.value}%
              </span>
            </>
          ) : (
            <>
              <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">
                EXPERT
              </span>
              <span className="text-xs font-bold text-slate-350 leading-none">
                SKILLS
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// 3. Home View Component
function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState('Hire Me');
  const [lightboxImage, setLightboxImage] = useState(null);
  
  // Custom Typewriter Effect
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Resume Sidebar Toggle
  const [resumeOpen, setResumeOpen] = useState(false);

  // Detail Modal Event Selection
  const [selectedCollab, setSelectedCollab] = useState(null);

  useEffect(() => {
    let timer;
    const currentRole = ROLES[roleIndex];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(prev => prev.substring(0, prev.length - 1));
      }, 55);
    } else {
      timer = setTimeout(() => {
        setCurrentText(prev => currentRole.substring(0, prev.length + 1));
      }, 95);
    }
    
    if (!isDeleting && currentText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setRoleIndex(prev => (prev + 1) % ROLES.length);
    }
    
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  // Currently Working On Typewriter Effect
  const [workingIndex, setWorkingIndex] = useState(0);
  const [workingText, setWorkingText] = useState("");
  const [workingDeleting, setWorkingDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentFocus = CURRENTLY_WORKING_ON[workingIndex];
    
    if (workingDeleting) {
      timer = setTimeout(() => {
        setWorkingText(prev => prev.substring(0, prev.length - 1));
      }, 45);
    } else {
      timer = setTimeout(() => {
        setWorkingText(prev => currentFocus.substring(0, prev.length + 1));
      }, 75);
    }
    
    if (!workingDeleting && workingText === currentFocus) {
      timer = setTimeout(() => setWorkingDeleting(true), 2200);
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative">
      
      {/* Background gradients */}
      <div className="glow-indigo -top-20 -left-20"></div>
      <div className="glow-purple top-[40%] right-10"></div>
      <div className="glow-indigo bottom-20 left-10"></div>

      {/* Navigation Header */}
      <nav className="border-b border-white/5 backdrop-blur-md bg-slate-950/70 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              KN
            </div>
            <span className="font-semibold text-lg tracking-wider bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent hidden sm:inline">
              Karthik Nimmanagoti
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#about" className="text-xs text-slate-400 hover:text-white transition font-medium">About</a>
            <a href="#services" className="text-xs text-slate-400 hover:text-white transition font-medium hidden md:inline">Services</a>
            <a href="#skills" className="text-xs text-slate-400 hover:text-white transition font-medium">Skills</a>
            <a href="#achievements" className="text-xs text-slate-400 hover:text-white transition font-medium">Achievements</a>
            <a href="#projects" className="text-xs text-slate-400 hover:text-white transition font-medium">Projects</a>
            
            <button
              onClick={() => openContactWithPurpose('Hire Me')}
              className="px-4 py-2 text-xs bg-indigo-650 hover:bg-indigo-550 border border-indigo-500/20 font-bold text-white rounded-xl shadow-md transition cursor-pointer ml-4"
            >
              Let's Talk
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="about" className="max-w-5xl mx-auto text-center px-4 pt-16 pb-12 relative z-10">
        <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-6">
          PORTFOLIO 2026
        </span>
        
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 leading-tight text-white">
          KARTHIK <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            NIMMANAGOTI
          </span>
        </h1>

        <div className="h-[40px] mb-6 flex justify-center items-center">
          <p className="text-lg md:text-xl text-slate-400 font-light">
            I am a{' '}
            <span className="cursor-blink font-bold text-slate-200 px-1">
              {currentText}
            </span>
          </p>
        </div>

        {/* Live Status Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-white/5 backdrop-blur-md mb-8 text-[10px] text-slate-300 select-none shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-400 uppercase tracking-widest text-[8px] mr-1 border-r border-white/10 pr-2">Currently Working On</span>
          <span className="font-bold text-indigo-400 tracking-wide">
            {workingText}
          </span>
        </div>

        {/* 3D Profile Frame */}
        <div className="mb-10 relative inline-block group">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition duration-500 animate-pulse"></div>
          <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full p-2 bg-white/5 border border-white/10 shadow-2xl overflow-hidden">
            <img 
              src="https://res.cloudinary.com/do4nuj2kh/image/upload/v1783330744/WhatsApp_Image_2026-07-01_at_7.32.30_PM_vbhtly.jpg"
              alt="Karthik Nimmanagoti" 
              className="w-full h-full object-cover rounded-full"
              loading="eager"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://docs.google.com/document/d/1-krzGfTO1S0r_-o3d9VJGWPw3uuskL9JtvvCC1dPCek/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 text-sm font-semibold rounded-xl transition cursor-pointer"
          >
            <FileText size={14} />
            <span>View Resume</span>
          </a>
        </div>
      </header>

      {/* Impact Statistics */}
      <section className="max-w-5xl mx-auto px-4 py-8 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* Services Section */}
      <section id="services" className="max-w-6xl mx-auto px-4 py-16 w-full relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
            Operational Excellence & Services
          </h2>
          <p className="text-slate-400 text-sm mt-1">How I can add valuable solutions to your enterprise or events.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((srv, idx) => (
            <div key={idx} className={`p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between ${srv.colorClass}`}>
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${srv.iconBgClass}`}>
                  {srv.icon === 'bullhorn' && <Award size={22} />}
                  {srv.icon === 'calendar-check' && <Layers size={22} />}
                  {srv.icon === 'users' && <Users size={22} />}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{srv.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">{srv.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills & Expertise Section */}
      <section id="skills" className="max-w-6xl mx-auto px-4 py-16 w-full relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
            Skills & Core Competencies
          </h2>
          <p className="text-slate-400 text-sm mt-1">A visual representation of operational leadership, digital strategy, and creative capabilities.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Skill Descriptions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 relative overflow-hidden">
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl"></div>
              <h3 className="text-xl font-bold text-white mb-3">Turning Talent into Professional Identity</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                From organizing large-scale student developer hackathons and managing guest summits to coordinating on-ground operational logistics and building public digital presence for tech movements — I leverage a diverse mix of administrative execution, technological awareness, and public relations.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <h4 className="text-xs font-bold text-indigo-300 mb-1 flex items-center gap-1.5 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    Leadership & Operations
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    President of the Influencers Club NIAT, leading team governance, event planning, and guest hospitality management.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <h4 className="text-xs font-bold text-purple-300 mb-1 flex items-center gap-1.5 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                    AI & Technology awareness
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Driving digital literacy through the Teach AI for India movement, bridging gaps for underprivileged students.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <h4 className="text-xs font-bold text-pink-300 mb-1 flex items-center gap-1.5 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                    Marketing & Personal Branding
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Personal branding specialist, designing LinkedIn content pipelines and hosting prominent creators.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <h4 className="text-xs font-bold text-teal-300 mb-1 flex items-center gap-1.5 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                    Public Speaking & Networking
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Leading large crowds (500+ attendees), facilitating live panel discussions, and establishing creator networks.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Radar Chart */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 flex items-center justify-center w-full max-w-[420px] aspect-square relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl"></div>
              <SkillsRadar skills={SKILLS_DATA} />
            </div>
          </div>
        </div>
      </section>

      {/* College Achievements Section */}
      <section id="achievements" className="max-w-6xl mx-auto px-4 py-16 w-full relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
            College Achievements
          </h2>
          <p className="text-slate-400 text-sm mt-1">Milestones, recognitions, and creative wins.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((achievement, idx) => (
            <AchievementCard key={achievement.id || idx} achievement={achievement} />
          ))}
        </div>
      </section>

      {/* Collaborations & Highlights */}
      <section className="max-w-6xl mx-auto px-4 py-16 w-full relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
            Impact & Creator Collaborations
          </h2>
          <p className="text-slate-400 text-sm mt-1">Guest summits, summits, and workshops delivered to developers.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COLLABORATIONS.map((collab) => (
            <div 
              key={collab.id} 
              onClick={() => setSelectedCollab(collab)}
              className="glass-panel rounded-2xl overflow-hidden hover:scale-[1.01] transition-all duration-300 border border-white/5 cursor-pointer group"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={collab.img} 
                  alt={collab.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <span className="absolute top-4 left-4 bg-indigo-650/80 backdrop-blur-md text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {collab.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition">
                  {collab.title}
                </h3>
                <p className="text-slate-500 text-[10px] mb-2">{collab.date}</p>
                <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">{collab.desc}</p>
                <span className="text-xs text-indigo-400 font-semibold group-hover:underline flex items-center gap-1">
                  <span>View Details</span>
                  <ArrowUpRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>      {/* Projects Showcase */}
      <section id="projects" className="max-w-6xl mx-auto px-4 py-16 w-full relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
            Technical Showcases
          </h2>
          <p className="text-slate-400 text-sm mt-1">Tools and platforms developed to scale operations and audits.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((proj, idx) => (
            <div key={idx} className="p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-black uppercase text-indigo-400 tracking-wider bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                  {proj.tag}
                </span>
                <h3 className="text-xl font-bold text-white mt-3 mb-1">{proj.title}</h3>
                <p className="text-slate-400 text-[10px] font-semibold mb-3">{proj.sub}</p>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">{proj.desc}</p>
                
                {proj.skills && (
                  <div className="flex flex-wrap gap-1.5 mb-6 pt-3 border-t border-white/5">
                    {proj.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="text-[10px] text-slate-400 font-medium bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <a 
                href={proj.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-indigo-650/10 hover:bg-indigo-650/20 border border-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-lg transition"
              >
                <span>{proj.link.includes('docs.google.com') ? 'View Spreadsheet' : 'Launch App'}</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Action Moments Gallery */}
      <section className="max-w-6xl mx-auto px-4 py-16 w-full relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
            Moments in Action
          </h2>
          <p className="text-slate-400 text-sm mt-1">Glimpses of operational logistics and community events.</p>
        </div>

        {/* Featured Event Experience */}
        <div className="space-y-12 mb-12">
          {FEATURED_EVENTS.map((event, idx) => (
            <FeaturedEvent key={idx} event={event} onImageClick={setLightboxImage} />
          ))}
        </div>

        {/* Other Gallery Moments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY.map((imgUrl, idx) => (
            <div 
              key={idx} 
              onClick={() => setLightboxImage(imgUrl)}
              className="glass-panel p-2 rounded-2xl border border-white/5 hover:scale-[1.01] transition duration-300 cursor-zoom-in"
            >
              <div className="relative h-52 rounded-xl overflow-hidden bg-slate-900 border border-white/5 flex items-center justify-center">
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center blur-md opacity-30 select-none scale-105"
                  style={{ backgroundImage: `url(${imgUrl})` }}
                ></div>
                <img 
                  src={imgUrl} 
                  className="relative w-full h-full object-contain rounded-xl z-10" 
                  alt={`Gallery detail ${idx + 1}`} 
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-4xl mx-auto px-4 py-16 w-full relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
            Mentors & Trust
          </h2>
        </div>

        <div className="glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/15 rounded-full blur-2xl"></div>
          
          <p className="text-slate-300 text-xs md:text-sm italic leading-relaxed mb-6">
            {TESTIMONIAL.quote}
          </p>
          
          <div className="flex items-center gap-4 border-t border-white/5 pt-4">
            <img 
              src={TESTIMONIAL.img} 
              alt={TESTIMONIAL.name} 
              className="w-12 h-12 rounded-full object-cover border border-white/10"
              loading="lazy"
            />
            <div>
              <h4 className="font-bold text-white flex items-center gap-1.5 text-sm md:text-base">
                <span>{TESTIMONIAL.name}</span>
                <a 
                  href={TESTIMONIAL.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 transition"
                  title="LinkedIn"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </h4>
              <p className="text-slate-500 text-[10px] uppercase font-bold">{TESTIMONIAL.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Licenses & Certifications */}
      <section className="max-w-6xl mx-auto px-4 py-16 w-full relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
            Licenses & Certifications
          </h2>
          <p className="text-slate-400 text-sm mt-1">Industry certifications validating technical skillsets.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, idx) => (
            <a 
              key={idx} 
              href={cert.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-panel p-5 rounded-2xl block hover:border-indigo-500/30 transition group"
            >
              <div className="h-40 overflow-hidden rounded-xl relative mb-4">
                <img 
                  src={cert.img} 
                  alt={cert.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  loading="lazy"
                />
              </div>
              <div className="flex justify-between items-start mb-1 gap-2">
                <h3 className="font-bold text-white text-sm leading-snug group-hover:text-indigo-400 transition">
                  {cert.title}
                </h3>
                <span className="text-[9px] font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded shrink-0">
                  {cert.date}
                </span>
              </div>
              <p className="text-indigo-400 font-semibold text-[10px] mb-2">{cert.issuer}</p>
              <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{cert.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 py-16 w-full relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <FAQItem key={idx} faq={faq} />
          ))}
        </div>
      </section>

      {/* Bottom CTA block */}
      <section className="max-w-4xl mx-auto px-4 py-16 w-full text-center relative z-10">
        <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition duration-500"></div>
          
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
            Ready to Create Impact?
          </h2>
          <p className="text-slate-450 text-xs md:text-sm max-w-lg mx-auto mb-6 leading-relaxed">
            Whether it's scaling your brand presence, automating LinkedIn content, or organizing a massive summit, let's connect and build it.
          </p>
          <button
            onClick={() => openContactWithPurpose('Other')}
            className="flex items-center gap-2 px-8 py-3 bg-white text-slate-950 hover:bg-slate-100 font-bold text-sm rounded-full transition shadow-lg cursor-pointer mx-auto"
          >
            <span>Start a Conversation</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-[10px] text-slate-500 relative z-10">
        <div className="flex justify-center gap-5 mb-4 items-center">
          <a href="mailto:aktechintelligence@gmail.com" className="text-slate-500 hover:text-rose-450 transition" title="Email"><Mail size={16} /></a>
          <a href="https://www.linkedin.com/in/karthik-nimmanagoti-52a403324" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-indigo-400 transition" title="LinkedIn">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="https://www.instagram.com/nimmanagoti.karthik" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-pink-400 transition" title="Instagram">
            <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://x.com/karthikkampu07" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition" title="Twitter / X">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://github.com/NIMMANAGOTI777" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-350 transition" title="GitHub">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
        <p>© 2026 Karthik Nimmanagoti. All rights reserved.</p>
        <p className="mt-1">Designed with React + Supabase + EmailJS.</p>
      </footer>

      {/* RESUME SIDEBAR OVERLAY */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[460px] bg-slate-950/95 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50 p-6 flex flex-col justify-between transition-transform duration-500 ${
          resumeOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Resume Overview
          </h2>
          <button 
            onClick={() => setResumeOpen(false)}
            className="p-1 hover:bg-white/10 rounded-full transition cursor-pointer text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Abstract mock resume representation */}
        <div className="flex-1 bg-slate-900/50 border border-white/5 rounded-2xl flex flex-col items-center justify-center p-6 my-6 relative overflow-hidden">
          <div className="w-40 h-56 bg-slate-950 border border-white/10 rounded-lg shadow-2xl p-4 space-y-3 transform rotate-2 hover:rotate-0 transition duration-300">
            <div className="h-3 w-10 bg-indigo-500/20 rounded"></div>
            <div className="h-1.5 w-full bg-slate-800 rounded"></div>
            <div className="h-1.5 w-3/4 bg-slate-800 rounded"></div>
            <div className="h-12 w-full bg-slate-900/50 border border-white/5 rounded"></div>
            <div className="space-y-1.5 pt-2">
              <div className="h-1.5 w-full bg-slate-800 rounded"></div>
              <div className="h-1.5 w-5/6 bg-slate-800 rounded"></div>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-sm font-semibold text-slate-200">Karthik's Professional Resume</p>
            <p className="text-[10px] text-slate-500 mt-1">PDF Format • 2026 Edition</p>
          </div>
        </div>

        <div className="space-y-3">
          <a
            href="https://docs.google.com/document/d/1-krzGfTO1S0r_-o3d9VJGWPw3uuskL9JtvvCC1dPCek/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-650 hover:bg-indigo-550 text-white text-xs font-bold rounded-xl transition shadow-lg cursor-pointer"
          >
            <FileText size={14} />
            <span>Open Google Doc</span>
          </a>
          <button
            onClick={() => {
              setResumeOpen(false);
              openContactWithPurpose('Hire Me');
            }}
            className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            Request Custom Formats
          </button>
        </div>
      </div>

      {/* COLLABORATIONS DETAIL MODAL */}
      {selectedCollab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl glass-panel animate-scale-in my-8 overflow-hidden">
            <div className="glow-indigo -top-20 -left-20"></div>
            
            <button
              onClick={() => setSelectedCollab(null)}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-full bg-black/40 hover:bg-black/60 transition backdrop-blur-sm z-10 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="h-64 sm:h-72 overflow-hidden relative">
              <img 
                src={selectedCollab.img} 
                alt={selectedCollab.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <span className="px-3 py-1 bg-indigo-650 text-white text-[9px] font-black uppercase rounded-full tracking-wider mb-2 inline-block">
                  {selectedCollab.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedCollab.title}
                </h3>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-4 text-xs text-slate-400 border-b border-white/5 pb-4 mb-5 font-medium">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-indigo-400" />
                  <span>{selectedCollab.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={14} className="text-purple-400" />
                  <span>{selectedCollab.attendees}</span>
                </div>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                {selectedCollab.desc}
              </p>

              <div className="flex justify-between items-center">
                <div className="flex gap-3">
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
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg transition cursor-pointer"
                >
                  Propose Similar Event
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

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-2.5 text-white/70 hover:text-white rounded-full bg-slate-900/50 hover:bg-slate-900/80 transition z-50 border border-white/10"
          >
            <X size={24} />
          </button>
          
          <div 
            className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={lightboxImage} 
              alt="Enlarged view" 
              className="max-w-full max-h-[80vh] object-contain rounded-xl select-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
