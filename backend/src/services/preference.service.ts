import { preferenceRepository } from '../repositories/preference.repository';
import { Prisma } from '@prisma/client';

export const preferenceService = {
  async getPreferences(userId: string) {
    const prefs = await preferenceRepository.findByUserId(userId);
    return prefs || {};
  },

  async updatePreferences(userId: string, data: Prisma.PreferenceCreateInput | Prisma.PreferenceUpdateInput) {
    return preferenceRepository.upsert(userId, data);
  }
};
