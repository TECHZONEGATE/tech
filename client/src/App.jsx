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

// Elegant loading fallback
function PageFallback() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-brand-offwhite">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-navy-deep p-0.5 shadow-gold-glow animate-pulse flex items-center justify-center">
          <span className="font-heading font-extrabold text-gold text-lg">TZ</span>
        </div>
        <span className="text-xs font-heading font-semibold text-slate-500 uppercase tracking-widest">
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

          {/* Secure Admin Route (Standalone dedicated layout) */}
          <Route path="/admin" element={<AdminPage />} />

          {/* 404 Route */}
          <Route path="*" element={<PageLayout><NotFoundPage /></PageLayout>} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
