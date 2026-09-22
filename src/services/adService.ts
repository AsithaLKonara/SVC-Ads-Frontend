import { fetchWithAuth, API_URL } from './api';
import { Category } from './categoryService';

export interface Ad {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  condition?: string;
  images: string[];
  district: string;
  city: string;
  isFeatured: boolean;
  contactPhone?: string;
  attributes?: Record<string, any>;
  categoryId: string;
  category?: Category;
  userId: string;
  user?: { id: string; name: string; email?: string };
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export const adService = {
  // Public routes
  async getAds(params?: Record<string, string>): Promise<Ad[]> {
    const queryString = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/ads${queryString ? `?${queryString}` : ''}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch ads');
    return data;
  },

  async getAd(identifier: string): Promise<Ad> {
    const res = await fetch(`${API_URL}/ads/${identifier}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch ad');
    return data;
  },

  // Admin routes
  async createAd(adData: Partial<Ad>): Promise<Ad> {
    const res = await fetchWithAuth('/ads', {
      method: 'POST',
      body: JSON.stringify(adData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create ad');
    return data;
  },

  async updateAd(id: string, adData: Partial<Ad>): Promise<Ad> {
    const res = await fetchWithAuth(`/ads/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(adData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update ad');
    return data;
  },

  async toggleAdStatus(id: string, status: 'ACTIVE' | 'INACTIVE'): Promise<Ad> {
    const res = await fetchWithAuth(`/ads/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to toggle ad status');
    return data;
  },

  async deleteAd(id: string): Promise<void> {
    const res = await fetchWithAuth(`/ads/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete ad');
  }
};
