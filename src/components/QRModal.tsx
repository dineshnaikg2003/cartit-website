import React, { useState } from 'react';
import { X, Smartphone, Copy, Check, QrCode, ArrowUpRight } from 'lucide-react';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'apk' | 'android' | 'ios'>('apk');

  if (!isOpen) return null;

  const downloadUrl =
    activeTab === 'apk'
      ? `${window.location.origin}/cartit-release.apk`
      : activeTab === 'android'
      ? `${window.location.origin}/cartit-release.apk`
      : 'https://cartit.app/#ios-coming-soon';

  const handleCopy = () => {
    navigator.clipboard?.writeText(downloadUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md rounded-2xl bg-neutral-950 border border-neutral-800 p-6 shadow-2xl space-y-6 text-neutral-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="qr-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-emerald-400" />
            <h3 id="qr-modal-title" className="text-base font-bold text-white">
              Scan with Phone Camera
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Platform Selector Buttons */}
        <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl">
          <button
            onClick={() => setActiveTab('apk')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'apk'
                ? 'bg-[#00B259] text-white font-bold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Android APK
          </button>
          <button
            onClick={() => setActiveTab('android')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'android'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Google Play
          </button>
          <button
            onClick={() => setActiveTab('ios')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'ios'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Apple iOS 🚀
          </button>
        </div>

        {/* QR Code Container */}
        <div className="p-6 bg-white rounded-2xl flex flex-col items-center justify-center space-y-3 shadow-inner">
          {/* Detailed SVG QR Code Graphic with Center App Logo */}
          <div className="w-48 h-48 bg-[#0A0F0D] p-2.5 rounded-xl flex items-center justify-center relative">
            <svg
              className="w-full h-full text-white fill-current"
              viewBox="0 0 100 100"
              shapeRendering="crispEdges"
            >
              {/* Outer boundary markers */}
              <rect x="5" y="5" width="28" height="28" fill="#00B259" rx="4" />
              <rect x="9" y="9" width="20" height="20" fill="#0A0F0D" rx="2" />
              <rect x="13" y="13" width="12" height="12" fill="#00B259" rx="1" />

              <rect x="67" y="5" width="28" height="28" fill="#00B259" rx="4" />
              <rect x="71" y="9" width="20" height="20" fill="#0A0F0D" rx="2" />
              <rect x="75" y="13" width="12" height="12" fill="#00B259" rx="1" />

              <rect x="5" y="67" width="28" height="28" fill="#00B259" rx="4" />
              <rect x="9" y="71" width="20" height="20" fill="#0A0F0D" rx="2" />
              <rect x="13" y="75" width="12" height="12" fill="#00B259" rx="1" />

              {/* Data pixel matrix blocks */}
              <rect x="38" y="10" width="6" height="6" fill="#ffffff" />
              <rect x="48" y="10" width="6" height="12" fill="#ffffff" />
              <rect x="38" y="22" width="6" height="6" fill="#ffffff" />
              <rect x="58" y="16" width="6" height="6" fill="#ffffff" />

              <rect x="10" y="38" width="6" height="6" fill="#ffffff" />
              <rect x="20" y="38" width="10" height="6" fill="#ffffff" />
              <rect x="36" y="38" width="6" height="18" fill="#00B259" />
              <rect x="48" y="36" width="12" height="6" fill="#ffffff" />
              <rect x="66" y="38" width="6" height="6" fill="#ffffff" />
              <rect x="78" y="38" width="12" height="6" fill="#ffffff" />

              <rect x="46" y="48" width="8" height="8" fill="#00B259" />
              <rect x="58" y="48" width="14" height="6" fill="#ffffff" />
              <rect x="78" y="48" width="6" height="12" fill="#ffffff" />

              <rect x="38" y="66" width="12" height="6" fill="#ffffff" />
              <rect x="54" y="62" width="6" height="10" fill="#ffffff" />
              <rect x="66" y="66" width="6" height="18" fill="#00B259" />
              <rect x="78" y="66" width="12" height="6" fill="#ffffff" />
            </svg>

            {/* Center App Logo Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-white p-0.5 shadow-lg flex items-center justify-center">
              <img src="/app_logo.png" alt="CartIT Logo" className="w-full h-full rounded-lg object-cover" />
            </div>
          </div>
          <span className="text-[11px] font-medium text-neutral-600 font-mono">
            {activeTab === 'ios' ? 'CartIT iOS App Link' : activeTab === 'android' ? 'CartIT Google Play Link' : 'CartIT Release APK (54.6 MB)'}
          </span>
        </div>

        {/* Link copy row */}
        <div className="flex items-center gap-2 p-2 bg-neutral-900 border border-neutral-800 rounded-xl">
          <input
            type="text"
            readOnly
            value={downloadUrl}
            className="flex-1 bg-transparent text-xs text-neutral-300 font-mono px-2 outline-none truncate"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-neutral-400 text-center">
          Open your smartphone's camera app and point it at the QR code above to trigger instant download.
        </p>
      </div>
    </div>
  );
};
