import { Router } from 'express';
import { SeminarController } from '../controllers/seminarController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = Router();

// Public: Get published seminars & register
router.get('/', SeminarController.getPublicSeminars);
router.post('/register', SeminarController.registerForSeminar);

// Admin Protected
router.get('/admin/all', authenticateAdmin, SeminarController.getAdminSeminars);
router.post('/admin', authenticateAdmin, SeminarController.createSeminar);
router.patch('/admin/:id', authenticateAdmin, SeminarController.updateSeminar);
router.delete('/admin/:id', authenticateAdmin, SeminarController.deleteSeminar);
router.get('/admin/registrations', authenticateAdmin, SeminarController.getSeminarRegistrations);

export default router;
