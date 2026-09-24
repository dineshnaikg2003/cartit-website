import { GroceryProduct, FAQItem, ReleaseNote, DownloadOption } from '../types';

export const COMPANY_INFO = {
  name: 'CartIT Technologies India Pvt. Ltd.',
  brandName: 'CartIT',
  tagline: 'Superfast Grocery & Supermarket Delivery in 10-15 Minutes.',
  foundingYear: '2023',
  origin: 'Proudly Developed & Engineered in Bengaluru, India 🇮🇳',
  headquarters: 'Indiranagar & Koramangala, Bengaluru, Karnataka, India',
  engineeringCenters: 'Bengaluru (HQ) & Hyderabad Tech Hub',
  mission: 'To deliver fresh produce, daily dairy, pantry staples, and supermarket goods to Indian households in under 15 minutes through hyper-local dark store technology and 1-tap digital payments.',
  vision: 'To build India’s most reliable, transparent, and affordable instant grocery ecosystem—combining maximum savings, guaranteed fresh produce, and real-time delivery tracking.',
  stats: [
    { value: '15,000+', label: 'Fresh Supermarket Products', context: 'across organic produce, dairy, staples & household' },
    { value: '10-15 min', label: 'Express Doorstep Delivery', context: 'measured from dark store dispatch to delivery' },
    { value: '240+', label: 'Partner Dark Stores & Hubs', context: 'across Bengaluru, Mumbai, Delhi-NCR, Hyderabad, Pune & Chennai' },
    { value: '4.9 ★', label: 'Customer Satisfaction Rating', context: 'over 2.5 million completed express orders' },
  ],
  leadership: [
    {
      name: 'Maya Sharma',
      role: 'Co-Founder & Chief Executive Officer',
      bio: 'Ex-Flipkart & Swiggy Instamart supply-chain tech director with 14 years architecting modern Indian retail logistics.',
    },
    {
      name: 'Rajesh Venkat',
      role: 'Co-Founder & Chief Technology Officer',
      bio: 'IIT Madras alumnus & edge systems specialist architecting real-time dark store routing and high-throughput order dispatch.',
    },
    {
      name: 'Priya Nair',
      role: 'Head of Customer Experience & Store Success',
      bio: 'Former Customer Operations Lead at BigBasket & Swiggy, championing 24/7 dedicated support for shoppers and delivery partners across India.',
    },
  ],
  retailPartners: [
    'Smart Bazaar',
    'Nature’s Basket',
    'More Supermarket',
    'Spar Hypermarket',
    'Star Bazaar',
    'Ratnadeep',
    'Metro Wholesale',
  ],
};

export const SIMULATION_PRODUCTS: GroceryProduct[] = [
  {
    id: 'prod-1',
    name: 'Organic Sharbati Whole Wheat Atta',
    brand: 'Aashirvaad Select',
    category: 'Pantry & Staples',
    price: 295,
    originalPrice: 340,
    weight: '5kg pack',
    barcode: '890103082914',
    sku: 'PAN-ATT-01',
    inStock: true,
  },
  {
    id: 'prod-2',
    name: 'Farm Fresh Alphonso Mangoes',
    brand: 'Ratnagiri Farms',
    category: 'Fresh Produce',
    price: 380,
    originalPrice: 420,
    weight: 'Pack of 4',
    barcode: '890283746192',
    sku: 'PRO-MNG-02',
    inStock: true,
  },
  {
    id: 'prod-3',
    name: 'Single-Origin South Indian Filter Coffee',
    brand: 'Blue Tokai Roasters',
    category: 'Beverages',
    price: 195,
    originalPrice: 230,
    weight: '250g bag',
    barcode: '890182736450',
    sku: 'BEV-COF-03',
    inStock: true,
  },
  {
    id: 'prod-4',
    name: 'Pure Desi Cow Ghee (Bilona Method)',
    brand: 'Amul Organic',
    category: 'Dairy & Ghee',
    price: 340,
    weight: '500ml jar',
    barcode: '890601928374',
    sku: 'DAI-GHE-04',
    inStock: true,
  },
  {
    id: 'prod-5',
    name: 'Artisanal Himalayan Raw Forest Honey',
    brand: 'Organic India',
    category: 'Pantry',
    price: 260,
    originalPrice: 299,
    weight: '350g bottle',
    barcode: '890519283746',
    sku: 'PAN-HON-05',
    inStock: true,
  },
  {
    id: 'prod-6',
    name: 'Cold-Pressed Virgin Mustard Oil',
    brand: 'Fortune Vitarich',
    category: 'Oils & Ghee',
    price: 185,
    weight: '1 Litre',
    barcode: '890318492019',
    sku: 'OIL-MUS-06',
    inStock: true,
  },
  {
    id: 'prod-7',
    name: 'Greek Yogurt Blueberry & Wild Honey',
    brand: 'Epigamia Natural',
    category: 'Dairy',
    price: 75,
    originalPrice: 90,
    weight: '120g cup',
    barcode: '890829104928',
    sku: 'DAI-YOG-08',
    inStock: true,
  },
];

