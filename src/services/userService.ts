import { fetchWithAuth } from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'STAFF';
  createdAt: string;
}

export const userService = {
  async getUsers(): Promise<User[]> {
    const res = await fetchWithAuth('/users');
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch users');
    return data;
  },

  async createUser(userData: Partial<User> & { password?: string }): Promise<User> {
    const res = await fetchWithAuth('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create user');
    return data.user;
  },

  async updateUserRole(id: string, role: 'ADMIN' | 'STAFF'): Promise<User> {
    const res = await fetchWithAuth(`/users/${id}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update user role');
    return data.user;
  },

  async deleteUser(id: string): Promise<void> {
    const res = await fetchWithAuth(`/users/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete user');
  }
};
