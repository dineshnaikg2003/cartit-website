import React, { useState } from 'react';
import { Clock, Sparkles, TrendingUp, ArrowRight, Zap, CheckCircle2, Tag } from 'lucide-react';

interface SavingsCalculatorProps {
  onOpenDownload: () => void;
}

export const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({ onOpenDownload }) => {
  const [ordersPerWeek, setOrdersPerWeek] = useState(3);
  const [traditionalMinutes, setTraditionalMinutes] = useState(35);
  const [averageSpend, setAverageSpend] = useState(1500); // in INR
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const formatAmount = (inrVal: number) => {
    if (currency === 'INR') {
      return `₹${inrVal.toLocaleString('en-IN')}`;
    }
    return `$${Math.round(inrVal * 0.012).toLocaleString()}`;
  };

  // Calculations
  const yearlyOrders = ordersPerWeek * 52;
  const hoursOnTraditionalStore = (yearlyOrders * traditionalMinutes) / 60;
  // CartIT delivery takes 0 mins of user travel time (delivered directly to doorstep)
  const hoursSaved = hoursOnTraditionalStore;
  const fullDaysReclaimed = (hoursSaved / 8).toFixed(1);

  // Auto coupon savings (e.g. SAVE100 & 10% store discounts average ~8.5% savings)
  const yearlySpend = yearlyOrders * averageSpend;
  const estimatedCouponSavings = yearlySpend * 0.085;

  return (
    <section className="py-20 md:py-24 border-b border-[#1F382B] bg-[#0A0F0D] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#00B259]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>03. Interactive Savings & Time Calculator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display">
              Calculate how much time and money CartIT saves your household.
            </h2>
            <p className="text-base sm:text-lg text-[#9EBAAA]">
              Slide the controls below to calculate your annual hours saved and instant store coupon discounts with CartIT.
            </p>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center gap-2 p-1 bg-[#141F1A] border border-[#1F382B] rounded-xl shrink-0 self-start md:self-auto">
            <span className="text-xs text-[#9EBAAA] pl-2">Currency:</span>
            <button
              onClick={() => setCurrency('INR')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                currency === 'INR' ? 'bg-[#00B259] text-white shadow-sm' : 'text-[#9EBAAA] hover:text-white'
              }`}
            >
              ₹ INR (India)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                currency === 'USD' ? 'bg-[#00B259] text-white shadow-sm' : 'text-[#9EBAAA] hover:text-white'
              }`}
            >
              $ USD (Global)
            </button>
          </div>
        </div>

        {/* Interactive Calculator Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Sliders */}
          <div className="lg:col-span-6 p-8 rounded-2xl bg-[#141F1A] border border-[#1F382B] space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#00B259]" />
                Your Weekly Grocery Routine
              </h3>

              {/* Slider 1: Orders per week */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="orders-slider" className="font-semibold text-white">
                    Grocery orders per week:
                  </label>
                  <span className="font-mono text-[#00B259] font-bold text-sm bg-[#0A0F0D] px-2.5 py-1 rounded-lg border border-[#1F382B]">
                    {ordersPerWeek} {ordersPerWeek === 1 ? 'order' : 'orders'} / week
                  </span>
                </div>
                <input
                  id="orders-slider"
                  type="range"
                  min="1"
                  max="7"
                  step="1"
                  value={ordersPerWeek}
                  onChange={(e) => setOrdersPerWeek(Number(e.target.value))}
                  className="w-full accent-[#00B259] cursor-pointer h-2 bg-[#0A0F0D] rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-[#9EBAAA]">
                  <span>1 order (Weekly bulk)</span>
                  <span>7 orders (Daily fresh produce & milk)</span>
                </div>
              </div>

              {/* Slider 2: Traditional Store Trip Time */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="time-slider" className="font-semibold text-white">
                    Time spent going to physical store:
                  </label>
                  <span className="font-mono text-[#00B259] font-bold text-sm bg-[#0A0F0D] px-2.5 py-1 rounded-lg border border-[#1F382B]">
                    {traditionalMinutes} minutes per trip
                  </span>
                </div>
                <input
                  id="time-slider"
                  type="range"
                  min="15"
                  max="60"
                  step="5"
                  value={traditionalMinutes}
                  onChange={(e) => setTraditionalMinutes(Number(e.target.value))}
                  className="w-full accent-[#00B259] cursor-pointer h-2 bg-[#0A0F0D] rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-[#9EBAAA]">
                  <span>15 mins (Quick corner shop)</span>
                  <span>60 mins (Supermarket traffic & cashier queue)</span>
                </div>
              </div>

              {/* Slider 3: Average spend */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="spend-slider" className="font-semibold text-white">
                    Average spend per grocery order:
                  </label>
                  <span className="font-mono text-[#00B259] font-bold text-sm bg-[#0A0F0D] px-2.5 py-1 rounded-lg border border-[#1F382B]">
                    {formatAmount(averageSpend)} / order
                  </span>
                </div>
                <input
                  id="spend-slider"
                  type="range"
                  min="400"
                  max="5000"
                  step="100"
                  value={averageSpend}
                  onChange={(e) => setAverageSpend(Number(e.target.value))}
                  className="w-full accent-[#00B259] cursor-pointer h-2 bg-[#0A0F0D] rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-[#9EBAAA]">
                  <span>{formatAmount(400)} (Milk, bread, veggies)</span>
                  <span>{formatAmount(5000)} (Full monthly haul)</span>
                </div>
              </div>
            </div>

            {/* Quick Summary Note */}
            <div className="p-3 bg-[#0A0F0D] rounded-xl border border-[#1F382B] text-xs text-[#9EBAAA] flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#00B259] shrink-0" />
              <span>
                Calculated on <strong className="text-white font-mono">{yearlyOrders} CartIT orders</strong> each year.
              </span>
            </div>
          </div>

          {/* Right Column: Calculated Results */}
          <div className="lg:col-span-6 p-8 rounded-2xl bg-gradient-to-br from-[#141F1A] via-[#141F1A] to-[#0D2117] border border-[#1F382B] flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#00B259] font-mono">
                  Your Annual CartIT Advantage
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">Reclaimed personal time and instant cashback savings</h3>
              </div>

              {/* Stat Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-[#0A0F0D] border border-[#1F382B] space-y-1">
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono tabular-nums">
                    {hoursSaved.toFixed(1)} <span className="text-lg font-normal text-[#00B259]">hours</span>
                  </div>
                  <div className="text-xs font-semibold text-white">
                    Personal time reclaimed
                  </div>
                  <div className="text-[11px] text-[#9EBAAA]">
                    Equivalent to <strong className="text-[#00B259]">{fullDaysReclaimed} full days</strong> saved per year
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#0A0F0D] border border-[#1F382B] space-y-1">
                  <div className="text-3xl sm:text-4xl font-black text-[#FF9800] font-mono tabular-nums">
                    {formatAmount(estimatedCouponSavings)}
                  </div>
                  <div className="text-xs font-semibold text-white">
                    Auto-Applied Coupon Savings
                  </div>
                  <div className="text-[11px] text-[#9EBAAA]">
                    Via codes like <strong className="text-[#00B259] font-mono">SAVE100</strong> & <strong className="text-[#00B259] font-mono">CARTIT10</strong>
                  </div>
                </div>
              </div>

              {/* Progress comparison */}
              <div className="space-y-3 p-4 rounded-xl bg-[#0A0F0D]/60 border border-[#1F382B] text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#9EBAAA]">Traditional Supermarket Visit:</span>
                  <span className="text-white font-mono">{traditionalMinutes} mins per order</span>
                </div>
                <div className="h-2 w-full bg-[#141F1A] rounded-full overflow-hidden">
                  <div className="h-full bg-red-400/80 w-full" />
                </div>

                <div className="flex justify-between items-center pt-1">
                  <span className="text-[#9EBAAA] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00B259]" />
                    <span>CartIT Express Doorstep Delivery:</span>
                  </span>
                  <span className="text-[#00B259] font-mono font-bold">10-15 Minutes</span>
                </div>
                <div className="h-2 w-full bg-[#141F1A] rounded-full overflow-hidden">
                  <div className="h-full bg-[#00B259] w-[15%]" />
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={onOpenDownload}
                className="w-full group flex items-center justify-center gap-2 py-3.5 bg-[#00B259] hover:bg-[#008040] text-white font-bold rounded-xl text-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <span>Download CartIT App & Save Money Today</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
