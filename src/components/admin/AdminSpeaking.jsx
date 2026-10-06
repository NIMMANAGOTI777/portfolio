import React, { useState } from 'react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import AdminDeleteModal from './AdminDeleteModal';
import { 
  Mic, Plus, Edit3, Trash2, ArrowUp, ArrowDown, 
  Eye, EyeOff, Star, X, CheckCircle2, Search, ExternalLink
} from 'lucide-react';

export default function AdminSpeaking() {
  const { speakingEvents, saveSpeakingEvent, deleteSpeakingEvent, reorderSpeakingEvents } = usePortfolioData();

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
      id: `spk-${Date.now()}`,
      title: '',
      topic: '',
      organization: '',
      tag: 'Flagship Summit',
      category: 'Creator Summit',
      date: '2026',
      attendees: '300+ Attendees',
      description: '',
      roles: [],
      image: '',
      event_url: '',
      links: {},
      featured: true,
      published: true,
      display_order: speakingEvents.length + 1
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
      await saveSpeakingEvent(updated);
      showToast(`Event "${item.title}" ${updated.published ? 'published' : 'unpublished'}.`);
    } catch (e) {
      alert('Error: ' + e.message);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteSpeakingEvent(deleteTarget.id);
      showToast(`Deleted speaking event "${deleteTarget.title}".`);
      setDeleteTarget(null);
    } catch (e) {
      alert('Error deleting event: ' + e.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveSpeakingEvent(editingItem);
      setIsModalOpen(false);
      showToast(`Saved event "${editingItem.title}".`);
    } catch (err) {
      alert('Error saving event: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const filtered = speakingEvents.filter(s =>
    s.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.topic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-pink-600 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-slide-up">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display flex items-center gap-2">
            <Mic className="text-pink-400" size={24} />
            <span>Speaking & Collaborations</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage stage talks, creator summits, guest sessions, and event hospitality operations.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-semibold rounded-xl transition shadow-lg shadow-pink-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add Speaking Event</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 bg-slate-900/60 border border-white/10 p-3 rounded-2xl">
        <Search size={16} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter events by title or topic..."
          className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 focus:outline-none"
        />
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl border border-white/10 bg-slate-900/60 hover:bg-slate-900/90 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-slate-800 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                    {item.image || item.img ? (
                      <img src={item.image || item.img} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <Mic className="text-pink-400" size={24} />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-pink-400 font-medium">{item.tag || item.category || 'Guest Session'}</p>
                    <p className="text-[11px] text-slate-400">{item.date} • {item.attendees || 'Attendees'}</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">{item.description || item.desc}</p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-2">
              <button
                onClick={() => handleTogglePublish(item)}
                className={`p-1.5 rounded-lg border transition cursor-pointer ${
                  item.published !== false
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                }`}
              >
                {item.published !== false ? <Eye size={13} /> : <EyeOff size={13} />}
              </button>

              <button
                onClick={() => handleEdit(item)}
                className="px-2.5 py-1 bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/30 text-xs font-semibold rounded-lg transition cursor-pointer"
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
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-xl my-8 bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <Mic size={20} className="text-pink-400" />
              <span>{editingItem.title ? `Edit "${editingItem.title}"` : 'Add Speaking Event'}</span>
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Event Name / Speaker *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    placeholder="Ishan Sharma / NIAT Takeover"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Tag / Category</label>
                  <input
                    type="text"
                    value={editingItem.tag || editingItem.category || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, tag: e.target.value, category: e.target.value })}
                    placeholder="Guest Session / Flagship Summit"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Date / Duration</label>
                  <input
                    type="text"
                    value={editingItem.date || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                    placeholder="July 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Attendees / Scale</label>
                  <input
                    type="text"
                    value={editingItem.attendees || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, attendees: e.target.value })}
                    placeholder="1000+ Participants"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Event Image URL (Cloudinary)</label>
                <input
                  type="text"
                  value={editingItem.image || editingItem.img || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value, img: e.target.value })}
                  placeholder="https://res.cloudinary.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.description || editingItem.desc || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value, desc: e.target.value })}
                  placeholder="Led guest hospitality, keynote moderation, and media handling..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.published !== false}
                    onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                    className="w-4 h-4 rounded text-pink-500 bg-slate-900 border-white/20"
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
                  className="px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-xl transition shadow-lg shadow-pink-600/20 cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Speaking Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AdminDeleteModal
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.title}
        title="Delete Speaking Event"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
