# TECHZONE — Premier Engineering Examination Academy Web Application

A complete, visually stunning, premium, modern, responsive, and production-quality educational web platform built for **TECHZONE**, an institute dedicated to engineering competitive examination preparation (GATE, ESE, and PSUs) and career guidance.

---

## Brand Identity & Aesthetic

- **Institute Name:** TECHZONE
- **Brand Tagline:** "Learn. Prepare. Succeed."
- **Key Headlines:** "Your Ambition Deserves the Right Direction.", "Where Preparation Meets Possibility.", "From Aspirations to Achievements."
- **Color Palette:**
  - Primary Navy Blue: `#102B4E`
  - Deep Midnight Blue: `#071B33`
  - Royal Blue: `#245A92`
  - Premium Gold: `#D8A85F`
  - Soft Gold: `#F0CC8C`
  - Off White: `#F8FAFC`
  - Dark Slate Text: `#1B2B40`
- **Typography:**
  - Headings: Plus Jakarta Sans / Manrope
  - Body: Inter / DM Sans

---

## Complete Route Architecture

All navigation and page routes are fully implemented with real views and active state indication:

| Path | Page Name | Description |
|------|-----------|-------------|
| `/` | **Home Page** | Premium hero with floating engineering formulas/circuit motifs, course overview cards, 6 why-choose blocks, 5-stage timeline, seminar preview, and enquiry CTA. |
| `/courses` | **Courses Offered** | Comprehensive course catalogue with interactive category filters (All, GATE, ESE, PSU) and comparative curriculum matrix. |
| `/courses/mini-gate` | **Mini GATE** | Modular, subject-wise preparation page with configurable engineering branch catalogue (CS/IT, ME, CE, EE, EC) and direct modular enquiry. |
| `/courses/full-gate` | **Full GATE** | Comprehensive preparation page featuring a 6-phase learning roadmap (Fundamentals → Core Subjects → Problem Solving → Revision → Mock Tests → Final Preparation). |
| `/courses/ese` | **ESE (Engineering Services)** | Formal, UPSC-focused preparation page explaining Stage I Prelims, Stage II Conventional Mains, and Stage III Personality test. |
| `/courses/psu` | **PSUs Preparation** | Career readiness page covering Maharatna/Navratna recruitment through GATE scores and independent technical exams (ISRO, BARC, BEL). |
| `/career-orientation-seminar` | **Career Orientation Seminar** | Flagship orientation page with configurable seminar schedule and functional "Register Your Interest" form. |
| `/student-enquiry` | **Student Enquiry Form** | High-conversion split-screen enquiry page with Indian phone validation, conditional subject picker for Mini/Full GATE, and unique backend-generated reference code receipt. |
| `/contact` | **Contact Us** | Multi-channel contact page with official admissions phone, email, working hours, interactive form, and campus location map box. |
| `/about` | **About Us** | Editorial brand story, mission, vision, core values, educational philosophy, and configurable faculty roster. *(Positioned strictly after Contact Us in navigation as required).* |
| `/admin` | **Admin Dashboard** | Secure administrative console with JWT authentication, dashboard stats, enquiry status management, internal counsellor notes, seminar scheduler, and website settings. |

---

## Technology Stack

### Frontend (`client/`)
- **React.js 18** with **Vite**
- **Tailwind CSS** with custom premium color palette and subtle grid textures
- **Framer Motion** for smooth scroll reveals, micro-interactions, and modal animations
- **Lucide React** for icons
- **React Router DOM v7** with route-level lazy loading (`React.lazy` + `Suspense`)
- **React Hook Form** with **Zod** schema validation
- **Canvas Confetti** for registration/enquiry celebration

### Backend & Database (`server/`)
- **Node.js** & **Express.js**
- **MongoDB** with **Mongoose** (with an automatic persistent JSON file fallback engine when MongoDB is offline, guaranteeing 100% immediate out-of-the-box reliability)
- **JWT (JSON Web Tokens)** for secure admin authentication
- **Bcryptjs** for secure password hashing
- **Helmet** for HTTP security headers
- **CORS** configured with origin validation (no wildcards with credentials)
- **Express Rate Limit** to prevent spam submissions on public forms

