import { Request, Response } from 'express';
import { paymentService } from '../services/payment.service';

export class PaymentController {
  async submitPayment(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

      const { amount, plan, transactionId } = req.body;
      
      if (!amount || !plan || !transactionId) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      const payment = await paymentService.submitPayment(userId, { amount, plan, transactionId });
      
      res.status(201).json({
        success: true,
        message: 'Payment submitted successfully',
        data: payment,
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getPendingPayments(req: Request, res: Response) {
    try {
      const payments = await paymentService.getPendingPayments();
      res.status(200).json({ success: true, data: payments });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async verifyPayment(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const payment = await paymentService.verifyPayment(id);
      
      res.status(200).json({
        success: true,
        message: 'Payment approved successfully',
        data: payment,
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async rejectPayment(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const payment = await paymentService.rejectPayment(id);
      
      res.status(200).json({
        success: true,
        message: 'Payment rejected',
        data: payment,
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export const paymentController = new PaymentController();
