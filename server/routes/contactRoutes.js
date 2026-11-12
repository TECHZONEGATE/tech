import { Router } from 'express';
import { ContactController } from '../controllers/contactController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = Router();

// Public: Submit contact form
router.post('/', ContactController.submitContact);

// Admin Protected
router.get('/admin/all', authenticateAdmin, ContactController.getContacts);
router.patch('/admin/:id', authenticateAdmin, ContactController.updateContactStatus);

export default router;
