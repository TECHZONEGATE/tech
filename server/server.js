import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import rateLimit from 'express-rate-limit';
import { connectDatabase, getMongoStatus } from './config/dataStore.js';

// Route imports
import enquiryRoutes from './routes/enquiryRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import seminarRoutes from './routes/seminarRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration (supports custom domains, Netlify previews, and localhost)
const frontendUrls = (process.env.FRONTEND_URL || '')
  .split(',')
  .map(u => u.trim().replace(/\/$/, ''))
  .filter(Boolean);

const allowedOrigins = [
  ...frontendUrls,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. server-to-server, curl, Postman, health checks)
    if (!origin) return callback(null, true);
    
    // Check exact match, wildcards, netlify preview domains, or if FRONTEND_URL is *
    const isNetlify = origin.endsWith('.netlify.app');
    const isCustomMatch = allowedOrigins.some(allowed => allowed === origin || allowed === '*');
    
    if (isCustomMatch || isNetlify || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(new Error(`CORS policy: Origin ${origin} not allowed`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting for public submissions to protect against spam
const submissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // max 30 submissions per windowMs per IP
  message: { error: 'Too many requests from this IP. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    institute: 'TECHZONE',
    mongoConnected: getMongoStatus(),
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/enquiries', (req, res, next) => {
  if (req.method === 'POST') return submissionLimiter(req, res, next);
  next();
}, enquiryRoutes);

app.use('/api/contact', (req, res, next) => {
  if (req.method === 'POST') return submissionLimiter(req, res, next);
  next();
}, contactRoutes);

app.use('/api/seminars', (req, res, next) => {
  if (req.path === '/register' && req.method === 'POST') return submissionLimiter(req, res, next);
  next();
}, seminarRoutes);

app.use('/api/courses', courseRoutes);
app.use('/api/admin', adminRoutes);

// Convenience public alias for site settings
app.get('/api/settings', (req, res, next) => {
  req.url = '/settings';
  return adminRoutes(req, res, next);
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'Requested API endpoint does not exist.' });
});

// Serve frontend static build in production if available
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.join(__dirname, '../client/dist');

if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[API Server Error]:', err);
  res.status(err.status || 500).json({
    error: err.message || 'An unexpected internal server error occurred.'
  });
});

// Start Server
async function startServer() {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`  TECHZONE API Server running on port ${PORT}`);
    console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`  Admin Username: ${process.env.ADMIN_USERNAME || 'admin'}`);
    console.log(`  Health Check: http://localhost:${PORT}/api/health`);
    console.log(`=================================================`);
  });
}

startServer();
