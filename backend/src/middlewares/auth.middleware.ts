import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { AppError } from './error.middleware';
import { userRepository } from '../repositories/user.repository';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Unauthorized - No token provided', 401);
    }

    const token = authHeader.split(' ')[1];

    // Verify token using Supabase
    const { data: { user: authUser }, error } = await supabase.auth.getUser(token);

    if (error || !authUser) {
      throw new AppError('Unauthorized - Invalid token', 401);
    }

    // Fetch user from DB to get role and details
    const user = await userRepository.findById(authUser.id);
    if (!user) {
      throw new AppError('Unauthorized - User not found', 401);
    }

    // Attach user to request
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      phone: user.phone,
    };

    next();
  } catch (error) {
    next(error);
  }
};
