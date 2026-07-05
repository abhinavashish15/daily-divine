export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
}

export interface UserSession {
  id: string;
  email: string;
  role: string;
  name?: string | null;
  phone?: string | null;
}

// Extend Express Request
declare global {
  namespace Express {
    interface Request {
      user?: UserSession;
    }
  }
}
