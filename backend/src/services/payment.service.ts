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
  async getPendingPayments(): Promise<(Payment & { user: { name: string | null; email: string; phone: string | null } | null })[]> {
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
    const payment = await prisma.payment.findUnique({ 
      where: { id: paymentId },
      include: { user: true }
    });
    
    if (!payment) {
      throw new Error('Payment not found');
    }
    
    if (payment.status !== 'PENDING') {
      throw new Error('Payment is not pending');
    }

    if (!payment.userId) {
      // User was deleted. Just approve the payment to keep the revenue stat.
      const updatedPayment = await prisma.payment.update({
        where: { id: paymentId },
        data: { status: 'APPROVED' },
      });
      return updatedPayment;
    }

    // 1. Update Payment Status
    const updatedPayment = await prisma.payment.update({
      where: { id: paymentId },
      data: { status: 'APPROVED' },
    });

    // 2. Update or Create Subscription
    // Calculate renewal date based on plan type
    const renewalDate = new Date();
    const planType = payment.plan.toUpperCase();
    
    if (planType === 'WEEKLY') {
      renewalDate.setDate(renewalDate.getDate() + 7);
    } else if (planType === 'YEARLY') {
      renewalDate.setFullYear(renewalDate.getFullYear() + 1);
    } else {
      // Default to monthly if MONTHLY or unknown
      renewalDate.setMonth(renewalDate.getMonth() + 1);
    }

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

    // 3. Create System Log
    await prisma.systemLog.create({
      data: {
        action: 'PAYMENT_APPROVED',
        message: `Payment of ₹${payment.amount} for ${payment.plan} plan approved for ${(payment as any).user?.email}`,
        metadata: { paymentId: payment.id, userId: payment.userId }
      }
    });

    return updatedPayment;
  }

  /**
   * Reject a payment (Admin only)
   */
  async rejectPayment(paymentId: string): Promise<Payment> {
    const payment = await prisma.payment.findUnique({ 
      where: { id: paymentId },
      include: { user: true }
    });
    
    if (!payment) {
      throw new Error('Payment not found');
    }

    if (payment.status !== 'PENDING') {
      throw new Error('Payment is not pending');
    }

    const updatedPayment = await prisma.payment.update({
      where: { id: paymentId },
      data: { status: 'REJECTED' },
    });

    // Create System Log
    await prisma.systemLog.create({
      data: {
        action: 'PAYMENT_REJECTED',
        message: `Payment of ₹${payment.amount} for ${payment.plan} plan rejected${payment.userId ? ` for ${(payment as any).user?.email}` : ' (User Deleted)'}`,
        metadata: { paymentId: payment.id, userId: payment.userId || null }
      }
    });

    return updatedPayment;
  }
}

export const paymentService = new PaymentService();
