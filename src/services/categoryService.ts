import { fetchWithAuth, API_URL } from './api';
import { cache } from 'react';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  image: string | null;
  parentId: string | null;
  isActive: boolean;
  sortOrder: number;
  attributes?: any;
  createdAt: string;
  updatedAt: string;
  children?: Category[];
  _count?: {
    children: number;
  };
}

export const categoryService = {
  // Public route - uncached (legacy/client usage)
  async getCategories(): Promise<Category[]> {
    const res = await fetch(`${API_URL}/categories`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch categories');
    return data;
  },

  // Admin routes
  async getAdminCategories(): Promise<Category[]> {
    const res = await fetchWithAuth('/categories/admin');
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch admin categories');
    return data;
  },

  async createCategory(categoryData: Partial<Category>): Promise<Category> {
    const res = await fetchWithAuth('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create category');
    return data;
  },

  async updateCategory(id: string, categoryData: Partial<Category>): Promise<Category> {
    const res = await fetchWithAuth(`/categories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(categoryData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update category');
    return data;
  },

  async toggleCategoryActive(id: string, isActive: boolean): Promise<Category> {
    const res = await fetchWithAuth(`/categories/${id}/toggle`, {
      method: 'PATCH',
      body: JSON.stringify({ isActive }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to toggle category status');
    return data;
  },

  async deleteCategory(id: string): Promise<void> {
    const res = await fetchWithAuth(`/categories/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete category');
  }
};

// Cached version for Server Components (request-deduplicated)
export const getCachedCategories = cache(async (options?: RequestInit): Promise<Category[]> => {
  try {
    const res = await fetch(`${API_URL}/categories`, options || { next: { revalidate: 60 } });
    if (!res.ok) return [];
    
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch cached categories:", error);
    return [];
  }
});
