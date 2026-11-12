import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';

// Lazy loaded page components for optimal performance and code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const MiniGateCoursePage = lazy(() => import('./pages/courses/MiniGateCoursePage'));
const FullGateCoursePage = lazy(() => import('./pages/courses/FullGateCoursePage'));
const EseCoursePage = lazy(() => import('./pages/courses/EseCoursePage'));
const PsuCoursePage = lazy(() => import('./pages/courses/PsuCoursePage'));
const CareerSeminarPage = lazy(() => import('./pages/CareerSeminarPage'));
const StudentEnquiryPage = lazy(() => import('./pages/StudentEnquiryPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Elegant loading fallback with official logo
function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-deep text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-br from-gold via-gold/50 to-navy-royal shadow-gold-glow animate-pulse flex items-center justify-center">
          <img 
            src="/logo.png" 
            alt="TECHZONE" 
            className="w-full h-full object-cover rounded-[14px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <span className="text-xs font-heading font-semibold text-slate-300 uppercase tracking-widest">
          Loading TECHZONE...
        </span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          
          {/* Public Website Routes wrapped in PageLayout */}
          <Route path="/" element={<PageLayout><HomePage /></PageLayout>} />
          <Route path="/courses" element={<PageLayout><CoursesPage /></PageLayout>} />
          <Route path="/courses/mini-gate" element={<PageLayout><MiniGateCoursePage /></PageLayout>} />
          <Route path="/courses/full-gate" element={<PageLayout><FullGateCoursePage /></PageLayout>} />
          <Route path="/courses/ese" element={<PageLayout><EseCoursePage /></PageLayout>} />
          <Route path="/courses/psu" element={<PageLayout><PsuCoursePage /></PageLayout>} />
          <Route path="/career-orientation-seminar" element={<PageLayout><CareerSeminarPage /></PageLayout>} />
          <Route path="/student-enquiry" element={<PageLayout><StudentEnquiryPage /></PageLayout>} />
          <Route path="/contact" element={<PageLayout><ContactPage /></PageLayout>} />
          <Route path="/about" element={<PageLayout><AboutPage /></PageLayout>} />

          {/* Secure Staff Portal (Secret custom route) */}
          <Route path="/dharam" element={<AdminPage />} />
          {/* Standard /admin returns 404 for security */}
          <Route path="/admin" element={<PageLayout><NotFoundPage /></PageLayout>} />

          {/* 404 Route */}
          <Route path="*" element={<PageLayout><NotFoundPage /></PageLayout>} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
