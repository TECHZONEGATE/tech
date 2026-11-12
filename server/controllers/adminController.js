import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { StorageService } from '../services/storageService.js';

export const AdminController = {
  // Admin Login
  async login(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
      }

      const admin = StorageService.getAdminByUsername(username.trim());
      if (!admin) {
        return res.status(401).json({ error: 'Invalid username or password credentials.' });
      }

      const isMatch = bcrypt.compareSync(password, admin.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid username or password credentials.' });
      }

      const secret = process.env.JWT_SECRET || 'techzone_super_secret_jwt_key_2026_educate_succeed';
      const token = jwt.sign(
        { id: admin.id, username: admin.username, role: admin.role },
        secret,
        { expiresIn: '24h' }
      );

      return res.json({
        success: true,
        token,
        admin: {
          username: admin.username,
          email: admin.email,
          role: admin.role
        }
      });
    } catch (err) {
      console.error('Admin login error:', err);
      return res.status(500).json({ error: 'Internal server error during authentication.' });
    }
  },

  // Verify Admin Token
  async getMe(req, res) {
    return res.json({
      success: true,
      admin: req.admin
    });
  },

  // Dashboard Stats
  async getStats(req, res) {
    try {
      const stats = await StorageService.getStats();
      return res.json({ success: true, stats });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to retrieve dashboard statistics.' });
    }
  },

  // Public Settings
  async getSettings(req, res) {
    try {
      const settings = StorageService.getSettings();
      return res.json({ success: true, settings });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch settings.' });
    }
  },

  // Admin Update Settings
  async updateSettings(req, res) {
    try {
      const updated = StorageService.updateSettings(req.body);
      return res.json({ success: true, settings: updated });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to update settings.' });
    }
  }
};
