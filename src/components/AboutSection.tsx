import React, { useState } from 'react';
import { 
  Building2, 
  Target, 
  Eye, 
  Users, 
  ShieldCheck, 
  Zap, 
  Sparkles,
  Store,
  Layers,
  Award,
  ArrowRight,
  Smartphone,
  MapPin,
  Tag,
  Bike
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shoppers' | 'stores' | 'delivery'>('shoppers');

  return (
    <section id="about" className="py-20 md:py-28 border-b border-[#1F382B] bg-[#0A0F0D] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B259]/10 border border-[#00B259]/20 text-xs font-semibold uppercase tracking-wider text-[#00B259]">
            <span className="text-sm">🇮🇳</span>
            <span>01. Proudly Developed in India</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display">
            Engineered in Bengaluru for 10-15 Minute Express Grocery Ordering.
          </h2>
          <p className="text-base sm:text-lg text-[#9EBAAA] leading-relaxed">
            CartIT connects urban households with nearby supermarket dark stores. Enjoy instant item browsing, automated coupon discounts (`SAVE100`), 1-tap UPI payments, and live GPS rider tracking straight to your doorstep.
          </p>
        </div>

        {/* Narrative & Mission Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Story Box */}
          <div className="lg:col-span-7 p-8 rounded-2xl bg-[#141F1A] border border-[#1F382B] space-y-6 hover:border-[#00B259]/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#00B259]" />
                The CartIT Customer App Story
              </h3>
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#00B259]/10 border border-[#00B259]/30 text-[#00B259] flex items-center gap-1 font-semibold">
                <span>🇮🇳</span> Made in India
              </span>
            </div>
            
            <p className="text-[#9EBAAA] text-sm sm:text-base leading-relaxed">
              Every day across Indian cities—from Bengaluru’s Indiranagar & Koramangala to Mumbai’s Bandra and Delhi-NCR—thousands of families need fresh vegetables, Atta, milk, and snacks delivered immediately without waiting hours for slots.
            </p>
            <p className="text-[#9EBAAA] text-sm sm:text-base leading-relaxed">
              Our engineering team at the Bengaluru R&D Lab built CartIT to power instant dark-store inventory syncing, automated discount code clipping, 1-tap UPI payments (Google Pay, PhonePe, Paytm, BHIM, CRED), and real-time GPS rider navigation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#1F382B]">
              <div className="space-y-1">
                <span className="text-xs text-[#9EBAAA] font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#00B259]" />
                  Headquarters & R&D Hub
                </span>
                <p className="text-sm font-semibold text-white">{COMPANY_INFO.headquarters}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-[#9EBAAA] font-medium">Fulfillment Operations</span>
                <p className="text-sm font-semibold text-white">240+ Supermarket Dark Stores & Express Delivery Hubs</p>
              </div>
            </div>
          </div>

          {/* Mission & Vision Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-7 rounded-2xl bg-[#141F1A] border border-[#1F382B] space-y-3 hover:border-[#00B259]/40 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-9 h-9 rounded-lg bg-[#00B259]/10 border border-[#00B259]/30 flex items-center justify-center text-[#00B259]">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">Our Mission</h4>
              <p className="text-[#9EBAAA] text-sm leading-relaxed">
                To deliver fresh groceries, daily staples, and supermarket goods to Indian households in under 15 minutes through hyper-local dark store technology and 1-tap digital payments.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#141F1A] border border-[#1F382B] space-y-3 hover:border-[#FF9800]/40 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-9 h-9 rounded-lg bg-[#FF9800]/10 border border-[#FF9800]/30 flex items-center justify-center text-[#FF9800]">
                <Eye className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">Our Vision</h4>
              <p className="text-[#9EBAAA] text-sm leading-relaxed">
                To build India’s most reliable, transparent, and affordable instant grocery ecosystem—combining maximum savings, guaranteed fresh produce, and real-time delivery tracking.
              </p>
            </div>
          </div>

        </div>

        {/* Feature Tabs Box */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1F382B] pb-4">
            <h3 className="text-2xl font-bold text-white font-display">CartIT Platform Ecosystem</h3>
            
            <div className="flex items-center gap-2 p-1 rounded-xl bg-[#141F1A] border border-[#1F382B]">
              <button
                onClick={() => setActiveTab('shoppers')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'shoppers' ? 'bg-[#00B259] text-white' : 'text-[#9EBAAA] hover:text-white'
                }`}
              >
                For Shoppers
              </button>
              <button
                onClick={() => setActiveTab('stores')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'stores' ? 'bg-[#00B259] text-white' : 'text-[#9EBAAA] hover:text-white'
                }`}
              >
                For Supermarkets
              </button>
              <button
                onClick={() => setActiveTab('delivery')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'delivery' ? 'bg-[#00B259] text-white' : 'text-[#9EBAAA] hover:text-white'
                }`}
              >
                Express Delivery
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeTab === 'shoppers' && (
              <>
                <div className="p-6 rounded-xl bg-[#141F1A] border border-[#1F382B] space-y-2">
                  <Smartphone className="w-6 h-6 text-[#00B259]" />
                  <h4 className="font-bold text-white text-base">Instant Department Browsing</h4>
                  <p className="text-xs text-[#9EBAAA]">Browse 15,000+ items organized by Fresh Vegetables, Produce, Dairy, Pantry & Atta, and Snacks.</p>
                </div>
                <div className="p-6 rounded-xl bg-[#141F1A] border border-[#1F382B] space-y-2">
                  <Tag className="w-6 h-6 text-[#FF9800]" />
                  <h4 className="font-bold text-white text-base">Automatic Store Coupons</h4>
                  <p className="text-xs text-[#9EBAAA]">Save big with pre-clipped codes like SAVE100 and CARTIT10 applied directly to your basket.</p>
                </div>
                <div className="p-6 rounded-xl bg-[#141F1A] border border-[#1F382B] space-y-2">
                  <Bike className="w-6 h-6 text-[#00B259]" />
                  <h4 className="font-bold text-white text-base">Live Order GPS Tracking</h4>
                  <p className="text-xs text-[#9EBAAA]">Track your rider from dark store pickup to your doorstep with real-time ETA updates.</p>
                </div>
              </>
            )}

            {activeTab === 'stores' && (
              <>
                <div className="p-6 rounded-xl bg-[#141F1A] border border-[#1F382B] space-y-2">
                  <Store className="w-6 h-6 text-[#00B259]" />
                  <h4 className="font-bold text-white text-base">Dark Store Inventory Sync</h4>
                  <p className="text-xs text-[#9EBAAA]">Real-time stock level synchronization prevents out-of-stock items and order cancellations.</p>
                </div>
                <div className="p-6 rounded-xl bg-[#141F1A] border border-[#1F382B] space-y-2">
                  <Zap className="w-6 h-6 text-[#FF9800]" />
                  <h4 className="font-bold text-white text-base">Sub-2 Min Order Packing</h4>
                  <p className="text-xs text-[#9EBAAA]">Smart dark store layout algorithms guide packers to assemble items in under 120 seconds.</p>
                </div>
                <div className="p-6 rounded-xl bg-[#141F1A] border border-[#1F382B] space-y-2">
                  <Award className="w-6 h-6 text-[#00B259]" />
                  <h4 className="font-bold text-white text-base">GST Tax Invoicing</h4>
                  <p className="text-xs text-[#9EBAAA]">Automated GST-compliant invoices generated instantly for every completed customer order.</p>
                </div>
              </>
            )}

            {activeTab === 'delivery' && (
              <>
                <div className="p-6 rounded-xl bg-[#141F1A] border border-[#1F382B] space-y-2">
                  <Bike className="w-6 h-6 text-[#00B259]" />
                  <h4 className="font-bold text-white text-base">Optimized Delivery Routes</h4>
                  <p className="text-xs text-[#9EBAAA]">Smart rider batching and route navigation ensure sub-15 minute doorstep arrivals.</p>
                </div>
                <div className="p-6 rounded-xl bg-[#141F1A] border border-[#1F382B] space-y-2">
                  <ShieldCheck className="w-6 h-6 text-[#FF9800]" />
                  <h4 className="font-bold text-white text-base">Cold-Chain Temperature Lock</h4>
                  <p className="text-xs text-[#9EBAAA]">Insulated delivery bags keep dairy, milk, ice creams, and frozen items cold during transit.</p>
                </div>
                <div className="p-6 rounded-xl bg-[#141F1A] border border-[#1F382B] space-y-2">
                  <Users className="w-6 h-6 text-[#00B259]" />
                  <h4 className="font-bold text-white text-base">Direct Rider Contact</h4>
                  <p className="text-xs text-[#9EBAAA]">One-tap call option allows shoppers to communicate directly with assigned delivery riders.</p>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
