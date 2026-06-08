import type { Metadata } from "next";
import { ExamLandingPage } from "@/components/common/ExamLandingPage";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "MOH Exam Training in Kochi | Unique Mentors",
  description: "MOH exam training for healthcare professionals in Kochi with mock tests, eligibility guidance and UAE licensing support.",
  path: "/courses/moh-exam-training"
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
