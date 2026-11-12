import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Compass, 
  BookOpen, 
  ShieldCheck, 
  HelpCircle, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Accordion } from '../../components/common/Accordion';

export function PsuCoursePage() {
  const pathways = [
    {
      title: "GATE-Based PSU Recruitment",
      orgs: "IOCL, ONGC, NTPC, BHEL, GAIL, PowerGrid, BPCL, HPCL",
      desc: "Top Public Sector Undertakings shortlist candidates directly using GATE percentile cutoffs, followed by technical interviews and Group Discussions (GD/GT)."
    },
    {
      title: "Independent Technical Examinations",
      orgs: "ISRO, BARC, BEL, HAL, DRDO (RAC), NIELIT, Coal India",
      desc: "Distinguished research organizations and specialized defense/electronics enterprises conduct separate, rigorous computer-based written examinations."
    },
    {
      title: "State Public Utilities & Electricity Boards",
      orgs: "State GENCOs, TRANSCOs, DISCOMs, State Engineering Cadres",
      desc: "State-level power transmission, generation, and public works corporations regularly notify recruitments through specialized technical papers."
    }
  ];

  const faqs = [
    {
      question: "Do all PSUs recruit exclusively through GATE scores?",
      answer: "No. While major Maharatnas recruit through GATE percentiles, several premier bodies including ISRO, BARC, BEL, and state public sector corporations conduct their own independent competitive examinations."
    },
    {
      question: "What is the typical minimum degree percentage required by PSUs?",
      answer: "Most PSUs specify a minimum aggregate of 60% or 65% (or equivalent 6.5+ CGPA) in a full-time B.E./B.Tech degree. Specific criteria are subject to official notifications issued by each individual enterprise."
    },
    {
      question: "Are PSU technical interviews covered in the preparation curriculum?",
      answer: "Yes, our PSU guidance curriculum includes technical interview etiquette, final-year engineering project articulation, and industry-oriented practical questioning."
    }
  ];

  return (
    <div className="bg-brand-offwhite">
      
      {/* Hero */}
      <section className="bg-navy-gradient text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="dark" size="md" className="mb-4">
              <Building2 className="w-3.5 h-3.5 text-gold" />
              Public Sector Technical Careers
            </Badge>

            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight mb-4">
              Prepare Today. <span className="text-gold">Build Tomorrow.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-8">
              Develop the rigorous technical depth, problem-solving speed, and interview confidence required for public sector engineering examinations and recruitment pathways.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                to="/student-enquiry?course=psu"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Enquire for PSU Preparation
              </Button>
              <a
                href="#pathways"
                className="px-6 py-3.5 rounded-lg border border-gold/40 text-gold hover:bg-gold/10 font-heading font-bold text-sm transition-colors"
              >
                View Recruitment Pathways ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Recruitment Awareness:</strong> PSU recruitment notifications, age limits, degree eligibility criteria, and vacancies are determined independently by respective public sector undertakings and government ministries each fiscal year. Preparation focuses on technical mastery across core disciplines.
          </div>
        </div>
      </section>

      {/* Recruitment Pathways */}
      <section id="pathways" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Career Channels"
          title="Understanding PSU"
          highlight="Recruitment Pathways."
          subtitle="Explore the different entry points into India's public sector engineering enterprises."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {pathways.map((pw, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-7 border border-slate-200 shadow-premium flex flex-col justify-between hover:border-gold/40 transition-all duration-300"
            >
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  Channel 0{i + 1}
                </span>
                <h3 className="font-heading font-bold text-xl text-navy-deep mt-4 mb-2">
                  {pw.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mb-4">
                  Representative: {pw.orgs}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {pw.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <SectionHeading
          badge="Clarifications"
          title="Frequently Asked"
          highlight="Questions."
          subtitle="Key questions about public sector examination preparation."
        />

        <Accordion items={faqs} />
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy-gradient text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl mb-4">
            Take the First Step Towards PSU Readiness.
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto text-sm sm:text-base">
            Reach out to our academic advisors to discuss discipline-specific preparation for upcoming public sector recruitments.
          </p>
          <Button
            to="/student-enquiry?course=psu"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Submit PSU Enquiry
          </Button>
        </div>
      </section>

    </div>
  );
}

export default PsuCoursePage;
