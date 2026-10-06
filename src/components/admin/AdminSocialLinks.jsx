import React, { useState } from 'react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { 
  Share2, Save, CheckCircle2, ArrowUp, ArrowDown, 
  ExternalLink, Eye, EyeOff, Plus, Trash2, Globe
} from 'lucide-react';

export default function AdminSocialLinks() {
  const { socialLinks, saveSocialLinks } = usePortfolioData();
  const [links, setLinks] = useState(socialLinks);
  const [toastMessage, setToastMessage] = useState('');
  const [saving, setSaving] = useState(false);

  // Sync initial state if socialLinks loaded later
  React.useEffect(() => {
    if (socialLinks && socialLinks.length > 0) {
      setLinks(socialLinks);
    }
  }, [socialLinks]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleToggle = (id) => {
    setLinks(links.map(l => l.id === id ? { ...l, enabled: !l.enabled } : l));
  };

  const handleChange = (id, field, value) => {
    setLinks(links.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const handleMove = (index, direction) => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= links.length) return;
    const reordered = [...links];
    const temp = reordered[index];
    reordered[index] = reordered[newIdx];
    reordered[newIdx] = temp;
    setLinks(reordered.map((l, i) => ({ ...l, display_order: i + 1 })));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSocialLinks(links);
      showToast('Social links saved successfully!');
    } catch (err) {
      alert('Error saving social links: ' + err.message);
    } finally {
      setSaving(false);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display flex items-center gap-2">
            <Share2 className="text-indigo-400" size={24} />
            <span>Social Links Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure public social media links, personal handles, and contact profiles.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-indigo-600/20 cursor-pointer disabled:opacity-50"
        >
          <Save size={16} />
          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      {/* Links List */}
      <div className="space-y-3">
        {links.map((link, idx) => (
          <div
            key={link.id}
            className={`p-4 rounded-2xl bg-slate-900/60 border transition-all duration-200 flex flex-col sm:flex-row sm:items-center gap-4 ${
              link.enabled !== false ? 'border-white/10' : 'border-white/5 opacity-60'
            }`}
          >
            {/* Reorder arrows */}
            <div className="flex sm:flex-col gap-1 shrink-0">
              <button
                onClick={() => handleMove(idx, 'up')}
                disabled={idx === 0}
                className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
              >
                <ArrowUp size={12} />
              </button>
              <button
                onClick={() => handleMove(idx, 'down')}
                disabled={idx === links.length - 1}
                className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
              >
                <ArrowDown size={12} />
              </button>
            </div>

            {/* Platform info + URL inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Platform Label</label>
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => handleChange(link.id, 'label', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-400 font-medium mb-1">Target URL</label>
                <input
                  type="text"
                  value={link.url}
                  onChange={(e) => handleChange(link.id, 'url', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Toggle Enable */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={() => handleToggle(link.id)}
                className={`p-2 rounded-xl border transition cursor-pointer ${
                  link.enabled !== false
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                }`}
                title={link.enabled !== false ? 'Disable' : 'Enable'}
              >
                {link.enabled !== false ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
