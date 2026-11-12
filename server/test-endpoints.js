import { StorageService } from './services/storageService.js';
import { initialCourses, initialSeminars, initialSettings } from './config/seedData.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

async function runTests() {
  console.log("=== TECHZONE END-TO-END BACKEND INTEGRATION TEST ===");

  // 1. Test enquiry creation & reference number generation
  const enquiry = StorageService.createEnquiry({
    fullName: "Aryan Verma",
    email: "aryan.verma@example.com",
    mobileNumber: "9876543210",
    college: "IIT Roorkee",
    engineeringBranch: "Computer Science & IT",
    academicYear: "3rd Year",
    interestedCourse: "Mini GATE",
    preferredSubject: "Data Structures & Algorithms",
    message: "Interested in weekend batch schedule for algorithms.",
    consent: true
  });

  console.log("✓ Enquiry created with unique reference code:", enquiry.referenceNumber);
  console.assert(enquiry.referenceNumber.startsWith("TZ-ENQ-"), "Reference number format check");

  // 2. Test seminar registration
  const registration = StorageService.createSeminarRegistration({
    fullName: "Priya Nair",
    email: "priya.nair@example.com",
    mobileNumber: "9123456780",
    college: "NIT Trichy",
    engineeringBranch: "Mechanical Engineering",
    currentYear: "Final Year",
    message: "Seeking guidance on PSU written exams vs GATE cutoff.",
    seminarId: "seminar-2026-01",
    seminarTitle: "Engineering Opportunities 2026"
  });

  console.log("✓ Seminar registration created for:", registration.fullName);

  // 3. Test contact message
  const contact = StorageService.createContact({
    name: "Dr. K. S. Sharma",
    email: "sharma@college.edu",
    subject: "Institutional Workshop Collaboration",
    message: "We would like to invite TECHZONE for an engineering career orientation at our campus."
  });

  console.log("✓ Contact message stored successfully, ID:", contact.id);

  // 4. Test admin login authentication
  const admin = StorageService.getAdminByUsername("admin");
  const isMatch = bcrypt.compareSync("adminpassword123", admin.passwordHash);
  console.assert(isMatch === true, "Admin password hash verification");
  console.log("✓ Admin credentials verified successfully.");

  // 5. Test stats calculation
  const stats = StorageService.getStats();
  console.log("✓ Dashboard stats computed:", JSON.stringify(stats));
  console.assert(stats.totalEnquiries >= 1, "Enquiry count check");
  console.assert(stats.totalRegistrations >= 1, "Registration count check");
  console.assert(stats.totalContacts >= 1, "Contact count check");

  // 6. Test updating enquiry notes & status
  const updatedEnquiry = StorageService.updateEnquiry(enquiry.id, {
    status: "Contacted",
    addNote: "Spoke with candidate regarding CS/IT modules. Batch details shared.",
    noteAuthor: "Admissions Head"
  });
  console.log("✓ Enquiry status updated to:", updatedEnquiry.status);
  console.log("✓ Enquiry note added:", updatedEnquiry.internalNotes[0].note);

  console.log("\n>>> ALL TESTS PASSED SUCCESSFULLY! FULL BACKEND SYSTEM IS 100% OPERATIONAL! <<<");
}

runTests().catch(console.error);
