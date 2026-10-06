import React, { useState, useEffect } from 'react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { SearchCode, Save, CheckCircle2, Globe, Share2, Code2 } from 'lucide-react';

export default function AdminSEO() {
  const { siteSettings, saveSiteSettings } = usePortfolioData();
  const [toastMessage, setToastMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const defaultSEO = {
    website_title: 'Karthik Nimmanagoti | Creative Strategist, Community Builder & Web Developer',
    meta_description: 'Karthik Nimmanagoti is a Creative Strategist, Community Builder, Web Developer and Event Organizer building digital experiences, communities and impactful projects.',
    keywords: 'Karthik Nimmanagoti, Karthik.exe, kar.thikexe, Portfolio, Creator, Product Manager, Community Builder, Event Organizer, Content Strategist, Impact Designer',
    canonical_url: 'https://karthik-portfolio-rust.vercel.app/',
    og_title: 'Karthik Nimmanagoti | Creative Strategist, Community Builder & Web Developer',
    og_description: 'Creative Strategist, Community Builder, Web Developer and Event Organizer building digital experiences and impactful communities.',
    og_image: 'https://karthik-portfolio-rust.vercel.app/og-image.jpg',
    twitter_title: 'Karthik Nimmanagoti | Creative Strategist, Community Builder & Web Developer',
    twitter_description: 'Creative Strategist, Community Builder, Web Developer and Event Organizer.',
    twitter_image: 'https://karthik-portfolio-rust.vercel.app/og-image.jpg',
    robots_index: true,
    robots_follow: true
  };

  const [formData, setFormData] = useState(defaultSEO);

  useEffect(() => {
    if (siteSettings?.seo) {
      setFormData({ ...defaultSEO, ...siteSettings.seo });
    }
  }, [siteSettings]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveSiteSettings('seo', formData);
      showToast('SEO & Metadata settings saved successfully!');
    } catch (err) {
      alert('Error saving SEO settings: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-slide-up">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display flex items-center gap-2">
            <SearchCode className="text-indigo-400" size={24} />
            <span>SEO & Personal Branding Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Optimize search engine ranking for "Karthik Nimmanagoti", "Karthik.exe", and personal entity graphs.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-indigo-600/20 cursor-pointer disabled:opacity-50"
        >
          <Save size={16} />
          <span>{saving ? 'Saving...' : 'Save SEO'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Core Meta Tags */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe size={16} className="text-indigo-400" />
            <span>Core Page Metadata</span>
          </h3>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Website Title Tag *</label>
            <input
              type="text"
              required
              value={formData.website_title}
              onChange={(e) => setFormData({ ...formData, website_title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Meta Description *</label>
            <textarea
              rows={2}
              required
              value={formData.meta_description}
              onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Target Search Keywords (Personal Entities)</label>
            <input
              type="text"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              placeholder="Karthik Nimmanagoti, Karthik.exe, kar.thikexe, Creator, PM..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Canonical URL</label>
            <input
              type="url"
              value={formData.canonical_url}
              onChange={(e) => setFormData({ ...formData, canonical_url: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* OpenGraph & Social Sharing */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Share2 size={16} className="text-indigo-400" />
            <span>Open Graph & Social Cards</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Open Graph Title</label>
              <input
                type="text"
                value={formData.og_title}
                onChange={(e) => setFormData({ ...formData, og_title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Open Graph Image (1200x630)</label>
              <input
                type="text"
                value={formData.og_image}
                onChange={(e) => setFormData({ ...formData, og_image: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Open Graph Description</label>
            <textarea
              rows={2}
              value={formData.og_description}
              onChange={(e) => setFormData({ ...formData, og_description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Structured Data Preview */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Code2 size={16} className="text-indigo-400" />
            <span>JSON-LD Schema Entities Grounding</span>
          </h3>
          <p className="text-xs text-slate-400">
            Schema graphs on the public website automatically associate searches for <strong>"Karthik Nimmanagoti"</strong>, <strong>"Karthik.exe"</strong>, and <strong>"kar.thikexe"</strong> with your verified LinkedIn, GitHub, and Instagram accounts.
          </p>
          <div className="p-3 bg-slate-950 rounded-xl font-mono text-[11px] text-indigo-300/80 overflow-x-auto border border-white/5">
            {'@type: "Person", name: "Karthik Nimmanagoti", sameAs: ["linkedin/karthik-nimmanagoti", "github/NIMMANAGOTI777", "instagram/nimmanagoti.karthik"]'}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-600/20 cursor-pointer disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save SEO Configuration'}
          </button>
        </div>
      </form>
    </div>
  );
}
