import { StorageService } from '../services/storageService.js';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const ContactController = {
  async submitContact(req, res) {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !name.trim()) {
        return res.status(400).json({ error: 'Name is required.' });
      }
      if (!email || !isValidEmail(email)) {
        return res.status(400).json({ error: 'A valid email address is required.' });
      }
      if (!subject || !subject.trim()) {
        return res.status(400).json({ error: 'Subject is required.' });
      }
      if (!message || !message.trim()) {
        return res.status(400).json({ error: 'Message content is required.' });
      }

      const contact = StorageService.createContact({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim()
      });

      return res.status(201).json({
        success: true,
        message: 'Thank you for reaching out. Your message has been received and our team will get back to you shortly.',
        id: contact.id
      });
    } catch (err) {
      console.error('Error submitting contact form:', err);
      return res.status(500).json({ error: 'Failed to submit contact message.' });
    }
  },

  async getContacts(req, res) {
    try {
      const contacts = StorageService.getContacts();
      return res.json({ success: true, count: contacts.length, contacts });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to retrieve messages.' });
    }
  },

  async updateContactStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      if (!['Unread', 'Read', 'Replied'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status.' });
      }

      const updated = StorageService.updateContactStatus(id, status);
      if (!updated) {
        return res.status(404).json({ error: 'Contact message not found.' });
      }

      return res.json({ success: true, contact: updated });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to update message status.' });
    }
  }
};
