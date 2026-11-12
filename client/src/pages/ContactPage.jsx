import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Navigation
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Api } from '../services/api';

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

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export default function ContactPage() {
  const [settings, setSettings] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema)
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await Api.getSettings();
        setSettings(data);
      } catch (err) {
        console.warn("Could not load dynamic settings:", err);
      }
    }
    fetchSettings();
  }, []);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setErrorMessage(null);
      await Api.submitContact(data);
      setSentSuccess(true);
      reset();
    } catch (err) {
      setErrorMessage(err.message || "Failed to deliver message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const contactCards = [
    {
      icon: Phone,
      title: "Admissions & Inquiries",
      detail: settings?.phone || "+91 93935 94797 (Admissions Desk)",
      sub: "Available Monday to Saturday",
      href: `tel:${settings?.phone || "+919393594797"}`
    },
    {
      icon: Mail,
      title: "Official Email",
      detail: settings?.email || "info.techzone.gate@gmail.com",
      sub: "Average response within 24 business hours",
      href: `mailto:${settings?.email || "info.techzone.gate@gmail.com"}`
    },
    {
      icon: MapPin,
      title: "Campus Location",
      detail: settings?.address || "TECHZONE Engineering Academy, BDA Layout, Bangalore, 560017",
      sub: "Open for in-person academic visits",
      href: null
    },
    {
      icon: Clock,
      title: "Working Hours",
      detail: settings?.workingHours || "Mon – Sat: 9:00 AM – 7:00 PM IST",
      sub: "Closed on Sundays & Gazetted Holidays",
      href: null
    }
  ];

  return (
    <div className="bg-brand-offwhite">
      
      {/* Hero Header */}
      <section className="bg-navy-gradient text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Badge variant="dark" size="md" className="mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Connect With TECHZONE
          </Badge>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight mb-4">
            We'd Love to <span className="text-gold">Hear From You.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Have questions about course syllabi, batch scheduling, seminar dates, or subject-wise preparation? Our academic advisory desk is here to assist you.
          </p>
        </div>
      </section>

      {/* 4 Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-premium flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-navy-surface/10 text-navy-royal flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-sm text-slate-400 uppercase tracking-wider mb-1">
                    {card.title}
                  </h3>
                  <p className="font-heading font-bold text-base text-navy-deep break-words">
                    {card.detail}
                  </p>
                </div>
                <p className="text-xs text-brand-muted mt-3 pt-3 border-t border-slate-100 font-normal">
                  {card.sub}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Split Section: Contact Form & Campus Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-premium">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy-deep mb-2">
              Send Us a Message
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted mb-6">
              Leave your inquiry below and our support team will respond promptly.
            </p>

            {sentSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <h4 className="font-heading font-bold text-lg">Message Sent Successfully</h4>
                </div>
                <p className="text-sm leading-relaxed">
                  Thank you for reaching out to TECHZONE. Your message has been saved in our system and an academic counselor will reply to your email shortly.
                </p>
                <div className="pt-2">
                  <Button
                    onClick={() => setSentSuccess(false)}
                    variant="outline"
                    size="sm"
                  >
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      {...register("name")}
                      placeholder="e.g. Vikram Mehta"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy text-sm outline-none"
                    />
                    {errors.name && (
                      <span className="text-xs text-red-600 mt-1 block">{errors.name.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="e.g. vikram@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy text-sm outline-none"
                    />
                    {errors.email && (
                      <span className="text-xs text-red-600 mt-1 block">{errors.email.message}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    {...register("subject")}
                    placeholder="e.g. Inquiry regarding Mini GATE Mechanical modules"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy text-sm outline-none"
                  />
                  {errors.subject && (
                    <span className="text-xs text-red-600 mt-1 block">{errors.subject.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Message Content *
                  </label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    placeholder="Please write your detailed query or message here..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy text-sm outline-none resize-none"
                  />
                  {errors.message && (
                    <span className="text-xs text-red-600 mt-1 block">{errors.message.message}</span>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full justify-center"
                    loading={submitting}
                    disabled={submitting}
                  >
                    Send Message
                  </Button>
                </div>

              </form>
            )}
          </div>

          {/* Campus Map & Advisory */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-navy-deep text-white p-7 rounded-3xl border border-navy-royal/50 shadow-xl space-y-4">
              <h3 className="font-heading font-bold text-xl text-white">
                Visit Our Campus
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Prospective students and parents are welcome to visit our academic campus during regular working hours to inspect our classroom infrastructure, library resources, and meet our academic counselors.
              </p>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold border border-gold/30">
                  Prior appointment recommended
                </span>
              </div>
            </div>

            {/* Official Student Community Channels */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-premium space-y-3">
              <span className="text-xs font-mono font-bold text-navy-deep uppercase tracking-wider block">
                Official Discussion & Update Channels
              </span>
              <p className="text-xs text-slate-500 leading-relaxed">
                Connect with mentors and engineering aspirants for daily question discussions, notification updates, and formula sheets:
              </p>
              
              <div className="space-y-2.5 pt-1">
                {/* YouTube */}
                <a
                  href="http://www.youtube.com/@TECHZONE-Technical"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-[#FF0000]/10 border border-slate-200 hover:border-[#FF0000]/40 transition-all text-xs font-bold text-navy-deep group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#FF0000] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <YouTubeIcon className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="block text-navy-deep group-hover:text-[#FF0000] transition-colors">
                        YouTube Channel
                      </span>
                      <span className="text-[11px] text-slate-400 font-normal">
                        @TECHZONE-Technical
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#FF0000] transition-colors" />
                </a>

                {/* Telegram */}
                <a
                  href="https://t.me/Gate_Ese_DkSirPrep"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-[#229ED9]/10 border border-slate-200 hover:border-[#229ED9]/40 transition-all text-xs font-bold text-navy-deep group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#229ED9] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <TelegramIcon className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="block text-navy-deep group-hover:text-[#229ED9] transition-colors">
                        Telegram Community
                      </span>
                      <span className="text-[11px] text-slate-400 font-normal">
                        DK Sir Prep (GATE & ESE)
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#229ED9] transition-colors" />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://www.whatsapp.com/channel/0029Vb7sRGZ1XquQ0XFsA32b"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-[#25D366]/10 border border-slate-200 hover:border-[#25D366]/40 transition-all text-xs font-bold text-navy-deep group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <WhatsAppIcon className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="block text-navy-deep group-hover:text-[#25D366] transition-colors">
                        WhatsApp Channel
                      </span>
                      <span className="text-[11px] text-slate-400 font-normal">
                        Official Broadcasts & Alerts
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#25D366] transition-colors" />
                </a>
              </div>
            </div>

            {/* Live Interactive Campus Map */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-premium">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="font-heading font-bold text-xs text-navy-deep">
                    Bangalore Campus Location
                  </span>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=BDA+Layout+Bangalore+560017"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-navy-royal hover:text-gold transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Embedded Google Map */}
              <div className="relative h-64 w-full bg-slate-100">
                <iframe
                  title="TECHZONE Campus Map"
                  src="https://maps.google.com/maps?q=BDA%20Layout%2C%20Bangalore%2C%20560017&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="p-4 bg-white space-y-3">
                <div>
                  <h4 className="font-heading font-bold text-sm text-navy-deep">
                    {settings?.address || "TECHZONE Engineering Academy, BDA Layout, Bangalore, 560017"}
                  </h4>
                  <p className="text-xs text-brand-muted mt-0.5">
                    Conveniently accessible via Bangalore Metro & Outer Ring Road Transit.
                  </p>
                </div>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=BDA+Layout+Bangalore+560017"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-navy-deep hover:bg-navy-royal text-gold font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Driving Directions</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
