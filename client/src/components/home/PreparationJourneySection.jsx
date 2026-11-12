import React from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, 
  BookOpen, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { TIMELINE_STEPS } from '../../data/coursesData';

const stepIcons = [Compass, BookOpen, CheckCircle, ShieldCheck, Sparkles];

export function PreparationJourneySection() {
  return (
    <section className="py-20 sm:py-28 bg-brand-offwhite relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading
          badge="Structured Methodology"
          title="Your Journey to"
          highlight="Excellence."
          subtitle="A systematic, five-stage preparation progression designed to take ambitious engineering students from foundational clarity to high-stakes examination readiness."
        />

        {/* Desktop Horizontal Timeline (visible on lg+) */}
        <div className="hidden lg:block relative mt-12 mb-8">
          
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-navy-royal/20 via-gold/50 to-navy-royal/20 -translate-y-12 z-0" />

          <div className="grid grid-cols-5 gap-4 relative z-10">
            {TIMELINE_STEPS.map((step, idx) => {
              const Icon = stepIcons[idx] || Sparkles;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="flex flex-col items-center text-center px-2 group"
                >
                  {/* Step Number & Node Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-200 group-hover:border-gold shadow-md flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-gold-glow">
                    <Icon className="w-7 h-7 text-navy-deep group-hover:text-amber-700 transition-colors" />
                  </div>

                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-gold px-2.5 py-0.5 rounded-full bg-navy-deep mb-2">
                    {step.number}
                  </span>

                  <h3 className="font-heading font-bold text-base text-navy-deep mb-2 group-hover:text-navy-royal transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-brand-muted leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Mobile Vertical Timeline (visible on mobile and tablet) */}
        <div className="lg:hidden space-y-6 relative pl-6 border-l-2 border-gold/40 ml-4 sm:ml-6 mt-8">
          {TIMELINE_STEPS.map((step, idx) => {
            const Icon = stepIcons[idx] || Sparkles;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative pl-6 pb-2"
              >
                {/* Node on vertical line */}
                <div className="absolute -left-[35px] top-0 w-8 h-8 rounded-full bg-navy-deep border-2 border-gold text-gold flex items-center justify-center font-mono text-xs font-bold shadow-sm">
                  {step.number}
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon className="w-4 h-4 text-amber-600" />
                    <h3 className="font-heading font-bold text-base text-navy-deep">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