export interface PartnerStoreLocation {
  id: string;
  name: string;
  chain: string;
  city: string;
  state: string;
  address: string;
  hours: string;
  lanes: number;
  features: string[];
}

export const PARTNER_STORES_DATA: PartnerStoreLocation[] = [
  {
    id: 'store-1',
    name: 'Smart Bazaar Indiranagar Dark Store',
    chain: 'Smart Bazaar',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: '100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru 560038',
    hours: '6:00 AM – 11:30 PM',
    lanes: 12,
    features: ['10-Min Express Dispatch', 'Cold-Chain Locker', 'Auto Coupons'],
  },
  {
    id: 'store-2',
    name: 'Nature’s Basket Bandra West Express Hub',
    chain: 'Nature’s Basket',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Hill Road, Near Bandra Station, Bandra West, Mumbai 400050',
    hours: '6:00 AM – 11:30 PM',
    lanes: 10,
    features: ['10-Min Express Dispatch', 'Gourmet Produce Hub', 'Instant UPI'],
  },
  {
    id: 'store-3',
    name: 'More Megastore Cyber Hub Dark Store',
    chain: 'More Supermarket',
    city: 'Delhi-NCR',
    state: 'Haryana',
    address: 'DLF Cyber City, Phase 2, Sector 24, Gurugram, Delhi-NCR 122002',
    hours: '6:00 AM – 11:30 PM',
    lanes: 14,
    features: ['10-Min Express Dispatch', 'Bulk Pantry Hub', 'Live GPS Tracking'],
  },
  {
    id: 'store-4',
    name: 'Spar Hypermarket Hitec City Hub',
    chain: 'Spar Hypermarket',
    city: 'Hyderabad',
    state: 'Telangana',
    address: 'Inorbit Mall, Mindspace, Madhapur, Hitec City, Hyderabad 500081',
    hours: '6:00 AM – 11:30 PM',
    lanes: 10,
    features: ['10-Min Express Dispatch', 'PhonePe & GPay 1-Tap', 'Cold Storage'],
  },
];

export const DOWNLOAD_OPTIONS: DownloadOption[] = [
  {
    id: 'android',
    platform: 'android',
    title: 'Get it on Google Play',
    subtitle: 'Optimized for Android phones & tablets (India & Global)',
    version: 'v2.4.1',
    size: '43.8 MB',
    badgeText: 'Verified Play Protect',
    icon: 'Play',
  },
  {
    id: 'ios',
    platform: 'ios',
    title: 'Download on App Store',
    subtitle: 'For iPhone & iPad (iOS 15.0 or later)',
    version: 'v2.4.1',
    size: '48.2 MB',
    badgeText: 'Official Store',
    icon: 'Apple',
  },
  {
    id: 'apk',
    platform: 'apk',
    title: 'Direct Android APK',
    subtitle: 'Direct high-speed download for Indian regional networks',
    version: 'v2.4.1 (Build 8492)',
    size: '43.8 MB',
    badgeText: 'SHA-256 Validated',
    icon: 'Download',
  },
  {
    id: 'web',
    platform: 'web',
    title: 'CartIT Web App',
    subtitle: 'Instant browser ordering without App Store installation',
    version: 'Web Client 2.4',
    size: 'Instant Load',
    badgeText: 'Low Data Mode',
    icon: 'Globe',
  },
];

export const RELEASE_NOTES: ReleaseNote[] = [
  {
    version: 'v2.4.1',
    date: 'September 2026',
    highlights: [
      'Superfast 10-15 minute doorstep grocery delivery from local dark stores.',
      'Instant UPI 1-Tap checkout supporting Google Pay, PhonePe, Paytm, BHIM, CRED & RuPay.',
      'Live GPS rider tracking with driver contact phone option and arrival countdown.',
      'Auto-clipping store coupons (SAVE100 & CARTIT10) applied directly to your basket.',
      'GST tax invoice compliant itemized PDF export with instant WhatsApp sharing.',
    ],
  },
  {
    version: 'v2.3.0',
    date: 'June 2026',
    highlights: [
      'Multi-address management for Home, Work, and Parents.',
      'Fresh produce quality guarantee: 100% replacement for damaged goods.',
      'Dark mode UI palette matching Obsidian Charcoal & Emerald Green.',
    ],
  },
];

