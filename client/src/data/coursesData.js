export const BRANCHES_DATA = [
  {
    id: "cs",
    name: "Computer Science & IT (CS/IT)",
    subjects: [
      "Data Structures & Algorithms",
      "Computer Networks",
      "Operating Systems",
      "Database Management Systems (DBMS)",
      "Theory of Computation & Compiler Design",
      "Computer Organization & Architecture (COA)",
      "Digital Logic Design",
      "Discrete Mathematics & Engineering Mathematics"
    ]
  },
  {
    id: "me",
    name: "Mechanical Engineering (ME)",
    subjects: [
      "Thermodynamics & Heat Transfer",
      "Fluid Mechanics & Hydraulic Machines",
      "Strength of Materials (SOM)",
      "Theory of Machines & Mechanical Vibrations",
      "Manufacturing Science & Technology",
      "Machine Design",
      "Industrial Engineering & Operations Research",
      "Engineering Mathematics"
    ]
  },
  {
    id: "ce",
    name: "Civil Engineering (CE)",
    subjects: [
      "Structural Analysis & Mechanics",
      "Geotechnical Engineering & Soil Mechanics",
      "Environmental Engineering & Water Resources",
      "Fluid Mechanics & Open Channel Flow",
      "Transportation Engineering & Highway Design",
      "Surveying & Construction Materials",
      "Reinforced Cement Concrete (RCC) & Steel Design",
      "Engineering Mathematics"
    ]
  },
  {
    id: "ee",
    name: "Electrical Engineering (EE)",
    subjects: [
      "Power Systems & Fault Analysis",
      "Electrical Machines (AC & DC)",
      "Control Systems",
      "Power Electronics & Drives",
      "Electric Circuits & Network Theory",
      "Signals and Systems",
      "Analog & Digital Electronics",
      "Electromagnetic Fields & Engineering Mathematics"
    ]
  },
  {
    id: "ec",
    name: "Electronics & Communication (EC)",
    subjects: [
      "Communication Systems (Analog & Digital)",
      "Signals and Systems",
      "Electromagnetics & Transmission Lines",
      "Electronic Devices & Circuits (EDC)",
      "Analog Circuits & Linear ICs",
      "Control Systems",
      "Digital Circuits & Microprocessors",
      "Engineering Mathematics"
    ]
  }
];

