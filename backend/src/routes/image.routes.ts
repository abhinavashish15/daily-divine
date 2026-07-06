import { Router } from 'express';
import { imageController } from '../controllers/image.controller';
// import { requireAuth } from '../middlewares/auth.middleware';
// import { requireAdmin } from '../middlewares/admin.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createImageSchema, updateImageSchema } from '../validators/image.validator';

const router = Router();

// Temporarily disabled for local admin panel testing without Supabase token
// router.use(requireAuth);

router.get('/', imageController.getAllImages);
router.post('/', validate(createImageSchema), imageController.createImage);
router.put('/:id', validate(updateImageSchema), imageController.updateImage);
router.delete('/:id', imageController.deleteImage);

export default router;
