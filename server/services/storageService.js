import { loadData, saveData, getMongoStatus } from '../config/dataStore.js';
import { Enquiry } from '../models/Enquiry.js';
import { ContactMessage } from '../models/ContactMessage.js';
import { SeminarRegistration } from '../models/SeminarRegistration.js';
import { Seminar } from '../models/Seminar.js';
import { Setting } from '../models/Setting.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

// Helper to generate reference number
function generateEnquiryRef() {
  const year = new Date().getFullYear();
  const randomPart = Math.floor(10000 + Math.random() * 90000);
  return `TZ-ENQ-${year}-${randomPart}`;
}

export const StorageService = {
  // --- ENQUIRIES ---
  async getEnquiries(filters = {}) {
    if (getMongoStatus()) {
      try {
        const query = {};
        if (filters.course && filters.course !== 'ALL') {
          query.interestedCourse = filters.course;
        }
        if (filters.status && filters.status !== 'ALL') {
          query.status = filters.status;
        }
        if (filters.search) {
          const regex = new RegExp(filters.search, 'i');
          query.$or = [
            { fullName: regex },
            { email: regex },
            { mobileNumber: regex },
            { referenceNumber: regex }
          ];
        }
        const docs = await Enquiry.find(query).sort({ createdAt: -1 }).lean();
        return docs.map(doc => ({
          ...doc,
          id: doc._id.toString()
        }));
      } catch (err) {
        console.error("[MongoDB Atlas] getEnquiries error:", err.message);
      }
    }

    const data = loadData();
    let enquiries = data.enquiries || [];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      enquiries = enquiries.filter(e => 
        e.fullName?.toLowerCase().includes(q) ||
        e.email?.toLowerCase().includes(q) ||
        e.mobileNumber?.includes(q) ||
        e.referenceNumber?.toLowerCase().includes(q)
      );
    }

    if (filters.course && filters.course !== 'ALL') {
      enquiries = enquiries.filter(e => e.interestedCourse === filters.course);
    }

    if (filters.status && filters.status !== 'ALL') {
      enquiries = enquiries.filter(e => e.status === filters.status);
    }

    return enquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async getEnquiryById(id) {
    if (getMongoStatus()) {
      try {
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
        const query = isObjectId ? { $or: [{ _id: id }, { referenceNumber: id }] } : { referenceNumber: id };
        const doc = await Enquiry.findOne(query).lean();
        if (doc) return { ...doc, id: doc._id.toString() };
      } catch (err) {
        console.error("[MongoDB Atlas] getEnquiryById error:", err.message);
      }
    }
    const data = loadData();
    return (data.enquiries || []).find(e => e.id === id || e.referenceNumber === id);
  },

  async createEnquiry(payload) {
    const data = loadData();
    const referenceNumber = generateEnquiryRef();
    const newEnquiry = {
      id: crypto.randomUUID(),
      referenceNumber,
      fullName: payload.fullName,
      email: payload.email,
      mobileNumber: payload.mobileNumber,
      college: payload.college || "Not specified",
      engineeringBranch: payload.engineeringBranch,
      academicYear: payload.academicYear || "Not specified",
      interestedCourse: payload.interestedCourse,
      preferredSubject: payload.preferredSubject || "All Modules",
      message: payload.message || "",
      consent: !!payload.consent,
      status: "New",
      internalNotes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    data.enquiries = [newEnquiry, ...(data.enquiries || [])];
    saveData(data);

    // Sync to MongoDB Atlas if connected
    if (getMongoStatus()) {
      try {
        const doc = await Enquiry.create({
          referenceNumber: newEnquiry.referenceNumber,
          fullName: newEnquiry.fullName,
          email: newEnquiry.email,
          mobileNumber: newEnquiry.mobileNumber,
          college: newEnquiry.college,
          engineeringBranch: newEnquiry.engineeringBranch,
          academicYear: newEnquiry.academicYear,
          interestedCourse: newEnquiry.interestedCourse,
          preferredSubject: newEnquiry.preferredSubject,
          message: newEnquiry.message,
          consent: newEnquiry.consent,
          status: newEnquiry.status
        });
        return { ...newEnquiry, id: doc._id.toString() };
      } catch (err) {
        console.error("[MongoDB Atlas] Enquiry sync error:", err.message);
      }
    }

    return newEnquiry;
  },

  async updateEnquiry(id, updatePayload) {
    if (getMongoStatus()) {
      try {
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
        const query = isObjectId ? { $or: [{ _id: id }, { referenceNumber: id }] } : { referenceNumber: id };
        const updateOps = {};
        if (updatePayload.status) updateOps.status = updatePayload.status;
        if (updatePayload.addNote) {
          updateOps.$push = {
            internalNotes: {
              note: updatePayload.addNote,
              author: updatePayload.noteAuthor || 'Admin',
              createdAt: new Date()
            }
          };
        }
        const updated = await Enquiry.findOneAndUpdate(query, updateOps, { new: true }).lean();
        if (updated) {
          return { ...updated, id: updated._id.toString() };
        }
      } catch (err) {
        console.error("[MongoDB Atlas] updateEnquiry error:", err.message);
      }
    }

    const data = loadData();
    const index = (data.enquiries || []).findIndex(e => e.id === id || e.referenceNumber === id);
    if (index === -1) return null;

    const existing = data.enquiries[index];
    const updated = {
      ...existing,
      ...updatePayload,
      updatedAt: new Date().toISOString()
    };

    if (updatePayload.addNote) {
      updated.internalNotes = [
        ...(existing.internalNotes || []),
        {
          id: crypto.randomUUID(),
          note: updatePayload.addNote,
          author: updatePayload.noteAuthor || 'Admin',
          createdAt: new Date().toISOString()
        }
      ];
      delete updated.addNote;
      delete updated.noteAuthor;
    }

    data.enquiries[index] = updated;
    saveData(data);
    return updated;
  },

  // --- CONTACT MESSAGES ---
  async getContacts() {
    if (getMongoStatus()) {
      try {
        const docs = await ContactMessage.find({}).sort({ createdAt: -1 }).lean();
        return docs.map(doc => ({
          ...doc,
          id: doc._id.toString()
        }));
      } catch (err) {
        console.error("[MongoDB Atlas] getContacts error:", err.message);
      }
    }
    const data = loadData();
    return (data.contacts || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async createContact(payload) {
    const data = loadData();
    const newContact = {
      id: crypto.randomUUID(),
      name: payload.name,
      email: payload.email,
      subject: payload.subject,
      message: payload.message,
      status: "Unread",
      createdAt: new Date().toISOString()
    };

    data.contacts = [newContact, ...(data.contacts || [])];
    saveData(data);

    if (getMongoStatus()) {
      try {
        const doc = await ContactMessage.create({
          name: newContact.name,
          email: newContact.email,
          subject: newContact.subject,
          message: newContact.message,
          status: newContact.status
        });
        return { ...newContact, id: doc._id.toString() };
      } catch (err) {
        console.error("[MongoDB Atlas] Contact sync error:", err.message);
      }
    }

    return newContact;
  },

  async updateContactStatus(id, status) {
    if (getMongoStatus()) {
      try {
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
        if (isObjectId) {
          const doc = await ContactMessage.findByIdAndUpdate(id, { status }, { new: true }).lean();
          if (doc) return { ...doc, id: doc._id.toString() };
        }
      } catch (err) {
        console.error("[MongoDB Atlas] updateContactStatus error:", err.message);
      }
    }
    const data = loadData();
    const index = (data.contacts || []).findIndex(c => c.id === id);
    if (index === -1) return null;

    data.contacts[index].status = status;
    saveData(data);
    return data.contacts[index];
  },

  // --- SEMINARS ---
  async getSeminars(includeUnpublished = false) {
    if (getMongoStatus()) {
      try {
        const query = includeUnpublished ? {} : { isPublished: true };
        const docs = await Seminar.find(query).sort({ createdAt: -1 }).lean();
        if (docs && docs.length > 0) {
          return docs.map(doc => ({
            ...doc,
            id: doc._id.toString()
          }));
        }
      } catch (err) {
        console.error("[MongoDB Atlas] getSeminars error:", err.message);
      }
    }

    const data = loadData();
    const seminars = data.seminars || [];
    if (includeUnpublished) return seminars;
    return seminars.filter(s => s.isPublished);
  },

  async createSeminar(payload) {
    const data = loadData();
    const newSeminar = {
      id: crypto.randomUUID(),
      title: payload.title,
      date: payload.date || 'TBA',
      time: payload.time || 'TBA',
      venueOrOnline: payload.venueOrOnline || 'Online / Campus',
      description: payload.description || '',
      registrationStatus: payload.registrationStatus || "Open",
      isPublished: payload.isPublished !== undefined ? payload.isPublished : true,
      highlights: payload.highlights || [],
      createdAt: new Date().toISOString()
    };

    data.seminars = [newSeminar, ...(data.seminars || [])];
    saveData(data);

    if (getMongoStatus()) {
      try {
        const doc = await Seminar.create({
          title: newSeminar.title,
          date: newSeminar.date,
          time: newSeminar.time,
          venueOrOnline: newSeminar.venueOrOnline,
          description: newSeminar.description,
          registrationStatus: newSeminar.registrationStatus,
          isPublished: newSeminar.isPublished,
          highlights: newSeminar.highlights
        });
        return { ...newSeminar, id: doc._id.toString() };
      } catch (err) {
        console.error("[MongoDB Atlas] Seminar create error:", err.message);
      }
    }

    return newSeminar;
  },

  async updateSeminar(id, payload) {
    if (getMongoStatus()) {
      try {
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
        const query = isObjectId ? { _id: id } : { title: payload.title || id };
        const updated = await Seminar.findOneAndUpdate(query, payload, { new: true }).lean();
        if (updated) {
          return { ...updated, id: updated._id.toString() };
        }
      } catch (err) {
        console.error("[MongoDB Atlas] updateSeminar error:", err.message);
      }
    }

    const data = loadData();
    const index = (data.seminars || []).findIndex(s => s.id === id);
    if (index === -1) return null;

    data.seminars[index] = {
      ...data.seminars[index],
      ...payload
    };
    saveData(data);
    return data.seminars[index];
  },

  async deleteSeminar(id) {
    if (getMongoStatus()) {
      try {
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
        if (isObjectId) {
          await Seminar.findByIdAndDelete(id);
        }
      } catch (err) {
        console.error("[MongoDB Atlas] deleteSeminar error:", err.message);
      }
    }

    const data = loadData();
    data.seminars = (data.seminars || []).filter(s => s.id !== id);
    saveData(data);
    return true;
  },

  // --- SEMINAR REGISTRATIONS ---
  async getSeminarRegistrations(seminarId = null) {
    if (getMongoStatus()) {
      try {
        const query = seminarId ? { seminarId } : {};
        const docs = await SeminarRegistration.find(query).sort({ createdAt: -1 }).lean();
        return docs.map(doc => ({
          ...doc,
          id: doc._id.toString()
        }));
      } catch (err) {
        console.error("[MongoDB Atlas] getSeminarRegistrations error:", err.message);
      }
    }

    const data = loadData();
    let regs = data.seminarRegistrations || [];
    if (seminarId) {
      regs = regs.filter(r => r.seminarId === seminarId);
    }
    return regs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async createSeminarRegistration(payload) {
    const data = loadData();
    const newRegistration = {
      id: crypto.randomUUID(),
      fullName: payload.fullName,
      email: payload.email,
      mobileNumber: payload.mobileNumber,
      college: payload.college,
      engineeringBranch: payload.engineeringBranch,
      currentYear: payload.currentYear,
      message: payload.message || "",
      seminarId: payload.seminarId || "general",
      seminarTitle: payload.seminarTitle || "Career Orientation Seminar",
      status: "Confirmed",
      createdAt: new Date().toISOString()
    };

    data.seminarRegistrations = [newRegistration, ...(data.seminarRegistrations || [])];
    saveData(data);

    // Sync to MongoDB Atlas if connected
    if (getMongoStatus()) {
      try {
        const doc = await SeminarRegistration.create({
          fullName: newRegistration.fullName,
          email: newRegistration.email,
          mobileNumber: newRegistration.mobileNumber,
          college: newRegistration.college,
          engineeringBranch: newRegistration.engineeringBranch,
          currentYear: newRegistration.currentYear,
          message: newRegistration.message,
          seminarId: newRegistration.seminarId,
          seminarTitle: newRegistration.seminarTitle,
          status: newRegistration.status
        });
        return { ...newRegistration, id: doc._id.toString() };
      } catch (err) {
        console.error("[MongoDB Atlas] Seminar reg sync error:", err.message);
      }
    }

    return newRegistration;
  },

  // --- COURSES ---
  getCourses() {
    const data = loadData();
    return data.courses || [];
  },

  getCourseBySlug(slug) {
    const data = loadData();
    return (data.courses || []).find(c => c.slug === slug);
  },

  updateCourse(id, payload) {
    const data = loadData();
    const index = (data.courses || []).findIndex(c => c.id === id || c.slug === id);
    if (index === -1) return null;

    data.courses[index] = {
      ...data.courses[index],
      ...payload
    };
    saveData(data);
    return data.courses[index];
  },

  // --- SETTINGS ---
  async getSettings() {
    if (getMongoStatus()) {
      try {
        const doc = await Setting.findOne({}).lean();
        if (doc) return doc;
      } catch (err) {
        console.error("[MongoDB Atlas] getSettings error:", err.message);
      }
    }
    const data = loadData();
    return data.settings || {};
  },

  async updateSettings(payload) {
    if (getMongoStatus()) {
      try {
        const updated = await Setting.findOneAndUpdate({}, payload, { new: true, upsert: true }).lean();
        if (updated) return updated;
      } catch (err) {
        console.error("[MongoDB Atlas] updateSettings error:", err.message);
      }
    }
    const data = loadData();
    data.settings = {
      ...data.settings,
      ...payload
    };
    saveData(data);
    return data.settings;
  },

  // --- ADMIN USERS ---
  getAdminByUsername(username) {
    if (!username) return null;
    const cleanUser = username.trim().toLowerCase();

    // 1. Dynamic Environment Variable Admin Check
    const envAdminUser = (process.env.ADMIN_USERNAME || 'dharamveer').trim().toLowerCase();
    const envAdminPass = (process.env.ADMIN_PASSWORD || 'Dharamveer@1424').trim();

    if (cleanUser === envAdminUser) {
      return {
        id: "admin-env",
        username: process.env.ADMIN_USERNAME || 'dharamveer',
        email: "info.techzone.gate@gmail.com",
        passwordHash: bcrypt.hashSync(envAdminPass, 10),
        role: "superadmin"
      };
    }

    // 2. Direct hard-configured dharamveer credentials
    if (cleanUser === 'dharamveer') {
      return {
        id: "admin-dharamveer",
        username: "dharamveer",
        email: "info.techzone.gate@gmail.com",
        passwordHash: bcrypt.hashSync("Dharamveer@1424", 10),
        role: "superadmin"
      };
    }

    // 3. Fallback to persisted admin users in data file
    const data = loadData();
    return (data.adminUsers || []).find(u => u.username?.toLowerCase() === cleanUser);
  },

  // --- DASHBOARD STATS ---
  async getStats() {
    if (getMongoStatus()) {
      try {
        const [totalEnquiries, newEnquiries, totalContacts, unreadContacts, totalRegistrations, activeSeminars] = await Promise.all([
          Enquiry.countDocuments({}),
          Enquiry.countDocuments({ status: "New" }),
          ContactMessage.countDocuments({}),
          ContactMessage.countDocuments({ status: "Unread" }),
          SeminarRegistration.countDocuments({}),
          Seminar.countDocuments({ isPublished: true })
        ]);
        return {
          totalEnquiries,
          newEnquiries,
          totalContacts,
          unreadContacts,
          totalRegistrations,
          activeSeminars
        };
      } catch (err) {
        console.error("[MongoDB Atlas] getStats error:", err.message);
      }
    }

    const data = loadData();
    const enquiries = data.enquiries || [];
    const newEnquiries = enquiries.filter(e => e.status === "New").length;
    const contacts = data.contacts || [];
    const unreadContacts = contacts.filter(c => c.status === "Unread").length;
    const registrations = data.seminarRegistrations || [];
    const seminars = data.seminars || [];

    return {
      totalEnquiries: enquiries.length,
      newEnquiries,
      totalContacts: contacts.length,
      unreadContacts,
      totalRegistrations: registrations.length,
      activeSeminars: seminars.filter(s => s.isPublished).length
    };
  }
};
