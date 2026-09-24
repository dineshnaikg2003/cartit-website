import React, { useState, useEffect } from 'react';
import { Zap, CheckCircle2, ShoppingBag, Clock, Sparkles } from 'lucide-react';

interface ActivityItem {
  id: string;
  shopper: string;
  store: string;
  city: string;
  action: string;
  timeAgo: string;
  icon: 'checkout' | 'coupon' | 'speed';
}

const ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    shopper: 'Rahul S.',
    store: 'Smart Bazaar Indiranagar',
    city: 'Bengaluru',
    action: 'Scanned 14 grocery items in 2m 10s · Paid with UPI',
    timeAgo: '12s ago',
    icon: 'speed',
  },
  {
    id: 'act-2',
    shopper: 'Priya M.',
    store: 'Nature’s Basket Bandra West',
    city: 'Mumbai',
    action: 'Saved ₹185 with 1-Tap Auto-Coupons',
    timeAgo: '28s ago',
    icon: 'coupon',
  },
  {
    id: 'act-3',
    shopper: 'Rohan K.',
    store: 'Spar Hypermarket Hitec City',
    city: 'Hyderabad',
    action: 'Walked through Express Gate 02 (PhonePe)',
    timeAgo: '45s ago',
    icon: 'checkout',
  },
  {
    id: 'act-4',
    shopper: 'Ananya D.',
    store: 'More Megastore Cyber Hub',
    city: 'Gurugram, Delhi-NCR',
    action: 'Bypassed 22-person cashier weekend rush',
    timeAgo: '1m ago',
    icon: 'speed',
  },
  {
    id: 'act-5',
    shopper: 'Vikram J.',
    store: 'Star Bazaar Phoenix Marketcity',
    city: 'Pune',
    action: 'Completed family haul scan (₹2,450 via RuPay)',
    timeAgo: '2m ago',
    icon: 'checkout',
  },
];

export const LiveActivityTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ACTIVITIES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = ACTIVITIES[currentIndex];

  return (
    <div className="w-full bg-neutral-900/60 border-y border-neutral-800/80 py-2.5 px-4 overflow-hidden backdrop-blur-xs">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Live Pulse Label with Indian Origin Indication */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
            <span className="text-sm leading-none" title="Proudly Developed in India">🇮🇳</span>
            <Zap className="w-3 h-3 text-emerald-400" />
            <span>Live Store Network</span>
          </span>
        </div>

        {/* Fading Activity Message */}
        <div className="flex-1 text-center sm:text-left sm:pl-4 transition-all duration-500 flex items-center justify-center sm:justify-start gap-2 text-neutral-300">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 hidden sm:inline-block"></span>
          <span className="font-semibold text-white">{current.shopper}</span>
          <span className="text-neutral-400">at {current.store} ({current.city}):</span>
          <span className="text-emerald-400 font-medium">{current.action}</span>
          <span className="text-neutral-500 font-mono text-[10px]">· {current.timeAgo}</span>
        </div>

        {/* Indicator Dots */}
        <div className="flex items-center gap-1 shrink-0">
          {ACTIVITIES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === i ? 'w-4 bg-emerald-400' : 'w-1.5 bg-neutral-700 hover:bg-neutral-500'
              }`}
              aria-label={`Jump to activity ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
