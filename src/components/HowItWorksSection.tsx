import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Tag, 
  Bike, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Check, 
  CreditCard,
  Sparkles
} from 'lucide-react';
import { playScanBeep, playSuccessChime } from '../utils/audio';

export const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Browse Local Dark Store',
      subtitle: 'Over 15,000+ items at your fingertips',
      description:
        'Open the CartIT Customer App to explore farm-fresh vegetables, organic fruits, daily dairy, pantry staples, and beverages from your nearest supermarket dark store.',
      icon: ShoppingBag,
      details: [
        'Real-time inventory sync with nearby partner dark stores',
        'Organized department browsing (Fresh, Produce, Dairy, Bakery)',
        'Detailed unit pricing, discounts, and brand filter options',
      ],
      preview: {
        badge: 'Instant Storefront',
        primary: 'Fresh Produce & Groceries',
        secondary: 'Sharbati Atta, Alphonso Mangoes, Filter Coffee',
        actionLabel: 'Added to Express Cart',
      },
    },
    {
      step: '02',
      title: 'Auto Vouchers & Store Coupons',
      subtitle: 'Instant discount codes applied at checkout',
      description:
        'Apply coupons like SAVE100 or CARTIT10 to enjoy flat rebates and free delivery vouchers on your order subtotal before confirming payment.',
      icon: Tag,
      details: [
        'Automatic code suggestions (SAVE100, CARTIT10, SUPERFIRST)',
        'Transparent itemized bill breakdown (Subtotal, Tax, Delivery)',
        'Live discount tally & savings calculator',
      ],
      preview: {
        badge: 'Coupon Engine',
        primary: 'Code SAVE100 Applied',
        secondary: 'Flat ₹100 Discount on Supermarket Order',
        actionLabel: 'Savings Locked In',
      },
    },
    {
      step: '03',
      title: '1-Tap Pay & Live Rider Tracking',
      subtitle: 'Doorstep express delivery in 10-15 minutes',
      description:
        'Pay effortlessly via Google Pay, PhonePe, UPI, cards, or Cash on Delivery. Watch your assigned rider pick up your order and track their live GPS location in real time.',
      icon: Bike,
      details: [
        'Instant 1-Tap UPI payments (GPay, PhonePe, Paytm, BHIM)',
        'Live order status stages (Confirmed ➔ Packed ➔ Out for Delivery)',
        'Rider contact info & live GPS map navigation',
      ],
      preview: {
        badge: 'Express Delivery Rider',
        primary: 'Rider Ramesh K. En Route',
        secondary: 'Estimated Doorstep Arrival: 11 Mins',
        actionLabel: 'Rider Out for Delivery',
      },
    },
  ];

  const handleStepSelect = (index: number) => {
    setActiveStep(index);
    if (index === 2) {
      playSuccessChime();
    } else {
      playScanBeep();
    }
  };

  const current = steps[activeStep];
  const CurrentIcon = current.icon;

  return (
    <section id="how-it-works" className="py-20 md:py-28 border-b border-[#1F382B] bg-[#0A0F0D] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#00B259]">
            <Zap className="w-3.5 h-3.5" />
            <span>02. Simple 3-Step Ordering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display">
            How CartIT delivers groceries in minutes.
          </h2>
          <p className="text-base sm:text-lg text-[#9EBAAA]">
            Browse your local store, clip instant store coupons, pay via 1-tap UPI, and track your express delivery rider in real time.
          </p>
        </div>

        {/* Step Indicator Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={s.step}
                onClick={() => handleStepSelect(idx)}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 cursor-pointer transform ${
                  isSelected
                    ? 'bg-[#141F1A] border-[#00B259] shadow-lg shadow-emerald-500/10 -translate-y-1'
                    : 'bg-[#0A0F0D] border-[#1F382B] hover:border-[#00B259]/40 hover:bg-[#141F1A]/50'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-[#00B259] text-white shadow-md shadow-emerald-500/30'
                      : 'bg-[#141F1A] text-[#9EBAAA]'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#00B259] font-bold">
                      STEP {s.step}
                    </span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00B259] animate-ping"></span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white">{s.title}</h3>
                  <p className="text-xs text-[#9EBAAA] line-clamp-1">{s.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Step Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-10 rounded-3xl bg-[#141F1A] border border-[#1F382B]">
          
          {/* Left: Detailed Step Explanation */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B259]/10 border border-[#00B259]/30 text-xs font-mono text-[#00B259]">
              <span>CUSTOMER APP STAGE</span>
              <span>·</span>
              <span>STEP {current.step} OF 03</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {current.title}
              </h3>
              <p className="text-sm sm:text-base text-[#00B259] font-medium">
                {current.subtitle}
              </p>
            </div>

            <p className="text-[#9EBAAA] text-sm sm:text-base leading-relaxed">
              {current.description}
            </p>

            {/* Checkmark Bullets */}
            <div className="space-y-2.5 pt-2">
              {current.details.map((detail, i) => (
                <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-white">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00B259]/10 border border-[#00B259]/40 text-[#00B259] shrink-0">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            {/* Step navigation buttons */}
            <div className="flex items-center gap-3 pt-4">
              <button
                disabled={activeStep === 0}
                onClick={() => handleStepSelect(Math.max(0, activeStep - 1))}
                className="px-4 py-2 rounded-xl bg-[#0A0F0D] border border-[#1F382B] disabled:opacity-40 hover:bg-[#1F382B] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Previous Step
              </button>
              <button
                disabled={activeStep === 2}
                onClick={() => handleStepSelect(Math.min(2, activeStep + 1))}
                className="px-4 py-2 rounded-xl bg-[#00B259] disabled:opacity-40 hover:bg-[#008040] text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Graphic Preview Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm p-6 rounded-2xl bg-[#0A0F0D] border border-[#1F382B] space-y-6 shadow-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between pb-3 border-b border-[#1F382B]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#00B259] font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00B259] animate-pulse"></span>
                  {current.preview.badge}
                </span>
                <CurrentIcon className="w-4 h-4 text-[#00B259]" />
              </div>

              {/* Dynamic Graphic Preview */}
              <div className="py-6 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-[#141F1A] border border-[#1F382B] flex items-center justify-center text-[#00B259] shadow-inner group-hover:scale-105 transition-transform duration-300">
                  <CurrentIcon className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{current.preview.primary}</h4>
                  <p className="text-xs text-[#9EBAAA] mt-0.5">{current.preview.secondary}</p>
                </div>
              </div>

              {/* Action confirmation tag */}
              <div className="p-3 bg-[#141F1A] rounded-xl border border-[#1F382B] text-center">
                <span className="text-xs font-mono font-bold text-[#00B259] flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {current.preview.actionLabel}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
