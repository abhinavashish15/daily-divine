import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../services/auth.service';
import { apiClient } from '../lib/api-client';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setInitialized: (val: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isInitialized: false,
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        // Attempt backend logout (fire and forget)
        apiClient.post('/auth/logout').catch(() => {});
      },
      setUser: (user) => set({ user, isAuthenticated: true }),
      setInitialized: (val) => set({ isInitialized: val }),
    }),
    {
      name: 'auth-storage',
      // Persist token, user, and isAuthenticated so it survives reloads immediately
      partialize: (state) => ({ 
        token: state.token, 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
