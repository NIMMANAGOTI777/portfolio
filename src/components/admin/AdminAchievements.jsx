import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import AdminDeleteModal from './AdminDeleteModal';
import { 
  Award, Plus, Edit3, Trash2, ArrowUp, ArrowDown, 
  Eye, EyeOff, Star, Image, X, Check, CheckCircle2,
  Tag, Search, Sparkles
} from 'lucide-react';

export default function AdminAchievements() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { achievements, saveAchievement, deleteAchievement, reorderAchievements } = usePortfolioData();

  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      handleOpenNew();
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleOpenNew = () => {
    setEditingItem({
      id: `ach-${Date.now()}`,
      title: '',
      result: '',
      issuer: 'NxtWave (NIAT)',
      category: 'Awards & Recognition',
      description: '',
      quote: '',
      creator: '',
      date: '2026',
      tags: [],
      images: [],
      video: '',
      certificate: '',
      linkedin_url: '',
      featured: true,
      published: true,
      display_order: achievements.length + 1
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
      await saveAchievement(updated);
      showToast(`Achievement "${item.title}" ${updated.published ? 'published' : 'unpublished'}.`);
    } catch (e) {
      alert('Error updating status: ' + e.message);
    }
  };

  const handleMove = async (index, direction) => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= achievements.length) return;

    const newOrder = [...achievements];
    const temp = newOrder[index];
    newOrder[index] = newOrder[newIdx];
    newOrder[newIdx] = temp;

    await reorderAchievements(newOrder);
    showToast('Achievements reordered. Public carousel will follow this exact priority order.');
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteAchievement(deleteTarget.id);
      showToast(`Deleted achievement "${deleteTarget.title}".`);
      setDeleteTarget(null);
    } catch (e) {
      alert('Error deleting achievement: ' + e.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveAchievement(editingItem);
      setIsModalOpen(false);
      showToast(`Achievement "${editingItem.title}" saved successfully.`);
    } catch (err) {
      alert('Error saving achievement: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const filtered = achievements.filter(a =>
    a.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.issuer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-amber-600 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-slide-up">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display flex items-center gap-2">
            <Award className="text-amber-400" size={24} />
            <span>Achievement Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage awards, policy wins, and contest recognitions. Reorder here to control the public carousel.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-slate-950 text-xs font-bold rounded-xl transition shadow-lg shadow-amber-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add New Achievement</span>
        </button>
      </div>

      {/* Priority Helper Banner */}
      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs text-amber-300">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-amber-400 shrink-0" />
          <span>The order below directly determines the sequence in the public Instagram-style College Achievements carousel.</span>
        </div>
      </div>

      {/* Filter search */}
      <div className="flex items-center gap-3 bg-slate-900/60 border border-white/10 p-3 rounded-2xl">
        <Search size={16} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter achievements by title, issuer, or tags..."
          className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 focus:outline-none"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} className="text-xs text-slate-400 hover:text-white">
            Clear
          </button>
        )}
      </div>

      {/* Achievements List */}
      <div className="space-y-3">
        {filtered.map((item, idx) => {
          const coverImg = item.images && item.images.length > 0 ? item.images[0]?.path : item.image;

          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 bg-slate-900/60 hover:bg-slate-900/90 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                item.published !== false ? 'border-white/10' : 'border-white/5 opacity-70'
              }`}
            >
              {/* Left: Reorder + Image + Text */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                {/* Priority order badge + reorder arrows */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <span className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-bold flex items-center justify-center">
                    #{idx + 1}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <button
                      onClick={() => handleMove(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp size={11} />
                    </button>
                    <button
                      onClick={() => handleMove(idx, 'down')}
                      disabled={idx === achievements.length - 1}
                      className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown size={11} />
                    </button>
                  </div>
                </div>

                {/* Cover Image */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-800 border border-white/10 overflow-hidden shrink-0 relative flex items-center justify-center">
                  {coverImg ? (
                    <img src={coverImg} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <Award className="text-amber-400/50" size={24} />
                  )}
                  {item.result && (
                    <div className="absolute bottom-0 inset-x-0 bg-amber-500 text-slate-950 text-[9px] font-bold text-center py-0.5 uppercase tracking-wider">
                      {item.result}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-white truncate">{item.title}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {item.issuer}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      item.published !== false ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {item.published !== false ? 'PUBLISHED' : 'DRAFT'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2">{item.description}</p>

                  {/* Tags */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {(item.tags || []).map((t, i) => (
                      <span key={i} className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-slate-400">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center pt-2 md:pt-0 border-t md:border-t-0 border-white/5 w-full md:w-auto justify-end">
                {/* Publish Toggle */}
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

                {/* Edit Button */}
                <button
                  onClick={() => handleEdit(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 text-xs font-semibold rounded-xl transition cursor-pointer"
                >
                  <Edit3 size={13} />
                  <span>Edit</span>
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => setDeleteTarget(item)}
                  className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition cursor-pointer"
                  title="Delete Achievement"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-slate-900/30 border border-dashed border-white/10 rounded-2xl">
            <Award className="mx-auto text-slate-500 mb-2" size={32} />
            <p className="text-sm font-semibold text-white">No achievements found</p>
          </div>
        )}
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
              <Award size={20} className="text-amber-400" />
              <span>{editingItem.title ? `Edit "${editingItem.title}"` : 'Create Achievement'}</span>
            </h2>
            <p className="text-xs text-slate-400 mb-6">Manage award details, quotes, tags, and media URLs.</p>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              {/* Title & Result */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Achievement Title *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    placeholder="ANNADATA POLICY 2047"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Result / Placement</label>
                  <input
                    type="text"
                    value={editingItem.result || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, result: e.target.value })}
                    placeholder="1st Prize / Runner-Up"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Issuer & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Issuer / Organization *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.issuer || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, issuer: e.target.value })}
                    placeholder="NxtWave (NIAT) / Youth Forum"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Year / Date</label>
                  <input
                    type="text"
                    value={editingItem.date || '2026'}
                    onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                    placeholder="2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Description *</label>
                <textarea
                  rows={2}
                  required
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Detail about the recognition..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Quote */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Personal Reflection / Quote</label>
                <textarea
                  rows={2}
                  value={editingItem.quote || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                  placeholder="A quote or takeaway..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Tags (comma separated)</label>
                <input
                  type="text"
                  value={Array.isArray(editingItem.tags) ? editingItem.tags.join(', ') : ''}
                  onChange={(e) => {
                    const arr = e.target.value.split(',').map(s => s.trim().replace(/^#/, '')).filter(Boolean);
                    setEditingItem({ ...editingItem, tags: arr });
                  }}
                  placeholder="Leadership, Governance, Agriculture"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Primary Image URL */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Image URL (Cloudinary)</label>
                <input
                  type="text"
                  value={(editingItem.images && editingItem.images[0]?.path) || editingItem.image || ''}
                  onChange={(e) => {
                    const url = e.target.value;
                    const imgs = [{ label: 'Photo 1', path: url }];
                    setEditingItem({ ...editingItem, image: url, images: imgs });
                  }}
                  placeholder="https://res.cloudinary.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Published Toggle */}
              <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.published !== false}
                    onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500 bg-slate-900 border-white/20 focus:ring-0"
                  />
                  <span className="text-white font-medium">Published on Public Website</span>
                </label>
              </div>

              {/* Action Buttons */}
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
                  className="px-6 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-bold rounded-xl transition shadow-lg shadow-amber-600/20 cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Achievement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AdminDeleteModal
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.title}
        title="Delete Achievement"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
