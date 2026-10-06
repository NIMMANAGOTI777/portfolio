import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { 
  Search, FolderGit2, Award, Briefcase, Sparkles, 
  Quote, ShieldCheck, Mic, Image, Inbox, Users, ArrowRight, X 
} from 'lucide-react';

export default function AdminGlobalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const {
    projects,
    achievements,
    experiences,
    services,
    testimonials,
    certifications,
    speakingEvents,
    mediaItems,
    inquiries
  } = usePortfolioData();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const results = [];

  if (trimmed) {
    // 1. Projects
    projects.forEach(p => {
      if (p.title?.toLowerCase().includes(trimmed) || p.short_description?.toLowerCase().includes(trimmed)) {
        results.push({
          id: p.id,
          title: p.title,
          subtitle: p.subtitle || p.category || 'Project',
          type: 'Project',
          icon: FolderGit2,
          route: '/admin/projects',
          color: 'text-indigo-400 bg-indigo-500/10'
        });
      }
    });

    // 2. Achievements
    achievements.forEach(a => {
      if (a.title?.toLowerCase().includes(trimmed) || a.description?.toLowerCase().includes(trimmed) || a.issuer?.toLowerCase().includes(trimmed)) {
        results.push({
          id: a.id,
          title: a.title,
          subtitle: a.issuer || 'Achievement',
          type: 'Achievement',
          icon: Award,
          route: '/admin/achievements',
          color: 'text-amber-400 bg-amber-500/10'
        });
      }
    });

    // 3. Experiences
    experiences.forEach(e => {
      if (e.company?.toLowerCase().includes(trimmed) || e.role?.toLowerCase().includes(trimmed) || e.summary?.toLowerCase().includes(trimmed)) {
        results.push({
          id: e.id,
          title: `${e.role} @ ${e.company}`,
          subtitle: e.duration || 'Experience',
          type: 'Experience',
          icon: Briefcase,
          route: '/admin/experience',
          color: 'text-emerald-400 bg-emerald-500/10'
        });
      }
    });

    // 4. Services
    services.forEach(s => {
      if (s.title?.toLowerCase().includes(trimmed) || s.description?.toLowerCase().includes(trimmed)) {
        results.push({
          id: s.id,
          title: s.title,
          subtitle: s.category_id || 'Freelance Service',
          type: 'Service',
          icon: Sparkles,
          route: '/admin/services',
          color: 'text-purple-400 bg-purple-500/10'
        });
      }
    });

    // 5. Testimonials
    testimonials.forEach(t => {
      if (t.name?.toLowerCase().includes(trimmed) || t.testimonial?.toLowerCase().includes(trimmed)) {
        results.push({
          id: t.id,
          title: t.name,
          subtitle: `${t.role} (${t.organization || ''})`,
          type: 'Testimonial',
          icon: Quote,
          route: '/admin/testimonials',
          color: 'text-sky-400 bg-sky-500/10'
        });
      }
    });

    // 6. Certifications
    certifications.forEach(c => {
      if (c.title?.toLowerCase().includes(trimmed) || c.issuer?.toLowerCase().includes(trimmed)) {
        results.push({
          id: c.id,
          title: c.title,
          subtitle: c.issuer || 'Certification',
          type: 'Certification',
          icon: ShieldCheck,
          route: '/admin/certifications',
          color: 'text-teal-400 bg-teal-500/10'
        });
      }
    });

    // 7. Speaking Events
    speakingEvents.forEach(s => {
      if (s.title?.toLowerCase().includes(trimmed) || s.topic?.toLowerCase().includes(trimmed)) {
        results.push({
          id: s.id,
          title: s.title,
          subtitle: s.date || 'Event / Collab',
          type: 'Speaking',
          icon: Mic,
          route: '/admin/speaking',
          color: 'text-pink-400 bg-pink-500/10'
        });
      }
    });

    // 8. Media Items
    mediaItems.forEach(m => {
      if (m.title?.toLowerCase().includes(trimmed) || m.folder?.toLowerCase().includes(trimmed)) {
        results.push({
          id: m.id,
          title: m.title,
          subtitle: `${m.type} (${m.size || 'Media'})`,
          type: 'Media',
          icon: Image,
          route: '/admin/media',
          color: 'text-blue-400 bg-blue-500/10'
        });
      }
    });

    // 9. Inquiries
    inquiries.forEach(i => {
      if (i.full_name?.toLowerCase().includes(trimmed) || i.email?.toLowerCase().includes(trimmed) || i.message?.toLowerCase().includes(trimmed)) {
        results.push({
          id: i.id,
          title: i.full_name,
          subtitle: `${i.project_type} • ${i.email}`,
          type: 'Inquiry',
          icon: Inbox,
          route: '/admin/inquiries',
          color: 'text-violet-400 bg-violet-500/10'
        });
      }
    });
  }

  const handleSelect = (route) => {
    navigate(route);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-slate-950/60">
          <Search size={18} className="text-slate-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, achievements, experiences, services, inquiries..."
            className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white rounded transition"
            >
              <X size={16} />
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-3 px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-white/5">
          {trimmed ? (
            results.length > 0 ? (
              results.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={`${item.type}-${item.id}`}
                    onClick={() => handleSelect(item.route)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                            {item.title}
                          </h4>
                          <span className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-slate-400 uppercase font-medium">
                            {item.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">{item.subtitle}</p>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition" />
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">
                No matching content found for "<span className="text-white">{query}</span>"
              </div>
            )
          ) : (
            <div className="p-4 space-y-2">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2">Quick Navigation</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { name: 'Projects', route: '/admin/projects', icon: FolderGit2 },
                  { name: 'Achievements', route: '/admin/achievements', icon: Award },
                  { name: 'Experience', route: '/admin/experience', icon: Briefcase },
                  { name: 'Services', route: '/admin/services', icon: Sparkles },
                  { name: 'Contact Inquiries', route: '/admin/inquiries', icon: Inbox },
                  { name: 'Media Library', route: '/admin/media', icon: Image }
                ].map(nav => {
                  const Icon = nav.icon;
                  return (
                    <button
                      key={nav.name}
                      onClick={() => handleSelect(nav.route)}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-indigo-500/10 hover:border-indigo-500/30 border border-transparent text-left transition cursor-pointer text-xs font-medium text-slate-300 hover:text-white"
                    >
                      <Icon size={14} className="text-indigo-400" />
                      <span>{nav.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
