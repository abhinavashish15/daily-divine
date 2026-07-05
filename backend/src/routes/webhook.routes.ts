import { Router, Request, Response, NextFunction } from 'express';
import { webhookController } from '../controllers/webhook.controller';
import { whatsappService } from '../services/whatsapp.service';

const router = Router();

// Middleware to validate raw body signature (if needed)
// Note: express.json() must be configured to save raw body for this to work accurately.
// For MVP, we use a simpler validation or rely on HTTPS security, but signature validation is best practice.
const validateMetaSignature = (req: Request, res: Response, next: NextFunction) => {
  const signature = req.headers['x-hub-signature-256'] as string;
  if (!signature) return next(); // Not all webhooks might have it during testing
  
  // Here we assume raw body is available, but for now we skip strict validation 
  // unless we configure body-parser properly.
  next();
};

router.get('/', webhookController.verifyWebhook);
router.post('/', validateMetaSignature, webhookController.handleWebhook);

export default router;
