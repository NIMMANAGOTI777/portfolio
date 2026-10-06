import React, { useState } from 'react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import AdminDeleteModal from './AdminDeleteModal';
import { 
  Quote, Plus, Edit3, Trash2, ArrowUp, ArrowDown, 
  Eye, EyeOff, Star, X, CheckCircle2, Search, ExternalLink
} from 'lucide-react';

export default function AdminTestimonials() {
  const { testimonials, saveTestimonial, deleteTestimonial } = usePortfolioData();

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
      id: `test-${Date.now()}`,
      name: '',
      role: '',
      organization: '',
      testimonial: '',
      image: '',
      linkedin_url: '',
      featured: true,
      published: true,
      display_order: testimonials.length + 1
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
      await saveTestimonial(updated);
      showToast(`Testimonial from "${item.name}" ${updated.published ? 'published' : 'unpublished'}.`);
    } catch (e) {
      alert('Error: ' + e.message);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteTestimonial(deleteTarget.id);
      showToast(`Deleted testimonial by "${deleteTarget.name}".`);
      setDeleteTarget(null);
    } catch (e) {
      alert('Error: ' + e.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveTestimonial(editingItem);
      setIsModalOpen(false);
      showToast(`Saved testimonial from "${editingItem.name}".`);
    } catch (err) {
      alert('Error saving testimonial: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const filtered = testimonials.filter(t =>
    t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.testimonial?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-sky-600 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-slide-up">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display flex items-center gap-2">
            <Quote className="text-sky-400" size={24} />
            <span>Testimonial Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage mentor endorsements and client recommendations.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl transition shadow-lg shadow-sky-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 bg-slate-900/60 border border-white/10 p-3 rounded-2xl">
        <Search size={16} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter testimonials by name or organization..."
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
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-slate-800 border border-white/10 overflow-hidden shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-sky-400">
                      {item.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{item.name}</h3>
                  <p className="text-xs text-slate-400">{item.role} {item.organization ? `• ${item.organization}` : ''}</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 italic leading-relaxed line-clamp-4">
                "{item.testimonial}"
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              {item.linkedin_url ? (
                <a
                  href={item.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-sky-400 hover:underline flex items-center gap-1"
                >
                  <span>LinkedIn Profile</span>
                  <ExternalLink size={10} />
                </a>
              ) : <div />}

              <div className="flex items-center gap-2">
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
                  className="px-2.5 py-1 bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/30 text-xs font-semibold rounded-lg transition cursor-pointer"
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
              <Quote size={20} className="text-sky-400" />
              <span>{editingItem.name ? `Edit Testimonial by "${editingItem.name}"` : 'Add Testimonial'}</span>
            </h2>
            <p className="text-xs text-slate-400 mb-6">Add mentor recommendation or peer feedback.</p>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Person Name *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.name || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    placeholder="Sudheer Chikile"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Role / Position *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.role || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                    placeholder="Mentor at NIAT"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Organization</label>
                  <input
                    type="text"
                    value={editingItem.organization || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, organization: e.target.value })}
                    placeholder="NIAT / NxtWave"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={editingItem.linkedin_url || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, linkedin_url: e.target.value })}
                    placeholder="https://www.linkedin.com/in/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Profile Photo URL (Cloudinary)</label>
                <input
                  type="text"
                  value={editingItem.image || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                  placeholder="https://res.cloudinary.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Testimonial Quote *</label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.testimonial || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, testimonial: e.target.value })}
                  placeholder="I had the opportunity to mentor Karthik closely..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.published !== false}
                    onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                    className="w-4 h-4 rounded text-sky-500 bg-slate-900 border-white/20"
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
                  className="px-6 py-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold rounded-xl transition shadow-lg shadow-sky-600/20 cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AdminDeleteModal
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.name}
        title="Delete Testimonial"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
