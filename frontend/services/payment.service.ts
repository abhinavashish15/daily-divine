import { apiClient } from '../lib/api-client';

export interface PaymentData {
  amount: number;
  plan: string;
  transactionId: string;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  plan: string;
  transactionId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
  user?: {
    name: string | null;
    email: string;
    phone: string | null;
  };
}

export const paymentService = {
  submitPayment: async (data: PaymentData) => {
    const response = await apiClient.post('/payments', data);
    return response.data;
  },

  getPendingPayments: async () => {
    const response = await apiClient.get('/payments/pending');
    return response.data;
  },

  verifyPayment: async (id: string) => {
    const response = await apiClient.post(`/payments/${id}/verify`);
    return response.data;
  },

  rejectPayment: async (id: string) => {
    const response = await apiClient.post(`/payments/${id}/reject`);
    return response.data;
  },
};
