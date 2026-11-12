import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  LogOut, 
  Search, 
  Filter, 
  Calendar, 
  Mail, 
  Phone, 
  BookOpen, 
  Settings as SettingsIcon, 
  CheckCircle2, 
  Clock, 
  Eye, 
  Plus, 
  Trash2, 
  Edit3, 
  RefreshCw, 
  AlertCircle,
  FileText,
  Users
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Api } from '../services/api';

export default function AdminPage() {
  const [token, setToken] = useState(() => localStorage.getItem('tz_admin_token') || '');
  const [adminUser, setAdminUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('tz_admin_user') || 'null');
    } catch {
      return null;
    }
  });

  // Login form state
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('adminpassword123');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  // Active Dashboard Tab: 'overview' | 'enquiries' | 'seminars' | 'contacts' | 'settings'
  const [activeTab, setActiveTab] = useState('overview');

  // Stats
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);

  // Enquiries
  const [enquiries, setEnquiries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [newNoteText, setNewNoteText] = useState('');

  // Seminars
  const [seminars, setSeminars] = useState([]);
  const [seminarRegistrations, setSeminarRegistrations] = useState([]);
  const [newSeminarTitle, setNewSeminarTitle] = useState('');
  const [newSeminarDate, setNewSeminarDate] = useState('');
  const [newSeminarTime, setNewSeminarTime] = useState('');
  const [newSeminarVenue, setNewSeminarVenue] = useState('');
  const [newSeminarDesc, setNewSeminarDesc] = useState('');

  // Contacts
  const [contacts, setContacts] = useState([]);

  // Settings
  const [siteSettings, setSiteSettings] = useState(null);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoginLoading(true);
      setLoginError(null);
      const res = await Api.adminLogin(loginUsername, loginPassword);
      setToken(res.token);
      setAdminUser(res.admin);
      localStorage.setItem('tz_admin_token', res.token);
      localStorage.setItem('tz_admin_user', JSON.stringify(res.admin));
    } catch (err) {
      setLoginError(err.message || 'Login failed. Invalid username or password.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    setAdminUser(null);
    localStorage.removeItem('tz_admin_token');
    localStorage.removeItem('tz_admin_user');
  };

  // Load Admin Data when authenticated
  const loadDashboardData = async () => {
    if (!token) return;
    try {
      setLoadingStats(true);
      const [statsData, enquiriesData, seminarsData, regsData, contactsData, settingsData] = await Promise.all([
        Api.getAdminStats(token).catch(() => null),
        Api.getAdminEnquiries(token, { search: searchQuery, course: courseFilter, status: statusFilter }).catch(() => []),
        Api.getAdminSeminars(token).catch(() => []),
        Api.getAdminSeminarRegistrations(token).catch(() => []),
        Api.getAdminContacts(token).catch(() => []),
        Api.getSettings().catch(() => null)
      ]);

      if (statsData) setStats(statsData);
      setEnquiries(enquiriesData);
      setSeminars(seminarsData);
      setSeminarRegistrations(regsData);
      setContacts(contactsData);
      if (settingsData) setSiteSettings(settingsData);
    } catch (err) {
      console.error("Dashboard refresh error:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadDashboardData();
    }
  }, [token, courseFilter, statusFilter]);

  // Update Enquiry Status or Note
  const handleUpdateEnquiry = async (id, status, note) => {
    try {
      const payload = {};
      if (status) payload.status = status;
      if (note) payload.addNote = note;

      const updated = await Api.updateAdminEnquiry(token, id, payload);
      setEnquiries(enquiries.map(e => e.id === id ? updated : e));
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(updated);
      }
      setNewNoteText('');
      loadDashboardData();
    } catch (err) {
      alert("Error updating enquiry: " + err.message);
    }
  };

  // Create Seminar
  const handleCreateSeminar = async (e) => {
    e.preventDefault();
    if (!newSeminarTitle) return;
    try {
      await Api.createAdminSeminar(token, {
        title: newSeminarTitle,
        date: newSeminarDate || 'TBA',
        time: newSeminarTime || 'TBA',
        venueOrOnline: newSeminarVenue || 'Online / Campus',
        description: newSeminarDesc || ''
      });
      setNewSeminarTitle('');
      setNewSeminarDate('');
      setNewSeminarTime('');
      setNewSeminarVenue('');
      setNewSeminarDesc('');
      loadDashboardData();
      alert("Seminar created successfully!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // Toggle publish seminar
  const handleToggleSeminarPublish = async (id, currentStatus) => {
    try {
      await Api.toggleAdminSeminarPublish(token, id, !currentStatus);
      loadDashboardData();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      await Api.updateAdminSettings(token, siteSettings);
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
    } catch (err) {
      alert("Failed to save settings: " + err.message);
    }
  };

  // If not logged in, render the login card
  if (!token) {
    return (
      <div className="min-h-screen bg-navy-deep flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-br from-gold via-gold/50 to-navy-royal mx-auto mb-3 shadow-gold-glow flex items-center justify-center">
              <img src="/logo.png" alt="TECHZONE Logo" className="w-full h-full object-cover rounded-[14px]" />
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-navy-deep">
              TECHZONE Admin Portal
            </h1>
            <p className="text-xs text-brand-muted mt-1">
              Authorized Personnel Access Only
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy text-sm outline-none"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy text-sm outline-none"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                className="w-full justify-center"
                loading={loginLoading}
                disabled={loginLoading}
              >
                Sign In to Dashboard
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-400">
              Default Development Credentials: admin / adminpassword123
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      
      {/* Top Admin Bar */}
      <header className="bg-navy-deep text-white border-b border-navy-royal/50 px-6 py-3.5 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl overflow-hidden p-0.5 bg-gradient-to-br from-gold/80 to-navy-royal flex items-center justify-center flex-shrink-0">
            <img src="/logo.png" alt="TECHZONE Logo" className="w-full h-full object-cover rounded-[10px]" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-base text-white leading-none">
              TECHZONE Administrative Portal
            </h2>
            <span className="text-[10px] text-gold font-mono uppercase tracking-wider">
              Academic Management Console
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-300 hidden sm:inline">
            Logged in as <strong className="text-white">{adminUser?.username || 'Administrator'}</strong>
          </span>

          <button
            onClick={loadDashboardData}
            title="Refresh Data"
            className="p-2 rounded-lg bg-navy-surface hover:bg-navy-royal text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loadingStats ? 'animate-spin text-gold' : ''}`} />
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 text-red-300 hover:bg-red-600 hover:text-white text-xs font-semibold transition-colors cursor-pointer border border-red-500/30"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-200">
          {[
            { id: 'overview', label: 'Overview & Statistics' },
            { id: 'enquiries', label: `Student Enquiries (${enquiries.length})` },
            { id: 'seminars', label: `Seminars & Registrations (${seminarRegistrations.length})` },
            { id: 'contacts', label: `Contact Messages (${contacts.length})` },
            { id: 'settings', label: 'Website Settings' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-navy-deep text-gold shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* 4 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400">Total Enquiries</span>
                  <p className="font-heading font-extrabold text-3xl text-navy-deep mt-1">
                    {stats?.totalEnquiries || enquiries.length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-navy-royal flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-amber-600">New Enquiries</span>
                  <p className="font-heading font-extrabold text-3xl text-amber-700 mt-1">
                    {stats?.newEnquiries || enquiries.filter(e => e.status === 'New').length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400">Seminar Registrations</span>
                  <p className="font-heading font-extrabold text-3xl text-navy-deep mt-1">
                    {stats?.totalRegistrations || seminarRegistrations.length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400">Contact Messages</span>
                  <p className="font-heading font-extrabold text-3xl text-navy-deep mt-1">
                    {stats?.totalContacts || contacts.length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Quick Actions & Recent Enquiries */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-bold text-lg text-navy-deep">
                    Recent Enquiries
                  </h3>
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="text-xs font-bold text-navy-royal hover:text-gold"
                  >
                    View All →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                      <tr>
                        <th className="p-3">Ref #</th>
                        <th className="p-3">Candidate</th>
                        <th className="p-3">Course</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-normal">
                      {enquiries.slice(0, 5).map(e => (
                        <tr key={e.id} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-navy-deep">{e.referenceNumber}</td>
                          <td className="p-3 font-semibold">{e.fullName}</td>
                          <td className="p-3">{e.interestedCourse}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                              e.status === 'New' ? 'bg-amber-100 text-amber-800' :
                              e.status === 'Contacted' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {e.status}
                            </span>
                          </td>
                          <td className="p-3 text-slate-400">{new Date(e.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="lg:col-span-4 bg-navy-deep text-white p-6 rounded-2xl border border-navy-royal shadow-sm space-y-4">
                <h3 className="font-heading font-bold text-base text-gold uppercase tracking-wider">
                  Quick Administration
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Use the navigation tabs above to manage incoming enquiries, review seminar registrations, create upcoming career sessions, or modify campus contact parameters.
                </p>
                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="w-full text-left p-3 rounded-xl bg-navy-surface hover:bg-navy-royal text-xs font-semibold text-white transition-colors"
                  >
                    Manage Student Enquiries →
                  </button>
                  <button
                    onClick={() => setActiveTab('seminars')}
                    className="w-full text-left p-3 rounded-xl bg-navy-surface hover:bg-navy-royal text-xs font-semibold text-white transition-colors"
                  >
                    Schedule Career Seminar →
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className="w-full text-left p-3 rounded-xl bg-navy-surface hover:bg-navy-royal text-xs font-semibold text-white transition-colors"
                  >
                    Edit Institute Contact Details →
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: ENQUIRIES MANAGEMENT */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
              
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Search by name, ref, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-navy"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none bg-white font-medium"
                >
                  <option value="ALL">All Courses</option>
                  <option value="Mini GATE">Mini GATE</option>
                  <option value="Full GATE">Full GATE</option>
                  <option value="ESE">ESE</option>
                  <option value="PSU">PSU</option>
                  <option value="Career Orientation Seminar">Career Seminar</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none bg-white font-medium"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

            </div>

            {/* Enquiries Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Reference #</th>
                    <th className="p-3">Candidate</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Branch & Course</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Created</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-normal">
                  {enquiries.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400">
                        No enquiry records found matching current criteria.
                      </td>
                    </tr>
                  ) : (
                    enquiries.map(enq => (
                      <tr key={enq.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-navy-deep">
                          {enq.referenceNumber}
                        </td>
                        <td className="p-3">
                          <span className="font-bold block text-slate-800">{enq.fullName}</span>
                          <span className="text-[10px] text-slate-400">{enq.college}</span>
                        </td>
                        <td className="p-3 text-slate-600">
                          <div>{enq.email}</div>
                          <div className="font-mono text-slate-500">{enq.mobileNumber}</div>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold text-navy-deep block">{enq.interestedCourse}</span>
                          <span className="text-[10px] text-slate-500">{enq.engineeringBranch}</span>
                          {enq.preferredSubject && (
                            <span className="text-[10px] text-amber-700 block mt-0.5">Focus: {enq.preferredSubject}</span>
                          )}
                        </td>
                        <td className="p-3">
                          <select
                            value={enq.status}
                            onChange={(e) => handleUpdateEnquiry(enq.id, e.target.value, null)}
                            className={`px-2 py-1 rounded-full text-[10px] font-bold outline-none cursor-pointer border ${
                              enq.status === 'New' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                              enq.status === 'Contacted' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                              'bg-emerald-50 text-emerald-800 border-emerald-200'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                        <td className="p-3 text-slate-400">
                          {new Date(enq.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => setSelectedEnquiry(enq)}
                            className="px-2.5 py-1 rounded-lg bg-navy-surface text-gold font-bold hover:bg-navy-deep transition-colors text-xs inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Details</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 3: SEMINARS & REGISTRATIONS */}
        {activeTab === 'seminars' && (
          <div className="space-y-6">
            
            {/* Create Seminar Form */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-heading font-bold text-lg text-navy-deep mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-gold-dark" />
                Create New Career Orientation Seminar
              </h3>

              <form onSubmit={handleCreateSeminar} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Seminar Title *
                    </label>
                    <input
                      type="text"
                      value={newSeminarTitle}
                      onChange={(e) => setNewSeminarTitle(e.target.value)}
                      required
                      placeholder="e.g. GATE & PSU Strategic Guidance Session"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-navy"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Date & Schedule
                    </label>
                    <input
                      type="text"
                      value={newSeminarDate}
                      onChange={(e) => setNewSeminarDate(e.target.value)}
                      placeholder="e.g. Saturday, 15th December 2026"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-navy"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Time Slot
                    </label>
                    <input
                      type="text"
                      value={newSeminarTime}
                      onChange={(e) => setNewSeminarTime(e.target.value)}
                      placeholder="e.g. 10:30 AM – 1:00 PM IST"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-navy"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Venue or Mode
                    </label>
                    <input
                      type="text"
                      value={newSeminarVenue}
                      onChange={(e) => setNewSeminarVenue(e.target.value)}
                      placeholder="e.g. Live Online Interactive Session & Campus Hall"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-navy"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Seminar Description
                  </label>
                  <textarea
                    rows={2}
                    value={newSeminarDesc}
                    onChange={(e) => setNewSeminarDesc(e.target.value)}
                    placeholder="Brief description of session topics and takeaways..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-navy resize-none"
                  />
                </div>

                <Button type="submit" variant="primary" size="sm">
                  Publish Seminar
                </Button>
              </form>
            </div>

            {/* Existing Seminars List */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-lg text-navy-deep">
                Configured Seminars ({seminars.length})
              </h3>

              <div className="space-y-3">
                {seminars.map(s => (
                  <div key={s.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-heading font-bold text-base text-navy-deep">{s.title}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${s.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}`}>
                          {s.isPublished ? 'Published' : 'Hidden'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {s.date} • {s.time} • {s.venueOrOnline}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleSeminarPublish(s.id, s.isPublished)}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                      >
                        {s.isPublished ? 'Unpublish' : 'Publish'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Seminar Registrations Table */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-lg text-navy-deep">
                Seminar Registrations ({seminarRegistrations.length})
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                    <tr>
                      <th className="p-3">Candidate</th>
                      <th className="p-3">Contact</th>
                      <th className="p-3">College & Branch</th>
                      <th className="p-3">Year</th>
                      <th className="p-3">Registered At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-normal">
                    {seminarRegistrations.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-slate-400">
                          No registrations recorded yet.
                        </td>
                      </tr>
                    ) : (
                      seminarRegistrations.map(r => (
                        <tr key={r.id} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-slate-800">{r.fullName}</td>
                          <td className="p-3">
                            <div>{r.email}</div>
                            <div className="font-mono text-slate-500">{r.mobileNumber}</div>
                          </td>
                          <td className="p-3">
                            <span className="font-medium text-navy-deep block">{r.college}</span>
                            <span className="text-[10px] text-slate-500">{r.engineeringBranch}</span>
                          </td>
                          <td className="p-3">{r.currentYear}</td>
                          <td className="p-3 text-slate-400">{new Date(r.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: CONTACT MESSAGES */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="font-heading font-bold text-lg text-navy-deep">
              Received Contact Inquiries ({contacts.length})
            </h3>

            <div className="divide-y divide-slate-100">
              {contacts.length === 0 ? (
                <p className="p-8 text-center text-slate-400 text-xs">No contact messages received yet.</p>
              ) : (
                contacts.map(c => (
                  <div key={c.id} className="py-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-navy-deep text-sm">{c.name}</span>
                      <span className="text-xs text-slate-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Email: <a href={`mailto:${c.email}`} className="text-navy-royal underline">{c.email}</a>
                    </div>
                    <div className="font-semibold text-xs text-slate-700">
                      Subject: {c.subject}
                    </div>
                    <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 mt-2">
                      {c.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 5: WEBSITE SETTINGS */}
        {activeTab === 'settings' && siteSettings && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 max-w-3xl space-y-6">
            <h3 className="font-heading font-bold text-lg text-navy-deep">
              Global Institute Settings & Contact Information
            </h3>

            {settingsSaved && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                Settings updated successfully.
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Institute Name
                </label>
                <input
                  type="text"
                  value={siteSettings.instituteName || ''}
                  onChange={(e) => setSiteSettings({ ...siteSettings, instituteName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Official Phone Number
                </label>
                <input
                  type="text"
                  value={siteSettings.phone || ''}
                  onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Admissions Email
                </label>
                <input
                  type="email"
                  value={siteSettings.email || ''}
                  onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Campus Address
                </label>
                <input
                  type="text"
                  value={siteSettings.address || ''}
                  onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Working Hours
                </label>
                <input
                  type="text"
                  value={siteSettings.workingHours || ''}
                  onChange={(e) => setSiteSettings({ ...siteSettings, workingHours: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Top Announcement Bar Message
                </label>
                <input
                  type="text"
                  value={siteSettings.announcementBarText || ''}
                  onChange={(e) => setSiteSettings({ ...siteSettings, announcementBarText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none"
                />
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" size="sm">
                  Save Settings
                </Button>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* Enquiry Detail Modal */}
      <AnimatePresence>
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-deep/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider block">
                    Enquiry Details
                  </span>
                  <h3 className="font-heading font-bold text-xl text-navy-deep">
                    {selectedEnquiry.referenceNumber}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Full Name</span>
                  <span className="font-bold text-slate-800 text-sm">{selectedEnquiry.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Status</span>
                  <span className="font-bold text-navy-royal">{selectedEnquiry.status}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Email</span>
                  <span className="font-medium text-slate-800">{selectedEnquiry.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Mobile Number</span>
                  <span className="font-mono font-bold text-slate-800">{selectedEnquiry.mobileNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">College / University</span>
                  <span className="text-slate-800">{selectedEnquiry.college || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Branch & Year</span>
                  <span className="text-slate-800">{selectedEnquiry.engineeringBranch} ({selectedEnquiry.academicYear || 'N/A'})</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Course Chosen</span>
                  <span className="font-bold text-gold-dark">{selectedEnquiry.interestedCourse}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Preferred Subject Focus</span>
                  <span className="text-slate-800">{selectedEnquiry.preferredSubject || 'All Core Modules'}</span>
                </div>
              </div>

              {selectedEnquiry.message && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-bold text-slate-500 block mb-1">Student Message / Goals:</span>
                  <p className="text-slate-700 leading-relaxed">{selectedEnquiry.message}</p>
                </div>
              )}

              {/* Internal Notes Section */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Internal Counsellor Notes
                </span>
                
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {(selectedEnquiry.internalNotes || []).length === 0 ? (
                    <span className="text-xs text-slate-400 italic">No counsellor notes recorded yet.</span>
                  ) : (
                    selectedEnquiry.internalNotes.map((note, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-amber-50/70 border border-amber-200/60 text-xs">
                        <div className="flex items-center justify-between text-[10px] text-amber-800 font-bold mb-1">
                          <span>{note.author}</span>
                          <span>{new Date(note.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-slate-700">{note.note}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Add an internal note regarding follow-up..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-navy"
                  />
                  <Button
                    onClick={() => handleUpdateEnquiry(selectedEnquiry.id, null, newNoteText)}
                    variant="primary"
                    size="sm"
                    disabled={!newNoteText.trim()}
                  >
                    Add Note
                  </Button>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <Button
                  onClick={() => setSelectedEnquiry(null)}
                  variant="outline"
                  size="sm"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
