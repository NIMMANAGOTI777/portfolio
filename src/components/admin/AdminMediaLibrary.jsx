import React, { useState } from 'react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import AdminDeleteModal from './AdminDeleteModal';
import { 
  Image as ImageIcon, Upload, Trash2, Copy, Check, 
  ExternalLink, Search, Filter, Video, FileText, Sparkles, X, Plus
} from 'lucide-react';

export default function AdminMediaLibrary() {
  const { mediaItems, saveMediaItem, deleteMediaItem } = usePortfolioData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [copiedId, setCopiedId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [previewMedia, setPreviewMedia] = useState(null);

  const [newMedia, setNewMedia] = useState({
    title: '',
    url: '',
    type: 'image',
    folder: 'general',
    size: '1.0 MB'
  });

  const handleCopy = (id, url) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!newMedia.url || !newMedia.title) return;
    try {
      await saveMediaItem({
        id: `media-${Date.now()}`,
        title: newMedia.title,
        url: newMedia.url,
        type: newMedia.type,
        folder: newMedia.folder,
        size: newMedia.size,
        created_at: new Date().toISOString()
      });
      setUploadModalOpen(false);
      setNewMedia({ title: '', url: '', type: 'image', folder: 'general', size: '1.0 MB' });
    } catch (err) {
      alert('Error uploading media: ' + err.message);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMediaItem(deleteTarget.id);
      setDeleteTarget(null);
    } catch (err) {
      alert('Error deleting media: ' + err.message);
    }
  };

  const filtered = mediaItems.filter(m => {
    const matchSearch = m.title?.toLowerCase().includes(searchTerm.toLowerCase()) || m.folder?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = selectedType === 'ALL' || m.type?.toLowerCase() === selectedType.toLowerCase();
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display flex items-center gap-2">
            <ImageIcon className="text-blue-400" size={24} />
            <span>Media Library</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Central repository for Cloudinary images, event photography, certificates, and video links.
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl transition shadow-lg shadow-blue-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Upload size={16} />
          <span>Add Media URL</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-900/60 border border-white/10 p-3 rounded-2xl">
        <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
          <Search size={16} className="text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search media by title or folder..."
            className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 focus:outline-none"
          />
        </div>

        {/* Type Filter Pills */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'image', 'video', 'certificate', 'other'].map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded-lg text-xs font-medium uppercase tracking-wider transition cursor-pointer shrink-0 ${
                selectedType === type
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((item) => {
          const isVideo = item.type === 'video' || item.url?.endsWith('.mp4');
          const isCert = item.type === 'certificate';

          return (
            <div
              key={item.id}
              className="group relative rounded-2xl bg-slate-900/80 border border-white/10 overflow-hidden hover:border-blue-500/40 transition-all flex flex-col justify-between"
            >
              {/* Media Thumbnail */}
              <div 
                onClick={() => setPreviewMedia(item)}
                className="aspect-square bg-slate-950 overflow-hidden relative cursor-pointer flex items-center justify-center"
              >
                {isVideo ? (
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <Video size={32} className="text-pink-400" />
                    <span className="text-[10px]">Video File</span>
                  </div>
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                )}

                {/* Hover overlay actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(item.id, item.url);
                    }}
                    className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition"
                    title="Copy Image URL"
                  >
                    {copiedId === item.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteTarget(item);
                    }}
                    className="p-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white backdrop-blur-sm transition"
                    title="Delete Media"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Title & metadata */}
              <div className="p-2.5">
                <h4 className="text-xs font-semibold text-white truncate">{item.title}</h4>
                <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                  <span className="uppercase font-mono">{item.folder || 'general'}</span>
                  <span>{item.size || 'Web'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-slate-900/30 border border-dashed border-white/10 rounded-2xl">
          <ImageIcon className="mx-auto text-slate-500 mb-2" size={36} />
          <p className="text-sm font-semibold text-white">No media items found</p>
          <p className="text-xs text-slate-400 mt-1">Upload an image URL or change search filter.</p>
        </div>
      )}

      {/* Upload URL Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl animate-scale-in">
            <button
              onClick={() => setUploadModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl bg-white/5"
            >
              <X size={16} />
            </button>

            <h2 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <Upload size={18} className="text-blue-400" />
              <span>Add Media Reference</span>
            </h2>
            <p className="text-xs text-slate-400 mb-5">Attach Cloudinary, video, or portfolio asset URLs.</p>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Asset Title *</label>
                <input
                  type="text"
                  required
                  value={newMedia.title}
                  onChange={(e) => setNewMedia({ ...newMedia, title: e.target.value })}
                  placeholder="PanIIT Summit Stage Photo"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Media URL *</label>
                <input
                  type="url"
                  required
                  value={newMedia.url}
                  onChange={(e) => setNewMedia({ ...newMedia, url: e.target.value })}
                  placeholder="https://res.cloudinary.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Media Type</label>
                  <select
                    value={newMedia.type}
                    onChange={(e) => setNewMedia({ ...newMedia, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="certificate">Certificate</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Category Folder</label>
                  <select
                    value={newMedia.folder}
                    onChange={(e) => setNewMedia({ ...newMedia, folder: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="projects">Projects</option>
                    <option value="achievements">Achievements</option>
                    <option value="events">Events</option>
                    <option value="certificates">Certificates</option>
                    <option value="photography">Photography</option>
                    <option value="general">General</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20"
                >
                  Add Media
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Preview */}
      {previewMedia && (
        <div 
          onClick={() => setPreviewMedia(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
        >
          <div className="relative max-w-4xl max-h-[85vh] p-2 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            <button
              onClick={() => setPreviewMedia(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-white hover:bg-slate-800"
            >
              <X size={16} />
            </button>
            <img src={previewMedia.url} alt={previewMedia.title} className="max-w-full max-h-[75vh] object-contain rounded-xl" />
            <div className="p-3 flex items-center justify-between text-xs text-slate-300">
              <span className="font-bold text-white">{previewMedia.title}</span>
              <span className="font-mono text-slate-400">{previewMedia.url}</span>
            </div>
          </div>
        </div>
      )}

      <AdminDeleteModal
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.title}
        title="Delete Media Item"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
