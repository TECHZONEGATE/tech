const API_BASE_URL = import.meta.env.VITE_API_URL || (
  typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5000/api'
    : '/api'
);

export const Api = {
  // Public Enquiries
  async submitEnquiry(payload) {
    const res = await fetch(`${API_BASE_URL}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit enquiry');
    return data;
  },

  // Public Contact
  async submitContact(payload) {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to send message');
    return data;
  },

  // Public Seminars
  async getSeminars() {
    try {
      const res = await fetch(`${API_BASE_URL}/seminars`);
      const data = await res.json();
      return data.seminars || [];
    } catch (err) {
      console.warn('API getSeminars failed, using fallback:', err);
      return [];
    }
  },

  // Seminar Registration
  async registerSeminar(payload) {
    const res = await fetch(`${API_BASE_URL}/seminars/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to register for seminar');
    return data;
  },

  // Public Courses
  async getCourses() {
    try {
      const res = await fetch(`${API_BASE_URL}/courses`);
      const data = await res.json();
      return data.courses || [];
    } catch (err) {
      console.warn('API getCourses failed, using fallback:', err);
      return [];
    }
  },

  async getCourseBySlug(slug) {
    try {
      const res = await fetch(`${API_BASE_URL}/courses/${slug}`);
      const data = await res.json();
      return data.course || null;
    } catch (err) {
      console.warn('API getCourseBySlug failed:', err);
      return null;
    }
  },

  // Public Settings
  async getSettings() {
    try {
      const res = await fetch(`${API_BASE_URL}/settings`);
      const data = await res.json();
      return data.settings || {};
    } catch (err) {
      return {};
    }
  },

  // Admin Auth
  async adminLogin(username, password) {
    const res = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    return data;
  },

  async getAdminStats(token) {
    const res = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch admin stats');
    return data.stats;
  },

  async getAdminEnquiries(token, params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/enquiries/admin/all?${query}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch enquiries');
    return data.enquiries || [];
  },

  async updateAdminEnquiry(token, id, payload) {
    const res = await fetch(`${API_BASE_URL}/enquiries/admin/${id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update enquiry');
    return data.enquiry;
  },

  async getAdminContacts(token) {
    const res = await fetch(`${API_BASE_URL}/contact/admin/all`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch messages');
    return data.contacts || [];
  },

  async getAdminSeminars(token) {
    const res = await fetch(`${API_BASE_URL}/seminars/admin/all`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch seminars');
    return data.seminars || [];
  },

  async createAdminSeminar(token, payload) {
    const res = await fetch(`${API_BASE_URL}/seminars/admin`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create seminar');
    return data.seminar;
  },

  async toggleAdminSeminarPublish(token, id, isPublished) {
    const res = await fetch(`${API_BASE_URL}/seminars/admin/${id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ isPublished })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update seminar');
    return data.seminar;
  },

  async getAdminSeminarRegistrations(token) {
    const res = await fetch(`${API_BASE_URL}/seminars/admin/registrations`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch registrations');
    return data.registrations || [];
  },

  async updateAdminSettings(token, settingsPayload) {
    const res = await fetch(`${API_BASE_URL}/admin/settings`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(settingsPayload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update settings');
    return data.settings;
  }
};
