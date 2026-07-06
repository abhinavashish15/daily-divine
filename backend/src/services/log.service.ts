import { PrismaClient, SystemLog } from '@prisma/client';

const prisma = new PrismaClient();

export class LogService {
  async getAllLogs(): Promise<SystemLog[]> {
    return prisma.systemLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100, // Limit to recent 100 logs for performance
    });
  }
}

export const logService = new LogService();
