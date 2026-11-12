import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  FileText, 
  ShieldCheck, 
  HelpCircle,
  Sparkles,
  Info
} from 'lucide-react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Accordion } from '../../components/common/Accordion';

export default function EseCoursePage() {
  const stages = [
    {
      stage: "Stage I — Preliminary Examination",
      type: "Objective / Computer-based & OMR",
      papers: [
        {
          name: "Paper I: General Studies & Engineering Aptitude",
          desc: "Current issues, engineering ethics, project management, energy & environment, standards and quality practices."
        },
        {
          name: "Paper II: Engineering Discipline Technical",
          desc: "In-depth objective evaluation of core discipline engineering subjects."
        }
      ]
    },
    {
      stage: "Stage II — Main Examination",
      type: "Conventional / Descriptive Written",
      papers: [
        {
          name: "Paper I: Discipline Conventional Engineering",
          desc: "Descriptive problem solving, numerical derivation, schematic drafting, and design calculations."
        },
        {
          name: "Paper II: Discipline Conventional Advanced Engineering",
          desc: "Advanced domain applications with detailed explanatory writing and standard engineering assumptions."
        }
      ]
    },
    {
      stage: "Stage III — Personality Test",
      type: "Interview Board Assessment",
      papers: [
        {
          name: "UPSC Technical & Personality Board",
          desc: "Evaluation of leadership presence, mental alertness, judgment under pressure, and ethical integrity."
        }
      ]
    }
  ];

  const faqs = [
    {
      question: "Which engineering disciplines are eligible for ESE?",
      answer: "UPSC conducts ESE specifically for four engineering branches: Civil Engineering (CE), Mechanical Engineering (ME), Electrical Engineering (EE), and Electronics & Telecommunication Engineering (E&T)."
    },
    {
      question: "How does ESE preparation differ from GATE?",
      answer: "While GATE concentrates on deep numerical and conceptual problem-solving in objective format, ESE demands broader syllabus coverage including General Studies and rigorous hand-written descriptive derivations for the Mains examination."
    },
    {
      question: "Is answer-writing practice provided for the Stage II Mains paper?",
      answer: "Yes. Answer presentation, step-wise calculation formatting, and diagram schematic drawing are core focus areas in our ESE program."
    }
  ];

  return (
    <div className="bg-brand-offwhite">
      
      {/* Hero */}
      <section className="bg-navy-gradient text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-10 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="dark" size="md" className="mb-4">
              <Award className="w-3.5 h-3.5 text-gold" />
              UPSC Engineering Services
            </Badge>

            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight mb-4">
              Prepare for Engineering Services <span className="text-gold">With Confidence.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-8">
              Build the broad technical mastery, descriptive answer precision, and examination temperament demanded by the Union Public Service Commission (UPSC).
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                to="/student-enquiry?course=ese"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Enquire for ESE Program
              </Button>
              <a
                href="#stages"
                className="px-6 py-3.5 rounded-lg border border-gold/40 text-gold hover:bg-gold/10 font-heading font-bold text-sm transition-colors"
              >
                Explore Examination Structure ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Philosophy */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <SectionHeading
              badge="Examination Architecture"
              title="A Rigorous Multi-Tier"
              highlight="Examination."
              align="left"
              subtitle="The Engineering Services Examination serves as the premier gateway to Class-1 Gazetted officer positions within the Government of India."
              className="mb-6"
            />
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              ESE is distinguished by its twin demands: the speed and breadth required for the Stage I Preliminary objective examination, followed by the deep analytical precision, step-by-step derivation, and schematic drafting required for the Stage II Mains written papers.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Our preparation methodology emphasizes concurrent readiness—ensuring students do not separate preliminary objective facts from the fundamental physics and mathematics necessary to compose structured conventional solutions.
            </p>
          </div>

          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-premium space-y-4">
            <h3 className="font-heading font-bold text-lg text-navy-deep border-b border-slate-100 pb-3">
              Key Focus Areas
            </h3>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>Paper I General Studies: Ethics, Environment & Project Management</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>Exhaustive coverage of complete technical discipline syllabus</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>Descriptive conventional answer-writing practice & diagram neatness</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>Evaluated conventional tests with detailed correction feedback</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3 Stages Section */}
      <section id="stages" className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="Three-Tier Framework"
            title="ESE Examination"
            highlight="Stages."
            subtitle="Understanding the structure of UPSC Engineering Services Examination."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {stages.map((st, i) => (
              <div key={i} className="rounded-2xl p-7 bg-brand-offwhite border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-gold-dark uppercase tracking-wider mb-2">
                    {st.type}
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-navy-deep mb-4">
                    {st.stage}
                  </h3>
                  <div className="space-y-4">
                    {st.papers.map((p, pIdx) => (
                      <div key={pIdx} className="bg-white p-4 rounded-xl border border-slate-200">
                        <h4 className="font-heading font-bold text-sm text-navy-royal mb-1">
                          {p.name}
                        </h4>
                        <p className="text-xs text-brand-muted leading-relaxed">
                          {p.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Clarifications"
          title="Frequently Asked"
          highlight="Questions."
          subtitle="Answers to common queries concerning the Engineering Services Examination."
        />

        <Accordion items={faqs} />
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy-gradient text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl mb-4">
            Plan Your ESE Preparation Strategy.
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto text-sm sm:text-base">
            Reach out to our academic advisors to learn about syllabus alignment, technical branch guidance, and preparation schedules.
          </p>
          <Button
            to="/student-enquiry?course=ese"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Submit ESE Enquiry
          </Button>
        </div>
      </section>

    </div>
  );
}
