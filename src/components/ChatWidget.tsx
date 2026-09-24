import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  CornerDownLeft, 
  Download, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles,
  Headphones,
  CheckCheck,
  Receipt,
  Star,
  PhoneCall,
  CheckCircle2,
  Bike,
  Tag,
  ShoppingBag
} from 'lucide-react';
import { SupportMessage } from '../types';
import { SUPPORT_KNOWLEDGE_BASE, MOCK_RECEIPTS, MockReceiptRecord } from '../data/mockData';
import { playScanBeep, playSuccessChime } from '../utils/audio';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose, onOpen }) => {
  const [messages, setMessages] = useState<SupportMessage[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      agentName: 'CartIT Customer Support',
      text: 'Namaste! Welcome to CartIT Support. I can help you track active orders, apply store coupons (SAVE100), answer shopping & delivery queries, or look up tax invoices!',
      timestamp: 'Just now',
      quickReplies: [
        '📦 Track active order (#ORD-8924)',
        '🏷️ Which coupons can I use right now?',
        '💵 What payment methods are supported?',
        '🥑 Are vegetables & milk 100% fresh?',
        '📄 Look up receipt #CT-82914',
        '👤 Talk to a human representative',
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isHumanAgent, setIsHumanAgent] = useState(false);
  const [agentName, setAgentName] = useState('CartIT Assistant');
  const [showRating, setShowRating] = useState(false);
  const [ratingValue, setRatingValue] = useState<number | null>(null);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [foundReceipt, setFoundReceipt] = useState<MockReceiptRecord | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMessage: SupportMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue('');

    // Trigger typing state
    setIsTyping(true);

    setTimeout(() => {
      let replyText = '';
      let replies: string[] | undefined;
      let newAgentName = agentName;

      const lower = text.toLowerCase();

      // Category 1: Active Order Tracking & Delivery Queries
      if (lower.includes('ord-8924') || lower.includes('track') || lower.includes('where is my order') || lower.includes('rider') || lower.includes('delivery status')) {
        replyText = '📦 Active Order Status (#ORD-8924):\nStatus: OUT FOR DELIVERY\nRider: Ramesh Kumar (📱 +91 98765 43210)\nETA: 11 Minutes\nYour order has been packed at Smart Bazaar Dark Store and is en route to your doorstep!';
        replies = ['Call delivery rider', 'Cancel or modify order', 'I have a problem with items'];
      }
      // Category 2: Order Cancellation & Instant Refunds
      else if (lower.includes('cancel') || lower.includes('refund') || lower.includes('return') || lower.includes('damaged') || lower.includes('missing')) {
        replyText = '🛡️ Refund & Cancellation Policy:\nIf an order is cancelled or any item (like fresh produce or dairy) is unsatisfactory, CartIT provides an INSTANT 100% refund back to your original payment method (UPI / Card) within 60 seconds!';
        replies = ['Request instant refund', 'Report damaged item', 'Talk to a human representative'];
      }
      // Category 3: Store Coupons & Promos
      else if (lower.includes('coupon') || lower.includes('code') || lower.includes('save100') || lower.includes('cartit10') || lower.includes('discount') || lower.includes('promo')) {
        replyText = '🏷️ Active CartIT Store Coupons:\n1) SAVE100 — Flat ₹100 OFF on orders above ₹300.\n2) CARTIT10 — Extra 10% OFF on Fresh Produce & Dairy.\n3) SUPERFIRST — Free delivery for first 5 orders.\nJust enter the code in your cart before checkout!';
        replies = ['How do I apply a coupon code?', 'Is there a minimum order limit?', 'Track my order (#ORD-8924)'];
      }
      // Category 4: Shopping, Freshness & Product Queries
      else if (lower.includes('fresh') || lower.includes('milk') || lower.includes('vegetables') || lower.includes('produce') || lower.includes('atta') || lower.includes('quality')) {
        replyText = '🥑 Freshness Guarantee:\nAll farm-fresh vegetables, organic fruits, daily milk, paneer, and staples are sourced directly from certified organic hubs with 100% Quality Assurance. If any item is not fresh, we replace or refund it immediately.';
        replies = ['Which coupons are active?', 'What payment options are available?', 'Talk to a human agent'];
      }
      // Category 5: Payment Options
      else if (lower.includes('payment') || lower.includes('upi') || lower.includes('gpay') || lower.includes('phonepe') || lower.includes('cod') || lower.includes('card')) {
        replyText = '💵 Supported Payment Methods:\n• 1-Tap UPI (Google Pay, PhonePe, Paytm, BHIM, CRED)\n• Credit & Debit Cards (RuPay, Visa, Mastercard)\n• Cash on Delivery (COD)\nAll transactions are 100% PCI-DSS encrypted.';
        replies = ['Track active order (#ORD-8924)', 'Look up receipt #CT-82914', 'Talk to Priya Nair'];
      }
      // Category 6: Receipt & Invoice Lookup
      else if (text.match(/CT-\d{5}/i) || lower.includes('receipt') || lower.includes('invoice')) {
        const receiptMatch = text.match(/CT-\d{5}/i) || ['CT-82914'];
        const receiptCode = receiptMatch[0].toUpperCase();
        const receiptData = MOCK_RECEIPTS[receiptCode] || MOCK_RECEIPTS['CT-82914'];
        setFoundReceipt(receiptData);
        replyText = `📄 Digital GST Receipt #${receiptCode}:\nStore: ${receiptData.store}\nTotal: ₹${receiptData.total}\nPayment: ${receiptData.paymentMethod}\nAn itemized GST tax invoice PDF is ready for view below!`;
        replies = ['Download PDF invoice', 'Request item refund', 'Talk to a human agent'];
      }
      // Category 7: Human Handover
      else if (lower.includes('human') || lower.includes('agent') || lower.includes('priya') || lower.includes('representative') || lower.includes('person')) {
        setIsHumanAgent(true);
        newAgentName = 'Priya Nair (Senior Support Lead, Bengaluru)';
        setAgentName(newAgentName);
        replyText = "Namaste! I am Priya Nair from CartIT Customer Success team in Bengaluru. I have taken over this chat to personally resolve your order or shopping query.";
        replies = ['Where is order #ORD-8924?', 'I want a refund for damaged item', 'Help with payment issue'];
      }
      // Category 8: Greetings
      else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        replyText = 'Hello! How can I assist your grocery shopping or active order today? Feel free to ask about order tracking, instant coupons (SAVE100), or product availability.';
        replies = ['Track active order (#ORD-8924)', 'Which coupons are active?', 'Are vegetables 100% fresh?'];
      }
      // Category 9: Thank You
      else if (lower.includes('thank')) {
        replyText = "You're very welcome! We are committed to making your grocery shopping fast, fresh, and seamless. Have a great day with CartIT!";
        setShowRating(true);
      }
      // Default fallback
      else {
        const matchedEntry = SUPPORT_KNOWLEDGE_BASE.find((entry) =>
          entry.keywords.some((kw) => lower.includes(kw))
        );

        if (matchedEntry) {
          replyText = matchedEntry.response;
          replies = ['Track active order (#ORD-8924)', 'View available coupons', 'Talk to human agent'];
        } else {
          replyText = `Thank you for reaching out regarding "${text}". Our support team is available 24/7. You can track active orders, apply coupons, or speak directly with our Senior Agent Priya Nair.`;
          replies = ['Speak to Priya Nair (Human Agent)', 'Track order (#ORD-8924)', 'View active coupons'];
        }
      }

      const agentReply: SupportMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        agentName: newAgentName,
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies: replies,
      };

      setMessages((prev) => [...prev, agentReply]);
      setIsTyping(false);
      if (soundEnabled) playSuccessChime();
    }, 600);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'msg-reset',
        sender: 'agent',
        agentName: 'CartIT Support',
        text: 'Chat history reset. How can we help with your order or grocery shopping right now?',
        timestamp: 'Just now',
        quickReplies: [
          '📦 Track active order (#ORD-8924)',
          '🏷️ Which coupons can I use right now?',
          '💵 What payment methods are supported?',
        ],
      },
    ]);
    setIsHumanAgent(false);
    setAgentName('CartIT Assistant');
    setFoundReceipt(null);
    setShowRating(false);
    setRatingSubmitted(false);
  };

  const handleDownloadTranscript = () => {
    const transcript = messages
      .map(
        (m) =>
          `[${m.timestamp}] ${m.sender === 'user' ? 'Customer' : m.agentName || 'Agent'}: ${m.text}`
      )
      .join('\n\n');

    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CartIT-Support-Transcript-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Floating launcher trigger button when closed */}
      {!isOpen && (
        <button
          onClick={onOpen}
          aria-label="Open CartIT Customer Support Chat"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#141F1A] hover:bg-[#1F382B] text-white border border-[#00B259]/50 rounded-full shadow-2xl shadow-emerald-500/20 transition-all hover:scale-105 cursor-pointer group"
        >
          <div className="relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B259] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00B259]"></span>
          </div>
          <MessageSquare className="w-5 h-5 text-[#00B259] group-hover:rotate-6 transition-transform" />
          <span className="text-xs font-bold pr-1">Support & Order Chat</span>
        </button>
      )}

      {/* Chat Window Container */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[600px] max-h-[85vh] bg-[#0A0F0D] border border-[#1F382B] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="p-3.5 bg-[#141F1A] border-b border-[#1F382B] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-[#00B259]/20 border border-[#00B259]/40 flex items-center justify-center text-[#00B259]">
                <img src="/app_logo.png" alt="CartIT Logo" className="w-6 h-6 rounded-full object-cover" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00B259] border-2 border-[#0A0F0D]"></span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{agentName}</span>
                  {isHumanAgent && (
                    <span className="text-[10px] text-[#00B259] font-normal">· Live Agent</span>
                  )}
                </h4>
                <p className="text-[10px] text-[#9EBAAA]">CartIT Customer Support · 24/7 Instant Response</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? 'Mute sound' : 'Enable sound'}
                className="p-1.5 text-[#9EBAAA] hover:text-white rounded-lg hover:bg-[#1F382B] transition-colors cursor-pointer"
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-neutral-600" />}
              </button>

              <button
                onClick={handleDownloadTranscript}
                title="Download chat transcript"
                className="p-1.5 text-[#9EBAAA] hover:text-white rounded-lg hover:bg-[#1F382B] transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleClearChat}
                title="Clear history"
                className="p-1.5 text-[#9EBAAA] hover:text-white rounded-lg hover:bg-[#1F382B] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onClose}
                aria-label="Close Chat"
                className="p-1.5 text-[#9EBAAA] hover:text-white rounded-lg hover:bg-[#1F382B] transition-colors ml-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs custom-scrollbar">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                >
                  {!isUser && (
                    <span className="text-[10px] text-[#9EBAAA] font-medium px-1">
                      {msg.agentName || 'CartIT Support'}
                    </span>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed whitespace-pre-line ${
                      isUser
                        ? 'bg-[#00B259] text-white font-medium rounded-tr-xs shadow-md'
                        : 'bg-[#141F1A] border border-[#1F382B] text-white rounded-tl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  <span className="text-[9px] text-[#9EBAAA] px-1 font-mono">
                    {msg.timestamp}
                  </span>

                  {/* Optional Quick Reply Chips */}
                  {!isUser && msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1.5 max-w-[95%]">
                      {msg.quickReplies.map((reply, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(reply)}
                          className="px-2.5 py-1 rounded-md bg-[#141F1A] hover:bg-[#1F382B] border border-[#1F382B] hover:border-[#00B259]/50 text-[11px] text-[#9EBAAA] hover:text-white transition-colors cursor-pointer text-left font-medium"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Receipt Preview Box */}
            {foundReceipt && (
              <div className="p-3 rounded-xl bg-[#141F1A] border border-[#00B259]/50 space-y-2 text-xs">
                <div className="flex items-center justify-between pb-1.5 border-b border-[#1F382B]">
                  <span className="font-bold text-[#00B259] flex items-center gap-1">
                    <Receipt className="w-3.5 h-3.5" /> Receipt Verified #{foundReceipt.id}
                  </span>
                  <span className="text-[10px] text-[#9EBAAA] font-mono">{foundReceipt.date}</span>
                </div>

                <div className="space-y-1 text-[11px]">
                  {foundReceipt.items.map((it, i) => (
                    <div key={i} className="flex justify-between text-[#9EBAAA]">
                      <span>{it.name} (x{it.qty})</span>
                      <span className="text-white font-mono">₹{it.price}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-extrabold text-white pt-1 border-t border-[#1F382B]">
                    <span>Total Amount Paid:</span>
                    <span className="text-[#00B259] font-mono">₹{foundReceipt.total}</span>
                  </div>
                </div>

                <a
                  href="/cartit-release.apk"
                  download
                  className="w-full py-1.5 bg-[#00B259] hover:bg-[#008040] text-white font-bold text-[10px] rounded-lg text-center block transition-all"
                >
                  Download Itemized Tax Invoice PDF
                </a>
              </div>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-[#9EBAAA] text-xs">
                <span className="w-2 h-2 rounded-full bg-[#00B259] animate-ping"></span>
                <span>CartIT Assistant is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Rating Prompt */}
          {showRating && !ratingSubmitted && (
            <div className="p-3 bg-[#141F1A] border-t border-[#1F382B] text-center space-y-2">
              <span className="text-xs font-bold text-white">Rate your support experience:</span>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => {
                      setRatingValue(star);
                      setRatingSubmitted(true);
                      playSuccessChime();
                    }}
                    className="p-1 text-[#FF9800] hover:scale-125 transition-transform cursor-pointer"
                  >
                    <Star className="w-5 h-5 fill-current" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {ratingSubmitted && (
            <div className="p-2 bg-[#00B259]/20 text-[#00B259] text-center text-xs font-bold border-t border-[#00B259]/30">
              Thank you for rating us {ratingValue} ★! Your feedback improves CartIT.
            </div>
          )}

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#141F1A] border-t border-[#1F382B] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about order #ORD-8924, coupons, or products..."
              className="flex-1 bg-[#0A0F0D] border border-[#1F382B] rounded-xl px-3 py-2 text-xs text-white placeholder-[#9EBAAA]/70 focus:outline-none focus:border-[#00B259] transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2 bg-[#00B259] disabled:opacity-40 hover:bg-[#008040] text-white rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-500/20 shrink-0"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
