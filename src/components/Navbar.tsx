import React, { useState, useEffect } from 'react';
import { Download, Menu, X, QrCode, Shield, Bike } from 'lucide-react';

interface NavbarProps {
  onOpenDownloadModal: () => void;
  onOpenQR?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDownloadModal, onOpenQR }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled 
          ? 'border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-md shadow-lg shadow-black/40 py-0' 
          : 'border-b border-neutral-800/60 bg-neutral-950/80 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Brand Logo & Wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <a 
            href="#" 
            className="text-xl font-bold tracking-tight text-white flex items-center gap-2.5 hover:opacity-90 transition-all group shrink-0"
          >
            <img 
              src="/app_logo.png" 
              alt="CartIT App Logo" 
              className="h-8 w-8 rounded-lg object-cover border border-[#00B259]/40 shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform"
            />
            <span className="font-display tracking-tight text-white text-lg sm:text-xl">CartIT</span>
          </a>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-medium text-neutral-300">
          <a href="#about" className="hover:text-white transition-colors py-1">
            About Us
          </a>
          <a href="#download" className="hover:text-white transition-colors py-1">
            Download App
          </a>

          {/* Operations & Admin Apps Highlights */}
          <a 
            href="#admin-portal" 
            className="hover:text-white transition-all py-1 px-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 font-semibold flex items-center gap-1.5 shrink-0"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin App</span>
          </a>

          <a 
            href="#staff-portal" 
            className="hover:text-white transition-all py-1 px-3 rounded-lg bg-[#00B259]/10 hover:bg-[#00B259]/20 border border-[#00B259]/30 text-[#00B259] font-semibold flex items-center gap-1.5 shrink-0"
          >
            <Bike className="w-3.5 h-3.5" />
            <span>Rider App</span>
          </a>

          <a href="#faq" className="hover:text-white transition-colors py-1">
            FAQ
          </a>
        </nav>

        {/* Zone 3: Actions (QR Code & Get App) */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-3 shrink-0">
          {onOpenQR && (
            <button
              onClick={onOpenQR}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-all cursor-pointer shrink-0"
              title="Show mobile download QR"
            >
              <QrCode className="h-3.5 w-3.5 text-emerald-400" />
              <span className="hidden sm:inline">QR Code</span>
            </button>
          )}

          <button
            onClick={onOpenDownloadModal}
            className="group relative flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-sm shadow-emerald-500/20 shrink-0"
          >
            <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
            <span>Get App</span>
            <span className="text-[10px] bg-neutral-950/15 px-1 py-0.2 rounded font-mono font-normal">v2.4</span>
          </button>
        </div>

        {/* Mobile / Tablet Menu Trigger (Visible on < md) */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-400 hover:text-white rounded-lg bg-neutral-900 border border-neutral-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-neutral-950/98 backdrop-blur-xl px-4 pt-2 pb-5 space-y-3 animate-fade-in">
          <nav className="flex flex-col space-y-1 pt-2 text-sm font-medium text-neutral-300">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-neutral-900 hover:text-white transition-colors"
            >
              About Us
            </a>
            <a
              href="#download"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Download Customer App
            </a>
            <a
              href="#admin-portal"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-blue-500/10 text-blue-400 font-semibold transition-colors flex items-center justify-between border border-blue-500/30"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Admin App (Super Admin)</span>
              </span>
              <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-mono">ADMIN</span>
            </a>
            <a
              href="#staff-portal"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-[#00B259]/10 text-[#00B259] font-semibold transition-colors flex items-center justify-between border border-[#00B259]/30"
            >
              <span className="flex items-center gap-2">
                <Bike className="w-4 h-4" />
                <span>Rider App (Delivery Fleet)</span>
              </span>
              <span className="text-[10px] bg-[#00B259]/20 text-[#00B259] px-2 py-0.5 rounded font-mono">RIDER</span>
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-neutral-900 hover:text-white transition-colors"
            >
              FAQ
            </a>
          </nav>
          
          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDownloadModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Download Customer App</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
