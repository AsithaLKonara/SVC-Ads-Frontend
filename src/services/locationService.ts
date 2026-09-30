import { API_URL } from './api';

export interface LocationGroup {
  district: string;
  city: string;
  _count: {
    id: number; // Number of active ads
  };
}

export const locationService = {
  // Public route to get dynamically derived locations
  async getLocations(): Promise<LocationGroup[]> {
    const res = await fetch(`${API_URL}/locations`, { next: { revalidate: 60 } });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch locations');
    return data;
  },
};
