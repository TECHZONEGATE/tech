import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  instituteName: { type: String, default: "TECHZONE" },
  tagline: { type: String, default: "Learn. Prepare. Succeed." },
  phone: { type: String, default: "+91 80509 41407 (Admissions Desk)" },
  email: { type: String, default: "info.techzone.gate@gmail.com" },
  supportEmail: { type: String, default: "info.techzone.gate@gmail.com" },
  address: { type: String, default: "TECHZONE Engineering Academy, BDA Layout, Bangalore, 560017" },
  workingHours: { type: String, default: "Monday – Saturday: 9:00 AM – 7:00 PM IST" },
  announcementBarText: { type: String, default: "Empowering Future Engineers Through Focused Preparation" },
  socialLinks: {
    youtube: { type: String, default: "http://www.youtube.com/@TECHZONE-Technical" },
    telegram: { type: String, default: "https://t.me/Gate_Ese_DkSirPrep" },
    whatsapp: { type: String, default: "https://www.whatsapp.com/channel/0029Vb7sRGZ1XquQ0XFsA32b" }
  }
}, { timestamps: true });

export const Setting = mongoose.models.Setting || mongoose.model('Setting', settingSchema);
