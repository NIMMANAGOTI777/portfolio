import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

// Simple layout for admin pages with a header and a logout button placeholder
export default function AdminLayout({ children }) {
  const handleLogout = () => {
    // Placeholder: add real logout logic (e.g., supabase.auth.signOut())
    console.log('Logout clicked');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Admin Header */}
      <header className="border-b border-white/5 bg-slate-950/70 p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-white hover:text-indigo-400 transition">
          Admin Portal
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition"
        >
          <X size={16} /> Logout
        </button>
      </header>
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
