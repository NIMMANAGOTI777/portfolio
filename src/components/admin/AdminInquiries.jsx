import React, { useState } from 'react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import AdminDeleteModal from './AdminDeleteModal';
import { 
  Inbox, Search, Filter, Mail, Phone, Calendar, 
  Trash2, Eye, CheckCircle2, Clock, Check, X, 
  MessageSquare, User, ArrowRight, ExternalLink
} from 'lucide-react';

const STATUS_COLORS = {
  New: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
  Contacted: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
  'In Progress': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  Completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  Archived: 'bg-slate-500/10 text-slate-400 border-slate-500/30'
};

export default function AdminInquiries() {
  const { inquiries, updateInquiryStatus, deleteInquiry } = usePortfolioData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editingNotes, setEditingNotes] = useState('');

  const filtered = inquiries.filter(i => {
    const matchSearch = 
      i.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.project_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.message?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = selectedStatus === 'ALL' || i.status === selectedStatus;
    return matchSearch && matchStatus;
  });

  const handleOpenDetail = (inquiry) => {
    setSelectedInquiry(inquiry);
    setEditingNotes(inquiry.notes || '');
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateInquiryStatus(id, status, editingNotes);
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status });
      }
    } catch (e) {
      alert('Error updating status: ' + e.message);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    try {
      await updateInquiryStatus(selectedInquiry.id, selectedInquiry.status, editingNotes);
      setSelectedInquiry({ ...selectedInquiry, notes: editingNotes });
      alert('Notes saved successfully');
    } catch (e) {
      alert('Error saving notes: ' + e.message);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteInquiry(deleteTarget.id);
      if (selectedInquiry && selectedInquiry.id === deleteTarget.id) {
        setSelectedInquiry(null);
      }
      setDeleteTarget(null);
    } catch (e) {
      alert('Error deleting inquiry: ' + e.message);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display flex items-center gap-2">
            <Inbox className="text-indigo-400" size={24} />
            <span>Contact Inquiries</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Incoming collaboration proposals, event invitations, and client requests.
          </p>
        </div>

        <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 self-start sm:self-auto">
          {inquiries.filter(i => i.status === 'New').length} New Inquiries
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-900/60 border border-white/10 p-3 rounded-2xl">
        <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
          <Search size={16} className="text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search inquiries by name, email, project type, or message..."
            className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 focus:outline-none"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'New', 'Contacted', 'In Progress', 'Completed', 'Archived'].map(st => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer shrink-0 ${
                selectedStatus === st
                  ? 'bg-indigo-600 text-white font-bold shadow'
                  : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table / Cards */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const dateStr = new Date(item.created_at || Date.now()).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });

          return (
            <div
              key={item.id}
              onClick={() => handleOpenDetail(item)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 bg-slate-900/60 hover:bg-slate-900/90 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                item.status === 'New' ? 'border-indigo-500/40 ring-1 ring-indigo-500/20' : 'border-white/10'
              }`}
            >
              {/* Left Details */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-sm font-bold text-white truncate">{item.full_name}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_COLORS[item.status] || STATUS_COLORS.New}`}>
                    {item.status}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {item.project_type || 'General'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2">{item.message}</p>

                <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Mail size={12} /> {item.email}
                  </span>
                  {item.phone && (
                    <span className="flex items-center gap-1 text-slate-400">
                      <Phone size={12} /> {item.phone}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {dateStr}
                  </span>
                </div>
              </div>

              {/* Right: Quick actions */}
              <div 
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 shrink-0 self-end md:self-center border-t md:border-t-0 border-white/5 pt-2 md:pt-0 w-full md:w-auto justify-end"
              >
                <a
                  href={`mailto:${item.email}?subject=Regarding your portfolio inquiry`}
                  className="p-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 transition"
                  title="Reply via Email"
                >
                  <Mail size={14} />
                </a>

                <button
                  onClick={() => handleOpenDetail(item)}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition"
                >
                  View Full Details
                </button>

                <button
                  onClick={() => setDeleteTarget(item)}
                  className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition cursor-pointer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-slate-900/30 border border-dashed border-white/10 rounded-2xl">
            <Inbox className="mx-auto text-slate-500 mb-2" size={36} />
            <p className="text-sm font-semibold text-white">No inquiries found</p>
            <p className="text-xs text-slate-400 mt-1">Check back later or adjust status filters.</p>
          </div>
        )}
      </div>

      {/* Full Detail Drawer / Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full border mb-2 ${STATUS_COLORS[selectedInquiry.status]}`}>
                  {selectedInquiry.status}
                </span>
                <h2 className="text-xl font-bold text-white">{selectedInquiry.full_name}</h2>
                <p className="text-xs text-indigo-400 font-semibold">{selectedInquiry.project_type || 'General Inquiry'}</p>
              </div>
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-white/5 mb-6 text-xs">
              <div>
                <span className="text-slate-500 block mb-0.5">Email Address</span>
                <a href={`mailto:${selectedInquiry.email}`} className="text-white hover:text-indigo-400 font-semibold flex items-center gap-1.5">
                  <Mail size={13} className="text-indigo-400" />
                  <span>{selectedInquiry.email}</span>
                </a>
              </div>

              <div>
                <span className="text-slate-500 block mb-0.5">Phone Number</span>
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <Phone size={13} className="text-indigo-400" />
                  <span>{selectedInquiry.phone || 'Not provided'}</span>
                </span>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-2 mb-6 text-xs">
              <label className="text-slate-400 font-bold uppercase tracking-wider block text-[11px]">Message</label>
              <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 text-slate-200 text-xs leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Status Selector */}
            <div className="space-y-2 mb-6 text-xs">
              <label className="text-slate-400 font-bold uppercase tracking-wider block text-[11px]">Update Status</label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {['New', 'Contacted', 'In Progress', 'Completed', 'Archived'].map(st => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedInquiry.id, st)}
                    className={`py-2 px-2 rounded-xl text-center font-bold text-xs transition border cursor-pointer ${
                      selectedInquiry.status === st
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow'
                        : 'bg-slate-950 hover:bg-slate-800 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Internal Admin Notes */}
            <div className="space-y-2 mb-6 text-xs">
              <label className="text-slate-400 font-bold uppercase tracking-wider block text-[11px]">Internal Notes / Follow-up Record</label>
              <textarea
                rows={3}
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                placeholder="Add private notes about calls, quotes, or deliverables..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
              />
              <button
                onClick={handleSaveNotes}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition text-xs cursor-pointer"
              >
                Save Notes
              </button>
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => setDeleteTarget(selectedInquiry)}
                className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl text-xs font-semibold transition"
              >
                Delete Inquiry
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Regarding your portfolio inquiry`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20"
                >
                  <Mail size={14} />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <AdminDeleteModal
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.full_name}
        title="Delete Inquiry"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
