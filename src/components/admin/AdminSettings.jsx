import React, { useState } from 'react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { Settings, Save, CheckCircle2, Database, Shield, Smartphone, RefreshCw, Key } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

export default function AdminSettings() {
  const { refreshData } = usePortfolioData();
  const [toastMessage, setToastMessage] = useState('');
  const [syncing, setSyncing] = useState(false);

  const isMock = supabase.isMock;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleManualSync = async () => {
    setSyncing(true);
    try {
      await refreshData();
      showToast('Database synchronization complete.');
    } catch (e) {
      alert('Sync failed: ' + e.message);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-slide-up">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display flex items-center gap-2">
          <Settings className="text-indigo-400" size={24} />
          <span>System & Database Settings</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Review Supabase configuration, Row Level Security posture, and offline PWA health.
        </p>
      </div>

      <div className="space-y-4 text-xs">
        {/* Supabase Connection Status Card */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Database size={16} className="text-indigo-400" />
              <span>Supabase Database State</span>
            </h3>

            <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              !isMock 
                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' 
                : 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/30'
            }`}>
              <span className={`w-2 h-2 rounded-full ${!isMock ? 'bg-emerald-400' : 'bg-indigo-400'} animate-pulse`}></span>
              <span>{!isMock ? 'Live PostgreSQL Connected' : 'Universal Local Sync (Standalone)'}</span>
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed">
            {!isMock 
              ? 'Your admin dashboard is currently running with real-time Supabase PostgreSQL backend integration.'
              : 'Supabase environment variables are in standalone offline mock mode. All content is saved locally in browser storage and will seamlessly sync to Supabase once environment variables are placed in .env.'}
          </p>

          <div className="pt-2 flex items-center justify-between border-t border-white/5">
            <span className="text-slate-500 font-mono text-[11px]">
              Environment: {import.meta.env.MODE || 'production'}
            </span>
            <button
              onClick={handleManualSync}
              disabled={syncing}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition cursor-pointer"
            >
              <RefreshCw size={12} className={syncing ? 'animate-spin' : ''} />
              <span>{syncing ? 'Syncing...' : 'Force Sync'}</span>
            </button>
          </div>
        </div>

        {/* Security & RLS Guidelines */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Shield size={16} className="text-emerald-400" />
            <span>Row Level Security (RLS) Checklist</span>
          </h3>

          <ul className="space-y-2 text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
              <span>Public users can only read published portfolio content.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
              <span>Contact inquiries & leads are private and require admin authentication.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
              <span>Service-role keys and administrative secrets are never exposed on client.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
