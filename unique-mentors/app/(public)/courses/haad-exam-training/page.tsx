import type { Metadata } from "next";
import { ExamLandingPage } from "@/components/common/ExamLandingPage";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "HAAD Exam Training in Kochi | Unique Mentors",
  description: "HAAD exam preparation for Abu Dhabi healthcare licensing with structured coaching and eligibility guidance from Unique Mentors.",
  path: "/courses/haad-exam-training"
});

export default function HAADEexamTrainingPage() {
  return (
    <ExamLandingPage
      exam="HAAD"
      title="HAAD Exam Preparation for Abu Dhabi Licensing"
      subtitle="Prepare for Abu Dhabi healthcare licensing with focused theory, mock tests and application support."
    />
  );
}
