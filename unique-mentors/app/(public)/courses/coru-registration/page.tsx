import type { Metadata } from "next";
import { ExamLandingPage } from "@/components/common/ExamLandingPage";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "CORU Registration Support Ireland - Health & Social Care Professionals | Unique Mentors",
  description: "CORU registration guidance for healthcare professionals planning careers in Ireland. Documentation support, eligibility review, aptitude test preparation and NMBI pathway for Physiotherapists, Lab Scientists and Social Care Workers.",
  path: "/courses/coru-registration",
  keywords: ["CORU registration Ireland", "CORU registration support", "Ireland healthcare registration", "NMBI registration"]
});

export default function CORURegistrationPage() {
  return (
    <ExamLandingPage
      exam="CORU"
      title="CORU Registration Support for Ireland"
      subtitle="Plan your Ireland registration pathway with documentation guidance and professional mentoring."
    />
  );
}
