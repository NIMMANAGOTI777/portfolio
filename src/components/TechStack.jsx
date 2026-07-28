import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Code2, Database, Palette, Video, 
  TrendingUp, Layers, ChevronRight, Sparkles 
} from 'lucide-react';
import { TECH_STACK_DATA } from '../lib/portfolioData';

// Map categories to Lucide icons
const CategoryIcon = ({ category, className }) => {
  switch (category.toLowerCase()) {
    case 'frontend': return <Code2 className={className} />;
    case 'backend': return <Database className={className} />;
    case 'design': return <Palette className={className} />;
    case 'content creation': return <Video className={className} />;
    case 'marketing': return <TrendingUp className={className} />;
    case 'productivity': return <Layers className={className} />;
    default: return <Sparkles className={className} />;
  }
};

const getBrandColor = (name) => {
  switch (name.toLowerCase()) {
    case 'react': return 'rgba(97, 218, 251, 0.25)';
    case 'next.js': return 'rgba(255, 255, 255, 0.25)';
    case 'tailwind css': return 'rgba(6, 182, 212, 0.25)';
    case 'typescript': return 'rgba(49, 120, 198, 0.25)';
    case 'javascript': return 'rgba(247, 223, 30, 0.25)';
    case 'html5': return 'rgba(227, 79, 38, 0.25)';
    case 'css3': return 'rgba(21, 114, 182, 0.25)';
    case 'framer motion': return 'rgba(255, 0, 200, 0.25)';
    case 'node.js': return 'rgba(51, 153, 51, 0.25)';
    case 'supabase': return 'rgba(62, 207, 142, 0.25)';
    case 'firebase': return 'rgba(255, 202, 40, 0.25)';
    case 'mongodb': return 'rgba(71, 162, 72, 0.25)';
    case 'figma': return 'rgba(242, 78, 30, 0.25)';
    case 'canva': return 'rgba(0, 196, 204, 0.25)';
    case 'vn editor': return 'rgba(246, 196, 69, 0.25)';
    case 'linkedin smm': return 'rgba(10, 102, 194, 0.25)';
    case 'github': return 'rgba(255, 255, 255, 0.25)';
    case 'vs code': return 'rgba(0, 122, 204, 0.25)';
    case 'notion': return 'rgba(255, 255, 255, 0.25)';
    case 'slack': return 'rgba(74, 21, 75, 0.25)';
    default: return 'rgba(99, 102, 241, 0.2)'; 
  }
};

const getTextColor = (name) => {
  switch (name.toLowerCase()) {
    case 'react': return 'text-sky-400';
    case 'tailwind css': return 'text-cyan-400';
    case 'typescript': return 'text-blue-400';
    case 'javascript': return 'text-yellow-400';
    case 'html5': return 'text-orange-400';
    case 'css3': return 'text-blue-500';
    case 'framer motion': return 'text-pink-400';
    case 'node.js': return 'text-green-400';
    case 'supabase': return 'text-emerald-400';
    case 'firebase': return 'text-amber-400';
    case 'mongodb': return 'text-emerald-500';
    case 'figma': return 'text-rose-450';
    case 'canva': return 'text-cyan-300';
    case 'vn editor': return 'text-amber-300';
    case 'linkedin smm': return 'text-indigo-400';
    case 'github': return 'text-slate-200';
    case 'vs code': return 'text-blue-450';
    default: return 'text-indigo-300';
  }
};

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract all categories dynamically
  const categories = useMemo(() => {
    return ['All', ...TECH_STACK_DATA.map(c => c.category)];
  }, []);

  // Filter tools based on tab category + search keyword
  const filteredTools = useMemo(() => {
    let result = [];
    
    TECH_STACK_DATA.forEach(cat => {
      if (selectedCategory === 'All' || cat.category === selectedCategory) {
        cat.tools.forEach(tool => {
          if (tool.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            result.push({
              ...tool,
              category: cat.category
            });
          }
        });
      }
    });

    return result;
  }, [selectedCategory, searchQuery]);

  return (
    <section id="toolbox" className="max-w-6xl mx-auto px-4 py-20 w-full relative z-10">
      <div className="text-center mb-12">
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold text-indigo-400 uppercase tracking-widest px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full"
        >
          Toolbox
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-4 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent"
        >
          My Digital Toolbox
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
        >
          The technologies, platforms and creative tools I use to build, design and deliver products.
        </motion.p>
      </div>

      {/* Filters HUD */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/5">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 items-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all relative overflow-hidden cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-650 to-purple-650 text-white shadow-lg shadow-indigo-500/10'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:max-w-xs">
          <Search size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
          />
        </div>
      </div>

      {/* Grid of Tools */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredTools.map((tool, index) => {
            const glowColor = getBrandColor(tool.name);
            const titleColor = getTextColor(tool.name);
            
            return (
              <motion.div
                key={tool.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                whileHover={{ y: -4 }}
                className="p-5 rounded-2xl glass-panel relative overflow-hidden border border-white/5 group hover:border-white/10"
                style={{
                  '--hover-glow': glowColor
                }}
              >
                {/* Brand glowing shadow on hover */}
                <div 
                  className="absolute inset-0 bg-radial transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${glowColor} 0%, rgba(3, 7, 18, 0) 80%)`
                  }}
                ></div>

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Tool Category & Header */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        {tool.category}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-white/10 transition duration-300">
                        <CategoryIcon category={tool.category} className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Tool Name */}
                    <h3 className={`text-lg font-extrabold group-hover:text-white transition-colors mb-4 ${titleColor}`}>
                      {tool.name}
                    </h3>
                  </div>

                  {/* Micro stats & progress */}
                  <div className="space-y-3 pt-3 border-t border-white/5 text-[11px] text-slate-400 font-medium">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Experience</span>
                      <span className="text-slate-200 font-semibold">{tool.experience}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Projects</span>
                      <span className="text-slate-200 font-semibold">{tool.projects}</span>
                    </div>
                    
                    {/* Linear Proficiency bar */}
                    <div className="pt-1.5">
                      <div className="flex justify-between text-[10px] mb-1 font-bold text-slate-500">
                        <span>Proficiency</span>
                        <span className={titleColor}>{tool.proficiency}%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-500"
                          style={{ width: `${tool.proficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredTools.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-20 text-slate-500 border border-dashed border-white/10 rounded-2xl bg-white/5"
        >
          No technologies found matching "{searchQuery}" in category "{selectedCategory}"
        </motion.div>
      )}
    </section>
  );
}
