import { Router } from 'express';
import { paymentController } from '../controllers/payment.controller';
import { requireAuth, requireAdmin } from '../middlewares/auth.middleware';

const router = Router();

// User routes
router.post('/', requireAuth, paymentController.submitPayment);

// Admin routes
router.get('/pending', requireAuth, requireAdmin, paymentController.getPendingPayments);
router.post('/:id/verify', requireAuth, requireAdmin, paymentController.verifyPayment);
router.post('/:id/reject', requireAuth, requireAdmin, paymentController.rejectPayment);

export default router;
