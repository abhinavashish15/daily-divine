import { whatsappService } from './whatsapp.service';
import { rotationService } from './rotation.service';
import { deliveryRepository } from '../repositories/delivery.repository';
import { prisma } from '../config/prisma';
import { getDeityForDay } from '../utils/dayToDeity';
import { AppError } from '../middlewares/error.middleware';

export const deliveryService = {
  async processDeliveryForUser(userId: string, targetDeity?: string): Promise<any> {
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { preferences: true } });
    if (!user || !user.phone) {
      throw new AppError('User not found or phone number missing', 404);
    }

    // Determine deity
    let deity = targetDeity;
    if (!deity) {
      const prefs = user.preferences?.[0];
      // If user has specific preferred deities, we could use them, else use daily
      if (prefs?.preferredDeities && prefs.preferredDeities.length > 0) {
        // For simplicity, just use the first one or combine with daily
        deity = prefs.preferredDeities[0];
      } else {
        deity = getDeityForDay();
      }
    }

    // Pick image
    const image = await rotationService.getImageForDeity(deity);

    // Create pending delivery record
    const delivery = await deliveryRepository.create({
      userId: user.id,
      imageId: image.id,
      status: 'PENDING',
    });

    await deliveryRepository.createLog({
      deliveryId: delivery.id,
      event: 'CREATED',
      payload: { deity, imageId: image.id },
    });

    try {
      // Send message
      // Ensure phone is formatted correctly for WhatsApp Cloud API (e.g., removing '+' or '00')
      let formattedPhone = user.phone.replace(/[^0-9]/g, '');

      // If it's a 10-digit number (common in India), prepend the country code '91'
      if (formattedPhone.length === 10) {
        formattedPhone = '91' + formattedPhone;
      }

      const caption = image.caption || '';

      // Now using the approved template message
      const response = await whatsappService.sendTemplateImageMessage(
        formattedPhone,
        image.imageUrl,
        caption
      );
      const messageId = response.messages?.[0]?.id;

      // Update delivery record on success
      await deliveryRepository.update(delivery.id, {
        status: 'PROCESSING',
        messageId,
        sentAt: new Date(),
      });

      await deliveryRepository.createLog({
        deliveryId: delivery.id,
        event: 'API_REQUEST_SUCCESS',
        payload: { messageId, response },
      });

      // Update image statistics
      await prisma.image.update({
        where: { id: image.id },
        data: {
          timesUsed: { increment: 1 },
          lastSent: new Date(),
        },
      });

      return { success: true, deliveryId: delivery.id, messageId };

    } catch (error: any) {
      // Handle failure
      const errorMessage = error.message || 'Unknown error';
      await deliveryRepository.update(delivery.id, {
        status: 'FAILED',
        errorMessage,
      });

      await deliveryRepository.createLog({
        deliveryId: delivery.id,
        event: 'API_REQUEST_FAILED',
        payload: { error: errorMessage },
      });

      throw new AppError(`Delivery failed: ${errorMessage}`, 500);
    }
  },

  async handleWebhookStatusUpdate(messageId: string, status: string, errorObj?: any) {
    const delivery = await prisma.delivery.findFirst({ where: { messageId } });
    if (!delivery) {
      console.warn(`Webhook received for unknown messageId: ${messageId}`);
      return;
    }

    // Map WhatsApp status to our status
    let mappedStatus = delivery.status;
    if (status === 'sent') mappedStatus = 'PROCESSING';
    if (status === 'delivered') mappedStatus = 'DELIVERED';
    if (status === 'read') mappedStatus = 'READ';
    if (status === 'failed') mappedStatus = 'FAILED';

    await deliveryRepository.update(delivery.id, {
      status: mappedStatus,
      errorMessage: errorObj ? JSON.stringify(errorObj) : null,
    });

    await deliveryRepository.createLog({
      deliveryId: delivery.id,
      event: `WEBHOOK_STATUS_${status.toUpperCase()}`,
      payload: errorObj || { status },
    });
  },

  async getDeliveries(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      deliveryRepository.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { user: true, image: true },
      }),
      deliveryRepository.count(),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getDeliveryById(id: string) {
    const delivery = await deliveryRepository.findById(id);
    if (!delivery) {
      throw new AppError('Delivery not found', 404);
    }
    return delivery;
  },

  async getUserHistory(userId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      deliveryRepository.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { image: true },
      }),
      deliveryRepository.count({ where: { userId } }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getDashboardStats() {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [totalToday, delivered, failed, pending] = await Promise.all([
      deliveryRepository.count({ where: { createdAt: { gte: startOfToday } } }),
      deliveryRepository.count({ where: { createdAt: { gte: startOfToday }, status: 'DELIVERED' } }),
      deliveryRepository.count({ where: { createdAt: { gte: startOfToday }, status: 'FAILED' } }),
      deliveryRepository.count({ where: { createdAt: { gte: startOfToday }, status: 'PENDING' } }),
    ]);

    const successRate = totalToday > 0 ? ((delivered / totalToday) * 100).toFixed(2) : 0;

    return {
      totalToday,
      delivered,
      failed,
      pending,
      successRate,
    };
  }
};
