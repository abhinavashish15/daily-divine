import { Router } from 'express';
import { logController } from '../controllers/log.controller';
import { requireAuth, requireAdmin } from '../middlewares/auth.middleware';

const router = Router();

// Get system logs (Admin only)
router.get('/', requireAuth, requireAdmin, logController.getLogs);

export default router;
