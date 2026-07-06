import { apiClient } from '../lib/api-client';

export interface UserDashboardData {
  subscription: {
    id: string;
    plan: string;
    status: string;
    renewalDate: string | null;
  } | null;
  preference: {
    language: string;
    deliveryTime: string;
    festivalEnabled: boolean;
    preferredDeities: string[];
  } | null;
  deliveriesCount: number;
  recentDeliveries: Array<{
    id: string;
    status: string;
    createdAt: string;
    image: {
      deity: string;
      imageUrl: string;
    };
  }>;
}

export const dashboardService = {
  getUserDashboard: async (): Promise<UserDashboardData> => {
    const response = await apiClient.get<{ data: UserDashboardData }>('/dashboard/me');
    return response.data.data;
  },
};
