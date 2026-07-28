import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Sparkles, Calendar, Code2, Palette, 
  FileText, Megaphone, Camera, Compass, 
  Briefcase, TrendingUp, Lightbulb 
} from 'lucide-react';
import { EXPERTISE_DATA } from '../lib/portfolioData';

// Map icon string names to Lucide icons
const IconMapper = ({ name, className }) => {
  switch (name) {
    case 'users': return <Users className={className} />;
    case 'sparkles': return <Sparkles className={className} />;
    case 'calendar': return <Calendar className={className} />;
    case 'code2': return <Code2 className={className} />;
    case 'palette': return <Palette className={className} />;
    case 'file-text': return <FileText className={className} />;
    case 'megaphone': return <Megaphone className={className} />;
    case 'camera': return <Camera className={className} />;
    case 'compass': return <Compass className={className} />;
    case 'briefcase': return <Briefcase className={className} />;
    case 'trending-up': return <TrendingUp className={className} />;
    case 'lightbulb': return <Lightbulb className={className} />;
    default: return <Sparkles className={className} />;
  }
};

// Animated Number Counter Component
function Counter({ value, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1200; // ms
    const end = parseInt(value);
    if (start === end) return;

    let timer;
    const step = () => {
      start += Math.ceil(end / 30);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    };
    timer = setInterval(step, 30);
    return () => clearInterval(timer);
  }, [value, isVisible]);

  return <span>{count}%</span>;
}

