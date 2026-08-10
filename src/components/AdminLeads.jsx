import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabaseClient';

import AdminLogin from './AdminLogin';
import { 
  Search, Filter, Download, Calendar, Mail, 
  Phone, Briefcase, Eye, Trash2, ArrowUpDown, X, LogOut,
  MapPin, Camera
} from 'lucide-react';

const getPurposeColor = (purpose, hasBorder = true) => {
  let colors = 'bg-slate-500/10 text-slate-400';
  if (hasBorder) colors += ' border border-slate-500/20';

  switch (purpose) {
    case 'Hire Me':
      colors = 'bg-indigo-500/10 text-indigo-400' + (hasBorder ? ' border border-indigo-500/20' : '');
      break;
    case 'Web Development':
      colors = 'bg-blue-500/10 text-blue-400' + (hasBorder ? ' border border-blue-500/20' : '');
      break;
    case 'UI/UX & Figma Design':
      colors = 'bg-purple-500/10 text-purple-400' + (hasBorder ? ' border border-purple-500/20' : '');
      break;
    case 'Event Management':
      colors = 'bg-rose-500/10 text-rose-400' + (hasBorder ? ' border border-rose-500/20' : '');
      break;
    case 'Social Media Strategy':
      colors = 'bg-sky-500/10 text-sky-400' + (hasBorder ? ' border border-sky-500/20' : '');
      break;
    case 'Content & Reels Script Writing':
      colors = 'bg-amber-500/10 text-amber-400' + (hasBorder ? ' border border-amber-500/20' : '');
      break;
    case 'Creative Design & Branding':
      colors = 'bg-teal-500/10 text-teal-400' + (hasBorder ? ' border border-teal-500/20' : '');
      break;
    case 'Photography & Videography':
      colors = 'bg-cyan-500/10 text-cyan-400' + (hasBorder ? ' border border-cyan-500/20' : '');
      break;
    case 'Product Strategy & Consulting':
      colors = 'bg-emerald-500/10 text-emerald-400' + (hasBorder ? ' border border-emerald-500/20' : '');
      break;
    case 'Event Collaboration':
      colors = 'bg-pink-500/10 text-pink-400' + (hasBorder ? ' border border-pink-500/20' : '');
      break;
    case 'Freelance Project':
      colors = 'bg-violet-500/10 text-violet-400' + (hasBorder ? ' border border-violet-500/20' : '');
      break;
    case 'Speaking Opportunity':
      colors = 'bg-yellow-500/10 text-yellow-400' + (hasBorder ? ' border border-yellow-500/20' : '');
      break;
  }
  return colors;
};

