import { z } from 'zod';

export const createImageSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    deity: z.string().min(1, 'Deity is required'),
    imageUrl: z.string().url('Invalid image URL'),
    caption: z.string().optional(),
    active: z.boolean().optional(),
  }),
});

export const updateImageSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    deity: z.string().optional(),
    imageUrl: z.string().url('Invalid image URL').optional(),
    caption: z.string().optional(),
    active: z.boolean().optional(),
  }),
});
