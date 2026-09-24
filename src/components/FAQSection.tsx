import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle, MessageSquare, X, Sparkles } from 'lucide-react';
import { FAQ_LIST } from '../data/mockData';

interface FAQSectionProps {
  onOpenChat: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenChat }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const categories = ['All', 'Shoppers', 'Payment & Security', 'Store Partners', 'Troubleshooting'];

  const filteredFaqs = FAQ_LIST.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesQuery =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="faq" className="py-20 md:py-28 border-b border-neutral-800 bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>05. Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
            Everything you need to know about CartIT.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Clear answers about in-store scanning, digital payment safety, supermarket integrations, and support.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Category Segmented Bar */}
            <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-neutral-800 text-white shadow-sm ring-1 ring-emerald-500/40 font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Box with Clear Button */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-9 pr-8 py-1.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Accordion List with Smooth Grid Row Transition */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-neutral-900/40 rounded-2xl border border-neutral-800 text-neutral-400 text-sm">
              No questions found matching "{searchQuery}".
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="ml-2 text-emerald-400 underline cursor-pointer"
              >
                Reset filter
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-xl transition-all duration-300 border ${
                    isOpen 
                      ? 'bg-neutral-900/90 border-emerald-500/40 shadow-sm shadow-emerald-500/5' 
                      : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/70'
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono shrink-0 font-medium">
                        {faq.category}
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-white">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-emerald-400' : ''
                      }`}
                    />
                  </button>

                  {/* Smooth height transition using grid */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-5 pt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions banner */}
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left transition-all hover:border-neutral-700">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Still have a question or need personalized assistance?
            </h4>
            <p className="text-xs text-neutral-400">
              Our live customer care specialists are available on web chat with instant answers.
            </p>
          </div>
          <button
            onClick={onOpenChat}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-bold rounded-xl text-xs transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-md shadow-emerald-500/20 shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open Support Assistant</span>
          </button>
        </div>

      </div>
    </section>
  );
};
