import { z } from 'zod';

export const updatePreferenceSchema = z.object({
  body: z.object({
    language: z.string().optional(),
    deliveryTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)').optional(),
    festivalEnabled: z.boolean().optional(),
    preferredDeities: z.array(z.string()).optional(),
  }),
});
