import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import AdminDeleteModal from './AdminDeleteModal';
import { 
  Sparkles, Plus, Edit3, Trash2, ArrowUp, ArrowDown, 
  Eye, EyeOff, Star, X, CheckCircle2, Search,
  Globe, Palette, Layers, TrendingUp, PenTool, Award, Calendar, Video
} from 'lucide-react';

export default function AdminServices() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { services, saveService, deleteService, reorderServices } = usePortfolioData();

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
      id: `service-${Date.now()}`,
      category_id: 'digital',
      title: '',
      description: '',
      icon: 'globe',
      services: [],
      tech_stack: [],
      starting_price: 'Custom Quote',
      delivery_time: '3–7 days',
      skills: [],
      color_class: 'hover:border-indigo-500/50',
      icon_bg_class: 'bg-indigo-100 text-indigo-600',
      featured: true,
      published: true,
      display_order: services.length + 1
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
      await saveService(updated);
      showToast(`Service "${item.title}" ${updated.published ? 'published' : 'unpublished'}.`);
    } catch (e) {
      alert('Error updating status: ' + e.message);
    }
  };

  const handleMove = async (index, direction) => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= services.length) return;

    const newOrder = [...services];
    const temp = newOrder[index];
    newOrder[index] = newOrder[newIdx];
    newOrder[newIdx] = temp;

    await reorderServices(newOrder);
    showToast('Services reordered.');
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteService(deleteTarget.id);
      showToast(`Deleted service "${deleteTarget.title}".`);
      setDeleteTarget(null);
    } catch (e) {
      alert('Error deleting service: ' + e.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editingItem.title?.toLowerCase().includes('ai automation')) {
      alert('Error: "AI Automation" cannot be added as a freelance service.');
      return;
    }
    setSaving(true);
    try {
      await saveService(editingItem);
      setIsModalOpen(false);
      showToast(`Service "${editingItem.title}" saved successfully.`);
    } catch (err) {
      alert('Error saving service: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const filtered = services.filter(s =>
    s.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-slide-up">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display flex items-center gap-2">
            <Sparkles className="text-purple-400" size={24} />
            <span>Freelance Services</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your service catalog (Web Development, UI/UX, Video Editing, Event Design, etc.).
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl transition shadow-lg shadow-purple-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 bg-slate-900/60 border border-white/10 p-3 rounded-2xl">
        <Search size={16} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter freelance services..."
          className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 focus:outline-none"
        />
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, idx) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border transition-all duration-200 bg-slate-900/60 hover:bg-slate-900/90 flex flex-col justify-between space-y-4 ${
              item.published !== false ? 'border-white/10' : 'border-white/5 opacity-70'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    <p className="text-[11px] text-slate-400 capitalize">{item.category_id || 'Digital'} Category</p>
                  </div>
                </div>

                {/* Priority Arrows */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleMove(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                  >
                    <ArrowUp size={12} />
                  </button>
                  <button
                    onClick={() => handleMove(idx, 'down')}
                    disabled={idx === services.length - 1}
                    className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                  >
                    <ArrowDown size={12} />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-3">{item.description}</p>

              {/* Sub-services pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {(item.services || []).slice(0, 4).map((s, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5">
                    {s}
                  </span>
                ))}
                {(item.services || []).length > 4 && (
                  <span className="text-[10px] text-slate-500">+{(item.services || []).length - 4} more</span>
                )}
              </div>
            </div>

            {/* Bottom info + actions */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <div className="text-[11px] text-slate-400">
                <span>{item.starting_price || 'Custom'}</span> • <span>{item.delivery_time || '3-7 days'}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTogglePublish(item)}
                  className={`p-1.5 rounded-lg border transition cursor-pointer ${
                    item.published !== false
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                  }`}
                  title={item.published !== false ? 'Unpublish' : 'Publish'}
                >
                  {item.published !== false ? <Eye size={13} /> : <EyeOff size={13} />}
                </button>

                <button
                  onClick={() => handleEdit(item)}
                  className="px-2.5 py-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-semibold rounded-lg transition cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => setDeleteTarget(item)}
                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition cursor-pointer"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
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
              <Sparkles size={20} className="text-purple-400" />
              <span>{editingItem.title ? `Edit "${editingItem.title}"` : 'Add Freelance Service'}</span>
            </h2>
            <p className="text-xs text-slate-400 mb-6">Manage service offerings, deliverables, and estimated timelines.</p>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    placeholder="UI/UX & Figma Design"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Category Group</label>
                  <select
                    value={editingItem.category_id || 'digital'}
                    onChange={(e) => setEditingItem({ ...editingItem, category_id: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="digital">DIGITAL (Web & Products)</option>
                    <option value="growth-content">GROWTH & CONTENT (Brand & Strategy)</option>
                    <option value="experiences">EXPERIENCES (Events & Media)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Designs focused on clarity, usability, visual aesthetics, and conversion."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Deliverables / Included Services (one per line)</label>
                <textarea
                  rows={4}
                  value={Array.isArray(editingItem.services) ? editingItem.services.join('\n') : ''}
                  onChange={(e) => {
                    const arr = e.target.value.split('\n').filter(Boolean);
                    setEditingItem({ ...editingItem, services: arr });
                  }}
                  placeholder="Website UI Design&#10;Mobile App UI&#10;Interactive Prototypes&#10;Design Systems"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Starting Price (Optional)</label>
                  <input
                    type="text"
                    value={editingItem.starting_price || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, starting_price: e.target.value })}
                    placeholder="Custom Quote / $250"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Delivery Time (Optional)</label>
                  <input
                    type="text"
                    value={editingItem.delivery_time || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, delivery_time: e.target.value })}
                    placeholder="3–7 business days"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.published !== false}
                    onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                    className="w-4 h-4 rounded text-purple-600 bg-slate-900 border-white/20"
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
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl transition shadow-lg shadow-purple-600/20 cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AdminDeleteModal
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.title}
        title="Delete Service"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
