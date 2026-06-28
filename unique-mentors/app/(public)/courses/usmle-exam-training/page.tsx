import type { Metadata } from "next";
import { ExamLandingPage } from "@/components/common/ExamLandingPage";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "USMLE Exam Training India - US Medical Licensure Examination | Unique Mentors Kochi",
  description: "USMLE exam training for Indian medical graduates in Kochi. Step 1 and Step 2 CK preparation with structured coaching, mock exams, eligibility guidance and US medical licensing pathway support. 14-week intensive program.",
  path: "/courses/usmle-exam-training",
  keywords: ["USMLE training India", "USMLE exam preparation Kochi", "US medical licensure exam", "USMLE Step 1 coaching", "USMLE Step 2 CK"]
});

export default function USMLEExamTrainingPage() {
  return (
    <ExamLandingPage
      exam="USMLE"
      title="USMLE Exam Training for Medical Professionals"
      subtitle="Prepare for the United States Medical Licensing Examination with structured coaching and licensing pathway guidance."
    />
  );
}
