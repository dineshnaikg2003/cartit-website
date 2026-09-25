import React, { useState } from 'react';
import { X, Smartphone, Copy, Check, QrCode, ArrowUpRight } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  apkUrl?: string;
}

export const QRModal: React.FC<QRModalProps> = ({
  isOpen,
  onClose,
  title = "Scan with Phone Camera",
  apkUrl = "/cartit-release.apk"
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'apk' | 'android' | 'ios'>('apk');

  if (!isOpen) return null;

  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://cartit-website.onrender.com';

  const getFullUrl = (path: string) => {
    if (path.startsWith('http')) return path;
    return `${origin}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  const downloadUrl =
    activeTab === 'apk'
      ? getFullUrl(apkUrl)
      : activeTab === 'android'
      ? getFullUrl(apkUrl)
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
              {title}
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
            Direct Web Link
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

        {/* Dynamic 100% Scannable QR Code Container */}
        <div className="p-5 bg-white rounded-2xl flex flex-col items-center justify-center space-y-3 shadow-inner">
          <div className="p-3 bg-white rounded-xl shadow-md border border-neutral-200 flex items-center justify-center">
            <QRCodeSVG
              value={downloadUrl}
              size={180}
              level="H"
              marginSize={1}
              fgColor="#0A0F0D"
              bgColor="#FFFFFF"
              imageSettings={{
                src: "/app_logo.png",
                x: undefined,
                y: undefined,
                height: 36,
                width: 36,
                excavate: true,
              }}
            />
          </div>
          <span className="text-[11px] font-bold text-neutral-800 font-mono text-center">
            {activeTab === 'apk'
              ? `CartIT Direct Android Release APK`
              : activeTab === 'android'
              ? `CartIT Direct Server Download`
              : 'iOS App Store — Coming Soon 🚀'}
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
