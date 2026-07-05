import { Request, Response, NextFunction } from 'express';
import { whatsappService } from '../services/whatsapp.service';
import { deliveryService } from '../services/delivery.service';

export const webhookController = {
  // Webhook Verification (GET)
  verifyWebhook(req: Request, res: Response, next: NextFunction) {
    try {
      const mode = req.query['hub.mode'] as string;
      const token = req.query['hub.verify_token'] as string;
      const challenge = req.query['hub.challenge'] as string;

      if (!mode || !token) {
        res.sendStatus(400);
        return;
      }

      const verifiedChallenge = whatsappService.verifyWebhook(mode, token, challenge);
      if (verifiedChallenge) {
        res.status(200).send(verifiedChallenge);
      } else {
        res.sendStatus(403);
      }
    } catch (error) {
      next(error);
    }
  },

  // Webhook Receiver (POST)
  async handleWebhook(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      
      // WhatsApp payload format
      if (body.object === 'whatsapp_business_account') {
        for (const entry of body.entry) {
          for (const change of entry.changes) {
            const value = change.value;

            // Handle statuses
            if (value.statuses && value.statuses.length > 0) {
              for (const statusObj of value.statuses) {
                const messageId = statusObj.id;
                const status = statusObj.status; // 'sent', 'delivered', 'read', 'failed'
                const errors = statusObj.errors;
                
                await deliveryService.handleWebhookStatusUpdate(messageId, status, errors);
              }
            }

            // (Optional) Handle incoming messages if needed in the future
            if (value.messages && value.messages.length > 0) {
              // Not requested for MVP but good place to put it
            }
          }
        }
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error('Webhook error:', error);
      res.sendStatus(500); // Meta requires 200/500 responses quickly
    }
  }
};
