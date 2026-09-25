import React, { useState } from 'react';
import { 
  Bike, 
  Download, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  Lock,
  Sparkles
} from 'lucide-react';

interface StaffPortalSectionProps {
  onOpenQR?: () => void;
}

export const StaffPortalSection: React.FC<StaffPortalSectionProps> = ({ onOpenQR }) => {
  const [selectedRole, setSelectedRole] = useState<'all' | 'admin' | 'delivery'>('all');

  const staffApps = [
    {
      id: 'admin-app',
      category: 'admin',
      title: 'CartIT Admin App',
      subtitle: 'For Store Owners, Catalog Managers & Administrators',
      icon: ShieldCheck,
      appIconUrl: '/app_logo.png',
      accentColor: 'from-[#3B82F6] to-[#1D4ED8]',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
      status: 'AVAILABLE APK',
      isAvailable: true,
      version: 'v1.0.0 (Build 1)',
      fileSize: '78.7 MB',
      downloadUrl: '/cartit-admin-release.apk',
      filename: 'CartIT-Admin-App.apk',
      description: 'Official management application for CartIT administrators. Add & update product catalog, adjust stock levels, manage store categories, and view live order analytics.',
      features: [
        'Catalog management (Add/edit products, prices & stock)',
        'Live order queue & dispatch monitoring',
        'Category, brand & store inventory management',
        'Real-time store analytics & revenue metrics'
      ]
    },
    {
      id: 'delivery-app',
      category: 'delivery',
      title: 'CartIT Delivery Rider App',
      subtitle: 'For Fleet Executives & Delivery Partners',
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
      description: 'Official mobile application for CartIT delivery partners. Receive real-time order dispatch alerts, turn-by-turn route navigation, and track daily earnings.',
      features: [
        'Real-time GPS order dispatch & route navigation',
        '10-15 Min SLA timer & customer address locator',
        'OTP delivery confirmation & cash collection',
        'Daily earnings dashboard with instant bank payout'
      ]
    }
  ];

  const filteredApps = staffApps.filter(app => selectedRole === 'all' || app.category === selectedRole);

  return (
    <section id="staff-portal" className="py-20 md:py-28 border-b border-[#1F382B] bg-gradient-to-b from-[#0A0F0D] via-[#0D2117] to-[#0A0F0D] text-white">
      <div id="admin-portal" className="scroll-mt-20" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141F1A] border border-[#1F382B] text-xs text-[#9EBAAA]">
              <Users className="w-4 h-4 text-[#00B259]" />
              <span className="text-[#00B259] font-bold uppercase tracking-wider font-mono">
                Staff & Operations Suite
              </span>
              <span className="text-[#1F382B]">·</span>
              <span className="text-white font-medium">Internal Apps Portal</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display">
              CartIT Admin & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#00B259] to-[#FF9800]">
                Delivery Operations Suite.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#9EBAAA] leading-relaxed">
              Official mobile applications engineered for CartIT store administrators, catalog managers, and delivery fleet riders.
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
            { id: 'all', label: 'All Operations Apps', count: 2 },
            { id: 'admin', label: 'Admin App', count: 1 },
            { id: 'delivery', label: 'Delivery Rider App', count: 1 },
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

        {/* Clean 2-Column Grid for Real Downloadable Apps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredApps.map((app) => (
            <div 
              key={app.id} 
              className="p-6 rounded-2xl bg-[#141F1A] border border-[#1F382B] flex flex-col justify-between hover:border-[#00B259]/60 transition-all duration-300 shadow-xl group relative overflow-hidden"
            >
              {/* Header Top Glow */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${app.accentColor}`} />

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
                  <h3 className="text-xl font-extrabold text-white group-hover:text-[#00B259] transition-colors flex items-center gap-2">
                    <span>{app.title}</span>
                  </h3>
                  <p className="text-xs font-medium text-[#FF9800] mt-0.5">{app.subtitle}</p>
                  <p className="text-xs text-[#9EBAAA] mt-3 leading-relaxed">
                    {app.description}
                  </p>
                </div>

                {/* Feature Checklist */}
                <div className="space-y-2 pt-2 border-t border-[#1F382B]">
                  <div className="text-[11px] font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#00B259]" />
                    <span>Key App Features:</span>
                  </div>
                  {app.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#9EBAAA]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00B259] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Download Button */}
              <div className="pt-6 mt-6 border-t border-[#1F382B] space-y-3">
                <div className="flex items-center justify-between text-[11px] text-[#9EBAAA] font-mono">
                  <span>Version: <strong className="text-white">{app.version}</strong></span>
                  <span>Size: <strong className="text-white">{app.fileSize}</strong></span>
                </div>

                <a
                  href={app.downloadUrl}
                  download={app.filename}
                  type="application/vnd.android.package-archive"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#00B259] hover:bg-[#008040] text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download {app.title} ({app.fileSize})</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Security Note Banner */}
        <div className="p-4 rounded-2xl bg-[#0A0F0D] border border-[#1F382B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9EBAAA]">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-[#FF9800] shrink-0" />
            <div>
              <strong className="text-white font-semibold">Staff Authorization Notice:</strong> CartIT Admin & Delivery applications require active Administrator or Fleet Partner credentials issued by CartIT Operations.
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
