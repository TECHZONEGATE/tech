import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowUp, 
  ShieldCheck, 
  GraduationCap, 
  Send,
  ChevronRight
} from 'lucide-react';

function YouTubeIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function TelegramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.75 4-1.74 6.68-2.88 8.03-3.44 3.83-1.58 4.63-1.86 5.15-1.87.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.19-.04.34z"/>
    </svg>
  );
}

function WhatsAppIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.96.57 3.88 1.66 5.53L2 22l4.73-1.63a9.88 9.88 0 0 0 5.31 1.53h.01c5.46 0 9.91-4.45 9.91-9.91A9.87 9.87 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.39 1.3-1.93 1.39-.5.08-1.14.12-3.69-.93-3.26-1.34-5.35-4.66-5.51-4.88-.16-.22-1.31-1.74-1.31-3.32 0-1.58.83-2.36 1.12-2.68.29-.32.64-.4.85-.4.21 0 .43.002.61.01.2.01.47-.08.74.56.28.68.96 2.34 1.04 2.51.08.17.13.37.03.6-.1.22-.16.36-.31.54-.16.18-.33.4-.47.54-.16.16-.33.33-.14.65.19.32.84 1.38 1.81 2.24 1.25 1.11 2.3 1.45 2.63 1.61.32.16.51.14.7-.08.19-.22.82-.95 1.04-1.28.22-.32.44-.27.74-.16.3.11 1.91.9 2.24 1.06.33.16.55.24.63.38.08.13.08.78-.16 1.46z"/>
    </svg>
  );
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-navy-deep border-t border-navy-royal/30 text-slate-300 pt-16 pb-8 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-navy-royal/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-navy-royal/30">
          
          {/* Column 1: Brand Info (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-[#b58334] p-0.5 shadow-gold-glow flex items-center justify-center">
                <div className="w-full h-full bg-navy-deep rounded-[10px] flex items-center justify-center">
                  <span className="font-heading font-extrabold text-gold text-xl tracking-tighter">
                    TZ
                  </span>
                </div>
              </div>
              <div>
                <span className="font-heading font-black text-2xl text-white tracking-tight">
                  TECH<span className="text-gold">ZONE</span>
                </span>
                <p className="text-[10px] uppercase font-semibold text-slate-300 tracking-widest">
                  Learn • Prepare • Succeed
                </p>
              </div>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-md pt-2">
              TECHZONE provides concept-driven, structured competitive examination preparation for engineering graduates. Focusing on GATE, ESE, and PSU technical pathways with academic discipline, analytical rigor, and purposeful guidance.
            </p>

            {/* Official Student Community & Channels */}
            <div className="pt-3 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-gold font-bold block">
                Official Student Communities
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                
                {/* YouTube */}
                <a
                  href="http://www.youtube.com/@TECHZONE-Technical"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TECHZONE Official YouTube Channel"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-navy-surface hover:bg-[#FF0000]/15 text-slate-200 hover:text-white border border-navy-royal/40 hover:border-[#FF0000]/60 transition-all text-xs font-semibold group shadow-sm"
                >
                  <span className="p-1 rounded-md bg-[#FF0000] text-white flex items-center justify-center">
                    <YouTubeIcon className="w-3.5 h-3.5" />
                  </span>
                  <span>YouTube</span>
                </a>

                {/* Telegram */}
                <a
                  href="https://t.me/Gate_Ese_DkSirPrep"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GATE & ESE DK Sir Prep Telegram Community"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-navy-surface hover:bg-[#229ED9]/15 text-slate-200 hover:text-white border border-navy-royal/40 hover:border-[#229ED9]/60 transition-all text-xs font-semibold group shadow-sm"
                >
                  <span className="p-1 rounded-md bg-[#229ED9] text-white flex items-center justify-center">
                    <TelegramIcon className="w-3.5 h-3.5" />
                  </span>
                  <span>Telegram</span>
                </a>

                {/* WhatsApp Channel */}
                <a
                  href="https://www.whatsapp.com/channel/0029Vb7sRGZ1XquQ0XFsA32b"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TECHZONE Official WhatsApp Channel"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-navy-surface hover:bg-[#25D366]/15 text-slate-200 hover:text-white border border-navy-royal/40 hover:border-[#25D366]/60 transition-all text-xs font-semibold group shadow-sm"
                >
                  <span className="p-1 rounded-md bg-[#25D366] text-white flex items-center justify-center">
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                  </span>
                  <span>WhatsApp</span>
                </a>

              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-white text-base tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold" />
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-300 hover:text-gold transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-gold transition-colors" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-slate-300 hover:text-gold transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-gold transition-colors" />
                  Courses Offered
                </Link>
              </li>
              <li>
                <Link to="/career-orientation-seminar" className="text-slate-300 hover:text-gold transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-gold transition-colors" />
                  Career Seminar
                </Link>
              </li>
              <li>
                <Link to="/student-enquiry" className="text-slate-300 hover:text-gold transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-gold transition-colors" />
                  Student Enquiry
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-gold transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-gold transition-colors" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 hover:text-gold transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-gold transition-colors" />
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Courses Offered */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-white text-base tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold" />
              Programs
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/courses/mini-gate" className="text-slate-300 hover:text-gold transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-gold transition-colors" />
                  Mini GATE — Subject Wise
                </Link>
              </li>
              <li>
                <Link to="/courses/full-gate" className="text-slate-300 hover:text-gold transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-gold transition-colors" />
                  Full GATE — Comprehensive
                </Link>
              </li>
              <li>
                <Link to="/courses/ese" className="text-slate-300 hover:text-gold transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-gold transition-colors" />
                  ESE — Engineering Services
                </Link>
              </li>
              <li>
                <Link to="/courses/psu" className="text-slate-300 hover:text-gold transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-gold transition-colors" />
                  PSUs Preparation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-white text-base tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold" />
              Admissions Desk
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <a href="tel:+919393594797" className="text-slate-300 hover:text-gold font-medium transition-colors">
                  +91 93935 94797
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <a href="mailto:info.techzone.gate@gmail.com" className="text-slate-300 hover:text-gold break-all transition-colors">
                  info.techzone.gate@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  TECHZONE Engineering Academy, BDA Layout, Bangalore, 560017
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  Mon – Sat: 9:00 AM – 7:00 PM IST
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} TECHZONE Engineering Academy. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link to="/admin" className="text-slate-400 hover:text-slate-300 transition-colors">
              Staff Login
            </Link>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-gold transition-colors group cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
