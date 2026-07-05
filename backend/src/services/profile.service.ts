import { userRepository } from '../repositories/user.repository';
import { AppError } from '../middlewares/error.middleware';
import { Prisma } from '@prisma/client';
import { supabase } from '../config/supabase';

export const profileService = {
  async getProfile(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  },

  async updateProfile(userId: string, data: Prisma.UserUpdateInput) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return userRepository.update(userId, data);
  },

  async deleteProfile(userId: string) {
    // 1. Delete from Supabase Auth completely using Admin API
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (error) {
      throw new AppError(error.message || 'Failed to delete user from authentication provider', 400);
    }

    // 2. Delete from local Prisma database
    return userRepository.delete(userId);
  }
};
