import { apiClient } from '../lib/api-client';

export interface SystemLog {
  id: string;
  action: string;
  message: string;
  metadata?: any;
  createdAt: string;
}

export const logService = {
  getSystemLogs: async () => {
    const response = await apiClient.get('/logs');
    return response.data;
  },
};
