import type { Metadata } from "next";
import { ExamLandingPage } from "@/components/common/ExamLandingPage";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "PLAB Exam Training Kochi - UK Medical Licensure for GPs | Unique Mentors",
  description: "Expert PLAB exam training in Kochi for general practitioners (GPs) seeking medical licensure in the UK. Focused coaching, mock tests, GMC registration support, and visa guidance. 9-week program.",
  path: "/courses/plab-exam-training",
  keywords: ["PLAB training Kochi", "PLAB exam preparation", "GMC registration support", "UK medical licensing GP", "PLAB Step 1"]
});

export default function PLABExamTrainingPage() {
  return (
    <ExamLandingPage
      exam="PLAB"
      title="PLAB Exam Training for Medical Professionals"
      subtitle="Prepare for the Professional and Linguistic Assessments Board exam with structured coaching and UK licensing pathway guidance."
    />
  );
}
