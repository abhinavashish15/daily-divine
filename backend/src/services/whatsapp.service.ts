import { Client, LocalAuth, MessageMedia } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import puppeteer from 'puppeteer';
import { AppError } from '../middlewares/error.middleware';
import { deliveryService } from './delivery.service'; // We will need to update this to handle statuses

let client: Client | null = null;
let isReady = false;

export const whatsappService = {
  async initialize() {
    console.log('🔄 Initializing whatsapp-web.js client...');

    // Always use the top-level puppeteer executable path
    let execPath = await puppeteer.executablePath();

    client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        ...(execPath ? { executablePath: execPath } : {}),
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu',
          '--disable-features=site-per-process',
        ],
      }
    });

    client.on('qr', (qr) => {
      console.log('📱 Scan this QR code with WhatsApp to log in:');
      qrcode.generate(qr, { small: true });
      
      const qrUrl = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encodeURIComponent(qr)}&choe=UTF-8`;
      console.log(`\n\n⚠️ IF THE QR CODE ABOVE IS TOO BIG, CLICK THIS LINK TO OPEN IT IN YOUR BROWSER:\n${qrUrl}\n\n`);
    });

    client.on('ready', () => {
      console.log('✅ WhatsApp Client is ready!');
      isReady = true;
    });

    client.on('authenticated', () => {
      console.log('✅ WhatsApp Authenticated!');
    });

    client.on('auth_failure', msg => {
      console.error('❌ WhatsApp Authentication failure:', msg);
    });

    client.on('message_ack', async (msg, ack) => {
      /*
        ACK values:
        1: Sent
        2: Received
        3: Read
        4: Played
      */
      let statusStr = 'sent';
      if (ack === 2) statusStr = 'delivered';
      if (ack === 3) statusStr = 'read';
      
      try {
        if (msg.id._serialized) {
          // This calls the existing deliveryService handler, we just map the ack
          await deliveryService.handleWebhookStatusUpdate(msg.id._serialized, statusStr, []);
        }
      } catch (err) {
        // Log silently
      }
    });

    client.initialize();
  },

  async sendTextMessage(to: string, text: string): Promise<any> {
    if (!client || !isReady) {
      throw new AppError('WhatsApp client is not ready', 503);
    }
    try {
      const response = await client.sendMessage(to, text);
      return { success: true, messageId: response.id._serialized };
    } catch (error: any) {
      throw new AppError(error.message || 'Failed to send text message', 500);
    }
  },

  async sendImageMessage(to: string, imageUrl: string, caption?: string): Promise<any> {
    if (!client || !isReady) {
      throw new AppError('WhatsApp client is not ready', 503);
    }
    try {
      const media = await MessageMedia.fromUrl(imageUrl);
      const response = await client.sendMessage(to, media, { caption });
      return { success: true, messageId: response.id._serialized };
    } catch (error: any) {
      throw new AppError(error.message || 'Failed to send image', 500);
    }
  },

  async sendTemplateImageMessage(to: string, imageUrl: string, caption: string): Promise<any> {
    // whatsapp-web.js doesn't use Meta Templates. We just send a regular image.
    return this.sendImageMessage(to, imageUrl, caption);
  }
};
