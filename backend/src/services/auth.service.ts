import { supabase } from '../config/supabase';
import { userRepository } from '../repositories/user.repository';
import { AppError } from '../middlewares/error.middleware';

export const authService = {
  async register({ email, password, name, phone }: any) {
    // 1. Sign up user in Supabase
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto confirm for now
      user_metadata: { name },
    });

    if (authError || !authData.user) {
      throw new AppError(authError?.message || 'Failed to create user in Auth', 400);
    }

    // 2. Create user record in our database
    const user = await userRepository.create({
      id: authData.user.id,
      email,
      name,
      phone,
    });

    return { user };
  },

  async login({ email, password }: any) {
    // 1. Sign in with Supabase to get the session
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      throw new AppError(error?.message || 'Invalid credentials', 401);
    }

    // 2. Get user from our database to return full profile
    const user = await userRepository.findById(data.user.id);
    if (!user) {
      throw new AppError('User not found in database', 404);
    }

    return {
      user,
      session: data.session,
    };
  },

  async logout(token: string) {
    // Since we're using REST, we can just call supabase to sign out the specific token if needed
    // or rely on frontend to destroy it. For backend completeness:
    const { error } = await supabase.auth.admin.signOut(token);
    if (error) {
      console.error('Logout error:', error.message);
    }
  },
};