export default function AdminLeads() {
  const [session, setSession] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  
  // Filtering & Sorting State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('All');
  const [sortOrder, setSortOrder] = useState('desc'); // desc = newest first, asc = oldest first
  const [deletingId, setDeletingId] = useState(null);

  // Behind the Lens Photography manager tab states
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' or 'photos'
  const [photos, setPhotos] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    category: 'Streets',
    image: '',
    location: 'Hyderabad, India',
    shot_on: 'iPhone 15 Pro Max',
    story: '',
    editing_style: '',
    aspect: 'aspect-[3/4]'
  });
  const [addingPhoto, setAddingPhoto] = useState(false);

  // Check auth session on load
  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        setSession(session);
        setCheckingAuth(false);
        if (session) fetchLeads();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setSession(session);
        setCheckingAuth(false);
        if (session) {
          fetchLeads();
        } else {
          setLeads([]);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setLeads([]);
  };

  const handleDeleteLead = async (id, e) => {
    if (e) e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this lead? This action cannot be undone.')) return;

    setDeletingId(id);
    try {
      const { error } = await supabase
        .from('contact_leads')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Filter out deleted lead
      setLeads(prev => prev.filter(lead => lead.id !== id));
      if (selectedLead?.id === id) {
        setSelectedLead(null);
      }
    } catch (err) {
      console.error('Error deleting lead:', err);
      alert('Failed to delete lead. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  // Photography Handlers
  useEffect(() => {
    if (session && activeTab === 'photos') {
      fetchPhotos();
    }
  }, [session, activeTab]);

  const fetchPhotos = async () => {
    setLoadingPhotos(true);
    try {
      const { data, error } = await supabase
        .from('portfolio_photos')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setPhotos(data || []);
    } catch (err) {
      console.error('Error fetching photos:', err);
    } finally {
      setLoadingPhotos(false);
    }
  };

  const handleAddPhoto = async (e) => {
    e.preventDefault();
    if (!newPhoto.title || !newPhoto.image || !newPhoto.story) {
      alert('Please fill out all required fields (Title, Image URL, Backstory).');
      return;
    }
    setAddingPhoto(true);
    try {
      const { data, error } = await supabase
        .from('portfolio_photos')
        .insert([newPhoto]);
      if (error) throw error;
      setPhotoModalOpen(false);
      setNewPhoto({
        title: '',
        category: 'Streets',
        image: '',
        location: 'Hyderabad, India',
        shot_on: 'iPhone 15 Pro Max',
        story: '',
        editing_style: '',
        aspect: 'aspect-[3/4]'
      });
      fetchPhotos();
    } catch (err) {
      console.error('Error adding photo:', err);
      alert('Failed to add photo. Please try again.');
    } finally {
      setAddingPhoto(false);
    }
  };

  const handleDeletePhoto = async (id) => {
    if (!window.confirm('Are you sure you want to delete this photo? This will remove it from Behind the Lens.')) return;
    try {
      const { error } = await supabase
        .from('portfolio_photos')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setPhotos(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting photo:', err);
      alert('Failed to delete photo. Please try again.');
    }
  };

  // KPI Calculations
  const stats = useMemo(() => {
    const total = leads.length;
    
    // Today's leads calculation
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = leads.filter(lead => {
      const leadDate = new Date(lead.created_at);
      return leadDate >= today;
    }).length;

    // High Intent leads (Hire Me, Freelance, Partnership, and specific service categories)
    const highIntentCount = leads.filter(lead => 
      [
        'Hire Me', 'Freelance Project', 'Partnership', 
        'Web Development', 'UI/UX & Figma Design', 'Event Management', 
        'Social Media Strategy', 'Content & Reels Script Writing', 
        'Creative Design & Branding', 'Photography & Videography', 
        'Product Strategy & Consulting', 'Speaking Opportunity', 'Event Collaboration'
      ].includes(lead.purpose)
    ).length;

    return { total, todayCount, highIntentCount };
  }, [leads]);

  // Search & Filter Pipeline
  const filteredLeads = useMemo(() => {
    return leads
      .filter(lead => {
        const matchesSearch = 
          lead.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.message?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesPurpose = selectedPurpose === 'All' || lead.purpose === selectedPurpose;

        return matchesSearch && matchesPurpose;
      })
      .sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      });
  }, [leads, searchTerm, selectedPurpose, sortOrder]);

  // CSV Export Handler
  const handleExportCSV = () => {
    if (filteredLeads.length === 0) {
      alert('No leads available to export.');
      return;
    }

    const headers = ['ID', 'Full Name', 'Email Address', 'Phone Number', 'Company', 'Purpose', 'Message', 'Created At'];
    
    const rows = filteredLeads.map(lead => [
      lead.id,
      lead.full_name,
      lead.email,
      lead.phone || '',
      lead.company || '',
      lead.purpose,
      lead.message.replace(/"/g, '""'), // escape quotes
      lead.created_at,
    ]);

    // CSV format assembly
    const csvContent = 
      'data:text/csv;charset=utf-8,' + 
      [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `portfolio_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Retrieve unique purposes for the filter dropdown
  const uniquePurposes = useMemo(() => {
    const list = new Set(leads.map(l => l.purpose));
    return ['All', ...Array.from(list)];
  }, [leads]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
        <svg className="animate-spin h-8 w-8 text-indigo-400 mb-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <p className="text-sm font-semibold">Verifying credentials...</p>
      </div>
    );
  }

  if (!session) {
    return <AdminLogin onLoginSuccess={(user) => setSession({ user })} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 relative">
      {/* Glow Rings */}
      <div className="glow-indigo top-10 left-10"></div>
      <div className="glow-purple bottom-10 right-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {activeTab === 'leads' ? 'Lead Control Room' : 'Behind the Lens Manager'}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {activeTab === 'leads' 
                ? 'Review, analyze, and manage portfolio leads in real time.' 
                : 'Upload, curate, and delete your mobile photography gallery items.'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {activeTab === 'photos' && (
              <button
                onClick={() => setPhotoModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/20 text-white font-semibold rounded-xl transition duration-200 cursor-pointer"
              >
                <Camera size={16} />
                <span>Add Photograph</span>
              </button>
            )}
            {activeTab === 'leads' && (
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-650/20 hover:bg-indigo-650/35 border border-indigo-500/30 text-indigo-300 font-semibold rounded-xl transition duration-200 cursor-pointer"
              >
                <Download size={16} />
                <span>Export CSV</span>
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-semibold rounded-xl transition duration-200 cursor-pointer"
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>
        </header>

        {/* Tab Toggle Navigation */}
        <div className="flex gap-2 mb-8 p-1 bg-white/5 border border-white/10 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition duration-200 cursor-pointer ${
              activeTab === 'leads' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Leads Inbox
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition duration-200 cursor-pointer ${
              activeTab === 'photos' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Behind the Lens
          </button>
        </div>

        {/* Tab Splitting Content */}
        {activeTab === 'leads' ? (
          <>
            {/* 3 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {/* Total Leads */}
          <div className="p-6 rounded-2xl glass-panel relative overflow-hidden">
            <div className="absolute right-4 top-4 text-slate-700 font-bold text-4xl select-none">#</div>
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">Total Leads</p>
            <p className="text-3xl font-bold text-white mt-2">{stats.total}</p>
            <p className="text-xs text-slate-500 mt-1">Overall submissions captured</p>
          </div>

          {/* Today's Leads */}
          <div className="p-6 rounded-2xl glass-panel relative overflow-hidden">
            <div className="absolute right-4 top-4 text-slate-700 font-bold text-4xl select-none">★</div>
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">Today's Leads</p>
            <p className={`text-3xl font-bold mt-2 ${stats.todayCount > 0 ? 'text-indigo-400' : 'text-white'}`}>
              {stats.todayCount}
            </p>
            <p className="text-xs text-slate-500 mt-1">Received since midnight UTC</p>
          </div>

          {/* High Intent Leads */}
          <div className="p-6 rounded-2xl glass-panel relative overflow-hidden">
            <div className="absolute right-4 top-4 text-slate-700 font-bold text-4xl select-none">⚡</div>
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">High Intent Leads</p>
            <p className="text-3xl font-bold text-emerald-400 mt-2">{stats.highIntentCount}</p>
            <p className="text-xs text-slate-500 mt-1">Hire Me / Projects / Partnerships</p>
          </div>
        </div>

        {/* Main List Section */}
        <div className="rounded-2xl glass-panel overflow-hidden">
          
          {/* Table Filters header */}
          <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/40">
            <div className="relative w-full sm:max-w-xs">
              <Search size={16} className="absolute left-3.5 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Search name, email, company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2 grow sm:grow-0">
                <Filter size={14} className="text-slate-400" />
                <select
                  value={selectedPurpose}
                  onChange={(e) => setSelectedPurpose(e.target.value)}
                  className="w-full sm:w-44 px-3 py-2 rounded-xl glass-input text-xs appearance-none cursor-pointer"
                >
                  <option value="All">All Purposes</option>
                  {uniquePurposes.filter(p => p !== 'All').map((purpose, idx) => (
                    <option key={idx} value={purpose}>{purpose}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                className="flex items-center gap-1.5 px-3 py-2 text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-xl transition duration-200 cursor-pointer"
                title="Toggle Date Order"
              >
                <ArrowUpDown size={14} />
                <span>{sortOrder === 'desc' ? 'Newest' : 'Oldest'}</span>
              </button>
            </div>
          </div>

          {/* Leads Content */}
          {loading ? (
            <div className="p-16 text-center text-slate-400">
              <svg className="animate-spin h-8 w-8 text-indigo-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p>Loading database submissions...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-16 text-center text-slate-500">
              No leads found matching your criteria.
            </div>
          ) : (
            <>
              {/* Responsive Layout: Table on Desktop, Cards on Mobile */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-slate-900/20 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      <th className="py-4 px-6">Name</th>
                      <th className="py-4 px-6">Email Address</th>
                      <th className="py-4 px-6">Purpose</th>
                      <th className="py-4 px-6">Submitted Date</th>
                      <th className="py-4 px-6">Message Preview</th>
                      <th className="py-4 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {filteredLeads.map((lead) => (
                      <tr 
                        key={lead.id} 
                        onClick={() => setSelectedLead(lead)}
                        className="hover:bg-indigo-500/5 cursor-pointer transition duration-150 group"
                      >
                        <td className="py-4 px-6 font-medium text-slate-200">{lead.full_name}</td>
                        <td className="py-4 px-6 text-slate-300">{lead.email}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${getPurposeColor(lead.purpose, true)}`}>
                            {lead.purpose}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-slate-400 text-xs">
                          {new Date(lead.created_at).toLocaleDateString(undefined, { 
                            month: 'short', day: 'numeric', year: 'numeric' 
                          })}
                        </td>
                        <td className="py-4 px-6 text-slate-400 truncate max-w-xs">{lead.message}</td>
                        <td className="py-4 px-6 text-center" onClick={(e) => e.stopPropagation()}>
                          <div className="flex justify-center items-center gap-2">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-indigo-600/20 hover:text-indigo-400 text-slate-400 transition"
                              title="View Details"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              onClick={(e) => handleDeleteLead(lead.id, e)}
                              disabled={deletingId === lead.id}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition"
                              title="Delete Lead"
                            >
                              {deletingId === lead.id ? (
                                <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                              ) : (
                                <Trash2 size={14} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card Grid */}
              <div className="md:hidden divide-y divide-white/5">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="p-5 active:bg-indigo-500/5 transition duration-150"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-slate-200">{lead.full_name}</h4>
                      <span className="text-[10px] text-slate-500">
                        {new Date(lead.created_at).toLocaleDateString(undefined, { 
                          month: 'short', day: 'numeric' 
                        })}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5 text-xs text-slate-400 mb-3">
                      <div className="flex items-center gap-1.5">
                        <Mail size={12} className="text-slate-500" />
                        <span className="truncate">{lead.email}</span>
                      </div>
                      <div className="mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getPurposeColor(lead.purpose, false)}`}>
                          {lead.purpose}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 bg-slate-900/30 p-2 rounded-lg border border-white/5 mb-3">
                      {lead.message}
                    </p>

                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="flex items-center gap-1 py-1.5 px-3 rounded-lg bg-white/5 text-xs font-semibold text-slate-300 hover:bg-white/10"
                      >
                        <Eye size={12} />
                        <span>View</span>
                      </button>
                      <button
                        onClick={(e) => handleDeleteLead(lead.id, e)}
                        disabled={deletingId === lead.id}
                        className="flex items-center gap-1 py-1.5 px-3 rounded-lg bg-white/5 text-xs font-semibold text-rose-400 hover:bg-rose-500/10"
                      >
                        <Trash2 size={12} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </>
    ) : (
        /* Behind the Lens photos manager tab content */
        <div className="animate-fade-in mb-12">
          {loadingPhotos ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <svg className="animate-spin h-8 w-8 text-indigo-400 mb-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className="text-sm font-semibold text-slate-300">Loading gallery photographs...</p>
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-16 glass-panel rounded-2xl border border-white/5 max-w-xl mx-auto">
              <Camera className="mx-auto text-slate-500 mb-4 animate-pulse" size={40} />
              <h3 className="text-lg font-bold text-white mb-1">No Photos Found</h3>
              <p className="text-slate-400 text-xs mb-6 max-w-xs mx-auto">
                Your "Behind the Lens" gallery is empty. Click "Add Photograph" to curate your first visual story.
              </p>
              <button
                onClick={() => setPhotoModalOpen(true)}
                className="px-6 py-2.5 bg-indigo-650 hover:bg-indigo-550 text-white font-bold text-xs rounded-xl shadow-lg transition cursor-pointer"
              >
                Add Photograph
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {photos.map((photo) => (
                <div key={photo.id} className="glass-panel p-3.5 rounded-2xl border border-white/5 flex flex-col justify-between group">
                  <div>
                    {/* Photo Thumbnail */}
                    <div className="h-44 rounded-xl overflow-hidden relative mb-3 bg-slate-950 border border-white/5">
                      <img 
                        src={photo.image} 
                        alt={photo.title} 
                        className="w-full h-full object-cover select-none"
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/600x400/1e293b/ffffff?text=Image+Load+Error';
                        }}
                      />
                      <span className="absolute top-2.5 left-2.5 bg-indigo-650/90 backdrop-blur-md text-white text-[8px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {photo.category}
                      </span>
                    </div>
                    
                    <h4 className="font-bold text-white text-sm truncate mb-0.5">{photo.title}</h4>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1 mb-2">
                      <MapPin size={10} className="text-slate-500" />
                      <span className="truncate">{photo.location}</span>
                    </p>
                    
                    <p className="text-[10px] text-slate-405 line-clamp-3 leading-relaxed mb-4 italic">
                      "{photo.story}"
                    </p>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-white/5 mt-auto">
                    <button
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="w-full py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-450 text-[10px] font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Trash2 size={12} />
                      <span>Delete Photograph</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

        {/* Lead Detail View Modal */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
            <div className="relative w-full max-w-xl rounded-2xl glass-panel animate-scale-in my-8 overflow-hidden">
              <div className="glow-indigo -top-20 -left-20"></div>
              
              {/* Close Icon */}
              <button
                onClick={() => setSelectedLead(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition z-10 cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="p-6">
                <div className="border-b border-white/10 pb-4 mb-5">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400">
                    Lead Details
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {selectedLead.full_name}
                  </h3>
                </div>

                <div className="space-y-4 text-sm">
                  {/* Lead Stats Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="block text-slate-500 text-xs font-semibold uppercase mb-1">Email Address</span>
                      <a 
                        href={`mailto:${selectedLead.email}`}
                        className="flex items-center gap-1.5 text-indigo-400 hover:underline"
                      >
                        <Mail size={14} />
                        <span>{selectedLead.email}</span>
                      </a>
                    </div>
                    {selectedLead.phone && (
                      <div>
                        <span className="block text-slate-500 text-xs font-semibold uppercase mb-1">Phone Number</span>
                        <a 
                          href={`tel:${selectedLead.phone}`}
                          className="flex items-center gap-1.5 text-slate-300 hover:underline"
                        >
                          <Phone size={14} />
                          <span>{selectedLead.phone}</span>
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="block text-slate-500 text-xs font-semibold uppercase mb-1">Purpose of Contact</span>
                      <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10">
                        {selectedLead.purpose}
                      </span>
                    </div>
                    {selectedLead.company && (
                      <div>
                        <span className="block text-slate-500 text-xs font-semibold uppercase mb-1">Company / Organization</span>
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <Briefcase size={14} className="text-slate-500" />
                          <span>{selectedLead.company}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="block text-slate-500 text-xs font-semibold uppercase mb-1">Submitted At</span>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                      <Calendar size={14} className="text-slate-500" />
                      <span>{new Date(selectedLead.created_at).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4 mt-2">
                    <span className="block text-slate-500 text-xs font-semibold uppercase mb-2">Message Inquiry</span>
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 text-slate-200 whitespace-pre-wrap leading-relaxed text-sm">
                      {selectedLead.message}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-white/10 pt-5 mt-6">
                  <button
                    onClick={(e) => {
                      handleDeleteLead(selectedLead.id, e);
                    }}
                    className="flex items-center gap-1.5 py-2 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/20 transition cursor-pointer"
                  >
                    <Trash2 size={14} />
                    <span>Delete Lead</span>
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedLead(null)}
                      className="py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition cursor-pointer"
                    >
                      Close Details
                    </button>
                    <a
                      href={`mailto:${selectedLead.email}?subject=Regarding your inquiry on portfolio`}
                      className="flex items-center gap-1.5 py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition cursor-pointer"
                    >
                      <Mail size={14} />
                      <span>Reply via Email</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      {/* Add Photograph Form Modal */}
      {photoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-2xl glass-panel animate-scale-in my-8 overflow-hidden">
            <div className="glow-indigo -top-20 -left-20"></div>
            
            <button
              onClick={() => setPhotoModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-black/40 hover:bg-black/60 transition backdrop-blur-sm z-10 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="p-6 md:p-8">
              <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">
                Add New Photograph
              </h3>

              <form onSubmit={handleAddPhoto} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title */}
                  <div>
                    <label htmlFor="p-title" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      id="p-title"
                      required
                      value={newPhoto.title}
                      onChange={(e) => setNewPhoto(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g. Charminar Chords"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
                    />
                  </div>
                  {/* Category */}
                  <div>
                    <label htmlFor="p-category" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Category *
                    </label>
                    <div className="relative">
                      <select
                        id="p-category"
                        value={newPhoto.category}
                        onChange={(e) => setNewPhoto(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl glass-input text-xs appearance-none cursor-pointer"
                      >
                        <option value="Photography">Photography</option>
                        <option value="Reels">Reels</option>
                        <option value="Streets">Streets</option>
                        <option value="Portraits">Portraits</option>
                        <option value="Nature">Nature</option>
                        <option value="Creative Edits">Creative Edits</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label htmlFor="p-image" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    id="p-image"
                    required
                    value={newPhoto.image}
                    onChange={(e) => setNewPhoto(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://images.unsplash.com/... or Cloudinary URL"
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Location */}
                  <div>
                    <label htmlFor="p-location" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      id="p-location"
                      required
                      value={newPhoto.location}
                      onChange={(e) => setNewPhoto(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g. Hyderabad, India"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
                    />
                  </div>
                  {/* Shot on */}
                  <div>
                    <label htmlFor="p-shot" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Shot on Mobile *
                    </label>
                    <input
                      type="text"
                      id="p-shot"
                      required
                      value={newPhoto.shot_on}
                      onChange={(e) => setNewPhoto(prev => ({ ...prev, shot_on: e.target.value }))}
                      placeholder="e.g. iPhone 15 Pro Max"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
                    />
                  </div>
                  {/* Aspect Ratio */}
                  <div>
                    <label htmlFor="p-aspect" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Aspect Ratio *
                    </label>
                    <div className="relative">
                      <select
                        id="p-aspect"
                        value={newPhoto.aspect}
                        onChange={(e) => setNewPhoto(prev => ({ ...prev, aspect: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl glass-input text-xs appearance-none cursor-pointer"
                      >
                        <option value="aspect-[3/4]">3:4 (Portrait)</option>
                        <option value="aspect-[4/5]">4:5 (Standard)</option>
                        <option value="aspect-[9/16]">9:16 (Tall)</option>
                        <option value="aspect-[1/1]">1:1 (Square)</option>
                        <option value="aspect-[4/3]">4:3 (Landscape)</option>
                        <option value="aspect-[16/9]">16:9 (Wide)</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Editing style */}
                <div>
                  <label htmlFor="p-style" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Editing Recipe / Style *
                  </label>
                  <input
                    type="text"
                    id="p-style"
                    required
                    value={newPhoto.editing_style}
                    onChange={(e) => setNewPhoto(prev => ({ ...prev, editing_style: e.target.value }))}
                    placeholder="e.g. Warm amber highlights, 12% grain"
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>

                {/* Story */}
                <div>
                  <label htmlFor="p-story" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Backstory *
                  </label>
                  <textarea
                    id="p-story"
                    required
                    rows="3"
                    value={newPhoto.story}
                    onChange={(e) => setNewPhoto(prev => ({ ...prev, story: e.target.value }))}
                    placeholder="Describe how, where, or why you captured this moment..."
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setPhotoModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold border border-white/10 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={addingPhoto}
                    className="px-6 py-2 rounded-xl bg-indigo-650 hover:bg-indigo-550 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white text-xs font-bold transition cursor-pointer"
                  >
                    {addingPhoto ? 'Adding...' : 'Add Photograph'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
