import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Target, 
  ShieldCheck, 
  Compass, 
  Users, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  GraduationCap,
  Lightbulb,
  HeartHandshake,
  Layers,
  Info
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export default function AboutPage() {
  const coreValues = [
    {
      title: "Academic Excellence",
      desc: "An uncompromising commitment to depth, mathematical rigor, and theoretical precision across every discipline.",
      icon: Award
    },
    {
      title: "Integrity",
      desc: "Transparent guidance without false promises, manufactured statistics, or superficial marketing gimmicks.",
      icon: ShieldCheck
    },
    {
      title: "Consistency",
      desc: "Cultivating disciplined daily study habits, systematic revision schedules, and structured test evaluation.",
      icon: Layers
    },
    {
      title: "Innovation",
      desc: "Evolving pedagogical techniques to decompose complex engineering problems into intuitive mental models.",
      icon: Lightbulb
    },
    {
      title: "Student-Centered Learning",
      desc: "Recognizing that every learner starts from a distinct baseline and requires tailored modular pacing.",
      icon: HeartHandshake
    },
    {
      title: "Continuous Improvement",
      desc: "Iterative refinement of question banks, assessment analytics, and academic support frameworks.",
      icon: Target
    }
  ];

  const philosophyPillars = [
    {
      title: "Concept Clarity",
      desc: "Equations are derivations of natural laws, not formulas to be memorized in isolation. We ensure students understand the physical phenomena underpinning mathematical expressions."
    },
    {
      title: "Consistent Practice",
      desc: "True exam speed develops naturally from structured, deliberate practice rather than hurried last-minute problem cramming."
    },
    {
      title: "Strategic Preparation",
      desc: "Navigating competitive examinations requires smart time management, risk mitigation on negative marking, and identifying high-weightage modules."
    },
    {
      title: "Career Awareness",
      desc: "Engineering examinations are gateways to professional trajectories. We align classroom learning with public sector and research opportunities."
    },
    {
      title: "Student Development",
      desc: "Fostering psychological resilience, exam temperament, and analytical confidence that endure well beyond test day."
    }
  ];

  return (
    <div className="bg-brand-offwhite">
      
      {/* Hero Section */}
      <section className="bg-navy-gradient text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Badge variant="dark" size="md" className="mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Institutional Profile
          </Badge>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight mb-6 max-w-4xl mx-auto">
            Building Knowledge. <span className="text-gold">Inspiring Ambition.</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            At TECHZONE, we believe that meaningful preparation begins with clarity, consistency, and a strong foundation. Our goal is to support aspiring engineers as they develop the knowledge, confidence, and discipline needed to pursue competitive examinations and career opportunities.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              badge="Our Story"
              title="A Purpose-Driven"
              highlight="Educational Initiative."
              align="left"
              subtitle="Founded with a singular mission: to restore genuine conceptual rigor to engineering competitive examination preparation."
              className="mb-4"
            />

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              TECHZONE was established as an academic initiative dedicated to guiding engineering graduates through high-stakes national examinations such as GATE, the Engineering Services Examination (ESE), and PSU recruitments.
            </p>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Recognizing that students often face generic, high-pressure coaching systems that prioritize mass marketing over foundational clarity, TECHZONE was structured to provide a focused, concept-driven alternative. Our modular architecture allows learners to conquer individual subjects or undertake comprehensive preparation at their own pace.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-premium space-y-3">
              <span className="text-xs font-mono font-bold text-gold-dark uppercase tracking-wider">
                Our Mission
              </span>
              <h3 className="font-heading font-extrabold text-xl text-navy-deep">
                Accessibility & Rigor
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                "To make focused, structured, and concept-driven engineering education accessible to ambitious learners."
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-navy-deep text-white border border-navy-royal shadow-premium space-y-3">
              <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider">
                Our Vision
              </span>
              <h3 className="font-heading font-extrabold text-xl text-white">
                Empowerment & Direction
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                "To empower aspiring engineers with the knowledge, confidence, and direction needed to pursue meaningful professional opportunities."
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="Guiding Principles"
            title="Our Core"
            highlight="Values."
            subtitle="The foundational values that govern our academic curriculum, mentorship interactions, and institutional culture."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {coreValues.map((val, i) => {
              const Icon = val.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl p-7 bg-brand-offwhite border border-slate-200 hover:border-gold/50 hover:bg-white hover:shadow-premium transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-4 group-hover:bg-gold/15 group-hover:border-gold/40 transition-colors">
                    <Icon className="w-6 h-6 text-navy-royal group-hover:text-amber-700 transition-colors" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-navy-deep group-hover:text-navy-royal transition-colors mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-normal">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Educational Philosophy */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Pedagogical Standard"
          title="Our Educational"
          highlight="Philosophy."
          subtitle="How we teach, test, and mentor aspiring engineers toward mastery."
        />

        <div className="space-y-4 max-w-4xl mx-auto mt-10">
          {philosophyPillars.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-navy-surface/10 text-navy-royal font-heading font-bold text-sm flex items-center justify-center flex-shrink-0">
                0{idx + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-bold text-base text-navy-deep mb-1">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meet Our Team (Configurable Profiles / Clean Empty State) */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="Academic Leadership"
            title="Meet Our"
            highlight="Team."
            subtitle="Dedicated subject mentors and engineering educators."
          />

          {/* Academic Department Leadership Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-brand-offwhite rounded-2xl p-6 border border-slate-200 hover:border-gold/50 hover:bg-white hover:shadow-premium transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-navy-deep text-gold flex items-center justify-center font-heading font-black text-sm mb-4">
                  MATH
                </div>
                <h4 className="font-heading font-bold text-lg text-navy-deep mb-1">
                  Engineering Sciences & Aptitude
                </h4>
                <p className="text-xs text-gold-dark font-semibold mb-3">
                  Foundational Mathematics Division
                </p>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Specialized academic mentorship focusing on Advanced Linear Algebra, Calculus, Differential Equations, and General Aptitude logic common to all competitive engineering examinations.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200/60 text-[11px] font-semibold text-navy-royal">
                • Zero-Formula Memorization Approach
              </div>
            </div>

            <div className="bg-brand-offwhite rounded-2xl p-6 border border-slate-200 hover:border-gold/50 hover:bg-white hover:shadow-premium transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-navy-deep text-gold flex items-center justify-center font-heading font-black text-sm mb-4">
                  CS/IT
                </div>
                <h4 className="font-heading font-bold text-lg text-navy-deep mb-1">
                  Computer Science & Systems
                </h4>
                <p className="text-xs text-gold-dark font-semibold mb-3">
                  Algorithms & Architecture Division
                </p>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Expert guidance in Data Structures, Algorithms, Theory of Computation, Operating Systems, DBMS, and Computer Networks with an emphasis on rigorous time complexity and discrete structures.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200/60 text-[11px] font-semibold text-navy-royal">
                • Rigorous Theoretical Proofs & Coding
              </div>
            </div>

            <div className="bg-brand-offwhite rounded-2xl p-6 border border-slate-200 hover:border-gold/50 hover:bg-white hover:shadow-premium transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-navy-deep text-gold flex items-center justify-center font-heading font-black text-sm mb-4">
                  ME/CE
                </div>
                <h4 className="font-heading font-bold text-lg text-navy-deep mb-1">
                  Mechanical & Civil Systems
                </h4>
                <p className="text-xs text-gold-dark font-semibold mb-3">
                  Thermal & Structural Division
                </p>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Structured coverage of Thermodynamics, Heat Transfer, Fluid Mechanics, Strength of Materials, Structural Analysis, and Soil Mechanics bridging physical intuition with numerical precision.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200/60 text-[11px] font-semibold text-navy-royal">
                • Conventional & Objective Derivations
              </div>
            </div>

            <div className="bg-brand-offwhite rounded-2xl p-6 border border-slate-200 hover:border-gold/50 hover:bg-white hover:shadow-premium transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-navy-deep text-gold flex items-center justify-center font-heading font-black text-sm mb-4">
                  EE/EC
                </div>
                <h4 className="font-heading font-bold text-lg text-navy-deep mb-1">
                  Electrical & Electronics
                </h4>
                <p className="text-xs text-gold-dark font-semibold mb-3">
                  Circuits & Controls Division
                </p>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Targeted pedagogy in Power Systems, Electrical Machines, Control Systems, Signals and Systems, Analog/Digital Electronics, and Electromagnetic Fields with simulated exam drills.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200/60 text-[11px] font-semibold text-navy-royal">
                • Fast Circuit Solving & Accuracy
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-navy-gradient text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <Badge variant="dark" size="md">
            Begin With Confidence
          </Badge>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl leading-tight">
            Your Next Chapter <span className="text-gold">Starts Here.</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Explore our subject-wise modules, comprehensive programs, and career guidance seminars today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              to="/courses"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Our Courses
            </Button>
            <Button
              to="/student-enquiry"
              variant="outlineGold"
              size="lg"
            >
              Submit an Enquiry
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
