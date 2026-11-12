import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Send, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

export function EnquiryCtaSection() {
  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden border-t border-slate-200/80">
      
      {/* Decorative background shapes */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl bg-navy-gradient text-white p-8 sm:p-12 md:p-16 text-center shadow-2xl border border-navy-royal/40 overflow-hidden"
        >
          {/* Ambient lighting inside CTA card */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-gold/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-navy-royal/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-heading font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              Admissions & Academic Advisory
            </span>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
              Ready to Take the <span className="text-gold">Next Step?</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Tell us about your goals, and let's explore the right preparation pathway for you. Get tailored guidance on subject-wise modules, comprehensive batches, or upcoming orientation sessions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                to="/student-enquiry"
                variant="primary"
                size="lg"
                icon={<Send className="w-4 h-4" />}
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                Submit an Enquiry
              </Button>

              <Button
                to="/courses"
                variant="outlineGold"
                size="lg"
                className="w-full sm:w-auto"
              >
                Explore Courses
              </Button>
            </div>

          </div>
        </motion.div>
      </div>

    </section>
  );
}
