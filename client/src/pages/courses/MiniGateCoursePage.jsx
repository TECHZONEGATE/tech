import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  HelpCircle, 
  Sparkles,
  Info,
  ChevronRight
} from 'lucide-react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Accordion } from '../../components/common/Accordion';
import { BRANCHES_DATA } from '../../data/coursesData';

export default function MiniGateCoursePage() {
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES_DATA[0].id);

  const activeBranchData = BRANCHES_DATA.find(b => b.id === selectedBranch) || BRANCHES_DATA[0];

  const benefits = [
    {
      title: "Precision Without Burden",
      desc: "Enroll strictly for the subjects you need to reinforce, without the cognitive overhead or financial cost of unneeded modules."
    },
    {
      title: "Deep Conceptual Immersion",
      desc: "Spend dedicated time drilling down into foundational theories, derivation proofs, and intricate boundary conditions."
    },
    {
      title: "Flexible Academic Schedule",
      desc: "Synchronize your subject preparation with your college semester syllabus or personal self-study pacing."
    },
    {
      title: "Subject-Specific Testing",
      desc: "Validate mastery with dedicated topic quizzes and full-length subject test simulations reflecting GATE difficulty."
    }
  ];

  const whoFor = [
    "Aspirants who scored adequately in most subjects but missed cutoff marks due to specific weak topics.",
    "2nd and 3rd-year engineering students wanting to align university subjects with GATE standards.",
    "Self-study students who prefer studying standard textbooks but require academic guidance on intricate modules.",
    "Working professionals with constrained study hours needing high-yield modular focus."
  ];

  const faqs = [
    {
      question: "Can I enroll in multiple subjects simultaneously in Mini GATE?",
      answer: "Yes. You have complete flexibility to configure your preparation bundle with one, two, or multiple subjects according to your individual requirements."
    },
    {
      question: "Are tests and doubt-clearing sessions included in Mini GATE?",
      answer: "Every subject module includes topic-wise practice assignments, previous 25-year question analysis, full subject mock evaluation, and academic doubt resolution."
    },
    {
      question: "Are the syllabus and subjects confirmed for all branches?",
      answer: "Yes, our subject modules systematically cover the standard GATE curriculum across Computer Science, Mechanical, Civil, Electrical, and Electronics engineering. You can select specific subjects based on your preparation timeline."
    },
    {
      question: "How do I switch to Full GATE if I decide to cover the entire syllabus later?",
      answer: "You can consult the admissions desk at any stage to transition from modular subject preparation into the comprehensive Full GATE pathway with credit adjustment."
    }
  ];

  return (
    <div className="bg-brand-offwhite">
      
      {/* Course Hero */}
      <section className="bg-navy-gradient text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge variant="dark" size="md" className="mb-4">
              <Target className="w-3.5 h-3.5 text-gold" />
              Modular Subject-Wise Pathway
            </Badge>

            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight mb-4">
              Mini GATE — <span className="text-gold">Master One Subject at a Time.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-8">
              Focused subject-wise preparation designed to strengthen individual topics, dismantle conceptual bottlenecks, and elevate your overall GATE score with surgical precision.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                to={`/student-enquiry?course=mini-gate`}
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Enquire for Mini GATE
              </Button>
              <a
                href="#subjects-catalogue"
                className="px-6 py-3.5 rounded-lg border border-gold/40 text-gold hover:bg-gold/10 font-heading font-bold text-sm transition-colors"
              >
                Browse Subject Catalogue ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview & Who this is for */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy-deep">
              Program Philosophy & Approach
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Many engineering aspirants fall short of competitive GATE cutoffs not because of an overall lack of intelligence or discipline, but due to 2 or 3 high-weightage subjects where conceptual roots remain fragile.
            </p>
            <p className="text-slate-600 leading-relaxed text-base">
              The <strong>Mini GATE Subject-Wise Program</strong> was designed specifically to eliminate this pain point. Instead of forcing students into rigid year-long batches covering material they may already know, it allows focused modular deep dives into challenging technical domains.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <div key={i} className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <h3 className="font-heading font-bold text-navy-deep text-base mb-1">
                    {b.title}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-navy-surface text-white p-7 sm:p-8 rounded-3xl border border-navy-royal shadow-xl">
            <h3 className="font-heading font-bold text-xl text-white mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-gold" />
              Who This Course Is For
            </h3>
            <ul className="space-y-4">
              {whoFor.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-navy-royal/50">
              <Button
                to="/student-enquiry?course=mini-gate"
                variant="primary"
                className="w-full justify-center"
              >
                Select Your Target Subjects
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* Configurable Subject Selection Catalogue */}
      <section id="subjects-catalogue" className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="Engineering Disciplines"
            title="Modular Subject"
            highlight="Catalogue."
            subtitle="Explore subject modules available across core engineering disciplines. Select your engineering branch below to view offered modules."
          />

          {/* Program Advantage Banner */}
          <div className="mb-8 p-4 rounded-2xl bg-navy-deep text-white text-xs sm:text-sm flex items-start gap-3 max-w-3xl mx-auto border border-navy-royal/50 shadow-md">
            <Sparkles className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-gold font-heading">Modular Learning Advantage:</strong> Select individual subjects to resolve specific conceptual bottlenecks or bundle complementary modules. Every subject includes in-depth theoretical lectures, 25-year question analysis, and evaluated topic assessments.
            </div>
          </div>

          {/* Branch Selector Tabs */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10">
            {BRANCHES_DATA.map(branch => (
              <button
                key={branch.id}
                onClick={() => setSelectedBranch(branch.id)}
                className={`px-4 py-2 rounded-xl font-heading text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedBranch === branch.id
                    ? 'bg-navy-deep text-gold shadow-md border border-navy-royal'
                    : 'bg-brand-offwhite text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {branch.name}
              </button>
            ))}
          </div>

          {/* Subject Cards for Active Branch */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {activeBranchData.subjects.map((sub, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-brand-offwhite border border-slate-200 hover:border-gold/50 hover:bg-white hover:shadow-premium transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono text-gold-dark font-bold">
                      Module 0{i + 1}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                      GATE Syllabus
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-base text-navy-deep group-hover:text-navy-royal transition-colors mb-2">
                    {sub}
                  </h4>
                  <p className="text-xs text-brand-muted font-normal">
                    Includes theory lectures, past questions deconstruction, and topic-level assessments.
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <Link
                    to={`/student-enquiry?course=mini-gate&branch=${encodeURIComponent(activeBranchData.name)}&subject=${encodeURIComponent(sub)}`}
                    className="text-xs font-heading font-bold text-navy-royal hover:text-gold flex items-center gap-1 transition-colors"
                  >
                    <span>Enquire This Subject</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Clarifications"
          title="Frequently Asked"
          highlight="Questions."
          subtitle="Everything you need to know about the Mini GATE subject-wise preparation model."
        />

        <Accordion items={faqs} />
      </section>

      {/* Enquiry CTA Section */}
      <section className="py-16 bg-navy-gradient text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl mb-4">
            Strengthen Your Specific Weak Subjects Today.
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto text-sm sm:text-base">
            Tell us which subject modules you want to conquer and let our academic advisors assist you in structuring a modular plan.
          </p>
          <Button
            to="/student-enquiry?course=mini-gate"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Submit Mini GATE Enquiry
          </Button>
        </div>
      </section>

    </div>
  );
}
