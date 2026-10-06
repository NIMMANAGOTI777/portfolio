import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Award, CheckCircle2, TrendingUp, Sparkles, Flag, Rocket } from 'lucide-react';

const JOURNEY_STAGES = [
  {
    year: '2024',
    stage: 'Foundation',
    badge: 'Leadership & Student Summits',
    headline: 'Building Community & Stage Leadership',
    summary: 'Established foundational leadership at NIAT, hosted creator masterclasses, and organized initial student tech workshops.',
    milestones: [
      'Elected President of Influencers Club NIAT, leading creative masterclasses and workshops for 500+ students',
      'Curated and hosted keynote sessions with prominent creators including Ishan Sharma, Madhu Kiran, and Tharun Naik',
      'Won college creative storytelling competitions and organized first tech hackathons and cybersecurity workshops'
    ],
    metrics: [
      { label: 'Events Organized', value: '5+' },
      { label: 'Creators Hosted', value: '4+' },
      { label: 'Students Mentored', value: '500+' }
    ],
    accent: 'from-amber-500/20 via-orange-500/10 to-transparent',
    borderAccent: 'border-amber-500/30',
    tagColor: 'bg-amber-500/10 text-amber-300 border-amber-500/20'
  },
  {
    year: '2025',
    stage: 'Expansion',
    badge: 'Operations & Event Architecture',
    headline: 'Scaling Operations & Large-Scale Summits',
    summary: 'Expanded into large-scale event security architecture, web development projects, and national industry certifications.',
    milestones: [
      'Led 10-member security and promotions force for HexaVerse 2025 with zero recorded safety incidents',
      'Served as Event Organizer & Senior Coordinator for NIAT\'s flagship festival Starlit’25',
      'Built fullstack web applications and completed verified certifications (HubSpot, TCS iON, MSME India)'
    ],
    metrics: [
      { label: 'Security Force Led', value: '10 Members' },
      { label: 'Web Apps Built', value: '5+' },
      { label: 'Certifications', value: '4+' }
    ],
    accent: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    borderAccent: 'border-purple-500/30',
    tagColor: 'bg-purple-500/10 text-purple-300 border-purple-500/20'
  },
  {
    year: '2026',
    stage: 'Impact',
    badge: 'Community Leadership & Web Infrastructure',
    headline: 'Ecosystem Impact, High-Growth Marketing & Web Platforms',
    summary: 'Driving nationwide community growth at Innfill, architecting web infrastructure for 1,665+ participants, and leading social impact.',
    milestones: [
      'Head of Community at Innfill, expanding campus ambassador networks and nationwide student programs',
      'Lead Organizer & Platform Architect for BASE44 Hackathon, handling 1,665+ participants with 100% platform uptime',
      'Strategic POC for Teach AI for India, taking AI awareness and digital literacy to government schools',
      'Content Strategist Intern at NxtWave, managing audience campaigns reaching over 400,000+ people'
    ],
    metrics: [
      { label: 'Hackathon Scale', value: '1,665+' },
      { label: 'Campaign Reach', value: '400K+' },
      { label: 'Students Impacted', value: '2,000+' }
    ],
    accent: 'from-indigo-500/20 via-cyan-500/10 to-transparent',
    borderAccent: 'border-indigo-500/30',
    tagColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
  }
];

export default function GrowthJourney() {
  const [selectedYear, setSelectedYear] = useState('2026');

  const activeStage = JOURNEY_STAGES.find(s => s.year === selectedYear) || JOURNEY_STAGES[2];

  return (
    <section id="journey" className="max-w-5xl mx-auto px-4 sm:px-6 py-20 w-full relative z-10">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full inline-block mb-3">
          05 — TIMELINE
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
          My Growth Journey
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mt-2.5 font-light">
          A chronological milestone journey of leadership growth, technical execution, and expanding community impact.
        </p>
      </div>

      {/* Year Selector Tabs */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10">
        {JOURNEY_STAGES.map((stage) => {
          const isActive = stage.year === selectedYear;
          return (
            <button
              key={stage.year}
              onClick={() => setSelectedYear(stage.year)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer border flex items-center gap-2 ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-500/20 scale-[1.02]'
                  : 'bg-slate-900/50 text-slate-400 border-white/5 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span>{stage.year}</span>
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${
                isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400'
              }`}>
                {stage.stage}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage.year}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 relative overflow-hidden"
        >
          {/* Subtle Ambient Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${activeStage.accent} opacity-40 pointer-events-none`}></div>

          <div className="relative z-10">
            {/* Header row */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  {activeStage.year}
                </span>
                <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${activeStage.tagColor}`}>
                  {activeStage.stage} Phase
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {activeStage.badge}
              </span>
            </div>

            {/* Headline and short summary */}
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
              {activeStage.headline}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
              {activeStage.summary}
            </p>

            {/* Key Milestones List */}
            <div className="mb-6">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-indigo-400" />
                <span>Verified Milestones</span>
              </h4>
              <ul className="space-y-2.5">
                {activeStage.milestones.map((milestone, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                    <span>{milestone}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/5">
              {activeStage.metrics.map((metric, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/40 border border-white/5 text-center">
                  <div className="text-lg sm:text-xl font-extrabold text-white bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
                    {metric.value}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </motion.div>
      </AnimatePresence>

    </section>
  );
}
