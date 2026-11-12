import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import confetti from 'canvas-confetti';
import { 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Copy, 
  Check, 
  AlertCircle,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Api } from '../services/api';
import { BRANCHES_DATA } from '../data/coursesData';

const enquirySchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  mobileNumber: z.string().regex(/^(?:91)?[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  college: z.string().optional(),
  engineeringBranch: z.string().min(1, "Please select your engineering branch"),
  academicYear: z.string().optional(),
  interestedCourse: z.string().min(1, "Please select an interested course"),
  preferredSubject: z.string().optional(),
  message: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to be contacted for academic consultation." })
  })
});

export default function StudentEnquiryPage() {
  const [searchParams] = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Read URL query params if pre-filled
  const defaultCourse = searchParams.get('course') || '';
  const defaultBranch = searchParams.get('branch') || '';
  const defaultSubject = searchParams.get('subject') || '';

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      fullName: '',
      email: '',
      mobileNumber: '',
      college: '',
      engineeringBranch: defaultBranch || '',
      academicYear: '',
      interestedCourse: defaultCourse ? (
        defaultCourse === 'mini-gate' ? 'Mini GATE' :
        defaultCourse === 'full-gate' ? 'Full GATE' :
        defaultCourse === 'ese' ? 'ESE' :
        defaultCourse === 'psu' ? 'PSU' : defaultCourse
      ) : '',
      preferredSubject: defaultSubject || '',
      message: '',
      consent: false
    }
  });

  const selectedCourse = watch("interestedCourse");
  const selectedBranch = watch("engineeringBranch");

  // Determine if conditional subject selection should be displayed
  const isGateCourse = selectedCourse === "Mini GATE" || selectedCourse === "Full GATE";

  // Find relevant branch subjects
  const currentBranchObj = BRANCHES_DATA.find(b => 
    selectedBranch && (b.name.toLowerCase().includes(selectedBranch.toLowerCase()) || b.id === selectedBranch)
  );

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setApiError(null);

      const response = await Api.submitEnquiry(data);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setSubmissionResult(response);
      reset();
    } catch (err) {
      setApiError(err.message || "Failed to submit enquiry. Please verify your details and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const copyReference = () => {
    if (submissionResult?.referenceNumber) {
      navigator.clipboard.writeText(submissionResult.referenceNumber);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  return (
    <div className="bg-brand-offwhite min-h-[90vh]">
      
      {/* Top Banner Header */}
      <section className="bg-navy-gradient text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Badge variant="dark" size="md" className="mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Admissions & Student Guidance
          </Badge>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight mb-2">
            Let's Talk About <span className="text-gold">Your Future.</span>
          </h1>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Share your academic goals with us and take the first step towards focused, disciplined preparation.
          </p>
        </div>
      </section>

      {/* Main Split-Screen Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Visual, Value Points & Contact Snapshot */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-navy-deep text-white p-7 sm:p-8 rounded-3xl border border-navy-royal/50 shadow-xl space-y-6">
              <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider block">
                The TECHZONE Advantage
              </span>

              <h2 className="font-heading font-extrabold text-2xl text-white">
                Honest Guidance. Purposeful Direction.
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Submitting an enquiry connects you directly with our academic guidance team. We do not engage in aggressive marketing or unverified claims. We review your academic branch, current year, and target goals to suggest genuine preparation pathways.
              </p>

              <div className="space-y-3.5 pt-2 border-t border-navy-royal/40 text-xs sm:text-sm text-slate-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span>Personalized consultation on subject-wise vs comprehensive batches</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span>Syllabus breakdown for GATE, ESE & Technical PSU recruitments</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span>Unique enquiry reference code for real-time status tracking</span>
                </div>
              </div>
            </div>

            {/* Official Admissions Desk Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-xs sm:text-sm">
              <h3 className="font-heading font-bold text-navy-deep text-base">
                Direct Admissions Desk
              </h3>
              <div className="flex items-center gap-2.5 text-slate-600">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="tel:+919393594797" className="hover:text-gold transition-colors font-medium">
                  +91 93935 94797
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-600">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="mailto:info.techzone.gate@gmail.com" className="hover:text-gold transition-colors">
                  info.techzone.gate@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-600">
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Mon – Sat: 9:00 AM – 7:00 PM IST</span>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Enquiry Form */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-premium">
            
            {submissionResult ? (
              /* Success Confirmation Card */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center py-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy-deep">
                    Enquiry Registered Successfully!
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto">
                    Your enquiry has been permanently recorded in the TECHZONE database. An academic counsellor will review your details and reach out shortly.
                  </p>
                </div>

                {/* Reference Code Box */}
                <div className="bg-navy-deep text-white p-5 rounded-2xl border border-navy-royal inline-block text-left max-w-md w-full mx-auto">
                  <span className="text-[11px] font-mono text-gold uppercase tracking-wider block mb-1">
                    Unique Reference Number
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-lg text-white">
                      {submissionResult.referenceNumber}
                    </span>
                    <button
                      type="button"
                      onClick={copyReference}
                      className="p-1.5 rounded-lg bg-navy-surface hover:bg-navy-royal text-gold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedRef ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedRef ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    onClick={() => setSubmissionResult(null)}
                    variant="primary"
                    size="md"
                  >
                    Submit Another Enquiry
                  </Button>
                  <Button
                    to="/courses"
                    variant="outline"
                    size="md"
                  >
                    Explore Courses
                  </Button>
                </div>
              </motion.div>
            ) : (
              /* Enquiry Form */
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                <div>
                  <h2 className="font-heading font-extrabold text-2xl text-navy-deep">
                    Student Enquiry Form
                  </h2>
                  <p className="text-xs text-brand-muted mt-0.5">
                    Please provide accurate information for academic records and session planning.
                  </p>
                </div>

                {apiError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>{apiError}</span>
                  </div>
                )}

                {/* 1. Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register("fullName")}
                    placeholder="e.g. Aditi Sen"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy text-sm outline-none"
                  />
                  {errors.fullName && (
                    <span className="text-xs text-red-600 mt-1 block">{errors.fullName.message}</span>
                  )}
                </div>

                {/* 2 & 3. Email & Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="e.g. aditi@example.com"
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

                {/* 4 & 5. College & Branch */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      College / University (Optional)
                    </label>
                    <input
                      type="text"
                      {...register("college")}
                      placeholder="e.g. IIT Kharagpur, DTU, NIT"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Engineering Branch *
                    </label>
                    <select
                      {...register("engineeringBranch")}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy text-sm outline-none bg-white"
                    >
                      <option value="">Select Branch</option>
                      <option value="Computer Science & IT">Computer Science & IT (CS/IT)</option>
                      <option value="Mechanical Engineering">Mechanical Engineering (ME)</option>
                      <option value="Civil Engineering">Civil Engineering (CE)</option>
                      <option value="Electrical Engineering">Electrical Engineering (EE)</option>
                      <option value="Electronics & Communication">Electronics & Communication (EC)</option>
                      <option value="Other Engineering Branch">Other Engineering Branch</option>
                    </select>
                    {errors.engineeringBranch && (
                      <span className="text-xs text-red-600 mt-1 block">{errors.engineeringBranch.message}</span>
                    )}
                  </div>
                </div>

                {/* 6 & 7. Academic Year & Interested Course */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Academic Year (Optional)
                    </label>
                    <select
                      {...register("academicYear")}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy text-sm outline-none bg-white"
                    >
                      <option value="">Select Academic Year</option>
                      <option value="1st / 2nd Year">1st / 2nd Year Undergraduate</option>
                      <option value="3rd Year">3rd Year (Pre-final)</option>
                      <option value="4th Year">4th Year (Final Year)</option>
                      <option value="Graduated / Dropper">Graduated / Working Professional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Interested Course *
                    </label>
                    <select
                      {...register("interestedCourse")}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy text-sm outline-none bg-white"
                    >
                      <option value="">Select Course Pathway</option>
                      <option value="Mini GATE">Mini GATE (Subject-Wise)</option>
                      <option value="Full GATE">Full GATE (Comprehensive)</option>
                      <option value="ESE">ESE (Engineering Services)</option>
                      <option value="PSU">PSU Preparation</option>
                      <option value="Career Orientation Seminar">Career Orientation Seminar</option>
                    </select>
                    {errors.interestedCourse && (
                      <span className="text-xs text-red-600 mt-1 block">{errors.interestedCourse.message}</span>
                    )}
                  </div>
                </div>

                {/* 8. Conditional Preferred Subject (Rendered when Mini GATE or Full GATE is chosen) */}
                <AnimatePresence>
                  {isGateCourse && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 rounded-xl bg-gold/10 border border-gold/30">
                        <label className="block text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
                          Preferred Subject / Module Focus (Optional)
                        </label>
                        {currentBranchObj && currentBranchObj.subjects.length > 0 ? (
                          <select
                            {...register("preferredSubject")}
                            className="w-full px-4 py-2 rounded-xl border border-gold/40 focus:border-navy focus:ring-1 focus:ring-navy text-sm outline-none bg-white"
                          >
                            <option value="">All Core Modules / Undecided</option>
                            {currentBranchObj.subjects.map((sub, i) => (
                              <option key={i} value={sub}>{sub}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            {...register("preferredSubject")}
                            placeholder="e.g. Data Structures, Thermodynamics, Soil Mechanics..."
                            className="w-full px-4 py-2 rounded-xl border border-gold/40 focus:border-navy focus:ring-1 focus:ring-navy text-sm outline-none bg-white"
                          />
                        )}
                        <span className="text-[11px] text-amber-800 mt-1 block">
                          You can specify one or multiple subjects you want to prioritize.
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 9. Message / Query */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Your Questions / Specific Goals (Optional)
                  </label>
                  <textarea
                    {...register("message")}
                    rows={3}
                    placeholder="Share any specific requirements or examination targets..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-navy focus:ring-1 focus:ring-navy text-sm outline-none resize-none"
                  />
                </div>

                {/* 10. Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("consent")}
                      className="mt-1 w-4 h-4 rounded text-navy focus:ring-navy border-slate-300"
                    />
                    <span className="text-xs text-slate-600 leading-snug">
                      I consent to receive academic guidance and relevant course notifications from TECHZONE Admissions via email or SMS. *
                    </span>
                  </label>
                  {errors.consent && (
                    <span className="text-xs text-red-600 mt-1 block">{errors.consent.message}</span>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full justify-center"
                    loading={submitting}
                    disabled={submitting}
                  >
                    Submit Student Enquiry
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
