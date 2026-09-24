import React from 'react';
import { ShoppingBag, ArrowUp, Mail, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenDownload: () => void;
  onOpenChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDownload, onOpenChat }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-400 text-xs py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top zone */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          <div className="space-y-2">
            <a 
              href="#" 
              className="text-lg font-bold tracking-tight text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <img src="/app_logo.png" alt="CartIT Logo" className="w-7 h-7 rounded-lg object-cover border border-[#00B259]/40" />
              <span>CartIT</span>
            </a>
            <p className="text-[#9EBAAA] text-xs max-w-sm">
              Superfast 10-15 minute grocery & supermarket delivery platform powered by local dark stores across India.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-neutral-300">
            <a href="#about" className="hover:text-white transition-colors">
              About Us
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#download" className="hover:text-white transition-colors">
              Download App
            </a>
            <button 
              onClick={onOpenChat}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Customer Support Chat
            </button>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[11px]">Top</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <div className="flex items-center gap-2">
            <span>© 2026 CartIT Technologies India Pvt. Ltd. All rights reserved.</span>
            <span aria-hidden="true">·</span>
            <span className="text-neutral-400 font-medium flex items-center gap-1">
              <span>🇮🇳</span> Proudly Developed in Bengaluru, India
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-neutral-400 cursor-pointer">Retailer Partner SLA</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-neutral-400 cursor-pointer">Security & RBI Compliance</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
