import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { useAuth } from '../../context/AuthContext';
import { 
  FolderGit2, Award, Briefcase, Sparkles, Quote, 
  ShieldCheck, Mic, Inbox, Eye, Clock, Plus, 
  ArrowUpRight, CheckCircle2, AlertCircle, FileText,
  Activity, Sparkle, Layers, ExternalLink
} from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const {
    projects,
    achievements,
    experiences,
    services,
    testimonials,
    certifications,
    speakingEvents,
    inquiries,
    activityLogs,
    loading
  } = usePortfolioData();

  // Calculate real metrics from actual database data
  const totalProjects = projects.length;
  const publishedProjects = projects.filter(p => p.published !== false).length;
  const draftProjects = totalProjects - publishedProjects;

  const totalAchievements = achievements.length;
  const publishedAchievements = achievements.filter(a => a.published !== false).length;

  const totalExperiences = experiences.length;
  const publishedExperiences = experiences.filter(e => e.published !== false).length;

  const totalServices = services.length;
  const publishedServices = services.filter(s => s.published !== false).length;

  const totalTestimonials = testimonials.length;
  const totalCertifications = certifications.length;
  const totalSpeaking = speakingEvents.length;

  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter(i => i.status === 'New').length;

  const totalDrafts = (totalProjects - publishedProjects) + 
                      (totalAchievements - publishedAchievements) + 
                      (totalExperiences - publishedExperiences) + 
                      (totalServices - publishedServices);

  const statsGrid = [
    {
      label: 'Total Projects',
      value: totalProjects,
      subtext: `${publishedProjects} published`,
      icon: FolderGit2,
      color: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30 text-indigo-400',
      link: '/admin/projects'
    },
    {
      label: 'Achievements',
      value: totalAchievements,
      subtext: `${publishedAchievements} active awards`,
      icon: Award,
      color: 'from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-400',
      link: '/admin/achievements'
    },
    {
      label: 'Experiences',
      value: totalExperiences,
      subtext: `${publishedExperiences} active roles`,
      icon: Briefcase,
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
      link: '/admin/experience'
    },
    {
      label: 'Freelance Services',
      value: totalServices,
      subtext: `${publishedServices} listed offerings`,
      icon: Sparkles,
      color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400',
      link: '/admin/services'
    },
    {
      label: 'Total Inquiries',
      value: totalInquiries,
      subtext: newInquiries > 0 ? `${newInquiries} unread new` : 'All caught up',
      icon: Inbox,
      color: newInquiries > 0 
        ? 'from-rose-500/20 to-orange-500/20 border-rose-500/40 text-rose-400' 
        : 'from-slate-500/20 to-slate-700/20 border-white/10 text-slate-400',
      link: '/admin/inquiries',
      highlight: newInquiries > 0
    },
    {
      label: 'Testimonials',
      value: totalTestimonials,
      subtext: 'Client recommendations',
      icon: Quote,
      color: 'from-sky-500/20 to-blue-500/20 border-sky-500/30 text-sky-400',
      link: '/admin/testimonials'
    },
    {
      label: 'Certifications',
      value: totalCertifications,
      subtext: 'Verified credentials',
      icon: ShieldCheck,
      color: 'from-teal-500/20 to-emerald-500/20 border-teal-500/30 text-teal-400',
      link: '/admin/certifications'
    },
    {
      label: 'Speaking & Events',
      value: totalSpeaking,
      subtext: 'Summits & masterclasses',
      icon: Mic,
      color: 'from-fuchsia-500/20 to-purple-500/20 border-fuchsia-500/30 text-fuchsia-400',
      link: '/admin/speaking'
    },
    {
      label: 'Draft Content',
      value: totalDrafts,
      subtext: totalDrafts > 0 ? 'Unpublished drafts' : 'All published',
      icon: FileText,
      color: totalDrafts > 0 
        ? 'from-amber-500/20 to-rose-500/20 border-amber-500/30 text-amber-400'
        : 'from-slate-500/10 to-slate-800/10 border-white/5 text-slate-400',
      link: '/admin/projects'
    }
  ];

  const quickActions = [
    { label: 'Add Project', desc: 'Add new portfolio case study', link: '/admin/projects?action=new', icon: FolderGit2, color: 'text-indigo-400 hover:border-indigo-500/40' },
    { label: 'Add Achievement', desc: 'Add new award or honor', link: '/admin/achievements?action=new', icon: Award, color: 'text-amber-400 hover:border-amber-500/40' },
    { label: 'Add Experience', desc: 'Add professional role', link: '/admin/experience?action=new', icon: Briefcase, color: 'text-emerald-400 hover:border-emerald-500/40' },
    { label: 'Add Service', desc: 'List a new freelance service', link: '/admin/services?action=new', icon: Sparkles, color: 'text-purple-400 hover:border-purple-500/40' },
    { label: 'Add Certification', desc: 'Add verified credential', link: '/admin/certifications?action=new', icon: ShieldCheck, color: 'text-teal-400 hover:border-teal-500/40' },
    { label: 'Add Testimonial', desc: 'Add mentor recommendation', link: '/admin/testimonials?action=new', icon: Quote, color: 'text-sky-400 hover:border-sky-500/40' },
    { label: 'Add Speaking Event', desc: 'Add session or summit talk', link: '/admin/speaking?action=new', icon: Mic, color: 'text-fuchsia-400 hover:border-fuchsia-500/40' },
    { label: 'View Inquiries', desc: 'Review contact submissions', link: '/admin/inquiries', icon: Inbox, color: 'text-rose-400 hover:border-rose-500/40' }
  ];

  // Portfolio Health Audit Checklist
  const healthItems = [
    { label: 'Profile Photo', status: 'Complete', desc: 'High-res profile photo configured' },
    { label: 'Resume', status: 'Complete', desc: 'Google Docs resume linked' },
    { label: 'About & Hero', status: 'Complete', desc: 'Typewriter roles and statement active' },
    { label: 'Achievements', status: totalAchievements >= 5 ? 'Complete' : 'Needs attention', desc: `${totalAchievements} achievements in carousel` },
    { label: 'Projects', status: totalProjects >= 3 ? 'Complete' : 'Needs attention', desc: `${totalProjects} projects published` },
    { label: 'Experience', status: totalExperiences >= 4 ? 'Complete' : 'Needs attention', desc: `${totalExperiences} career milestones active` },
    { label: 'Services', status: totalServices >= 6 ? 'Complete' : 'Needs attention', desc: `${totalServices} freelance offerings listed` },
    { label: 'Certifications', status: totalCertifications >= 3 ? 'Complete' : 'Needs attention', desc: `${totalCertifications} credentials verified` },
    { label: 'Testimonials', status: totalTestimonials >= 1 ? 'Complete' : 'Missing', desc: `${totalTestimonials} mentor quotes active` },
    { label: 'Social Links', status: 'Complete', desc: 'LinkedIn, GitHub, Instagram, Email active' },
    { label: 'Contact System', status: 'Complete', desc: 'Modal form & EmailJS connected' },
    { label: 'SEO Configuration', status: 'Complete', desc: 'Meta tags, OG & Twitter cards defined' }
  ];

  // Calculate greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-white/10 p-6 sm:p-8">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
              <Sparkle size={13} className="animate-spin text-indigo-400" />
              <span>Main Portfolio CMS Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              {getGreeting()}, Karthik
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              <strong>Karthik Portfolio Admin</strong> — Portfolio Content Management System. Manage all projects, achievements, experience, services, and inquiries from one dedicated portal.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-bold transition shadow-sm"
            >
              <span>View Website</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* Portfolio Health Overview Section */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Portfolio Health & Content Readiness</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Live audit of all main portfolio sections and completeness status.</p>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full self-start">
            100% Operational
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1">
          {healthItems.map(item => {
            const isComplete = item.status === 'Complete';
            const isMissing = item.status === 'Missing';
            return (
              <div key={item.label} className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-bold text-slate-200 truncate">{item.label}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isComplete ? 'bg-emerald-400' : isMissing ? 'bg-rose-400' : 'bg-amber-400'}`} />
                </div>
                <p className="text-[9px] text-slate-400 line-clamp-1">{item.desc}</p>
                <span className={`inline-block text-[9px] font-semibold px-1.5 py-0.2 rounded border ${
                  isComplete ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 
                  isMissing ? 'bg-rose-500/10 text-rose-300 border-rose-500/20' : 
                  'bg-amber-500/10 text-amber-300 border-amber-500/20'
                }`}>
                  {item.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Statistics Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Activity size={18} className="text-indigo-400" />
            <span>Overview Metrics</span>
          </h2>
          <span className="text-xs text-slate-400">Real-time database records</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4">
          {statsGrid.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.label}
                to={stat.link}
                className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-br border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg group relative overflow-hidden ${stat.color} ${stat.highlight ? 'ring-2 ring-rose-500/30' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                    {stat.label}
                  </span>
                  <div className="p-2 rounded-xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform">
                    <Icon size={16} />
                  </div>
                </div>

                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display mb-1">
                  {stat.value}
                </div>

                <p className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{stat.subtext}</span>
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Actions & Recent Activity Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions (1 col) */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <Plus size={16} className="text-indigo-400" />
            <span>Quick Actions</span>
          </h3>

          <div className="space-y-2.5">
            {quickActions.map(action => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  to={action.link}
                  className={`flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 hover:bg-slate-900 transition-all group ${action.color}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {action.label}
                      </h4>
                      <p className="text-[11px] text-slate-400">{action.desc}</p>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition" />
                </Link>
              );
            })}
          </div>

          {/* Featured Highlight Preview Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-indigo-950/30 border border-amber-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                Featured Case Study
              </span>
              <span className="text-[10px] text-slate-400">Govt / State Summit</span>
            </div>
            <h4 className="text-xs font-bold text-white">PanIIT Andhra Pradesh Summit 2026</h4>
            <p className="text-[11px] text-slate-300 line-clamp-2">
              Impact Designer & Student Organizer case study with full venue signage, pavilion branding, and gallery.
            </p>
            <Link
              to="/admin/projects"
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-300 hover:text-amber-200 transition pt-1"
            >
              <span>Manage Project & Case Study</span>
              <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>

        {/* Recent Activity Log (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <Clock size={16} className="text-indigo-400" />
              <span>Recent Admin Activity</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">{activityLogs.length} events recorded</span>
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-white/5 divide-y divide-white/5 overflow-hidden">
            {activityLogs && activityLogs.length > 0 ? (
              activityLogs.slice(0, 8).map((log, idx) => {
                const date = new Date(log.created_at || Date.now());
                const timeAgo = formatTimeAgo(date);

                return (
                  <div key={log.id || idx} className="p-3.5 sm:p-4 flex items-start justify-between gap-3 hover:bg-white/5 transition">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                        <Activity size={14} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-white">{log.action}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/5 text-slate-400 uppercase font-mono">
                            {log.entity_type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">{log.description}</p>
                        <p className="text-[10px] text-slate-500 mt-1">
                          By <span className="text-slate-400">{log.admin_email || 'admin@karthik.dev'}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500 font-mono shrink-0 whitespace-nowrap">
                      {timeAgo}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">
                No recent activity recorded yet. Actions you perform will appear here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function formatTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
