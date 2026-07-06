import { PrismaClient, Payment, Subscription } from '@prisma/client';

const prisma = new PrismaClient();

export class PaymentService {
  /**
   * Submit a manual UPI payment
   */
  async submitPayment(userId: string, data: { amount: number; plan: string; transactionId: string }): Promise<Payment> {
    const existing = await prisma.payment.findUnique({
      where: { transactionId: data.transactionId },
    });

    if (existing) {
      throw new Error('Transaction ID already exists');
    }

    return prisma.payment.create({
      data: {
        userId,
        amount: data.amount,
        plan: data.plan,
        transactionId: data.transactionId,
        status: 'PENDING',
      },
    });
  }

  /**
   * Get all pending payments (Admin only)
   */
  async getPendingPayments(): Promise<(Payment & { user: { name: string | null; email: string; phone: string | null } })[]> {
    return prisma.payment.findMany({
      where: { status: 'PENDING' },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Verify and approve a payment (Admin only)
   */
  async verifyPayment(paymentId: string): Promise<Payment> {
    const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
    
    if (!payment) {
      throw new Error('Payment not found');
    }
    
    if (payment.status !== 'PENDING') {
      throw new Error('Payment is not pending');
    }

    // 1. Update Payment Status
    const updatedPayment = await prisma.payment.update({
      where: { id: paymentId },
      data: { status: 'APPROVED' },
    });

    // 2. Update or Create Subscription
    // Calculate renewal date (1 month from now)
    const renewalDate = new Date();
    renewalDate.setMonth(renewalDate.getMonth() + 1);

    const existingSubscription = await prisma.subscription.findFirst({
      where: { userId: payment.userId },
    });

    if (existingSubscription) {
      await prisma.subscription.update({
        where: { id: existingSubscription.id },
        data: {
          plan: payment.plan.toUpperCase(),
          status: 'ACTIVE',
          renewalDate,
        },
      });
    } else {
      await prisma.subscription.create({
        data: {
          userId: payment.userId,
          plan: payment.plan.toUpperCase(),
          status: 'ACTIVE',
          renewalDate,
        },
      });
    }

    return updatedPayment;
  }

  /**
   * Reject a payment (Admin only)
   */
  async rejectPayment(paymentId: string): Promise<Payment> {
    const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
    
    if (!payment) {
      throw new Error('Payment not found');
    }

    if (payment.status !== 'PENDING') {
      throw new Error('Payment is not pending');
    }

    return prisma.payment.update({
      where: { id: paymentId },
      data: { status: 'REJECTED' },
    });
  }
}

export const paymentService = new PaymentService();
