export interface DownloadOption {
  id: string;
  platform: 'ios' | 'android' | 'apk' | 'web';
  title: string;
  subtitle: string;
  version: string;
  size: string;
  badgeText?: string;
  icon: string;
}

export interface ReleaseNote {
  version: string;
  date: string;
  highlights: string[];
}

export interface SupportMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  text: string;
  timestamp: string;
  agentName?: string;
  agentAvatar?: string;
  quickReplies?: string[];
  actionType?: 'ticket' | 'download' | 'faq';
}

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
  orderNumber?: string;
  status: 'received' | 'in_review' | 'resolved';
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Shoppers' | 'Payment & Security' | 'Store Partners' | 'Troubleshooting';
}

export interface GroceryProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  weight: string;
  barcode: string;
  sku: string;
  inStock: boolean;
}

export interface CartItem extends GroceryProduct {
  quantity: number;
}
