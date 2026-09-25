/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LiveActivityTicker } from './components/LiveActivityTicker';
import { AboutSection } from './components/AboutSection';
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
      {/* Top Bar Navigation */}
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

        {/* Customer Download Section */}
        <DownloadSection onOpenQR={() => setIsQRModalOpen(true)} />

        {/* Admin & Rider Operations Suite Download Portal */}
        <StaffPortalSection onOpenQR={() => setIsQRModalOpen(true)} />

        <CustomerSupportSection onOpenLiveChat={() => setIsChatOpen(true)} />

        <FAQSection onOpenChat={() => setIsChatOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        onOpenDownload={handleOpenDownloadSection}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Floating Support Chat Widget */}
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
