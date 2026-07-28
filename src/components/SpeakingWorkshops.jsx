import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, FileText, Lightbulb, Users, 
  TrendingUp, Calendar, Smartphone, Compass,
  ArrowRight, Clock, Award, ShieldAlert 
} from 'lucide-react';
import { SPEAKING_DATA } from '../lib/portfolioData';

// Map icon names to Lucide icons
const TopicIcon = ({ name, className }) => {
  switch (name) {
    case 'sparkles': return <Sparkles className={className} />;
    case 'file-text': return <FileText className={className} />;
    case 'lightbulb': return <Lightbulb className={className} />;
    case 'users': return <Users className={className} />;
    case 'trending-up': return <TrendingUp className={className} />;
    case 'calendar': return <Calendar className={className} />;
    case 'smartphone': return <Smartphone className={className} />;
    case 'compass': return <Compass className={className} />;
    default: return <Sparkles className={className} />;
  }
};

const getLevelColor = (level) => {
  switch (level.toLowerCase()) {
    case 'beginner': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    case 'intermediate': return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
    case 'advanced': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
  }
};

export default function SpeakingWorkshops({ onTriggerContact }) {
  const speakingFormats = [
    "Guest Talks",
    "Panel Discussions",
    "Hackathons",
    "College Fests",
    "Workshops",
    "Tech Communities",
    "Corporate Sessions"
  ];

  return (
    <section id="speaking" className="max-w-6xl mx-auto px-4 py-20 w-full relative z-10">
      <div className="text-center mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold text-indigo-400 uppercase tracking-widest px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full"
        >
          Public Speaking
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-4 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent"
        >
          Speaking & Workshops
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
        >
          I enjoy sharing knowledge, mentoring students and speaking about technology, leadership and personal growth.
        </motion.p>
      </div>

      {/* Featured Speaker Section Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel p-8 sm:p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group mb-16"
      >
        {/* Abstract vector backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-purple-500/5 opacity-100 transition duration-500 rounded-[2.5rem]"></div>
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Speaker Illustration / Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group/photo">
              {/* Outer glow rings */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl blur-2xl opacity-20 group-hover/photo:opacity-35 transition duration-500 animate-pulse"></div>
              
              <div className="relative w-full max-w-[280px] aspect-[4/5] rounded-2xl p-2 bg-white/5 border border-white/10 shadow-2xl overflow-hidden">
                <img 
                  src="https://res.cloudinary.com/do4nuj2kh/image/upload/v1783330744/WhatsApp_Image_2026-07-01_at_7.32.30_PM_vbhtly.jpg"
                  alt="Karthik Speaking" 
                  className="w-full h-full object-cover rounded-xl grayscale group-hover/photo:grayscale-0 transition duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Availability details */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-0.5 border border-indigo-500/20 rounded-md">
                Booking Open
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 mb-4">
                Bring High Energy to Your Next Event
              </h3>
              <p className="text-slate-350 text-sm leading-relaxed mb-6">
                From technical blockchain panel moderations and AI code workshops to inspirational leadership talks for massive student assemblies — I tailor my keynotes and masterclasses to deliver actionable blueprints.
              </p>

              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Available for</h4>
                <div className="flex flex-wrap gap-2">
                  {speakingFormats.map((format, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/20 text-slate-300 transition duration-300"
                    >
                      {format}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onTriggerContact && onTriggerContact('Speaking Opportunity')}
                className="px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:shadow-white/10 transition-all duration-300 cursor-pointer flex items-center gap-2"
              >
                <span>Invite Me to Speak</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid of speaking topics */}
      <h3 className="text-xl font-extrabold text-white mb-8 border-l-2 border-indigo-500 pl-3">
        Popular Topics & Session Outlines
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {SPEAKING_DATA.map((topic, index) => {
          const levelClass = getLevelColor(topic.level);
          
          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl glass-panel relative overflow-hidden border border-white/5 flex flex-col justify-between group hover:border-indigo-500/30 transition-all duration-300"
            >
              {/* Soft purple hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10 flex-1 flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 shrink-0 text-indigo-400 group-hover:bg-indigo-500/20 transition duration-300">
                  <TopicIcon name={topic.icon} className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-white text-base leading-snug group-hover:text-indigo-300 transition duration-200 mb-2">
                  {topic.title}
                </h3>
                <p className="text-slate-450 text-[11px] leading-relaxed mb-6">
                  {topic.desc}
                </p>
              </div>

              {/* metadata and parameters */}
              <div className="relative z-10 mt-auto pt-4 border-t border-white/5 space-y-3">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-slate-500 uppercase tracking-wider">Level</span>
                  <span className={`px-2 py-0.5 rounded-full border ${levelClass}`}>
                    {topic.level}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-slate-500 uppercase tracking-wider">Duration</span>
                  <span className="text-slate-300 flex items-center gap-1">
                    <Clock size={10} className="text-indigo-400" />
                    {topic.duration}
                  </span>
                </div>

                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-slate-500 uppercase tracking-wider">Best For</span>
                  <span className="text-indigo-350 truncate max-w-[110px]">
                    {topic.bestFor}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
