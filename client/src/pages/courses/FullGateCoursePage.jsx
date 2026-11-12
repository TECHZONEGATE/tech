import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  Compass, 
  BookOpen, 
  Layers, 
  HelpCircle, 
  Sparkles,
  BarChart3,
  Calendar,
  Target
} from 'lucide-react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Accordion } from '../../components/common/Accordion';

export default function FullGateCoursePage() {
  const roadmap = [
    {
      step: "Phase 01",
      title: "Foundational Concepts",
      desc: "Zero-assumption groundwork in Engineering Mathematics, General Aptitude, and elementary principles of your engineering discipline."
    },
    {
      step: "Phase 02",
      title: "Core Subject Deep Dives",
      desc: "Exhaustive coverage of every syllabus module with analytical proofs, design formulas, and physical intuition."
    },
    {
      step: "Phase 03",
      title: "Multi-Concept Problem Solving",
      desc: "Systematic classification and practice of numerical answer type (NAT), multiple choice (MCQ), and multiple select (MSQ) questions."
    },
    {
      step: "Phase 04",
      title: "Structured Revision Cycles",
      desc: "Periodic formula reviews, short-notes compilation, and active recall drills to preserve syllabus retention."
    },
    {
      step: "Phase 05",
      title: "Simulated National Mock Tests",
      desc: "Full-length examination simulations replicating actual virtual calculators, interface dynamics, and negative-marking constraints."
    },
    {
      step: "Phase 06",
      title: "Targeted Error Remediation",
      desc: "Granular diagnostic review of mock exams to pinpoint conceptual slip-ups, careless calculations, and time management bottlenecks."
    }
  ];

  const pillars = [
    {
      title: "Concept Development",
      desc: "Mastery begins with why equations work, not mere rote memorization of formulas.",
      icon: BookOpen
    },
    {
      title: "Systematic Practice",
      desc: "Graded question sets ranging from standard textbook benchmarks to tricky multi-concept GATE problems.",
      icon: Target
    },
    {
      title: "Simulated Test Atmosphere",
      desc: "Realistic examination practice using the official GATE virtual calculator interface and time budgets.",
      icon: Layers
    },
    {
      title: "Analytics-Driven Tracking",
      desc: "Personalized diagnosis tracking accuracy percentage, topic strength indices, and time expenditure per question.",
      icon: BarChart3
    }
  ];

  const faqs = [
    {
      question: "What is the recommended preparation duration for the Full GATE curriculum?",
      answer: "A dedicated preparation span of 10 to 14 months is generally ideal, providing adequate runway to absorb all core subjects, complete multiple revision cycles, and take full test series."
    },
    {
      question: "Are Engineering Mathematics and General Aptitude included?",
      answer: "Yes, both Engineering Mathematics and General Aptitude carry substantial weightage in the GATE paper (28 marks total) and are thoroughly covered."
    },
    {
      question: "How are student questions and academic doubts handled?",
      answer: "Students have access to regular scheduled faculty interactive sessions and academic forums to resolve technical questions."
    },
    {
      question: "Does the Full GATE course help with PSU written examinations?",
      answer: "Yes. Because most technical PSUs either recruit through GATE or base their standalone test syllabus directly on GATE, Full GATE builds the technical foundation for PSU recruitments."
    }
  ];

  return (
    <div className="bg-brand-offwhite">
      
      {/* Course Hero */}
      <section className="bg-navy-gradient text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="dark" size="md" className="mb-4">
              <GraduationCap className="w-3.5 h-3.5 text-gold" />
              Comprehensive Pathway
            </Badge>

            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight mb-4">
              Full GATE — <span className="text-gold">Complete Preparation. Clear Direction.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-8">
              A comprehensive, structured roadmap engineered to cover the complete discipline curriculum, develop multi-dimensional problem-solving mastery, and build examination temperament.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                to="/student-enquiry?course=full-gate"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Enquire for Full GATE
              </Button>
              <a
                href="#roadmap"
                className="px-6 py-3.5 rounded-lg border border-gold/40 text-gold hover:bg-gold/10 font-heading font-bold text-sm transition-colors"
              >
                View 6-Phase Roadmap ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Program Pillars */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Core Pillars"
          title="Methodology Built for"
          highlight="Academic Rigor."
          subtitle="Our pedagogical structure ensures zero gaps between textbook understanding and high-stakes examination execution."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-premium hover:border-gold/40 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-navy-surface/10 text-navy-royal flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-navy-deep mb-2">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Preparation Roadmap */}
      <section id="roadmap" className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="Pedagogical Journey"
            title="The 6-Phase Preparation"
            highlight="Roadmap."
            subtitle="Follow a proven, logical progression that leaves nothing to guesswork."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {roadmap.map((phase, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl p-7 bg-brand-offwhite border border-slate-200 hover:border-gold/50 transition-all duration-300 hover:bg-white hover:shadow-premium group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-gold bg-navy-deep px-3 py-1 rounded-full">
                    {phase.step}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Stage 0{idx + 1}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xl text-navy-deep group-hover:text-navy-royal transition-colors mb-2">
                  {phase.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Clarifications"
          title="Frequently Asked"
          highlight="Questions."
          subtitle="Key information regarding the Full GATE comprehensive learning program."
        />

        <Accordion items={faqs} />
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-navy-gradient text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl mb-4">
            Embark on Your Full GATE Preparation.
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto text-sm sm:text-base">
            Connect with our admissions desk to understand upcoming cohort schedules, discipline modules, and study plans.
          </p>
          <Button
            to="/student-enquiry?course=full-gate"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Submit Full GATE Enquiry
          </Button>
        </div>
      </section>

    </div>
  );
}
