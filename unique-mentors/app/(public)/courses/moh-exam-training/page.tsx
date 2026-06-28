import type { Metadata } from "next";
import { ExamLandingPage } from "@/components/common/ExamLandingPage";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "MOH Exam Training Kochi - Prometric Coaching for Lab Tech, Pharmacist, Physio | Unique Mentors",
  description: "MOH exam training in Kochi for healthcare professionals — Lab Technicians, Pharmacists, Physiotherapists, Radiographers, Nurses, Dentists and Doctors. Mock tests, eligibility guidance, DataFlow support and UAE medical licensing pathway. Join 5000+ successful candidates.",
  path: "/courses/moh-exam-training",
  keywords: ["MOH exam training", "MOH exam for physiotherapist", "MOH exam for lab technician", "MOH prometric coaching Kochi", "UAE medical licensing"]
});

export default function MOHExamTrainingPage() {
  return (
    <ExamLandingPage
      exam="MOH"
      title="MOH Exam Training for Healthcare Professionals"
      subtitle="Prepare for the UAE Ministry of Health licensing exam with structured coaching and licensing pathway guidance."
    />
  );
}
