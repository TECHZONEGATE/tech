import { StorageService } from '../services/storageService.js';

// Basic Indian mobile phone check: 10 digits, starts with 6-9 (optional leading +91 or 0)
function isValidIndianMobile(phone) {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  // Matches 10 digits or 91 followed by 10 digits starting with 6-9
  return /^(?:91)?[6-9]\d{9}$/.test(cleaned);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const EnquiryController = {
  // Public submission
  async submitEnquiry(req, res) {
    try {
      const { fullName, email, mobileNumber, college, engineeringBranch, academicYear, interestedCourse, preferredSubject, message, consent } = req.body;

      if (!fullName || !fullName.trim()) {
        return res.status(400).json({ error: 'Full name is required.' });
      }
      if (!email || !isValidEmail(email)) {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
      }
      if (!mobileNumber || !isValidIndianMobile(mobileNumber)) {
        return res.status(400).json({ error: 'Please provide a valid 10-digit Indian mobile number.' });
      }
      if (!engineeringBranch || !engineeringBranch.trim()) {
        return res.status(400).json({ error: 'Engineering branch is required.' });
      }
      if (!interestedCourse || !interestedCourse.trim()) {
        return res.status(400).json({ error: 'Interested course is required.' });
      }
      if (consent !== true && consent !== 'true') {
        return res.status(400).json({ error: 'Consent to be contacted is required.' });
      }

      const enquiry = await StorageService.createEnquiry({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        mobileNumber: mobileNumber.trim(),
        college: college ? college.trim() : '',
        engineeringBranch: engineeringBranch.trim(),
        academicYear: academicYear ? academicYear.trim() : '',
        interestedCourse: interestedCourse.trim(),
        preferredSubject: preferredSubject ? preferredSubject.trim() : '',
        message: message ? message.trim() : '',
        consent: true
      });

      return res.status(201).json({
        success: true,
        message: 'Your enquiry has been successfully registered.',
        referenceNumber: enquiry.referenceNumber,
        enquiry: {
          referenceNumber: enquiry.referenceNumber,
          fullName: enquiry.fullName,
          interestedCourse: enquiry.interestedCourse,
          createdAt: enquiry.createdAt
        }
      });
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      return res.status(500).json({ error: 'Internal server error while processing your enquiry.' });
    }
  },

  // Admin: Get all enquiries with filtering & search
  async getEnquiries(req, res) {
    try {
      const { search, course, status } = req.query;
      const enquiries = await StorageService.getEnquiries({ search, course, status });
      return res.json({ success: true, count: enquiries.length, enquiries });
    } catch (err) {
      console.error('Error fetching enquiries:', err);
      return res.status(500).json({ error: 'Failed to fetch enquiries.' });
    }
  },

  // Admin: Get single enquiry
  async getEnquiryById(req, res) {
    try {
      const { id } = req.params;
      const enquiry = await StorageService.getEnquiryById(id);
      if (!enquiry) {
        return res.status(404).json({ error: 'Enquiry record not found.' });
      }
      return res.json({ success: true, enquiry });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch enquiry.' });
    }
  },

  // Admin: Update status / add notes
  async updateEnquiry(req, res) {
    try {
      const { id } = req.params;
      const { status, addNote } = req.body;
      const updatePayload = {};

      if (status) {
        if (!['New', 'Contacted', 'Closed'].includes(status)) {
          return res.status(400).json({ error: 'Invalid status value. Allowed: New, Contacted, Closed' });
        }
        updatePayload.status = status;
      }

      if (addNote && addNote.trim()) {
        updatePayload.addNote = addNote.trim();
        updatePayload.noteAuthor = req.admin?.username || 'Admin';
      }

      const updated = await StorageService.updateEnquiry(id, updatePayload);
      if (!updated) {
        return res.status(404).json({ error: 'Enquiry record not found.' });
      }

      return res.json({ success: true, message: 'Enquiry updated successfully.', enquiry: updated });
    } catch (err) {
      console.error('Error updating enquiry:', err);
      return res.status(500).json({ error: 'Failed to update enquiry.' });
    }
  }
};
