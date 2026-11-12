import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import confetti from 'canvas-confetti';
import { 
  Compass, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  HelpCircle,
  Building2,
  Check,
  AlertCircle
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Api } from '../services/api';

const seminarSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  mobileNumber: z.string().regex(/^(?:91)?[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  college: z.string().min(2, "College/University is required"),
  engineeringBranch: z.string().min(1, "Please select your engineering branch"),
  currentYear: z.string().min(1, "Please select your current year of study"),
  message: z.string().optional()
});

export default function CareerSeminarPage() {
  const [seminars, setSeminars] = useState([]);
  const [loadingSeminars, setLoadingSeminars] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const [apiError, setApiError] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(seminarSchema)
  });

  useEffect(() => {
    async function loadSeminars() {
      try {
        setLoadingSeminars(true);
        const data = await Api.getSeminars();
        setSeminars(data);
      } catch (err) {
        console.error("Failed to load seminars:", err);
      } finally {
        setLoadingSeminars(false);
      }
    }
    loadSeminars();
  }, []);

  const onSubmit = async (formData) => {
    try {
      setSubmitting(true);
      setApiError(null);
      const activeSeminar = seminars.length > 0 ? seminars[0] : null;

      const payload = {
        ...formData,
        seminarId: activeSeminar ? activeSeminar.id : 'general-orientation',
        seminarTitle: activeSeminar ? activeSeminar.title : 'General Engineering Career Orientation'
      };

      const res = await Api.registerSeminar(payload);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });

      setSubmissionSuccess({
        message: res.message,
        details: res.registration
      });
      reset();
    } catch (err) {
      setApiError(err.message || "Failed to submit registration. Please check your information and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const whyAttend = [
    { title: "Understand Engineering Pathways", desc: "Gain unbiased clarity on technical versus non-technical opportunities, higher education (M.Tech/MS/Ph.D), and public sector roles." },
    { title: "Learn Competitive Exam Dynamics", desc: "Understand real cutoff benchmarks, score weightages, and how examination questions test fundamental intuition." },
    { title: "Explore GATE, ESE & PSU Options", desc: "Decide whether your natural strengths align with deep technical research, public sector administration, or PSU engineering." },
    { title: "Formulate Actionable Study Plans", desc: "Learn how to balance university academic schedules, college exams, and competitive preparation timelines." },
    { title: "Make Informed Decisions", desc: "Avoid generic advice and formulate your career trajectory based on verified examination trends and requirements." }
  ];

  const whoAttend = [
    { role: "2nd & 3rd Year Students", desc: "Early planners wanting to align semester engineering subjects with GATE fundamentals." },
    { role: "Final-Year Students", desc: "Students aiming for top percentiles to secure premier PSU calls or IIT M.Tech seats." },
    { role: "Recent Graduates", desc: "Graduates seeking a disciplined, structured study roadmap for dedicated full-time preparation." },
    { role: "Examination Aspirants", desc: "Engineers seeking clarity on exam transitions, syllabus shifts, and strategic test preparation." }
  ];

  return (
    <div className="bg-brand-offwhite">
      
      {/* Hero Section */}
      <section className="bg-navy-gradient text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-10 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Badge variant="dark" size="md" className="mb-4">
            <Compass className="w-3.5 h-3.5 text-gold" />
            Empowering Engineering Aspirants
          </Badge>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight mb-4 max-w-4xl mx-auto">
            Your Career. Your Choices.{' '}
            <span className="text-gold">Your Future.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8">
            Gain clarity about engineering career opportunities, competitive examinations, and the preparation pathways available to you.
          </p>

          <a
            href="#register-seminar"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-gold text-navy-deep font-heading font-bold text-sm shadow-gold-glow hover:bg-gold-soft transition-all"
          >
            <span>Register Your Interest</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Why Attend Section */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Orientation Objectives"
          title="Why Attend the"
          highlight="Seminar?"
          subtitle="A focused session designed to dismantle confusion and equip aspiring engineers with actionable clarity."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyAttend.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-premium hover:border-gold/40 transition-all duration-300">
              <div className="w-8 h-8 rounded-full bg-gold/15 text-amber-800 font-mono text-xs font-bold flex items-center justify-center mb-4">
                0{i + 1}
              </div>
              <h3 className="font-heading font-bold text-lg text-navy-deep mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Who Can Attend Section */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Target Audience"
            title="Who Can"
            highlight="Attend?"
            subtitle="The seminar is designed for engineering undergraduates and recent graduates at various stages of their academic journey."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoAttend.map((w, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-brand-offwhite border border-slate-200">
                <Users className="w-6 h-6 text-navy-royal mb-3" />
                <h3 className="font-heading font-bold text-base text-navy-deep mb-1">
                  {w.role}
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Seminar Schedule & Registration Form */}
      <section id="register-seminar" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Upcoming Seminar Information */}
          <div className="lg:col-span-5 space-y-6">
            <SectionHeading
              badge="Event Schedule"
              title="Upcoming Seminar"
              highlight="Details."
              align="left"
              subtitle="Session schedule and briefing particulars."
              className="mb-4"
            />

            {seminars.length > 0 ? (
              seminars.map((sem) => (
                <div key={sem.id} className="bg-navy-deep text-white p-7 rounded-3xl border border-navy-royal/50 shadow-xl space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-navy-royal/40">
                    <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider">
                      Upcoming Seminar
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {sem.registrationStatus || "Open"}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-xl text-white">
                    {sem.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {sem.description}
                  </p>

                  <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-200">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
                      <span>{sem.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                      <span>{sem.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                      <span>{sem.venueOrOnline}</span>
                    </div>
                  </div>

                  {sem.highlights && sem.highlights.length > 0 && (
                    <div className="pt-3 border-t border-navy-royal/40 space-y-1.5">
                      <span className="text-[11px] uppercase font-bold text-gold tracking-wider block mb-2">
                        Session Highlights
                      </span>
                      {sem.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-3">
                <Calendar className="w-10 h-10 text-gold mx-auto" />
                <h3 className="font-heading font-bold text-lg text-navy-deep">
                  Upcoming seminar details will be announced soon.
                </h3>
                <p className="text-xs text-slate-500">
                  Please register your interest using the form to be notified as soon as the next session date is published.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-premium">
            <div className="mb-6">
              <h3 className="font-heading font-extrabold text-2xl text-navy-deep mb-1">
                Register Your Interest
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted">
                Fill in your details below to secure your seat for upcoming orientation sessions.
              </p>
            </div>

            {submissionSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-lg">Registration Successful</h4>
                    <p className="text-xs text-emerald-700">Thank you for registering!</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">
                  {submissionSuccess.message}
                </p>
                <div className="pt-2">
                  <Button
                    onClick={() => setSubmissionSuccess(null)}
                    variant="outline"
                    size="sm"
                  >
                    Register Another Candidate
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {apiError && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>{apiError}</span>
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register("fullName")}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy text-sm outline-none"
                  />
                  {errors.fullName && (
                    <span className="text-xs text-red-600 mt-1 block">{errors.fullName.message}</span>
                  )}
                </div>

                {/* Email and Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy text-sm outline-none"
                    />
                    {errors.email && (
                      <span className="text-xs text-red-600 mt-1 block">{errors.email.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      {...register("mobileNumber")}
                      placeholder="10-digit mobile number"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy text-sm outline-none"
                    />
                    {errors.mobileNumber && (
                      <span className="text-xs text-red-600 mt-1 block">{errors.mobileNumber.message}</span>
                    )}
                  </div>
                </div>

                {/* College / University */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    College / University *
                  </label>
                  <input
                    type="text"
                    {...register("college")}
                    placeholder="e.g. National Institute of Technology"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy text-sm outline-none"
                  />
                  {errors.college && (
                    <span className="text-xs text-red-600 mt-1 block">{errors.college.message}</span>
                  )}
                </div>

                {/* Branch and Year */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Engineering Branch *
                    </label>
                    <select
                      {...register("engineeringBranch")}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy text-sm outline-none bg-white"
                    >
                      <option value="">Select Branch</option>
                      <option value="Computer Science & IT">Computer Science & IT</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                      <option value="Civil Engineering">Civil Engineering</option>
                      <option value="Electrical Engineering">Electrical Engineering</option>
                      <option value="Electronics & Communication">Electronics & Communication</option>
                      <option value="Other Engineering Branch">Other Engineering Branch</option>
                    </select>
                    {errors.engineeringBranch && (
                      <span className="text-xs text-red-600 mt-1 block">{errors.engineeringBranch.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Current Year *
                    </label>
                    <select
                      {...register("currentYear")}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy text-sm outline-none bg-white"
                    >
                      <option value="">Select Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year (Final Year)">4th Year (Final Year)</option>
                      <option value="Graduated / Dropper">Graduated / Dropper</option>
                    </select>
                    {errors.currentYear && (
                      <span className="text-xs text-red-600 mt-1 block">{errors.currentYear.message}</span>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Specific Career Questions (Optional)
                  </label>
                  <textarea
                    {...register("message")}
                    rows={3}
                    placeholder="Share any specific queries regarding exam choices or preparation timelines..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy text-sm outline-none resize-none"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full justify-center"
                    loading={submitting}
                    disabled={submitting}
                  >
                    Confirm Seminar Registration
                  </Button>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

    </div>
  );
}
