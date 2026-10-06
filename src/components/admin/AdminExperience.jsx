import React, { useState } from 'react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import AdminDeleteModal from './AdminDeleteModal';
import { 
  Briefcase, Plus, Edit3, Trash2, ArrowUp, ArrowDown, 
  Eye, EyeOff, Star, X, Check, CheckCircle2,
  Calendar, MapPin, Tag, Search
} from 'lucide-react';

export default function AdminExperience() {
  const { experiences, saveExperience, deleteExperience, reorderExperiences } = usePortfolioData();

  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleOpenNew = () => {
    setEditingItem({
      id: `exp-${Date.now()}`,
      company: '',
      role: '',
      employment_type: 'Full-time Leadership',
      duration: '2026 – Present',
      year: '2026',
      is_current: false,
      location: 'Hyderabad, India',
      summary: '',
      full_description: '',
      responsibilities: [],
      skills: [],
      outcomes: '',
      highlight_tag: '',
      key_metric: '',
      category: ['Leadership'],
      icon: 'briefcase',
      logo_text: 'EX',
      logo_color: 'from-indigo-600 to-purple-600',
      gallery: [],
      featured: false,
      published: true,
      display_order: experiences.length + 1
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (item) => {
    try {
      const updated = { ...item, published: !item.published };
      await saveExperience(updated);
      showToast(`Experience at "${item.company}" ${updated.published ? 'published' : 'unpublished'}.`);
    } catch (e) {
      alert('Error updating status: ' + e.message);
    }
  };

  const handleMove = async (index, direction) => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= experiences.length) return;

    const newOrder = [...experiences];
    const temp = newOrder[index];
    newOrder[index] = newOrder[newIdx];
    newOrder[newIdx] = temp;

    await reorderExperiences(newOrder);
    showToast('Experience timeline reordered.');
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteExperience(deleteTarget.id);
      showToast(`Deleted experience "${deleteTarget.company}".`);
      setDeleteTarget(null);
    } catch (e) {
      alert('Error deleting experience: ' + e.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveExperience(editingItem);
      setIsModalOpen(false);
      showToast(`Experience at "${editingItem.company}" saved successfully.`);
    } catch (err) {
      alert('Error saving experience: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const filtered = experiences.filter(e =>
    e.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.summary?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-slide-up">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display flex items-center gap-2">
            <Briefcase className="text-emerald-400" size={24} />
            <span>Professional Experience</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your leadership roles, career timeline, responsibilities, and impact outcomes.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold rounded-xl transition shadow-lg shadow-emerald-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add Experience</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 bg-slate-900/60 border border-white/10 p-3 rounded-2xl">
        <Search size={16} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by company, role, or responsibilities..."
          className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 focus:outline-none"
        />
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((item, idx) => (
          <div
            key={item.id}
            className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 bg-slate-900/60 hover:bg-slate-900/90 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              item.published !== false ? 'border-white/10' : 'border-white/5 opacity-70'
            }`}
          >
            <div className="flex items-start gap-4 flex-1 min-w-0">
              {/* Reorder Arrows */}
              <div className="flex flex-col gap-1 shrink-0 pt-0.5">
                <button
                  onClick={() => handleMove(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                >
                  <ArrowUp size={12} />
                </button>
                <button
                  onClick={() => handleMove(idx, 'down')}
                  disabled={idx === experiences.length - 1}
                  className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                >
                  <ArrowDown size={12} />
                </button>
              </div>

              {/* Logo icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center font-bold text-white text-sm shrink-0">
                {item.logo_text || item.company.substring(0, 2).toUpperCase()}
              </div>

              {/* Details */}
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-white truncate">{item.role}</h3>
                  <span className="text-xs text-slate-400 font-semibold">@ {item.company}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-white/5 text-slate-300">
                    {item.duration}
                  </span>
                  {item.is_current && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      CURRENT
                    </span>
                  )}
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    item.published !== false ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {item.published !== false ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2">{item.summary}</p>

                {/* Skills */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {(item.skills || []).map((s, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-slate-400">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 self-end md:self-center pt-2 md:pt-0 border-t md:border-t-0 border-white/5 w-full md:w-auto justify-end">
              <button
                onClick={() => handleTogglePublish(item)}
                className={`p-2 rounded-xl border transition cursor-pointer ${
                  item.published !== false
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                }`}
                title={item.published !== false ? 'Unpublish' : 'Publish'}
              >
                {item.published !== false ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>

              <button
                onClick={() => handleEdit(item)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                <Edit3 size={13} />
                <span>Edit</span>
              </button>

              <button
                onClick={() => setDeleteTarget(item)}
                className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl my-8 bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <Briefcase size={20} className="text-emerald-400" />
              <span>{editingItem.company ? `Edit "${editingItem.role} @ ${editingItem.company}"` : 'Add Experience'}</span>
            </h2>
            <p className="text-xs text-slate-400 mb-6">Manage role title, duration, responsibilities, and impact outcomes.</p>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.company || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                    placeholder="Innfill"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Role Title *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.role || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                    placeholder="Head of Community"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Duration *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.duration || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                    placeholder="July 2026 – Present"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Location</label>
                  <input
                    type="text"
                    value={editingItem.location || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    placeholder="Hyderabad, India (Hybrid)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Short Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={editingItem.summary || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, summary: e.target.value })}
                  placeholder="Overview of the role and scope..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Responsibilities (one per line)</label>
                <textarea
                  rows={3}
                  value={Array.isArray(editingItem.responsibilities) ? editingItem.responsibilities.join('\n') : ''}
                  onChange={(e) => {
                    const arr = e.target.value.split('\n').filter(Boolean);
                    setEditingItem({ ...editingItem, responsibilities: arr });
                  }}
                  placeholder="Leading community growth...&#10;Designing and executing workshops..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Key Outcomes / Impact</label>
                <textarea
                  rows={2}
                  value={editingItem.outcomes || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, outcomes: e.target.value })}
                  placeholder="Established standard community governance guidelines..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Skills (comma separated)</label>
                <input
                  type="text"
                  value={Array.isArray(editingItem.skills) ? editingItem.skills.join(', ') : ''}
                  onChange={(e) => {
                    const arr = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    setEditingItem({ ...editingItem, skills: arr });
                  }}
                  placeholder="Community Growth, Leadership, Campus Partnerships"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.is_current || false}
                    onChange={(e) => setEditingItem({ ...editingItem, is_current: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-500 bg-slate-900 border-white/20"
                  />
                  <span className="text-white font-medium">Current Role</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.published !== false}
                    onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-500 bg-slate-900 border-white/20"
                  />
                  <span className="text-white font-medium">Published on Public Website</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl transition shadow-lg shadow-emerald-600/20 cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Experience'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AdminDeleteModal
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.company}
        title="Delete Experience"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
