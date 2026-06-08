import type { Metadata } from "next";
import { ExamLandingPage } from "@/components/common/ExamLandingPage";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "DHA Exam Training in Kochi | Unique Mentors",
  description: "DHA exam coaching for Dubai healthcare licensing, including mock tests, Dataflow support and profession-specific preparation.",
  path: "/courses/dha-exam-training"
});

export default function DHAExamTrainingPage() {
  return (
    <ExamLandingPage
      exam="DHA"
      title="DHA Exam Training for Dubai Healthcare Licensing"
      subtitle="Focused preparation for Dubai Health Authority licensing with exam strategy, documentation support and mentoring."
    />
  );
}
