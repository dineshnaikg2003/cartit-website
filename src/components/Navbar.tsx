import React, { useState, useEffect } from 'react';
import { ShoppingBag, Download, Menu, X, QrCode, ArrowUpRight } from 'lucide-react';

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
        
        {/* Zone 1: Brand Wordmark with App Logo */}
        <div className="flex items-center gap-2.5">
          <a 
            href="#" 
            className="text-xl font-bold tracking-tight text-white flex items-center gap-2.5 hover:opacity-90 transition-all group"
          >
            <img 
              src="/app_logo.png" 
              alt="CartIT App Logo" 
              className="h-8 w-8 rounded-lg object-cover border border-[#00B259]/40 shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform"
            />
            <span className="font-display">CartIT</span>
          </a>
          <span 
            className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#141F1A] border border-[#1F382B] text-[#9EBAAA]"
            title="Proudly Developed & Engineered in Bengaluru, India"
          >
            <span>🇮🇳</span>
            <span>Developed in India</span>
          </span>
        </div>

        {/* Zone 2: 4-6 clean text navigation links with smooth underline hover transitions */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <a href="#about" className="relative hover:text-white transition-colors py-1 group">
            About Us
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-200 group-hover:w-full"></span>
          </a>
          <a href="#how-it-works" className="relative hover:text-white transition-colors py-1 group">
            How It Works
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-200 group-hover:w-full"></span>
          </a>
          <a href="#simulator" className="relative hover:text-white transition-colors py-1 group">
            Live Simulator
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-200 group-hover:w-full"></span>
          </a>
          <a href="#calculator" className="relative hover:text-white transition-colors py-1 group">
            Savings Calculator
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-200 group-hover:w-full"></span>
          </a>
          <a href="#stores" className="relative hover:text-white transition-colors py-1 group">
            Store Finder
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-200 group-hover:w-full"></span>
          </a>
          <a href="#download" className="relative hover:text-white transition-colors py-1 group">
            Download
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-200 group-hover:w-full"></span>
          </a>
          <a href="#faq" className="relative hover:text-white transition-colors py-1 group">
            FAQ
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-200 group-hover:w-full"></span>
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions (Support Chat strictly removed as requested) */}
        <div className="hidden sm:flex items-center gap-3">
          {onOpenQR && (
            <button
              onClick={onOpenQR}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-all cursor-pointer"
              title="Show mobile download QR"
            >
              <QrCode className="h-3.5 w-3.5 text-emerald-400" />
              <span>QR Code</span>
            </button>
          )}

          <button
            onClick={onOpenDownloadModal}
            className="group relative flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-sm shadow-emerald-500/20"
          >
            <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
            <span>Get App</span>
            <span className="text-[10px] bg-neutral-950/15 px-1 py-0.2 rounded font-mono font-normal">v2.4</span>
          </button>
        </div>

        {/* Mobile menu trigger button */}
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

      {/* Mobile Drawer with Smooth Transitions */}
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
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-neutral-900 hover:text-white transition-colors"
            >
              How It Works
            </a>
            <a
              href="#simulator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Live App Simulator
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Savings Calculator
            </a>
            <a
              href="#stores"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Store Network Locator
            </a>
            <a
              href="#download"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Download CartIT
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
              <span>Download CartIT Mobile App</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