export const FAQ_LIST: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Shoppers',
    question: 'How fast does CartIT deliver groceries to my doorstep?',
    answer: 'CartIT delivers groceries in 10-15 minutes! Once you place your order on the CartIT Customer App, our nearest dark store packs your basket in under 2 minutes, and an assigned express rider navigates directly to your address.',
  },
  {
    id: 'faq-2',
    category: 'Shoppers',
    question: 'Where was CartIT developed and where are its headquarters?',
    answer: 'CartIT was proudly founded, designed, and developed in Bengaluru (Koramangala & Indiranagar), Karnataka, India. Our engineering center in Bengaluru builds the dark store routing engines, inventory sync algorithms, and payment connectors.',
  },
  {
    id: 'faq-3',
    category: 'Payment & Security',
    question: 'Which payment methods are supported? Does it support 1-Tap UPI?',
    answer: 'Yes! CartIT natively supports India’s complete digital payment infrastructure: 1-Tap UPI (Google Pay, PhonePe, Paytm, BHIM, CRED), RuPay debit and credit cards, Visa, Mastercard, and Cash on Delivery (COD).',
  },
  {
    id: 'faq-4',
    category: 'Shoppers',
    question: 'How do discount coupons like SAVE100 work on CartIT?',
    answer: 'Enter any valid promotional code (like SAVE100 for ₹100 flat off or CARTIT10 for 10% off) in your cart during checkout. The discount applies immediately to your subtotal before payment.',
  },
  {
    id: 'faq-5',
    category: 'Troubleshooting',
    question: 'How do I track my active order in real time?',
    answer: 'Tap the "Track Order" button or bike icon in the top header. You will see a live status timeline (Order Confirmed ➔ Packed ➔ Out for Delivery), estimated arrival time, and your delivery rider’s phone number.',
  },
  {
    id: 'faq-6',
    category: 'Troubleshooting',
    question: 'Can I get a GST compliant tax invoice for business purchases?',
    answer: 'Yes. In your CartIT profile under "Tax & Business Info", add your company GSTIN. Every purchase automatically generates an itemized, GST-compliant digital tax invoice downloadable as a PDF.',
  },
];

export interface MockReceiptRecord {
  id: string;
  store: string;
  date: string;
  itemsCount: number;
  total: number;
  paymentMethod: string;
  items: Array<{ name: string; qty: number; price: number }>;
}

export const MOCK_RECEIPTS: Record<string, MockReceiptRecord> = {
  'CT-82914': {
    id: 'CT-82914',
    store: 'Smart Bazaar Indiranagar Dark Store (#042)',
    date: 'Sep 24, 2026, 10:42 AM IST',
    itemsCount: 3,
    total: 870,
    paymentMethod: 'UPI Auto-Pay (GPay •••• 9845)',
    items: [
      { name: 'Organic Sharbati Whole Wheat Atta', qty: 1, price: 295 },
      { name: 'Single-Origin South Indian Filter Coffee', qty: 2, price: 390 },
      { name: 'Pure Cow Ghee (Bilona Method)', qty: 1, price: 185 },
    ],
  },
  'CT-77421': {
    id: 'CT-77421',
    store: 'Nature’s Basket Bandra West Express Hub (#018)',
    date: 'Sep 23, 2026, 11:42 AM IST',
    itemsCount: 4,
    total: 875,
    paymentMethod: 'UPI (PhonePe •••• 7712)',
    items: [
      { name: 'Farm Fresh Alphonso Mangoes', qty: 1, price: 380 },
      { name: 'Artisanal Himalayan Forest Honey', qty: 1, price: 260 },
      { name: 'Greek Yogurt Blueberry', qty: 1, price: 75 },
    ],
  },
};

export const SUPPORT_KNOWLEDGE_BASE = [
  {
    keywords: ['delivery', 'time', 'fast', 'how long', 'minutes', 'express'],
    response: 'CartIT delivers in 10-15 minutes from your local dark store! You can track your rider in real time using the Live Order Tracker.',
  },
  {
    keywords: ['coupon', 'code', 'discount', 'save100', 'cartit10', 'promo'],
    response: 'To apply a coupon: open CartIT > Cart > Enter promo code (e.g. SAVE100 for ₹100 OFF) and tap Apply. The discount deducts instantly!',
  },
  {
    keywords: ['pay', 'payment', 'upi', 'gpay', 'phonepe', 'rupay', 'cod', 'card'],
    response: 'CartIT supports 1-Tap UPI (GPay, PhonePe, Paytm), RuPay & Cards, and Cash on Delivery. All transactions are 100% secure.',
  },
  {
    keywords: ['india', 'developed', 'bengaluru', 'bangalore', 'origin'],
    response: 'CartIT is proudly designed and developed in Bengaluru (Koramangala), Karnataka, India! Our engineering teams build next-gen express delivery tech.',
  },
  {
    keywords: ['human', 'agent', 'person', 'representative', 'talk to someone'],
    response: 'Connecting you with our Bengaluru Customer Operations team now. Average response time is under 45 seconds!',
  },
];

