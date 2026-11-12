import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  referenceNumber: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  college: { type: String, default: "Not specified" },
  engineeringBranch: { type: String, required: true },
  academicYear: { type: String, default: "Not specified" },
  interestedCourse: { type: String, required: true },
  preferredSubject: { type: String, default: "All Modules" },
  message: { type: String, default: "" },
  consent: { type: Boolean, default: true },
  status: { type: String, enum: ['New', 'Contacted', 'Closed'], default: 'New' },
  internalNotes: [
    {
      note: String,
      author: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

export const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);
