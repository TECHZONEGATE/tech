import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Calendar, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Sparkles,
  Users,
  Award
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export function SeminarPreviewSection() {
  return (
    <section className="py-20 sm:py-28 bg-navy-gradient text-white relative overflow-hidden border-t border-navy-royal/30">
      
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-navy-royal/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <Badge variant="dark" size="md">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              Flagship Orientation Initiative
            </Badge>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
              Discover Your Direction.{' '}
              <span className="text-gold">Define Your Future.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Explore engineering career pathways, understand competitive examination opportunities, and gain clarity about the next steps in your professional journey.
            </p>

            {/* Seminar Takeaway Highlights */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-gold/20 text-gold flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-sm text-slate-200">
                  Unbiased comparison between GATE, ESE, State PSCs, and standalone PSU recruitments.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-gold/20 text-gold flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-sm text-slate-200">
                  Year-wise syllabus distribution, high-weightage subject selection, and realistic timelines.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-gold/20 text-gold flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-sm text-slate-200">
                  Direct interactive Q&A addressing career dilemmas for engineering undergraduates.
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Button
                to="/career-orientation-seminar"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                Explore Career Orientation Seminar
              </Button>

              <Button
                to="/student-enquiry"
                variant="outlineGold"
                size="lg"
                className="w-full sm:w-auto"
              >
                Register Interest
              </Button>
            </div>
          </motion.div>

          {/* Right Preview Card Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl bg-navy-surface/80 border border-gold/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-navy-royal/40">
                <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider">
                  Session Briefing
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Complimentary Orientation
                </span>
              </div>

              <div>
                <h3 className="font-heading font-bold text-xl text-white">
                  Engineering Opportunities 2026
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Navigating GATE, ESE & Technical PSU Career Pathways
                </p>
              </div>

              <div className="space-y-3 bg-navy-deep/80 p-4 rounded-2xl border border-navy-royal/30 text-xs sm:text-sm">
                <div className="flex items-center gap-3 text-slate-300">
                  <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>Upcoming Schedule (Announced Regularly)</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>Weekend Interactive Morning Session</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Users className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>Open to 2nd, 3rd, 4th Year & Graduates</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/career-orientation-seminar"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gold text-navy-deep font-heading font-bold text-xs uppercase tracking-wider hover:bg-gold-soft transition-colors"
                >
                  <span>View Seminar Schedule & Register</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
