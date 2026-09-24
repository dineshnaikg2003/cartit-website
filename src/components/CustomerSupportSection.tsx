import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Clock, 
  Mail, 
  Phone, 
  HelpCircle, 
  CheckCircle2, 
  FileText, 
  AlertCircle,
  Headphones
} from 'lucide-react';
import { SupportTicket } from '../types';

interface CustomerSupportSectionProps {
  onOpenLiveChat: () => void;
}

export const CustomerSupportSection: React.FC<CustomerSupportSectionProps> = ({ onOpenLiveChat }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'scanner_app_issue',
    orderNumber: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<SupportTicket | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email address, and inquiry description.');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    // Simulate ticket creation
    setTimeout(() => {
      const newTicket: SupportTicket = {
        id: `CIT-${Math.floor(10000 + Math.random() * 90000)}`,
        name: formData.name,
        email: formData.email,
        category: formData.category,
        orderNumber: formData.orderNumber || 'N/A',
        subject: formData.subject || 'CartIT Support Inquiry',
        message: formData.message,
        status: 'received',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setSubmittedTicket(newTicket);
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        category: 'scanner_app_issue',
        orderNumber: '',
        subject: '',
        message: '',
      });
    }, 800);
  };

  return (
    <section id="support" className="py-20 md:py-28 border-b border-neutral-800 bg-neutral-900/40 text-neutral-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <span>04. Customer Support</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display">
              We’re here to help you shop without friction.
            </h2>
            <p className="text-base sm:text-lg text-neutral-300">
              Need assistance with barcode scanning, receipts, store turnstile exit, or supermarket compatibility?
              Connect with our dedicated support specialists 24 hours a day, 7 days a week.
            </p>
          </div>

          {/* Live Status indicator */}
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center gap-3 shrink-0">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <div className="text-xs">
              <span className="font-semibold text-white block">Support Specialists Online</span>
              <span className="text-neutral-400 font-mono">Average response: &lt; 2 minutes</span>
            </div>
          </div>
        </div>

        {/* 2-Column Support Hub: Live Chat Feature Box + Ticket Desk */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Live Chat & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Chat Banner */}
            <div className="p-7 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-emerald-950/30 border border-neutral-800 space-y-5">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <MessageSquare className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Live In-App & Web Chat</h3>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                  Connect immediately with our team. Real-time troubleshooting for barcode issues, receipts, digital coupons, and store access.
                </p>
              </div>

              <div className="p-3 bg-neutral-950/70 rounded-xl border border-neutral-800 text-xs text-neutral-300 space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Available 24/7/365 across all timezones</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Automated self-service or human agent transfer</span>
                </div>
              </div>

              <button
                onClick={onOpenLiveChat}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-emerald-500/10"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open Live Support Chat Now</span>
              </button>
            </div>

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>Email Support Desk</span>
                </div>
                <a
                  href="mailto:support@cartit.in"
                  className="text-sm font-semibold text-white hover:text-emerald-400 transition-colors block font-mono"
                >
                  support@cartit.in
                </a>
                <span className="text-[11px] text-neutral-500 block">Response within 30 minutes</span>
              </div>

              <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>India Toll-Free Helpline</span>
                </div>
                <div className="text-sm font-semibold text-white font-mono">
                  1800-120-CART / +91 80 4920 8400
                </div>
                <span className="text-[11px] text-neutral-500 block">Mon–Sun 7:00 AM – 11:00 PM IST (Bengaluru Hub)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Support Ticket Desk */}
          <div className="lg:col-span-7 p-7 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                Submit a Support Ticket
              </h3>
              <p className="text-xs text-neutral-400">
                For detailed transaction investigations, store partner queries, or app bug reports.
              </p>
            </div>

            {submittedTicket ? (
              /* Ticket confirmation receipt */
              <div className="p-6 rounded-xl bg-neutral-950 border border-emerald-500/40 space-y-4 animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Ticket Successfully Dispatched</h4>
                    <p className="text-xs text-neutral-400">Reference: <span className="text-emerald-400 font-mono font-bold">{submittedTicket.id}</span></p>
                  </div>
                </div>

                <div className="p-3 bg-neutral-900 rounded-lg text-xs space-y-2 border border-neutral-800">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Submitted By:</span>
                    <span className="text-white font-medium">{submittedTicket.name} ({submittedTicket.email})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Category:</span>
                    <span className="text-neutral-200 capitalize">{submittedTicket.category.replace(/_/g, ' ')}</span>
                  </div>
                  {submittedTicket.orderNumber !== 'N/A' && (
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Order/Receipt ID:</span>
                      <span className="text-neutral-200 font-mono">{submittedTicket.orderNumber}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-neutral-800 text-neutral-300">
                    <span className="text-neutral-400 block mb-1">Inquiry Summary:</span>
                    <p className="italic">"{submittedTicket.message}"</p>
                  </div>
                </div>

                <p className="text-xs text-neutral-400">
                  A verification confirmation has been sent to your email. One of our retail specialists will follow up shortly.
                </p>

                <button
                  onClick={() => setSubmittedTicket(null)}
                  className="w-full py-2 bg-neutral-800 hover:bg-neutral-800 text-xs font-semibold text-neutral-200 rounded-lg transition-colors cursor-pointer"
                >
                  Submit Another Ticket
                </button>
              </div>
            ) : (
              /* Ticket Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-lg text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300">
                      Your Full Name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300">
                      Email Address <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-neutral-200 focus:outline-none focus:border-emerald-500 transition-colors"
                    >
                      <option value="scanner_app_issue">Camera / Barcode Scanner Issue</option>
                      <option value="payment_receipt">Payment, Receipt or Refund</option>
                      <option value="turnstile_exit">Store Turnstile / Exit Barrier</option>
                      <option value="partner_onboarding">Retail Store Partner Onboarding</option>
                      <option value="general_feedback">Feature Request / Feedback</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300">
                      Order or Receipt Number <span className="text-neutral-500 text-[10px]">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.orderNumber}
                      onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                      placeholder="e.g. CT-82914"
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 font-mono transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief summary of your question"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300">
                    Detailed Message <span className="text-emerald-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe what occurred, including the store location and product names if relevant..."
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 resize-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-neutral-100 hover:bg-white text-neutral-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Dispatching ticket to support queue...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Support Ticket</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
