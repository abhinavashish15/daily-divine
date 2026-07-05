import { WHATSAPP_CONFIG } from '../config/whatsapp';
import crypto from 'crypto';
import { AppError } from '../middlewares/error.middleware';

export const whatsappService = {
  async sendTextMessage(to: string, text: string): Promise<any> {
    if (!WHATSAPP_CONFIG.PHONE_NUMBER_ID || !WHATSAPP_CONFIG.ACCESS_TOKEN) {
      throw new AppError('WhatsApp configuration is missing', 500);
    }

    const url = `${WHATSAPP_CONFIG.BASE_URL}/${WHATSAPP_CONFIG.PHONE_NUMBER_ID}/messages`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_CONFIG.ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'text',
        text: { preview_url: false, body: text },
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new AppError(data.error?.message || 'Failed to send WhatsApp message', response.status);
    }
    return data;
  },

  async sendImageMessage(to: string, imageUrl: string, caption?: string): Promise<any> {
    if (!WHATSAPP_CONFIG.PHONE_NUMBER_ID || !WHATSAPP_CONFIG.ACCESS_TOKEN) {
      throw new AppError('WhatsApp configuration is missing', 500);
    }

    const url = `${WHATSAPP_CONFIG.BASE_URL}/${WHATSAPP_CONFIG.PHONE_NUMBER_ID}/messages`;
    
    const payload: any = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'image',
      image: { link: imageUrl },
    };

    if (caption) {
      payload.image.caption = caption;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_CONFIG.ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new AppError(data.error?.message || 'Failed to send WhatsApp image', response.status);
    }
    return data;
  },

  async sendTemplateImageMessage(to: string, imageUrl: string, caption: string): Promise<any> {
    if (!WHATSAPP_CONFIG.PHONE_NUMBER_ID || !WHATSAPP_CONFIG.ACCESS_TOKEN) {
      throw new AppError('WhatsApp configuration is missing', 500);
    }

    const url = `${WHATSAPP_CONFIG.BASE_URL}/${WHATSAPP_CONFIG.PHONE_NUMBER_ID}/messages`;
    
    // We assume a template named 'daily_blessing' exists in Meta
    // with 1 header variable (the image URL) and 1 body variable (the caption)
    const payload: any = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'template',
      template: {
        name: 'daily_blessing',
        language: { code: 'en' },
        components: [
          {
            type: 'header',
            parameters: [
              {
                type: 'image',
                image: { link: imageUrl }
              }
            ]
          },
          {
            type: 'body',
            parameters: [
              {
                type: 'text',
                text: caption
              }
            ]
          }
        ]
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_CONFIG.ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new AppError(data.error?.message || 'Failed to send WhatsApp template image', response.status);
    }
    return data;
  },

  verifyWebhook(mode: string, token: string, challenge: string): string | null {
    if (mode === 'subscribe' && token === WHATSAPP_CONFIG.VERIFY_TOKEN) {
      return challenge;
    }
    return null;
  },

  validateSignature(payload: string, signature: string): boolean {
    if (!WHATSAPP_CONFIG.APP_SECRET) return true; // Skip validation if no secret
    const expectedSignature = 'sha256=' + crypto.createHmac('sha256', WHATSAPP_CONFIG.APP_SECRET)
      .update(payload, 'utf8')
      .digest('hex');
    return crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature));
  }
};
