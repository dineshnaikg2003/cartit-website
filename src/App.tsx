/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LiveActivityTicker } from './components/LiveActivityTicker';
import { AboutSection } from './components/AboutSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { SavingsCalculator } from './components/SavingsCalculator';
import { StoreFinder } from './components/StoreFinder';
import { DownloadSection } from './components/DownloadSection';
import { StaffPortalSection } from './components/StaffPortalSection';
import { CustomerSupportSection } from './components/CustomerSupportSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import { QRModal } from './components/QRModal';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const handleOpenDownloadSection = () => {
    const el = document.getElementById('download');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Bar Navigation (Support Chat removed as requested) */}
      <Navbar
        onOpenDownloadModal={handleOpenDownloadSection}
        onOpenQR={() => setIsQRModalOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        <HeroSection
          onOpenDownload={handleOpenDownloadSection}
          onOpenQR={() => setIsQRModalOpen(true)}
        />

        {/* Live Store Activity Ticker with Real-Time Scan Updates */}
        <LiveActivityTicker />

        <AboutSection />

        <HowItWorksSection />

        <div id="simulator" className="scroll-mt-20" />

        {/* Interactive Savings & Time ROI Calculator */}
        <div id="calculator" className="scroll-mt-20">
          <SavingsCalculator onOpenDownload={handleOpenDownloadSection} />
        </div>

        {/* Interactive Store Network Locator */}
        <div id="stores" className="scroll-mt-20">
          <StoreFinder />
        </div>

        <DownloadSection onOpenQR={() => setIsQRModalOpen(true)} />

        {/* Staff & Rider Application Download Portal */}
        <StaffPortalSection onOpenQR={() => setIsQRModalOpen(true)} />

        <CustomerSupportSection onOpenLiveChat={() => setIsChatOpen(true)} />

        <FAQSection onOpenChat={() => setIsChatOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        onOpenDownload={handleOpenDownloadSection}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Floating Interactive Customer Support Chat Widget (Still available at bottom right) */}
      <ChatWidget
        isOpen={isChatOpen}
        onOpen={() => setIsChatOpen(true)}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Mobile QR Code Modal */}
      <QRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />
    </div>
  );
}
