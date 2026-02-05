import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.post('/login', authController.login);
router.get('/verify', verifyToken, authController.verify);

export default router;
