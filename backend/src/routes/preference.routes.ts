import { Router } from 'express';
import { preferenceController } from '../controllers/preference.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { updatePreferenceSchema } from '../validators/preference.validator';

const router = Router();

router.use(requireAuth);

router.get('/', preferenceController.getPreferences);
router.put('/', validate(updatePreferenceSchema), preferenceController.updatePreferences);

export default router;
