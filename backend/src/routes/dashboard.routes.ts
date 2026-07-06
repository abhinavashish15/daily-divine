import { Router } from 'express';
import { dashboardController } from '../controllers/dashboard.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { requireAdmin } from '../middlewares/admin.middleware';

const router = Router();

// User route
router.get('/me', requireAuth, dashboardController.getUserDashboard);

// Admin route
router.get('/', requireAuth, requireAdmin, dashboardController.getDashboard);

export default router;
