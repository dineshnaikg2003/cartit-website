import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  ChevronRight, 
  Tag, 
  Clock, 
  Bike, 
  Phone, 
  CreditCard, 
  Wallet, 
  ArrowLeft,
  X,
  Store,
  Grid,
  User,
  Heart,
  ShieldCheck,
  Star,
  Zap,
  RotateCcw,
  Check,
  Database,
  RefreshCw
} from 'lucide-react';
import { playScanBeep, playRemoveSound, playSuccessChime } from '../utils/audio';
import { renderApi, LiveProduct } from '../services/api';

interface ProductItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  rating: number;
}

const FALLBACK_PRODUCTS: ProductItem[] = [
  {
    id: 'p1',
    name: 'Organic Sharbati Whole Wheat Atta',
    brand: 'Aashirvaad Select',
    category: 'Pantry & Staples',
    price: 295,
    originalPrice: 340,
    unit: '5kg pack',
    image: '🌾',
    rating: 4.8
  },
  {
    id: 'p2',
    name: 'Farm Fresh Alphonso Mangoes',
    brand: 'Ratnagiri Organic',
    category: 'Fresh Produce',
    price: 380,
    originalPrice: 420,
    unit: 'Pack of 4',
    image: '🥭',
    rating: 4.9
  },
  {
    id: 'p3',
    name: 'South Indian Filter Coffee Powder',
    brand: 'Blue Tokai Roasters',
    category: 'Beverages',
    price: 195,
    originalPrice: 230,
    unit: '250g bag',
    image: '☕',
    rating: 4.7
  },
  {
    id: 'p4',
    name: 'Pure Desi Cow Ghee (Bilona)',
    brand: 'Amul Organic',
    category: 'Dairy & Ghee',
    price: 340,
    unit: '500ml jar',
    image: '🏺',
    rating: 4.9
  },
  {
    id: 'p5',
    name: 'Blueberry Greek Yogurt',
    brand: 'Epigamia Natural',
    category: 'Dairy',
    price: 75,
    originalPrice: 90,
    unit: '120g cup',
    image: '🫐',
    rating: 4.6
  },
  {
    id: 'p6',
    name: 'Cold-Pressed Virgin Mustard Oil',
    brand: 'Fortune Vitarich',
    category: 'Oils & Ghee',
    price: 185,
    unit: '1 Litre',
    image: '🌻',
    rating: 4.5
  }
];

const CATEGORIES = [
  { name: 'All Items', icon: '🛒' },
  { name: 'Fresh Produce', icon: '🥬' },
  { name: 'Dairy & Ghee', icon: '🥛' },
  { name: 'Pantry & Staples', icon: '🌾' },
  { name: 'Beverages', icon: '☕' },
];

