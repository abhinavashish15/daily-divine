import { Router } from 'express';
import { getAllUsers, toggleAutomation } from '../controllers/user.controller';

const router = Router();

router.get('/', getAllUsers);
router.patch('/:id/automation', toggleAutomation);

export default router;
