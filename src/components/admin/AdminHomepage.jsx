import React, { useState, useEffect } from 'react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { Home, Save, CheckCircle2, Sparkles, Image, Users } from 'lucide-react';

export default function AdminHomepage() {
  const { siteSettings, saveSiteSettings } = usePortfolioData();
  const [toastMessage, setToastMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const defaultHomepage = {
    hero_heading: "Designing Impact. Building Communities. Architecting Web.",
    hero_subheading: "Aspiring Product Manager, Community Architect & Impact Designer crafting meaningful digital experiences and high-growth student movements.",
    profile_image: "https://res.cloudinary.com/do4nuj2kh/image/upload/v1783330744/WhatsApp_Image_2026-07-01_at_7.32.30_PM_vbhtly.jpg",
    students_impacted: 2000,
    mentorships_count: 200,
    events_led: 10,
    about_text: "Bridging the gap between digital products, high-velocity community growth, and real-world event design.",
    cta_text: "Let's Collaborate",
    contact_email: "aktechintelligence@gmail.com",
    whatsapp_number: "919014603387"
  };

  const [formData, setFormData] = useState(defaultHomepage);

  useEffect(() => {
    if (siteSettings?.homepage) {
      setFormData({ ...defaultHomepage, ...siteSettings.homepage });
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
      await saveSiteSettings('homepage', formData);
      showToast('Homepage content updated successfully!');
    } catch (err) {
      alert('Error saving homepage settings: ' + err.message);
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
            <Home className="text-indigo-400" size={24} />
            <span>Homepage Content Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Customize hero statements, statistics, bio copy, and contact info without code deployments.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-indigo-600/20 cursor-pointer disabled:opacity-50"
        >
          <Save size={16} />
          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Section 1: Hero */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles size={16} className="text-indigo-400" />
            <span>Hero Section</span>
          </h3>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Hero Headline *</label>
            <input
              type="text"
              required
              value={formData.hero_heading}
              onChange={(e) => setFormData({ ...formData, hero_heading: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Hero Subheading</label>
            <textarea
              rows={3}
              value={formData.hero_subheading}
              onChange={(e) => setFormData({ ...formData, hero_subheading: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Profile Image URL (Cloudinary)</label>
            <input
              type="text"
              value={formData.profile_image}
              onChange={(e) => setFormData({ ...formData, profile_image: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Section 2: Animated Statistics Numbers */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Users size={16} className="text-indigo-400" />
            <span>Key Impact Statistics</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Students Impacted (+)</label>
              <input
                type="number"
                value={formData.students_impacted}
                onChange={(e) => setFormData({ ...formData, students_impacted: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">LinkedIn Mentorships (+)</label>
              <input
                type="number"
                value={formData.mentorships_count}
                onChange={(e) => setFormData({ ...formData, mentorships_count: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Events Led (+)</label>
              <input
                type="number"
                value={formData.events_led}
                onChange={(e) => setFormData({ ...formData, events_led: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Contact & CTA */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 size={16} className="text-indigo-400" />
            <span>Call to Action & Direct Contact</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">CTA Button Text</label>
              <input
                type="text"
                value={formData.cta_text}
                onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Contact Email</label>
              <input
                type="email"
                value={formData.contact_email}
                onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">WhatsApp Number (with country code)</label>
              <input
                type="text"
                value={formData.whatsapp_number}
                onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-600/20 cursor-pointer disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Homepage Content'}
          </button>
        </div>
      </form>
    </div>
  );
}
