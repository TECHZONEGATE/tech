import { loadData, saveData, getMongoStatus } from '../config/dataStore.js';
import { Enquiry } from '../models/Enquiry.js';
import { ContactMessage } from '../models/ContactMessage.js';
import { SeminarRegistration } from '../models/SeminarRegistration.js';
import crypto from 'crypto';

// Helper to generate reference number
function generateEnquiryRef() {
  const year = new Date().getFullYear();
  const randomPart = Math.floor(10000 + Math.random() * 90000);
  return `TZ-ENQ-${year}-${randomPart}`;
}

export const StorageService = {
  // --- ENQUIRIES ---
  getEnquiries(filters = {}) {
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

    // Sort newest first
    return enquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  getEnquiryById(id) {
    const data = loadData();
    return (data.enquiries || []).find(e => e.id === id || e.referenceNumber === id);
  },

  createEnquiry(payload) {
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
      Enquiry.create({
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
      }).catch(err => console.error("[MongoDB Atlas] Enquiry sync error:", err.message));
    }

    return newEnquiry;
  },

  updateEnquiry(id, updatePayload) {
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
  getContacts() {
    const data = loadData();
    return (data.contacts || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  createContact(payload) {
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

    // Sync to MongoDB Atlas if connected
    if (getMongoStatus()) {
      ContactMessage.create({
        name: newContact.name,
        email: newContact.email,
        subject: newContact.subject,
        message: newContact.message,
        status: newContact.status
      }).catch(err => console.error("[MongoDB Atlas] Contact sync error:", err.message));
    }

    return newContact;
  },

  updateContactStatus(id, status) {
    const data = loadData();
    const index = (data.contacts || []).findIndex(c => c.id === id);
    if (index === -1) return null;

    data.contacts[index].status = status;
    saveData(data);
    return data.contacts[index];
  },

  // --- SEMINARS ---
  getSeminars(includeUnpublished = false) {
    const data = loadData();
    const seminars = data.seminars || [];
    if (includeUnpublished) return seminars;
    return seminars.filter(s => s.isPublished);
  },

  createSeminar(payload) {
    const data = loadData();
    const newSeminar = {
      id: crypto.randomUUID(),
      title: payload.title,
      date: payload.date,
      time: payload.time,
      venueOrOnline: payload.venueOrOnline,
      description: payload.description,
      registrationStatus: payload.registrationStatus || "Open",
      isPublished: payload.isPublished !== undefined ? payload.isPublished : true,
      highlights: payload.highlights || [],
      createdAt: new Date().toISOString()
    };

    data.seminars = [newSeminar, ...(data.seminars || [])];
    saveData(data);
    return newSeminar;
  },

  updateSeminar(id, payload) {
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

  deleteSeminar(id) {
    const data = loadData();
    data.seminars = (data.seminars || []).filter(s => s.id !== id);
    saveData(data);
    return true;
  },

  // --- SEMINAR REGISTRATIONS ---
  getSeminarRegistrations(seminarId = null) {
    const data = loadData();
    let regs = data.seminarRegistrations || [];
    if (seminarId) {
      regs = regs.filter(r => r.seminarId === seminarId);
    }
    return regs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  createSeminarRegistration(payload) {
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
      SeminarRegistration.create({
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
      }).catch(err => console.error("[MongoDB Atlas] Seminar reg sync error:", err.message));
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
  getSettings() {
    const data = loadData();
    return data.settings || {};
  },

  updateSettings(payload) {
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
    const data = loadData();
    return (data.adminUsers || []).find(u => u.username === username);
  },

  // --- DASHBOARD STATS ---
  getStats() {
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