---

## Directory Structure

```text
TechZone/
├── client/
│   ├── public/
│   │   └── favicon.svg             # Stylized TECHZONE emblem favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/             # Button, Badge, SectionHeading, Accordion, ScrollToTop
│   │   │   ├── home/               # HeroSection, CourseOverview, WhyChoose, Timeline, etc.
│   │   │   └── layout/             # TopAnnouncementBar, Navbar, Footer, PageLayout
│   │   ├── data/
│   │   │   └── coursesData.js      # Structured branches, modules, comparison matrix
│   │   ├── pages/
│   │   │   ├── courses/            # MiniGate, FullGate, Ese, Psu detail pages
│   │   │   ├── HomePage.jsx
│   │   │   ├── CoursesPage.jsx
│   │   │   ├── CareerSeminarPage.jsx
│   │   │   ├── StudentEnquiryPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── AdminPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── services/
│   │   │   └── api.js              # Centralized API service with fallback handling
│   │   ├── styles/
│   │   ├── App.jsx                 # Route declarations & lazy-loading wrapper
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── server/
│   ├── config/
│   │   ├── dataStore.js            # Dual Mongoose/persistent file engine
│   │   └── seedData.js             # Initial courses, seminars, and default settings
│   ├── controllers/
│   │   ├── enquiryController.js    # Enquiry creation, validation & reference generator
│   │   ├── seminarController.js    # Seminar publishing & student registration
│   │   ├── contactController.js    # Public contact form submission
│   │   ├── courseController.js     # Course management
│   │   └── adminController.js      # Authentication, stats, and settings
│   ├── middleware/
│   │   └── auth.js                 # JWT bearer token verification
│   ├── routes/
│   │   ├── enquiryRoutes.js
│   │   ├── seminarRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── courseRoutes.js
│   │   └── adminRoutes.js
│   ├── data/                       # Persistent JSON storage when Mongo is offline
│   ├── server.js                   # Main Express application entrypoint
│   ├── .env.example
│   └── package.json
├── package.json                    # Root workspace orchestrator
└── README.md
```

---

## Local Development Setup

### Prerequisites
- **Node.js** v18+ (tested on v22.20.0)
- **npm** v9+

### 1. Installation
Clone or navigate to the project directory:
```bash
cd TechZone
```

Install client dependencies:
```bash
cd client
npm install
cd ..
```

Install server dependencies:
```bash
cd server
npm install
cd ..
```

### 2. Environment Configuration
Inspect `server/.env` (a ready-to-run `.env` is already created from `.env.example`):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/techzone
JWT_SECRET=techzone_super_secret_jwt_key_2026_educate_succeed
ADMIN_USERNAME=admin
ADMIN_PASSWORD=adminpassword123
FRONTEND_URL=http://localhost:5173
```

### 3. Running the Application

#### Option A: Running from root (simultaneous or separate terminals)
Terminal 1 (Backend API):
```bash
npm run dev:server
```
*API runs at `http://localhost:5000`*

Terminal 2 (Frontend Client):
```bash
npm run dev:client
```
*Vite dev server opens at `http://localhost:5173`*

#### Default Admin Credentials
- **URL:** `http://localhost:5173/admin`
- **Username:** `admin`
- **Password:** `adminpassword123`

---

## Production Build & Deployment

### 1. Build the Frontend
```bash
cd client
npm run build
```
This generates an optimized static bundle in `client/dist`.

### 2. Deployment Instructions
- **Vercel / Netlify (Frontend):** Point root to `client/`, set build command `npm run build`, and output directory `dist`. Set environment variable `VITE_API_URL=https://your-api-domain.com/api`.
- **Render / Railway / VPS (Backend):** Deploy `server/` with `npm start`. Set environment variables `NODE_ENV=production`, `MONGODB_URI` (MongoDB Atlas URI), `JWT_SECRET`, and `FRONTEND_URL`.
- **Single-Server Deployment:** You can also serve `client/dist` directly as static files from Express using `express.static(path.join(__dirname, '../client/dist'))`.
