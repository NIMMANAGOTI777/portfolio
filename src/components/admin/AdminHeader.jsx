import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import AdminGlobalSearchModal from './AdminGlobalSearchModal';
import AdminInstallPWA from './AdminInstallPWA';
import { 
  Menu, Search, Plus, ExternalLink, Bell, RefreshCw, 
  CheckCircle2, FolderGit2, Award, Sparkles, Inbox, Shield 
} from 'lucide-react';

export default function AdminHeader({ onToggleSidebar }) {
  const { user } = useAuth();
  const { refreshData, loading } = usePortfolioData();
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-slate-950/80 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 flex items-center justify-between">
        {/* Left side: Mobile menu toggle + Global Search trigger */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 lg:hidden transition cursor-pointer"
            aria-label="Toggle Navigation Drawer"
          >
            <Menu size={20} />
          </button>

          {/* Spotlight Search trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center justify-between px-3 py-1.5 bg-slate-900/90 hover:bg-slate-900 border border-white/10 hover:border-indigo-500/40 rounded-xl text-xs text-slate-400 transition cursor-pointer shadow-inner"
          >
            <div className="flex items-center gap-2">
              <Search size={14} className="text-slate-400" />
              <span className="hidden sm:inline">Search portfolio content...</span>
              <span className="sm:hidden">Search...</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 rounded">
                Ctrl K
              </kbd>
            </div>
          </button>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Refresh DB state */}
          <button
            onClick={() => refreshData()}
            disabled={loading}
            title="Refresh Database State"
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition cursor-pointer"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin text-indigo-400' : ''} />
          </button>

          {/* Quick Add Dropdown */}
          <div className="relative">
            <button
              onClick={() => setQuickAddOpen(!quickAddOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              <Plus size={14} />
              <span className="hidden md:inline">Quick Add</span>
            </button>

            {quickAddOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setQuickAddOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-1.5 z-50 animate-scale-in">
                  <button
                    onClick={() => {
                      setQuickAddOpen(false);
                      navigate('/admin/projects?action=new');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition text-left cursor-pointer"
                  >
                    <FolderGit2 size={14} className="text-indigo-400" />
                    <span>New Project</span>
                  </button>

                  <button
                    onClick={() => {
                      setQuickAddOpen(false);
                      navigate('/admin/achievements?action=new');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition text-left cursor-pointer"
                  >
                    <Award size={14} className="text-amber-400" />
                    <span>New Achievement</span>
                  </button>

                  <button
                    onClick={() => {
                      setQuickAddOpen(false);
                      navigate('/admin/services?action=new');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition text-left cursor-pointer"
                  >
                    <Sparkles size={14} className="text-purple-400" />
                    <span>New Service</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Install PWA Button (compact header version) */}
          <div className="hidden sm:block">
            <AdminInstallPWA variant="button" />
          </div>

          {/* View Live Site */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            title="Preview Live Portfolio"
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </header>

      {/* Global Search Modal */}
      <AdminGlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
