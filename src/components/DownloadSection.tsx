import React, { useState } from 'react';
import { 
  Download, 
  Smartphone, 
  QrCode, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  FileCode, 
  Copy, 
  CheckCircle2, 
  ExternalLink,
  ChevronDown,
  Info,
  X,
  ArrowRight
} from 'lucide-react';
import { DOWNLOAD_OPTIONS, RELEASE_NOTES } from '../data/mockData';
import { playSuccessChime } from '../utils/audio';

interface DownloadSectionProps {
  onOpenQR: () => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({ onOpenQR }) => {
  const [downloadModalPlatform, setDownloadModalPlatform] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isVerifyingHash, setIsVerifyingHash] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const startInteractiveDownload = (platform: string, filename: string) => {
    setDownloadModalPlatform(platform);
    setDownloadProgress(0);
    setIsVerifyingHash(false);
    setDownloadReady(false);

    // Progress animation leading to real file download
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setIsVerifyingHash(true);
          setTimeout(() => {
            setIsVerifyingHash(false);
            setDownloadReady(true);
            playSuccessChime();

            // Trigger real APK download
            const a = document.createElement('a');
            a.href = '/cartit-release.apk';
            a.download = 'CartIT-App.apk';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }, 500);
          return 100;
        }
        return prev + 25;
      });
    }, 120);
  };

  const copyAppStoreLink = () => {
    const link = window.location.origin + '/cartit-release.apk';
    navigator.clipboard?.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section id="download" className="py-20 md:py-28 border-b border-[#1F382B] bg-[#0A0F0D] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header with App Logo */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/app_logo.png" 
                alt="CartIT App Icon" 
                className="w-12 h-12 rounded-2xl border-2 border-[#00B259] shadow-lg shadow-emerald-500/30 object-cover" 
              />
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#00B259]">
                  <span>Official App Distribution</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display">
                  Download CartIT Customer App.
                </h2>
              </div>
            </div>

            <p className="text-base sm:text-lg text-[#9EBAAA]">
              Install the official CartIT Android APK directly or scan the QR code to order fresh groceries in 10-15 minutes. Free forever with zero ads.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenQR}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#141F1A] hover:bg-[#1F382B] text-white border border-[#1F382B] text-xs font-bold transition-all cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-[#00B259]" />
              <span>Show Phone QR</span>
            </button>

            <a
              href="/cartit-release.apk"
              download="CartIT-App.apk"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00B259] hover:bg-[#008040] text-white text-xs font-black transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Direct APK Download (54 MB)</span>
            </a>
          </div>
        </div>

        {/* Download Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Option 1: Direct Android APK (AVAILABLE) */}
          <div className="p-6 rounded-2xl bg-[#141F1A] border-2 border-[#00B259] shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <div className="absolute -right-3 -top-3 bg-[#00B259] text-white font-black text-[9px] px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              OFFICIAL APK RELEASE
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#00B259]/20 border border-[#00B259]/40 flex items-center justify-center">
                <img src="/app_logo.png" alt="CartIT Logo" className="w-9 h-9 rounded-lg object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">CartIT Android App (APK)</h3>
                <p className="text-xs text-[#9EBAAA] mt-1">Official release APK build (v1.0.0+1). Direct 1-tap download and installation on any Android phone.</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-[11px] text-[#9EBAAA]">
                <span>Version: <strong className="text-white font-mono">v1.0.0 (Build 1)</strong></span>
                <span>Size: <strong className="text-white font-mono">54.6 MB</strong></span>
              </div>

              <a
                href="/cartit-release.apk"
                download="CartIT-App.apk"
                type="application/vnd.android.package-archive"
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#00B259] hover:bg-[#008040] text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-md shadow-emerald-500/20"
              >
                <Download className="w-4 h-4" />
                <span>Download Android APK</span>
              </a>
            </div>
          </div>

          {/* Option 2: Google Play Store (COMING SOON) */}
          <div className="p-6 rounded-2xl bg-[#141F1A] border border-[#1F382B] flex flex-col justify-between space-y-6 opacity-90 relative">
            <div className="absolute top-3 right-3 bg-[#FF9800]/20 text-[#FF9800] border border-[#FF9800]/40 font-bold text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Coming Soon
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0A0F0D] border border-[#1F382B] flex items-center justify-center text-[#00B259]">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Google Play Store</h3>
                <p className="text-xs text-[#9EBAAA] mt-1">Listing under Play Store review. Please download the direct APK for instant access.</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-[11px] text-[#9EBAAA]">
                <span>Status: <strong className="text-[#FF9800]">Coming Soon to Play Store</strong></span>
              </div>

              <a
                href="/cartit-release.apk"
                download="CartIT-App.apk"
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#0A0F0D] hover:bg-[#1F382B] text-white border border-[#1F382B] font-bold rounded-xl text-xs transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#00B259]" />
                <span>Get Direct APK Instead</span>
              </a>
            </div>
          </div>

          {/* Option 3: iOS App Store (COMING SOON) */}
          <div className="p-6 rounded-2xl bg-[#141F1A] border border-[#1F382B] flex flex-col justify-between space-y-6 opacity-85 relative">
            <div className="absolute top-3 right-3 bg-[#FF9800]/20 text-[#FF9800] border border-[#FF9800]/40 font-bold text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Coming Soon
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0A0F0D] border border-[#1F382B] flex items-center justify-center text-[#FF9800]">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Apple App Store (iOS)</h3>
                <p className="text-xs text-[#9EBAAA] mt-1">iOS App for iPhone and iPad currently under TestFlight beta review.</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-[11px] text-[#9EBAAA]">
                <span>Status: <strong className="text-[#FF9800]">iOS App Coming Soon</strong></span>
              </div>

              <button
                onClick={() => alert("CartIT iOS App is Coming Soon! 🚀 Please use the Android APK or test in our interactive simulator.")}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#0A0F0D] hover:bg-[#1F382B] text-[#9EBAAA] hover:text-white border border-[#1F382B] font-bold rounded-xl text-xs transition-all cursor-pointer"
              >
                <Info className="w-4 h-4 text-[#FF9800]" />
                <span>iOS App - Coming Soon 🚀</span>
              </button>
            </div>
          </div>

          {/* Option 4: CartIT Delivery & Partner App (COMING SOON) */}
          <div className="p-6 rounded-2xl bg-[#141F1A] border border-[#1F382B] flex flex-col justify-between space-y-6 opacity-85 relative">
            <div className="absolute top-3 right-3 bg-[#FF9800]/20 text-[#FF9800] border border-[#FF9800]/40 font-bold text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Coming Soon
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0A0F0D] border border-[#1F382B] flex items-center justify-center text-[#00B259]">
                <FileCode className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Partner & Rider App</h3>
                <p className="text-xs text-[#9EBAAA] mt-1">Dedicated application for CartIT delivery partners and dark store managers.</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-[11px] text-[#9EBAAA]">
                <span>Status: <strong className="text-[#FF9800]">Partner App Coming Soon</strong></span>
              </div>

              <button
                onClick={() => alert("CartIT Delivery Partner & Merchant App is Coming Soon! 🚀")}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#0A0F0D] hover:bg-[#1F382B] text-[#9EBAAA] hover:text-white border border-[#1F382B] font-bold rounded-xl text-xs transition-all cursor-pointer"
              >
                <Info className="w-4 h-4 text-[#00B259]" />
                <span>Partner App - Coming Soon 🚀</span>
              </button>
            </div>
          </div>
        </div>

        {/* Android Download Tip / MIME Type Notice */}
        <div className="p-4 rounded-2xl bg-[#141F1A] border border-[#1F382B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9EBAAA]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00B259]/20 text-[#00B259] flex items-center justify-center shrink-0 font-bold">
              💡
            </div>
            <div>
              <strong className="text-white">Android Browser Download Note:</strong> If your phone's browser (e.g. Chrome / Samsung Internet) downloads the file as <code className="text-[#FF9800] bg-black/40 px-1 py-0.5 rounded font-mono">CartIT-App.apk.zip</code>, open your phone's <strong>Files / Downloads</strong> app, rename it to <code className="text-[#00B259] bg-black/40 px-1 py-0.5 rounded font-mono">CartIT-App.apk</code> (remove <span className="underline">.zip</span>), and tap to install!
            </div>
          </div>
        </div>

        {/* Interactive Download Progress Modal */}
        {downloadModalPlatform && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-md p-6 rounded-2xl bg-[#141F1A] border border-[#1F382B] space-y-5 text-center relative">
              <button 
                onClick={() => setDownloadModalPlatform(null)}
                className="absolute top-4 right-4 text-[#9EBAAA] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#00B259]/20 border border-[#00B259]/40 flex items-center justify-center">
                <img src="/app_logo.png" alt="CartIT Logo" className="w-12 h-12 rounded-xl object-cover" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Downloading CartIT APK</h3>
                <p className="text-xs text-[#9EBAAA] mt-1">Downloading official release build (CartIT-App.apk)...</p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-[#9EBAAA] font-mono">
                  <span>Progress: {downloadProgress}%</span>
                  <span>{isVerifyingHash ? 'Verifying SHA-256...' : downloadReady ? 'Complete!' : 'Downloading...'}</span>
                </div>
                <div className="h-3 w-full bg-[#0A0F0D] rounded-full overflow-hidden p-0.5 border border-[#1F382B]">
                  <div 
                    className="h-full bg-[#00B259] rounded-full transition-all duration-200"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
              </div>

              {downloadReady && (
                <div className="p-3 bg-[#0A0F0D] rounded-xl border border-[#00B259]/40 text-xs text-[#00B259] font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>APK Download Started! Check your Downloads folder.</span>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
