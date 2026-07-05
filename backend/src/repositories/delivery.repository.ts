import { prisma } from '../config/prisma';
import { Delivery, DeliveryLog, Prisma } from '@prisma/client';

export const deliveryRepository = {
  async create(data: Prisma.DeliveryUncheckedCreateInput): Promise<Delivery> {
    return prisma.delivery.create({ data });
  },

  async update(id: string, data: Prisma.DeliveryUpdateInput): Promise<Delivery> {
    return prisma.delivery.update({
      where: { id },
      data,
    });
  },

  async updateByMessageId(messageId: string, data: Prisma.DeliveryUpdateInput): Promise<Delivery | null> {
    const delivery = await prisma.delivery.findFirst({ where: { messageId } });
    if (!delivery) return null;
    return prisma.delivery.update({
      where: { id: delivery.id },
      data,
    });
  },

  async findById(id: string): Promise<Delivery | null> {
    return prisma.delivery.findUnique({
      where: { id },
      include: { user: true, image: true, logs: true },
    });
  },

  async findMany(args?: Prisma.DeliveryFindManyArgs): Promise<Delivery[]> {
    return prisma.delivery.findMany(args);
  },

  async count(args?: Prisma.DeliveryCountArgs): Promise<number> {
    return prisma.delivery.count(args);
  },

  async createLog(data: Prisma.DeliveryLogUncheckedCreateInput): Promise<DeliveryLog> {
    return prisma.deliveryLog.create({ data });
  },

  async findLogsByDelivery(deliveryId: string): Promise<DeliveryLog[]> {
    return prisma.deliveryLog.findMany({
      where: { deliveryId },
      orderBy: { createdAt: 'desc' },
    });
  }
};
