import { Router } from 'express';
import { CourseController } from '../controllers/courseController.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = Router();

// Public: Get all courses & single course by slug
router.get('/', CourseController.getCourses);
router.get('/:slug', CourseController.getCourseBySlug);

// Admin Protected
router.patch('/admin/:id', authenticateAdmin, CourseController.updateCourse);

export default router;
