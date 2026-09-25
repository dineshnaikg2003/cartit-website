import React, { useState } from 'react';
import { 
  Bike, 
  Store, 
  BarChart3, 
  Download, 
  ShieldCheck, 
  Smartphone, 
  Users, 
  PackageCheck, 
  Clock, 
  Zap, 
  CheckCircle2, 
  ExternalLink,
  QrCode,
  Lock,
  Search,
  BadgeCheck
} from 'lucide-react';

interface StaffPortalSectionProps {
  onOpenQR?: () => void;
}

export const StaffPortalSection: React.FC<StaffPortalSectionProps> = ({ onOpenQR }) => {
  const [selectedRole, setSelectedRole] = useState<'all' | 'delivery' | 'store' | 'merchant'>('all');

  const staffApps = [
    {
      id: 'delivery-app',
      category: 'delivery',
      title: 'CartIT Delivery Rider App',
      subtitle: 'For Fleet Executives & Delivery Riders',
      icon: Bike,
      appIconUrl: '/delivery_app_icon.png',
      accentColor: 'from-[#00B259] to-[#008040]',
      badgeColor: 'bg-[#00B259]/20 text-[#00B259] border-[#00B259]/40',
      status: 'AVAILABLE APK',
      isAvailable: true,
      version: 'v1.2.0 (Build 8)',
      fileSize: '52.4 MB',
      downloadUrl: '/cartit-delivery-release.apk',
      filename: 'CartIT-Delivery-App.apk',
      description: 'Official mobile application for CartIT delivery partners. Receive real-time order dispatch alerts, optimized turn-by-turn route navigation, and instant payout tracking.',
      features: [
        'Real-time GPS order dispatch & route optimization',
        '10-15 Min SLA timer & customer address locator',
        'OTP delivery confirmation & COD cash collection',
        'Daily earnings dashboard with instant bank payout'
      ]
    },
    {
      id: 'store-app',
      category: 'store',
      title: 'CartIT Dark Store Manager App',
      subtitle: 'For Store In-charges, Pickers & Packers',
      icon: Store,
      appIconUrl: '/app_logo.png',
      accentColor: 'from-[#FF9800] to-[#E65100]',
      badgeColor: 'bg-[#FF9800]/20 text-[#FF9800] border-[#FF9800]/40',
      status: 'COMING SOON 🚀',
      isAvailable: false,
      version: 'v2.1 (In Development)',
      fileSize: 'Coming Soon',
      downloadUrl: '#',
      filename: '',
      description: 'Streamlined warehouse and dark store operating system. Scan incoming inventory, manage order picking queues with digital checklists, and hand off packed orders to riders.',
      features: [
        'Barcode scanner for fast picking & inventory audit',
        'Automated order queue with item location bin mapping',
        'Real-time low stock alerts & dark store refilling',
        'Staff shift management & picker productivity stats'
      ]
    },
    {
      id: 'merchant-app',
      category: 'merchant',
      title: 'CartIT Merchant & Supplier App',
      subtitle: 'For Supermarket Owners & FMCG Brands',
      icon: BarChart3,
      appIconUrl: '/app_logo.png',
      accentColor: 'from-amber-400 to-orange-600',
      badgeColor: 'bg-amber-400/20 text-amber-400 border-amber-400/40',
      status: 'COMING SOON 🚀',
      isAvailable: false,
      version: 'v3.0 (In Development)',
      fileSize: 'Coming Soon',
      downloadUrl: '#',
      filename: '',
      description: 'Comprehensive business mobile app for supermarket owners and FMCG brand suppliers. Monitor live sales, update product catalog prices, and track automated weekly settlements.',
      features: [
        'Live multi-store sales & revenue analytics',
        'Dynamic price override & inventory sync engine',
        'Supplier purchase orders & bulk stock inflow',
        'Automated GST invoicing & RBI compliant payouts'
      ]
    }
  ];

  const filteredApps = staffApps.filter(app => selectedRole === 'all' || app.category === selectedRole);

  return (
    <section id="staff-portal" className="py-20 md:py-28 border-b border-[#1F382B] bg-gradient-to-b from-[#0A0F0D] via-[#0D2117] to-[#0A0F0D] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141F1A] border border-[#1F382B] text-xs text-[#9EBAAA]">
              <Users className="w-4 h-4 text-[#00B259]" />
              <span className="text-[#00B259] font-bold uppercase tracking-wider font-mono">
                Staff & Partner Ecosystem
              </span>
              <span className="text-[#1F382B]">·</span>
              <span className="text-white font-medium">Internal & Fleet Download Portal</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display">
              CartIT Staff Apps & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B259] via-[#35E59A] to-[#FF9800]">
                Partner Operations Suite.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#9EBAAA] leading-relaxed">
              Dedicated mobile applications engineered for delivery riders, dark store managers, order pickers, and supermarket merchant partners.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="p-4 rounded-2xl bg-[#141F1A] border border-[#1F382B] flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-[#00B259]/20 border border-[#00B259]/40 flex items-center justify-center text-[#00B259]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-[#9EBAAA]">Enterprise Security</div>
              <div className="text-sm font-bold text-white">256-bit Encrypted Staff Auth</div>
              <div className="text-[10px] text-[#00B259] font-mono mt-0.5">Verified APK Builds</div>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-[#1F382B]">
          {[
            { id: 'all', label: 'All Staff Apps', count: 3 },
            { id: 'delivery', label: 'Delivery Riders & Fleet', count: 1 },
            { id: 'store', label: 'Dark Store & Pickers', count: 1 },
            { id: 'merchant', label: 'Merchants & Suppliers', count: 1 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedRole(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                selectedRole === tab.id
                  ? 'bg-[#00B259] text-white shadow-md shadow-emerald-500/20'
                  : 'bg-[#141F1A] text-[#9EBAAA] hover:text-white border border-[#1F382B]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                selectedRole === tab.id ? 'bg-black/30 text-white' : 'bg-[#0A0F0D] text-[#9EBAAA]'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Staff Apps Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredApps.map((app) => {
            const IconComp = app.icon;

            return (
              <div 
                key={app.id} 
                className="p-6 rounded-2xl bg-[#141F1A] border border-[#1F382B] flex flex-col justify-between hover:border-[#00B259]/60 transition-all duration-300 shadow-xl group relative overflow-hidden"
              >
                {/* Header Top Glow */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${app.accentColor}`} />

                <div className="space-y-5">
                  {/* Top Bar */}
                  <div className="flex items-start justify-between">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.accentColor} p-0.5 shadow-lg flex items-center justify-center text-white shrink-0`}>
                      <div className="w-full h-full bg-[#0A0F0D] rounded-[14px] flex items-center justify-center overflow-hidden p-1">
                        <img src={app.appIconUrl} alt={`${app.title} Icon`} className="w-full h-full object-cover rounded-lg" />
                      </div>
                    </div>

                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${app.badgeColor}`}>
                      {app.status}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-extrabold text-white group-hover:text-[#00B259] transition-colors">
                      {app.title}
                    </h3>
                    <p className="text-xs font-medium text-[#FF9800] mt-0.5">{app.subtitle}</p>
                    <p className="text-xs text-[#9EBAAA] mt-3 leading-relaxed">
                      {app.description}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2 pt-2 border-t border-[#1F382B]">
                    <div className="text-[11px] font-bold text-white uppercase tracking-wider font-mono">
                      Key Staff Capabilities:
                    </div>
                    {app.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#9EBAAA]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00B259] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="pt-6 mt-6 border-t border-[#1F382B] space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-[#9EBAAA] font-mono">
                    <span>Version: <strong className="text-white">{app.version}</strong></span>
                    <span>Size: <strong className="text-white">{app.fileSize}</strong></span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {app.isAvailable ? (
                      <a
                        href={app.downloadUrl}
                        download={app.filename}
                        type="application/vnd.android.package-archive"
                        className="w-full flex items-center justify-center gap-2 py-3 bg-[#00B259] hover:bg-[#008040] text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Android APK ({app.fileSize})</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => alert(`${app.title} is currently under active development and coming soon! 🚀 Please download the CartIT Delivery Rider App (APK) available now.`)}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-[#0A0F0D] hover:bg-[#1F382B] text-[#9EBAAA] hover:text-white border border-[#1F382B] font-bold rounded-xl text-xs transition-all cursor-pointer opacity-90"
                      >
                        <Clock className="w-4 h-4 text-[#FF9800]" />
                        <span>{app.title.split(' ')[1]} App - Coming Soon 🚀</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Note Banner for Staff */}
        <div className="p-4 rounded-2xl bg-[#0A0F0D] border border-[#1F382B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9EBAAA]">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-[#FF9800] shrink-0" />
            <div>
              <strong className="text-white font-semibold">Staff Authorization Notice:</strong> CartIT Staff & Rider applications require active Employee ID or Fleet Partner Login credentials issued by CartIT Operations team.
            </div>
          </div>
          
          <a
            href="mailto:operations@cartit.in"
            className="px-4 py-2 rounded-xl bg-[#141F1A] hover:bg-[#1F382B] text-white border border-[#1F382B] text-xs font-bold transition-all shrink-0 cursor-pointer"
          >
            Contact Ops Support
          </a>
        </div>

      </div>
    </section>
  );
};
