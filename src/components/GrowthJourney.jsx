import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Briefcase, Award, CheckCircle2, ChevronRight, Activity, TrendingUp } from 'lucide-react';
import { TIMELINE_DATA } from '../lib/portfolioData';

// Animated Number Counter Component
function StatCounter({ value, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1500; // ms
    const end = typeof value === 'string' ? parseInt(value) : value;
    const isPlus = typeof value === 'string' && value.endsWith('+');
    
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
    timer = setInterval(step, 40);
    return () => clearInterval(timer);
  }, [value, isVisible]);

  const suffix = typeof value === 'string' && value.endsWith('+') ? '+' : '';
  const prefix = typeof value === 'string' && value.endsWith('k') ? 'k' : '';
  return <span>{count}{prefix || suffix}</span>;
}

export default function GrowthJourney() {
  const [activeYearIndex, setActiveYearIndex] = useState(3); // 2026 selected by default
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const years = TIMELINE_DATA.map(d => d.year);
  const activeYearData = TIMELINE_DATA[activeYearIndex];

  // SVG Line Chart configuration
  const width = 600;
  const height = 220;
  const paddingX = 60;
  const paddingY = 30;

  const getX = (index) => {
    return paddingX + (index * (width - 2 * paddingX)) / (years.length - 1);
  };

  const getY = (percentageValue) => {
    const minVal = 0;
    const maxVal = 100;
    const graphHeight = height - 2 * paddingY;
    return height - paddingY - ((percentageValue - minVal) / (maxVal - minVal)) * graphHeight;
  };

  // Convert Projects to percentages (max projects is 21 in 2026) for plotting
  const getProjectsPercentage = (projVal) => {
    return (projVal / 21) * 100;
  };

  // Metrics configurations
  const metrics = [
    { key: 'Projects', color: '#6366f1', label: 'Projects (scaled)', getVal: (d) => getProjectsPercentage(d.chartData.Projects) },
    { key: 'Leadership', color: '#ec4899', label: 'Leadership', getVal: (d) => d.chartData.Leadership },
    { key: 'Community', color: '#06b6d4', label: 'Community', getVal: (d) => d.chartData.Community },
    { key: 'Experience', color: '#10b981', label: 'Experience', getVal: (d) => d.chartData.Experience },
    { key: 'Skills', color: '#f59e0b', label: 'Skills', getVal: (d) => d.chartData.Skills }
  ];

  // Generate SVG line paths
  const getLinePath = (metric) => {
    return TIMELINE_DATA.map((data, index) => {
      const x = getX(index);
      const y = getY(metric.getVal(data));
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <section id="journey" ref={containerRef} className="max-w-6xl mx-auto px-4 py-20 w-full relative z-10">
      <div className="text-center mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold text-indigo-400 uppercase tracking-widest px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full"
        >
          Timeline
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-4 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent"
        >
          My Growth Journey
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
        >
          Every year has been about learning faster, building bigger, and creating greater impact.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Side: Growth Line Graph HUD */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel p-6 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-100 transition duration-500 rounded-3xl"></div>
            
            <div className="relative z-10 mb-6 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                  <Activity size={12} className="text-indigo-400" />
                  Growth Metrics Trend
                </span>
                <h3 className="text-lg font-bold text-white">Year-over-Year Velocity</h3>
              </div>
              <div className="flex gap-2 flex-wrap max-w-[200px] justify-end">
                {metrics.map(m => (
                  <span key={m.key} className="text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1 bg-white/5 border border-white/5 text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: m.color }}></span>
                    {m.key}
                  </span>
                ))}
              </div>
            </div>

            {/* Line Chart SVG */}
            <div className="relative z-10 w-full overflow-x-auto">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[450px]">
                {/* Grid Axes Lines */}
                {[0, 25, 50, 75, 100].map((val) => (
                  <g key={val}>
                    <line
                      x1={paddingX}
                      y1={getY(val)}
                      x2={width - paddingX}
                      y2={getY(val)}
                      stroke="rgba(255, 255, 255, 0.05)"
                      strokeWidth="1"
                    />
                    <text
                      x={paddingX - 10}
                      y={getY(val) + 3}
                      textAnchor="end"
                      className="text-[9px] fill-slate-600 font-bold select-none pointer-events-none"
                    >
                      {val}%
                    </text>
                  </g>
                ))}

                {/* Vertical Year gridlines */}
                {years.map((year, idx) => (
                  <g key={year}>
                    <line
                      x1={getX(idx)}
                      y1={paddingY}
                      x2={getX(idx)}
                      y2={height - paddingY}
                      stroke="rgba(255, 255, 255, 0.05)"
                      strokeWidth="1"
                    />
                    <text
                      x={getX(idx)}
                      y={height - paddingY + 18}
                      textAnchor="middle"
                      onClick={() => setActiveYearIndex(idx)}
                      className={`text-[10px] font-extrabold select-none cursor-pointer transition-colors duration-200 ${
                        activeYearIndex === idx ? 'fill-indigo-400 font-black' : 'fill-slate-500 hover:fill-slate-300'
                      }`}
                    >
                      {year}
                    </text>
                  </g>
                ))}

                {/* Graph Active Vertical Indicator Line */}
                <motion.line
                  x1={getX(activeYearIndex)}
                  y1={paddingY}
                  x2={getX(activeYearIndex)}
                  y2={height - paddingY}
                  stroke="rgba(99, 102, 241, 0.35)"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                  animate={{ x: getX(activeYearIndex) }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />

                {/* Metrics Line Plots */}
                {metrics.map((metric) => {
                  const path = getLinePath(metric);
                  return (
                    <g key={metric.key}>
                      <motion.path
                        d={path}
                        fill="none"
                        stroke={metric.color}
                        strokeWidth="2.5"
                        initial={{ pathLength: 0 }}
                        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                      />
                      {/* Active points */}
                      {TIMELINE_DATA.map((data, idx) => {
                        const val = metric.getVal(data);
                        const isSelected = activeYearIndex === idx;
                        return (
                          <motion.circle
                            key={idx}
                            cx={getX(idx)}
                            cy={getY(val)}
                            r={isSelected ? 5 : 3}
                            className="transition-all duration-300 cursor-pointer"
                            style={{
                              fill: isSelected ? '#ffffff' : metric.color,
                              stroke: metric.color,
                              strokeWidth: isSelected ? 2.5 : 1
                            }}
                            onClick={() => setActiveYearIndex(idx)}
                          />
                        );
                      })}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Selected Year HUD Tooltip values */}
            <div className="relative z-10 mt-6 grid grid-cols-5 gap-2 border-t border-white/5 pt-4">
              {metrics.map(m => {
                const rawVal = activeYearData.chartData[m.key === 'Projects (scaled)' || m.key === 'Projects' ? 'Projects' : m.key];
                return (
                  <div key={m.key} className="text-center">
                    <span className="block text-[8px] text-slate-500 uppercase font-black tracking-wider truncate mb-1">
                      {m.key}
                    </span>
                    <span className="text-sm font-extrabold text-white">
                      {rawVal}{m.key !== 'Projects' ? '%' : ''}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right Side: Timeline cards */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Horizontal timeline pills selector */}
          <div className="flex gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/5 w-fit mx-auto lg:mx-0 select-none">
            {TIMELINE_DATA.map((data, index) => (
              <button
                key={data.year}
                onClick={() => setActiveYearIndex(index)}
                className={`px-4 py-2 text-xs font-black rounded-xl transition duration-200 relative overflow-hidden cursor-pointer ${
                  activeYearIndex === index
                    ? 'bg-indigo-650 text-white shadow shadow-indigo-500/10'
                    : 'text-slate-500 hover:text-slate-200'
                }`}
              >
                {data.year}
              </button>
            ))}
          </div>

          {/* Active Timeline Year Details Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeYearData.year}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-3xl glass-panel relative overflow-hidden border border-white/5 flex flex-col justify-between"
            >
              {/* Background glow relative to index */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl"></div>

              <div className="relative z-10 flex-1">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-0.5 border border-indigo-500/20 rounded-md">
                      Year in Review
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
                      {activeYearData.year}: {activeYearData.title}
                    </h3>
                  </div>
                </div>

                {/* Key milestones bullet checkpoints */}
                <div className="mb-6 space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Key Milestones</h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {activeYearData.milestones.map((milestone, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5 text-indigo-400">
                          <CheckCircle2 size={12} className="stroke-[2.5]" />
                        </div>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                          {milestone}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Animated statistics summary grid */}
              <div className="relative z-10 mt-auto pt-6 border-t border-white/5">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Key Statistics</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {activeYearData.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300">
                      <span className="block text-[8px] text-slate-500 uppercase font-black tracking-wider leading-none mb-1">
                        {stat.label}
                      </span>
                      <span className="text-lg font-black text-indigo-400 leading-none">
                        <StatCounter value={stat.value} isVisible={true} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
