import React from 'react';
import { 
  Download, 
  Sparkles, 
  Smartphone, 
  QrCode, 
  Zap, 
  CheckCircle2, 
  Clock, 
  ShoppingBag,
  Bike,
  Tag
} from 'lucide-react';
import { AppSimulator } from './AppSimulator';
import { playScanBeep } from '../utils/audio';

interface HeroSectionProps {
  onOpenDownload: () => void;
  onOpenQR: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDownload, onOpenQR }) => {
  const handleSoundTest = () => {
    playScanBeep();
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 border-b border-[#1F382B] bg-gradient-to-b from-[#0A0F0D] via-[#0D2117] to-[#0A0F0D]">
      
      {/* Subtle ambient animated glow behind simulator */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/4 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#00B259]/15 blur-3xl animate-pulse-glow"
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute bottom-1/3 left-10 -z-10 h-80 w-80 rounded-full bg-[#FF9800]/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Proposition & Interactive CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Interactive contextual badge with App Icon */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141F1A] border border-[#1F382B] text-xs text-[#9EBAAA] backdrop-blur-sm shadow-md">
              <img src="/app_logo.png" alt="CartIT Logo" className="w-5 h-5 rounded-md object-cover border border-[#00B259]/40" />
              <span className="text-[#00B259] font-semibold uppercase tracking-wider text-[11px] font-mono">
                CartIT Customer App
              </span>
              <span className="text-[#1F382B]">·</span>
              <span className="text-white">Bengaluru & Pan-India</span>
              <span className="text-[#1F382B]">·</span>
              <span className="text-[#FF9800] font-bold">10-15 Min Express Delivery</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-display max-w-2xl">
              Fresh Fruits & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B259] via-[#35E59A] to-[#FF9800]">
                Veggies Express.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#9EBAAA] max-w-xl leading-relaxed">
              Order farm-fresh vegetables, organic fruits, daily dairy, pantry staples, and household essentials. 
              Enjoy 10-15 minute doorstep fulfillment, auto-applied store coupons, 1-tap UPI payment, and live GPS rider tracking.
            </p>

            {/* CTAs with interactive hover animations */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenDownload}
                className="group relative flex items-center gap-2 px-6 py-3.5 bg-[#00B259] hover:bg-[#008040] text-white font-bold rounded-xl text-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                <span>Get CartIT Customer App</span>
                <span className="text-xs font-normal opacity-80 pl-0.5 font-mono">v2.4.1</span>
              </button>

              <button
                onClick={onOpenQR}
                className="flex items-center gap-2 px-5 py-3.5 bg-[#141F1A] hover:bg-[#1F382B] text-white border border-[#1F382B] rounded-xl text-sm font-medium transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <QrCode className="h-4 w-4 text-[#00B259]" />
                <span>Scan Mobile QR</span>
              </button>
            </div>

            {/* Platform indicators */}
            <div className="pt-2 text-xs text-[#9EBAAA] flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Android & iOS</span>
              <span aria-hidden="true" className="text-[#1F382B]">·</span>
              <span className="text-[#00B259] font-medium">1-Tap UPI (GPay/PhonePe)</span>
              <span aria-hidden="true" className="text-[#1F382B]">·</span>
              <span>RuPay & Cards</span>
              <span aria-hidden="true" className="text-[#1F382B]">·</span>
              <span className="text-[#FF9800] font-bold">100% Guaranteed Fresh</span>
            </div>

            {/* Floating Micro-Stats Cards */}
            <div className="pt-6 border-t border-[#1F382B] grid grid-cols-3 gap-4 max-w-lg">
              <div className="p-3 rounded-xl bg-[#141F1A] border border-[#1F382B] hover:border-[#00B259]/50 transition-all transform hover:-translate-y-1">
                <div className="text-2xl font-extrabold text-white font-mono tabular-nums">15,000+</div>
                <div className="text-xs text-[#9EBAAA] mt-0.5">Fresh Products</div>
              </div>
              <div className="p-3 rounded-xl bg-[#141F1A] border border-[#1F382B] hover:border-[#00B259]/50 transition-all transform hover:-translate-y-1">
                <div className="text-2xl font-extrabold text-[#00B259] font-mono tabular-nums">10-15 Min</div>
                <div className="text-xs text-[#9EBAAA] mt-0.5">Doorstep Delivery</div>
              </div>
              <div className="p-3 rounded-xl bg-[#141F1A] border border-[#1F382B] hover:border-[#00B259]/50 transition-all transform hover:-translate-y-1">
                <div className="text-2xl font-extrabold text-[#FF9800] font-mono tabular-nums">4.9 ★</div>
                <div className="text-xs text-[#9EBAAA] mt-0.5">App Store Rating</div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Interactive App Simulator with Floating Interactive Badges */}
          <div className="lg:col-span-5 flex flex-col items-center relative">
            
            {/* Top instruction header */}
            <div className="w-full flex items-center justify-between px-2 pb-2 text-xs text-[#9EBAAA]">
              <span className="flex items-center gap-1.5 font-medium text-white">
                <Smartphone className="w-3.5 h-3.5 text-[#00B259]" />
                Live Customer App Simulation
              </span>
              <span className="text-[11px] text-[#00B259] font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B259] animate-ping"></span>
                Interactive Demo
              </span>
            </div>

            {/* Interactive Phone Frame Container */}
            <div className="relative w-full max-w-sm">
              
              {/* Floating Badge 1: Left */}
              <div className="hidden xl:flex items-center gap-2 p-2.5 rounded-xl bg-[#141F1A]/95 border border-[#1F382B] shadow-xl backdrop-blur-md text-xs absolute -left-20 top-24 z-20 animate-float pointer-events-none">
                <div className="w-7 h-7 rounded-lg bg-[#00B259]/20 text-[#00B259] flex items-center justify-center font-bold">
                  <Bike className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-semibold text-white">12-Min Express Rider</div>
                  <div className="text-[10px] text-[#00B259] font-mono">Live GPS Tracking</div>
                </div>
              </div>

              {/* Floating Badge 2: Right */}
              <div className="hidden xl:flex items-center gap-2 p-2.5 rounded-xl bg-[#141F1A]/95 border border-[#1F382B] shadow-xl backdrop-blur-md text-xs absolute -right-16 bottom-28 z-20 animate-float-delayed pointer-events-none">
                <div className="w-7 h-7 rounded-lg bg-[#FF9800]/20 text-[#FF9800] flex items-center justify-center font-bold">
                  <Tag className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-semibold text-white">Auto Coupon SAVE100</div>
                  <div className="text-[10px] text-[#FF9800] font-mono">-₹100 Flat Savings</div>
                </div>
              </div>

              {/* The Phone Simulator */}
              <AppSimulator />

            </div>

            <p className="mt-3 text-[11px] text-[#9EBAAA] text-center">
              Try adding items to cart, applying code <strong className="text-[#00B259]">SAVE100</strong>, and placing a test order in the phone!
            </p>

          </div>

        </div>
      </div>
    </section>
  );
};

