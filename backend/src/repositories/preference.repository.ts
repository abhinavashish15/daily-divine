import { prisma } from '../config/prisma';
import { Preference, Prisma } from '@prisma/client';

export const preferenceRepository = {
  async findByUserId(userId: string): Promise<Preference | null> {
    return prisma.preference.findFirst({
      where: { userId },
    });
  },

  async upsert(userId: string, data: Prisma.PreferenceCreateInput | Prisma.PreferenceUpdateInput): Promise<Preference> {
    const existing = await this.findByUserId(userId);
    if (existing) {
      return prisma.preference.update({
        where: { id: existing.id },
        data: data as Prisma.PreferenceUpdateInput,
      });
    }
    return prisma.preference.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      } as Prisma.PreferenceCreateInput,
    });
  }
};
