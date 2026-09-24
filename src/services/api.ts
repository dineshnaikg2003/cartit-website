/**
 * Real-time Database API Service connecting directly to CartIT Render Backend:
 * Base URL: https://cartit-backend-gqg9.onrender.com/api
 */

export const RENDER_BACKEND_URL = "https://cartit-backend-gqg9.onrender.com/api";

export interface LiveCategory {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  active?: boolean;
}

export interface LiveProduct {
  id: number;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  stock: number;
  featured?: boolean;
  unit?: string;
  category?: LiveCategory;
  brand?: { id: number; name: string };
  primaryImageUrl?: string;
  imageUrl?: string;
}

export interface LiveCoupon {
  id: number;
  code: string;
  discountAmount: number;
  discountPercentage?: number;
  minOrderAmount: number;
  active: boolean;
}

export interface LiveOrder {
  id: number;
  orderNumber: string;
  status: string;
  totalAmount: number;
  finalAmount: number;
  deliveryBoyName?: string;
  deliveryBoyPhone?: string;
  createdAt?: string;
}

export class RenderApiService {
  private static instance: RenderApiService;
  private token: string | null = localStorage.getItem('cartit_render_token');

  public static getInstance(): RenderApiService {
    if (!RenderApiService.instance) {
      RenderApiService.instance = new RenderApiService();
    }
    return RenderApiService.instance;
  }

  public setToken(newToken: string) {
    this.token = newToken;
    localStorage.setItem('cartit_render_token', newToken);
  }

  public getToken(): string | null {
    return this.token;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  /**
   * Healthcheck / Ping Render DB Backend
   */
  async checkBackendStatus(): Promise<{ connected: boolean; host: string }> {
    try {
      const res = await fetch(`${RENDER_BACKEND_URL}/auth/check-phone`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: "9876543210" })
      });
      // Any response (even 400/500) confirms server is live and listening on Render
      return { connected: true, host: "cartit-backend-gqg9.onrender.com" };
    } catch (e) {
      return { connected: false, host: "cartit-backend-gqg9.onrender.com" };
    }
  }

  /**
   * Auth: Send OTP
   */
  async sendOtp(phoneNumber: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${RENDER_BACKEND_URL}/auth/send-otp`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ phoneNumber }),
      });
      const data = await res.json();
      return { success: res.ok, message: data.message || 'OTP Sent Successfully' };
    } catch (e) {
      return { success: false, message: 'Render backend connecting...' };
    }
  }

  /**
   * Auth: Verify OTP
   */
  async verifyOtp(phoneNumber: string, otp: string): Promise<{ success: boolean; token?: string }> {
    try {
      const res = await fetch(`${RENDER_BACKEND_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ phoneNumber, otp }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        this.setToken(data.token);
        return { success: true, token: data.token };
      }
    } catch (e) {
      console.warn("Render OTP Error:", e);
    }
    return { success: false };
  }

  /**
   * Fetch live categories from Render database
   */
  async getCategories(): Promise<LiveCategory[]> {
    try {
      const res = await fetch(`${RENDER_BACKEND_URL}/categories`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data : data.content || [];
      }
    } catch (e) {
      console.warn("Render DB Categories fallback active", e);
    }
    return [];
  }

  /**
   * Fetch live products from Render database
   */
  async getProducts(): Promise<LiveProduct[]> {
    try {
      const res = await fetch(`${RENDER_BACKEND_URL}/products`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data : data.content || [];
      }
    } catch (e) {
      console.warn("Render DB Products fallback active", e);
    }
    return [];
  }

  /**
   * Fetch featured products from Render database
   */
  async getFeaturedProducts(): Promise<LiveProduct[]> {
    try {
      const res = await fetch(`${RENDER_BACKEND_URL}/products/featured`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data : data.content || [];
      }
    } catch (e) {
      console.warn("Render DB Featured Products fallback active", e);
    }
    return [];
  }

  /**
   * Search products in Render database
   */
  async searchProducts(query: string): Promise<LiveProduct[]> {
    try {
      const res = await fetch(`${RENDER_BACKEND_URL}/products/search?query=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data : data.content || [];
      }
    } catch (e) {
      console.warn("Render DB Product search fallback active", e);
    }
    return [];
  }

  /**
   * Fetch brands from Render database
   */
  async getBrands(): Promise<any[]> {
    try {
      const res = await fetch(`${RENDER_BACKEND_URL}/brands`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data : data.content || [];
      }
    } catch (e) {
      console.warn("Render DB Brands fallback active", e);
    }
    return [];
  }

  /**
   * Fetch active offers from Render database
   */
  async getOffers(): Promise<any[]> {
    try {
      const res = await fetch(`${RENDER_BACKEND_URL}/offers`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data : data.content || [];
      }
    } catch (e) {
      console.warn("Render DB Offers fallback active", e);
    }
    return [];
  }

  /**
   * Fetch active coupons from Render database
   */
  async getActiveCoupons(): Promise<LiveCoupon[]> {
    try {
      const res = await fetch(`${RENDER_BACKEND_URL}/coupons/active`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data : data.content || [];
      }
    } catch (e) {
      console.warn("Render DB Coupons fallback active", e);
    }
    return [];
  }

  /**
   * Fetch user profile from Render database
   */
  async getUserProfile(): Promise<any | null> {
    try {
      const res = await fetch(`${RENDER_BACKEND_URL}/profile`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Render DB Profile fallback active", e);
    }
    return null;
  }

  /**
   * Fetch user addresses from Render database
   */
  async getAddresses(): Promise<any[]> {
    try {
      const res = await fetch(`${RENDER_BACKEND_URL}/addresses`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data : data.content || [];
      }
    } catch (e) {
      console.warn("Render DB Addresses fallback active", e);
    }
    return [];
  }

  /**
   * Fetch live user orders from Render database
   */
  async getMyOrders(): Promise<LiveOrder[]> {
    try {
      const res = await fetch(`${RENDER_BACKEND_URL}/orders`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data : data.content || [];
      }
    } catch (e) {
      console.warn("Render DB Orders fallback active", e);
    }
    return [];
  }

  /**
   * Fetch user cart from Render database
   */
  async getCart(): Promise<any | null> {
    try {
      const res = await fetch(`${RENDER_BACKEND_URL}/cart`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Render DB Cart fallback active", e);
    }
    return null;
  }
}

export const renderApi = RenderApiService.getInstance();

