import { env } from './env';

export const WHATSAPP_CONFIG = {
  API_VERSION: 'v18.0',
  get BASE_URL() {
    return `https://graph.facebook.com/${this.API_VERSION}`;
  },
  get PHONE_NUMBER_ID() {
    return env.WHATSAPP_PHONE_NUMBER_ID;
  },
  get ACCESS_TOKEN() {
    return env.WHATSAPP_ACCESS_TOKEN;
  },
  get VERIFY_TOKEN() {
    return env.WHATSAPP_VERIFY_TOKEN;
  },
  get APP_SECRET() {
    return env.META_APP_SECRET;
  },
};
