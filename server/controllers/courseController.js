import { StorageService } from '../services/storageService.js';

export const CourseController = {
  async getCourses(req, res) {
    try {
      const courses = StorageService.getCourses();
      return res.json({ success: true, count: courses.length, courses });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch courses.' });
    }
  },

  async getCourseBySlug(req, res) {
    try {
      const { slug } = req.params;
      const course = StorageService.getCourseBySlug(slug);
      if (!course) {
        return res.status(404).json({ error: 'Course not found.' });
      }
      return res.json({ success: true, course });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch course details.' });
    }
  },

  async updateCourse(req, res) {
    try {
      const { id } = req.params;
      const updated = StorageService.updateCourse(id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Course not found.' });
      }
      return res.json({ success: true, course: updated });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to update course.' });
    }
  }
};
