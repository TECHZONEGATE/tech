import { Router } from 'express';
import { EnquiryController } from '../controllers/enquiryController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = Router();

// Public: Submit new enquiry
router.post('/', EnquiryController.submitEnquiry);

// Admin Protected routes
router.get('/admin/all', authenticateAdmin, EnquiryController.getEnquiries);
router.get('/admin/:id', authenticateAdmin, EnquiryController.getEnquiryById);
router.patch('/admin/:id', authenticateAdmin, EnquiryController.updateEnquiry);

export default router;
