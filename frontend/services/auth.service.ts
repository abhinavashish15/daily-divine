import { apiClient } from '../lib/api-client';
import { z } from 'zod';
import { loginSchema, registerSchema } from '../schemas/auth.schema';

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string | null;
}

export interface AuthResponse {
  user: User;
  session?: {
    access_token: string;
    refresh_token: string;
  };
}

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const res = await apiClient.post<{ data: AuthResponse }>('/auth/login', data);
    return res.data.data;
  },

  async register(data: RegisterData): Promise<{ user: User }> {
    const res = await apiClient.post<{ data: { user: User } }>('/auth/register', data);
    return res.data.data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },

  async getMe(): Promise<{ user: User }> {
    const res = await apiClient.get<{ data: { user: User } }>('/auth/me');
    return res.data.data;
  },
};