export const COURSES = [
  {
    id: "mini-gate",
    slug: "mini-gate",
    title: "Mini GATE — Subject Wise",
    subtitle: "Targeted Mastery for Specific Subjects",
    tag: "Subject-Wise Focus",
    category: "GATE",
    badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    description: "Strengthen your understanding of individual subjects through focused, concept-driven GATE preparation.",
    heroLead: "Master one subject at a time with uncompromising depth. Tailored for engineers wanting to reinforce specific high-yield subjects or adapt university coursework to rigorous competitive exam standards.",
    icon: "Target",
    features: [
      "Subject-specific conceptual modules",
      "Previous 25 years' GATE question classification",
      "Topic-wise quizzes & full subject mock evaluation",
      "Dedicated doubt-resolution forums",
      "Modular enrolment flexibility"
    ],
    highlights: [
      { label: "Format", value: "Modular / Subject-Wise" },
      { label: "Focus", value: "Conceptual Depth & High-Weightage Modules" },
      { label: "Target Audience", value: "Pre-final, Final Year & Droppers" },
      { label: "Branches Offered", value: "5 Core Engineering Disciplines" }
    ],
    comparisonPoints: {
      depth: "Specialized Depth per Subject",
      coverage: "Selected Modules as per student choice",
      testing: "Subject-Level & Topic-Wise Tests",
      bestFor: "Students targeting specific weak subjects or high-yield topics"
    }
  },
  {
    id: "full-gate",
    slug: "full-gate",
    title: "Full GATE — Comprehensive",
    subtitle: "Systematic End-to-End Preparation",
    tag: "Comprehensive Pathway",
    category: "GATE",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    description: "Prepare systematically for GATE with a structured approach covering fundamental concepts, problem-solving, practice, and revision.",
    heroLead: "A complete, holistic preparation journey designed to build unshakable conceptual fundamentals, multi-dimensional problem-solving acumen, and proven exam temperament.",
    icon: "GraduationCap",
    features: [
      "Exhaustive syllabus coverage across all core modules",
      "Integrated Engineering Mathematics & General Aptitude",
      "Structured 6-phase learning & revision roadmap",
      "National-level simulated mock test series",
      "Comprehensive performance analytics and error tracking"
    ],
    highlights: [
      { label: "Format", value: "Comprehensive Full-Length Program" },
      { label: "Focus", value: "Complete Syllabus & Exam Temperament" },
      { label: "Target Audience", value: "Serious GATE & PSU Aspirants" },
      { label: "Mock Tests", value: "Full-Length Simulated Test Series" }
    ],
    comparisonPoints: {
      depth: "Holistic Comprehensive Depth",
      coverage: "Complete Discipline Syllabus + Aptitude + Maths",
      testing: "Topic, Subject & Full-Syllabus Mock Series",
      bestFor: "Aspirants targeting top AIR percentiles and premier IITs/IISc"
    }
  },
  {
    id: "ese",
    slug: "ese",
    title: "ESE — Engineering Services",
    subtitle: "UPSC Stage-I & Stage-II Preparation",
    tag: "UPSC Engineering Services",
    category: "ESE",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    description: "Build the technical understanding and examination strategy required for focused Engineering Services Examination preparation.",
    heroLead: "Rigorous preparation for India's prestigious Union Public Service Commission (UPSC) Engineering Services Examination, balancing Stage-I objective speed and Stage-II conventional descriptive precision.",
    icon: "Award",
    features: [
      "Synchronous Stage-I Prelims & Stage-II Mains coverage",
      "Conventional derivation practices & schematic drafting",
      "Paper-I General Studies & Engineering Aptitude modules",
      "Detailed examiner evaluations for subjective answers",
      "Ethics, standards, and project management guidance"
    ],
    highlights: [
      { label: "Format", value: "Prelims Objective + Mains Conventional" },
      { label: "Focus", value: "UPSC Technical Cadre Leadership" },
      { label: "Target Audience", value: "Aspirants targeting Class-1 Gazetted Posts" },
      { label: "Branches", value: "CE, ME, EE, E&T" }
    ],
    comparisonPoints: {
      depth: "Broad & Conventional Analytical Depth",
      coverage: "Technical Core + General Studies & Engineering Aptitude",
      testing: "Objective Stage-I + Hand-Evaluated Mains Papers",
      bestFor: "Engineers targeting government leadership and civil technical officer roles"
    }
  },
  {
    id: "psu",
    slug: "psu",
    title: "PSUs — Public Sector Preparation",
    subtitle: "Gateway to Premier Maharatnas & Navratnas",
    tag: "Public Sector Opportunities",
    category: "PSU",
    badgeColor: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
    description: "Develop the technical knowledge and preparation strategy needed for relevant PSU recruitment examinations.",
    heroLead: "Strategic preparation designed for competitive recruitment across Maharatnas, Navratnas, and independent government engineering bodies (ISRO, BARC, BEL, ONGC, IOCL, NTPC).",
    icon: "Building2",
    features: [
      "High-speed accuracy drills for independent written exams",
      "Focused coverage of high-frequency technical questions",
      "Mock tests calibrated for ISRO, BARC, and Maharatna patterns",
      "Technical interview preparation and project articulation",
      "Career awareness of recruitment schedules and eligibility"
    ],
    highlights: [
      { label: "Format", value: "GATE PSU Conversion & Standalone Tests" },
      { label: "Focus", value: "Speed, Accuracy & Technical Interviews" },
      { label: "Target Audience", value: "Engineers seeking Public Sector Careers" },
      { label: "Recruitment Types", value: "GATE-Based & Independent Exams" }
    ],
    comparisonPoints: {
      depth: "Core Technical & Speed Precision",
      coverage: "Core Subjects + Exam-Specific General Awareness",
      testing: "Speed-Oriented CBT Mocks & Interview Panels",
      bestFor: "Engineers targeting high-security public sector engineering positions"
    }
  }
];

export const WHY_CHOOSE_ITEMS = [
  {
    icon: "Brain",
    title: "Concept-Focused Learning",
    description: "Zero superficial shortcuts. We build every theoretical construct from foundational physics and mathematics up to complex examination applications."
  },
  {
    icon: "Layers",
    title: "Structured Preparation",
    description: "A meticulously mapped pedagogical progression ensuring syllabus completion, timed revisions, and simulated mock assessments."
  },
  {
    icon: "Target",
    title: "Subject-Wise Approach",
    description: "Modular learning allows engineers to allocate focused effort where it matters most, resolving targeted conceptual bottlenecks."
  },
  {
    icon: "Repeat",
    title: "Consistent Practice",
    description: "Multi-tier problem banks categorized by cognitive complexity, conceptual intersections, and negative-marking risks."
  },
  {
    icon: "Compass",
    title: "Exam-Oriented Guidance",
    description: "Unvarnished, data-driven analysis of recent examination patterns, question weightages, and strategic time-budgeting tactics."
  },
  {
    icon: "TrendingUp",
    title: "Career-Focused Learning",
    description: "Beyond test scores: connecting technical education to real-world applications across PSUs, higher research, and engineering leadership."
  }
];

export const TIMELINE_STEPS = [
  {
    number: "01",
    title: "Choose Your Goal",
    desc: "Evaluate your strengths, professional aspirations, and target examinations with academic mentors."
  },
  {
    number: "02",
    title: "Build Your Fundamentals",
    desc: "Establish rock-solid conceptual clarity through structured modules and fundamental derivation mastery."
  },
  {
    number: "03",
    title: "Practice and Improve",
    desc: "Solve standard, multi-concept, and past examination problems to hone analytical speed and accuracy."
  },
  {
    number: "04",
    title: "Prepare With Confidence",
    desc: "Undergo simulated mock test environments with rigorous error diagnosis and accuracy optimization."
  },
  {
    number: "05",
    title: "Move Towards Your Future",
    desc: "Enter your examination hall and technical interviews with proven temperament, clarity, and readiness."
  }
];
