import React, { useState } from 'react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import AdminDeleteModal from './AdminDeleteModal';
import { 
  ShieldCheck, Plus, Edit3, Trash2, ArrowUp, ArrowDown, 
  Eye, EyeOff, Star, X, CheckCircle2, Search, ExternalLink
} from 'lucide-react';

export default function AdminCertifications() {
  const { certifications, saveCertification, deleteCertification, reorderCertifications } = usePortfolioData();

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
      id: `cert-${Date.now()}`,
      title: '',
      issuer: 'HubSpot Academy',
      issue_date: '2026',
      valid_until: '2028',
      credential_id: '',
      credential_url: '',
      certificate_image: '',
      description: '',
      skills: [],
      verified: true,
      featured: false,
      published: true,
      display_order: certifications.length + 1
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
      await saveCertification(updated);
      showToast(`Certification "${item.title}" ${updated.published ? 'published' : 'unpublished'}.`);
    } catch (e) {
      alert('Error: ' + e.message);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteCertification(deleteTarget.id);
      showToast(`Deleted certification "${deleteTarget.title}".`);
      setDeleteTarget(null);
    } catch (e) {
      alert('Error deleting certification: ' + e.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveCertification(editingItem);
      setIsModalOpen(false);
      showToast(`Saved certification "${editingItem.title}".`);
    } catch (err) {
      alert('Error saving certification: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const filtered = certifications.filter(c =>
    c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.issuer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-teal-600 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-slide-up">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display flex items-center gap-2">
            <ShieldCheck className="text-teal-400" size={24} />
            <span>Certifications & Credentials</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage industry certifications, verifying IDs, skills tested, and certificate images.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-semibold rounded-xl transition shadow-lg shadow-teal-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add Certification</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 bg-slate-900/60 border border-white/10 p-3 rounded-2xl">
        <Search size={16} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter certifications by title or issuer..."
          className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 focus:outline-none"
        />
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl border border-white/10 bg-slate-900/60 hover:bg-slate-900/90 flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                    {item.certificate_image || item.img ? (
                      <img src={item.certificate_image || item.img} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <ShieldCheck className="text-teal-400" size={24} />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-teal-400 font-medium">{item.issuer}</p>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-slate-400">{item.issue_date || item.date}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{item.description || item.desc}</p>

              {item.credential_id || item.code ? (
                <div className="pt-2 text-[10px] font-mono text-slate-400 truncate">
                  ID: <span className="text-slate-300">{item.credential_id || item.code}</span>
                </div>
              ) : null}
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              {item.credential_url || item.link ? (
                <a
                  href={item.credential_url || item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-teal-400 hover:underline flex items-center gap-1"
                >
                  <span>Verify Credential</span>
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
                  className="px-2.5 py-1 bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 border border-teal-500/30 text-xs font-semibold rounded-lg transition cursor-pointer"
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
              <ShieldCheck size={20} className="text-teal-400" />
              <span>{editingItem.title ? `Edit "${editingItem.title}"` : 'Add Certification'}</span>
            </h2>
            <p className="text-xs text-slate-400 mb-6">Configure certificate name, issuing authority, and verify links.</p>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Certificate Name *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    placeholder="Social Media Certified"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Issuing Organization *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.issuer || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, issuer: e.target.value })}
                    placeholder="HubSpot Academy"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Issue Date</label>
                  <input
                    type="text"
                    value={editingItem.issue_date || editingItem.date || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, issue_date: e.target.value, date: e.target.value })}
                    placeholder="2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Credential ID / Code</label>
                  <input
                    type="text"
                    value={editingItem.credential_id || editingItem.code || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, credential_id: e.target.value, code: e.target.value })}
                    placeholder="d600498e876f..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Credential Verification URL</label>
                <input
                  type="text"
                  value={editingItem.credential_url || editingItem.link || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, credential_url: e.target.value, link: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Certificate Image URL (Cloudinary)</label>
                <input
                  type="text"
                  value={editingItem.certificate_image || editingItem.img || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, certificate_image: e.target.value, img: e.target.value })}
                  placeholder="https://res.cloudinary.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Description</label>
                <textarea
                  rows={2}
                  value={editingItem.description || editingItem.desc || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value, desc: e.target.value })}
                  placeholder="Skills covered in this certification..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.published !== false}
                    onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                    className="w-4 h-4 rounded text-teal-500 bg-slate-900 border-white/20"
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
                  className="px-6 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold rounded-xl transition shadow-lg shadow-teal-600/20 cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Certification'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AdminDeleteModal
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.title}
        title="Delete Certification"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
