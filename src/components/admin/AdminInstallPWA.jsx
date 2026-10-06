import React, { useState, useEffect } from 'react';
import { Download, CheckCircle2, Smartphone, Monitor, Info, X } from 'lucide-react';

export default function AdminInstallPWA({ variant = 'button' }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // Show manual install guide modal
      setShowInstructions(true);
    }
  };

  if (isInstalled) {
    if (variant === 'sidebar') {
      return (
        <div className="px-3 py-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2">
          <CheckCircle2 size={14} className="shrink-0" />
          <span>App Installed</span>
        </div>
      );
    }
    return null;
  }

  if (variant === 'sidebar') {
    return (
      <>
        <button
          onClick={handleInstallClick}
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-xl transition cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
            <span>Install Admin App</span>
          </div>
          <span className="text-[10px] bg-indigo-500/30 px-1.5 py-0.5 rounded text-indigo-200 uppercase font-mono">PWA</span>
        </button>

        {/* Manual instructions modal */}
        {showInstructions && (
          <InstallInstructionsModal onClose={() => setShowInstructions(false)} />
        )}
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-xs rounded-lg transition shadow-sm cursor-pointer"
      >
        <Download size={14} />
        <span>Install App</span>
      </button>

      {showInstructions && (
        <InstallInstructionsModal onClose={() => setShowInstructions(false)} />
      )}
    </>
  );
}

function InstallInstructionsModal({ onClose }) {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isAndroid = /Android/.test(navigator.userAgent);
  const isMac = /Macintosh|MacIntel|MacPPC|Mac68K/.test(navigator.userAgent);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition cursor-pointer"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Download size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Install Karthik Admin</h3>
            <p className="text-xs text-slate-400">Install directly for fast standalone access</p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-slate-300">
          {isIOS ? (
            <div className="p-3 bg-slate-950 rounded-xl border border-white/5 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Smartphone size={14} /> iOS (Safari) Instructions:
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-400">
                <li>Tap the <strong className="text-white">Share</strong> button at bottom of Safari</li>
                <li>Scroll down and tap <strong className="text-white">Add to Home Screen</strong></li>
                <li>Tap <strong className="text-white">Add</strong> in top right</li>
              </ol>
            </div>
          ) : isAndroid ? (
            <div className="p-3 bg-slate-950 rounded-xl border border-white/5 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Smartphone size={14} /> Android (Chrome) Instructions:
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-400">
                <li>Tap the <strong className="text-white">three dots</strong> menu in top right</li>
                <li>Select <strong className="text-white">Install App</strong> or <strong className="text-white">Add to Home screen</strong></li>
                <li>Confirm by tapping <strong className="text-white">Install</strong></li>
              </ol>
            </div>
          ) : (
            <div className="p-3 bg-slate-950 rounded-xl border border-white/5 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Monitor size={14} /> Desktop (Chrome / Edge / Brave):
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-400">
                <li>Click the <strong className="text-white">Install icon</strong> (computer with down arrow) in the browser address bar</li>
                <li>Or open browser menu &rarr; <strong className="text-white">Install Karthik Admin</strong></li>
                <li>Confirm to launch standalone window</li>
              </ol>
            </div>
          )}

          <div className="flex items-start gap-2 p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-300 text-[11px]">
            <Info size={14} className="shrink-0 mt-0.5" />
            <span>The Admin App stays synchronized in real time with your portfolio database.</span>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
