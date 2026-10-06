import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, KeyRound, X, CheckCircle2 } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const { signIn, resetPassword, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already logged in, redirect to admin
  React.useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await signIn(email, password);
      if (onLoginSuccess && res?.user) {
        onLoginSuccess(res.user);
      }
      const from = location.state?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!resetEmail) return;
    try {
      await resetPassword(resetEmail);
      setResetSent(true);
    } catch (err) {
      alert('Error sending reset email: ' + err.message);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@karthik.dev');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-950 relative overflow-hidden">
      {/* Background glow layers */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-2xl relative z-10 shadow-2xl animate-scale-in">
        {/* Brand Icon */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Lock className="text-indigo-400" size={26} />
          </div>
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-300 via-white to-purple-300 bg-clip-text text-transparent font-display">
            Karthik Admin Portal
          </h2>
          <p className="text-slate-400 text-xs mt-2">
            Secure administrative access for portfolio content management.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-3 text-slate-500" />
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@karthik.dev"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="password" className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 transition"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-3 text-slate-500" />
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-500/25 cursor-pointer mt-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Admin</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        {/* Demo login shortcut */}
        <div className="mt-6 pt-6 border-t border-white/5 text-center">
          <button
            type="button"
            onClick={handleFillDemo}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-indigo-300 transition cursor-pointer"
          >
            <Sparkles size={13} className="text-indigo-400" />
            <span>Fill Demo Credentials (admin@karthik.dev)</span>
          </button>
        </div>

        {/* Return to website */}
        <div className="mt-4 text-center">
          <Link to="/" className="text-xs text-slate-500 hover:text-slate-300 transition">
            &larr; Return to Public Portfolio
          </Link>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl animate-scale-in text-xs">
            <button
              onClick={() => {
                setForgotModalOpen(false);
                setResetSent(false);
              }}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg bg-white/5"
            >
              <X size={16} />
            </button>

            <h3 className="text-sm font-bold text-white mb-1">Reset Password</h3>
            <p className="text-xs text-slate-400 mb-4">Enter your admin email to receive a password reset link.</p>

            {resetSent ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-center space-y-2">
                <CheckCircle2 size={24} className="mx-auto text-emerald-400" />
                <p className="font-bold">Reset link sent!</p>
                <p className="text-[11px] text-slate-400">Check your inbox for further instructions.</p>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="admin@karthik.dev"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:border-indigo-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow cursor-pointer"
                >
                  Send Reset Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
