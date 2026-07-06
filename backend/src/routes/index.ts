import { Router } from 'express';
import authRoutes from './auth.routes';
import profileRoutes from './profile.routes';
import preferenceRoutes from './preference.routes';
import imageRoutes from './image.routes';
import dashboardRoutes from './dashboard.routes';

import deliveryRoutes from './delivery.routes';
import webhookRoutes from './webhook.routes';
import userRoutes from './user.routes';
import paymentRoutes from './payment.routes';
import logRoutes from './log.routes';
import adminRoutes from './admin.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/preferences', preferenceRoutes);
router.use('/images', imageRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/deliveries', deliveryRoutes);
router.use('/webhook', webhookRoutes);
router.use('/users', userRoutes);
router.use('/payments', paymentRoutes);
router.use('/logs', logRoutes);
router.use('/admin', adminRoutes);

export default router;
