import React, { useState } from 'react';
import { Store, MapPin, Clock, CheckCircle2, ShieldCheck, ArrowUpRight, Search, PlusCircle, Sparkles } from 'lucide-react';
import { PARTNER_STORES_DATA, PartnerStoreLocation } from '../data/mockData';
import { playScanBeep } from '../utils/audio';

interface StoreFinderProps {
  onSelectStore?: (store: PartnerStoreLocation) => void;
}

export const StoreFinder: React.FC<StoreFinderProps> = ({ onSelectStore }) => {
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [checkedInStore, setCheckedInStore] = useState<string | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestStoreName, setRequestStoreName] = useState('');
  const [requestCity, setRequestCity] = useState('');
  const [requestSuccess, setRequestSuccess] = useState(false);

  const cities = ['All', 'Bengaluru', 'Mumbai', 'Delhi-NCR', 'Hyderabad', 'Pune', 'Chennai'];

  const filteredStores = PARTNER_STORES_DATA.filter((store) => {
    const matchesCity = selectedCity === 'All' || store.city === selectedCity;
    const matchesQuery =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.chain.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesQuery;
  });

  const handleCheckIn = (store: PartnerStoreLocation) => {
    playScanBeep();
    setCheckedInStore(store.name);
    if (onSelectStore) onSelectStore(store);

    setTimeout(() => {
      setCheckedInStore(null);
    }, 3500);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestStoreName.trim()) return;

    setRequestSuccess(true);
    setTimeout(() => {
      setRequestSuccess(false);
      setShowRequestModal(false);
      setRequestStoreName('');
      setRequestCity('');
    }, 2500);
  };

  return (
    <section id="store-finder" className="py-20 md:py-24 border-b border-neutral-800 bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <MapPin className="w-3.5 h-3.5" />
              <span>04. Indian Retail & Partner Supermarket Network</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
              Find a CartIT Express store near you
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base">
              Experience seamless scan-and-go shopping across 240+ partner branches in Bengaluru, Mumbai, Delhi-NCR, Hyderabad, Pune & Chennai.
            </p>
          </div>

          <button
            onClick={() => setShowRequestModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 text-xs font-semibold transition-all hover:border-emerald-500/50 cursor-pointer self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Request Your Local Supermarket</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* City Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedCity === city
                    ? 'bg-emerald-500 text-neutral-950 font-bold shadow-sm'
                    : 'bg-neutral-950/80 text-neutral-400 hover:text-white border border-neutral-800/80'
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search store name, street, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

        </div>

        {/* Live Check-in Feedback Notice */}
        {checkedInStore && (
          <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 flex items-center justify-between animate-fade-in shadow-lg shadow-emerald-950/40">
            <div className="flex items-center gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Simulated Check-In at <strong className="text-white">{checkedInStore}</strong>. Camera scanner is calibrated and ready.
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
              Connected
            </span>
          </div>
        )}

        {/* Store Grid with Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between space-y-5 hover:border-emerald-500/40 hover:bg-neutral-900/80 transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-500/5 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 group-hover:bg-emerald-500/20 transition-all">
                    <Store className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full font-medium">
                    {store.lanes} Express Gates
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {store.name}
                  </h3>
                  <p className="text-xs text-emerald-400 font-medium">{store.chain}</p>
                </div>

                <div className="space-y-1.5 text-xs text-neutral-300">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{store.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Clock className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    <span>{store.hours}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {store.features.map((feat, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-neutral-950 border border-neutral-800/80 rounded-md text-[10px] text-neutral-400"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  <span>Instant UPI Enabled</span>
                </span>

                <button
                  onClick={() => handleCheckIn(store)}
                  className="px-3.5 py-1.5 bg-neutral-800 hover:bg-emerald-400 hover:text-neutral-950 text-xs font-semibold rounded-lg text-neutral-200 transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <span>Test Store Check-In</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredStores.length === 0 && (
          <div className="text-center py-16 bg-neutral-900/30 rounded-2xl border border-neutral-800 space-y-3">
            <Store className="w-10 h-10 text-neutral-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No partner stores found</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              We couldn’t find stores matching "{searchQuery}". Try selecting "All" or request CartIT at your preferred retail store.
            </p>
            <button
              onClick={() => { setSelectedCity('All'); setSearchQuery(''); }}
              className="mt-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Modal: Request a Store */}
        {showRequestModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Store className="w-5 h-5 text-emerald-400" />
                  <span>Bring CartIT to Your Supermarket</span>
                </h3>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="text-neutral-500 hover:text-white text-lg p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {requestSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">Request Received!</h4>
                  <p className="text-xs text-neutral-400">
                    Our retail partner team in Bengaluru has logged your store request. We prioritize store outreach based on shopper demand!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  <p className="text-xs text-neutral-300">
                    Tell us which local supermarket or hypermarket you shop at so our business team can reach out for partnership integration.
                  </p>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300">Store / Chain Name:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Smart Bazaar, Reliance Fresh, More, Nature's Basket"
                      value={requestStoreName}
                      onChange={(e) => setRequestStoreName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300">City / Locality:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Koramangala Bengaluru, Andheri Mumbai, Noida"
                      value={requestCity}
                      onChange={(e) => setRequestCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowRequestModal(false)}
                      className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-bold rounded-xl cursor-pointer transition-colors"
                    >
                      Submit Store Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
