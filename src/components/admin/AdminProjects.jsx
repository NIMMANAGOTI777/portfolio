import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import AdminDeleteModal from './AdminDeleteModal';
import { 
  FolderGit2, Plus, Edit3, Trash2, ArrowUp, ArrowDown, 
  Eye, EyeOff, Star, ExternalLink, Image, Sparkles, X, Check,
  Layers, Calendar, MapPin, Tag, Search, CheckCircle2, Shield
} from 'lucide-react';

export default function AdminProjects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { projects, saveProject, deleteProject, reorderProjects } = usePortfolioData();

  const [searchTerm, setSearchTerm] = useState('');
  const [editingProject, setEditingProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Handle URL query parameter ?action=new
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
    setEditingProject({
      id: `proj-${Date.now()}`,
      title: '',
      subtitle: '',
      short_description: '',
      full_description: '',
      category: 'Web & Digital',
      role: '',
      client: '',
      date: '2026',
      location: 'Hyderabad, India',
      technologies: [],
      project_url: '',
      github_url: '',
      cover_image: '',
      gallery: [],
      case_study: null,
      eyebrow: '',
      badge_secondary: '',
      result: '',
      action_label: 'VIEW PROJECT →',
      featured: false,
      published: true,
      display_order: projects.length + 1,
      seo_title: '',
      seo_description: ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (project) => {
    setEditingProject({ ...project });
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (project) => {
    try {
      const updated = { ...project, published: !project.published };
      await saveProject(updated);
      showToast(`Project "${project.title}" ${updated.published ? 'published' : 'unpublished'}.`);
    } catch (e) {
      alert('Error updating status: ' + e.message);
    }
  };

  const handleToggleFeatured = async (project) => {
    try {
      const updated = { ...project, featured: !project.featured };
      await saveProject(updated);
      showToast(`Project "${project.title}" ${updated.featured ? 'marked as featured' : 'unfeatured'}.`);
    } catch (e) {
      alert('Error updating featured status: ' + e.message);
    }
  };

  const handleMove = async (index, direction) => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= projects.length) return;

    const newOrder = [...projects];
    const temp = newOrder[index];
    newOrder[index] = newOrder[newIdx];
    newOrder[newIdx] = temp;

    await reorderProjects(newOrder);
    showToast('Projects reordered successfully.');
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteProject(deleteTarget.id);
      showToast(`Deleted project "${deleteTarget.title}".`);
      setDeleteTarget(null);
    } catch (e) {
      alert('Error deleting project: ' + e.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveProject(editingProject);
      setIsModalOpen(false);
      showToast(`Project "${editingProject.title}" saved successfully.`);
    } catch (err) {
      alert('Error saving project: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.short_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-slide-up">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display flex items-center gap-2">
            <FolderGit2 className="text-indigo-400" size={24} />
            <span>Project Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage portfolio projects, case studies, galleries, and live links.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold rounded-xl transition shadow-lg shadow-indigo-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex items-center gap-3 bg-slate-900/60 border border-white/10 p-3 rounded-2xl">
        <Search size={16} className="text-slate-400 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter projects by title, category, or technology..."
          className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 focus:outline-none"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} className="text-xs text-slate-400 hover:text-white">
            Clear
          </button>
        )}
      </div>

      {/* Projects List Table / Cards */}
      <div className="space-y-3">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 bg-slate-900/60 hover:bg-slate-900/90 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              project.featured ? 'border-amber-500/30 ring-1 ring-amber-500/20' : 'border-white/10'
            } ${!project.published ? 'opacity-70' : ''}`}
          >
            {/* Left: Thumbnail + Info */}
            <div className="flex items-start gap-4 flex-1 min-w-0">
              {/* Order buttons */}
              <div className="flex flex-col gap-1 shrink-0 pt-0.5">
                <button
                  onClick={() => handleMove(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp size={12} />
                </button>
                <button
                  onClick={() => handleMove(idx, 'down')}
                  disabled={idx === projects.length - 1}
                  className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown size={12} />
                </button>
              </div>

              {/* Cover Image */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-800 border border-white/10 overflow-hidden shrink-0 relative flex items-center justify-center">
                {project.cover_image || project.image ? (
                  <img
                    src={project.cover_image || project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FolderGit2 className="text-slate-600" size={24} />
                )}
                {project.featured && (
                  <div className="absolute top-1 right-1 p-0.5 rounded bg-amber-500 text-slate-950 shadow">
                    <Star size={10} className="fill-current" />
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-white truncate">{project.title}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {project.category || 'Web & Digital'}
                  </span>
                  {project.featured && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      FEATURED
                    </span>
                  )}
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    project.published !== false ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {project.published !== false ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-1">{project.subtitle || project.short_description}</p>

                {/* Tech Tags */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {(project.technologies || project.tech || []).slice(0, 4).map((t, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-slate-400">
                      {t}
                    </span>
                  ))}
                  {(project.technologies || project.tech || []).length > 4 && (
                    <span className="text-[10px] text-slate-500">
                      +{(project.technologies || project.tech || []).length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 shrink-0 self-end md:self-center pt-2 md:pt-0 border-t md:border-t-0 border-white/5 w-full md:w-auto justify-end">
              {/* Feature Toggle */}
              <button
                onClick={() => handleToggleFeatured(project)}
                className={`p-2 rounded-xl border transition cursor-pointer ${
                  project.featured 
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
                title={project.featured ? 'Unfeature' : 'Feature Project'}
              >
                <Star size={14} className={project.featured ? 'fill-current' : ''} />
              </button>

              {/* Publish Toggle */}
              <button
                onClick={() => handleTogglePublish(project)}
                className={`p-2 rounded-xl border transition cursor-pointer ${
                  project.published !== false
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                }`}
                title={project.published !== false ? 'Unpublish' : 'Publish'}
              >
                {project.published !== false ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>

              {/* Edit Button */}
              <button
                onClick={() => handleEdit(project)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                <Edit3 size={13} />
                <span>Edit</span>
              </button>

              {/* Delete Button */}
              <button
                onClick={() => setDeleteTarget(project)}
                className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition cursor-pointer"
                title="Delete Project"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 bg-slate-900/30 border border-dashed border-white/10 rounded-2xl">
            <FolderGit2 className="mx-auto text-slate-500 mb-2" size={32} />
            <p className="text-sm font-semibold text-white">No projects found</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your search or click "Add New Project".</p>
          </div>
        )}
      </div>

      {/* Add / Edit Project Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-3xl my-8 bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <FolderGit2 size={20} className="text-indigo-400" />
              <span>{editingProject.title ? `Edit "${editingProject.title}"` : 'Create New Project'}</span>
            </h2>
            <p className="text-xs text-slate-400 mb-6">Configure project metadata, case study details, and display options.</p>

            <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">
              {/* Row 1: Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    placeholder="PanIIT Andhra Pradesh Summit 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Category *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.category || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    placeholder="Event Design / Web Platform"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Subtitle & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Subtitle / Eyebrow</label>
                  <input
                    type="text"
                    value={editingProject.subtitle || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                    placeholder="Impact Designer | Student Organizer"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Role / Client</label>
                  <input
                    type="text"
                    value={editingProject.role || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })}
                    placeholder="Impact Designer / PanIIT"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Cover Image URL */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Cover Image (Cloudinary / Web URL)</label>
                <input
                  type="text"
                  value={editingProject.cover_image || editingProject.image || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, cover_image: e.target.value, image: e.target.value })}
                  placeholder="https://res.cloudinary.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* Row 4: Short Description */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.short_description || editingProject.desc || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, short_description: e.target.value, desc: e.target.value })}
                  placeholder="Summary of the project..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* Row 5: Technologies (Comma-separated) */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Technologies / Skills (comma separated)</label>
                <input
                  type="text"
                  value={Array.isArray(editingProject.technologies) ? editingProject.technologies.join(', ') : (Array.isArray(editingProject.tech) ? editingProject.tech.join(', ') : '')}
                  onChange={(e) => {
                    const arr = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    setEditingProject({ ...editingProject, technologies: arr, tech: arr });
                  }}
                  placeholder="React, Next.js, Figma, Tailwind CSS"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* Row 6: Project Link & GitHub Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Live Project URL</label>
                  <input
                    type="text"
                    value={editingProject.project_url || editingProject.link || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, project_url: e.target.value, link: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Action Button Label</label>
                  <input
                    type="text"
                    value={editingProject.action_label || 'VIEW CASE STUDY →'}
                    onChange={(e) => setEditingProject({ ...editingProject, action_label: e.target.value })}
                    placeholder="VIEW CASE STUDY →"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 7: Toggles */}
              <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.featured || false}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-white/20 focus:ring-0"
                  />
                  <span className="text-white font-medium">Featured Case Study</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.published !== false}
                    onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-white/20 focus:ring-0"
                  />
                  <span className="text-white font-medium">Published on Public Website</span>
                </label>
              </div>

              {/* Submit Buttons */}
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
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition shadow-lg shadow-indigo-600/20 cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <AdminDeleteModal
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.title}
        title="Delete Project"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
