import React from 'react';
import { TopAnnouncementBar } from './TopAnnouncementBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from '../common/ScrollToTop';

export function PageLayout({ children, showAnnouncement = true }) {
  return (
    <div className="min-h-screen flex flex-col bg-brand-offwhite text-brand-dark selection:bg-gold/30 selection:text-navy-deep font-sans">
      <ScrollToTop />
      {showAnnouncement && <TopAnnouncementBar />}
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
