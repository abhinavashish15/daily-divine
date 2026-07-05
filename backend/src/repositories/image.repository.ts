import { prisma } from '../config/prisma';
import { Image, Prisma } from '@prisma/client';

export const imageRepository = {
  async findAll(): Promise<Image[]> {
    return prisma.image.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  async findById(id: string): Promise<Image | null> {
    return prisma.image.findUnique({ where: { id } });
  },

  async create(data: Prisma.ImageCreateInput): Promise<Image> {
    return prisma.image.create({ data });
  },

  async update(id: string, data: Prisma.ImageUpdateInput): Promise<Image> {
    return prisma.image.update({
      where: { id },
      data,
    });
  },

  async delete(id: string): Promise<Image> {
    return prisma.image.delete({ where: { id } });
  },

  async count(): Promise<number> {
    return prisma.image.count();
  },

  async countActive(): Promise<number> {
    return prisma.image.count({ where: { active: true } });
  },

  async findRecent(limit: number): Promise<Image[]> {
    return prisma.image.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
};
