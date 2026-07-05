"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/services/auth.service";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { token, setUser, setInitialized, logout } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          const res = await authService.getMe();
          setUser(res.user);
        } catch (error) {
          // Token might be expired or invalid
          console.error("Failed to fetch user session", error);
          logout();
        }
      }
      setInitialized(true);
    };

    initializeAuth();
  }, [token, setUser, setInitialized, logout]);

  return <>{children}</>;
}
