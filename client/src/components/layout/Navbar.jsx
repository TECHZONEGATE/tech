import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  Award, 
  Building2, 
  ArrowRight,
  Send
} from 'lucide-react';
import { Button } from '../common/Button';
import { cn } from '../../lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll listener for sticky styles
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setCoursesDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const courseMenuItems = [
    {
      title: "Mini GATE",
      tag: "Subject-Wise Focus",
      path: "/courses/mini-gate",
      description: "Strengthen individual topics with focused, concept-driven preparation.",
      icon: BookOpen,
      iconColor: "text-amber-500 bg-amber-500/10"
    },
    {
      title: "Full GATE",
      tag: "Comprehensive Pathway",
      path: "/courses/full-gate",
      description: "End-to-end curriculum covering syllabus, revision, and mock tests.",
      icon: GraduationCap,
      iconColor: "text-blue-500 bg-blue-500/10"
    },
    {
      title: "ESE",
      tag: "Engineering Services",
      path: "/courses/ese",
      description: "Strategic preparation for UPSC Stage-I Prelims & Stage-II Mains.",
      icon: Award,
      iconColor: "text-emerald-500 bg-emerald-500/10"
    },
    {
      title: "PSUs",
      tag: "Public Sector Careers",
      path: "/courses/psu",
      description: "Technical subject readiness for Maharatna & PSU examinations.",
      icon: Building2,
      iconColor: "text-indigo-500 bg-indigo-500/10"
    }
  ];

  const isCoursesActive = location.pathname.startsWith('/courses');

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full transition-all duration-300",
      isScrolled 
        ? "bg-navy-deep/95 backdrop-blur-md shadow-lg border-b border-navy-royal/30 py-3" 
        : "bg-navy-deep border-b border-navy-royal/20 py-4"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-[#b58334] p-0.5 shadow-gold-glow flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-navy-deep rounded-[10px] flex items-center justify-center">
                <span className="font-heading font-extrabold text-gold text-xl tracking-tighter">
                  TZ
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black text-xl sm:text-2xl text-white tracking-tight">
                  TECH<span className="text-gold">ZONE</span>
                </span>
              </div>
              <p className="text-[10px] uppercase font-semibold text-slate-300 tracking-widest hidden sm:block">
                Learn • Prepare • Succeed
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links (EXACT SPECIFIED ORDER) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* 1. Home */}
            <NavLink
              to="/"
              end
              className={({ isActive }) => cn(
                "px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
                isActive 
                  ? "text-gold bg-white/5" 
                  : "text-slate-200 hover:text-white hover:bg-white/5"
              )}
            >
              Home
            </NavLink>

            {/* 2. Courses Offered with Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setCoursesDropdownOpen(true)}
              onMouseLeave={() => setCoursesDropdownOpen(false)}
            >
              <NavLink
                to="/courses"
                className={({ isActive }) => cn(
                  "px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-1.5",
                  isCoursesActive 
                    ? "text-gold bg-white/5" 
                    : "text-slate-200 hover:text-white hover:bg-white/5"
                )}
              >
                <span>Courses Offered</span>
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  coursesDropdownOpen && "rotate-180 text-gold"
                )} />
              </NavLink>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {coursesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-1 w-80 sm:w-96 rounded-2xl bg-navy-deep/98 border border-navy-royal/40 shadow-2xl p-3 z-50 backdrop-blur-xl"
                  >
                    <div className="p-2 border-b border-navy-royal/30 mb-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-gold">
                          Preparation Programs
                        </span>
                        <Link 
                          to="/courses" 
                          className="text-xs font-semibold text-slate-300 hover:text-gold flex items-center gap-1"
                        >
                          View All <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>

                    <div className="space-y-1">
                      {courseMenuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                              "flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 group",
                              isActive ? "bg-navy-surface text-gold" : "hover:bg-navy-surface/60"
                            )}
                          >
                            <div className={cn("p-2 rounded-lg flex-shrink-0 mt-0.5", item.iconColor)}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-heading font-bold text-sm text-white group-hover:text-gold transition-colors">
                                  {item.title}
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium bg-navy-deep px-2 py-0.5 rounded border border-navy-royal/20">
                                  {item.tag}
                                </span>
                              </div>
                              <p className="text-xs text-slate-300 line-clamp-1 mt-0.5 font-normal">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Career Orientation Seminar */}
            <NavLink
              to="/career-orientation-seminar"
              className={({ isActive }) => cn(
                "px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
                isActive 
                  ? "text-gold bg-white/5" 
                  : "text-slate-200 hover:text-white hover:bg-white/5"
              )}
            >
              Career Orientation Seminar
            </NavLink>

            {/* 4. Student Enquiry Form */}
            <NavLink
              to="/student-enquiry"
              className={({ isActive }) => cn(
                "px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
                isActive 
                  ? "text-gold bg-white/5" 
                  : "text-slate-200 hover:text-white hover:bg-white/5"
              )}
            >
              Student Enquiry
            </NavLink>

            {/* 5. Contact Us */}
            <NavLink
              to="/contact"
              className={({ isActive }) => cn(
                "px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
                isActive 
                  ? "text-gold bg-white/5" 
                  : "text-slate-200 hover:text-white hover:bg-white/5"
              )}
            >
              Contact Us
            </NavLink>

            {/* 6. About Us (MUST APPEAR AFTER CONTACT US) */}
            <NavLink
              to="/about"
              className={({ isActive }) => cn(
                "px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
                isActive 
                  ? "text-gold bg-white/5" 
                  : "text-slate-200 hover:text-white hover:bg-white/5"
              )}
            >
              About Us
            </NavLink>

          </nav>

          {/* Far Right CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              to="/student-enquiry"
              variant="primary"
              size="sm"
              icon={<Send className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              Enquire Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Button
              to="/student-enquiry"
              variant="primary"
              size="sm"
              className="px-3 py-1.5 text-xs"
            >
              Enquire
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-gold" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-navy-deep/98 border-b border-navy-royal/40 backdrop-blur-xl px-4 pt-3 pb-6 overflow-hidden"
          >
            <div className="flex flex-col space-y-1">
              
              {/* 1. Home */}
              <NavLink
                to="/"
                end
                className={({ isActive }) => cn(
                  "px-4 py-2.5 rounded-lg text-base font-semibold transition-colors",
                  isActive ? "text-gold bg-white/10" : "text-slate-200 hover:text-white hover:bg-white/5"
                )}
              >
                Home
              </NavLink>

              {/* 2. Courses Offered Header & Sublinks */}
              <div className="pt-2 pb-1 px-4">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gold mb-2">
                  <span>Courses Offered</span>
                  <Link to="/courses" className="text-slate-300 underline font-normal text-xs">
                    View Overview
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-2 pl-2">
                  <Link
                    to="/courses/mini-gate"
                    className="p-2 rounded-lg bg-navy-surface/50 text-xs font-medium text-slate-200 hover:text-gold border border-navy-royal/20"
                  >
                    Mini GATE
                  </Link>
                  <Link
                    to="/courses/full-gate"
                    className="p-2 rounded-lg bg-navy-surface/50 text-xs font-medium text-slate-200 hover:text-gold border border-navy-royal/20"
                  >
                    Full GATE
                  </Link>
                  <Link
                    to="/courses/ese"
                    className="p-2 rounded-lg bg-navy-surface/50 text-xs font-medium text-slate-200 hover:text-gold border border-navy-royal/20"
                  >
                    ESE
                  </Link>
                  <Link
                    to="/courses/psu"
                    className="p-2 rounded-lg bg-navy-surface/50 text-xs font-medium text-slate-200 hover:text-gold border border-navy-royal/20"
                  >
                    PSUs
                  </Link>
                </div>
              </div>

              {/* 3. Career Orientation Seminar */}
              <NavLink
                to="/career-orientation-seminar"
                className={({ isActive }) => cn(
                  "px-4 py-2.5 rounded-lg text-base font-semibold transition-colors",
                  isActive ? "text-gold bg-white/10" : "text-slate-200 hover:text-white hover:bg-white/5"
                )}
              >
                Career Orientation Seminar
              </NavLink>

              {/* 4. Student Enquiry Form */}
              <NavLink
                to="/student-enquiry"
                className={({ isActive }) => cn(
                  "px-4 py-2.5 rounded-lg text-base font-semibold transition-colors",
                  isActive ? "text-gold bg-white/10" : "text-slate-200 hover:text-white hover:bg-white/5"
                )}
              >
                Student Enquiry Form
              </NavLink>

              {/* 5. Contact Us */}
              <NavLink
                to="/contact"
                className={({ isActive }) => cn(
                  "px-4 py-2.5 rounded-lg text-base font-semibold transition-colors",
                  isActive ? "text-gold bg-white/10" : "text-slate-200 hover:text-white hover:bg-white/5"
                )}
              >
                Contact Us
              </NavLink>

              {/* 6. About Us (AFTER CONTACT US) */}
              <NavLink
                to="/about"
                className={({ isActive }) => cn(
                  "px-4 py-2.5 rounded-lg text-base font-semibold transition-colors",
                  isActive ? "text-gold bg-white/10" : "text-slate-200 hover:text-white hover:bg-white/5"
                )}
              >
                About Us
              </NavLink>

              <div className="pt-4 px-2">
                <Button
                  to="/student-enquiry"
                  variant="primary"
                  className="w-full justify-center"
                >
                  Submit an Enquiry
                </Button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
