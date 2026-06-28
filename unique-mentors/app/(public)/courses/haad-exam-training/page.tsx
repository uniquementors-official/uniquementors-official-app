import type { Metadata } from "next";
import { ExamLandingPage } from "@/components/common/ExamLandingPage";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "HAAD Exam Preparation Kochi - Abu Dhabi Healthcare Licensing | Unique Mentors",
  description: "HAAD exam preparation in Kochi for Abu Dhabi healthcare licensing — Lab Technicians, Pharmacists, Physiotherapists, Radiographers and Nurses. Structured coaching, mock tests, eligibility guidance and DataFlow support.",
  path: "/courses/haad-exam-training",
  keywords: ["HAAD exam preparation", "HAAD exam for lab technician", "Abu Dhabi healthcare licensing", "HAAD prometric coaching Kochi"]
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
