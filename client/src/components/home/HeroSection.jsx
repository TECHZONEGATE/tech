import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  ChevronDown, 
  BookOpen, 
  Award, 
  GraduationCap, 
  Cpu, 
  Binary, 
  Layers,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../common/Button';

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="relative min-h-[90vh] bg-navy-gradient text-white overflow-hidden flex items-center pt-8 pb-20">
      
      {/* Background Decorative Grid and Subtle Accents */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-navy-royal/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Engineering Elements (circuit motifs, formulas, symbols) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        
        {/* Floating formula badge 1 */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[15%] hidden lg:flex items-center gap-2.5 px-4 py-2 rounded-xl bg-navy-surface/80 border border-gold/30 backdrop-blur-md shadow-xl text-xs font-mono text-gold-soft"
        >
          <Cpu className="w-4 h-4 text-gold" />
          <span>{"∇ × E = -∂B/∂t"}</span>
        </motion.div>

        {/* Floating formula badge 2 */}
        <motion.div
          animate={{ y: [0, 14, 0], rotate: [0, -1, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-32 left-[8%] hidden lg:flex items-center gap-2.5 px-4 py-2 rounded-xl bg-navy-surface/80 border border-navy-royal/50 backdrop-blur-md shadow-xl text-xs font-mono text-blue-200"
        >
          <Binary className="w-4 h-4 text-navy-royal" />
          <span>{"O(n log n) • Time Complexity"}</span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading and CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Institute Tag Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Premier Engineering Examination Academy</span>
            </motion.div>

            {/* Main Hero Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.12]"
            >
              Your Ambition Deserves the{' '}
              <span className="relative inline-block text-gold">
                Right Direction.
                <span className="absolute left-0 bottom-1 w-full h-1 bg-gradient-to-r from-gold to-gold-soft opacity-70 rounded-full" />
              </span>
            </motion.h1>

            {/* Supporting Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal"
            >
              Unlock your potential with focused preparation for GATE, ESE, and PSU examinations. Strengthen your concepts, sharpen your skills, and move confidently towards your engineering career.
            </motion.p>

            {/* Key Value Points */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-slate-200"
            >
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Concept-Driven Rigor</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Subject-Wise Precision</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Structured Roadmaps</span>
              </div>
            </motion.div>

            {/* Primary & Secondary Call to Actions */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <Button
                to="/courses"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                Explore Our Courses
              </Button>

              <Button
                to="/student-enquiry"
                variant="outlineGold"
                size="lg"
                className="w-full sm:w-auto"
              >
                Enquire Now
              </Button>
            </motion.div>

          </motion.div>

          {/* Right Column: Sophisticated Academic Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-gold/30 via-navy-royal/40 to-gold/10 rounded-3xl blur-xl opacity-75" />
              
              {/* Main Visual Glass Card */}
              <div className="relative rounded-3xl bg-navy-surface/90 border border-gold/25 p-6 sm:p-8 shadow-2xl backdrop-blur-xl overflow-hidden">
                
                {/* Decorative Technical Header */}
                <div className="flex items-center justify-between pb-6 border-b border-navy-royal/30">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-navy-royal" />
                  </div>
                  <span className="text-xs font-mono text-gold uppercase tracking-wider font-semibold">
                    TECHZONE Academic Portal
                  </span>
                </div>

                {/* Academic Highlights Dashboard Preview */}
                <div className="space-y-4 py-6">
                  
                  <div className="p-4 rounded-2xl bg-navy-deep/80 border border-navy-royal/40 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gold/15 text-gold border border-gold/30 flex-shrink-0">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-white text-sm">
                        Competitive Focus
                      </h2>
                      <p className="text-xs text-slate-300 mt-0.5">
                        GATE, ESE & Technical PSU Examination Syllabi
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-navy-deep/80 border border-navy-royal/40 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30 flex-shrink-0">
                      <Layers className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-white text-sm">
                        Modular Architecture
                      </h2>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Subject-Wise Mini GATE & Full-Length Programs
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-navy-deep/80 border border-navy-royal/40 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex-shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-white text-sm">
                        Career Orientation
                      </h2>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Guiding Engineering Aspirants Toward Clarity
                      </p>
                    </div>
                  </div>

                </div>

                {/* Bottom Quick Action Card */}
                <div className="pt-2">
                  <Link
                    to="/student-enquiry"
                    className="block w-full text-center py-3 px-4 rounded-xl bg-gold-gradient text-navy-deep font-heading font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity"
                  >
                    Start Your Preparation Journey
                  </Link>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 text-slate-400 text-xs select-none">
        <span>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4 text-gold" />
        </motion.div>
      </div>

    </section>
  );
}