export default function MyExpertise() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [visibleSkills, setVisibleSkills] = useState({});
  const cardRefs = useRef({});

  // Radar Chart coordinates configuration
  const cx = 160;
  const cy = 160;
  const radius = 100;
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const totalSkills = EXPERTISE_DATA.length;

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

  const radarPoints = EXPERTISE_DATA.map((skill, i) => {
    const { x, y } = getCoordinates(i, skill.value / 100);
    return `${x},${y}`;
  }).join(' ');

  const handleCardVisible = (id, isIntersecting) => {
    setVisibleSkills(prev => ({ ...prev, [id]: isIntersecting }));
  };

  // Scroll target card into view when a radar vertex is clicked
  const handleRadarPointClick = (id) => {
    setHoveredSkill(id);
    const element = cardRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add temporary flash effect
      element.classList.add('ring-2', 'ring-indigo-500/50');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-indigo-500/50');
      }, 1500);
    }
  };

  return (
    <section id="expertise" className="max-w-6xl mx-auto px-4 py-20 w-full relative z-10">
      <div className="text-center mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold text-indigo-400 uppercase tracking-widest px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full"
        >
          Specializations
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-4 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent"
        >
          My Expertise
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed"
        >
          The skills I've developed through building products, leading communities, organizing events, and creating digital experiences.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Radar Chart */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel p-6 rounded-3xl border border-white/5 flex items-center justify-center w-full max-w-[420px] aspect-square relative group"
          >
            {/* Soft backdrop reflections */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-100 transition duration-500 rounded-3xl"></div>
            
            <svg viewBox="0 0 320 320" className="w-full h-auto overflow-visible relative z-10 select-none">
              <defs>
                <radialGradient id="radarFillMain" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(99, 102, 241, 0.1)" />
                  <stop offset="85%" stopColor="rgba(99, 102, 241, 0.22)" />
                  <stop offset="100%" stopColor="rgba(147, 51, 234, 0.4)" />
                </radialGradient>
                <linearGradient id="radarStrokeGradMain" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="50%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#f472b6" />
                </linearGradient>
                <filter id="radarGlowMain" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Levels grid */}
              {gridPolygons.map((points, index) => (
                <polygon
                  key={index}
                  points={points}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="1"
                  strokeDasharray={index === levels.length - 1 ? "none" : "3,3"}
                />
              ))}

              {/* Axes lines */}
              {axesLines.map((axis, index) => (
                <line
                  key={index}
                  x1={axis.x1}
                  y1={axis.y1}
                  x2={axis.x2}
                  y2={axis.y2}
                  stroke="rgba(255, 255, 255, 0.07)"
                  strokeWidth="1"
                />
              ))}

              {/* Filled Radar Area */}
              <polygon
                points={radarPoints}
                fill="url(#radarFillMain)"
                stroke="url(#radarStrokeGradMain)"
                strokeWidth="2.5"
                filter="url(#radarGlowMain)"
                className="transition-all duration-300"
              />

              {/* Vertices & Markers */}
              {EXPERTISE_DATA.map((skill, i) => {
                const { x, y } = getCoordinates(i, skill.value / 100);
                const isHovered = hoveredSkill === skill.id;
                return (
                  <g 
                    key={i}
                    onMouseEnter={() => setHoveredSkill(skill.id)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    onClick={() => handleRadarPointClick(skill.id)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r={isHovered ? 6.5 : 4}
                      className="fill-indigo-400 stroke-white stroke-[1.5] transition-all duration-200"
                      style={{ filter: isHovered ? 'drop-shadow(0 0 6px #818cf8)' : 'none' }}
                    />
                  </g>
                );
              })}

              {/* Labels */}
              {EXPERTISE_DATA.map((skill, i) => {
                const { x, y, angle } = getCoordinates(i, 1.15);
                const textAnchor = Math.cos(angle) > 0.15 ? 'start' : Math.cos(angle) < -0.15 ? 'end' : 'middle';
                const dy = Math.sin(angle) > 0.5 ? '0.6em' : Math.sin(angle) < -0.5 ? '-0.2em' : '0.3em';
                const isHovered = hoveredSkill === skill.id;
                return (
                  <text
                    key={i}
                    x={x}
                    y={y}
                    dy={dy}
                    textAnchor={textAnchor}
                    className={`text-[8.5px] font-bold tracking-wider uppercase transition-colors duration-200 select-none cursor-pointer ${
                      isHovered ? 'fill-indigo-400 font-extrabold scale-105' : 'fill-slate-400 hover:fill-slate-200'
                    }`}
                    onMouseEnter={() => setHoveredSkill(skill.id)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    onClick={() => handleRadarPointClick(skill.id)}
                  >
                    {skill.name.split(' ')[0]} {/* shortened for SVG rendering spacing */}
                  </text>
                );
              })}
            </svg>

            {/* Radar Center HUD Info */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 rounded-full bg-slate-950/85 border border-white/5 backdrop-blur-md flex flex-col items-center justify-center shadow-2xl">
                {hoveredSkill ? (
                  <>
                    <span className="text-[7px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1 text-center px-1 truncate max-w-full">
                      {EXPERTISE_DATA.find(s => s.id === hoveredSkill)?.name.substring(0, 10)}
                    </span>
                    <span className="text-base font-extrabold text-white leading-none">
                      {EXPERTISE_DATA.find(s => s.id === hoveredSkill)?.value}%
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-[7.5px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">
                      ANALYTICS
                    </span>
                    <span className="text-xs font-extrabold text-slate-350 leading-none">
                      SKILLS
                    </span>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Skill Progress Cards */}
        <div className="lg:col-span-7 space-y-4">
          {EXPERTISE_DATA.map((skill, index) => {
            const isHovered = hoveredSkill === skill.id;
            const ref = useRef(null);

            // Trigger intersection observer to start progress animation on scroll
            useEffect(() => {
              const observer = new IntersectionObserver(
                ([entry]) => {
                  handleCardVisible(skill.id, entry.isIntersecting);
                },
                { threshold: 0.2 }
              );
              if (ref.current) observer.observe(ref.current);
              return () => observer.disconnect();
            }, [skill.id]);

            return (
              <motion.div
                key={skill.id}
                ref={(el) => {
                  ref.current = el;
                  cardRefs.current[skill.id] = el;
                }}
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`p-5 rounded-2xl glass-panel transition-all duration-300 relative overflow-hidden group border ${
                  isHovered 
                    ? 'border-indigo-500/40 bg-slate-900/60 shadow-lg shadow-indigo-500/5 -translate-y-0.5' 
                    : 'border-white/5 hover:border-white/10'
                }`}
              >
                {/* Micro-glow background gradient on hover */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                ></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                          isHovered 
                            ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' 
                            : 'bg-white/5 text-slate-300 border border-white/5'
                        }`}
                      >
                        <IconMapper name={skill.icon} className="w-4 h-4" />
                      </div>
                      <h3 className={`font-bold transition-colors ${
                        isHovered ? 'text-indigo-300' : 'text-slate-100'
                      }`}>
                        {skill.name}
                      </h3>
                    </div>
                    <span className="font-extrabold text-sm text-indigo-400 font-display">
                      <Counter value={skill.value} isVisible={visibleSkills[skill.id]} />
                    </span>
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    {skill.desc}
                  </p>

                  {/* Progress track */}
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={visibleSkills[skill.id] ? { width: `${skill.value}%` } : { width: 0 }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
