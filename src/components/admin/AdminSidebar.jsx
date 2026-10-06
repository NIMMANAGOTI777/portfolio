import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import AdminInstallPWA from './AdminInstallPWA';
import { 
  LayoutDashboard, FolderGit2, Award, Briefcase, Sparkles, 
  Quote, ShieldCheck, Mic, Image, Inbox, Users, Home, 
  SearchCode, Share2, Settings, User, LogOut, X, ExternalLink,
  ChevronRight, Sparkle
} from 'lucide-react';

export default function AdminSidebar({ isOpen, onClose }) {
  const { signOut, user } = useAuth();
  const { inquiries, projects, achievements, services } = usePortfolioData();

  const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;

  const navSections = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true }
      ]
    },
    {
      title: 'CONTENT',
      items: [
        { label: 'Projects', path: '/admin/projects', icon: FolderGit2, count: projects.length },
        { label: 'Achievements', path: '/admin/achievements', icon: Award, count: achievements.length },
        { label: 'Professional Experience', path: '/admin/experience', icon: Briefcase },
        { label: 'Freelance Services', path: '/admin/services', icon: Sparkles, count: services.length },
        { label: 'Testimonials', path: '/admin/testimonials', icon: Quote },
        { label: 'Certifications', path: '/admin/certifications', icon: ShieldCheck },
        { label: 'Speaking & Events', path: '/admin/speaking', icon: Mic }
      ]
    },
    {
      title: 'MEDIA',
      items: [
        { label: 'Media Library', path: '/admin/media', icon: Image }
      ]
    },
    {
      title: 'INQUIRIES',
      items: [
        { label: 'Contact Inquiries', path: '/admin/inquiries', icon: Inbox, badge: newInquiriesCount > 0 ? newInquiriesCount : null, badgeColor: 'bg-indigo-500' },
        { label: 'Lead Management', path: '/admin/leads', icon: Users }
      ]
    },
    {
      title: 'WEBSITE',
      items: [
        { label: 'Homepage Content', path: '/admin/homepage', icon: Home },
        { label: 'SEO Settings', path: '/admin/seo', icon: SearchCode },
        { label: 'Social Links', path: '/admin/social', icon: Share2 }
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { label: 'Admin Profile', path: '/admin/profile', icon: User },
        { label: 'Site Settings', path: '/admin/settings', icon: Settings }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-950/95 border-r border-white/10 backdrop-blur-xl flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <Link to="/admin" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm tracking-wider">K</span>
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                <span>Karthik Admin</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Portfolio Management</p>
            </div>
          </Link>

          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 lg:hidden transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <div className="px-3 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                {section.title}
              </div>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.end}
                      onClick={() => {
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
                          isActive
                            ? 'bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-indigo-300 border border-indigo-500/30 font-semibold'
                            : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                        }`
                      }
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={15} className="group-hover:scale-110 transition-transform text-slate-400 group-hover:text-indigo-400" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge ? (
                        <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold text-white ${item.badgeColor || 'bg-indigo-600'}`}>
                          {item.badge}
                        </span>
                      ) : item.count !== undefined ? (
                        <span className="text-[10px] font-medium text-slate-400 px-1.5 py-0.5 rounded bg-white/5">
                          {item.count}
                        </span>
                      ) : null}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-white/10 space-y-2 shrink-0 bg-slate-950/50">
          {/* PWA Install Button */}
          <AdminInstallPWA variant="sidebar" />

          {/* View Live Portfolio Link */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition"
          >
            <div className="flex items-center gap-2">
              <ExternalLink size={14} />
              <span>Live Website</span>
            </div>
            <ChevronRight size={12} className="text-slate-600" />
          </a>

          {/* User Profile / Logout */}
          <div className="pt-2 border-t border-white/5 flex items-center justify-between px-2">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 text-xs font-bold shrink-0">
                {user?.email ? user.email.charAt(0).toUpperCase() : 'K'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">{user?.email || 'admin@karthik.dev'}</p>
                <p className="text-[10px] text-slate-400 truncate">Administrator</p>
              </div>
            </div>

            <button
              onClick={signOut}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition cursor-pointer"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
