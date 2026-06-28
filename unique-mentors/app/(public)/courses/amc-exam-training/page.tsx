import type { Metadata } from "next";
import { ExamLandingPage } from "@/components/common/ExamLandingPage";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "AMC Exam Training India - Australian Medical Council | Unique Mentors Kochi",
  description: "Immersive AMC exam training in Kochi for medical professionals seeking Australian licensure. High-quality coaching, AMC MCQ mock tests, eligibility verification support, and portfolio guidance.",
  path: "/courses/amc-exam-training",
  keywords: ["AMC training Kochi", "AMC MCQ exam prep", "Australian Medical Council exam", "medical licensing Australia", "AMC coaching India"]
});

export default function AMCExamTrainingPage() {
  return (
    <ExamLandingPage
      exam="AMC"
      title="AMC Exam Training for Medical Professionals"
      subtitle="Prepare for the Australian Medical Council exam with structured coaching and Australian licensing pathway guidance."
    />
  );
}
