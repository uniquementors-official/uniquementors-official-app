import type { Metadata } from "next";
import { ExamLandingPage } from "@/components/common/ExamLandingPage";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "DHA Exam Coaching Kochi - Dubai Healthcare Licensing for Lab Tech, Pharmacist, Physio | Unique Mentors",
  description: "DHA exam coaching in Kochi for Dubai healthcare licensing — Lab Technicians, Pharmacists, Physiotherapists, Radiographers, Nurses and Doctors. Mock tests, DataFlow processing, profession-specific preparation and licensing support.",
  path: "/courses/dha-exam-training",
  keywords: ["DHA exam coaching", "DHA exam for physiotherapist", "dha coaching centre near me", "dha coaching centre in Kerala", "Dubai healthcare licensing"]
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
