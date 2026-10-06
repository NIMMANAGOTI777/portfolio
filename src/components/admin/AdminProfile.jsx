import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Save, CheckCircle2, Lock, Mail, Shield } from 'lucide-react';

export default function AdminProfile() {
  const { user, updateProfile } = useAuth();
  const [toastMessage, setToastMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    full_name: user?.user_metadata?.full_name || 'Karthik Nimmanagoti',
    email: user?.email || 'admin@karthik.dev',
    bio: 'Aspiring Product Manager, Community Builder, Impact Designer, and Web Developer.',
    newPassword: '',
    confirmPassword: ''
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updates = {
        data: {
          full_name: formData.full_name,
          bio: formData.bio
        }
      };
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          alert('Passwords do not match');
          setSaving(false);
          return;
        }
        updates.password = formData.newPassword;
      }

      await updateProfile(updates);
      showToast('Admin profile updated successfully.');
      setFormData(prev => ({ ...prev, newPassword: '', confirmPassword: '' }));
    } catch (err) {
      alert('Error updating profile: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-slide-up">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display flex items-center gap-2">
          <User className="text-indigo-400" size={24} />
          <span>Admin Profile</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Manage your administrator credentials and account details.
        </p>
      </div>

      <form onSubmit={handleProfileSubmit} className="space-y-5 text-xs">
        {/* Personal Details */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <User size={16} className="text-indigo-400" />
            <span>Profile Information</span>
          </h3>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Full Name</label>
            <input
              type="text"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Email Address</label>
            <input
              type="email"
              disabled
              value={formData.email}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/50 border border-white/5 text-slate-400 cursor-not-allowed"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">Email changes must be confirmed via email auth link.</span>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Bio / Description</label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Change Password */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Lock size={16} className="text-indigo-400" />
            <span>Change Password</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">New Password</label>
              <input
                type="password"
                placeholder="Leave blank to keep unchanged"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-600/20 cursor-pointer disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
