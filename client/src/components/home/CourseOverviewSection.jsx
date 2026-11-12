import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Target, 
  GraduationCap, 
  Award, 
  Building2, 
  ArrowRight, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { COURSES } from '../../data/coursesData';

const iconMap = {
  Target,
  GraduationCap,
  Award,
  Building2
};

export function CourseOverviewSection() {
  const cardAccents = [
    {
      borderHover: "hover:border-amber-400/60",
      iconBg: "bg-amber-500/10 text-amber-600",
      badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
      ctaText: "Explore Mini GATE",
      gradient: "from-amber-500/5 to-transparent"
    },
    {
      borderHover: "hover:border-blue-400/60",
      iconBg: "bg-blue-500/10 text-blue-600",
      badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
      ctaText: "Explore Full GATE",
      gradient: "from-blue-500/5 to-transparent"
    },
    {
      borderHover: "hover:border-emerald-400/60",
      iconBg: "bg-emerald-500/10 text-emerald-600",
      badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      ctaText: "Explore ESE",
      gradient: "from-emerald-500/5 to-transparent"
    },
    {
      borderHover: "hover:border-indigo-400/60",
      iconBg: "bg-indigo-500/10 text-indigo-600",
      badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
      ctaText: "Explore PSU Preparation",
      gradient: "from-indigo-500/5 to-transparent"
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-brand-offwhite relative overflow-hidden">
      
      {/* Background Accent */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading
          badge="Educational Programs"
          title="Find the Right Path for Your"
          highlight="Ambition."
          subtitle="Purpose-built preparation programs designed to help aspiring engineers move forward with confidence."
        />

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {COURSES.map((course, index) => {
            const Icon = iconMap[course.icon] || Target;
            const accent = cardAccents[index] || cardAccents[0];

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/80 p-6 sm:p-7 shadow-premium transition-all duration-300 hover:shadow-premium-lg hover:-translate-y-1.5 ${accent.borderHover} group`}
              >
                {/* Subtle top gradient inside card */}
                <div className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${accent.gradient} rounded-t-2xl pointer-events-none`} />

                <div className="relative z-10 space-y-4">
                  {/* Card Header: Icon & Category Tag */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl ${accent.iconBg} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${accent.badgeBg}`}>
                      {course.tag}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="font-heading font-extrabold text-xl text-navy-deep group-hover:text-navy-royal transition-colors">
                      {course.title.split('—')[0].trim()}
                    </h3>
                    <p className="text-xs font-semibold text-brand-muted mt-0.5">
                      {course.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {course.description}
                  </p>

                  {/* Key Highlights list */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    {course.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="relative z-10 pt-6 mt-4 border-t border-slate-100">
                  <Link
                    to={`/courses/${course.slug}`}
                    className="inline-flex items-center justify-between w-full py-2.5 px-4 rounded-xl bg-brand-bluegray/70 text-navy-deep font-heading font-bold text-xs hover:bg-navy-deep hover:text-white transition-all duration-300 group-hover:bg-navy-deep group-hover:text-white"
                  >
                    <span>{accent.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Programs Link */}
        <div className="mt-12 text-center">
          <Button
            to="/courses"
            variant="outline"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Explore Complete Course Catalogue
          </Button>
        </div>

      </div>
    </section>
  );
}
