import { apiClient } from '../lib/api-client';

export interface AdminUserStats {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  plan: string;
  daysLeft: number;
}

export interface AdminDashboardStats {
  totalRevenue: number;
  totalUsers: number;
  users: AdminUserStats[];
}

export const adminService = {
  getDashboardStats: async () => {
    const response = await apiClient.get('/admin/stats');
    return response.data;
  },
};
