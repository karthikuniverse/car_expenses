import express, { Router } from 'express';
import { registerUser, loginUser, getMe, verifyEmail, resetPassword } from '../controllers/authController';
import { protect } from '../middlewares/authMiddleware';

const router: Router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-email', verifyEmail);
router.post('/reset-password', resetPassword);
router.get('/me', protect, getMe);

export default router;

