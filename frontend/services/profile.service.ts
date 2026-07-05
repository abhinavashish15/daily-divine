import { apiClient } from '../lib/api-client';
import { User } from './auth.service';

export const profileService = {
  async getProfile(): Promise<User> {
    const res = await apiClient.get<{ data: User }>('/profile');
    return res.data.data;
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    const res = await apiClient.put<{ data: User }>('/profile', data);
    return res.data.data;
  },

  async deleteProfile(): Promise<void> {
    await apiClient.delete('/profile');
  }
};
