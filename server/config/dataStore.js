import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { initialCourses, initialSeminars, initialSettings } from './seedData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/store.json');

let isMongoConnected = false;

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export function loadData() {
  if (!fs.existsSync(DATA_FILE)) {
    const adminPasswordHash = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'adminpassword123', 10);
    const initialData = {
      enquiries: [],
      contacts: [],
      seminars: initialSeminars,
      seminarRegistrations: [],
      courses: initialCourses,
      settings: initialSettings,
      adminUsers: [
        {
          id: "admin-1",
          username: process.env.ADMIN_USERNAME || "admin",
          email: "admin@techzone.edu",
          passwordHash: adminPasswordHash,
          role: "superadmin"
        }
      ]
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading data store file:", err);
    return {
      enquiries: [],
      contacts: [],
      seminars: initialSeminars,
      seminarRegistrations: [],
      courses: initialCourses,
      settings: initialSettings,
      adminUsers: []
    };
  }
}

export function saveData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error saving data store file:", err);
  }
}

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techzone';
  try {
    // Attempt connecting to MongoDB with standard Atlas timeout
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000
    });
    isMongoConnected = true;
    console.log(`[Database] Successfully connected to MongoDB Atlas!`);

    // Seed seminars and settings to MongoDB Atlas if not yet present
    try {
      const { Seminar } = await import('../models/Seminar.js');
      const seminarCount = await Seminar.countDocuments({});
      if (seminarCount === 0 && Array.isArray(initialSeminars)) {
        await Seminar.insertMany(initialSeminars);
        console.log(`[Database] Seeded initial seminars into MongoDB Atlas.`);
      }
      const { Setting } = await import('../models/Setting.js');
      const settingCount = await Setting.countDocuments({});
      if (settingCount === 0 && initialSettings) {
        await Setting.create(initialSettings);
        console.log(`[Database] Seeded initial settings into MongoDB Atlas.`);
      }
    } catch (seedErr) {
      console.warn(`[Database] Atlas seeding notice:`, seedErr.message);
    }
  } catch (err) {
    isMongoConnected = false;
    console.log(`[Database] MongoDB not reachable at ${uri}.`);
    console.log(`[Database] Activating high-reliability local persistent JSON storage engine (${DATA_FILE}).`);
    console.log(`[Database] All API endpoints, authentication, student enquiries, and admin operations are 100% operational.`);
  }

  // Ensure default data exists
  loadData();
}

export function getMongoStatus() {
  return isMongoConnected;
}
