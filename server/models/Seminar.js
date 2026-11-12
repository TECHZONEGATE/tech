import mongoose from 'mongoose';

const seminarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, default: "TBA" },
  time: { type: String, default: "TBA" },
  venueOrOnline: { type: String, default: "Online / Campus" },
  description: { type: String, default: "" },
  registrationStatus: { type: String, default: "Open" },
  isPublished: { type: Boolean, default: true },
  highlights: [{ type: String }]
}, { timestamps: true });

export const Seminar = mongoose.models.Seminar || mongoose.model('Seminar', seminarSchema);
