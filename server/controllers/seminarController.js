import { StorageService } from '../services/storageService.js';

function isValidIndianMobile(phone) {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  return /^(?:91)?[6-9]\d{9}$/.test(cleaned);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const SeminarController = {
  // Public: Get published seminars
  async getPublicSeminars(req, res) {
    try {
      const seminars = StorageService.getSeminars(false);
      return res.json({ success: true, count: seminars.length, seminars });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch seminars.' });
    }
  },

  // Public: Register interest in seminar
  async registerForSeminar(req, res) {
    try {
      const { fullName, email, mobileNumber, college, engineeringBranch, currentYear, message, seminarId, seminarTitle } = req.body;

      if (!fullName || !fullName.trim()) {
        return res.status(400).json({ error: 'Full name is required.' });
      }
      if (!email || !isValidEmail(email)) {
        return res.status(400).json({ error: 'Please enter a valid email address.' });
      }
      if (!mobileNumber || !isValidIndianMobile(mobileNumber)) {
        return res.status(400).json({ error: 'Please enter a valid 10-digit mobile number.' });
      }
      if (!college || !college.trim()) {
        return res.status(400).json({ error: 'College / University name is required.' });
      }
      if (!engineeringBranch || !engineeringBranch.trim()) {
        return res.status(400).json({ error: 'Engineering branch is required.' });
      }
      if (!currentYear || !currentYear.trim()) {
        return res.status(400).json({ error: 'Current year of study is required.' });
      }

      const registration = StorageService.createSeminarRegistration({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        mobileNumber: mobileNumber.trim(),
        college: college.trim(),
        engineeringBranch: engineeringBranch.trim(),
        currentYear: currentYear.trim(),
        message: message ? message.trim() : '',
        seminarId: seminarId || 'general',
        seminarTitle: seminarTitle || 'Career Orientation Seminar'
      });

      return res.status(201).json({
        success: true,
        message: 'Your seminar registration has been successfully confirmed. A notification with session joining details will be communicated via email/SMS.',
        registration: {
          id: registration.id,
          fullName: registration.fullName,
          seminarTitle: registration.seminarTitle,
          createdAt: registration.createdAt
        }
      });
    } catch (err) {
      console.error('Error in seminar registration:', err);
      return res.status(500).json({ error: 'Failed to register for seminar.' });
    }
  },

  // Admin: Get all seminars
  async getAdminSeminars(req, res) {
    try {
      const seminars = StorageService.getSeminars(true);
      return res.json({ success: true, count: seminars.length, seminars });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to retrieve seminars.' });
    }
  },

  // Admin: Create seminar
  async createSeminar(req, res) {
    try {
      const { title, date, time, venueOrOnline, description, registrationStatus, isPublished, highlights } = req.body;
      if (!title || !title.trim()) {
        return res.status(400).json({ error: 'Seminar title is required.' });
      }

      const seminar = StorageService.createSeminar({
        title: title.trim(),
        date: date ? date.trim() : 'TBA',
        time: time ? time.trim() : 'TBA',
        venueOrOnline: venueOrOnline ? venueOrOnline.trim() : 'Online / Campus',
        description: description ? description.trim() : '',
        registrationStatus: registrationStatus || 'Open',
        isPublished: isPublished !== false,
        highlights: Array.isArray(highlights) ? highlights : []
      });

      return res.status(201).json({ success: true, seminar });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to create seminar.' });
    }
  },

  // Admin: Update seminar
  async updateSeminar(req, res) {
    try {
      const { id } = req.params;
      const updated = StorageService.updateSeminar(id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Seminar not found.' });
      }
      return res.json({ success: true, seminar: updated });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to update seminar.' });
    }
  },

  // Admin: Delete seminar
  async deleteSeminar(req, res) {
    try {
      const { id } = req.params;
      StorageService.deleteSeminar(id);
      return res.json({ success: true, message: 'Seminar deleted successfully.' });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to delete seminar.' });
    }
  },

  // Admin: Get all seminar registrations
  async getSeminarRegistrations(req, res) {
    try {
      const { seminarId } = req.query;
      const registrations = StorageService.getSeminarRegistrations(seminarId);
      return res.json({ success: true, count: registrations.length, registrations });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to retrieve registrations.' });
    }
  }
};