export const AppSimulator: React.FC = () => {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<'home' | 'categories' | 'profile'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Items');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Real-time Database State
  const [products, setProducts] = useState<ProductItem[]>(FALLBACK_PRODUCTS);
  const [isDbConnected, setIsDbConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Fetch real-time data from Render database
  useEffect(() => {
    fetchRenderData();
  }, []);

  const fetchRenderData = async () => {
    setIsSyncing(true);
    try {
      const liveProducts = await renderApi.getProducts();
      if (liveProducts && liveProducts.length > 0) {
        const mapped: ProductItem[] = liveProducts.map((lp, idx) => ({
          id: `live-${lp.id}`,
          name: lp.name,
          brand: lp.brand?.name || 'CartIT Direct',
          category: lp.category?.name?.toString() || 'Groceries',
          price: lp.discountPrice || lp.price || 199,
          originalPrice: lp.discountPrice ? lp.price : undefined,
          unit: lp.unit || '1 Pack',
          image: ['🌾', '🥭', '☕', '🥛', '🫐', '🌻'][idx % 6],
          rating: 4.8,
        }));
        setProducts(mapped);
        setIsDbConnected(true);
      }
    } catch (e) {
      console.warn("Render API fallback active", e);
    } finally {
      setIsSyncing(false);
    }
  };
  
  // Cart State
  const [cart, setCart] = useState<{ product: ProductItem; quantity: number }[]>([
    { product: FALLBACK_PRODUCTS[0], quantity: 1 },
    { product: FALLBACK_PRODUCTS[2], quantity: 2 },
  ]);
  
  // Modals & Flows
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('SAVE100');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  
  // Order Tracking State
  const [activeOrder, setActiveOrder] = useState<{
    id: string;
    itemsCount: number;
    amount: number;
    status: 'PLACED' | 'PACKING' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
    driverName: string;
    driverPhone: string;
    etaMinutes: number;
  } | null>(null);
  
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);

  // Calculations
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const rawSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const couponDiscount = appliedCoupon === 'SAVE100' ? 100 : appliedCoupon === 'CARTIT10' ? Math.round(rawSubtotal * 0.1) : 0;
  const deliveryCharge = rawSubtotal > 500 ? 0 : 25;
  const finalAmount = Math.max(0, rawSubtotal - couponDiscount + deliveryCharge);

  // Handlers
  const handleAddToCart = (product: ProductItem) => {
    playScanBeep();
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    if (delta > 0) playScanBeep();
    else playRemoveSound();

    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: ProductItem; quantity: number }[]
    );
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (code === 'SAVE100' || code === 'CARTIT10' || code === 'SUPERFIRST') {
      setAppliedCoupon(code);
      playSuccessChime();
    } else {
      alert('Invalid Coupon Code! Try SAVE100 or CARTIT10');
    }
  };

  const handlePlaceOrder = () => {
    playSuccessChime();
    const newOrder = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      itemsCount: cartItemCount,
      amount: finalAmount,
      status: 'OUT_FOR_DELIVERY' as const,
      driverName: 'Ramesh Kumar',
      driverPhone: '+91 98765 43210',
      etaMinutes: 11,
    };
    setActiveOrder(newOrder);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setIsOrderTrackerOpen(true);
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All Items' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative mx-auto w-full max-w-sm rounded-[2.5rem] p-3 bg-[#0A0F0D] border-4 border-[#1F382B] shadow-2xl shadow-emerald-950/40">
      
      {/* Phone Speaker & Dynamic Island */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#050807] rounded-full z-40 flex items-center justify-between px-3">
        <div className="w-2.5 h-2.5 rounded-full bg-[#141F1A] border border-[#1F382B]"></div>
        <div className="w-10 h-1 bg-[#1F382B] rounded-full"></div>
        <div className="w-2 h-2 rounded-full bg-emerald-500/90 animate-pulse"></div>
      </div>

      {/* Main App Screen Container */}
      <div className="relative overflow-hidden rounded-[2rem] bg-[#0A0F0D] text-white min-h-[620px] max-h-[640px] flex flex-col pt-8 pb-1 px-0 select-none">
        
        {/* Render DB Status Badge Bar */}
        <div className="px-3 py-1 bg-[#0A0F0D] border-b border-[#1F382B] flex items-center justify-between text-[9px] text-[#9EBAAA]">
          <div className="flex items-center gap-1">
            <Database className="w-3 h-3 text-[#00B259]" />
            <span className="font-mono text-[9.5px]">Render DB: <strong className="text-white">cartit-backend-gqg9</strong></span>
          </div>
          <button onClick={fetchRenderData} className="flex items-center gap-0.5 text-[#00B259] hover:underline font-mono">
            <RefreshCw className={`w-2.5 h-2.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isDbConnected ? 'LIVE SYNC' : 'SYNCING'}</span>
          </button>
        </div>

        {/* TOP NAVIGATION / APP BAR (Matches Flutter Customer App Header) */}
        <div className="px-3 pb-2.5 pt-1 bg-gradient-to-r from-[#0D2117] to-[#143324] border-b border-[#1F382B] shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#00B259] flex items-center justify-center text-white font-extrabold text-xs shadow-md shadow-emerald-500/20">
                C
              </div>
              <div className="text-left leading-tight">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-extrabold text-white">DELIVER TO HOME</span>
                  <span className="text-[9px] text-[#FF9800] bg-[#FF9800]/10 px-1 rounded font-bold">12 MINS</span>
                </div>
                <div className="text-[10px] text-[#9EBAAA] flex items-center gap-0.5 truncate max-w-[170px]">
                  <MapPin className="w-2.5 h-2.5 text-[#00B259] shrink-0" />
                  <span className="truncate">100 Feet Rd, Indiranagar, Bengaluru</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => {
                  if (activeOrder) setIsOrderTrackerOpen(true);
                  else alert('No active order right now. Place an order to test live tracking!');
                }}
                className={`p-1.5 rounded-lg border text-xs relative transition-all ${
                  activeOrder ? 'bg-[#FF9800]/20 border-[#FF9800] text-[#FF9800] animate-pulse' : 'bg-[#141F1A] border-[#1F382B] text-[#9EBAAA]'
                }`}
                title="Live Order Tracking"
              >
                <Bike className="w-3.5 h-3.5" />
                {activeOrder && <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FF9800]"></span>}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-2 relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9EBAAA]" />
            <input 
              type="text"
              placeholder="Search 'Atta', 'Mangoes', 'Milk'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A0F0D]/90 border border-[#1F382B] rounded-lg py-1.5 pl-8 pr-3 text-[11px] text-white placeholder-[#9EBAAA]/70 focus:outline-none focus:border-[#00B259]"
            />
          </div>
        </div>

        {/* BODY CONTENT AREA SWITCHER */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3 custom-scrollbar pb-24">
          
          {/* TAB 1: HOME */}
          {currentTab === 'home' && (
            <>
              {/* Promo Banner Slider */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#00B259]/20 via-[#143324] to-[#FF9800]/20 border border-[#1F382B] flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 text-[9px] font-bold text-[#FF9800] uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    <span>CartIT Super Savings</span>
                  </div>
                  <div className="text-xs font-black text-white">Flat ₹100 OFF Instant Coupon</div>
                  <div className="text-[10px] text-[#9EBAAA]">Use code <strong className="text-[#00B259] font-mono">SAVE100</strong> on orders above ₹300</div>
                </div>
                <div className="text-2xl">🎉</div>
              </div>

              {/* Horizontal Category Selector */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[10px]">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-2.5 py-1 rounded-lg shrink-0 font-medium flex items-center gap-1 transition-all ${
                      selectedCategory === cat.name
                        ? 'bg-[#00B259] text-white font-bold shadow-sm shadow-emerald-500/20'
                        : 'bg-[#141F1A] text-[#9EBAAA] border border-[#1F382B] hover:text-white'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>

              {/* Product Grid */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-white flex items-center gap-1">
                    <span>⚡</span>
                    <span>Express Supermarket Store</span>
                  </span>
                  <span className="text-[10px] text-[#00B259] font-medium">{filteredProducts.length} Items Available</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {filteredProducts.map((product) => {
                    const cartEntry = cart.find((i) => i.product.id === product.id);
                    const qty = cartEntry ? cartEntry.quantity : 0;

                    return (
                      <div 
                        key={product.id}
                        className="p-2 rounded-xl bg-[#141F1A] border border-[#1F382B] flex flex-col justify-between hover:border-[#00B259]/50 transition-all group"
                      >
                        <div className="space-y-1">
                          <div className="h-16 rounded-lg bg-[#0A0F0D] flex items-center justify-center text-3xl relative">
                            {product.image}
                            {product.originalPrice && (
                              <span className="absolute top-1 left-1 bg-[#FF9800] text-black text-[8px] font-black px-1 rounded">
                                SAVE ₹{product.originalPrice - product.price}
                              </span>
                            )}
                          </div>

                          <div className="text-[9px] text-[#9EBAAA] font-semibold">{product.brand}</div>
                          <div className="text-[10px] font-bold text-white leading-tight line-clamp-2 h-7">{product.name}</div>
                          <div className="text-[9px] text-[#9EBAAA]">{product.unit}</div>
                        </div>

                        <div className="pt-2 flex items-center justify-between border-t border-[#1F382B]/60 mt-2">
                          <div>
                            <div className="text-xs font-black text-white">₹{product.price}</div>
                            {product.originalPrice && (
                              <div className="text-[8px] text-[#9EBAAA] line-through">₹{product.originalPrice}</div>
                            )}
                          </div>

                          {qty === 0 ? (
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="px-2.5 py-1 rounded-md bg-[#00B259]/20 hover:bg-[#00B259] text-[#00B259] hover:text-white border border-[#00B259]/40 text-[10px] font-bold transition-all"
                            >
                              + ADD
                            </button>
                          ) : (
                            <div className="flex items-center gap-1.5 bg-[#00B259] text-white px-1.5 py-0.5 rounded-md text-[10px] font-bold">
                              <button onClick={() => handleUpdateQty(product.id, -1)} className="hover:opacity-80">
                                <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span>{qty}</span>
                              <button onClick={() => handleUpdateQty(product.id, 1)} className="hover:opacity-80">
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* TAB 2: CATEGORIES */}
          {currentTab === 'categories' && (
            <div className="space-y-3">
              <div className="text-xs font-extrabold text-white flex items-center gap-1.5">
                <Grid className="w-3.5 h-3.5 text-[#00B259]" />
                <span>All Supermarket Departments</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { title: 'Fresh Vegetables & Fruits', desc: 'Organic, Direct from Farms', count: '140+ Items', icon: '🥦' },
                  { title: 'Dairy, Milk & Paneer', desc: 'Fresh Morning Batches', count: '85+ Items', icon: '🥛' },
                  { title: 'Pantry Staples & Atta', desc: 'Sharbati Wheat, Oils, Rice', count: '210+ Items', icon: '🌾' },
                  { title: 'Cold Drinks & Juices', desc: 'Energy Drinks, Soft Drinks', count: '95+ Items', icon: '🥤' },
                  { title: 'Snacks & Biscuits', desc: 'Chips, Namkeen, Chocolates', count: '180+ Items', icon: '🍿' },
                  { title: 'Personal & House Care', desc: 'Soaps, Shampoos, Detergents', count: '120+ Items', icon: '🧼' },
                ].map((dept, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#141F1A] border border-[#1F382B] space-y-1 hover:border-[#00B259]/50 transition-all cursor-pointer">
                    <div className="text-2xl">{dept.icon}</div>
                    <div className="font-bold text-white text-[11px] leading-tight">{dept.title}</div>
                    <div className="text-[9px] text-[#9EBAAA]">{dept.desc}</div>
                    <div className="text-[8px] text-[#00B259] font-bold pt-1">{dept.count}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PROFILE / MY ORDERS */}
          {currentTab === 'profile' && (
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#141F1A] border border-[#1F382B] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00B259]/20 text-[#00B259] font-black text-base flex items-center justify-center border border-[#00B259]/30">
                  DK
                </div>
                <div>
                  <div className="font-extrabold text-white text-sm">Dinesh Kumar</div>
                  <div className="text-[10px] text-[#9EBAAA]">dinesh@cartit.in · +91 98765 12345</div>
                  <div className="text-[9px] text-[#00B259] font-bold mt-0.5">CartIT VIP Express Member</div>
                </div>
              </div>

              {/* Active Coupons List */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-white flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-[#FF9800]" />
                  <span>Available Store Coupons & Loyalty</span>
                </div>

                <div className="space-y-1">
                  {[
                    { code: 'SAVE100', offer: 'Flat ₹100 OFF on ₹300+' },
                    { code: 'CARTIT10', offer: '10% Extra Discount on Fresh Produce' },
                    { code: 'SUPERFIRST', offer: 'Free Delivery for First 5 Orders' }
                  ].map((cp) => (
                    <div key={cp.code} className="p-2 rounded-lg bg-[#141F1A] border border-[#1F382B] flex items-center justify-between">
                      <div>
                        <div className="font-mono font-bold text-[#00B259] text-[10px]">{cp.code}</div>
                        <div className="text-[9px] text-[#9EBAAA]">{cp.offer}</div>
                      </div>
                      <button 
                        onClick={() => { setAppliedCoupon(cp.code); setIsCartOpen(true); }}
                        className="px-2 py-0.5 rounded bg-[#00B259]/20 text-[#00B259] text-[9px] font-bold hover:bg-[#00B259] hover:text-white transition-all"
                      >
                        USE
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* OVERLAY 1: FLOATING GLOBAL CART BAR (Matches global_cart_bar.dart) */}
        {cartItemCount > 0 && !isCartOpen && !isCheckoutOpen && (
          <div className="absolute bottom-12 left-2 right-2 z-30 animate-bounce-short">
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full p-2.5 rounded-xl bg-gradient-to-r from-[#00B259] to-[#008040] text-white shadow-lg shadow-emerald-500/30 border border-emerald-400/30 flex items-center justify-between cursor-pointer transform active:scale-98 transition-all"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-black/20 flex items-center justify-center font-bold text-xs">
                  <ShoppingBag className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-extrabold">{cartItemCount} {cartItemCount === 1 ? 'ITEM' : 'ITEMS'} IN CART</div>
                  <div className="text-[9px] text-white/80">From Smart Bazaar Dark Store</div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-black">
                <span>₹{finalAmount}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        )}

        {/* OVERLAY 2: ACTIVE ORDER STATUS BAR OVERLAY (Matches active_order_status_bar.dart) */}
        {activeOrder && !isOrderTrackerOpen && (
          <div className="absolute bottom-12 left-2 right-2 z-30">
            <button
              onClick={() => setIsOrderTrackerOpen(true)}
              className="w-full p-2 rounded-xl bg-[#FF9800] text-black font-bold shadow-lg flex items-center justify-between text-xs cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <Bike className="w-4 h-4 animate-pulse" />
                <span className="text-[10px] font-black uppercase">Order Out For Delivery · {activeOrder.etaMinutes} mins</span>
              </div>
              <span className="text-[10px] underline font-extrabold">Track Live ➔</span>
            </button>
          </div>
        )}

        {/* MODAL 1: CART VIEW & CHECKOUT PREVIEW */}
        {isCartOpen && (
          <div className="absolute inset-0 z-40 bg-[#0A0F0D]/95 backdrop-blur-md flex flex-col pt-9 pb-2 px-3 animate-fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-[#1F382B]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#00B259]" />
                <span className="font-extrabold text-xs text-white">YOUR SHOPPING CART ({cartItemCount})</span>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-1 rounded-md text-[#9EBAAA] hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-2 space-y-2 custom-scrollbar">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="p-2 rounded-lg bg-[#141F1A] border border-[#1F382B] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{product.image}</span>
                    <div>
                      <div className="font-bold text-white text-[10px] leading-tight max-w-[130px] truncate">{product.name}</div>
                      <div className="text-[9px] text-[#9EBAAA]">₹{product.price} / {product.unit}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-[#0A0F0D] border border-[#1F382B] px-1.5 py-0.5 rounded text-[10px] font-bold">
                      <button onClick={() => handleUpdateQty(product.id, -1)}><Minus className="w-2.5 h-2.5 text-[#9EBAAA]" /></button>
                      <span>{quantity}</span>
                      <button onClick={() => handleUpdateQty(product.id, 1)}><Plus className="w-2.5 h-2.5 text-[#00B259]" /></button>
                    </div>
                    <span className="font-black text-white text-[11px]">₹{product.price * quantity}</span>
                  </div>
                </div>
              ))}

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="pt-2">
                <div className="text-[10px] font-bold text-white mb-1 flex items-center justify-between">
                  <span>Apply Store Coupon:</span>
                  {appliedCoupon && <span className="text-[#00B259] font-mono">Applied: {appliedCoupon}</span>}
                </div>
                <div className="flex gap-1">
                  <input
                    type="text"
                    placeholder="Enter code e.g. SAVE100"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 bg-[#141F1A] border border-[#1F382B] rounded px-2 py-1 text-[10px] text-white uppercase focus:outline-none focus:border-[#00B259]"
                  />
                  <button type="submit" className="px-3 py-1 bg-[#00B259] text-white font-bold text-[10px] rounded">
                    Apply
                  </button>
                </div>
              </form>

              {/* Bill Summary */}
              <div className="p-2.5 rounded-lg bg-[#141F1A] border border-[#1F382B] space-y-1 text-[10px]">
                <div className="flex justify-between text-[#9EBAAA]">
                  <span>Item Subtotal:</span>
                  <span className="text-white font-mono">₹{rawSubtotal}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-[#00B259]">
                    <span>Coupon Savings ({appliedCoupon}):</span>
                    <span className="font-mono">-₹{couponDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#9EBAAA]">
                  <span>Delivery Charge:</span>
                  <span className="text-white font-mono">{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
                </div>
                <div className="flex justify-between font-extrabold text-white text-xs pt-1 border-t border-[#1F382B]">
                  <span>Total Amount Payable:</span>
                  <span className="text-[#00B259] font-mono">₹{finalAmount}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#1F382B]">
              <button
                onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
                className="w-full py-2.5 rounded-xl bg-[#00B259] hover:bg-[#008040] text-white font-black text-xs transition-all shadow-md shadow-emerald-500/20"
              >
                Proceed To Select Payment ➔
              </button>
            </div>
          </div>
        )}

        {/* MODAL 2: CHECKOUT & PAYMENT SCREEN */}
        {isCheckoutOpen && (
          <div className="absolute inset-0 z-50 bg-[#0A0F0D] flex flex-col pt-9 pb-2 px-3 animate-fade-in text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#1F382B]">
              <div className="flex items-center gap-2">
                <button onClick={() => { setIsCheckoutOpen(false); setIsCartOpen(true); }} className="text-[#9EBAAA]">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="font-extrabold text-white">EXPRESS CHECKOUT</span>
              </div>
              <span className="font-mono font-bold text-[#00B259]">PAY ₹{finalAmount}</span>
            </div>

            <div className="flex-1 overflow-y-auto py-2 space-y-3 custom-scrollbar">
              {/* Delivery Address */}
              <div className="p-2.5 rounded-xl bg-[#141F1A] border border-[#1F382B] space-y-1">
                <div className="text-[10px] font-bold text-[#00B259] flex items-center justify-between">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Delivery Address</span>
                  <span className="text-white font-normal underline">Change</span>
                </div>
                <div className="font-bold text-white">Dinesh Kumar (Home)</div>
                <div className="text-[10px] text-[#9EBAAA]">Flat 402, Green Acre Apts, 100 Feet Rd, Indiranagar, Bengaluru 560038</div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-bold text-white">Choose Payment Option:</div>
                {[
                  { id: 'upi', name: 'Instant UPI (Google Pay / PhonePe / Paytm)', icon: '📱', badge: 'Fastest' },
                  { id: 'card', name: 'Credit / Debit Card (RuPay / Visa / Master)', icon: '💳' },
                  { id: 'cod', name: 'Pay Cash on Delivery', icon: '💵' }
                ].map((pm) => (
                  <div
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === pm.id ? 'bg-[#00B259]/15 border-[#00B259]' : 'bg-[#141F1A] border-[#1F382B]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{pm.icon}</span>
                      <div>
                        <div className="font-bold text-white text-[10px]">{pm.name}</div>
                        {pm.badge && <div className="text-[8px] text-[#00B259] font-bold">{pm.badge}</div>}
                      </div>
                    </div>
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      paymentMethod === pm.id ? 'border-[#00B259] bg-[#00B259]' : 'border-[#1F382B]'
                    }`}>
                      {paymentMethod === pm.id && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#1F382B]">
              <button
                onClick={handlePlaceOrder}
                className="w-full py-2.5 rounded-xl bg-[#00B259] hover:bg-[#008040] text-white font-black text-xs transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>PLACE ORDER & PAY ₹{finalAmount}</span>
              </button>
            </div>
          </div>
        )}

        {/* MODAL 3: LIVE ORDER TRACKER SCREEN */}
        {isOrderTrackerOpen && activeOrder && (
          <div className="absolute inset-0 z-50 bg-[#0A0F0D] flex flex-col pt-9 pb-2 px-3 animate-fade-in text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#1F382B]">
              <div className="flex items-center gap-2">
                <button onClick={() => setIsOrderTrackerOpen(false)} className="text-[#9EBAAA]">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="font-extrabold text-white">LIVE ORDER TRACKER</span>
              </div>
              <span className="text-[9px] font-mono text-[#00B259] bg-[#00B259]/15 px-1.5 py-0.5 rounded font-bold">
                {activeOrder.id}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto py-2 space-y-3 custom-scrollbar">
              {/* Order Delivery Status Banner */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#00B259]/20 to-[#143324] border border-[#00B259]/40 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-white text-sm">Arriving in {activeOrder.etaMinutes} Mins</span>
                  <Bike className="w-5 h-5 text-[#00B259] animate-bounce" />
                </div>
                <div className="text-[10px] text-[#9EBAAA]">Your grocery basket has been packed and dispatched from Smart Bazaar Dark Store!</div>
              </div>

              {/* Status Timeline */}
              <div className="p-3 rounded-xl bg-[#141F1A] border border-[#1F382B] space-y-2 text-[10px]">
                <div className="font-bold text-white mb-1">Order Progress:</div>
                {[
                  { step: 'Order Placed & Confirmed', time: '10:42 AM', done: true },
                  { step: 'Packed at Dark Store', time: '10:44 AM', done: true },
                  { step: 'Out For Express Delivery', time: '10:46 AM', done: true, current: true },
                  { step: 'Delivered at Doorstep', time: 'Est 10:55 AM', done: false }
                ].map((st, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                      st.done ? 'bg-[#00B259] text-white' : 'bg-[#1F382B] text-[#9EBAAA]'
                    }`}>
                      {st.done ? <Check className="w-2.5 h-2.5" /> : <span className="w-1.5 h-1.5 rounded-full bg-[#9EBAAA]"></span>}
                    </div>
                    <div className="flex-1 flex justify-between">
                      <span className={`font-semibold ${st.current ? 'text-[#00B259] font-bold' : st.done ? 'text-white' : 'text-[#9EBAAA]'}`}>
                        {st.step}
                      </span>
                      <span className="text-[9px] text-[#9EBAAA] font-mono">{st.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Driver Info Card */}
              <div className="p-3 rounded-xl bg-[#141F1A] border border-[#1F382B] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#00B259]/20 text-[#00B259] flex items-center justify-center font-bold text-sm border border-[#00B259]/30">
                    🚴
                  </div>
                  <div>
                    <div className="font-bold text-white text-[11px]">{activeOrder.driverName}</div>
                    <div className="text-[9px] text-[#9EBAAA]">CartIT Express Rider · 4.9 ★ Rating</div>
                  </div>
                </div>

                <a 
                  href={`tel:${activeOrder.driverPhone}`}
                  className="p-2 rounded-lg bg-[#00B259] text-white hover:bg-[#008040] transition-all flex items-center gap-1 font-bold text-[10px]"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call</span>
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-[#1F382B]">
              <button
                onClick={() => setIsOrderTrackerOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#141F1A] border border-[#1F382B] text-white font-bold text-xs"
              >
                Close Tracker
              </button>
            </div>
          </div>
        )}

        {/* BOTTOM NAVIGATION BAR (Replicates Flutter MainNavigationScreen) */}
        <div className="absolute bottom-0 left-0 right-0 h-11 bg-[#141F1A] border-t border-[#1F382B] flex items-center justify-around z-20 text-[9px] font-bold">
          <button
            onClick={() => setCurrentTab('home')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              currentTab === 'home' ? 'text-[#00B259]' : 'text-[#9EBAAA] hover:text-white'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setCurrentTab('categories')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              currentTab === 'categories' ? 'text-[#00B259]' : 'text-[#9EBAAA] hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Categories</span>
          </button>

          <button
            onClick={() => setCurrentTab('profile')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              currentTab === 'profile' ? 'text-[#00B259]' : 'text-[#9EBAAA] hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile</span>
          </button>
        </div>

      </div>
    </div>
  );
};
