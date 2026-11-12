import mongoose from 'mongoose';

const seminarRegistrationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  college: { type: String, required: true },
  engineeringBranch: { type: String, required: true },
  currentYear: { type: String, required: true },
  message: { type: String, default: "" },
  seminarId: { type: String, default: "general" },
  seminarTitle: { type: String, default: "Career Orientation Seminar" },
  status: { type: String, default: "Confirmed" }
}, { timestamps: true });

export const SeminarRegistration = mongoose.models.SeminarRegistration || mongoose.model('SeminarRegistration', seminarRegistrationSchema);
