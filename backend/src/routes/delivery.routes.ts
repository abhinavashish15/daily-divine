import { Router } from 'express';
import { deliveryController } from '../controllers/delivery.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { requireAdmin } from '../middlewares/admin.middleware';

const router = Router();

// Test delivery (admin only)
router.post('/send', requireAuth, requireAdmin, deliveryController.sendTestDelivery);

// Get paginated deliveries (admin only)
router.get('/', requireAuth, requireAdmin, deliveryController.getDeliveries);

// Get dashboard stats (admin only)
router.get('/dashboard', requireAuth, requireAdmin, deliveryController.getDashboardStats);

// Get specific delivery details (admin only)
router.get('/:id', requireAuth, requireAdmin, deliveryController.getDeliveryById);

export default router;
