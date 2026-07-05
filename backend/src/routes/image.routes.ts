import { Router } from 'express';
import { imageController } from '../controllers/image.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { requireAdmin } from '../middlewares/admin.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createImageSchema, updateImageSchema } from '../validators/image.validator';

const router = Router();

router.use(requireAuth);

// Accessible by authenticated users
router.get('/', imageController.getAllImages);

// Accessible only by admins
router.post('/', requireAdmin, validate(createImageSchema), imageController.createImage);
router.put('/:id', requireAdmin, validate(updateImageSchema), imageController.updateImage);
router.delete('/:id', requireAdmin, imageController.deleteImage);

export default router;
