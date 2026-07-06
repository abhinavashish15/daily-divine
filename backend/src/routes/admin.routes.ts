import { Router } from 'express';
import { adminController } from '../controllers/admin.controller';
import { requireAuth, requireAdmin } from '../middlewares/auth.middleware';

const router = Router();

// Get admin dashboard stats (Admin only)
router.get('/stats', requireAuth, requireAdmin, adminController.getDashboardStats);

export default router;
