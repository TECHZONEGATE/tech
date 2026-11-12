import { Router } from 'express';
import { AdminController } from '../controllers/adminController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = Router();

// Admin Auth
router.post('/login', AdminController.login);
router.get('/me', authenticateAdmin, AdminController.getMe);
router.get('/stats', authenticateAdmin, AdminController.getStats);

// Settings
router.get('/settings', AdminController.getSettings); // Public access for footer/navbar/contact
router.patch('/settings', authenticateAdmin, AdminController.updateSettings);

export default router;
